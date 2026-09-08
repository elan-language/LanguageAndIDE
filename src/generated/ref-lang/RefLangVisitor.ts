// Generated from src/grammars/ref-lang/RefLang.g4 by ANTLR 4.13.1

import { AbstractParseTreeVisitor } from "antlr4ng";

import { FileContext } from "./RefLangParser.js";
import { GlobalContext } from "./RefLangParser.js";
import { MainContext } from "./RefLangParser.js";
import { FunctionContext } from "./RefLangParser.js";
import { TestContext } from "./RefLangParser.js";
import { ProcedureContext } from "./RefLangParser.js";
import { ConstantContext } from "./RefLangParser.js";
import { EnumContext } from "./RefLangParser.js";
import { ConcreteClassContext } from "./RefLangParser.js";
import { AbstractClassContext } from "./RefLangParser.js";
import { CommentGlobalContext } from "./RefLangParser.js";
import { OrdinaryStatementContext } from "./RefLangParser.js";
import { IfStatementContext } from "./RefLangParser.js";
import { WhileLoopContext } from "./RefLangParser.js";
import { ForLoopContext } from "./RefLangParser.js";
import { TryStatementContext } from "./RefLangParser.js";
import { AssertContext } from "./RefLangParser.js";
import { LetStatementContext } from "./RefLangParser.js";
import { PrintContext } from "./RefLangParser.js";
import { VariableDefinitionContext } from "./RefLangParser.js";
import { AssignmentContext } from "./RefLangParser.js";
import { InputStatementContext } from "./RefLangParser.js";
import { ProcedureCallContext } from "./RefLangParser.js";
import { ThrowStatementContext } from "./RefLangParser.js";
import { ReturnStatementContext } from "./RefLangParser.js";
import { ElseIfClauseContext } from "./RefLangParser.js";
import { ElseClauseContext } from "./RefLangParser.js";
import { CatchStatementContext } from "./RefLangParser.js";
import { CommentStatementContext } from "./RefLangParser.js";
import { ConstructorMemberContext } from "./RefLangParser.js";
import { PropertyContext } from "./RefLangParser.js";
import { FunctionMethodContext } from "./RefLangParser.js";
import { ProcedureMethodContext } from "./RefLangParser.js";
import { AbstractFunctionContext } from "./RefLangParser.js";
import { AbstractProcedureContext } from "./RefLangParser.js";
import { CommentMemberContext } from "./RefLangParser.js";
import { IdentifierContext } from "./RefLangParser.js";
import { AssignableContext } from "./RefLangParser.js";
import { MethodNameContext } from "./RefLangParser.js";
import { TestNameContext } from "./RefLangParser.js";
import { TypeNameContext } from "./RefLangParser.js";
import { ConstantValueContext } from "./RefLangParser.js";
import { ArgListContext } from "./RefLangParser.js";
import { ArgumentContext } from "./RefLangParser.js";
import { ParamsListContext } from "./RefLangParser.js";
import { TypeContext } from "./RefLangParser.js";
import { EnumValuesListContext } from "./RefLangParser.js";
import { AssertActualContext } from "./RefLangParser.js";
import { LitValueContext } from "./RefLangParser.js";
import { LitBooleanContext } from "./RefLangParser.js";
import { LitIntContext } from "./RefLangParser.js";
import { LitFloatContext } from "./RefLangParser.js";
import { EnumValueContext } from "./RefLangParser.js";
import { LitStringContext } from "./RefLangParser.js";
import { IndexContext } from "./RefLangParser.js";
import { IdentifierWithOptIndexesContext } from "./RefLangParser.js";
import { PropertyRefContext } from "./RefLangParser.js";
import { ExpressionContext } from "./RefLangParser.js";
import { TermContext } from "./RefLangParser.js";
import { ChainHeadContext } from "./RefLangParser.js";
import { ChainableContext } from "./RefLangParser.js";
import { BracketedExpressionContext } from "./RefLangParser.js";
import { UnaryExpressionContext } from "./RefLangParser.js";
import { BinaryExpressionContext } from "./RefLangParser.js";
import { TupleContext } from "./RefLangParser.js";
import { MethodCallContext } from "./RefLangParser.js";
import { BinaryOperatorContext } from "./RefLangParser.js";
import { NewInstanceContext } from "./RefLangParser.js";
import { ParamDefContext } from "./RefLangParser.js";
import { TypeGenericContext } from "./RefLangParser.js";
import { TypeFuncContext } from "./RefLangParser.js";
import { TypeTupleContext } from "./RefLangParser.js";
import { LambdaContext } from "./RefLangParser.js";
import { ListContext } from "./RefLangParser.js";
import { InterpolatedStringContext } from "./RefLangParser.js";
import { PowerContext } from "./RefLangParser.js";

