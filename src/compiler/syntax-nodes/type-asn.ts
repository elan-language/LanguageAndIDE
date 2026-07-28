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
  mustBeReferenceGenericType,
  mustBeValidKeyType,
  mustMatchGenericParameters,
} from "../compile-rules";
import { AbstractAstNode } from "./abstract-ast-node";
import { isAstIdNode } from "./ast-helpers";

export class TypeAsn extends AbstractAstNode implements AstTypeNode {
  constructor(
    public readonly name: AstNode,
    public readonly genericParameters: AstNode[],
    public readonly fieldId: string,
    private readonly scope: Scope,
  ) {
    super();
  }

  get id() {
    return isAstIdNode(this.name) ? this.name.id : this.name.compile();
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

    this.name.compile();

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
        this.scope,
      );
    }

    if (rootSt.typeOptions.isImmutable) {
      for (const gp of this.genericParameters) {
        mustBeImmutableGenericType(
          rootSt,
          gp.symbolType(),
          this.compileErrors,
          this.fieldId,
          this.scope,
        );
      }
    }

    if (rootSt instanceof ClassType && rootSt.className === "Maybe") {
      for (const gp of this.genericParameters) {
        mustBeReferenceGenericType(
          rootSt,
          gp.symbolType(),
          this.compileErrors,
          this.fieldId,
          this.scope,
        );
      }
    }
  }

  compile(): string {
    this.commonCompile();
    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);
    return this.name.compile();
  }

  compileToEmptyObjectCode(): string {
    this.commonCompile();
    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);
    return this.symbolType().initialValue;
  }

  getGenericParameterSymbolTypes() {
    return this.genericParameters.map((gp) => gp.symbolType());
  }

  rootSymbol() {
    if (isAstIdNode(this.name)) {
      const scope = getGlobalScope(this.scope);
      return scope.resolveSymbol(this.name.id, true, this.scope);
    }

    return this.name;
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
      return new FunctionType(false, pNames, pTypes, rType, false, true, true, st.deprecated);
    }

    return st;
  }

  toString() {
    const pp = this.genericParameters.map((p) => p.toString()).join(", ");
    const gp = pp ? `<${pp}>` : "";
    return `${this.id}${gp}`;
  }
}
