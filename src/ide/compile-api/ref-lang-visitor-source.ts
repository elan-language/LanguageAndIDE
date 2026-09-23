import { TerminalNode } from "antlr4ng";
import { getTokenTextByName } from "../../compiler/syntax-nodes/ast-helpers";
import {
  ArgListContext,
  CommentTextContext,
  IdentifierContext,
  MethodCallContext,
  ParamDefContext,
  ParamsListContext,
  TestNameContext,
  TypeContext,
  TypeFuncContext,
  TypeGenericContext,
  TypeNameContext,
  TypeTupleContext,
} from "../../generated/ref-lang/RefLangParser";
import { RefLangVisitor } from "../../generated/ref-lang/RefLangVisitor";
import { Language } from "../frames/frame-interfaces/language";
import {
  getArgs,
  getFilteredTypes,
  getFuncTypes,
  getParamDefs,
  visitTypeHelper,
} from "./parser-helpers";

export class RefLangVisitorSource extends RefLangVisitor<string> {
  constructor(private readonly language: Language) {
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
    return getTokenTextByName(this.language, ctx.getText());
  }

  visitParamsList = (ctx: ParamsListContext) => `${getParamDefs<string>(this, ctx).join(", ")}`;

  visitIdentifier = (ctx: IdentifierContext) => ctx.NAME_STARTING_LC().getText();

  visitMethodName = (ctx: IdentifierContext) => ctx.NAME_STARTING_LC().getText();

  visitParamDef = (ctx: ParamDefContext) =>
    `${this.visit(ctx.identifier())} as ${this.visit(ctx.type())}`;

  visitTestName = (ctx: TestNameContext) => ctx.NAME_STARTING_TEST_().getText();

  visitCommentText = (ctx: CommentTextContext) => {
    return ctx.getText();
  };

  visitArgList = (ctx: ArgListContext) => `${getArgs<string>(this, ctx).join(", ")}`;

  visitMethodCall = (ctx: MethodCallContext) => {
    const argList = ctx.argList();
    const args = argList ? this.visit(argList) : "";
    const name = this.visit(ctx.methodName());

    return `${name}(${args})`;
  };
}
