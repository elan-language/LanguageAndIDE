// Generated from src/grammars/ref-lang/RefLang.g4 by ANTLR 4.13.1

import { ErrorNode, ParseTreeListener, ParserRuleContext, TerminalNode } from "antlr4ng";


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
import { LitIntContext } from "./RefLangParser.js";
import { LitFloatContext } from "./RefLangParser.js";
import { EnumValueContext } from "./RefLangParser.js";
import { LitStringContext } from "./RefLangParser.js";
import { ThisInstanceContext } from "./RefLangParser.js";
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
     * Enter a parse tree produced by `RefLangParser.commentGlobal`.
     * @param ctx the parse tree
     */
    enterCommentGlobal?: (ctx: CommentGlobalContext) => void;
    /**
     * Exit a parse tree produced by `RefLangParser.commentGlobal`.
     * @param ctx the parse tree
     */
    exitCommentGlobal?: (ctx: CommentGlobalContext) => void;
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
     * Enter a parse tree produced by `RefLangParser.letStatement`.
     * @param ctx the parse tree
     */
    enterLetStatement?: (ctx: LetStatementContext) => void;
    /**
     * Exit a parse tree produced by `RefLangParser.letStatement`.
     * @param ctx the parse tree
     */
    exitLetStatement?: (ctx: LetStatementContext) => void;
    /**
     * Enter a parse tree produced by `RefLangParser.print`.
     * @param ctx the parse tree
     */
    enterPrint?: (ctx: PrintContext) => void;
    /**
     * Exit a parse tree produced by `RefLangParser.print`.
     * @param ctx the parse tree
     */
    exitPrint?: (ctx: PrintContext) => void;
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
     * Enter a parse tree produced by `RefLangParser.inputStatement`.
     * @param ctx the parse tree
     */
    enterInputStatement?: (ctx: InputStatementContext) => void;
    /**
     * Exit a parse tree produced by `RefLangParser.inputStatement`.
     * @param ctx the parse tree
     */
    exitInputStatement?: (ctx: InputStatementContext) => void;
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
     * Enter a parse tree produced by `RefLangParser.commentStatement`.
     * @param ctx the parse tree
     */
    enterCommentStatement?: (ctx: CommentStatementContext) => void;
    /**
     * Exit a parse tree produced by `RefLangParser.commentStatement`.
     * @param ctx the parse tree
     */
    exitCommentStatement?: (ctx: CommentStatementContext) => void;
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
     * Enter a parse tree produced by `RefLangParser.commentMember`.
     * @param ctx the parse tree
     */
    enterCommentMember?: (ctx: CommentMemberContext) => void;
    /**
     * Exit a parse tree produced by `RefLangParser.commentMember`.
     * @param ctx the parse tree
     */
    exitCommentMember?: (ctx: CommentMemberContext) => void;
    /**
     * Enter a parse tree produced by `RefLangParser.identifier`.
     * @param ctx the parse tree
     */
    enterIdentifier?: (ctx: IdentifierContext) => void;
    /**
     * Exit a parse tree produced by `RefLangParser.identifier`.
     * @param ctx the parse tree
     */
    exitIdentifier?: (ctx: IdentifierContext) => void;
    /**
     * Enter a parse tree produced by `RefLangParser.assignable`.
     * @param ctx the parse tree
     */
    enterAssignable?: (ctx: AssignableContext) => void;
    /**
     * Exit a parse tree produced by `RefLangParser.assignable`.
     * @param ctx the parse tree
     */
    exitAssignable?: (ctx: AssignableContext) => void;
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
     * Enter a parse tree produced by `RefLangParser.typeName`.
     * @param ctx the parse tree
     */
    enterTypeName?: (ctx: TypeNameContext) => void;
    /**
     * Exit a parse tree produced by `RefLangParser.typeName`.
     * @param ctx the parse tree
     */
    exitTypeName?: (ctx: TypeNameContext) => void;
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
     * Enter a parse tree produced by `RefLangParser.paramsList`.
     * @param ctx the parse tree
     */
    enterParamsList?: (ctx: ParamsListContext) => void;
    /**
     * Exit a parse tree produced by `RefLangParser.paramsList`.
     * @param ctx the parse tree
     */
    exitParamsList?: (ctx: ParamsListContext) => void;
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
     * Enter a parse tree produced by `RefLangParser.enumValuesList`.
     * @param ctx the parse tree
     */
    enterEnumValuesList?: (ctx: EnumValuesListContext) => void;
    /**
     * Exit a parse tree produced by `RefLangParser.enumValuesList`.
     * @param ctx the parse tree
     */
    exitEnumValuesList?: (ctx: EnumValuesListContext) => void;
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
     * Enter a parse tree produced by `RefLangParser.litInt`.
     * @param ctx the parse tree
     */
    enterLitInt?: (ctx: LitIntContext) => void;
    /**
     * Exit a parse tree produced by `RefLangParser.litInt`.
     * @param ctx the parse tree
     */
    exitLitInt?: (ctx: LitIntContext) => void;
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
     * Enter a parse tree produced by `RefLangParser.propertyRef`.
     * @param ctx the parse tree
     */
    enterPropertyRef?: (ctx: PropertyRefContext) => void;
    /**
     * Exit a parse tree produced by `RefLangParser.propertyRef`.
     * @param ctx the parse tree
     */
    exitPropertyRef?: (ctx: PropertyRefContext) => void;
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
     * Enter a parse tree produced by `RefLangParser.chainHead`.
     * @param ctx the parse tree
     */
    enterChainHead?: (ctx: ChainHeadContext) => void;
    /**
     * Exit a parse tree produced by `RefLangParser.chainHead`.
     * @param ctx the parse tree
     */
    exitChainHead?: (ctx: ChainHeadContext) => void;
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
     * Enter a parse tree produced by `RefLangParser.power`.
     * @param ctx the parse tree
     */
    enterPower?: (ctx: PowerContext) => void;
    /**
     * Exit a parse tree produced by `RefLangParser.power`.
     * @param ctx the parse tree
     */
    exitPower?: (ctx: PowerContext) => void;

    visitTerminal(node: TerminalNode): void {}
    visitErrorNode(node: ErrorNode): void {}
    enterEveryRule(node: ParserRuleContext): void {}
    exitEveryRule(node: ParserRuleContext): void {}
}

