// Generated from c:/elan-language/LanguageAndIDE/src/grammars/python/Python.g4 by ANTLR 4.13.1
import org.antlr.v4.runtime.tree.ParseTreeListener;

/**
 * This interface defines a complete listener for a parse tree produced by
 * {@link PythonParser}.
 */
public interface PythonListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by {@link PythonParser#file}.
	 * @param ctx the parse tree
	 */
	void enterFile(PythonParser.FileContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#file}.
	 * @param ctx the parse tree
	 */
	void exitFile(PythonParser.FileContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#global}.
	 * @param ctx the parse tree
	 */
	void enterGlobal(PythonParser.GlobalContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#global}.
	 * @param ctx the parse tree
	 */
	void exitGlobal(PythonParser.GlobalContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#main}.
	 * @param ctx the parse tree
	 */
	void enterMain(PythonParser.MainContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#main}.
	 * @param ctx the parse tree
	 */
	void exitMain(PythonParser.MainContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#mainCall}.
	 * @param ctx the parse tree
	 */
	void enterMainCall(PythonParser.MainCallContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#mainCall}.
	 * @param ctx the parse tree
	 */
	void exitMainCall(PythonParser.MainCallContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#function}.
	 * @param ctx the parse tree
	 */
	void enterFunction(PythonParser.FunctionContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#function}.
	 * @param ctx the parse tree
	 */
	void exitFunction(PythonParser.FunctionContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#test}.
	 * @param ctx the parse tree
	 */
	void enterTest(PythonParser.TestContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#test}.
	 * @param ctx the parse tree
	 */
	void exitTest(PythonParser.TestContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#testStatement}.
	 * @param ctx the parse tree
	 */
	void enterTestStatement(PythonParser.TestStatementContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#testStatement}.
	 * @param ctx the parse tree
	 */
	void exitTestStatement(PythonParser.TestStatementContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#procedure}.
	 * @param ctx the parse tree
	 */
	void enterProcedure(PythonParser.ProcedureContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#procedure}.
	 * @param ctx the parse tree
	 */
	void exitProcedure(PythonParser.ProcedureContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#constant}.
	 * @param ctx the parse tree
	 */
	void enterConstant(PythonParser.ConstantContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#constant}.
	 * @param ctx the parse tree
	 */
	void exitConstant(PythonParser.ConstantContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#enum}.
	 * @param ctx the parse tree
	 */
	void enterEnum(PythonParser.EnumContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#enum}.
	 * @param ctx the parse tree
	 */
	void exitEnum(PythonParser.EnumContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#concreteClass}.
	 * @param ctx the parse tree
	 */
	void enterConcreteClass(PythonParser.ConcreteClassContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#concreteClass}.
	 * @param ctx the parse tree
	 */
	void exitConcreteClass(PythonParser.ConcreteClassContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#concreteClassMember}.
	 * @param ctx the parse tree
	 */
	void enterConcreteClassMember(PythonParser.ConcreteClassMemberContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#concreteClassMember}.
	 * @param ctx the parse tree
	 */
	void exitConcreteClassMember(PythonParser.ConcreteClassMemberContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#abstractClass}.
	 * @param ctx the parse tree
	 */
	void enterAbstractClass(PythonParser.AbstractClassContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#abstractClass}.
	 * @param ctx the parse tree
	 */
	void exitAbstractClass(PythonParser.AbstractClassContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#abstractClassMember}.
	 * @param ctx the parse tree
	 */
	void enterAbstractClassMember(PythonParser.AbstractClassMemberContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#abstractClassMember}.
	 * @param ctx the parse tree
	 */
	void exitAbstractClassMember(PythonParser.AbstractClassMemberContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#comment}.
	 * @param ctx the parse tree
	 */
	void enterComment(PythonParser.CommentContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#comment}.
	 * @param ctx the parse tree
	 */
	void exitComment(PythonParser.CommentContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#commentText}.
	 * @param ctx the parse tree
	 */
	void enterCommentText(PythonParser.CommentTextContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#commentText}.
	 * @param ctx the parse tree
	 */
	void exitCommentText(PythonParser.CommentTextContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#ordinaryStatement}.
	 * @param ctx the parse tree
	 */
	void enterOrdinaryStatement(PythonParser.OrdinaryStatementContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#ordinaryStatement}.
	 * @param ctx the parse tree
	 */
	void exitOrdinaryStatement(PythonParser.OrdinaryStatementContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#variableDefinition}.
	 * @param ctx the parse tree
	 */
	void enterVariableDefinition(PythonParser.VariableDefinitionContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#variableDefinition}.
	 * @param ctx the parse tree
	 */
	void exitVariableDefinition(PythonParser.VariableDefinitionContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#assignment}.
	 * @param ctx the parse tree
	 */
	void enterAssignment(PythonParser.AssignmentContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#assignment}.
	 * @param ctx the parse tree
	 */
	void exitAssignment(PythonParser.AssignmentContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#ifStatement}.
	 * @param ctx the parse tree
	 */
	void enterIfStatement(PythonParser.IfStatementContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#ifStatement}.
	 * @param ctx the parse tree
	 */
	void exitIfStatement(PythonParser.IfStatementContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#thenClause}.
	 * @param ctx the parse tree
	 */
	void enterThenClause(PythonParser.ThenClauseContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#thenClause}.
	 * @param ctx the parse tree
	 */
	void exitThenClause(PythonParser.ThenClauseContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#elseIfClause}.
	 * @param ctx the parse tree
	 */
	void enterElseIfClause(PythonParser.ElseIfClauseContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#elseIfClause}.
	 * @param ctx the parse tree
	 */
	void exitElseIfClause(PythonParser.ElseIfClauseContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#elseClause}.
	 * @param ctx the parse tree
	 */
	void enterElseClause(PythonParser.ElseClauseContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#elseClause}.
	 * @param ctx the parse tree
	 */
	void exitElseClause(PythonParser.ElseClauseContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#whileLoop}.
	 * @param ctx the parse tree
	 */
	void enterWhileLoop(PythonParser.WhileLoopContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#whileLoop}.
	 * @param ctx the parse tree
	 */
	void exitWhileLoop(PythonParser.WhileLoopContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#forLoop}.
	 * @param ctx the parse tree
	 */
	void enterForLoop(PythonParser.ForLoopContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#forLoop}.
	 * @param ctx the parse tree
	 */
	void exitForLoop(PythonParser.ForLoopContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#procedureCall}.
	 * @param ctx the parse tree
	 */
	void enterProcedureCall(PythonParser.ProcedureCallContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#procedureCall}.
	 * @param ctx the parse tree
	 */
	void exitProcedureCall(PythonParser.ProcedureCallContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#tryStatement}.
	 * @param ctx the parse tree
	 */
	void enterTryStatement(PythonParser.TryStatementContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#tryStatement}.
	 * @param ctx the parse tree
	 */
	void exitTryStatement(PythonParser.TryStatementContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#tryClause}.
	 * @param ctx the parse tree
	 */
	void enterTryClause(PythonParser.TryClauseContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#tryClause}.
	 * @param ctx the parse tree
	 */
	void exitTryClause(PythonParser.TryClauseContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#catchClause}.
	 * @param ctx the parse tree
	 */
	void enterCatchClause(PythonParser.CatchClauseContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#catchClause}.
	 * @param ctx the parse tree
	 */
	void exitCatchClause(PythonParser.CatchClauseContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#throwStatement}.
	 * @param ctx the parse tree
	 */
	void enterThrowStatement(PythonParser.ThrowStatementContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#throwStatement}.
	 * @param ctx the parse tree
	 */
	void exitThrowStatement(PythonParser.ThrowStatementContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#errorMessage}.
	 * @param ctx the parse tree
	 */
	void enterErrorMessage(PythonParser.ErrorMessageContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#errorMessage}.
	 * @param ctx the parse tree
	 */
	void exitErrorMessage(PythonParser.ErrorMessageContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#assert}.
	 * @param ctx the parse tree
	 */
	void enterAssert(PythonParser.AssertContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#assert}.
	 * @param ctx the parse tree
	 */
	void exitAssert(PythonParser.AssertContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#returnStatement}.
	 * @param ctx the parse tree
	 */
	void enterReturnStatement(PythonParser.ReturnStatementContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#returnStatement}.
	 * @param ctx the parse tree
	 */
	void exitReturnStatement(PythonParser.ReturnStatementContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#catchStatement}.
	 * @param ctx the parse tree
	 */
	void enterCatchStatement(PythonParser.CatchStatementContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#catchStatement}.
	 * @param ctx the parse tree
	 */
	void exitCatchStatement(PythonParser.CatchStatementContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#constructorMember}.
	 * @param ctx the parse tree
	 */
	void enterConstructorMember(PythonParser.ConstructorMemberContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#constructorMember}.
	 * @param ctx the parse tree
	 */
	void exitConstructorMember(PythonParser.ConstructorMemberContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#property}.
	 * @param ctx the parse tree
	 */
	void enterProperty(PythonParser.PropertyContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#property}.
	 * @param ctx the parse tree
	 */
	void exitProperty(PythonParser.PropertyContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#functionMethod}.
	 * @param ctx the parse tree
	 */
	void enterFunctionMethod(PythonParser.FunctionMethodContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#functionMethod}.
	 * @param ctx the parse tree
	 */
	void exitFunctionMethod(PythonParser.FunctionMethodContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#procedureMethod}.
	 * @param ctx the parse tree
	 */
	void enterProcedureMethod(PythonParser.ProcedureMethodContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#procedureMethod}.
	 * @param ctx the parse tree
	 */
	void exitProcedureMethod(PythonParser.ProcedureMethodContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#abstractFunction}.
	 * @param ctx the parse tree
	 */
	void enterAbstractFunction(PythonParser.AbstractFunctionContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#abstractFunction}.
	 * @param ctx the parse tree
	 */
	void exitAbstractFunction(PythonParser.AbstractFunctionContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#abstractProcedure}.
	 * @param ctx the parse tree
	 */
	void enterAbstractProcedure(PythonParser.AbstractProcedureContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#abstractProcedure}.
	 * @param ctx the parse tree
	 */
	void exitAbstractProcedure(PythonParser.AbstractProcedureContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#identifierDef}.
	 * @param ctx the parse tree
	 */
	void enterIdentifierDef(PythonParser.IdentifierDefContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#identifierDef}.
	 * @param ctx the parse tree
	 */
	void exitIdentifierDef(PythonParser.IdentifierDefContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#identifierUse}.
	 * @param ctx the parse tree
	 */
	void enterIdentifierUse(PythonParser.IdentifierUseContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#identifierUse}.
	 * @param ctx the parse tree
	 */
	void exitIdentifierUse(PythonParser.IdentifierUseContext ctx);
	/**
	 * Enter a parse tree produced by the {@code simpleAssignable}
	 * labeled alternative in {@link PythonParser#assignable}.
	 * @param ctx the parse tree
	 */
	void enterSimpleAssignable(PythonParser.SimpleAssignableContext ctx);
	/**
	 * Exit a parse tree produced by the {@code simpleAssignable}
	 * labeled alternative in {@link PythonParser#assignable}.
	 * @param ctx the parse tree
	 */
	void exitSimpleAssignable(PythonParser.SimpleAssignableContext ctx);
	/**
	 * Enter a parse tree produced by the {@code indexedAssignable}
	 * labeled alternative in {@link PythonParser#assignable}.
	 * @param ctx the parse tree
	 */
	void enterIndexedAssignable(PythonParser.IndexedAssignableContext ctx);
	/**
	 * Exit a parse tree produced by the {@code indexedAssignable}
	 * labeled alternative in {@link PythonParser#assignable}.
	 * @param ctx the parse tree
	 */
	void exitIndexedAssignable(PythonParser.IndexedAssignableContext ctx);
	/**
	 * Enter a parse tree produced by the {@code thisAssignable}
	 * labeled alternative in {@link PythonParser#assignable}.
	 * @param ctx the parse tree
	 */
	void enterThisAssignable(PythonParser.ThisAssignableContext ctx);
	/**
	 * Exit a parse tree produced by the {@code thisAssignable}
	 * labeled alternative in {@link PythonParser#assignable}.
	 * @param ctx the parse tree
	 */
	void exitThisAssignable(PythonParser.ThisAssignableContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#methodName}.
	 * @param ctx the parse tree
	 */
	void enterMethodName(PythonParser.MethodNameContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#methodName}.
	 * @param ctx the parse tree
	 */
	void exitMethodName(PythonParser.MethodNameContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#testName}.
	 * @param ctx the parse tree
	 */
	void enterTestName(PythonParser.TestNameContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#testName}.
	 * @param ctx the parse tree
	 */
	void exitTestName(PythonParser.TestNameContext ctx);
	/**
	 * Enter a parse tree produced by the {@code intTypeName}
	 * labeled alternative in {@link PythonParser#typeName}.
	 * @param ctx the parse tree
	 */
	void enterIntTypeName(PythonParser.IntTypeNameContext ctx);
	/**
	 * Exit a parse tree produced by the {@code intTypeName}
	 * labeled alternative in {@link PythonParser#typeName}.
	 * @param ctx the parse tree
	 */
	void exitIntTypeName(PythonParser.IntTypeNameContext ctx);
	/**
	 * Enter a parse tree produced by the {@code floatTypeName}
	 * labeled alternative in {@link PythonParser#typeName}.
	 * @param ctx the parse tree
	 */
	void enterFloatTypeName(PythonParser.FloatTypeNameContext ctx);
	/**
	 * Exit a parse tree produced by the {@code floatTypeName}
	 * labeled alternative in {@link PythonParser#typeName}.
	 * @param ctx the parse tree
	 */
	void exitFloatTypeName(PythonParser.FloatTypeNameContext ctx);
	/**
	 * Enter a parse tree produced by the {@code boolTypeName}
	 * labeled alternative in {@link PythonParser#typeName}.
	 * @param ctx the parse tree
	 */
	void enterBoolTypeName(PythonParser.BoolTypeNameContext ctx);
	/**
	 * Exit a parse tree produced by the {@code boolTypeName}
	 * labeled alternative in {@link PythonParser#typeName}.
	 * @param ctx the parse tree
	 */
	void exitBoolTypeName(PythonParser.BoolTypeNameContext ctx);
	/**
	 * Enter a parse tree produced by the {@code stringTypeName}
	 * labeled alternative in {@link PythonParser#typeName}.
	 * @param ctx the parse tree
	 */
	void enterStringTypeName(PythonParser.StringTypeNameContext ctx);
	/**
	 * Exit a parse tree produced by the {@code stringTypeName}
	 * labeled alternative in {@link PythonParser#typeName}.
	 * @param ctx the parse tree
	 */
	void exitStringTypeName(PythonParser.StringTypeNameContext ctx);
	/**
	 * Enter a parse tree produced by the {@code listTypeName}
	 * labeled alternative in {@link PythonParser#typeName}.
	 * @param ctx the parse tree
	 */
	void enterListTypeName(PythonParser.ListTypeNameContext ctx);
	/**
	 * Exit a parse tree produced by the {@code listTypeName}
	 * labeled alternative in {@link PythonParser#typeName}.
	 * @param ctx the parse tree
	 */
	void exitListTypeName(PythonParser.ListTypeNameContext ctx);
	/**
	 * Enter a parse tree produced by the {@code udtTypeName}
	 * labeled alternative in {@link PythonParser#typeName}.
	 * @param ctx the parse tree
	 */
	void enterUdtTypeName(PythonParser.UdtTypeNameContext ctx);
	/**
	 * Exit a parse tree produced by the {@code udtTypeName}
	 * labeled alternative in {@link PythonParser#typeName}.
	 * @param ctx the parse tree
	 */
	void exitUdtTypeName(PythonParser.UdtTypeNameContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#constantValue}.
	 * @param ctx the parse tree
	 */
	void enterConstantValue(PythonParser.ConstantValueContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#constantValue}.
	 * @param ctx the parse tree
	 */
	void exitConstantValue(PythonParser.ConstantValueContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#argList}.
	 * @param ctx the parse tree
	 */
	void enterArgList(PythonParser.ArgListContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#argList}.
	 * @param ctx the parse tree
	 */
	void exitArgList(PythonParser.ArgListContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#argument}.
	 * @param ctx the parse tree
	 */
	void enterArgument(PythonParser.ArgumentContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#argument}.
	 * @param ctx the parse tree
	 */
	void exitArgument(PythonParser.ArgumentContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#paramList}.
	 * @param ctx the parse tree
	 */
	void enterParamList(PythonParser.ParamListContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#paramList}.
	 * @param ctx the parse tree
	 */
	void exitParamList(PythonParser.ParamListContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#identifierList}.
	 * @param ctx the parse tree
	 */
	void enterIdentifierList(PythonParser.IdentifierListContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#identifierList}.
	 * @param ctx the parse tree
	 */
	void exitIdentifierList(PythonParser.IdentifierListContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#expressionList}.
	 * @param ctx the parse tree
	 */
	void enterExpressionList(PythonParser.ExpressionListContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#expressionList}.
	 * @param ctx the parse tree
	 */
	void exitExpressionList(PythonParser.ExpressionListContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#enumDefValue}.
	 * @param ctx the parse tree
	 */
	void enterEnumDefValue(PythonParser.EnumDefValueContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#enumDefValue}.
	 * @param ctx the parse tree
	 */
	void exitEnumDefValue(PythonParser.EnumDefValueContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#enumList}.
	 * @param ctx the parse tree
	 */
	void enterEnumList(PythonParser.EnumListContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#enumList}.
	 * @param ctx the parse tree
	 */
	void exitEnumList(PythonParser.EnumListContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#type}.
	 * @param ctx the parse tree
	 */
	void enterType(PythonParser.TypeContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#type}.
	 * @param ctx the parse tree
	 */
	void exitType(PythonParser.TypeContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#assertActual}.
	 * @param ctx the parse tree
	 */
	void enterAssertActual(PythonParser.AssertActualContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#assertActual}.
	 * @param ctx the parse tree
	 */
	void exitAssertActual(PythonParser.AssertActualContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#assertExpected}.
	 * @param ctx the parse tree
	 */
	void enterAssertExpected(PythonParser.AssertExpectedContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#assertExpected}.
	 * @param ctx the parse tree
	 */
	void exitAssertExpected(PythonParser.AssertExpectedContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#litValue}.
	 * @param ctx the parse tree
	 */
	void enterLitValue(PythonParser.LitValueContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#litValue}.
	 * @param ctx the parse tree
	 */
	void exitLitValue(PythonParser.LitValueContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#litBoolean}.
	 * @param ctx the parse tree
	 */
	void enterLitBoolean(PythonParser.LitBooleanContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#litBoolean}.
	 * @param ctx the parse tree
	 */
	void exitLitBoolean(PythonParser.LitBooleanContext ctx);
	/**
	 * Enter a parse tree produced by the {@code litInteger}
	 * labeled alternative in {@link PythonParser#litInt}.
	 * @param ctx the parse tree
	 */
	void enterLitInteger(PythonParser.LitIntegerContext ctx);
	/**
	 * Exit a parse tree produced by the {@code litInteger}
	 * labeled alternative in {@link PythonParser#litInt}.
	 * @param ctx the parse tree
	 */
	void exitLitInteger(PythonParser.LitIntegerContext ctx);
	/**
	 * Enter a parse tree produced by the {@code litBinary}
	 * labeled alternative in {@link PythonParser#litInt}.
	 * @param ctx the parse tree
	 */
	void enterLitBinary(PythonParser.LitBinaryContext ctx);
	/**
	 * Exit a parse tree produced by the {@code litBinary}
	 * labeled alternative in {@link PythonParser#litInt}.
	 * @param ctx the parse tree
	 */
	void exitLitBinary(PythonParser.LitBinaryContext ctx);
	/**
	 * Enter a parse tree produced by the {@code litHex}
	 * labeled alternative in {@link PythonParser#litInt}.
	 * @param ctx the parse tree
	 */
	void enterLitHex(PythonParser.LitHexContext ctx);
	/**
	 * Exit a parse tree produced by the {@code litHex}
	 * labeled alternative in {@link PythonParser#litInt}.
	 * @param ctx the parse tree
	 */
	void exitLitHex(PythonParser.LitHexContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#litFloat}.
	 * @param ctx the parse tree
	 */
	void enterLitFloat(PythonParser.LitFloatContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#litFloat}.
	 * @param ctx the parse tree
	 */
	void exitLitFloat(PythonParser.LitFloatContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#litString}.
	 * @param ctx the parse tree
	 */
	void enterLitString(PythonParser.LitStringContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#litString}.
	 * @param ctx the parse tree
	 */
	void exitLitString(PythonParser.LitStringContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#enumValue}.
	 * @param ctx the parse tree
	 */
	void enterEnumValue(PythonParser.EnumValueContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#enumValue}.
	 * @param ctx the parse tree
	 */
	void exitEnumValue(PythonParser.EnumValueContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#index}.
	 * @param ctx the parse tree
	 */
	void enterIndex(PythonParser.IndexContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#index}.
	 * @param ctx the parse tree
	 */
	void exitIndex(PythonParser.IndexContext ctx);
	/**
	 * Enter a parse tree produced by the {@code unaryExpressionLabel}
	 * labeled alternative in {@link PythonParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterUnaryExpressionLabel(PythonParser.UnaryExpressionLabelContext ctx);
	/**
	 * Exit a parse tree produced by the {@code unaryExpressionLabel}
	 * labeled alternative in {@link PythonParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitUnaryExpressionLabel(PythonParser.UnaryExpressionLabelContext ctx);
	/**
	 * Enter a parse tree produced by the {@code binaryExpressionLabel}
	 * labeled alternative in {@link PythonParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterBinaryExpressionLabel(PythonParser.BinaryExpressionLabelContext ctx);
	/**
	 * Exit a parse tree produced by the {@code binaryExpressionLabel}
	 * labeled alternative in {@link PythonParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitBinaryExpressionLabel(PythonParser.BinaryExpressionLabelContext ctx);
	/**
	 * Enter a parse tree produced by the {@code newInstanceExpression}
	 * labeled alternative in {@link PythonParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterNewInstanceExpression(PythonParser.NewInstanceExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code newInstanceExpression}
	 * labeled alternative in {@link PythonParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitNewInstanceExpression(PythonParser.NewInstanceExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code ifExpression}
	 * labeled alternative in {@link PythonParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterIfExpression(PythonParser.IfExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code ifExpression}
	 * labeled alternative in {@link PythonParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitIfExpression(PythonParser.IfExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code termExpression}
	 * labeled alternative in {@link PythonParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterTermExpression(PythonParser.TermExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code termExpression}
	 * labeled alternative in {@link PythonParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitTermExpression(PythonParser.TermExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code identifierUseTerm}
	 * labeled alternative in {@link PythonParser#term}.
	 * @param ctx the parse tree
	 */
	void enterIdentifierUseTerm(PythonParser.IdentifierUseTermContext ctx);
	/**
	 * Exit a parse tree produced by the {@code identifierUseTerm}
	 * labeled alternative in {@link PythonParser#term}.
	 * @param ctx the parse tree
	 */
	void exitIdentifierUseTerm(PythonParser.IdentifierUseTermContext ctx);
	/**
	 * Enter a parse tree produced by the {@code methodCallTerm}
	 * labeled alternative in {@link PythonParser#term}.
	 * @param ctx the parse tree
	 */
	void enterMethodCallTerm(PythonParser.MethodCallTermContext ctx);
	/**
	 * Exit a parse tree produced by the {@code methodCallTerm}
	 * labeled alternative in {@link PythonParser#term}.
	 * @param ctx the parse tree
	 */
	void exitMethodCallTerm(PythonParser.MethodCallTermContext ctx);
	/**
	 * Enter a parse tree produced by the {@code indexedTerm}
	 * labeled alternative in {@link PythonParser#term}.
	 * @param ctx the parse tree
	 */
	void enterIndexedTerm(PythonParser.IndexedTermContext ctx);
	/**
	 * Exit a parse tree produced by the {@code indexedTerm}
	 * labeled alternative in {@link PythonParser#term}.
	 * @param ctx the parse tree
	 */
	void exitIndexedTerm(PythonParser.IndexedTermContext ctx);
	/**
	 * Enter a parse tree produced by the {@code litValueTerm}
	 * labeled alternative in {@link PythonParser#term}.
	 * @param ctx the parse tree
	 */
	void enterLitValueTerm(PythonParser.LitValueTermContext ctx);
	/**
	 * Exit a parse tree produced by the {@code litValueTerm}
	 * labeled alternative in {@link PythonParser#term}.
	 * @param ctx the parse tree
	 */
	void exitLitValueTerm(PythonParser.LitValueTermContext ctx);
	/**
	 * Enter a parse tree produced by the {@code dictionaryTerm}
	 * labeled alternative in {@link PythonParser#term}.
	 * @param ctx the parse tree
	 */
	void enterDictionaryTerm(PythonParser.DictionaryTermContext ctx);
	/**
	 * Exit a parse tree produced by the {@code dictionaryTerm}
	 * labeled alternative in {@link PythonParser#term}.
	 * @param ctx the parse tree
	 */
	void exitDictionaryTerm(PythonParser.DictionaryTermContext ctx);
	/**
	 * Enter a parse tree produced by the {@code bracketedExpressionTerm}
	 * labeled alternative in {@link PythonParser#term}.
	 * @param ctx the parse tree
	 */
	void enterBracketedExpressionTerm(PythonParser.BracketedExpressionTermContext ctx);
	/**
	 * Exit a parse tree produced by the {@code bracketedExpressionTerm}
	 * labeled alternative in {@link PythonParser#term}.
	 * @param ctx the parse tree
	 */
	void exitBracketedExpressionTerm(PythonParser.BracketedExpressionTermContext ctx);
	/**
	 * Enter a parse tree produced by the {@code chainableTerm}
	 * labeled alternative in {@link PythonParser#term}.
	 * @param ctx the parse tree
	 */
	void enterChainableTerm(PythonParser.ChainableTermContext ctx);
	/**
	 * Exit a parse tree produced by the {@code chainableTerm}
	 * labeled alternative in {@link PythonParser#term}.
	 * @param ctx the parse tree
	 */
	void exitChainableTerm(PythonParser.ChainableTermContext ctx);
	/**
	 * Enter a parse tree produced by the {@code tupleTerm}
	 * labeled alternative in {@link PythonParser#term}.
	 * @param ctx the parse tree
	 */
	void enterTupleTerm(PythonParser.TupleTermContext ctx);
	/**
	 * Exit a parse tree produced by the {@code tupleTerm}
	 * labeled alternative in {@link PythonParser#term}.
	 * @param ctx the parse tree
	 */
	void exitTupleTerm(PythonParser.TupleTermContext ctx);
	/**
	 * Enter a parse tree produced by the {@code thisInstanceTerm}
	 * labeled alternative in {@link PythonParser#term}.
	 * @param ctx the parse tree
	 */
	void enterThisInstanceTerm(PythonParser.ThisInstanceTermContext ctx);
	/**
	 * Exit a parse tree produced by the {@code thisInstanceTerm}
	 * labeled alternative in {@link PythonParser#term}.
	 * @param ctx the parse tree
	 */
	void exitThisInstanceTerm(PythonParser.ThisInstanceTermContext ctx);
	/**
	 * Enter a parse tree produced by the {@code listTerm}
	 * labeled alternative in {@link PythonParser#term}.
	 * @param ctx the parse tree
	 */
	void enterListTerm(PythonParser.ListTermContext ctx);
	/**
	 * Exit a parse tree produced by the {@code listTerm}
	 * labeled alternative in {@link PythonParser#term}.
	 * @param ctx the parse tree
	 */
	void exitListTerm(PythonParser.ListTermContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#chainable}.
	 * @param ctx the parse tree
	 */
	void enterChainable(PythonParser.ChainableContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#chainable}.
	 * @param ctx the parse tree
	 */
	void exitChainable(PythonParser.ChainableContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#thisInstance}.
	 * @param ctx the parse tree
	 */
	void enterThisInstance(PythonParser.ThisInstanceContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#thisInstance}.
	 * @param ctx the parse tree
	 */
	void exitThisInstance(PythonParser.ThisInstanceContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#bracketedExpression}.
	 * @param ctx the parse tree
	 */
	void enterBracketedExpression(PythonParser.BracketedExpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#bracketedExpression}.
	 * @param ctx the parse tree
	 */
	void exitBracketedExpression(PythonParser.BracketedExpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#unaryExpression}.
	 * @param ctx the parse tree
	 */
	void enterUnaryExpression(PythonParser.UnaryExpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#unaryExpression}.
	 * @param ctx the parse tree
	 */
	void exitUnaryExpression(PythonParser.UnaryExpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#negateNumeric}.
	 * @param ctx the parse tree
	 */
	void enterNegateNumeric(PythonParser.NegateNumericContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#negateNumeric}.
	 * @param ctx the parse tree
	 */
	void exitNegateNumeric(PythonParser.NegateNumericContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#negateLogical}.
	 * @param ctx the parse tree
	 */
	void enterNegateLogical(PythonParser.NegateLogicalContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#negateLogical}.
	 * @param ctx the parse tree
	 */
	void exitNegateLogical(PythonParser.NegateLogicalContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#binaryExpression}.
	 * @param ctx the parse tree
	 */
	void enterBinaryExpression(PythonParser.BinaryExpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#binaryExpression}.
	 * @param ctx the parse tree
	 */
	void exitBinaryExpression(PythonParser.BinaryExpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#list}.
	 * @param ctx the parse tree
	 */
	void enterList(PythonParser.ListContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#list}.
	 * @param ctx the parse tree
	 */
	void exitList(PythonParser.ListContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#tuple}.
	 * @param ctx the parse tree
	 */
	void enterTuple(PythonParser.TupleContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#tuple}.
	 * @param ctx the parse tree
	 */
	void exitTuple(PythonParser.TupleContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#dictionary}.
	 * @param ctx the parse tree
	 */
	void enterDictionary(PythonParser.DictionaryContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#dictionary}.
	 * @param ctx the parse tree
	 */
	void exitDictionary(PythonParser.DictionaryContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#kvpList}.
	 * @param ctx the parse tree
	 */
	void enterKvpList(PythonParser.KvpListContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#kvpList}.
	 * @param ctx the parse tree
	 */
	void exitKvpList(PythonParser.KvpListContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#kvp}.
	 * @param ctx the parse tree
	 */
	void enterKvp(PythonParser.KvpContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#kvp}.
	 * @param ctx the parse tree
	 */
	void exitKvp(PythonParser.KvpContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#methodCall}.
	 * @param ctx the parse tree
	 */
	void enterMethodCall(PythonParser.MethodCallContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#methodCall}.
	 * @param ctx the parse tree
	 */
	void exitMethodCall(PythonParser.MethodCallContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#binaryOperator}.
	 * @param ctx the parse tree
	 */
	void enterBinaryOperator(PythonParser.BinaryOperatorContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#binaryOperator}.
	 * @param ctx the parse tree
	 */
	void exitBinaryOperator(PythonParser.BinaryOperatorContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#newInstance}.
	 * @param ctx the parse tree
	 */
	void enterNewInstance(PythonParser.NewInstanceContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#newInstance}.
	 * @param ctx the parse tree
	 */
	void exitNewInstance(PythonParser.NewInstanceContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#paramDef}.
	 * @param ctx the parse tree
	 */
	void enterParamDef(PythonParser.ParamDefContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#paramDef}.
	 * @param ctx the parse tree
	 */
	void exitParamDef(PythonParser.ParamDefContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#typeGeneric}.
	 * @param ctx the parse tree
	 */
	void enterTypeGeneric(PythonParser.TypeGenericContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#typeGeneric}.
	 * @param ctx the parse tree
	 */
	void exitTypeGeneric(PythonParser.TypeGenericContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#typeFunc}.
	 * @param ctx the parse tree
	 */
	void enterTypeFunc(PythonParser.TypeFuncContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#typeFunc}.
	 * @param ctx the parse tree
	 */
	void exitTypeFunc(PythonParser.TypeFuncContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#typeTuple}.
	 * @param ctx the parse tree
	 */
	void enterTypeTuple(PythonParser.TypeTupleContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#typeTuple}.
	 * @param ctx the parse tree
	 */
	void exitTypeTuple(PythonParser.TypeTupleContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#lambda}.
	 * @param ctx the parse tree
	 */
	void enterLambda(PythonParser.LambdaContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#lambda}.
	 * @param ctx the parse tree
	 */
	void exitLambda(PythonParser.LambdaContext ctx);
	/**
	 * Enter a parse tree produced by {@link PythonParser#interpolatedString}.
	 * @param ctx the parse tree
	 */
	void enterInterpolatedString(PythonParser.InterpolatedStringContext ctx);
	/**
	 * Exit a parse tree produced by {@link PythonParser#interpolatedString}.
	 * @param ctx the parse tree
	 */
	void exitInterpolatedString(PythonParser.InterpolatedStringContext ctx);
}