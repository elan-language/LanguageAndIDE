// Generated from src/grammars/python/Python.g4 by ANTLR 4.13.1

import { ErrorNode, ParseTreeListener, ParserRuleContext, TerminalNode } from "antlr4ng";

import { FileContext } from "./PythonParser.js";
import { GlobalContext } from "./PythonParser.js";
import { MainContext } from "./PythonParser.js";
import { MainCallContext } from "./PythonParser.js";
import { FunctionContext } from "./PythonParser.js";
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
import { CatchStatementContext } from "./PythonParser.js";
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
 * This interface defines a complete listener for a parse tree produced by
 * `PythonParser`.
 */
export class PythonListener implements ParseTreeListener {
  /**
   * Enter a parse tree produced by `PythonParser.file`.
   * @param ctx the parse tree
   */
  enterFile?: (ctx: FileContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.file`.
   * @param ctx the parse tree
   */
  exitFile?: (ctx: FileContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.global`.
   * @param ctx the parse tree
   */
  enterGlobal?: (ctx: GlobalContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.global`.
   * @param ctx the parse tree
   */
  exitGlobal?: (ctx: GlobalContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.main`.
   * @param ctx the parse tree
   */
  enterMain?: (ctx: MainContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.main`.
   * @param ctx the parse tree
   */
  exitMain?: (ctx: MainContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.mainCall`.
   * @param ctx the parse tree
   */
  enterMainCall?: (ctx: MainCallContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.mainCall`.
   * @param ctx the parse tree
   */
  exitMainCall?: (ctx: MainCallContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.function`.
   * @param ctx the parse tree
   */
  enterFunction?: (ctx: FunctionContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.function`.
   * @param ctx the parse tree
   */
  exitFunction?: (ctx: FunctionContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.test`.
   * @param ctx the parse tree
   */
  enterTest?: (ctx: TestContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.test`.
   * @param ctx the parse tree
   */
  exitTest?: (ctx: TestContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.testStatement`.
   * @param ctx the parse tree
   */
  enterTestStatement?: (ctx: TestStatementContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.testStatement`.
   * @param ctx the parse tree
   */
  exitTestStatement?: (ctx: TestStatementContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.procedure`.
   * @param ctx the parse tree
   */
  enterProcedure?: (ctx: ProcedureContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.procedure`.
   * @param ctx the parse tree
   */
  exitProcedure?: (ctx: ProcedureContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.constant`.
   * @param ctx the parse tree
   */
  enterConstant?: (ctx: ConstantContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.constant`.
   * @param ctx the parse tree
   */
  exitConstant?: (ctx: ConstantContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.enum`.
   * @param ctx the parse tree
   */
  enterEnum?: (ctx: EnumContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.enum`.
   * @param ctx the parse tree
   */
  exitEnum?: (ctx: EnumContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.concreteClass`.
   * @param ctx the parse tree
   */
  enterConcreteClass?: (ctx: ConcreteClassContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.concreteClass`.
   * @param ctx the parse tree
   */
  exitConcreteClass?: (ctx: ConcreteClassContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.concreteClassMember`.
   * @param ctx the parse tree
   */
  enterConcreteClassMember?: (ctx: ConcreteClassMemberContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.concreteClassMember`.
   * @param ctx the parse tree
   */
  exitConcreteClassMember?: (ctx: ConcreteClassMemberContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.abstractClass`.
   * @param ctx the parse tree
   */
  enterAbstractClass?: (ctx: AbstractClassContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.abstractClass`.
   * @param ctx the parse tree
   */
  exitAbstractClass?: (ctx: AbstractClassContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.abstractClassMember`.
   * @param ctx the parse tree
   */
  enterAbstractClassMember?: (ctx: AbstractClassMemberContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.abstractClassMember`.
   * @param ctx the parse tree
   */
  exitAbstractClassMember?: (ctx: AbstractClassMemberContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.comment`.
   * @param ctx the parse tree
   */
  enterComment?: (ctx: CommentContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.comment`.
   * @param ctx the parse tree
   */
  exitComment?: (ctx: CommentContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.commentText`.
   * @param ctx the parse tree
   */
  enterCommentText?: (ctx: CommentTextContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.commentText`.
   * @param ctx the parse tree
   */
  exitCommentText?: (ctx: CommentTextContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.ordinaryStatement`.
   * @param ctx the parse tree
   */
  enterOrdinaryStatement?: (ctx: OrdinaryStatementContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.ordinaryStatement`.
   * @param ctx the parse tree
   */
  exitOrdinaryStatement?: (ctx: OrdinaryStatementContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.variableDefinition`.
   * @param ctx the parse tree
   */
  enterVariableDefinition?: (ctx: VariableDefinitionContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.variableDefinition`.
   * @param ctx the parse tree
   */
  exitVariableDefinition?: (ctx: VariableDefinitionContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.assignment`.
   * @param ctx the parse tree
   */
  enterAssignment?: (ctx: AssignmentContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.assignment`.
   * @param ctx the parse tree
   */
  exitAssignment?: (ctx: AssignmentContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.ifStatement`.
   * @param ctx the parse tree
   */
  enterIfStatement?: (ctx: IfStatementContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.ifStatement`.
   * @param ctx the parse tree
   */
  exitIfStatement?: (ctx: IfStatementContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.thenClause`.
   * @param ctx the parse tree
   */
  enterThenClause?: (ctx: ThenClauseContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.thenClause`.
   * @param ctx the parse tree
   */
  exitThenClause?: (ctx: ThenClauseContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.elseIfClause`.
   * @param ctx the parse tree
   */
  enterElseIfClause?: (ctx: ElseIfClauseContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.elseIfClause`.
   * @param ctx the parse tree
   */
  exitElseIfClause?: (ctx: ElseIfClauseContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.elseClause`.
   * @param ctx the parse tree
   */
  enterElseClause?: (ctx: ElseClauseContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.elseClause`.
   * @param ctx the parse tree
   */
  exitElseClause?: (ctx: ElseClauseContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.whileLoop`.
   * @param ctx the parse tree
   */
  enterWhileLoop?: (ctx: WhileLoopContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.whileLoop`.
   * @param ctx the parse tree
   */
  exitWhileLoop?: (ctx: WhileLoopContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.forLoop`.
   * @param ctx the parse tree
   */
  enterForLoop?: (ctx: ForLoopContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.forLoop`.
   * @param ctx the parse tree
   */
  exitForLoop?: (ctx: ForLoopContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.procedureCall`.
   * @param ctx the parse tree
   */
  enterProcedureCall?: (ctx: ProcedureCallContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.procedureCall`.
   * @param ctx the parse tree
   */
  exitProcedureCall?: (ctx: ProcedureCallContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.tryStatement`.
   * @param ctx the parse tree
   */
  enterTryStatement?: (ctx: TryStatementContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.tryStatement`.
   * @param ctx the parse tree
   */
  exitTryStatement?: (ctx: TryStatementContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.tryClause`.
   * @param ctx the parse tree
   */
  enterTryClause?: (ctx: TryClauseContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.tryClause`.
   * @param ctx the parse tree
   */
  exitTryClause?: (ctx: TryClauseContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.catchClause`.
   * @param ctx the parse tree
   */
  enterCatchClause?: (ctx: CatchClauseContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.catchClause`.
   * @param ctx the parse tree
   */
  exitCatchClause?: (ctx: CatchClauseContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.throwStatement`.
   * @param ctx the parse tree
   */
  enterThrowStatement?: (ctx: ThrowStatementContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.throwStatement`.
   * @param ctx the parse tree
   */
  exitThrowStatement?: (ctx: ThrowStatementContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.errorMessage`.
   * @param ctx the parse tree
   */
  enterErrorMessage?: (ctx: ErrorMessageContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.errorMessage`.
   * @param ctx the parse tree
   */
  exitErrorMessage?: (ctx: ErrorMessageContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.assert`.
   * @param ctx the parse tree
   */
  enterAssert?: (ctx: AssertContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.assert`.
   * @param ctx the parse tree
   */
  exitAssert?: (ctx: AssertContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.returnStatement`.
   * @param ctx the parse tree
   */
  enterReturnStatement?: (ctx: ReturnStatementContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.returnStatement`.
   * @param ctx the parse tree
   */
  exitReturnStatement?: (ctx: ReturnStatementContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.catchStatement`.
   * @param ctx the parse tree
   */
  enterCatchStatement?: (ctx: CatchStatementContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.catchStatement`.
   * @param ctx the parse tree
   */
  exitCatchStatement?: (ctx: CatchStatementContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.constructorMember`.
   * @param ctx the parse tree
   */
  enterConstructorMember?: (ctx: ConstructorMemberContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.constructorMember`.
   * @param ctx the parse tree
   */
  exitConstructorMember?: (ctx: ConstructorMemberContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.property`.
   * @param ctx the parse tree
   */
  enterProperty?: (ctx: PropertyContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.property`.
   * @param ctx the parse tree
   */
  exitProperty?: (ctx: PropertyContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.functionMethod`.
   * @param ctx the parse tree
   */
  enterFunctionMethod?: (ctx: FunctionMethodContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.functionMethod`.
   * @param ctx the parse tree
   */
  exitFunctionMethod?: (ctx: FunctionMethodContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.procedureMethod`.
   * @param ctx the parse tree
   */
  enterProcedureMethod?: (ctx: ProcedureMethodContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.procedureMethod`.
   * @param ctx the parse tree
   */
  exitProcedureMethod?: (ctx: ProcedureMethodContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.abstractFunction`.
   * @param ctx the parse tree
   */
  enterAbstractFunction?: (ctx: AbstractFunctionContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.abstractFunction`.
   * @param ctx the parse tree
   */
  exitAbstractFunction?: (ctx: AbstractFunctionContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.abstractProcedure`.
   * @param ctx the parse tree
   */
  enterAbstractProcedure?: (ctx: AbstractProcedureContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.abstractProcedure`.
   * @param ctx the parse tree
   */
  exitAbstractProcedure?: (ctx: AbstractProcedureContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.identifierDef`.
   * @param ctx the parse tree
   */
  enterIdentifierDef?: (ctx: IdentifierDefContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.identifierDef`.
   * @param ctx the parse tree
   */
  exitIdentifierDef?: (ctx: IdentifierDefContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.identifierUse`.
   * @param ctx the parse tree
   */
  enterIdentifierUse?: (ctx: IdentifierUseContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.identifierUse`.
   * @param ctx the parse tree
   */
  exitIdentifierUse?: (ctx: IdentifierUseContext) => void;
  /**
   * Enter a parse tree produced by the `simpleAssignable`
   * labeled alternative in `PythonParser.assignable`.
   * @param ctx the parse tree
   */
  enterSimpleAssignable?: (ctx: SimpleAssignableContext) => void;
  /**
   * Exit a parse tree produced by the `simpleAssignable`
   * labeled alternative in `PythonParser.assignable`.
   * @param ctx the parse tree
   */
  exitSimpleAssignable?: (ctx: SimpleAssignableContext) => void;
  /**
   * Enter a parse tree produced by the `indexedAssignable`
   * labeled alternative in `PythonParser.assignable`.
   * @param ctx the parse tree
   */
  enterIndexedAssignable?: (ctx: IndexedAssignableContext) => void;
  /**
   * Exit a parse tree produced by the `indexedAssignable`
   * labeled alternative in `PythonParser.assignable`.
   * @param ctx the parse tree
   */
  exitIndexedAssignable?: (ctx: IndexedAssignableContext) => void;
  /**
   * Enter a parse tree produced by the `thisAssignable`
   * labeled alternative in `PythonParser.assignable`.
   * @param ctx the parse tree
   */
  enterThisAssignable?: (ctx: ThisAssignableContext) => void;
  /**
   * Exit a parse tree produced by the `thisAssignable`
   * labeled alternative in `PythonParser.assignable`.
   * @param ctx the parse tree
   */
  exitThisAssignable?: (ctx: ThisAssignableContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.methodName`.
   * @param ctx the parse tree
   */
  enterMethodName?: (ctx: MethodNameContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.methodName`.
   * @param ctx the parse tree
   */
  exitMethodName?: (ctx: MethodNameContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.testName`.
   * @param ctx the parse tree
   */
  enterTestName?: (ctx: TestNameContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.testName`.
   * @param ctx the parse tree
   */
  exitTestName?: (ctx: TestNameContext) => void;
  /**
   * Enter a parse tree produced by the `intTypeName`
   * labeled alternative in `PythonParser.typeName`.
   * @param ctx the parse tree
   */
  enterIntTypeName?: (ctx: IntTypeNameContext) => void;
  /**
   * Exit a parse tree produced by the `intTypeName`
   * labeled alternative in `PythonParser.typeName`.
   * @param ctx the parse tree
   */
  exitIntTypeName?: (ctx: IntTypeNameContext) => void;
  /**
   * Enter a parse tree produced by the `floatTypeName`
   * labeled alternative in `PythonParser.typeName`.
   * @param ctx the parse tree
   */
  enterFloatTypeName?: (ctx: FloatTypeNameContext) => void;
  /**
   * Exit a parse tree produced by the `floatTypeName`
   * labeled alternative in `PythonParser.typeName`.
   * @param ctx the parse tree
   */
  exitFloatTypeName?: (ctx: FloatTypeNameContext) => void;
  /**
   * Enter a parse tree produced by the `boolTypeName`
   * labeled alternative in `PythonParser.typeName`.
   * @param ctx the parse tree
   */
  enterBoolTypeName?: (ctx: BoolTypeNameContext) => void;
  /**
   * Exit a parse tree produced by the `boolTypeName`
   * labeled alternative in `PythonParser.typeName`.
   * @param ctx the parse tree
   */
  exitBoolTypeName?: (ctx: BoolTypeNameContext) => void;
  /**
   * Enter a parse tree produced by the `stringTypeName`
   * labeled alternative in `PythonParser.typeName`.
   * @param ctx the parse tree
   */
  enterStringTypeName?: (ctx: StringTypeNameContext) => void;
  /**
   * Exit a parse tree produced by the `stringTypeName`
   * labeled alternative in `PythonParser.typeName`.
   * @param ctx the parse tree
   */
  exitStringTypeName?: (ctx: StringTypeNameContext) => void;
  /**
   * Enter a parse tree produced by the `listTypeName`
   * labeled alternative in `PythonParser.typeName`.
   * @param ctx the parse tree
   */
  enterListTypeName?: (ctx: ListTypeNameContext) => void;
  /**
   * Exit a parse tree produced by the `listTypeName`
   * labeled alternative in `PythonParser.typeName`.
   * @param ctx the parse tree
   */
  exitListTypeName?: (ctx: ListTypeNameContext) => void;
  /**
   * Enter a parse tree produced by the `udtTypeName`
   * labeled alternative in `PythonParser.typeName`.
   * @param ctx the parse tree
   */
  enterUdtTypeName?: (ctx: UdtTypeNameContext) => void;
  /**
   * Exit a parse tree produced by the `udtTypeName`
   * labeled alternative in `PythonParser.typeName`.
   * @param ctx the parse tree
   */
  exitUdtTypeName?: (ctx: UdtTypeNameContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.constantValue`.
   * @param ctx the parse tree
   */
  enterConstantValue?: (ctx: ConstantValueContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.constantValue`.
   * @param ctx the parse tree
   */
  exitConstantValue?: (ctx: ConstantValueContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.argList`.
   * @param ctx the parse tree
   */
  enterArgList?: (ctx: ArgListContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.argList`.
   * @param ctx the parse tree
   */
  exitArgList?: (ctx: ArgListContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.argument`.
   * @param ctx the parse tree
   */
  enterArgument?: (ctx: ArgumentContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.argument`.
   * @param ctx the parse tree
   */
  exitArgument?: (ctx: ArgumentContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.paramList`.
   * @param ctx the parse tree
   */
  enterParamList?: (ctx: ParamListContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.paramList`.
   * @param ctx the parse tree
   */
  exitParamList?: (ctx: ParamListContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.identifierList`.
   * @param ctx the parse tree
   */
  enterIdentifierList?: (ctx: IdentifierListContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.identifierList`.
   * @param ctx the parse tree
   */
  exitIdentifierList?: (ctx: IdentifierListContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.expressionList`.
   * @param ctx the parse tree
   */
  enterExpressionList?: (ctx: ExpressionListContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.expressionList`.
   * @param ctx the parse tree
   */
  exitExpressionList?: (ctx: ExpressionListContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.type`.
   * @param ctx the parse tree
   */
  enterType?: (ctx: TypeContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.type`.
   * @param ctx the parse tree
   */
  exitType?: (ctx: TypeContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.assertActual`.
   * @param ctx the parse tree
   */
  enterAssertActual?: (ctx: AssertActualContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.assertActual`.
   * @param ctx the parse tree
   */
  exitAssertActual?: (ctx: AssertActualContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.assertExpected`.
   * @param ctx the parse tree
   */
  enterAssertExpected?: (ctx: AssertExpectedContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.assertExpected`.
   * @param ctx the parse tree
   */
  exitAssertExpected?: (ctx: AssertExpectedContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.litValue`.
   * @param ctx the parse tree
   */
  enterLitValue?: (ctx: LitValueContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.litValue`.
   * @param ctx the parse tree
   */
  exitLitValue?: (ctx: LitValueContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.litBoolean`.
   * @param ctx the parse tree
   */
  enterLitBoolean?: (ctx: LitBooleanContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.litBoolean`.
   * @param ctx the parse tree
   */
  exitLitBoolean?: (ctx: LitBooleanContext) => void;
  /**
   * Enter a parse tree produced by the `litInteger`
   * labeled alternative in `PythonParser.litInt`.
   * @param ctx the parse tree
   */
  enterLitInteger?: (ctx: LitIntegerContext) => void;
  /**
   * Exit a parse tree produced by the `litInteger`
   * labeled alternative in `PythonParser.litInt`.
   * @param ctx the parse tree
   */
  exitLitInteger?: (ctx: LitIntegerContext) => void;
  /**
   * Enter a parse tree produced by the `litBinary`
   * labeled alternative in `PythonParser.litInt`.
   * @param ctx the parse tree
   */
  enterLitBinary?: (ctx: LitBinaryContext) => void;
  /**
   * Exit a parse tree produced by the `litBinary`
   * labeled alternative in `PythonParser.litInt`.
   * @param ctx the parse tree
   */
  exitLitBinary?: (ctx: LitBinaryContext) => void;
  /**
   * Enter a parse tree produced by the `litHex`
   * labeled alternative in `PythonParser.litInt`.
   * @param ctx the parse tree
   */
  enterLitHex?: (ctx: LitHexContext) => void;
  /**
   * Exit a parse tree produced by the `litHex`
   * labeled alternative in `PythonParser.litInt`.
   * @param ctx the parse tree
   */
  exitLitHex?: (ctx: LitHexContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.litFloat`.
   * @param ctx the parse tree
   */
  enterLitFloat?: (ctx: LitFloatContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.litFloat`.
   * @param ctx the parse tree
   */
  exitLitFloat?: (ctx: LitFloatContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.litString`.
   * @param ctx the parse tree
   */
  enterLitString?: (ctx: LitStringContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.litString`.
   * @param ctx the parse tree
   */
  exitLitString?: (ctx: LitStringContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.enumValue`.
   * @param ctx the parse tree
   */
  enterEnumValue?: (ctx: EnumValueContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.enumValue`.
   * @param ctx the parse tree
   */
  exitEnumValue?: (ctx: EnumValueContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.index`.
   * @param ctx the parse tree
   */
  enterIndex?: (ctx: IndexContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.index`.
   * @param ctx the parse tree
   */
  exitIndex?: (ctx: IndexContext) => void;
  /**
   * Enter a parse tree produced by the `unaryExpressionLabel`
   * labeled alternative in `PythonParser.expression`.
   * @param ctx the parse tree
   */
  enterUnaryExpressionLabel?: (ctx: UnaryExpressionLabelContext) => void;
  /**
   * Exit a parse tree produced by the `unaryExpressionLabel`
   * labeled alternative in `PythonParser.expression`.
   * @param ctx the parse tree
   */
  exitUnaryExpressionLabel?: (ctx: UnaryExpressionLabelContext) => void;
  /**
   * Enter a parse tree produced by the `binaryExpressionLabel`
   * labeled alternative in `PythonParser.expression`.
   * @param ctx the parse tree
   */
  enterBinaryExpressionLabel?: (ctx: BinaryExpressionLabelContext) => void;
  /**
   * Exit a parse tree produced by the `binaryExpressionLabel`
   * labeled alternative in `PythonParser.expression`.
   * @param ctx the parse tree
   */
  exitBinaryExpressionLabel?: (ctx: BinaryExpressionLabelContext) => void;
  /**
   * Enter a parse tree produced by the `newInstanceExpression`
   * labeled alternative in `PythonParser.expression`.
   * @param ctx the parse tree
   */
  enterNewInstanceExpression?: (ctx: NewInstanceExpressionContext) => void;
  /**
   * Exit a parse tree produced by the `newInstanceExpression`
   * labeled alternative in `PythonParser.expression`.
   * @param ctx the parse tree
   */
  exitNewInstanceExpression?: (ctx: NewInstanceExpressionContext) => void;
  /**
   * Enter a parse tree produced by the `ifExpression`
   * labeled alternative in `PythonParser.expression`.
   * @param ctx the parse tree
   */
  enterIfExpression?: (ctx: IfExpressionContext) => void;
  /**
   * Exit a parse tree produced by the `ifExpression`
   * labeled alternative in `PythonParser.expression`.
   * @param ctx the parse tree
   */
  exitIfExpression?: (ctx: IfExpressionContext) => void;
  /**
   * Enter a parse tree produced by the `termExpression`
   * labeled alternative in `PythonParser.expression`.
   * @param ctx the parse tree
   */
  enterTermExpression?: (ctx: TermExpressionContext) => void;
  /**
   * Exit a parse tree produced by the `termExpression`
   * labeled alternative in `PythonParser.expression`.
   * @param ctx the parse tree
   */
  exitTermExpression?: (ctx: TermExpressionContext) => void;
  /**
   * Enter a parse tree produced by the `identifierUseTerm`
   * labeled alternative in `PythonParser.term`.
   * @param ctx the parse tree
   */
  enterIdentifierUseTerm?: (ctx: IdentifierUseTermContext) => void;
  /**
   * Exit a parse tree produced by the `identifierUseTerm`
   * labeled alternative in `PythonParser.term`.
   * @param ctx the parse tree
   */
  exitIdentifierUseTerm?: (ctx: IdentifierUseTermContext) => void;
  /**
   * Enter a parse tree produced by the `methodCallTerm`
   * labeled alternative in `PythonParser.term`.
   * @param ctx the parse tree
   */
  enterMethodCallTerm?: (ctx: MethodCallTermContext) => void;
  /**
   * Exit a parse tree produced by the `methodCallTerm`
   * labeled alternative in `PythonParser.term`.
   * @param ctx the parse tree
   */
  exitMethodCallTerm?: (ctx: MethodCallTermContext) => void;
  /**
   * Enter a parse tree produced by the `indexedTerm`
   * labeled alternative in `PythonParser.term`.
   * @param ctx the parse tree
   */
  enterIndexedTerm?: (ctx: IndexedTermContext) => void;
  /**
   * Exit a parse tree produced by the `indexedTerm`
   * labeled alternative in `PythonParser.term`.
   * @param ctx the parse tree
   */
  exitIndexedTerm?: (ctx: IndexedTermContext) => void;
  /**
   * Enter a parse tree produced by the `litValueTerm`
   * labeled alternative in `PythonParser.term`.
   * @param ctx the parse tree
   */
  enterLitValueTerm?: (ctx: LitValueTermContext) => void;
  /**
   * Exit a parse tree produced by the `litValueTerm`
   * labeled alternative in `PythonParser.term`.
   * @param ctx the parse tree
   */
  exitLitValueTerm?: (ctx: LitValueTermContext) => void;
  /**
   * Enter a parse tree produced by the `dictionaryTerm`
   * labeled alternative in `PythonParser.term`.
   * @param ctx the parse tree
   */
  enterDictionaryTerm?: (ctx: DictionaryTermContext) => void;
  /**
   * Exit a parse tree produced by the `dictionaryTerm`
   * labeled alternative in `PythonParser.term`.
   * @param ctx the parse tree
   */
  exitDictionaryTerm?: (ctx: DictionaryTermContext) => void;
  /**
   * Enter a parse tree produced by the `bracketedExpressionTerm`
   * labeled alternative in `PythonParser.term`.
   * @param ctx the parse tree
   */
  enterBracketedExpressionTerm?: (ctx: BracketedExpressionTermContext) => void;
  /**
   * Exit a parse tree produced by the `bracketedExpressionTerm`
   * labeled alternative in `PythonParser.term`.
   * @param ctx the parse tree
   */
  exitBracketedExpressionTerm?: (ctx: BracketedExpressionTermContext) => void;
  /**
   * Enter a parse tree produced by the `chainableTerm`
   * labeled alternative in `PythonParser.term`.
   * @param ctx the parse tree
   */
  enterChainableTerm?: (ctx: ChainableTermContext) => void;
  /**
   * Exit a parse tree produced by the `chainableTerm`
   * labeled alternative in `PythonParser.term`.
   * @param ctx the parse tree
   */
  exitChainableTerm?: (ctx: ChainableTermContext) => void;
  /**
   * Enter a parse tree produced by the `tupleTerm`
   * labeled alternative in `PythonParser.term`.
   * @param ctx the parse tree
   */
  enterTupleTerm?: (ctx: TupleTermContext) => void;
  /**
   * Exit a parse tree produced by the `tupleTerm`
   * labeled alternative in `PythonParser.term`.
   * @param ctx the parse tree
   */
  exitTupleTerm?: (ctx: TupleTermContext) => void;
  /**
   * Enter a parse tree produced by the `thisInstanceTerm`
   * labeled alternative in `PythonParser.term`.
   * @param ctx the parse tree
   */
  enterThisInstanceTerm?: (ctx: ThisInstanceTermContext) => void;
  /**
   * Exit a parse tree produced by the `thisInstanceTerm`
   * labeled alternative in `PythonParser.term`.
   * @param ctx the parse tree
   */
  exitThisInstanceTerm?: (ctx: ThisInstanceTermContext) => void;
  /**
   * Enter a parse tree produced by the `listTerm`
   * labeled alternative in `PythonParser.term`.
   * @param ctx the parse tree
   */
  enterListTerm?: (ctx: ListTermContext) => void;
  /**
   * Exit a parse tree produced by the `listTerm`
   * labeled alternative in `PythonParser.term`.
   * @param ctx the parse tree
   */
  exitListTerm?: (ctx: ListTermContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.chainable`.
   * @param ctx the parse tree
   */
  enterChainable?: (ctx: ChainableContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.chainable`.
   * @param ctx the parse tree
   */
  exitChainable?: (ctx: ChainableContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.thisInstance`.
   * @param ctx the parse tree
   */
  enterThisInstance?: (ctx: ThisInstanceContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.thisInstance`.
   * @param ctx the parse tree
   */
  exitThisInstance?: (ctx: ThisInstanceContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.bracketedExpression`.
   * @param ctx the parse tree
   */
  enterBracketedExpression?: (ctx: BracketedExpressionContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.bracketedExpression`.
   * @param ctx the parse tree
   */
  exitBracketedExpression?: (ctx: BracketedExpressionContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.unaryExpression`.
   * @param ctx the parse tree
   */
  enterUnaryExpression?: (ctx: UnaryExpressionContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.unaryExpression`.
   * @param ctx the parse tree
   */
  exitUnaryExpression?: (ctx: UnaryExpressionContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.negateNumeric`.
   * @param ctx the parse tree
   */
  enterNegateNumeric?: (ctx: NegateNumericContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.negateNumeric`.
   * @param ctx the parse tree
   */
  exitNegateNumeric?: (ctx: NegateNumericContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.negateLogical`.
   * @param ctx the parse tree
   */
  enterNegateLogical?: (ctx: NegateLogicalContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.negateLogical`.
   * @param ctx the parse tree
   */
  exitNegateLogical?: (ctx: NegateLogicalContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.binaryExpression`.
   * @param ctx the parse tree
   */
  enterBinaryExpression?: (ctx: BinaryExpressionContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.binaryExpression`.
   * @param ctx the parse tree
   */
  exitBinaryExpression?: (ctx: BinaryExpressionContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.list`.
   * @param ctx the parse tree
   */
  enterList?: (ctx: ListContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.list`.
   * @param ctx the parse tree
   */
  exitList?: (ctx: ListContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.tuple`.
   * @param ctx the parse tree
   */
  enterTuple?: (ctx: TupleContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.tuple`.
   * @param ctx the parse tree
   */
  exitTuple?: (ctx: TupleContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.dictionary`.
   * @param ctx the parse tree
   */
  enterDictionary?: (ctx: DictionaryContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.dictionary`.
   * @param ctx the parse tree
   */
  exitDictionary?: (ctx: DictionaryContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.kvpList`.
   * @param ctx the parse tree
   */
  enterKvpList?: (ctx: KvpListContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.kvpList`.
   * @param ctx the parse tree
   */
  exitKvpList?: (ctx: KvpListContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.kvp`.
   * @param ctx the parse tree
   */
  enterKvp?: (ctx: KvpContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.kvp`.
   * @param ctx the parse tree
   */
  exitKvp?: (ctx: KvpContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.methodCall`.
   * @param ctx the parse tree
   */
  enterMethodCall?: (ctx: MethodCallContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.methodCall`.
   * @param ctx the parse tree
   */
  exitMethodCall?: (ctx: MethodCallContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.binaryOperator`.
   * @param ctx the parse tree
   */
  enterBinaryOperator?: (ctx: BinaryOperatorContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.binaryOperator`.
   * @param ctx the parse tree
   */
  exitBinaryOperator?: (ctx: BinaryOperatorContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.newInstance`.
   * @param ctx the parse tree
   */
  enterNewInstance?: (ctx: NewInstanceContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.newInstance`.
   * @param ctx the parse tree
   */
  exitNewInstance?: (ctx: NewInstanceContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.paramDef`.
   * @param ctx the parse tree
   */
  enterParamDef?: (ctx: ParamDefContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.paramDef`.
   * @param ctx the parse tree
   */
  exitParamDef?: (ctx: ParamDefContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.typeGeneric`.
   * @param ctx the parse tree
   */
  enterTypeGeneric?: (ctx: TypeGenericContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.typeGeneric`.
   * @param ctx the parse tree
   */
  exitTypeGeneric?: (ctx: TypeGenericContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.typeFunc`.
   * @param ctx the parse tree
   */
  enterTypeFunc?: (ctx: TypeFuncContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.typeFunc`.
   * @param ctx the parse tree
   */
  exitTypeFunc?: (ctx: TypeFuncContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.typeTuple`.
   * @param ctx the parse tree
   */
  enterTypeTuple?: (ctx: TypeTupleContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.typeTuple`.
   * @param ctx the parse tree
   */
  exitTypeTuple?: (ctx: TypeTupleContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.lambda`.
   * @param ctx the parse tree
   */
  enterLambda?: (ctx: LambdaContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.lambda`.
   * @param ctx the parse tree
   */
  exitLambda?: (ctx: LambdaContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.interpolatedString`.
   * @param ctx the parse tree
   */
  enterInterpolatedString?: (ctx: InterpolatedStringContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.interpolatedString`.
   * @param ctx the parse tree
   */
  exitInterpolatedString?: (ctx: InterpolatedStringContext) => void;

  visitTerminal(node: TerminalNode): void {}
  visitErrorNode(node: ErrorNode): void {}
  enterEveryRule(node: ParserRuleContext): void {}
  exitEveryRule(node: ParserRuleContext): void {}
}
