import { TerminalNode } from "antlr4ng";
import { PythonLexer } from "../../generated/python/PythonLexer";
import {
  TypeContext,
  TypeFuncContext,
  TypeGenericContext,
  TypeNameContext,
  TypeTupleContext,
} from "../../generated/python/PythonParser";
import { PythonVisitor } from "../../generated/python/PythonVisitor";
import { Language } from "../frames/frame-interfaces/language";
import { getFilteredTypes, getFuncTypes, getTokenText, visitType } from "./parser-helpers";

export class PythonVisitorHtml extends PythonVisitor<string> {
  constructor(private readonly language: Language) {
    super();
  }

  visitTypeTuple = (ctx: TypeTupleContext) => `tuple[${getFilteredTypes(this, ctx).join(", ")}]`;

  visitTypeName = (ctx: TypeNameContext) => `<el-type>${this.visitChildren(ctx) ?? ""}</el-type>`;

  visitTypeGeneric = (ctx: TypeGenericContext) =>
    `${this.visit(ctx.typeName())}[${getFilteredTypes(this, ctx).join(", ")}]`;

  visitTypeFunc = (ctx: TypeFuncContext) => {
    const [inTypes, returnType] = getFuncTypes(this, ctx);
    return `Callable[[${inTypes}]${returnType}]`;
  };

  visitType = (context: TypeContext) => visitType<string>(this, context);

  visitTerminal(ctx: TerminalNode) {
    return getTokenText(PythonLexer.literalNames, ctx);
  }
}
