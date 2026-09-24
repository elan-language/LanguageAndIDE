import { TerminalNode } from "antlr4ng";
import { getTokenTextByName } from "../../compiler/syntax-nodes/ast-helpers";
import {
  ArgListContext,
  BinaryExpressionContext,
  BinaryOperatorContext,
  ChainableContext,
  CommentTextContext,
  EnumValueContext,
  ExpressionContext,
  IdentifierContext,
  IndexContext,
  LitFloatContext,
  LitIntContext,
  MethodCallContext,
  ParamDefContext,
  ParamsListContext,
  TermContext,
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

  visitLitInt = (ctx: LitIntContext) =>
    this.visitChildren(ctx) ? this.visitChildren(ctx)!.toLowerCase() : "";

  visitLitFloat = (ctx: LitFloatContext) =>
    this.visitChildren(ctx) ? this.visitChildren(ctx)!.toLowerCase() : "";

  visitArgList = (ctx: ArgListContext) => `${getArgs<string>(this, ctx).join(", ")}`;

  visitMethodCall = (ctx: MethodCallContext) => {
    const argList = ctx.argList();
    const args = argList ? this.visit(argList) : "";
    const name = this.visit(ctx.methodName());

    return `${name}(${args})`;
  };

  visitIndex = (ctx: IndexContext) => {
    const expr = this.visit(ctx.expression()) ?? "";
    return `[${expr}]`;
  };

  visitChainable = (ctx: ChainableContext) => {
    const indices = ctx
      .index()
      .map((i) => this.visit(i))
      .join("");
    const methodCall = ctx.methodCall();
    const identifier = ctx.identifier();
    const prefix = methodCall ? this.visit(methodCall) : this.visit(identifier!);
    return `${prefix}${indices}`;
  };

  visitEnumValue = (ctx: EnumValueContext) =>
    `${ctx.typeName().getText()}.${ctx.identifier().getText()}`;

    visitBinaryOperator = (ctx: BinaryOperatorContext) => this.formatBinaryOp(ctx.getText());
  
    private formatBinaryOp(txt: string): string {
      let src = txt;
      if (txt !== "*" && txt !== "/") {
        src = ` ${txt} `;
      } 
      return src;
    }  

  visitTerm = (ctx: TermContext) => this.visitChildren(ctx) ?? "";
  visitExpression = (ctx: ExpressionContext) => this.visitChildren(ctx) ?? "";

    visitBinaryExpression = (ctx: BinaryExpressionContext) => 
      `${this.visitTerm(ctx.term())}${this.visitBinaryOperator(ctx.binaryOperator())}${this.visitExpression(ctx.expression())}`;
}
