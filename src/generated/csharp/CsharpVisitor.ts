// Generated from src/grammars/csharp/Csharp.g4 by ANTLR 4.13.1

import { AbstractParseTreeVisitor } from "antlr4ng";

import { FileContext } from "./CsharpParser.js";
import { GlobalContext } from "./CsharpParser.js";
import { MainContext } from "./CsharpParser.js";
import { FunctionContext } from "./CsharpParser.js";
import { TestContext } from "./CsharpParser.js";
import { ProcedureContext } from "./CsharpParser.js";
import { ConstantContext } from "./CsharpParser.js";
import { EnumContext } from "./CsharpParser.js";
import { ConcreteClassContext } from "./CsharpParser.js";
import { AbstractClassContext } from "./CsharpParser.js";
import { CommentContext } from "./CsharpParser.js";
import { CommentTextContext } from "./CsharpParser.js";
import { OrdinaryStatementContext } from "./CsharpParser.js";
import { VariableDefinitionContext } from "./CsharpParser.js";
import { AssignmentContext } from "./CsharpParser.js";
import { IfStatementContext } from "./CsharpParser.js";
import { ThenClauseContext } from "./CsharpParser.js";
import { ElseIfClauseContext } from "./CsharpParser.js";
import { ElseClauseContext } from "./CsharpParser.js";
import { WhileLoopContext } from "./CsharpParser.js";
import { ForLoopContext } from "./CsharpParser.js";
import { ProcedureCallContext } from "./CsharpParser.js";
import { ProcRefContext } from "./CsharpParser.js";
import { ThisProcRefContext } from "./CsharpParser.js";
import { InstanceProcRefContext } from "./CsharpParser.js";
import { IdentifierWithOptIndexesContext } from "./CsharpParser.js";
import { TryStatementContext } from "./CsharpParser.js";
import { ThrowStatementContext } from "./CsharpParser.js";
import { ErrorMessageContext } from "./CsharpParser.js";
import { AssertContext } from "./CsharpParser.js";
import { ReturnStatementContext } from "./CsharpParser.js";
import { CatchStatementContext } from "./CsharpParser.js";
import { ConstructorMemberContext } from "./CsharpParser.js";
import { PropertyContext } from "./CsharpParser.js";
import { FunctionMethodContext } from "./CsharpParser.js";
import { ProcedureMethodContext } from "./CsharpParser.js";
import { AbstractFunctionContext } from "./CsharpParser.js";
import { AbstractProcedureContext } from "./CsharpParser.js";
import { IdentifierDefContext } from "./CsharpParser.js";
import { IdentifierUseContext } from "./CsharpParser.js";
import { AssignableContext } from "./CsharpParser.js";
import { MethodNameContext } from "./CsharpParser.js";
import { TestNameContext } from "./CsharpParser.js";
import { TypeNameContext } from "./CsharpParser.js";
import { ConstantValueContext } from "./CsharpParser.js";
import { ArgListContext } from "./CsharpParser.js";
import { ArgumentContext } from "./CsharpParser.js";
import { ParamListContext } from "./CsharpParser.js";
import { IdentifierListContext } from "./CsharpParser.js";
import { ExpressionListContext } from "./CsharpParser.js";
import { TypeContext } from "./CsharpParser.js";
import { AssertActualContext } from "./CsharpParser.js";
import { AssertExpectedContext } from "./CsharpParser.js";
import { LitValueContext } from "./CsharpParser.js";
import { LitBooleanContext } from "./CsharpParser.js";
import { LitIntContext } from "./CsharpParser.js";
import { LitFloatContext } from "./CsharpParser.js";
import { LitStringContext } from "./CsharpParser.js";
import { EnumValueContext } from "./CsharpParser.js";
import { IndexContext } from "./CsharpParser.js";
import { ExpressionContext } from "./CsharpParser.js";
import { TermContext } from "./CsharpParser.js";
import { ChainableContext } from "./CsharpParser.js";
import { ThisInstanceContext } from "./CsharpParser.js";
import { BracketedExpressionContext } from "./CsharpParser.js";
import { UnaryExpressionContext } from "./CsharpParser.js";
import { NegateNumericContext } from "./CsharpParser.js";
import { NegateLogicalContext } from "./CsharpParser.js";
import { BinaryExpressionContext } from "./CsharpParser.js";
import { ListContext } from "./CsharpParser.js";
import { TupleContext } from "./CsharpParser.js";
import { DictionaryContext } from "./CsharpParser.js";
import { KvpListContext } from "./CsharpParser.js";
import { KvpContext } from "./CsharpParser.js";
import { MethodCallContext } from "./CsharpParser.js";
import { BinaryOperatorContext } from "./CsharpParser.js";
import { NewInstanceContext } from "./CsharpParser.js";
import { ParamDefContext } from "./CsharpParser.js";
import { TypeGenericContext } from "./CsharpParser.js";
import { TypeFuncContext } from "./CsharpParser.js";
import { TypeTupleContext } from "./CsharpParser.js";
import { LambdaContext } from "./CsharpParser.js";
import { InterpolatedStringContext } from "./CsharpParser.js";
import { PowerContext } from "./CsharpParser.js";

