import { AstNode } from "../../../compiler/compiler-interfaces/ast-node";
import { Class } from "../../../compiler/compiler-interfaces/class";
import { ElanSymbol } from "../../../compiler/compiler-interfaces/elan-symbol";
import { Scope } from "../../../compiler/compiler-interfaces/scope";
import { SymbolType } from "../../../compiler/compiler-interfaces/symbol-type";
import { ClassSubType, ClassType } from "../../../compiler/symbols/class-type";
import { DuplicateSymbol } from "../../../compiler/symbols/duplicate-symbol";
import { NullScope } from "../../../compiler/symbols/null-scope";
import {
  getGlobalScope,
  isMember,
  isSymbol,
  symbolMatches,
} from "../../../compiler/symbols/symbol-helpers";
import { SymbolScope } from "../../../compiler/symbols/symbol-scope";
import { UnknownSymbol } from "../../../compiler/symbols/unknown-symbol";
import {
  getId,
  mustBeInheritableClassOrInterface,
  mustBeKnownSymbolType,
  mustBeSingleAbstractSuperClass,
  mustBeUniqueNameInScope,
  mustNotBeCircularDependency,
} from "../../compile-rules";
import { Deprecated } from "../../compiler-interfaces/elan-type-interfaces";
import { BreakpointEvent } from "../../debugging/breakpoint-event";
import { thisKeyword } from "../../keywords";
import { isAstCollectionNode, isAstIdNode } from "../ast-helpers";
import { BreakpointAsn } from "../breakpoint-asn";
import { AbstractPropertyAsn } from "../class-members/abstract-property-asn";
import { PropertyAsn } from "../class-members/property-asn";
import { EmptyAsn } from "../empty-asn";
import { InheritsFromAsn } from "../fields/inherits-from-asn";

export abstract class ClassAsn extends BreakpointAsn implements Class {
  isParent: boolean = true;
  isClass: boolean = true;
  isAbstract: boolean = false;
  isConcrete: boolean = false;
  isRecord: boolean = false;
  isInterface: boolean = false;

  public isNotInheritable = false;

  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  name: AstNode = EmptyAsn.Instance;
  inheritance: AstNode = EmptyAsn.Instance;
  children: AstNode[] = [];

  ofTypes: SymbolType[] = [];

  deprecated: Deprecated | undefined = undefined;

  updateOfTypes(_ofTypes: SymbolType[]) {
    return this;
  }

  get symbolScope() {
    return SymbolScope.program;
  }

  inheritedSymbols(circular: boolean) {
    if (!circular && this.inheritance instanceof InheritsFromAsn) {
      return this.inheritance.symbolTypes();
    }
    return [];
  }

  getChildren(): ElanSymbol[] {
    return this.children as unknown as ElanSymbol[];
  }

  doesInherit(): boolean {
    return this.getInheritanceItems().length > 0;
  }

  indent(): string {
    return "";
  }

  properties(): (AbstractPropertyAsn | PropertyAsn)[] {
    return this.getChildren().filter(
      (c) => c instanceof PropertyAsn || c instanceof AbstractPropertyAsn,
    ) as (AbstractPropertyAsn | PropertyAsn)[];
  }

  protected propertiesToInit() {
    const pp = this.properties();
    const ps = pp
      .map((p) => p.initCode())
      .filter((s) => s)
      .join(", ");
    return `[${ps}]`;
  }

  private mapSymbol(c: ElanSymbol): [SymbolType, string] {
    return [c.symbolType(), c.symbolId];
  }

  private getInheritanceItems() {
    const superClasses = this.inheritance;
    if (superClasses instanceof InheritsFromAsn && isAstCollectionNode(superClasses.inheritance)) {
      return superClasses.inheritance.items;
    }
    return [];
  }

  public getDirectSuperClassesTypeAndName() {
    if (this.doesInherit()) {
      const superClasses = this.getInheritanceItems();

      if (superClasses.length > 0) {
        const nodes = superClasses.filter((i) => isAstIdNode(i));
        const typeAndName: [SymbolType, string][] = nodes
          .map((n) => getGlobalScope(this).resolveSymbol(n.id, this))
          .map((c) => this.mapSymbol(c));

        return typeAndName;
      }
    }
    return [];
  }

  protected seenTwice(name: string, seenNames: string[]) {
    return seenNames.filter((s) => s === name).length > 1;
  }

