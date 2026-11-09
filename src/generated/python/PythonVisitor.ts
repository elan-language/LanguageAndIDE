// Generated from src/grammars/python/Python.g4 by ANTLR 4.13.1

import { AbstractParseTreeVisitor } from "antlr4ng";

import { FileContext } from "./PythonParser.js";
import { GlobalContext } from "./PythonParser.js";
import { MainContext } from "./PythonParser.js";
import { MainCallContext } from "./PythonParser.js";
import { FunctionContext } from "./PythonParser.js";
import { TestClassContext } from "./PythonParser.js";
import { TestContext } from "./PythonParser.js";
import { TestStatementContext } from "./PythonParser.js";
import { ProcedureContext } from "./PythonParser.js";
import { ConstantContext } from "./PythonParser.js";
import { EnumContext } from "./PythonParser.js";
import { ConcreteClassContext } from "./PythonParser.js";
import { ConcreteClassMemberContext } from "./PythonParser.js";
import { AbstractClassContext } from "./PythonParser.js";
import { AbstractClassMemberContext } from "./PythonParser.js";
import { CommentContext } from "./PythonParser.js";
import { CommentTextContext } from "./PythonParser.js";
import { OrdinaryStatementContext } from "./PythonParser.js";
import { VariableDefinitionContext } from "./PythonParser.js";
import { AssignmentContext } from "./PythonParser.js";
import { IfStatementContext } from "./PythonParser.js";
import { ThenClauseContext } from "./PythonParser.js";
import { ElseIfClauseContext } from "./PythonParser.js";
import { ElseClauseContext } from "./PythonParser.js";
import { WhileLoopContext } from "./PythonParser.js";
import { ForLoopContext } from "./PythonParser.js";
import { ProcedureCallContext } from "./PythonParser.js";
import { TryStatementContext } from "./PythonParser.js";
import { TryClauseContext } from "./PythonParser.js";
import { CatchClauseContext } from "./PythonParser.js";
import { ThrowStatementContext } from "./PythonParser.js";
import { ErrorMessageContext } from "./PythonParser.js";
import { AssertContext } from "./PythonParser.js";
import { ReturnStatementContext } from "./PythonParser.js";
import { ConstructorMemberContext } from "./PythonParser.js";
import { PropertyContext } from "./PythonParser.js";
import { FunctionMethodContext } from "./PythonParser.js";
import { ProcedureMethodContext } from "./PythonParser.js";
import { AbstractFunctionContext } from "./PythonParser.js";
import { AbstractProcedureContext } from "./PythonParser.js";
import { IdentifierDefContext } from "./PythonParser.js";
import { IdentifierUseContext } from "./PythonParser.js";
import { SimpleAssignableContext } from "./PythonParser.js";
import { IndexedAssignableContext } from "./PythonParser.js";
import { ThisAssignableContext } from "./PythonParser.js";
import { MethodNameContext } from "./PythonParser.js";
import { TestNameContext } from "./PythonParser.js";
import { TestClassNameContext } from "./PythonParser.js";
import { IntTypeNameContext } from "./PythonParser.js";
import { FloatTypeNameContext } from "./PythonParser.js";
import { BoolTypeNameContext } from "./PythonParser.js";
import { StringTypeNameContext } from "./PythonParser.js";
import { ListTypeNameContext } from "./PythonParser.js";
import { UdtTypeNameContext } from "./PythonParser.js";
import { ConstantValueContext } from "./PythonParser.js";
import { ArgListContext } from "./PythonParser.js";
import { ArgumentContext } from "./PythonParser.js";
import { ParamListContext } from "./PythonParser.js";
import { IdentifierListContext } from "./PythonParser.js";
import { ExpressionListContext } from "./PythonParser.js";
import { EnumDefValueContext } from "./PythonParser.js";
import { EnumListContext } from "./PythonParser.js";
import { TypeContext } from "./PythonParser.js";
import { AssertActualContext } from "./PythonParser.js";
import { AssertExpectedContext } from "./PythonParser.js";
import { LitValueContext } from "./PythonParser.js";
import { LitBooleanContext } from "./PythonParser.js";
import { LitIntegerContext } from "./PythonParser.js";
import { LitBinaryContext } from "./PythonParser.js";
import { LitHexContext } from "./PythonParser.js";
import { LitFloatContext } from "./PythonParser.js";
import { LitStringContext } from "./PythonParser.js";
import { EnumValueContext } from "./PythonParser.js";
import { IndexContext } from "./PythonParser.js";
import { UnaryExpressionLabelContext } from "./PythonParser.js";
import { BinaryExpressionLabelContext } from "./PythonParser.js";
import { NewInstanceExpressionContext } from "./PythonParser.js";
import { IfExpressionContext } from "./PythonParser.js";
import { TermExpressionContext } from "./PythonParser.js";
import { IdentifierUseTermContext } from "./PythonParser.js";
import { MethodCallTermContext } from "./PythonParser.js";
import { IndexedTermContext } from "./PythonParser.js";
import { LitValueTermContext } from "./PythonParser.js";
import { DictionaryTermContext } from "./PythonParser.js";
import { BracketedExpressionTermContext } from "./PythonParser.js";
import { ChainableTermContext } from "./PythonParser.js";
import { TupleTermContext } from "./PythonParser.js";
import { ThisInstanceTermContext } from "./PythonParser.js";
import { ListTermContext } from "./PythonParser.js";
import { ChainableContext } from "./PythonParser.js";
import { ThisInstanceContext } from "./PythonParser.js";
import { BracketedExpressionContext } from "./PythonParser.js";
import { UnaryExpressionContext } from "./PythonParser.js";
import { NegateNumericContext } from "./PythonParser.js";
import { NegateLogicalContext } from "./PythonParser.js";
import { BinaryExpressionContext } from "./PythonParser.js";
import { ListContext } from "./PythonParser.js";
import { TupleContext } from "./PythonParser.js";
import { DictionaryContext } from "./PythonParser.js";
import { KvpListContext } from "./PythonParser.js";
import { KvpContext } from "./PythonParser.js";
import { MethodCallContext } from "./PythonParser.js";
import { BinaryOperatorContext } from "./PythonParser.js";
import { NewInstanceContext } from "./PythonParser.js";
import { ParamDefContext } from "./PythonParser.js";
import { TypeGenericContext } from "./PythonParser.js";
import { TypeFuncContext } from "./PythonParser.js";
import { TypeTupleContext } from "./PythonParser.js";
import { LambdaContext } from "./PythonParser.js";
import { InterpolatedStringContext } from "./PythonParser.js";

