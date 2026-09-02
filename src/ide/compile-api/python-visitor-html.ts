import { TerminalNode } from "antlr4ng";
import {
  TypeTupleContext,
  TypeNameContext,
  TypeGenericContext,
  TypeContext,
} from "../../generated/python/PythonParser";
import { PythonVisitor } from "../../generated/python/PythonVisitor";
import { Language } from "../frames/frame-interfaces/language";

export class PythonVisitorHtml extends PythonVisitor<string> {
  constructor(private readonly language: Language) {
    super();
  }

  filterTokens(s: string) {
    return s.trim() && s !== "(" && s !== ")" && s !== ",";
  }

  visitTypeTuple = (_ctx: TypeTupleContext) => {
    // const types = ((this as any).visitChildren(ctx) as string[])
    //   .filter((s) => this.filterTokens(s))
    //   .join(", ");
    const op = this.language.TUPLE_START;
    const cl = this.language.TUPLE_END;

    return `${op}${""}${cl}`;
  };

  visitTypeName = (ctx: TypeNameContext) => {
    const type = this.visitChildren(ctx) ?? "";
    return `<el-type>${this.language.mapElanTypeToLanguageType(type)}</el-type>`;
  };

  visitTypeGeneric = (ctx: TypeGenericContext) => {
    const typeName = this.visit(ctx.typeName()) as string;
    //const types = this.visit(ctx.type_());

    const op = this.language.START_OF_GENERIC.replace("<", "&lt;").replace(
      "of",
      "<el-kw>of</el-kw>",
    );
    const end = this.language.END_OF_GENERIC.replace(">", "&gt;");

    return `${typeName}${op}${""}${end}`;
  };

  override visitType = (context: TypeContext) => {
    const typeTuple = context.typeTuple();
    const typeName = context.typeName();
    const typeGeneric = context.typeGeneric();

    if (typeTuple) {
      return this.visit(typeTuple)!;
    }

    if (typeName) {
      return this.visit(typeName)!;
    }

    if (typeGeneric) {
      return this.visit(typeGeneric)!;
    }

    throw new Error(context.getText());
  };

  visitTerminal(ctx: TerminalNode) {
    return this.language.mapLanguageTypeToElanType(ctx.symbol.text!);
  }
}
