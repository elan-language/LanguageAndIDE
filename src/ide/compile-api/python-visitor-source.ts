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
import { getFilteredTypes, getFuncTypes, getTokenText, visitType } from "./parser-helpers";

export class PythonVisitorSource extends PythonVisitor<string> {
  constructor() {
    super();
  }

  visitTypeTuple = (ctx: TypeTupleContext) => `tuple[${getFilteredTypes(this, ctx).join(", ")}]`;

  visitTypeName = (ctx: TypeNameContext) => this.visitChildren(ctx)!;

  visitTypeGeneric = (ctx: TypeGenericContext) =>
    `${this.visit(ctx.typeName())}[${getFilteredTypes(this, ctx).join(", ")}]`;

  visitTypeFunc = (ctx: TypeFuncContext) => {
    const [inTypes, returnType] = getFuncTypes(this, ctx);
    return `Callable[[${inTypes}]${returnType}]`;
  };

  override visitType = (context: TypeContext) => visitType<string>(this, context);

  visitTerminal(ctx: TerminalNode) {
    return getTokenText(PythonLexer.literalNames, ctx);
  }
}
