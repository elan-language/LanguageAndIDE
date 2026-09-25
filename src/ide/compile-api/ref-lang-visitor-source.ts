import { TerminalNode } from "antlr4ng";
import { getTokenTextByName } from "../../compiler/syntax-nodes/ast-helpers";
import {
  ArgListContext,
  BinaryExpressionContext,
  BinaryOperatorContext,
  ChainableContext,
  CommentTextContext,
  EnumValueContext,
  IdentifierContext,
  IndexContext,
  LitFloatContext,
  LitIntContext,
  MethodCallContext,
  NegateLogicalContext,
  NegateNumericContext,
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

  visitCommentText = (ctx: CommentTextContext) => ctx.getText();

  visitLitInt = (ctx: LitIntContext) => (this.visitChildren(ctx) ?? "").toLowerCase();

  visitLitFloat = (ctx: LitFloatContext) => (this.visitChildren(ctx) ?? "").toLowerCase();

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
    `${this.visit(ctx.typeName())}.${this.visit(ctx.identifier())}`;

  visitBinaryOperator = (ctx: BinaryOperatorContext) => {
    const txt = ctx.getText();
    return txt !== "*" && txt !== "/" ? ` ${txt} ` : txt;
  };

  visitBinaryExpression = (ctx: BinaryExpressionContext) =>
    `${this.visit(ctx.term())}${this.visit(ctx.binaryOperator())}${this.visit(ctx.expression())}`;

  visitNegateNumeric = (ctx: NegateNumericContext) =>
    `${this.visit(ctx.MINUS())}${this.visit(ctx.term())}`;
  visitNegateLogical = (ctx: NegateLogicalContext) => {
    let not = ctx.NOT().getText();
    if (/^[A-Za-z]+$/.test(not)) {
      not = `${not} `;
    }
    return `${not}${this.visit(ctx.term())}`;
  };
}