/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `RefLangParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export class RefLangVisitor<Result> extends AbstractParseTreeVisitor<Result> {
  /**
   * Visit a parse tree produced by `RefLangParser.file`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitFile?: (ctx: FileContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.global`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitGlobal?: (ctx: GlobalContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.main`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitMain?: (ctx: MainContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.function`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitFunction?: (ctx: FunctionContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.test`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTest?: (ctx: TestContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.procedure`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitProcedure?: (ctx: ProcedureContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.constant`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitConstant?: (ctx: ConstantContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.enum`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitEnum?: (ctx: EnumContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.concreteClass`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitConcreteClass?: (ctx: ConcreteClassContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.abstractClass`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitAbstractClass?: (ctx: AbstractClassContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.commentGlobal`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitCommentGlobal?: (ctx: CommentGlobalContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.ordinaryStatement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitOrdinaryStatement?: (ctx: OrdinaryStatementContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.ifStatement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitIfStatement?: (ctx: IfStatementContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.whileLoop`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitWhileLoop?: (ctx: WhileLoopContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.forLoop`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitForLoop?: (ctx: ForLoopContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.tryStatement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTryStatement?: (ctx: TryStatementContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.assert`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitAssert?: (ctx: AssertContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.letStatement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitLetStatement?: (ctx: LetStatementContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.print`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPrint?: (ctx: PrintContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.variableDefinition`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitVariableDefinition?: (ctx: VariableDefinitionContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.assignment`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitAssignment?: (ctx: AssignmentContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.inputStatement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitInputStatement?: (ctx: InputStatementContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.procedureCall`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitProcedureCall?: (ctx: ProcedureCallContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.throwStatement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitThrowStatement?: (ctx: ThrowStatementContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.returnStatement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitReturnStatement?: (ctx: ReturnStatementContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.elseIfClause`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitElseIfClause?: (ctx: ElseIfClauseContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.elseClause`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitElseClause?: (ctx: ElseClauseContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.catchStatement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitCatchStatement?: (ctx: CatchStatementContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.commentStatement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitCommentStatement?: (ctx: CommentStatementContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.constructorMember`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitConstructorMember?: (ctx: ConstructorMemberContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.property`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitProperty?: (ctx: PropertyContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.functionMethod`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitFunctionMethod?: (ctx: FunctionMethodContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.procedureMethod`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitProcedureMethod?: (ctx: ProcedureMethodContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.abstractFunction`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitAbstractFunction?: (ctx: AbstractFunctionContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.abstractProcedure`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitAbstractProcedure?: (ctx: AbstractProcedureContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.commentMember`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitCommentMember?: (ctx: CommentMemberContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.identifier`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitIdentifier?: (ctx: IdentifierContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.assignable`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitAssignable?: (ctx: AssignableContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.methodName`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitMethodName?: (ctx: MethodNameContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.testName`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTestName?: (ctx: TestNameContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.typeName`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTypeName?: (ctx: TypeNameContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.constantValue`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitConstantValue?: (ctx: ConstantValueContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.argList`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitArgList?: (ctx: ArgListContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.argument`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitArgument?: (ctx: ArgumentContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.paramsList`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitParamsList?: (ctx: ParamsListContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.type`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitType?: (ctx: TypeContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.enumValuesList`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitEnumValuesList?: (ctx: EnumValuesListContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.assertActual`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitAssertActual?: (ctx: AssertActualContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.litValue`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitLitValue?: (ctx: LitValueContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.litBoolean`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitLitBoolean?: (ctx: LitBooleanContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.litInt`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitLitInt?: (ctx: LitIntContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.litFloat`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitLitFloat?: (ctx: LitFloatContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.enumValue`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitEnumValue?: (ctx: EnumValueContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.litString`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitLitString?: (ctx: LitStringContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.index`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitIndex?: (ctx: IndexContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.identifierWithOptIndexes`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitIdentifierWithOptIndexes?: (ctx: IdentifierWithOptIndexesContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.propertyRef`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPropertyRef?: (ctx: PropertyRefContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitExpression?: (ctx: ExpressionContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.term`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTerm?: (ctx: TermContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.chainHead`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitChainHead?: (ctx: ChainHeadContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.chainable`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitChainable?: (ctx: ChainableContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.bracketedExpression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitBracketedExpression?: (ctx: BracketedExpressionContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.unaryExpression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitUnaryExpression?: (ctx: UnaryExpressionContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.binaryExpression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitBinaryExpression?: (ctx: BinaryExpressionContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.tuple`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTuple?: (ctx: TupleContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.methodCall`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitMethodCall?: (ctx: MethodCallContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.binaryOperator`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitBinaryOperator?: (ctx: BinaryOperatorContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.newInstance`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitNewInstance?: (ctx: NewInstanceContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.paramDef`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitParamDef?: (ctx: ParamDefContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.typeGeneric`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTypeGeneric?: (ctx: TypeGenericContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.typeFunc`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTypeFunc?: (ctx: TypeFuncContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.typeTuple`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTypeTuple?: (ctx: TypeTupleContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.lambda`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitLambda?: (ctx: LambdaContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.list`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitList?: (ctx: ListContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.interpolatedString`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitInterpolatedString?: (ctx: InterpolatedStringContext) => Result;
  /**
   * Visit a parse tree produced by `RefLangParser.power`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPower?: (ctx: PowerContext) => Result;
}
