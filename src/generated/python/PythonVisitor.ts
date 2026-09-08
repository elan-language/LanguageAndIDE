// Generated from src/grammars/python/Python.g4 by ANTLR 4.13.1

import { AbstractParseTreeVisitor } from "antlr4ng";


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
     * Visit a parse tree produced by `PythonParser.function`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitFunction?: (ctx: FunctionContext) => Result;
    /**
     * Visit a parse tree produced by `PythonParser.test`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTest?: (ctx: TestContext) => Result;
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
     * Visit a parse tree produced by `PythonParser.abstractClass`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAbstractClass?: (ctx: AbstractClassContext) => Result;
    /**
     * Visit a parse tree produced by `PythonParser.commentGlobal`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCommentGlobal?: (ctx: CommentGlobalContext) => Result;
    /**
     * Visit a parse tree produced by `PythonParser.ordinaryStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitOrdinaryStatement?: (ctx: OrdinaryStatementContext) => Result;
    /**
     * Visit a parse tree produced by `PythonParser.print`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPrint?: (ctx: PrintContext) => Result;
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
     * Visit a parse tree produced by `PythonParser.inputStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitInputStatement?: (ctx: InputStatementContext) => Result;
    /**
     * Visit a parse tree produced by `PythonParser.ifStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitIfStatement?: (ctx: IfStatementContext) => Result;
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
     * Visit a parse tree produced by `PythonParser.throwStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitThrowStatement?: (ctx: ThrowStatementContext) => Result;
    /**
     * Visit a parse tree produced by `PythonParser.commentStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCommentStatement?: (ctx: CommentStatementContext) => Result;
    /**
     * Visit a parse tree produced by `PythonParser.assert`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAssert?: (ctx: AssertContext) => Result;
    /**
     * Visit a parse tree produced by `PythonParser.letStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLetStatement?: (ctx: LetStatementContext) => Result;
    /**
     * Visit a parse tree produced by `PythonParser.returnStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitReturnStatement?: (ctx: ReturnStatementContext) => Result;
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
     * Visit a parse tree produced by `PythonParser.catchStatement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCatchStatement?: (ctx: CatchStatementContext) => Result;
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
     * Visit a parse tree produced by `PythonParser.commentMember`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCommentMember?: (ctx: CommentMemberContext) => Result;
    /**
     * Visit a parse tree produced by `PythonParser.identifier`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitIdentifier?: (ctx: IdentifierContext) => Result;
    /**
     * Visit a parse tree produced by `PythonParser.assignable`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAssignable?: (ctx: AssignableContext) => Result;
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
     * Visit a parse tree produced by `PythonParser.typeName`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTypeName?: (ctx: TypeNameContext) => Result;
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
     * Visit a parse tree produced by `PythonParser.paramsList`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitParamsList?: (ctx: ParamsListContext) => Result;
    /**
     * Visit a parse tree produced by `PythonParser.type`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitType?: (ctx: TypeContext) => Result;
    /**
     * Visit a parse tree produced by `PythonParser.enumValuesList`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitEnumValuesList?: (ctx: EnumValuesListContext) => Result;
    /**
     * Visit a parse tree produced by `PythonParser.assertActual`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAssertActual?: (ctx: AssertActualContext) => Result;
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
     * Visit a parse tree produced by `PythonParser.litInt`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLitInt?: (ctx: LitIntContext) => Result;
    /**
     * Visit a parse tree produced by `PythonParser.litFloat`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLitFloat?: (ctx: LitFloatContext) => Result;
    /**
     * Visit a parse tree produced by `PythonParser.enumValue`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitEnumValue?: (ctx: EnumValueContext) => Result;
    /**
     * Visit a parse tree produced by `PythonParser.litString`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLitString?: (ctx: LitStringContext) => Result;
    /**
     * Visit a parse tree produced by `PythonParser.index`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitIndex?: (ctx: IndexContext) => Result;
    /**
     * Visit a parse tree produced by `PythonParser.identifierWithOptIndexes`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitIdentifierWithOptIndexes?: (ctx: IdentifierWithOptIndexesContext) => Result;
    /**
     * Visit a parse tree produced by `PythonParser.propertyRef`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPropertyRef?: (ctx: PropertyRefContext) => Result;
    /**
     * Visit a parse tree produced by `PythonParser.expression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitExpression?: (ctx: ExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `PythonParser.term`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTerm?: (ctx: TermContext) => Result;
    /**
     * Visit a parse tree produced by `PythonParser.chainHead`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitChainHead?: (ctx: ChainHeadContext) => Result;
    /**
     * Visit a parse tree produced by `PythonParser.chainable`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitChainable?: (ctx: ChainableContext) => Result;
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
     * Visit a parse tree produced by `PythonParser.binaryExpression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitBinaryExpression?: (ctx: BinaryExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `PythonParser.tuple`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTuple?: (ctx: TupleContext) => Result;
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
     * Visit a parse tree produced by `PythonParser.list`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitList?: (ctx: ListContext) => Result;
    /**
     * Visit a parse tree produced by `PythonParser.interpolatedString`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitInterpolatedString?: (ctx: InterpolatedStringContext) => Result;
    /**
     * Visit a parse tree produced by `PythonParser.power`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPower?: (ctx: PowerContext) => Result;
}

