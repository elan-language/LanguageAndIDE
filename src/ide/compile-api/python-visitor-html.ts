import { TerminalNode } from "antlr4ng";
import { PythonLexer } from "../../generated/python/PythonLexer";
import {
  IdentifierContext,
  ParamDefContext,
  ParamsListContext,
  TypeContext,
  TypeFuncContext,
  TypeGenericContext,
  TypeNameContext,
  TypeTupleContext,
} from "../../generated/python/PythonParser";
import { PythonVisitor } from "../../generated/python/PythonVisitor";
import {
  getFilteredTypes,
  getFuncTypes,
  getParamDefs,
  getTokenText,
  visitTypeHelper,
} from "./parser-helpers";

export class PythonVisitorHtml extends PythonVisitor<string> {
  constructor() {
    super();
  }

  visitTypeTuple = (ctx: TypeTupleContext) =>
    `<el-kw>tuple</el-kw>[${getFilteredTypes(this, ctx).join(", ")}]`;

  visitTypeName = (ctx: TypeNameContext) => `<el-type>${this.visitChildren(ctx) ?? ""}</el-type>`;

  visitTypeGeneric = (ctx: TypeGenericContext) =>
    `${this.visit(ctx.typeName())}[${getFilteredTypes(this, ctx).join(", ")}]`;

  visitTypeFunc = (ctx: TypeFuncContext) => {
    const [inTypes, returnType] = getFuncTypes(this, ctx);
    return `<el-type>Callable</el-type>[[${inTypes}], ${returnType}]`;
  };

  visitType = (ctx: TypeContext) => visitTypeHelper<string>(this, ctx);

  visitTerminal(ctx: TerminalNode) {
    return getTokenText(PythonLexer.literalNames, ctx);
  }

  visitParamsList = (ctx: ParamsListContext) => `${getParamDefs<string>(this, ctx).join(", ")}`;

  visitIdentifier = (ctx: IdentifierContext) =>
    `<el-id>${this.visit(ctx.NAME_STARTING_LC())}</el-id>`;

  visitParamDef = (ctx: ParamDefContext) =>
    `${this.visit(ctx.identifier())}: ${this.visit(ctx.type())}`;
}
