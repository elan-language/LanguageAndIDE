// Generated from src/grammars/python/Python.g4 by ANTLR 4.13.1

import { ErrorNode, ParseTreeListener, ParserRuleContext, TerminalNode } from "antlr4ng";

import { FileContext } from "./PythonParser.js";
import { GlobalContext } from "./PythonParser.js";
import { MainContext } from "./PythonParser.js";
import { FunctionContext } from "./PythonParser.js";
import { TestContext } from "./PythonParser.js";
import { ProcedureContext } from "./PythonParser.js";
import { ConstantContext } from "./PythonParser.js";
import { EnumContext } from "./PythonParser.js";
import { ConcreteClassContext } from "./PythonParser.js";
import { AbstractClassContext } from "./PythonParser.js";
import { CommentGlobalContext } from "./PythonParser.js";
import { OrdinaryStatementContext } from "./PythonParser.js";
import { PrintContext } from "./PythonParser.js";
import { VariableDefinitionContext } from "./PythonParser.js";
import { AssignmentContext } from "./PythonParser.js";
import { InputStatementContext } from "./PythonParser.js";
import { IfStatementContext } from "./PythonParser.js";
import { WhileLoopContext } from "./PythonParser.js";
import { ForLoopContext } from "./PythonParser.js";
import { ProcedureCallContext } from "./PythonParser.js";
import { TryStatementContext } from "./PythonParser.js";
import { ThrowStatementContext } from "./PythonParser.js";
import { CommentStatementContext } from "./PythonParser.js";
import { AssertContext } from "./PythonParser.js";
import { LetStatementContext } from "./PythonParser.js";
import { ReturnStatementContext } from "./PythonParser.js";
import { ElseIfClauseContext } from "./PythonParser.js";
import { ElseClauseContext } from "./PythonParser.js";
import { CatchStatementContext } from "./PythonParser.js";
import { ConstructorMemberContext } from "./PythonParser.js";
import { PropertyContext } from "./PythonParser.js";
import { FunctionMethodContext } from "./PythonParser.js";
import { ProcedureMethodContext } from "./PythonParser.js";
import { AbstractFunctionContext } from "./PythonParser.js";
import { AbstractProcedureContext } from "./PythonParser.js";
import { CommentMemberContext } from "./PythonParser.js";
import { IdentifierContext } from "./PythonParser.js";
import { AssignableContext } from "./PythonParser.js";
import { MethodNameContext } from "./PythonParser.js";
import { TestNameContext } from "./PythonParser.js";
import { TypeNameContext } from "./PythonParser.js";
import { ConstantValueContext } from "./PythonParser.js";
import { ArgListContext } from "./PythonParser.js";
import { ArgumentContext } from "./PythonParser.js";
import { ParamsListContext } from "./PythonParser.js";
import { TypeContext } from "./PythonParser.js";
import { EnumValuesListContext } from "./PythonParser.js";
import { AssertActualContext } from "./PythonParser.js";
import { LitValueContext } from "./PythonParser.js";
import { LitBooleanContext } from "./PythonParser.js";
import { LitIntContext } from "./PythonParser.js";
import { LitFloatContext } from "./PythonParser.js";
import { EnumValueContext } from "./PythonParser.js";
import { LitStringContext } from "./PythonParser.js";
import { IndexContext } from "./PythonParser.js";
import { IdentifierWithOptIndexesContext } from "./PythonParser.js";
import { PropertyRefContext } from "./PythonParser.js";
import { ExpressionContext } from "./PythonParser.js";
import { TermContext } from "./PythonParser.js";
import { ChainHeadContext } from "./PythonParser.js";
import { ChainableContext } from "./PythonParser.js";
import { BracketedExpressionContext } from "./PythonParser.js";
import { UnaryExpressionContext } from "./PythonParser.js";
import { BinaryExpressionContext } from "./PythonParser.js";
import { TupleContext } from "./PythonParser.js";
import { MethodCallContext } from "./PythonParser.js";
import { BinaryOperatorContext } from "./PythonParser.js";
import { NewInstanceContext } from "./PythonParser.js";
import { ParamDefContext } from "./PythonParser.js";
import { TypeGenericContext } from "./PythonParser.js";
import { TypeFuncContext } from "./PythonParser.js";
import { TypeTupleContext } from "./PythonParser.js";
import { LambdaContext } from "./PythonParser.js";
import { ListContext } from "./PythonParser.js";
import { InterpolatedStringContext } from "./PythonParser.js";
import { PowerContext } from "./PythonParser.js";

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
   * Enter a parse tree produced by `PythonParser.commentGlobal`.
   * @param ctx the parse tree
   */
  enterCommentGlobal?: (ctx: CommentGlobalContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.commentGlobal`.
   * @param ctx the parse tree
   */
  exitCommentGlobal?: (ctx: CommentGlobalContext) => void;
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
   * Enter a parse tree produced by `PythonParser.print`.
   * @param ctx the parse tree
   */
  enterPrint?: (ctx: PrintContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.print`.
   * @param ctx the parse tree
   */
  exitPrint?: (ctx: PrintContext) => void;
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
   * Enter a parse tree produced by `PythonParser.inputStatement`.
   * @param ctx the parse tree
   */
  enterInputStatement?: (ctx: InputStatementContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.inputStatement`.
   * @param ctx the parse tree
   */
  exitInputStatement?: (ctx: InputStatementContext) => void;
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
   * Enter a parse tree produced by `PythonParser.commentStatement`.
   * @param ctx the parse tree
   */
  enterCommentStatement?: (ctx: CommentStatementContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.commentStatement`.
   * @param ctx the parse tree
   */
  exitCommentStatement?: (ctx: CommentStatementContext) => void;
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
   * Enter a parse tree produced by `PythonParser.letStatement`.
   * @param ctx the parse tree
   */
  enterLetStatement?: (ctx: LetStatementContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.letStatement`.
   * @param ctx the parse tree
   */
  exitLetStatement?: (ctx: LetStatementContext) => void;
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
   * Enter a parse tree produced by `PythonParser.commentMember`.
   * @param ctx the parse tree
   */
  enterCommentMember?: (ctx: CommentMemberContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.commentMember`.
   * @param ctx the parse tree
   */
  exitCommentMember?: (ctx: CommentMemberContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.identifier`.
   * @param ctx the parse tree
   */
  enterIdentifier?: (ctx: IdentifierContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.identifier`.
   * @param ctx the parse tree
   */
  exitIdentifier?: (ctx: IdentifierContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.assignable`.
   * @param ctx the parse tree
   */
  enterAssignable?: (ctx: AssignableContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.assignable`.
   * @param ctx the parse tree
   */
  exitAssignable?: (ctx: AssignableContext) => void;
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
   * Enter a parse tree produced by `PythonParser.typeName`.
   * @param ctx the parse tree
   */
  enterTypeName?: (ctx: TypeNameContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.typeName`.
   * @param ctx the parse tree
   */
  exitTypeName?: (ctx: TypeNameContext) => void;
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
   * Enter a parse tree produced by `PythonParser.paramsList`.
   * @param ctx the parse tree
   */
  enterParamsList?: (ctx: ParamsListContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.paramsList`.
   * @param ctx the parse tree
   */
  exitParamsList?: (ctx: ParamsListContext) => void;
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
   * Enter a parse tree produced by `PythonParser.enumValuesList`.
   * @param ctx the parse tree
   */
  enterEnumValuesList?: (ctx: EnumValuesListContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.enumValuesList`.
   * @param ctx the parse tree
   */
  exitEnumValuesList?: (ctx: EnumValuesListContext) => void;
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
   * Enter a parse tree produced by `PythonParser.litInt`.
   * @param ctx the parse tree
   */
  enterLitInt?: (ctx: LitIntContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.litInt`.
   * @param ctx the parse tree
   */
  exitLitInt?: (ctx: LitIntContext) => void;
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
   * Enter a parse tree produced by `PythonParser.identifierWithOptIndexes`.
   * @param ctx the parse tree
   */
  enterIdentifierWithOptIndexes?: (ctx: IdentifierWithOptIndexesContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.identifierWithOptIndexes`.
   * @param ctx the parse tree
   */
  exitIdentifierWithOptIndexes?: (ctx: IdentifierWithOptIndexesContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.propertyRef`.
   * @param ctx the parse tree
   */
  enterPropertyRef?: (ctx: PropertyRefContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.propertyRef`.
   * @param ctx the parse tree
   */
  exitPropertyRef?: (ctx: PropertyRefContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.expression`.
   * @param ctx the parse tree
   */
  enterExpression?: (ctx: ExpressionContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.expression`.
   * @param ctx the parse tree
   */
  exitExpression?: (ctx: ExpressionContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.term`.
   * @param ctx the parse tree
   */
  enterTerm?: (ctx: TermContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.term`.
   * @param ctx the parse tree
   */
  exitTerm?: (ctx: TermContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.chainHead`.
   * @param ctx the parse tree
   */
  enterChainHead?: (ctx: ChainHeadContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.chainHead`.
   * @param ctx the parse tree
   */
  exitChainHead?: (ctx: ChainHeadContext) => void;
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
   * Enter a parse tree produced by `PythonParser.interpolatedString`.
   * @param ctx the parse tree
   */
  enterInterpolatedString?: (ctx: InterpolatedStringContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.interpolatedString`.
   * @param ctx the parse tree
   */
  exitInterpolatedString?: (ctx: InterpolatedStringContext) => void;
  /**
   * Enter a parse tree produced by `PythonParser.power`.
   * @param ctx the parse tree
   */
  enterPower?: (ctx: PowerContext) => void;
  /**
   * Exit a parse tree produced by `PythonParser.power`.
   * @param ctx the parse tree
   */
  exitPower?: (ctx: PowerContext) => void;

  visitTerminal(node: TerminalNode): void {}
  visitErrorNode(node: ErrorNode): void {}
  enterEveryRule(node: ParserRuleContext): void {}
  exitEveryRule(node: ParserRuleContext): void {}
}
