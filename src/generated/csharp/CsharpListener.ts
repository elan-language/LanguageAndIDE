// Generated from src/grammars/csharp/Csharp.g4 by ANTLR 4.13.1

import { ErrorNode, ParseTreeListener, ParserRuleContext, TerminalNode } from "antlr4ng";

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
import { ElseIfClauseContext } from "./CsharpParser.js";
import { ElseClauseContext } from "./CsharpParser.js";
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
import { LitRegExpContext } from "./CsharpParser.js";
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
 * This interface defines a complete listener for a parse tree produced by
 * `CsharpParser`.
 */
export class CsharpListener implements ParseTreeListener {
  /**
   * Enter a parse tree produced by `CsharpParser.file`.
   * @param ctx the parse tree
   */
  enterFile?: (ctx: FileContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.file`.
   * @param ctx the parse tree
   */
  exitFile?: (ctx: FileContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.global`.
   * @param ctx the parse tree
   */
  enterGlobal?: (ctx: GlobalContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.global`.
   * @param ctx the parse tree
   */
  exitGlobal?: (ctx: GlobalContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.main`.
   * @param ctx the parse tree
   */
  enterMain?: (ctx: MainContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.main`.
   * @param ctx the parse tree
   */
  exitMain?: (ctx: MainContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.function`.
   * @param ctx the parse tree
   */
  enterFunction?: (ctx: FunctionContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.function`.
   * @param ctx the parse tree
   */
  exitFunction?: (ctx: FunctionContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.test`.
   * @param ctx the parse tree
   */
  enterTest?: (ctx: TestContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.test`.
   * @param ctx the parse tree
   */
  exitTest?: (ctx: TestContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.procedure`.
   * @param ctx the parse tree
   */
  enterProcedure?: (ctx: ProcedureContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.procedure`.
   * @param ctx the parse tree
   */
  exitProcedure?: (ctx: ProcedureContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.constant`.
   * @param ctx the parse tree
   */
  enterConstant?: (ctx: ConstantContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.constant`.
   * @param ctx the parse tree
   */
  exitConstant?: (ctx: ConstantContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.enum`.
   * @param ctx the parse tree
   */
  enterEnum?: (ctx: EnumContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.enum`.
   * @param ctx the parse tree
   */
  exitEnum?: (ctx: EnumContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.concreteClass`.
   * @param ctx the parse tree
   */
  enterConcreteClass?: (ctx: ConcreteClassContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.concreteClass`.
   * @param ctx the parse tree
   */
  exitConcreteClass?: (ctx: ConcreteClassContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.abstractClass`.
   * @param ctx the parse tree
   */
  enterAbstractClass?: (ctx: AbstractClassContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.abstractClass`.
   * @param ctx the parse tree
   */
  exitAbstractClass?: (ctx: AbstractClassContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.comment`.
   * @param ctx the parse tree
   */
  enterComment?: (ctx: CommentContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.comment`.
   * @param ctx the parse tree
   */
  exitComment?: (ctx: CommentContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.commentText`.
   * @param ctx the parse tree
   */
  enterCommentText?: (ctx: CommentTextContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.commentText`.
   * @param ctx the parse tree
   */
  exitCommentText?: (ctx: CommentTextContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.ordinaryStatement`.
   * @param ctx the parse tree
   */
  enterOrdinaryStatement?: (ctx: OrdinaryStatementContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.ordinaryStatement`.
   * @param ctx the parse tree
   */
  exitOrdinaryStatement?: (ctx: OrdinaryStatementContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.variableDefinition`.
   * @param ctx the parse tree
   */
  enterVariableDefinition?: (ctx: VariableDefinitionContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.variableDefinition`.
   * @param ctx the parse tree
   */
  exitVariableDefinition?: (ctx: VariableDefinitionContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.assignment`.
   * @param ctx the parse tree
   */
  enterAssignment?: (ctx: AssignmentContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.assignment`.
   * @param ctx the parse tree
   */
  exitAssignment?: (ctx: AssignmentContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.ifStatement`.
   * @param ctx the parse tree
   */
  enterIfStatement?: (ctx: IfStatementContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.ifStatement`.
   * @param ctx the parse tree
   */
  exitIfStatement?: (ctx: IfStatementContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.whileLoop`.
   * @param ctx the parse tree
   */
  enterWhileLoop?: (ctx: WhileLoopContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.whileLoop`.
   * @param ctx the parse tree
   */
  exitWhileLoop?: (ctx: WhileLoopContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.forLoop`.
   * @param ctx the parse tree
   */
  enterForLoop?: (ctx: ForLoopContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.forLoop`.
   * @param ctx the parse tree
   */
  exitForLoop?: (ctx: ForLoopContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.procedureCall`.
   * @param ctx the parse tree
   */
  enterProcedureCall?: (ctx: ProcedureCallContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.procedureCall`.
   * @param ctx the parse tree
   */
  exitProcedureCall?: (ctx: ProcedureCallContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.procRef`.
   * @param ctx the parse tree
   */
  enterProcRef?: (ctx: ProcRefContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.procRef`.
   * @param ctx the parse tree
   */
  exitProcRef?: (ctx: ProcRefContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.thisProcRef`.
   * @param ctx the parse tree
   */
  enterThisProcRef?: (ctx: ThisProcRefContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.thisProcRef`.
   * @param ctx the parse tree
   */
  exitThisProcRef?: (ctx: ThisProcRefContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.instanceProcRef`.
   * @param ctx the parse tree
   */
  enterInstanceProcRef?: (ctx: InstanceProcRefContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.instanceProcRef`.
   * @param ctx the parse tree
   */
  exitInstanceProcRef?: (ctx: InstanceProcRefContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.identifierWithOptIndexes`.
   * @param ctx the parse tree
   */
  enterIdentifierWithOptIndexes?: (ctx: IdentifierWithOptIndexesContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.identifierWithOptIndexes`.
   * @param ctx the parse tree
   */
  exitIdentifierWithOptIndexes?: (ctx: IdentifierWithOptIndexesContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.tryStatement`.
   * @param ctx the parse tree
   */
  enterTryStatement?: (ctx: TryStatementContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.tryStatement`.
   * @param ctx the parse tree
   */
  exitTryStatement?: (ctx: TryStatementContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.throwStatement`.
   * @param ctx the parse tree
   */
  enterThrowStatement?: (ctx: ThrowStatementContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.throwStatement`.
   * @param ctx the parse tree
   */
  exitThrowStatement?: (ctx: ThrowStatementContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.errorMessage`.
   * @param ctx the parse tree
   */
  enterErrorMessage?: (ctx: ErrorMessageContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.errorMessage`.
   * @param ctx the parse tree
   */
  exitErrorMessage?: (ctx: ErrorMessageContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.assert`.
   * @param ctx the parse tree
   */
  enterAssert?: (ctx: AssertContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.assert`.
   * @param ctx the parse tree
   */
  exitAssert?: (ctx: AssertContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.returnStatement`.
   * @param ctx the parse tree
   */
  enterReturnStatement?: (ctx: ReturnStatementContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.returnStatement`.
   * @param ctx the parse tree
   */
  exitReturnStatement?: (ctx: ReturnStatementContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.elseIfClause`.
   * @param ctx the parse tree
   */
  enterElseIfClause?: (ctx: ElseIfClauseContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.elseIfClause`.
   * @param ctx the parse tree
   */
  exitElseIfClause?: (ctx: ElseIfClauseContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.elseClause`.
   * @param ctx the parse tree
   */
  enterElseClause?: (ctx: ElseClauseContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.elseClause`.
   * @param ctx the parse tree
   */
  exitElseClause?: (ctx: ElseClauseContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.catchStatement`.
   * @param ctx the parse tree
   */
  enterCatchStatement?: (ctx: CatchStatementContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.catchStatement`.
   * @param ctx the parse tree
   */
  exitCatchStatement?: (ctx: CatchStatementContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.constructorMember`.
   * @param ctx the parse tree
   */
  enterConstructorMember?: (ctx: ConstructorMemberContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.constructorMember`.
   * @param ctx the parse tree
   */
  exitConstructorMember?: (ctx: ConstructorMemberContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.property`.
   * @param ctx the parse tree
   */
  enterProperty?: (ctx: PropertyContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.property`.
   * @param ctx the parse tree
   */
  exitProperty?: (ctx: PropertyContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.functionMethod`.
   * @param ctx the parse tree
   */
  enterFunctionMethod?: (ctx: FunctionMethodContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.functionMethod`.
   * @param ctx the parse tree
   */
  exitFunctionMethod?: (ctx: FunctionMethodContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.procedureMethod`.
   * @param ctx the parse tree
   */
  enterProcedureMethod?: (ctx: ProcedureMethodContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.procedureMethod`.
   * @param ctx the parse tree
   */
  exitProcedureMethod?: (ctx: ProcedureMethodContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.abstractFunction`.
   * @param ctx the parse tree
   */
  enterAbstractFunction?: (ctx: AbstractFunctionContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.abstractFunction`.
   * @param ctx the parse tree
   */
  exitAbstractFunction?: (ctx: AbstractFunctionContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.abstractProcedure`.
   * @param ctx the parse tree
   */
  enterAbstractProcedure?: (ctx: AbstractProcedureContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.abstractProcedure`.
   * @param ctx the parse tree
   */
  exitAbstractProcedure?: (ctx: AbstractProcedureContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.identifierDef`.
   * @param ctx the parse tree
   */
  enterIdentifierDef?: (ctx: IdentifierDefContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.identifierDef`.
   * @param ctx the parse tree
   */
  exitIdentifierDef?: (ctx: IdentifierDefContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.identifierUse`.
   * @param ctx the parse tree
   */
  enterIdentifierUse?: (ctx: IdentifierUseContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.identifierUse`.
   * @param ctx the parse tree
   */
  exitIdentifierUse?: (ctx: IdentifierUseContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.assignable`.
   * @param ctx the parse tree
   */
  enterAssignable?: (ctx: AssignableContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.assignable`.
   * @param ctx the parse tree
   */
  exitAssignable?: (ctx: AssignableContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.methodName`.
   * @param ctx the parse tree
   */
  enterMethodName?: (ctx: MethodNameContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.methodName`.
   * @param ctx the parse tree
   */
  exitMethodName?: (ctx: MethodNameContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.testName`.
   * @param ctx the parse tree
   */
  enterTestName?: (ctx: TestNameContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.testName`.
   * @param ctx the parse tree
   */
  exitTestName?: (ctx: TestNameContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.typeName`.
   * @param ctx the parse tree
   */
  enterTypeName?: (ctx: TypeNameContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.typeName`.
   * @param ctx the parse tree
   */
  exitTypeName?: (ctx: TypeNameContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.constantValue`.
   * @param ctx the parse tree
   */
  enterConstantValue?: (ctx: ConstantValueContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.constantValue`.
   * @param ctx the parse tree
   */
  exitConstantValue?: (ctx: ConstantValueContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.argList`.
   * @param ctx the parse tree
   */
  enterArgList?: (ctx: ArgListContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.argList`.
   * @param ctx the parse tree
   */
  exitArgList?: (ctx: ArgListContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.argument`.
   * @param ctx the parse tree
   */
  enterArgument?: (ctx: ArgumentContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.argument`.
   * @param ctx the parse tree
   */
  exitArgument?: (ctx: ArgumentContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.paramList`.
   * @param ctx the parse tree
   */
  enterParamList?: (ctx: ParamListContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.paramList`.
   * @param ctx the parse tree
   */
  exitParamList?: (ctx: ParamListContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.identifierList`.
   * @param ctx the parse tree
   */
  enterIdentifierList?: (ctx: IdentifierListContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.identifierList`.
   * @param ctx the parse tree
   */
  exitIdentifierList?: (ctx: IdentifierListContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.expressionList`.
   * @param ctx the parse tree
   */
  enterExpressionList?: (ctx: ExpressionListContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.expressionList`.
   * @param ctx the parse tree
   */
  exitExpressionList?: (ctx: ExpressionListContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.type`.
   * @param ctx the parse tree
   */
  enterType?: (ctx: TypeContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.type`.
   * @param ctx the parse tree
   */
  exitType?: (ctx: TypeContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.assertActual`.
   * @param ctx the parse tree
   */
  enterAssertActual?: (ctx: AssertActualContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.assertActual`.
   * @param ctx the parse tree
   */
  exitAssertActual?: (ctx: AssertActualContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.assertExpected`.
   * @param ctx the parse tree
   */
  enterAssertExpected?: (ctx: AssertExpectedContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.assertExpected`.
   * @param ctx the parse tree
   */
  exitAssertExpected?: (ctx: AssertExpectedContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.litValue`.
   * @param ctx the parse tree
   */
  enterLitValue?: (ctx: LitValueContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.litValue`.
   * @param ctx the parse tree
   */
  exitLitValue?: (ctx: LitValueContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.litBoolean`.
   * @param ctx the parse tree
   */
  enterLitBoolean?: (ctx: LitBooleanContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.litBoolean`.
   * @param ctx the parse tree
   */
  exitLitBoolean?: (ctx: LitBooleanContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.litInt`.
   * @param ctx the parse tree
   */
  enterLitInt?: (ctx: LitIntContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.litInt`.
   * @param ctx the parse tree
   */
  exitLitInt?: (ctx: LitIntContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.litFloat`.
   * @param ctx the parse tree
   */
  enterLitFloat?: (ctx: LitFloatContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.litFloat`.
   * @param ctx the parse tree
   */
  exitLitFloat?: (ctx: LitFloatContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.litString`.
   * @param ctx the parse tree
   */
  enterLitString?: (ctx: LitStringContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.litString`.
   * @param ctx the parse tree
   */
  exitLitString?: (ctx: LitStringContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.enumValue`.
   * @param ctx the parse tree
   */
  enterEnumValue?: (ctx: EnumValueContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.enumValue`.
   * @param ctx the parse tree
   */
  exitEnumValue?: (ctx: EnumValueContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.litRegExp`.
   * @param ctx the parse tree
   */
  enterLitRegExp?: (ctx: LitRegExpContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.litRegExp`.
   * @param ctx the parse tree
   */
  exitLitRegExp?: (ctx: LitRegExpContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.index`.
   * @param ctx the parse tree
   */
  enterIndex?: (ctx: IndexContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.index`.
   * @param ctx the parse tree
   */
  exitIndex?: (ctx: IndexContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.expression`.
   * @param ctx the parse tree
   */
  enterExpression?: (ctx: ExpressionContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.expression`.
   * @param ctx the parse tree
   */
  exitExpression?: (ctx: ExpressionContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.term`.
   * @param ctx the parse tree
   */
  enterTerm?: (ctx: TermContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.term`.
   * @param ctx the parse tree
   */
  exitTerm?: (ctx: TermContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.chainable`.
   * @param ctx the parse tree
   */
  enterChainable?: (ctx: ChainableContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.chainable`.
   * @param ctx the parse tree
   */
  exitChainable?: (ctx: ChainableContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.thisInstance`.
   * @param ctx the parse tree
   */
  enterThisInstance?: (ctx: ThisInstanceContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.thisInstance`.
   * @param ctx the parse tree
   */
  exitThisInstance?: (ctx: ThisInstanceContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.bracketedExpression`.
   * @param ctx the parse tree
   */
  enterBracketedExpression?: (ctx: BracketedExpressionContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.bracketedExpression`.
   * @param ctx the parse tree
   */
  exitBracketedExpression?: (ctx: BracketedExpressionContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.unaryExpression`.
   * @param ctx the parse tree
   */
  enterUnaryExpression?: (ctx: UnaryExpressionContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.unaryExpression`.
   * @param ctx the parse tree
   */
  exitUnaryExpression?: (ctx: UnaryExpressionContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.negateNumeric`.
   * @param ctx the parse tree
   */
  enterNegateNumeric?: (ctx: NegateNumericContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.negateNumeric`.
   * @param ctx the parse tree
   */
  exitNegateNumeric?: (ctx: NegateNumericContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.negateLogical`.
   * @param ctx the parse tree
   */
  enterNegateLogical?: (ctx: NegateLogicalContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.negateLogical`.
   * @param ctx the parse tree
   */
  exitNegateLogical?: (ctx: NegateLogicalContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.binaryExpression`.
   * @param ctx the parse tree
   */
  enterBinaryExpression?: (ctx: BinaryExpressionContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.binaryExpression`.
   * @param ctx the parse tree
   */
  exitBinaryExpression?: (ctx: BinaryExpressionContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.list`.
   * @param ctx the parse tree
   */
  enterList?: (ctx: ListContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.list`.
   * @param ctx the parse tree
   */
  exitList?: (ctx: ListContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.tuple`.
   * @param ctx the parse tree
   */
  enterTuple?: (ctx: TupleContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.tuple`.
   * @param ctx the parse tree
   */
  exitTuple?: (ctx: TupleContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.dictionary`.
   * @param ctx the parse tree
   */
  enterDictionary?: (ctx: DictionaryContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.dictionary`.
   * @param ctx the parse tree
   */
  exitDictionary?: (ctx: DictionaryContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.kvpList`.
   * @param ctx the parse tree
   */
  enterKvpList?: (ctx: KvpListContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.kvpList`.
   * @param ctx the parse tree
   */
  exitKvpList?: (ctx: KvpListContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.kvp`.
   * @param ctx the parse tree
   */
  enterKvp?: (ctx: KvpContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.kvp`.
   * @param ctx the parse tree
   */
  exitKvp?: (ctx: KvpContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.methodCall`.
   * @param ctx the parse tree
   */
  enterMethodCall?: (ctx: MethodCallContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.methodCall`.
   * @param ctx the parse tree
   */
  exitMethodCall?: (ctx: MethodCallContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.binaryOperator`.
   * @param ctx the parse tree
   */
  enterBinaryOperator?: (ctx: BinaryOperatorContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.binaryOperator`.
   * @param ctx the parse tree
   */
  exitBinaryOperator?: (ctx: BinaryOperatorContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.newInstance`.
   * @param ctx the parse tree
   */
  enterNewInstance?: (ctx: NewInstanceContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.newInstance`.
   * @param ctx the parse tree
   */
  exitNewInstance?: (ctx: NewInstanceContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.paramDef`.
   * @param ctx the parse tree
   */
  enterParamDef?: (ctx: ParamDefContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.paramDef`.
   * @param ctx the parse tree
   */
  exitParamDef?: (ctx: ParamDefContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.typeGeneric`.
   * @param ctx the parse tree
   */
  enterTypeGeneric?: (ctx: TypeGenericContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.typeGeneric`.
   * @param ctx the parse tree
   */
  exitTypeGeneric?: (ctx: TypeGenericContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.typeFunc`.
   * @param ctx the parse tree
   */
  enterTypeFunc?: (ctx: TypeFuncContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.typeFunc`.
   * @param ctx the parse tree
   */
  exitTypeFunc?: (ctx: TypeFuncContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.typeTuple`.
   * @param ctx the parse tree
   */
  enterTypeTuple?: (ctx: TypeTupleContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.typeTuple`.
   * @param ctx the parse tree
   */
  exitTypeTuple?: (ctx: TypeTupleContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.lambda`.
   * @param ctx the parse tree
   */
  enterLambda?: (ctx: LambdaContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.lambda`.
   * @param ctx the parse tree
   */
  exitLambda?: (ctx: LambdaContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.interpolatedString`.
   * @param ctx the parse tree
   */
  enterInterpolatedString?: (ctx: InterpolatedStringContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.interpolatedString`.
   * @param ctx the parse tree
   */
  exitInterpolatedString?: (ctx: InterpolatedStringContext) => void;
  /**
   * Enter a parse tree produced by `CsharpParser.power`.
   * @param ctx the parse tree
   */
  enterPower?: (ctx: PowerContext) => void;
  /**
   * Exit a parse tree produced by `CsharpParser.power`.
   * @param ctx the parse tree
   */
  exitPower?: (ctx: PowerContext) => void;

  visitTerminal(node: TerminalNode): void {}
  visitErrorNode(node: ErrorNode): void {}
  enterEveryRule(node: ParserRuleContext): void {}
  exitEveryRule(node: ParserRuleContext): void {}
}
