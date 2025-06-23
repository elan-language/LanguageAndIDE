import { Deprecated } from "../../../elan-type-interfaces";
import {
  getId,
  mustBeInheritableClassOrInterface,
  mustBeKnownSymbolType,
  mustBeSingleAbstractSuperClass,
  mustBeUniqueNameInScope,
  mustNotBeCircularDependency,
} from "../../compile-rules";
import { AstNode } from "../../compiler-interfaces/ast-node";
import { Class } from "../../compiler-interfaces/class";
import { ElanSymbol } from "../../compiler-interfaces/elan-symbol";
import { Scope } from "../../compiler-interfaces/scope";
import { SymbolType } from "../../compiler-interfaces/symbol-type";
import { isMember } from "../../frame-helpers";
import { Field } from "../../frame-interfaces/field";
import { Transforms } from "../../frame-interfaces/transforms";
import { thisKeyword } from "../../keywords";
import { BreakpointEvent } from "../../status-enums";
import { ClassSubType, ClassType } from "../../symbols/class-type";
import { DuplicateSymbol } from "../../symbols/duplicate-symbol";
import { NullScope } from "../../symbols/null-scope";
import { getGlobalScope, isSymbol, symbolMatches } from "../../symbols/symbol-helpers";
import { SymbolScope } from "../../symbols/symbol-scope";
import { UnknownSymbol } from "../../symbols/unknown-symbol";
import { isAstCollectionNode, isAstIdNode, transforms } from "../ast-helpers";
import { AbstractPropertyAsn } from "../class-members/abstract-property-asn";
import { PropertyAsn } from "../class-members/property-asn";
import { EmptyAsn } from "../empty-asn";
import { InheritsFromAsn } from "../fields/inherits-from-asn";
import { FrameAsn } from "../frame-asn";

export abstract class ClassAsn extends FrameAsn implements Class {
  isCollapsible: boolean = true;
  isParent: boolean = true;
  isClass: boolean = true;
  isAbstract: boolean = false;
  isConcrete: boolean = false;
  isRecord: boolean = false;
  isInterface: boolean = false;

  public isNotInheritable = false;

  hrefForFrameHelp: string = "LangRef.html#class";

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

