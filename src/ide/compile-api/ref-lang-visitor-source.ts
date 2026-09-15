import { TerminalNode } from "antlr4ng";
import { RefLangLexer } from "../../generated/ref-lang/RefLangLexer";
import {
  IdentifierContext,
  ParamDefContext,
  ParamsListContext,
  TypeContext,
  TypeFuncContext,
  TypeGenericContext,
  TypeNameContext,
  TypeTupleContext,
} from "../../generated/ref-lang/RefLangParser";
import { RefLangVisitor } from "../../generated/ref-lang/RefLangVisitor";
import {
  getFilteredTypes,
  getFuncTypes,
  getParamDefs,
  getTokenText,
  visitTypeHelper,
} from "./parser-helpers";

export class RefLangVisitorSource extends RefLangVisitor<string> {
  constructor() {
    super();
  }

  visitTypeTuple = (ctx: TypeTupleContext) => `(${getFilteredTypes(this, ctx).join(", ")})`;

  visitTypeName = (ctx: TypeNameContext) => this.visitChildren(ctx)!;

  visitTypeGeneric = (ctx: TypeGenericContext) =>
    `${this.visit(ctx.typeName())}<of ${getFilteredTypes(this, ctx).join(", ")}>`;

  visitTypeFunc = (ctx: TypeFuncContext) => {
    const [inTypes, returnType] = getFuncTypes(this, ctx);
    return `Func<of ${inTypes} => ${returnType}>`;
  };

  visitType = (context: TypeContext) => visitTypeHelper<string>(this, context);

  visitTerminal(ctx: TerminalNode) {
    return getTokenText(RefLangLexer.literalNames, ctx);
  }

  visitParamsList = (ctx: ParamsListContext) => `${getParamDefs<string>(this, ctx).join(", ")}`;

  visitIdentifier = (ctx: IdentifierContext) => this.visit(ctx.NAME_STARTING_LC())!;

  visitParamDef = (ctx: ParamDefContext) =>
    `${this.visit(ctx.identifier())} as ${this.visit(ctx.type())}`;
}