/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `CsharpParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export class CsharpVisitor<Result> extends AbstractParseTreeVisitor<Result> {
  /**
   * Visit a parse tree produced by `CsharpParser.file`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitFile?: (ctx: FileContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.global`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitGlobal?: (ctx: GlobalContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.main`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitMain?: (ctx: MainContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.function`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitFunction?: (ctx: FunctionContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.test`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTest?: (ctx: TestContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.procedure`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitProcedure?: (ctx: ProcedureContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.constant`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitConstant?: (ctx: ConstantContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.enum`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitEnum?: (ctx: EnumContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.concreteClass`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitConcreteClass?: (ctx: ConcreteClassContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.abstractClass`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitAbstractClass?: (ctx: AbstractClassContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.comment`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitComment?: (ctx: CommentContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.commentText`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitCommentText?: (ctx: CommentTextContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.ordinaryStatement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitOrdinaryStatement?: (ctx: OrdinaryStatementContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.variableDefinition`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitVariableDefinition?: (ctx: VariableDefinitionContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.assignment`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitAssignment?: (ctx: AssignmentContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.ifStatement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitIfStatement?: (ctx: IfStatementContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.thenClause`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitThenClause?: (ctx: ThenClauseContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.elseIfClause`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitElseIfClause?: (ctx: ElseIfClauseContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.elseClause`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitElseClause?: (ctx: ElseClauseContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.whileLoop`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitWhileLoop?: (ctx: WhileLoopContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.forLoop`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitForLoop?: (ctx: ForLoopContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.procedureCall`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitProcedureCall?: (ctx: ProcedureCallContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.procRef`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitProcRef?: (ctx: ProcRefContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.thisProcRef`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitThisProcRef?: (ctx: ThisProcRefContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.instanceProcRef`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitInstanceProcRef?: (ctx: InstanceProcRefContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.identifierWithOptIndexes`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitIdentifierWithOptIndexes?: (ctx: IdentifierWithOptIndexesContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.tryStatement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTryStatement?: (ctx: TryStatementContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.throwStatement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitThrowStatement?: (ctx: ThrowStatementContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.errorMessage`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitErrorMessage?: (ctx: ErrorMessageContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.assert`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitAssert?: (ctx: AssertContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.returnStatement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitReturnStatement?: (ctx: ReturnStatementContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.catchStatement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitCatchStatement?: (ctx: CatchStatementContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.constructorMember`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitConstructorMember?: (ctx: ConstructorMemberContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.property`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitProperty?: (ctx: PropertyContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.functionMethod`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitFunctionMethod?: (ctx: FunctionMethodContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.procedureMethod`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitProcedureMethod?: (ctx: ProcedureMethodContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.abstractFunction`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitAbstractFunction?: (ctx: AbstractFunctionContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.abstractProcedure`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitAbstractProcedure?: (ctx: AbstractProcedureContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.identifierDef`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitIdentifierDef?: (ctx: IdentifierDefContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.identifierUse`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitIdentifierUse?: (ctx: IdentifierUseContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.assignable`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitAssignable?: (ctx: AssignableContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.methodName`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitMethodName?: (ctx: MethodNameContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.testName`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTestName?: (ctx: TestNameContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.typeName`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTypeName?: (ctx: TypeNameContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.constantValue`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitConstantValue?: (ctx: ConstantValueContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.argList`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitArgList?: (ctx: ArgListContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.argument`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitArgument?: (ctx: ArgumentContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.paramList`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitParamList?: (ctx: ParamListContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.identifierList`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitIdentifierList?: (ctx: IdentifierListContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.expressionList`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitExpressionList?: (ctx: ExpressionListContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.type`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitType?: (ctx: TypeContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.assertActual`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitAssertActual?: (ctx: AssertActualContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.assertExpected`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitAssertExpected?: (ctx: AssertExpectedContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.litValue`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitLitValue?: (ctx: LitValueContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.litBoolean`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitLitBoolean?: (ctx: LitBooleanContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.litInt`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitLitInt?: (ctx: LitIntContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.litFloat`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitLitFloat?: (ctx: LitFloatContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.litString`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitLitString?: (ctx: LitStringContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.enumValue`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitEnumValue?: (ctx: EnumValueContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.index`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitIndex?: (ctx: IndexContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitExpression?: (ctx: ExpressionContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.term`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTerm?: (ctx: TermContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.chainable`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitChainable?: (ctx: ChainableContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.thisInstance`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitThisInstance?: (ctx: ThisInstanceContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.bracketedExpression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitBracketedExpression?: (ctx: BracketedExpressionContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.unaryExpression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitUnaryExpression?: (ctx: UnaryExpressionContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.negateNumeric`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitNegateNumeric?: (ctx: NegateNumericContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.negateLogical`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitNegateLogical?: (ctx: NegateLogicalContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.binaryExpression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitBinaryExpression?: (ctx: BinaryExpressionContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.list`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitList?: (ctx: ListContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.tuple`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTuple?: (ctx: TupleContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.dictionary`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitDictionary?: (ctx: DictionaryContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.kvpList`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitKvpList?: (ctx: KvpListContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.kvp`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitKvp?: (ctx: KvpContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.methodCall`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitMethodCall?: (ctx: MethodCallContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.binaryOperator`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitBinaryOperator?: (ctx: BinaryOperatorContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.newInstance`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitNewInstance?: (ctx: NewInstanceContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.paramDef`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitParamDef?: (ctx: ParamDefContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.typeGeneric`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTypeGeneric?: (ctx: TypeGenericContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.typeFunc`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTypeFunc?: (ctx: TypeFuncContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.typeTuple`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTypeTuple?: (ctx: TypeTupleContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.lambda`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitLambda?: (ctx: LambdaContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.interpolatedString`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitInterpolatedString?: (ctx: InterpolatedStringContext) => Result;
  /**
   * Visit a parse tree produced by `CsharpParser.power`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPower?: (ctx: PowerContext) => Result;
}