  get subType(): ClassSubType {
    if (this.isInterface) {
      return ClassSubType.interface;
    }
    if (this.isAbstract) {
      return ClassSubType.abstract;
    }
    return ClassSubType.concrete;
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

  // getProfile(): Profile {
  //   return this.getFile().getProfile();
  // }

  // updateCompileStatus(): void {
  //   this.getChildren().forEach((c) => c.updateCompileStatus());
  //   const worstOfChildren = parentHelper_readWorstCompileStatusOfChildren(this);
  //   super.updateCompileStatus(); //will update it based on fields and its own direct compile errors
  //   const newStatus = Math.min(this.readCompileStatus(), worstOfChildren);
  //   this.setCompileStatus(newStatus);
  // }

  getChildren(): ElanSymbol[] {
    return this.children as unknown as ElanSymbol[];
  }

  // getFirstChild(): Frame {
  //   return parentHelper_getFirstChild(this);
  // }
  // getLastChild(): Frame {
  //   return parentHelper_getLastChild(this);
  // }
  // getChildAfter(child: Frame): Frame {
  //   return parentHelper_getChildAfter(this, child);
  // }
  // getChildBefore(child: Frame): Frame {
  //   return parentHelper_getChildBefore(this, child);
  // }
  // getChildRange(first: Frame, last: Frame): Frame[] {
  //   return parentHelper_getChildRange(this, first, last);
  // }
  // getFirstSelectorAsDirectChild(): AbstractSelector {
  //   return parentHelper_getFirstSelectorAsDirectChild(this);
  // }
  // addChildBefore(child: Frame, before: Frame): void {
  //   parentHelper_addChildBefore(this, child, before);
  // }
  // addChildAfter(child: Frame, before: Frame): void {
  //   parentHelper_addChildAfter(this, child, before);
  // }
  // removeChild(child: Frame): void {
  //   parentHelper_removeChild(this, child);
  // }
  // insertOrGotoChildSelector(after: boolean, child: Frame) {
  //   parentHelper_insertOrGotoChildSelector(this, after, child);
  // }
  // deleteSelectedChildren(): void {
  //   parentHelper_deleteSelectedChildren(this);
  // }
  // moveSelectedChildrenUpOne(): void {
  //   parentHelper_moveSelectedChildrenUpOne(this);
  // }
  // moveSelectedChildrenDownOne(): void {
  //   parentHelper_moveSelectedChildrenDownOne(this);
  // }

  fieldUpdated(_field: Field): void {}

  minimumNumberOfChildrenExceeded(): boolean {
    return this.getChildren().length > 1;
  }

  // selectNextFrame(): void {
  //   this._children[0]?.select(true, false);
  // }

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

  public getDirectSuperClassesTypeAndName(transforms: Transforms) {
    if (this.doesInherit()) {
      const superClasses = this.getInheritanceItems();

      if (superClasses.length > 0) {
        const nodes = superClasses.filter((i) => isAstIdNode(i));
        const typeAndName: [SymbolType, string][] = nodes
          .map((n) => getGlobalScope(this).resolveSymbol(n.id, transforms, this))
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

  public lookForCircularDependencies(
    cf: ClassAsn,
    seenNames: string[],
    transforms: Transforms,
  ): [boolean, string] {
    if (cf.doesInherit()) {
      const superClasses = cf.getInheritanceItems();

      if (superClasses.length > 0) {
        const nodes = superClasses.filter((i) => isAstIdNode(i));
        const symbols = nodes
          .map((n) => getGlobalScope(this).resolveSymbol(n.id, transforms, this))
          .filter((n) => n instanceof ClassAsn);

        for (const s of symbols) {
          if (seenNames.includes(s.symbolId)) {
            return [true, s.symbolId];
          }
          const seenNamesThisPath = seenNames.concat([s.symbolId]);
          const [sd, name] = this.lookForCircularDependencies(s, seenNamesThisPath, transforms);
          if (sd) {
            return [sd, name];
          }
        }
      }
    }
    return [false, ""];
  }

  public getAllClasses(
    cf: ClassAsn,
    seenNames: string[],
    filter: (d: ClassAsn) => boolean,
    transforms: Transforms,
  ) {
    if (cf.doesInherit()) {
      const superClasses = cf.getInheritanceItems();

      // TODO move this (and similar elsewhere) to InheritsFromAsn ?
      if (superClasses.length > 0) {
        const nodes = superClasses.filter((i) => isAstIdNode(i));
        const symbols = nodes
          .map((n) => getGlobalScope(this).resolveSymbol(n.id, transforms, this))
          .filter(
            (n) => n instanceof ClassAsn && !this.seenTwice(n.symbolId, seenNames),
          ) as ClassAsn[];
        let allSymbols = symbols;
        seenNames.push(cf.symbolId);

        for (const s of symbols) {
          allSymbols = allSymbols.concat(this.getAllClasses(s, seenNames, filter, transforms));
        }

        return allSymbols.filter(filter);
      }
    }
    return [];
  }

  public getAllInterfaces(cf: ClassAsn, seenNames: string[], transforms: Transforms) {
    return this.getAllClasses(cf, seenNames, (s: ClassAsn) => s.isInterface, transforms);
  }

  public getAllAbstractClasses(cf: ClassAsn, seenNames: string[], transforms: Transforms) {
    return this.getAllClasses(
      cf,
      seenNames,
      (s: ClassAsn) => s.isAbstract && !s.isInterface,
      transforms,
    );
  }

  // public getConstructor(): Constructor {
  //   return this.getChildren().filter((m) => isConstructor(m))[0] as Constructor;
  // }

  // resetCompileStatusAndErrors(): void {
  //   this.getChildren().forEach((f) => f.resetCompileStatusAndErrors());
  //   super.resetCompileStatusAndErrors();
  // }

  get symbolId() {
    return getId(this.name);
  }

  symbolMatches(id: string, all: boolean, _initialScope: Scope): ElanSymbol[] {
    const otherMatches = this.getParentScope().symbolMatches(id, all, this);

    const symbols = this.getChildren().filter((f) => isSymbol(f)) as ElanSymbol[];

    const types = this.getDirectSuperClassesTypeAndName(transforms())
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

  resolveSymbol(id: string, transforms: Transforms, _initialScope: Scope): ElanSymbol {
    const symbol = this.resolveOwnSymbol(id, transforms);

    if (symbol instanceof UnknownSymbol) {
      return this.getParentScope().resolveSymbol(id, transforms, this);
    }

    return symbol;
  }

  resolveOwnSymbol(id: string, transforms: Transforms): ElanSymbol {
    if (id === thisKeyword) {
      return this;
    }

    let matches = this.getChildren().filter(
      (f) => isSymbol(f) && f.symbolId === id,
    ) as ElanSymbol[];

    const types = this.getDirectSuperClassesTypeAndName(transforms)
      .map((tn) => tn[0])
      .filter((t) => t instanceof ClassType);

    for (const ct of types) {
      const s = ct.scope!.resolveOwnSymbol(id, transforms);
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

  getName(transforms: Transforms) {
    const name = getId(this.name);
    mustBeUniqueNameInScope(
      name,
      getGlobalScope(this),
      transforms,
      this.compileErrors,
      this.fieldId,
    );
    return name;
  }

  getExtends(transforms: Transforms) {
    const typeAndName = this.getDirectSuperClassesTypeAndName(transforms);
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
    for (const n of this.children as FrameAsn[]) {
      n.updateBreakpoints(event);
    }
  }
}
