import { ArrayListType } from "../symbols/array-list-type";
import { DictionaryType } from "../symbols/dictionary-type";
import { FunctionType } from "../symbols/function-type";
import { GenericParameterType } from "../symbols/generic-parameter-type";
import { IterType } from "../symbols/iter-type";
import { ImmutableListType } from "../symbols/immutable-list-type";
import { SymbolType } from "../interfaces/symbol-type";
import { UnknownType } from "../symbols/unknown-type";
import { CompileError } from "../compile-error";
import {
  mustBeKnownSymbol,
  mustBePureFunctionSymbol,
  mustCallExtensionViaQualifier,
  mustMatchParameters,
} from "../compile-rules";
import { Scope } from "../interfaces/scope";
import { AbstractAstNode } from "./abstract-ast-node";
import { AstNode } from "../interfaces/ast-node";
import { AstIdNode } from "../interfaces/ast-id-node";
import { QualifierAsn } from "./qualifier-asn";
import { transforms } from "./ast-helpers";
import {
  getParentScope,
  scopePrefix,
  updateScopeAndQualifier,
} from "../symbols/symbol-helpers";
import { TupleType } from "../symbols/tuple-type";

export class FuncCallAsn extends AbstractAstNode implements AstIdNode {
  constructor(
    public readonly id: string,
    private readonly qualifier: AstNode | undefined,
    private readonly parameters: Array<AstNode>,
    public readonly fieldId: string,
    private readonly scope: Scope,
  ) {
    super();
    this.id = id.trim();
  }

  aggregateCompileErrors(): CompileError[] {
    let cc: CompileError[] = [];

    for (const i of this.parameters) {
      cc = cc.concat(i.aggregateCompileErrors());
    }

    if (this.qualifier) {
      cc.concat(this.qualifier.aggregateCompileErrors());
    }

    return this.compileErrors.concat(cc);
  }

  compile(): string {
    this.compileErrors = [];

    let parameters = [...this.parameters];
    const [updatedQualifier, currentScope] = updateScopeAndQualifier(
      this.qualifier as QualifierAsn | undefined,
      transforms(),
      this.scope,
    );

    const funcSymbol = currentScope.resolveSymbol(
      this.id,
      transforms(),
      this.scope,
    );
    const fst = funcSymbol.symbolType(transforms());
    let qualifier = updatedQualifier;

    mustBeKnownSymbol(funcSymbol, this.compileErrors, this.fieldId);
    mustBePureFunctionSymbol(fst, this.scope, this.compileErrors, this.fieldId);

    if (fst instanceof FunctionType) {
      mustCallExtensionViaQualifier(
        fst,
        qualifier,
        this.compileErrors,
        this.fieldId,
      );

      if (fst.isExtension && qualifier instanceof QualifierAsn) {
        parameters = [qualifier.value as AstNode].concat(parameters);
        qualifier = undefined;
      }

      mustMatchParameters(
        parameters,
        fst.parametersTypes,
        this.compileErrors,
        this.fieldId,
      );
    }

    const pp = parameters.map((p) => p.compile()).join(", ");
    const q = qualifier
      ? `${qualifier.compile()}`
      : scopePrefix(funcSymbol?.symbolScope);
    return `${q}${this.id}(${pp})`;
  }

  flatten(p: SymbolType): SymbolType[] {
    if (
      p instanceof ArrayListType ||
      p instanceof ImmutableListType ||
      p instanceof IterType
    ) {
      return this.flatten(p.ofType);
    }

    if (p instanceof DictionaryType) {
      return this.flatten(p.keyType).concat(this.flatten(p.valueType));
    }

    if (p instanceof TupleType) {
      let flattened = [] as SymbolType[];
      for (const t of p.ofTypes) {
        flattened = flattened.concat(this.flatten(t));
      }
      return [new TupleType(flattened)];
    }

    return [p];
  }

  containsGenericType(type: SymbolType): boolean {
    if (type instanceof GenericParameterType) {
      return true;
    }
    if (
      type instanceof ArrayListType ||
      type instanceof ImmutableListType ||
      type instanceof IterType
    ) {
      return this.containsGenericType(type.ofType);
    }
    if (type instanceof DictionaryType) {
      return (
        this.containsGenericType(type.keyType) ||
        this.containsGenericType(type.valueType)
      );
    }

    if (type instanceof TupleType) {
      return type.ofTypes.some(t => this.containsGenericType(t));
    }

    return false;
  }

  generateType(type: SymbolType, matches: Map<string, SymbolType>): SymbolType {
    if (type instanceof GenericParameterType) {
      return matches.get(type.id) ?? UnknownType.Instance;
    }
    if (type instanceof ArrayListType) {
      return new ArrayListType(
        this.generateType(type.ofType, matches),
        type.is2d,
      );
    }
    if (type instanceof ImmutableListType) {
      return new ImmutableListType(this.generateType(type.ofType, matches));
    }
    if (type instanceof IterType) {
      return new IterType(this.generateType(type.ofType, matches));
    }
    if (type instanceof DictionaryType) {
      return new DictionaryType(
        this.generateType(type.keyType, matches),
        this.generateType(type.valueType, matches),
        type.isImmutable,
      );
    }

    return UnknownType.Instance;
  }

  match(flattened : SymbolType[][], pTypes : SymbolType[][], matches : Map<string, SymbolType>) {
    for (let i = 0; i < flattened.length; i++) {
      const pt = flattened[i];
      const pst = pTypes[i];

      for (let i = 0; i < pt.length; i++) {
        const t = pt[i];
        const st = pst[i];

        if (t instanceof GenericParameterType) {
          matches.set(t.id, st);
        }

        if (t instanceof TupleType && st instanceof TupleType) {
          this.match([t.ofTypes], [st.ofTypes], matches);
        }

      }
    }
  }


  matchGenericTypes(type: FunctionType, parameters: AstNode[]) {
    const matches = new Map<string, SymbolType>();

    const flattened = type.parametersTypes.map((n) => this.flatten(n));

    if (type.isExtension && this.qualifier) {
      parameters = [(this.qualifier as QualifierAsn).value as AstNode].concat(
        parameters,
      );
    }

    const pTypes = parameters.map((p) => this.flatten(p.symbolType()));

    this.match(flattened, pTypes, matches);

    return matches;
  }

  symbolType() {
    const type = getParentScope(this.scope)
      .resolveSymbol(this.id, transforms(), this.scope)
      .symbolType(transforms());

    if (type instanceof FunctionType) {
      const returnType = type.returnType;

      if (this.containsGenericType(returnType)) {
        const matches = this.matchGenericTypes(type, this.parameters);
        return this.generateType(returnType, matches);
      }
      return returnType;
    }

    return type;
  }

  toString() {
    const pp = this.parameters.map((p) => p.toString()).join(", ");
    const q = this.qualifier ? `${this.qualifier}` : "";
    return `Func Call ${q}${this.id} (${pp})`;
  }
}
