// Generated from src/grammars/ref-lang/RefLang.g4 by ANTLR 4.13.1

import { ErrorNode, ParseTreeListener, ParserRuleContext, TerminalNode } from "antlr4ng";

import { FileContext } from "./RefLangParser.js";
import { GlobalContext } from "./RefLangParser.js";
import { MainContext } from "./RefLangParser.js";
import { FunctionContext } from "./RefLangParser.js";
import { TestContext } from "./RefLangParser.js";
import { TestStatementContext } from "./RefLangParser.js";
import { ProcedureContext } from "./RefLangParser.js";
import { ConstantContext } from "./RefLangParser.js";
import { EnumContext } from "./RefLangParser.js";
import { ConcreteClassContext } from "./RefLangParser.js";
import { ConcreteClassMemberContext } from "./RefLangParser.js";
import { AbstractClassContext } from "./RefLangParser.js";
import { AbstractClassMemberContext } from "./RefLangParser.js";
import { CommentContext } from "./RefLangParser.js";
import { CommentTextContext } from "./RefLangParser.js";
import { OrdinaryStatementContext } from "./RefLangParser.js";
import { VariableDefinitionContext } from "./RefLangParser.js";
import { AssignmentContext } from "./RefLangParser.js";
import { IfStatementContext } from "./RefLangParser.js";
import { WhileLoopContext } from "./RefLangParser.js";
import { ForLoopContext } from "./RefLangParser.js";
import { ProcedureCallContext } from "./RefLangParser.js";
import { ProcRefContext } from "./RefLangParser.js";
import { ThisProcRefContext } from "./RefLangParser.js";
import { InstanceProcRefContext } from "./RefLangParser.js";
import { IdentifierWithOptIndexesContext } from "./RefLangParser.js";
import { TryStatementContext } from "./RefLangParser.js";
import { ThrowStatementContext } from "./RefLangParser.js";
import { ErrorMessageContext } from "./RefLangParser.js";
import { AssertContext } from "./RefLangParser.js";
import { ReturnStatementContext } from "./RefLangParser.js";
import { ElseIfClauseContext } from "./RefLangParser.js";
import { ElseClauseContext } from "./RefLangParser.js";
import { CatchStatementContext } from "./RefLangParser.js";
import { ConstructorMemberContext } from "./RefLangParser.js";
import { PropertyContext } from "./RefLangParser.js";
import { FunctionMethodContext } from "./RefLangParser.js";
import { ProcedureMethodContext } from "./RefLangParser.js";
import { AbstractFunctionContext } from "./RefLangParser.js";
import { AbstractProcedureContext } from "./RefLangParser.js";
import { IdentifierDefContext } from "./RefLangParser.js";
import { IdentifierUseContext } from "./RefLangParser.js";
import { SimpleAssignableContext } from "./RefLangParser.js";
import { IndexedAssignableContext } from "./RefLangParser.js";
import { ThisAssignableContext } from "./RefLangParser.js";
import { MethodNameContext } from "./RefLangParser.js";
import { TestNameContext } from "./RefLangParser.js";
import { IntTypeNameContext } from "./RefLangParser.js";
import { FloatTypeNameContext } from "./RefLangParser.js";
import { BoolTypeNameContext } from "./RefLangParser.js";
import { StringTypeNameContext } from "./RefLangParser.js";
import { ListTypeNameContext } from "./RefLangParser.js";
import { UdtTypeNameContext } from "./RefLangParser.js";
import { ConstantValueContext } from "./RefLangParser.js";
import { ArgListContext } from "./RefLangParser.js";
import { ArgumentContext } from "./RefLangParser.js";
import { ParamListContext } from "./RefLangParser.js";
import { IdentifierListContext } from "./RefLangParser.js";
import { ExpressionListContext } from "./RefLangParser.js";
import { TypeContext } from "./RefLangParser.js";
import { AssertActualContext } from "./RefLangParser.js";
import { AssertExpectedContext } from "./RefLangParser.js";
import { LitValueContext } from "./RefLangParser.js";
import { LitBooleanContext } from "./RefLangParser.js";
import { LitIntegerContext } from "./RefLangParser.js";
import { LitBinaryContext } from "./RefLangParser.js";
import { LitHexContext } from "./RefLangParser.js";
import { LitFloatContext } from "./RefLangParser.js";
import { LitStringContext } from "./RefLangParser.js";
import { InterpolatedStringContext } from "./RefLangParser.js";
import { EnumValueContext } from "./RefLangParser.js";
import { LitRegExpContext } from "./RefLangParser.js";
import { IndexContext } from "./RefLangParser.js";
import { ExpressionContext } from "./RefLangParser.js";
import { TermContext } from "./RefLangParser.js";
import { ChainableContext } from "./RefLangParser.js";
import { ThisInstanceContext } from "./RefLangParser.js";
import { BracketedExpressionContext } from "./RefLangParser.js";
import { UnaryExpressionContext } from "./RefLangParser.js";
import { NegateNumericContext } from "./RefLangParser.js";
import { NegateLogicalContext } from "./RefLangParser.js";
import { BinaryExpressionContext } from "./RefLangParser.js";
import { ListContext } from "./RefLangParser.js";
import { TupleContext } from "./RefLangParser.js";
import { DictionaryContext } from "./RefLangParser.js";
import { KvpListContext } from "./RefLangParser.js";
import { KvpContext } from "./RefLangParser.js";
import { MethodCallContext } from "./RefLangParser.js";
import { BinaryOperatorContext } from "./RefLangParser.js";
import { NewInstanceContext } from "./RefLangParser.js";
import { ParamDefContext } from "./RefLangParser.js";
import { TypeGenericContext } from "./RefLangParser.js";
import { TypeFuncContext } from "./RefLangParser.js";
import { TypeTupleContext } from "./RefLangParser.js";
import { LambdaContext } from "./RefLangParser.js";