  protected circularDependency(name: string) {
    // circular dependency detected
    mustNotBeCircularDependency(name, this.compileErrors, this.fieldId);
    // any other compiling is not safe
    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);
    return `class ${name} { }\r\n`;
  }

  public lookForCircularDependencies(cf: ClassAsn, seenNames: string[]): [boolean, string] {
    if (cf.doesInherit()) {
      const superClasses = cf.getInheritanceItems();

      if (superClasses.length > 0) {
        const nodes = superClasses.filter((i) => isAstIdNode(i));
        const symbols = nodes
          .map((n) => getGlobalScope(this).resolveSymbol(n.id, this))
          .filter((n) => n instanceof ClassAsn);

        for (const s of symbols) {
          if (seenNames.includes(s.symbolId)) {
            return [true, s.symbolId];
          }
          const seenNamesThisPath = seenNames.concat([s.symbolId]);
          const [sd, name] = this.lookForCircularDependencies(s, seenNamesThisPath);
          if (sd) {
            return [sd, name];
          }
        }
      }
    }
    return [false, ""];
  }

  public getAllClasses(cf: ClassAsn, seenNames: string[], filter: (d: ClassAsn) => boolean) {
    if (cf.doesInherit()) {
      const superClasses = cf.getInheritanceItems();

      // TODO move this (and similar elsewhere) to InheritsFromAsn ?
      if (superClasses.length > 0) {
        const nodes = superClasses.filter((i) => isAstIdNode(i));
        const symbols = nodes
          .map((n) => getGlobalScope(this).resolveSymbol(n.id, this))
          .filter(
            (n) => n instanceof ClassAsn && !this.seenTwice(n.symbolId, seenNames),
          ) as ClassAsn[];
        let allSymbols = symbols;
        seenNames.push(cf.symbolId);

        for (const s of symbols) {
          allSymbols = allSymbols.concat(this.getAllClasses(s, seenNames, filter));
        }

        return allSymbols.filter(filter);
      }
    }
    return [];
  }

  public getAllInterfaces(cf: ClassAsn, seenNames: string[]) {
    return this.getAllClasses(cf, seenNames, (s: ClassAsn) => s.isInterface);
  }

  public getAllAbstractClasses(cf: ClassAsn, seenNames: string[]) {
    return this.getAllClasses(cf, seenNames, (s: ClassAsn) => s.isAbstract && !s.isInterface);
  }

  get symbolId() {
    return getId(this.name);
  }

  symbolMatches(id: string, all: boolean, _initialScope: Scope): ElanSymbol[] {
    const otherMatches = this.getParentScope().symbolMatches(id, all, this);

    const symbols = this.getChildren().filter((f) => isSymbol(f)) as ElanSymbol[];

    const types = this.getDirectSuperClassesTypeAndName()
      .map((tn) => tn[0])
      .filter((t) => t instanceof ClassType);

    let inheritedMatches: ElanSymbol[] = [];

    for (const ct of types) {
      const s = ct.scope.symbolMatches(id, all, NullScope.Instance);
      inheritedMatches = inheritedMatches.concat(s);
    }

    const matches = symbolMatches(id, all, symbols);

    return matches.concat(inheritedMatches).concat(otherMatches);
  }

  resolveSymbol(id: string, _initialScope: Scope): ElanSymbol {
    const symbol = this.resolveOwnSymbol(id);

    if (symbol instanceof UnknownSymbol) {
      return this.getParentScope().resolveSymbol(id, this);
    }

    return symbol;
  }

  resolveOwnSymbol(id: string): ElanSymbol {
    if (id === thisKeyword) {
      return this;
    }

    let matches = this.getChildren().filter(
      (f) => isSymbol(f) && f.symbolId === id,
    ) as ElanSymbol[];

    const types = this.getDirectSuperClassesTypeAndName()
      .map((tn) => tn[0])
      .filter((t) => t instanceof ClassType);

    for (const ct of types) {
      const s = ct.scope!.resolveOwnSymbol(id);
      if (isMember(s)) {
        matches.push(s);
      }
    }

    // we might have picked up the same symbol through diamond inheritance - so filter identical symbols

    matches = Array.from(new Set<ElanSymbol>(matches));

    if (matches.length === 2) {
      // one of the matches must be abstract
      const concreteMatches = matches.filter((i) => isMember(i) && !i.isAbstract);
      if (concreteMatches.length === 1) {
        matches = concreteMatches;
      }
    }

    if (matches.length === 1) {
      return matches[0];
    }

    if (matches.length > 1) {
      return new DuplicateSymbol(matches);
    }

    return new UnknownSymbol(id);
  }

  getName() {
    const name = getId(this.name);
    mustBeUniqueNameInScope(name, getGlobalScope(this), this.compileErrors, this.fieldId);
    return name;
  }

  getExtends() {
    const typeAndName = this.getDirectSuperClassesTypeAndName();
    let implement = "";

    for (const [st, name] of typeAndName) {
      mustBeKnownSymbolType(st, name, this.compileErrors, this.fieldId);
      mustBeInheritableClassOrInterface(st, name, this.compileErrors, this.fieldId);

      if (st instanceof ClassType && st.subType === ClassSubType.abstract) {
        implement = `extends ${name} `;
      }
    }

    mustBeSingleAbstractSuperClass(typeAndName, this.compileErrors, this.fieldId);

    return implement;
  }

  getClassIndex() {
    return getGlobalScope(this.scope).children.indexOf(this);
  }

  updateBreakpoints(event: BreakpointEvent): void {
    super.updateBreakpoints(event);
    for (const n of this.children as BreakpointAsn[]) {
      n.updateBreakpoints(event);
    }
  }
}