/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `PythonParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export class PythonVisitor<Result> extends AbstractParseTreeVisitor<Result> {
  /**
   * Visit a parse tree produced by `PythonParser.file`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitFile?: (ctx: FileContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.global`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitGlobal?: (ctx: GlobalContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.main`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitMain?: (ctx: MainContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.mainCall`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitMainCall?: (ctx: MainCallContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.function`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitFunction?: (ctx: FunctionContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.testClass`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTestClass?: (ctx: TestClassContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.test`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTest?: (ctx: TestContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.testStatement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTestStatement?: (ctx: TestStatementContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.procedure`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitProcedure?: (ctx: ProcedureContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.constant`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitConstant?: (ctx: ConstantContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.enum`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitEnum?: (ctx: EnumContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.concreteClass`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitConcreteClass?: (ctx: ConcreteClassContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.concreteClassMember`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitConcreteClassMember?: (ctx: ConcreteClassMemberContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.abstractClass`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitAbstractClass?: (ctx: AbstractClassContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.abstractClassMember`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitAbstractClassMember?: (ctx: AbstractClassMemberContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.comment`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitComment?: (ctx: CommentContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.commentText`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitCommentText?: (ctx: CommentTextContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.ordinaryStatement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitOrdinaryStatement?: (ctx: OrdinaryStatementContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.variableDefinition`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitVariableDefinition?: (ctx: VariableDefinitionContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.assignment`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitAssignment?: (ctx: AssignmentContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.ifStatement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitIfStatement?: (ctx: IfStatementContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.thenClause`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitThenClause?: (ctx: ThenClauseContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.elseIfClause`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitElseIfClause?: (ctx: ElseIfClauseContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.elseClause`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitElseClause?: (ctx: ElseClauseContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.whileLoop`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitWhileLoop?: (ctx: WhileLoopContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.forLoop`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitForLoop?: (ctx: ForLoopContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.procedureCall`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitProcedureCall?: (ctx: ProcedureCallContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.tryStatement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTryStatement?: (ctx: TryStatementContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.tryClause`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTryClause?: (ctx: TryClauseContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.catchClause`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitCatchClause?: (ctx: CatchClauseContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.throwStatement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitThrowStatement?: (ctx: ThrowStatementContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.errorMessage`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitErrorMessage?: (ctx: ErrorMessageContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.assert`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitAssert?: (ctx: AssertContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.returnStatement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitReturnStatement?: (ctx: ReturnStatementContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.constructorMember`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitConstructorMember?: (ctx: ConstructorMemberContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.property`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitProperty?: (ctx: PropertyContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.functionMethod`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitFunctionMethod?: (ctx: FunctionMethodContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.procedureMethod`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitProcedureMethod?: (ctx: ProcedureMethodContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.abstractFunction`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitAbstractFunction?: (ctx: AbstractFunctionContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.abstractProcedure`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitAbstractProcedure?: (ctx: AbstractProcedureContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.identifierDef`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitIdentifierDef?: (ctx: IdentifierDefContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.identifierUse`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitIdentifierUse?: (ctx: IdentifierUseContext) => Result;
  /**
   * Visit a parse tree produced by the `simpleAssignable`
   * labeled alternative in `PythonParser.assignable`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSimpleAssignable?: (ctx: SimpleAssignableContext) => Result;
  /**
   * Visit a parse tree produced by the `indexedAssignable`
   * labeled alternative in `PythonParser.assignable`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitIndexedAssignable?: (ctx: IndexedAssignableContext) => Result;
  /**
   * Visit a parse tree produced by the `thisAssignable`
   * labeled alternative in `PythonParser.assignable`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitThisAssignable?: (ctx: ThisAssignableContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.methodName`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitMethodName?: (ctx: MethodNameContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.testName`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTestName?: (ctx: TestNameContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.testClassName`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTestClassName?: (ctx: TestClassNameContext) => Result;
  /**
   * Visit a parse tree produced by the `intTypeName`
   * labeled alternative in `PythonParser.typeName`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitIntTypeName?: (ctx: IntTypeNameContext) => Result;
  /**
   * Visit a parse tree produced by the `floatTypeName`
   * labeled alternative in `PythonParser.typeName`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitFloatTypeName?: (ctx: FloatTypeNameContext) => Result;
  /**
   * Visit a parse tree produced by the `boolTypeName`
   * labeled alternative in `PythonParser.typeName`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitBoolTypeName?: (ctx: BoolTypeNameContext) => Result;
  /**
   * Visit a parse tree produced by the `stringTypeName`
   * labeled alternative in `PythonParser.typeName`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitStringTypeName?: (ctx: StringTypeNameContext) => Result;
  /**
   * Visit a parse tree produced by the `listTypeName`
   * labeled alternative in `PythonParser.typeName`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitListTypeName?: (ctx: ListTypeNameContext) => Result;
  /**
   * Visit a parse tree produced by the `udtTypeName`
   * labeled alternative in `PythonParser.typeName`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitUdtTypeName?: (ctx: UdtTypeNameContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.constantValue`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitConstantValue?: (ctx: ConstantValueContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.argList`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitArgList?: (ctx: ArgListContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.argument`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitArgument?: (ctx: ArgumentContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.paramList`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitParamList?: (ctx: ParamListContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.identifierList`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitIdentifierList?: (ctx: IdentifierListContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.expressionList`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitExpressionList?: (ctx: ExpressionListContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.enumDefValue`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitEnumDefValue?: (ctx: EnumDefValueContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.enumList`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitEnumList?: (ctx: EnumListContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.type`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitType?: (ctx: TypeContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.assertActual`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitAssertActual?: (ctx: AssertActualContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.assertExpected`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitAssertExpected?: (ctx: AssertExpectedContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.litValue`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitLitValue?: (ctx: LitValueContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.litBoolean`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitLitBoolean?: (ctx: LitBooleanContext) => Result;
  /**
   * Visit a parse tree produced by the `litInteger`
   * labeled alternative in `PythonParser.litInt`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitLitInteger?: (ctx: LitIntegerContext) => Result;
  /**
   * Visit a parse tree produced by the `litBinary`
   * labeled alternative in `PythonParser.litInt`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitLitBinary?: (ctx: LitBinaryContext) => Result;
  /**
   * Visit a parse tree produced by the `litHex`
   * labeled alternative in `PythonParser.litInt`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitLitHex?: (ctx: LitHexContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.litFloat`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitLitFloat?: (ctx: LitFloatContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.litString`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitLitString?: (ctx: LitStringContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.enumValue`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitEnumValue?: (ctx: EnumValueContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.index`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitIndex?: (ctx: IndexContext) => Result;
  /**
   * Visit a parse tree produced by the `unaryExpressionLabel`
   * labeled alternative in `PythonParser.expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitUnaryExpressionLabel?: (ctx: UnaryExpressionLabelContext) => Result;
  /**
   * Visit a parse tree produced by the `binaryExpressionLabel`
   * labeled alternative in `PythonParser.expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitBinaryExpressionLabel?: (ctx: BinaryExpressionLabelContext) => Result;
  /**
   * Visit a parse tree produced by the `newInstanceExpression`
   * labeled alternative in `PythonParser.expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitNewInstanceExpression?: (ctx: NewInstanceExpressionContext) => Result;
  /**
   * Visit a parse tree produced by the `ifExpression`
   * labeled alternative in `PythonParser.expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitIfExpression?: (ctx: IfExpressionContext) => Result;
  /**
   * Visit a parse tree produced by the `termExpression`
   * labeled alternative in `PythonParser.expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTermExpression?: (ctx: TermExpressionContext) => Result;
  /**
   * Visit a parse tree produced by the `identifierUseTerm`
   * labeled alternative in `PythonParser.term`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitIdentifierUseTerm?: (ctx: IdentifierUseTermContext) => Result;
  /**
   * Visit a parse tree produced by the `methodCallTerm`
   * labeled alternative in `PythonParser.term`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitMethodCallTerm?: (ctx: MethodCallTermContext) => Result;
  /**
   * Visit a parse tree produced by the `indexedTerm`
   * labeled alternative in `PythonParser.term`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitIndexedTerm?: (ctx: IndexedTermContext) => Result;
  /**
   * Visit a parse tree produced by the `litValueTerm`
   * labeled alternative in `PythonParser.term`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitLitValueTerm?: (ctx: LitValueTermContext) => Result;
  /**
   * Visit a parse tree produced by the `dictionaryTerm`
   * labeled alternative in `PythonParser.term`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitDictionaryTerm?: (ctx: DictionaryTermContext) => Result;
  /**
   * Visit a parse tree produced by the `bracketedExpressionTerm`
   * labeled alternative in `PythonParser.term`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitBracketedExpressionTerm?: (ctx: BracketedExpressionTermContext) => Result;
  /**
   * Visit a parse tree produced by the `chainableTerm`
   * labeled alternative in `PythonParser.term`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitChainableTerm?: (ctx: ChainableTermContext) => Result;
  /**
   * Visit a parse tree produced by the `tupleTerm`
   * labeled alternative in `PythonParser.term`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTupleTerm?: (ctx: TupleTermContext) => Result;
  /**
   * Visit a parse tree produced by the `thisInstanceTerm`
   * labeled alternative in `PythonParser.term`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitThisInstanceTerm?: (ctx: ThisInstanceTermContext) => Result;
  /**
   * Visit a parse tree produced by the `listTerm`
   * labeled alternative in `PythonParser.term`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitListTerm?: (ctx: ListTermContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.chainable`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitChainable?: (ctx: ChainableContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.thisInstance`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitThisInstance?: (ctx: ThisInstanceContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.bracketedExpression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitBracketedExpression?: (ctx: BracketedExpressionContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.unaryExpression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitUnaryExpression?: (ctx: UnaryExpressionContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.negateNumeric`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitNegateNumeric?: (ctx: NegateNumericContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.negateLogical`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitNegateLogical?: (ctx: NegateLogicalContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.binaryExpression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitBinaryExpression?: (ctx: BinaryExpressionContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.list`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitList?: (ctx: ListContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.tuple`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTuple?: (ctx: TupleContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.dictionary`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitDictionary?: (ctx: DictionaryContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.kvpList`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitKvpList?: (ctx: KvpListContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.kvp`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitKvp?: (ctx: KvpContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.methodCall`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitMethodCall?: (ctx: MethodCallContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.binaryOperator`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitBinaryOperator?: (ctx: BinaryOperatorContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.newInstance`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitNewInstance?: (ctx: NewInstanceContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.paramDef`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitParamDef?: (ctx: ParamDefContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.typeGeneric`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTypeGeneric?: (ctx: TypeGenericContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.typeFunc`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTypeFunc?: (ctx: TypeFuncContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.typeTuple`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTypeTuple?: (ctx: TypeTupleContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.lambda`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitLambda?: (ctx: LambdaContext) => Result;
  /**
   * Visit a parse tree produced by `PythonParser.interpolatedString`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitInterpolatedString?: (ctx: InterpolatedStringContext) => Result;
}
