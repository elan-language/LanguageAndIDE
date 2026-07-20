/* eslint-disable @typescript-eslint/no-explicit-any */
import { ElanElanVisitor } from "./antlr4-parser.js";

export class ElanElanVisitorHtml extends ElanElanVisitor {
  constructor() {
    super();
  }

  visitTypeTuple(ctx: any) {
    const types = ((this as any).visitChildren(ctx) as string[]).filter((s) => s).join(", ");
    return `(${types})`;
  }

  visitTypeName(ctx: any) {
    return (this as any).visitChildren(ctx)[0] as string;
  }

  visitTypeGeneric(ctx: any) {
    const typeName = (this as any).visit(ctx.typeName()) as string;
    const types = (this as any).visit(ctx.type()) as string[];

    return `${typeName}&lt;<el-kw>of</el-kw> ${types.join(",")}&gt;`;
  }

  override visitType(context: any) {
    const typeTuple = context.typeTuple();
    const typeName = context.typeName();
    const typeGeneric = context.typeGeneric();

    if (typeTuple) {
      return (this as any).visit(typeTuple);
    }

    if (typeName) {
      return `<el-type>${(this as any).visit(typeName)}</el-type>`;
    }

    if (typeGeneric) {
      return (this as any).visit(typeGeneric);
    }

    throw new Error(context.children.First().GetText());
  }

  visitTerminal(ctx: any) {
    return ctx.symbol.text;
  }
}
