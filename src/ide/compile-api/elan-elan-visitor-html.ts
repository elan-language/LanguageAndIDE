/* eslint-disable @typescript-eslint/no-explicit-any */
import { Language } from "../frames/frame-interfaces/language.js";
import { ElanElanVisitor } from "./antlr4-parser.js";

export class ElanElanVisitorHtml extends ElanElanVisitor {
  constructor(private readonly language: Language) {
    super();
  }

  filterTokens(s: string) {
    return s.trim() && s !== "(" && s !== ")" && s !== ",";
  }

  visitTypeTuple(ctx: any) {
    const types = ((this as any).visitChildren(ctx) as string[])
      .filter((s) => this.filterTokens(s))
      .join(", ");
    const op = this.language.TUPLE_START;
    const cl = this.language.TUPLE_END;

    return `${op}${types}${cl}`;
  }

  visitTypeName(ctx: any) {
    const type = (this as any).visitChildren(ctx)[0] as string;
    return `<el-type>${this.language.mapType(type)}</el-type>`;
  }

  visitTypeGeneric(ctx: any) {
    const typeName = (this as any).visit(ctx.typeName()) as string;
    const types = (this as any).visit(ctx.type()) as string[];

    const op = this.language.START_OF_GENERIC.replace("<", "&lt;").replace(
      "of",
      "<el-kw>of</el-kw>",
    );
    const end = this.language.END_OF_GENERIC.replace(">", "&gt;");

    return `${typeName}${op}${types.join(", ")}${end}`;
  }

  override visitType(context: any) {
    const typeTuple = context.typeTuple();
    const typeName = context.typeName();
    const typeGeneric = context.typeGeneric();

    if (typeTuple) {
      return (this as any).visit(typeTuple);
    }

    if (typeName) {
      return (this as any).visit(typeName);
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