/**
 * This interface defines a complete listener for a parse tree produced by
 * `RefLangParser`.
 */
export class RefLangListener implements ParseTreeListener {
  /**
   * Enter a parse tree produced by `RefLangParser.file`.
   * @param ctx the parse tree
   */
  enterFile?: (ctx: FileContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.file`.
   * @param ctx the parse tree
   */
  exitFile?: (ctx: FileContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.global`.
   * @param ctx the parse tree
   */
  enterGlobal?: (ctx: GlobalContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.global`.
   * @param ctx the parse tree
   */
  exitGlobal?: (ctx: GlobalContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.main`.
   * @param ctx the parse tree
   */
  enterMain?: (ctx: MainContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.main`.
   * @param ctx the parse tree
   */
  exitMain?: (ctx: MainContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.function`.
   * @param ctx the parse tree
   */
  enterFunction?: (ctx: FunctionContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.function`.
   * @param ctx the parse tree
   */
  exitFunction?: (ctx: FunctionContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.test`.
   * @param ctx the parse tree
   */
  enterTest?: (ctx: TestContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.test`.
   * @param ctx the parse tree
   */
  exitTest?: (ctx: TestContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.testStatement`.
   * @param ctx the parse tree
   */
  enterTestStatement?: (ctx: TestStatementContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.testStatement`.
   * @param ctx the parse tree
   */
  exitTestStatement?: (ctx: TestStatementContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.procedure`.
   * @param ctx the parse tree
   */
  enterProcedure?: (ctx: ProcedureContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.procedure`.
   * @param ctx the parse tree
   */
  exitProcedure?: (ctx: ProcedureContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.constant`.
   * @param ctx the parse tree
   */
  enterConstant?: (ctx: ConstantContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.constant`.
   * @param ctx the parse tree
   */
  exitConstant?: (ctx: ConstantContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.enum`.
   * @param ctx the parse tree
   */
  enterEnum?: (ctx: EnumContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.enum`.
   * @param ctx the parse tree
   */
  exitEnum?: (ctx: EnumContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.concreteClass`.
   * @param ctx the parse tree
   */
  enterConcreteClass?: (ctx: ConcreteClassContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.concreteClass`.
   * @param ctx the parse tree
   */
  exitConcreteClass?: (ctx: ConcreteClassContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.concreteClassMember`.
   * @param ctx the parse tree
   */
  enterConcreteClassMember?: (ctx: ConcreteClassMemberContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.concreteClassMember`.
   * @param ctx the parse tree
   */
  exitConcreteClassMember?: (ctx: ConcreteClassMemberContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.abstractClass`.
   * @param ctx the parse tree
   */
  enterAbstractClass?: (ctx: AbstractClassContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.abstractClass`.
   * @param ctx the parse tree
   */
  exitAbstractClass?: (ctx: AbstractClassContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.abstractClassMember`.
   * @param ctx the parse tree
   */
  enterAbstractClassMember?: (ctx: AbstractClassMemberContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.abstractClassMember`.
   * @param ctx the parse tree
   */
  exitAbstractClassMember?: (ctx: AbstractClassMemberContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.comment`.
   * @param ctx the parse tree
   */
  enterComment?: (ctx: CommentContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.comment`.
   * @param ctx the parse tree
   */
  exitComment?: (ctx: CommentContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.commentText`.
   * @param ctx the parse tree
   */
  enterCommentText?: (ctx: CommentTextContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.commentText`.
   * @param ctx the parse tree
   */
  exitCommentText?: (ctx: CommentTextContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.ordinaryStatement`.
   * @param ctx the parse tree
   */
  enterOrdinaryStatement?: (ctx: OrdinaryStatementContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.ordinaryStatement`.
   * @param ctx the parse tree
   */
  exitOrdinaryStatement?: (ctx: OrdinaryStatementContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.variableDefinition`.
   * @param ctx the parse tree
   */
  enterVariableDefinition?: (ctx: VariableDefinitionContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.variableDefinition`.
   * @param ctx the parse tree
   */
  exitVariableDefinition?: (ctx: VariableDefinitionContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.assignment`.
   * @param ctx the parse tree
   */
  enterAssignment?: (ctx: AssignmentContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.assignment`.
   * @param ctx the parse tree
   */
  exitAssignment?: (ctx: AssignmentContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.ifStatement`.
   * @param ctx the parse tree
   */
  enterIfStatement?: (ctx: IfStatementContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.ifStatement`.
   * @param ctx the parse tree
   */
  exitIfStatement?: (ctx: IfStatementContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.whileLoop`.
   * @param ctx the parse tree
   */
  enterWhileLoop?: (ctx: WhileLoopContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.whileLoop`.
   * @param ctx the parse tree
   */
  exitWhileLoop?: (ctx: WhileLoopContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.forLoop`.
   * @param ctx the parse tree
   */
  enterForLoop?: (ctx: ForLoopContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.forLoop`.
   * @param ctx the parse tree
   */
  exitForLoop?: (ctx: ForLoopContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.procedureCall`.
   * @param ctx the parse tree
   */
  enterProcedureCall?: (ctx: ProcedureCallContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.procedureCall`.
   * @param ctx the parse tree
   */
  exitProcedureCall?: (ctx: ProcedureCallContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.procRef`.
   * @param ctx the parse tree
   */
  enterProcRef?: (ctx: ProcRefContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.procRef`.
   * @param ctx the parse tree
   */
  exitProcRef?: (ctx: ProcRefContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.thisProcRef`.
   * @param ctx the parse tree
   */
  enterThisProcRef?: (ctx: ThisProcRefContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.thisProcRef`.
   * @param ctx the parse tree
   */
  exitThisProcRef?: (ctx: ThisProcRefContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.instanceProcRef`.
   * @param ctx the parse tree
   */
  enterInstanceProcRef?: (ctx: InstanceProcRefContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.instanceProcRef`.
   * @param ctx the parse tree
   */
  exitInstanceProcRef?: (ctx: InstanceProcRefContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.identifierWithOptIndexes`.
   * @param ctx the parse tree
   */
  enterIdentifierWithOptIndexes?: (ctx: IdentifierWithOptIndexesContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.identifierWithOptIndexes`.
   * @param ctx the parse tree
   */
  exitIdentifierWithOptIndexes?: (ctx: IdentifierWithOptIndexesContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.tryStatement`.
   * @param ctx the parse tree
   */
  enterTryStatement?: (ctx: TryStatementContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.tryStatement`.
   * @param ctx the parse tree
   */
  exitTryStatement?: (ctx: TryStatementContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.throwStatement`.
   * @param ctx the parse tree
   */
  enterThrowStatement?: (ctx: ThrowStatementContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.throwStatement`.
   * @param ctx the parse tree
   */
  exitThrowStatement?: (ctx: ThrowStatementContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.errorMessage`.
   * @param ctx the parse tree
   */
  enterErrorMessage?: (ctx: ErrorMessageContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.errorMessage`.
   * @param ctx the parse tree
   */
  exitErrorMessage?: (ctx: ErrorMessageContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.assert`.
   * @param ctx the parse tree
   */
  enterAssert?: (ctx: AssertContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.assert`.
   * @param ctx the parse tree
   */
  exitAssert?: (ctx: AssertContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.returnStatement`.
   * @param ctx the parse tree
   */
  enterReturnStatement?: (ctx: ReturnStatementContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.returnStatement`.
   * @param ctx the parse tree
   */
  exitReturnStatement?: (ctx: ReturnStatementContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.elseIfClause`.
   * @param ctx the parse tree
   */
  enterElseIfClause?: (ctx: ElseIfClauseContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.elseIfClause`.
   * @param ctx the parse tree
   */
  exitElseIfClause?: (ctx: ElseIfClauseContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.elseClause`.
   * @param ctx the parse tree
   */
  enterElseClause?: (ctx: ElseClauseContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.elseClause`.
   * @param ctx the parse tree
   */
  exitElseClause?: (ctx: ElseClauseContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.catchStatement`.
   * @param ctx the parse tree
   */
  enterCatchStatement?: (ctx: CatchStatementContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.catchStatement`.
   * @param ctx the parse tree
   */
  exitCatchStatement?: (ctx: CatchStatementContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.constructorMember`.
   * @param ctx the parse tree
   */
  enterConstructorMember?: (ctx: ConstructorMemberContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.constructorMember`.
   * @param ctx the parse tree
   */
  exitConstructorMember?: (ctx: ConstructorMemberContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.property`.
   * @param ctx the parse tree
   */
  enterProperty?: (ctx: PropertyContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.property`.
   * @param ctx the parse tree
   */
  exitProperty?: (ctx: PropertyContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.functionMethod`.
   * @param ctx the parse tree
   */
  enterFunctionMethod?: (ctx: FunctionMethodContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.functionMethod`.
   * @param ctx the parse tree
   */
  exitFunctionMethod?: (ctx: FunctionMethodContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.procedureMethod`.
   * @param ctx the parse tree
   */
  enterProcedureMethod?: (ctx: ProcedureMethodContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.procedureMethod`.
   * @param ctx the parse tree
   */
  exitProcedureMethod?: (ctx: ProcedureMethodContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.abstractFunction`.
   * @param ctx the parse tree
   */
  enterAbstractFunction?: (ctx: AbstractFunctionContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.abstractFunction`.
   * @param ctx the parse tree
   */
  exitAbstractFunction?: (ctx: AbstractFunctionContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.abstractProcedure`.
   * @param ctx the parse tree
   */
  enterAbstractProcedure?: (ctx: AbstractProcedureContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.abstractProcedure`.
   * @param ctx the parse tree
   */
  exitAbstractProcedure?: (ctx: AbstractProcedureContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.identifierDef`.
   * @param ctx the parse tree
   */
  enterIdentifierDef?: (ctx: IdentifierDefContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.identifierDef`.
   * @param ctx the parse tree
   */
  exitIdentifierDef?: (ctx: IdentifierDefContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.identifierUse`.
   * @param ctx the parse tree
   */
  enterIdentifierUse?: (ctx: IdentifierUseContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.identifierUse`.
   * @param ctx the parse tree
   */
  exitIdentifierUse?: (ctx: IdentifierUseContext) => void;
  /**
   * Enter a parse tree produced by the `simpleAssignable`
   * labeled alternative in `RefLangParser.assignable`.
   * @param ctx the parse tree
   */
  enterSimpleAssignable?: (ctx: SimpleAssignableContext) => void;
  /**
   * Exit a parse tree produced by the `simpleAssignable`
   * labeled alternative in `RefLangParser.assignable`.
   * @param ctx the parse tree
   */
  exitSimpleAssignable?: (ctx: SimpleAssignableContext) => void;
  /**
   * Enter a parse tree produced by the `indexedAssignable`
   * labeled alternative in `RefLangParser.assignable`.
   * @param ctx the parse tree
   */
  enterIndexedAssignable?: (ctx: IndexedAssignableContext) => void;
  /**
   * Exit a parse tree produced by the `indexedAssignable`
   * labeled alternative in `RefLangParser.assignable`.
   * @param ctx the parse tree
   */
  exitIndexedAssignable?: (ctx: IndexedAssignableContext) => void;
  /**
   * Enter a parse tree produced by the `thisAssignable`
   * labeled alternative in `RefLangParser.assignable`.
   * @param ctx the parse tree
   */
  enterThisAssignable?: (ctx: ThisAssignableContext) => void;
  /**
   * Exit a parse tree produced by the `thisAssignable`
   * labeled alternative in `RefLangParser.assignable`.
   * @param ctx the parse tree
   */
  exitThisAssignable?: (ctx: ThisAssignableContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.methodName`.
   * @param ctx the parse tree
   */
  enterMethodName?: (ctx: MethodNameContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.methodName`.
   * @param ctx the parse tree
   */
  exitMethodName?: (ctx: MethodNameContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.testName`.
   * @param ctx the parse tree
   */
  enterTestName?: (ctx: TestNameContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.testName`.
   * @param ctx the parse tree
   */
  exitTestName?: (ctx: TestNameContext) => void;
  /**
   * Enter a parse tree produced by the `intTypeName`
   * labeled alternative in `RefLangParser.typeName`.
   * @param ctx the parse tree
   */
  enterIntTypeName?: (ctx: IntTypeNameContext) => void;
  /**
   * Exit a parse tree produced by the `intTypeName`
   * labeled alternative in `RefLangParser.typeName`.
   * @param ctx the parse tree
   */
  exitIntTypeName?: (ctx: IntTypeNameContext) => void;
  /**
   * Enter a parse tree produced by the `floatTypeName`
   * labeled alternative in `RefLangParser.typeName`.
   * @param ctx the parse tree
   */
  enterFloatTypeName?: (ctx: FloatTypeNameContext) => void;
  /**
   * Exit a parse tree produced by the `floatTypeName`
   * labeled alternative in `RefLangParser.typeName`.
   * @param ctx the parse tree
   */
  exitFloatTypeName?: (ctx: FloatTypeNameContext) => void;
  /**
   * Enter a parse tree produced by the `boolTypeName`
   * labeled alternative in `RefLangParser.typeName`.
   * @param ctx the parse tree
   */
  enterBoolTypeName?: (ctx: BoolTypeNameContext) => void;
  /**
   * Exit a parse tree produced by the `boolTypeName`
   * labeled alternative in `RefLangParser.typeName`.
   * @param ctx the parse tree
   */
  exitBoolTypeName?: (ctx: BoolTypeNameContext) => void;
  /**
   * Enter a parse tree produced by the `stringTypeName`
   * labeled alternative in `RefLangParser.typeName`.
   * @param ctx the parse tree
   */
  enterStringTypeName?: (ctx: StringTypeNameContext) => void;
  /**
   * Exit a parse tree produced by the `stringTypeName`
   * labeled alternative in `RefLangParser.typeName`.
   * @param ctx the parse tree
   */
  exitStringTypeName?: (ctx: StringTypeNameContext) => void;
  /**
   * Enter a parse tree produced by the `listTypeName`
   * labeled alternative in `RefLangParser.typeName`.
   * @param ctx the parse tree
   */
  enterListTypeName?: (ctx: ListTypeNameContext) => void;
  /**
   * Exit a parse tree produced by the `listTypeName`
   * labeled alternative in `RefLangParser.typeName`.
   * @param ctx the parse tree
   */
  exitListTypeName?: (ctx: ListTypeNameContext) => void;
  /**
   * Enter a parse tree produced by the `udtTypeName`
   * labeled alternative in `RefLangParser.typeName`.
   * @param ctx the parse tree
   */
  enterUdtTypeName?: (ctx: UdtTypeNameContext) => void;
  /**
   * Exit a parse tree produced by the `udtTypeName`
   * labeled alternative in `RefLangParser.typeName`.
   * @param ctx the parse tree
   */
  exitUdtTypeName?: (ctx: UdtTypeNameContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.constantValue`.
   * @param ctx the parse tree
   */
  enterConstantValue?: (ctx: ConstantValueContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.constantValue`.
   * @param ctx the parse tree
   */
  exitConstantValue?: (ctx: ConstantValueContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.argList`.
   * @param ctx the parse tree
   */
  enterArgList?: (ctx: ArgListContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.argList`.
   * @param ctx the parse tree
   */
  exitArgList?: (ctx: ArgListContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.argument`.
   * @param ctx the parse tree
   */
  enterArgument?: (ctx: ArgumentContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.argument`.
   * @param ctx the parse tree
   */
  exitArgument?: (ctx: ArgumentContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.paramList`.
   * @param ctx the parse tree
   */
  enterParamList?: (ctx: ParamListContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.paramList`.
   * @param ctx the parse tree
   */
  exitParamList?: (ctx: ParamListContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.identifierList`.
   * @param ctx the parse tree
   */
  enterIdentifierList?: (ctx: IdentifierListContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.identifierList`.
   * @param ctx the parse tree
   */
  exitIdentifierList?: (ctx: IdentifierListContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.expressionList`.
   * @param ctx the parse tree
   */
  enterExpressionList?: (ctx: ExpressionListContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.expressionList`.
   * @param ctx the parse tree
   */
  exitExpressionList?: (ctx: ExpressionListContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.type`.
   * @param ctx the parse tree
   */
  enterType?: (ctx: TypeContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.type`.
   * @param ctx the parse tree
   */
  exitType?: (ctx: TypeContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.assertActual`.
   * @param ctx the parse tree
   */
  enterAssertActual?: (ctx: AssertActualContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.assertActual`.
   * @param ctx the parse tree
   */
  exitAssertActual?: (ctx: AssertActualContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.assertExpected`.
   * @param ctx the parse tree
   */
  enterAssertExpected?: (ctx: AssertExpectedContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.assertExpected`.
   * @param ctx the parse tree
   */
  exitAssertExpected?: (ctx: AssertExpectedContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.litValue`.
   * @param ctx the parse tree
   */
  enterLitValue?: (ctx: LitValueContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.litValue`.
   * @param ctx the parse tree
   */
  exitLitValue?: (ctx: LitValueContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.litBoolean`.
   * @param ctx the parse tree
   */
  enterLitBoolean?: (ctx: LitBooleanContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.litBoolean`.
   * @param ctx the parse tree
   */
  exitLitBoolean?: (ctx: LitBooleanContext) => void;
  /**
   * Enter a parse tree produced by the `litInteger`
   * labeled alternative in `RefLangParser.litInt`.
   * @param ctx the parse tree
   */
  enterLitInteger?: (ctx: LitIntegerContext) => void;
  /**
   * Exit a parse tree produced by the `litInteger`
   * labeled alternative in `RefLangParser.litInt`.
   * @param ctx the parse tree
   */
  exitLitInteger?: (ctx: LitIntegerContext) => void;
  /**
   * Enter a parse tree produced by the `litBinary`
   * labeled alternative in `RefLangParser.litInt`.
   * @param ctx the parse tree
   */
  enterLitBinary?: (ctx: LitBinaryContext) => void;
  /**
   * Exit a parse tree produced by the `litBinary`
   * labeled alternative in `RefLangParser.litInt`.
   * @param ctx the parse tree
   */
  exitLitBinary?: (ctx: LitBinaryContext) => void;
  /**
   * Enter a parse tree produced by the `litHex`
   * labeled alternative in `RefLangParser.litInt`.
   * @param ctx the parse tree
   */
  enterLitHex?: (ctx: LitHexContext) => void;
  /**
   * Exit a parse tree produced by the `litHex`
   * labeled alternative in `RefLangParser.litInt`.
   * @param ctx the parse tree
   */
  exitLitHex?: (ctx: LitHexContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.litFloat`.
   * @param ctx the parse tree
   */
  enterLitFloat?: (ctx: LitFloatContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.litFloat`.
   * @param ctx the parse tree
   */
  exitLitFloat?: (ctx: LitFloatContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.litString`.
   * @param ctx the parse tree
   */
  enterLitString?: (ctx: LitStringContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.litString`.
   * @param ctx the parse tree
   */
  exitLitString?: (ctx: LitStringContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.interpolatedString`.
   * @param ctx the parse tree
   */
  enterInterpolatedString?: (ctx: InterpolatedStringContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.interpolatedString`.
   * @param ctx the parse tree
   */
  exitInterpolatedString?: (ctx: InterpolatedStringContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.enumValue`.
   * @param ctx the parse tree
   */
  enterEnumValue?: (ctx: EnumValueContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.enumValue`.
   * @param ctx the parse tree
   */
  exitEnumValue?: (ctx: EnumValueContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.litRegExp`.
   * @param ctx the parse tree
   */
  enterLitRegExp?: (ctx: LitRegExpContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.litRegExp`.
   * @param ctx the parse tree
   */
  exitLitRegExp?: (ctx: LitRegExpContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.index`.
   * @param ctx the parse tree
   */
  enterIndex?: (ctx: IndexContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.index`.
   * @param ctx the parse tree
   */
  exitIndex?: (ctx: IndexContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.expression`.
   * @param ctx the parse tree
   */
  enterExpression?: (ctx: ExpressionContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.expression`.
   * @param ctx the parse tree
   */
  exitExpression?: (ctx: ExpressionContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.term`.
   * @param ctx the parse tree
   */
  enterTerm?: (ctx: TermContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.term`.
   * @param ctx the parse tree
   */
  exitTerm?: (ctx: TermContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.chainable`.
   * @param ctx the parse tree
   */
  enterChainable?: (ctx: ChainableContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.chainable`.
   * @param ctx the parse tree
   */
  exitChainable?: (ctx: ChainableContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.thisInstance`.
   * @param ctx the parse tree
   */
  enterThisInstance?: (ctx: ThisInstanceContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.thisInstance`.
   * @param ctx the parse tree
   */
  exitThisInstance?: (ctx: ThisInstanceContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.bracketedExpression`.
   * @param ctx the parse tree
   */
  enterBracketedExpression?: (ctx: BracketedExpressionContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.bracketedExpression`.
   * @param ctx the parse tree
   */
  exitBracketedExpression?: (ctx: BracketedExpressionContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.unaryExpression`.
   * @param ctx the parse tree
   */
  enterUnaryExpression?: (ctx: UnaryExpressionContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.unaryExpression`.
   * @param ctx the parse tree
   */
  exitUnaryExpression?: (ctx: UnaryExpressionContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.negateNumeric`.
   * @param ctx the parse tree
   */
  enterNegateNumeric?: (ctx: NegateNumericContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.negateNumeric`.
   * @param ctx the parse tree
   */
  exitNegateNumeric?: (ctx: NegateNumericContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.negateLogical`.
   * @param ctx the parse tree
   */
  enterNegateLogical?: (ctx: NegateLogicalContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.negateLogical`.
   * @param ctx the parse tree
   */
  exitNegateLogical?: (ctx: NegateLogicalContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.binaryExpression`.
   * @param ctx the parse tree
   */
  enterBinaryExpression?: (ctx: BinaryExpressionContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.binaryExpression`.
   * @param ctx the parse tree
   */
  exitBinaryExpression?: (ctx: BinaryExpressionContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.list`.
   * @param ctx the parse tree
   */
  enterList?: (ctx: ListContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.list`.
   * @param ctx the parse tree
   */
  exitList?: (ctx: ListContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.tuple`.
   * @param ctx the parse tree
   */
  enterTuple?: (ctx: TupleContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.tuple`.
   * @param ctx the parse tree
   */
  exitTuple?: (ctx: TupleContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.dictionary`.
   * @param ctx the parse tree
   */
  enterDictionary?: (ctx: DictionaryContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.dictionary`.
   * @param ctx the parse tree
   */
  exitDictionary?: (ctx: DictionaryContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.kvpList`.
   * @param ctx the parse tree
   */
  enterKvpList?: (ctx: KvpListContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.kvpList`.
   * @param ctx the parse tree
   */
  exitKvpList?: (ctx: KvpListContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.kvp`.
   * @param ctx the parse tree
   */
  enterKvp?: (ctx: KvpContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.kvp`.
   * @param ctx the parse tree
   */
  exitKvp?: (ctx: KvpContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.methodCall`.
   * @param ctx the parse tree
   */
  enterMethodCall?: (ctx: MethodCallContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.methodCall`.
   * @param ctx the parse tree
   */
  exitMethodCall?: (ctx: MethodCallContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.binaryOperator`.
   * @param ctx the parse tree
   */
  enterBinaryOperator?: (ctx: BinaryOperatorContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.binaryOperator`.
   * @param ctx the parse tree
   */
  exitBinaryOperator?: (ctx: BinaryOperatorContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.newInstance`.
   * @param ctx the parse tree
   */
  enterNewInstance?: (ctx: NewInstanceContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.newInstance`.
   * @param ctx the parse tree
   */
  exitNewInstance?: (ctx: NewInstanceContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.paramDef`.
   * @param ctx the parse tree
   */
  enterParamDef?: (ctx: ParamDefContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.paramDef`.
   * @param ctx the parse tree
   */
  exitParamDef?: (ctx: ParamDefContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.typeGeneric`.
   * @param ctx the parse tree
   */
  enterTypeGeneric?: (ctx: TypeGenericContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.typeGeneric`.
   * @param ctx the parse tree
   */
  exitTypeGeneric?: (ctx: TypeGenericContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.typeFunc`.
   * @param ctx the parse tree
   */
  enterTypeFunc?: (ctx: TypeFuncContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.typeFunc`.
   * @param ctx the parse tree
   */
  exitTypeFunc?: (ctx: TypeFuncContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.typeTuple`.
   * @param ctx the parse tree
   */
  enterTypeTuple?: (ctx: TypeTupleContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.typeTuple`.
   * @param ctx the parse tree
   */
  exitTypeTuple?: (ctx: TypeTupleContext) => void;
  /**
   * Enter a parse tree produced by `RefLangParser.lambda`.
   * @param ctx the parse tree
   */
  enterLambda?: (ctx: LambdaContext) => void;
  /**
   * Exit a parse tree produced by `RefLangParser.lambda`.
   * @param ctx the parse tree
   */
  exitLambda?: (ctx: LambdaContext) => void;

  visitTerminal(node: TerminalNode): void {}
  visitErrorNode(node: ErrorNode): void {}
  enterEveryRule(node: ParserRuleContext): void {}
  exitEveryRule(node: ParserRuleContext): void {}
}
