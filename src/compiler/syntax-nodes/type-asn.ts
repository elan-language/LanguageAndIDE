import { AstNode } from "../../compiler/compiler-interfaces/ast-node";
import { AstTypeNode } from "../../compiler/compiler-interfaces/ast-type-node";
import { Scope } from "../../compiler/compiler-interfaces/scope";
import { isAnyDictionary } from "../../compiler/compiler-interfaces/type-options";
import { ClassType } from "../../compiler/symbols/class-type";
import { FunctionType } from "../../compiler/symbols/function-type";
import { StringType } from "../../compiler/symbols/string-type";
import {
  getGlobalScope,
  isClass,
  isReifyableSymbolType,
} from "../../compiler/symbols/symbol-helpers";
import { TupleType } from "../../compiler/symbols/tuple-type";
import { UnknownType } from "../../compiler/symbols/unknown-type";
import {
  checkForDeprecation,
  mustBeImmutableGenericType,
  mustBeKnownSymbolType,
  mustBeValidKeyType,
  mustMatchGenericParameters,
} from "../compile-rules";
import { libraryKeyword } from "../keywords";
import { AbstractAstNode } from "./abstract-ast-node";
import { isAstQualifierNode } from "./ast-helpers";
import { FixedIdAsn } from "./fixed-id-asn";

export class TypeAsn extends AbstractAstNode implements AstTypeNode {
  constructor(
    public readonly id: string,
    public readonly qualifier: AstNode,
    public readonly genericParameters: AstNode[],
    public readonly fieldId: string,
    private readonly scope: Scope,
  ) {
    super();
  }

  expectedMinimumGenericParameters() {
    const st = this.symbolType();

    if (st instanceof StringType) {
      return 0;
    }

    if (st instanceof TupleType) {
      return st.ofTypes.length;
    }

    if (st instanceof ClassType && isClass(st.scope)) {
      return st.scope.ofTypes.length;
    }

    if (st instanceof FunctionType) {
      return st.parameterTypes.length + 1;
    }

    return 0;
  }

  commonCompile() {
    this.compileErrors = [];
    const rootSt = this.rootSymbol().symbolType();

    mustBeKnownSymbolType(rootSt, this.id, this.compileErrors, this.fieldId);

    mustMatchGenericParameters(
      this.genericParameters,
      this.expectedMinimumGenericParameters(),
      this.compileErrors,
      this.fieldId,
    );

    if (rootSt instanceof ClassType) {
      // check after generic parameters
      checkForDeprecation(rootSt, this.scope, this.compileErrors, this.fieldId);
    }

    for (const gp of this.genericParameters) {
      gp.compile();
    }

    if (isAnyDictionary(rootSt.typeOptions) && this.genericParameters.length > 0) {
      mustBeValidKeyType(
        rootSt,
        this.genericParameters[0].symbolType(),
        this.compileErrors,
        this.fieldId,
      );
    }

    if (rootSt.typeOptions.isImmutable) {
      for (const gp of this.genericParameters) {
        mustBeImmutableGenericType(rootSt, gp.symbolType(), this.compileErrors, this.fieldId);
      }
    }
  }

  compile(): string {
    this.commonCompile();
    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);
    return this.id;
  }

  compileToEmptyObjectCode(): string {
    this.commonCompile();
    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);
    return this.symbolType().initialValue;
  }

  getGenericParameterSymbolTypes() {
    return this.genericParameters.map((gp) => gp.symbolType());
  }

  isLibraryQualified() {
    return (
      isAstQualifierNode(this.qualifier) &&
      (this.qualifier.value as FixedIdAsn).id === libraryKeyword
    );
  }

  rootSymbol() {
    const globalScope = getGlobalScope(this.scope);
    const scope = this.isLibraryQualified() ? globalScope.libraryScope : globalScope;
    return scope.resolveSymbol(this.id, true, this.scope);
  }

  symbolType() {
    const symbol = this.rootSymbol();
    const st = symbol.symbolType();

    if (isReifyableSymbolType(st)) {
      return st.reify(this.getGenericParameterSymbolTypes());
    }

    if (st instanceof TupleType) {
      return new TupleType(this.getGenericParameterSymbolTypes());
    }

    if (st instanceof FunctionType) {
      const names = this.genericParameters.map((_p, i) => `parameter${i}`);
      const types = this.genericParameters.map((p) => p.symbolType());
      const pNames = names.slice(0, -1);
      const pTypes = types.slice(0, -1);
      const rType = types[types.length - 1] ?? UnknownType.Instance;
      return new FunctionType(pNames, pTypes, rType, false, true, true, st.deprecated);
    }

    return st;
  }

  toString() {
    const pp = this.genericParameters.map((p) => p.toString()).join(", ");
    const gp = pp ? `<${pp}>` : "";
    return `${this.id}${gp}`;
  }
}
