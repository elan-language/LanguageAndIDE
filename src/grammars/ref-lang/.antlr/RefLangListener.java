// Generated from c:/elan-language/LanguageAndIDE/src/grammars/ref-lang/RefLang.g4 by ANTLR 4.13.1
import org.antlr.v4.runtime.tree.ParseTreeListener;

/**
 * This interface defines a complete listener for a parse tree produced by
 * {@link RefLangParser}.
 */
public interface RefLangListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by {@link RefLangParser#file}.
	 * @param ctx the parse tree
	 */
	void enterFile(RefLangParser.FileContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#file}.
	 * @param ctx the parse tree
	 */
	void exitFile(RefLangParser.FileContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#global}.
	 * @param ctx the parse tree
	 */
	void enterGlobal(RefLangParser.GlobalContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#global}.
	 * @param ctx the parse tree
	 */
	void exitGlobal(RefLangParser.GlobalContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#main}.
	 * @param ctx the parse tree
	 */
	void enterMain(RefLangParser.MainContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#main}.
	 * @param ctx the parse tree
	 */
	void exitMain(RefLangParser.MainContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#function}.
	 * @param ctx the parse tree
	 */
	void enterFunction(RefLangParser.FunctionContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#function}.
	 * @param ctx the parse tree
	 */
	void exitFunction(RefLangParser.FunctionContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#test}.
	 * @param ctx the parse tree
	 */
	void enterTest(RefLangParser.TestContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#test}.
	 * @param ctx the parse tree
	 */
	void exitTest(RefLangParser.TestContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#testStatement}.
	 * @param ctx the parse tree
	 */
	void enterTestStatement(RefLangParser.TestStatementContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#testStatement}.
	 * @param ctx the parse tree
	 */
	void exitTestStatement(RefLangParser.TestStatementContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#procedure}.
	 * @param ctx the parse tree
	 */
	void enterProcedure(RefLangParser.ProcedureContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#procedure}.
	 * @param ctx the parse tree
	 */
	void exitProcedure(RefLangParser.ProcedureContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#constant}.
	 * @param ctx the parse tree
	 */
	void enterConstant(RefLangParser.ConstantContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#constant}.
	 * @param ctx the parse tree
	 */
	void exitConstant(RefLangParser.ConstantContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#enum}.
	 * @param ctx the parse tree
	 */
	void enterEnum(RefLangParser.EnumContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#enum}.
	 * @param ctx the parse tree
	 */
	void exitEnum(RefLangParser.EnumContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#concreteClass}.
	 * @param ctx the parse tree
	 */
	void enterConcreteClass(RefLangParser.ConcreteClassContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#concreteClass}.
	 * @param ctx the parse tree
	 */
	void exitConcreteClass(RefLangParser.ConcreteClassContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#concreteClassMember}.
	 * @param ctx the parse tree
	 */
	void enterConcreteClassMember(RefLangParser.ConcreteClassMemberContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#concreteClassMember}.
	 * @param ctx the parse tree
	 */
	void exitConcreteClassMember(RefLangParser.ConcreteClassMemberContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#abstractClass}.
	 * @param ctx the parse tree
	 */
	void enterAbstractClass(RefLangParser.AbstractClassContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#abstractClass}.
	 * @param ctx the parse tree
	 */
	void exitAbstractClass(RefLangParser.AbstractClassContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#abstractClassMember}.
	 * @param ctx the parse tree
	 */
	void enterAbstractClassMember(RefLangParser.AbstractClassMemberContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#abstractClassMember}.
	 * @param ctx the parse tree
	 */
	void exitAbstractClassMember(RefLangParser.AbstractClassMemberContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#comment}.
	 * @param ctx the parse tree
	 */
	void enterComment(RefLangParser.CommentContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#comment}.
	 * @param ctx the parse tree
	 */
	void exitComment(RefLangParser.CommentContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#commentText}.
	 * @param ctx the parse tree
	 */
	void enterCommentText(RefLangParser.CommentTextContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#commentText}.
	 * @param ctx the parse tree
	 */
	void exitCommentText(RefLangParser.CommentTextContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#ordinaryStatement}.
	 * @param ctx the parse tree
	 */
	void enterOrdinaryStatement(RefLangParser.OrdinaryStatementContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#ordinaryStatement}.
	 * @param ctx the parse tree
	 */
	void exitOrdinaryStatement(RefLangParser.OrdinaryStatementContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#variableDefinition}.
	 * @param ctx the parse tree
	 */
	void enterVariableDefinition(RefLangParser.VariableDefinitionContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#variableDefinition}.
	 * @param ctx the parse tree
	 */
	void exitVariableDefinition(RefLangParser.VariableDefinitionContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#assignment}.
	 * @param ctx the parse tree
	 */
	void enterAssignment(RefLangParser.AssignmentContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#assignment}.
	 * @param ctx the parse tree
	 */
	void exitAssignment(RefLangParser.AssignmentContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#ifStatement}.
	 * @param ctx the parse tree
	 */
	void enterIfStatement(RefLangParser.IfStatementContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#ifStatement}.
	 * @param ctx the parse tree
	 */
	void exitIfStatement(RefLangParser.IfStatementContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#thenClause}.
	 * @param ctx the parse tree
	 */
	void enterThenClause(RefLangParser.ThenClauseContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#thenClause}.
	 * @param ctx the parse tree
	 */
	void exitThenClause(RefLangParser.ThenClauseContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#elseIfClause}.
	 * @param ctx the parse tree
	 */
	void enterElseIfClause(RefLangParser.ElseIfClauseContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#elseIfClause}.
	 * @param ctx the parse tree
	 */
	void exitElseIfClause(RefLangParser.ElseIfClauseContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#elseClause}.
	 * @param ctx the parse tree
	 */
	void enterElseClause(RefLangParser.ElseClauseContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#elseClause}.
	 * @param ctx the parse tree
	 */
	void exitElseClause(RefLangParser.ElseClauseContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#whileLoop}.
	 * @param ctx the parse tree
	 */
	void enterWhileLoop(RefLangParser.WhileLoopContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#whileLoop}.
	 * @param ctx the parse tree
	 */
	void exitWhileLoop(RefLangParser.WhileLoopContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#forLoop}.
	 * @param ctx the parse tree
	 */
	void enterForLoop(RefLangParser.ForLoopContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#forLoop}.
	 * @param ctx the parse tree
	 */
	void exitForLoop(RefLangParser.ForLoopContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#procedureCall}.
	 * @param ctx the parse tree
	 */
	void enterProcedureCall(RefLangParser.ProcedureCallContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#procedureCall}.
	 * @param ctx the parse tree
	 */
	void exitProcedureCall(RefLangParser.ProcedureCallContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#tryStatement}.
	 * @param ctx the parse tree
	 */
	void enterTryStatement(RefLangParser.TryStatementContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#tryStatement}.
	 * @param ctx the parse tree
	 */
	void exitTryStatement(RefLangParser.TryStatementContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#tryClause}.
	 * @param ctx the parse tree
	 */
	void enterTryClause(RefLangParser.TryClauseContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#tryClause}.
	 * @param ctx the parse tree
	 */
	void exitTryClause(RefLangParser.TryClauseContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#catchClause}.
	 * @param ctx the parse tree
	 */
	void enterCatchClause(RefLangParser.CatchClauseContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#catchClause}.
	 * @param ctx the parse tree
	 */
	void exitCatchClause(RefLangParser.CatchClauseContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#throwStatement}.
	 * @param ctx the parse tree
	 */
	void enterThrowStatement(RefLangParser.ThrowStatementContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#throwStatement}.
	 * @param ctx the parse tree
	 */
	void exitThrowStatement(RefLangParser.ThrowStatementContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#errorMessage}.
	 * @param ctx the parse tree
	 */
	void enterErrorMessage(RefLangParser.ErrorMessageContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#errorMessage}.
	 * @param ctx the parse tree
	 */
	void exitErrorMessage(RefLangParser.ErrorMessageContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#assert}.
	 * @param ctx the parse tree
	 */
	void enterAssert(RefLangParser.AssertContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#assert}.
	 * @param ctx the parse tree
	 */
	void exitAssert(RefLangParser.AssertContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#returnStatement}.
	 * @param ctx the parse tree
	 */
	void enterReturnStatement(RefLangParser.ReturnStatementContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#returnStatement}.
	 * @param ctx the parse tree
	 */
	void exitReturnStatement(RefLangParser.ReturnStatementContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#constructorMember}.
	 * @param ctx the parse tree
	 */
	void enterConstructorMember(RefLangParser.ConstructorMemberContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#constructorMember}.
	 * @param ctx the parse tree
	 */
	void exitConstructorMember(RefLangParser.ConstructorMemberContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#property}.
	 * @param ctx the parse tree
	 */
	void enterProperty(RefLangParser.PropertyContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#property}.
	 * @param ctx the parse tree
	 */
	void exitProperty(RefLangParser.PropertyContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#functionMethod}.
	 * @param ctx the parse tree
	 */
	void enterFunctionMethod(RefLangParser.FunctionMethodContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#functionMethod}.
	 * @param ctx the parse tree
	 */
	void exitFunctionMethod(RefLangParser.FunctionMethodContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#procedureMethod}.
	 * @param ctx the parse tree
	 */
	void enterProcedureMethod(RefLangParser.ProcedureMethodContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#procedureMethod}.
	 * @param ctx the parse tree
	 */
	void exitProcedureMethod(RefLangParser.ProcedureMethodContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#abstractFunction}.
	 * @param ctx the parse tree
	 */
	void enterAbstractFunction(RefLangParser.AbstractFunctionContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#abstractFunction}.
	 * @param ctx the parse tree
	 */
	void exitAbstractFunction(RefLangParser.AbstractFunctionContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#abstractProcedure}.
	 * @param ctx the parse tree
	 */
	void enterAbstractProcedure(RefLangParser.AbstractProcedureContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#abstractProcedure}.
	 * @param ctx the parse tree
	 */
	void exitAbstractProcedure(RefLangParser.AbstractProcedureContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#identifierDef}.
	 * @param ctx the parse tree
	 */
	void enterIdentifierDef(RefLangParser.IdentifierDefContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#identifierDef}.
	 * @param ctx the parse tree
	 */
	void exitIdentifierDef(RefLangParser.IdentifierDefContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#identifierUse}.
	 * @param ctx the parse tree
	 */
	void enterIdentifierUse(RefLangParser.IdentifierUseContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#identifierUse}.
	 * @param ctx the parse tree
	 */
	void exitIdentifierUse(RefLangParser.IdentifierUseContext ctx);
	/**
	 * Enter a parse tree produced by the {@code simpleAssignable}
	 * labeled alternative in {@link RefLangParser#assignable}.
	 * @param ctx the parse tree
	 */
	void enterSimpleAssignable(RefLangParser.SimpleAssignableContext ctx);
	/**
	 * Exit a parse tree produced by the {@code simpleAssignable}
	 * labeled alternative in {@link RefLangParser#assignable}.
	 * @param ctx the parse tree
	 */
	void exitSimpleAssignable(RefLangParser.SimpleAssignableContext ctx);
	/**
	 * Enter a parse tree produced by the {@code indexedAssignable}
	 * labeled alternative in {@link RefLangParser#assignable}.
	 * @param ctx the parse tree
	 */
	void enterIndexedAssignable(RefLangParser.IndexedAssignableContext ctx);
	/**
	 * Exit a parse tree produced by the {@code indexedAssignable}
	 * labeled alternative in {@link RefLangParser#assignable}.
	 * @param ctx the parse tree
	 */
	void exitIndexedAssignable(RefLangParser.IndexedAssignableContext ctx);
	/**
	 * Enter a parse tree produced by the {@code thisAssignable}
	 * labeled alternative in {@link RefLangParser#assignable}.
	 * @param ctx the parse tree
	 */
	void enterThisAssignable(RefLangParser.ThisAssignableContext ctx);
	/**
	 * Exit a parse tree produced by the {@code thisAssignable}
	 * labeled alternative in {@link RefLangParser#assignable}.
	 * @param ctx the parse tree
	 */
	void exitThisAssignable(RefLangParser.ThisAssignableContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#methodName}.
	 * @param ctx the parse tree
	 */
	void enterMethodName(RefLangParser.MethodNameContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#methodName}.
	 * @param ctx the parse tree
	 */
	void exitMethodName(RefLangParser.MethodNameContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#testName}.
	 * @param ctx the parse tree
	 */
	void enterTestName(RefLangParser.TestNameContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#testName}.
	 * @param ctx the parse tree
	 */
	void exitTestName(RefLangParser.TestNameContext ctx);
	/**
	 * Enter a parse tree produced by the {@code intTypeName}
	 * labeled alternative in {@link RefLangParser#typeName}.
	 * @param ctx the parse tree
	 */
	void enterIntTypeName(RefLangParser.IntTypeNameContext ctx);
	/**
	 * Exit a parse tree produced by the {@code intTypeName}
	 * labeled alternative in {@link RefLangParser#typeName}.
	 * @param ctx the parse tree
	 */
	void exitIntTypeName(RefLangParser.IntTypeNameContext ctx);
	/**
	 * Enter a parse tree produced by the {@code floatTypeName}
	 * labeled alternative in {@link RefLangParser#typeName}.
	 * @param ctx the parse tree
	 */
	void enterFloatTypeName(RefLangParser.FloatTypeNameContext ctx);
	/**
	 * Exit a parse tree produced by the {@code floatTypeName}
	 * labeled alternative in {@link RefLangParser#typeName}.
	 * @param ctx the parse tree
	 */
	void exitFloatTypeName(RefLangParser.FloatTypeNameContext ctx);
	/**
	 * Enter a parse tree produced by the {@code boolTypeName}
	 * labeled alternative in {@link RefLangParser#typeName}.
	 * @param ctx the parse tree
	 */
	void enterBoolTypeName(RefLangParser.BoolTypeNameContext ctx);
	/**
	 * Exit a parse tree produced by the {@code boolTypeName}
	 * labeled alternative in {@link RefLangParser#typeName}.
	 * @param ctx the parse tree
	 */
	void exitBoolTypeName(RefLangParser.BoolTypeNameContext ctx);
	/**
	 * Enter a parse tree produced by the {@code stringTypeName}
	 * labeled alternative in {@link RefLangParser#typeName}.
	 * @param ctx the parse tree
	 */
	void enterStringTypeName(RefLangParser.StringTypeNameContext ctx);
	/**
	 * Exit a parse tree produced by the {@code stringTypeName}
	 * labeled alternative in {@link RefLangParser#typeName}.
	 * @param ctx the parse tree
	 */
	void exitStringTypeName(RefLangParser.StringTypeNameContext ctx);
	/**
	 * Enter a parse tree produced by the {@code listTypeName}
	 * labeled alternative in {@link RefLangParser#typeName}.
	 * @param ctx the parse tree
	 */
	void enterListTypeName(RefLangParser.ListTypeNameContext ctx);
	/**
	 * Exit a parse tree produced by the {@code listTypeName}
	 * labeled alternative in {@link RefLangParser#typeName}.
	 * @param ctx the parse tree
	 */
	void exitListTypeName(RefLangParser.ListTypeNameContext ctx);
	/**
	 * Enter a parse tree produced by the {@code dictTypeName}
	 * labeled alternative in {@link RefLangParser#typeName}.
	 * @param ctx the parse tree
	 */
	void enterDictTypeName(RefLangParser.DictTypeNameContext ctx);
	/**
	 * Exit a parse tree produced by the {@code dictTypeName}
	 * labeled alternative in {@link RefLangParser#typeName}.
	 * @param ctx the parse tree
	 */
	void exitDictTypeName(RefLangParser.DictTypeNameContext ctx);
	/**
	 * Enter a parse tree produced by the {@code udtTypeName}
	 * labeled alternative in {@link RefLangParser#typeName}.
	 * @param ctx the parse tree
	 */
	void enterUdtTypeName(RefLangParser.UdtTypeNameContext ctx);
	/**
	 * Exit a parse tree produced by the {@code udtTypeName}
	 * labeled alternative in {@link RefLangParser#typeName}.
	 * @param ctx the parse tree
	 */
	void exitUdtTypeName(RefLangParser.UdtTypeNameContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#constantValue}.
	 * @param ctx the parse tree
	 */
	void enterConstantValue(RefLangParser.ConstantValueContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#constantValue}.
	 * @param ctx the parse tree
	 */
	void exitConstantValue(RefLangParser.ConstantValueContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#argList}.
	 * @param ctx the parse tree
	 */
	void enterArgList(RefLangParser.ArgListContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#argList}.
	 * @param ctx the parse tree
	 */
	void exitArgList(RefLangParser.ArgListContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#argument}.
	 * @param ctx the parse tree
	 */
	void enterArgument(RefLangParser.ArgumentContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#argument}.
	 * @param ctx the parse tree
	 */
	void exitArgument(RefLangParser.ArgumentContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#paramList}.
	 * @param ctx the parse tree
	 */
	void enterParamList(RefLangParser.ParamListContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#paramList}.
	 * @param ctx the parse tree
	 */
	void exitParamList(RefLangParser.ParamListContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#identifierList}.
	 * @param ctx the parse tree
	 */
	void enterIdentifierList(RefLangParser.IdentifierListContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#identifierList}.
	 * @param ctx the parse tree
	 */
	void exitIdentifierList(RefLangParser.IdentifierListContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#expressionList}.
	 * @param ctx the parse tree
	 */
	void enterExpressionList(RefLangParser.ExpressionListContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#expressionList}.
	 * @param ctx the parse tree
	 */
	void exitExpressionList(RefLangParser.ExpressionListContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#type}.
	 * @param ctx the parse tree
	 */
	void enterType(RefLangParser.TypeContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#type}.
	 * @param ctx the parse tree
	 */
	void exitType(RefLangParser.TypeContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#assertActual}.
	 * @param ctx the parse tree
	 */
	void enterAssertActual(RefLangParser.AssertActualContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#assertActual}.
	 * @param ctx the parse tree
	 */
	void exitAssertActual(RefLangParser.AssertActualContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#assertExpected}.
	 * @param ctx the parse tree
	 */
	void enterAssertExpected(RefLangParser.AssertExpectedContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#assertExpected}.
	 * @param ctx the parse tree
	 */
	void exitAssertExpected(RefLangParser.AssertExpectedContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#litValue}.
	 * @param ctx the parse tree
	 */
	void enterLitValue(RefLangParser.LitValueContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#litValue}.
	 * @param ctx the parse tree
	 */
	void exitLitValue(RefLangParser.LitValueContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#litBoolean}.
	 * @param ctx the parse tree
	 */
	void enterLitBoolean(RefLangParser.LitBooleanContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#litBoolean}.
	 * @param ctx the parse tree
	 */
	void exitLitBoolean(RefLangParser.LitBooleanContext ctx);
	/**
	 * Enter a parse tree produced by the {@code litInteger}
	 * labeled alternative in {@link RefLangParser#litInt}.
	 * @param ctx the parse tree
	 */
	void enterLitInteger(RefLangParser.LitIntegerContext ctx);
	/**
	 * Exit a parse tree produced by the {@code litInteger}
	 * labeled alternative in {@link RefLangParser#litInt}.
	 * @param ctx the parse tree
	 */
	void exitLitInteger(RefLangParser.LitIntegerContext ctx);
	/**
	 * Enter a parse tree produced by the {@code litBinary}
	 * labeled alternative in {@link RefLangParser#litInt}.
	 * @param ctx the parse tree
	 */
	void enterLitBinary(RefLangParser.LitBinaryContext ctx);
	/**
	 * Exit a parse tree produced by the {@code litBinary}
	 * labeled alternative in {@link RefLangParser#litInt}.
	 * @param ctx the parse tree
	 */
	void exitLitBinary(RefLangParser.LitBinaryContext ctx);
	/**
	 * Enter a parse tree produced by the {@code litHex}
	 * labeled alternative in {@link RefLangParser#litInt}.
	 * @param ctx the parse tree
	 */
	void enterLitHex(RefLangParser.LitHexContext ctx);
	/**
	 * Exit a parse tree produced by the {@code litHex}
	 * labeled alternative in {@link RefLangParser#litInt}.
	 * @param ctx the parse tree
	 */
	void exitLitHex(RefLangParser.LitHexContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#litFloat}.
	 * @param ctx the parse tree
	 */
	void enterLitFloat(RefLangParser.LitFloatContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#litFloat}.
	 * @param ctx the parse tree
	 */
	void exitLitFloat(RefLangParser.LitFloatContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#litString}.
	 * @param ctx the parse tree
	 */
	void enterLitString(RefLangParser.LitStringContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#litString}.
	 * @param ctx the parse tree
	 */
	void exitLitString(RefLangParser.LitStringContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#interpolatedString}.
	 * @param ctx the parse tree
	 */
	void enterInterpolatedString(RefLangParser.InterpolatedStringContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#interpolatedString}.
	 * @param ctx the parse tree
	 */
	void exitInterpolatedString(RefLangParser.InterpolatedStringContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#enumValue}.
	 * @param ctx the parse tree
	 */
	void enterEnumValue(RefLangParser.EnumValueContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#enumValue}.
	 * @param ctx the parse tree
	 */
	void exitEnumValue(RefLangParser.EnumValueContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#index}.
	 * @param ctx the parse tree
	 */
	void enterIndex(RefLangParser.IndexContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#index}.
	 * @param ctx the parse tree
	 */
	void exitIndex(RefLangParser.IndexContext ctx);
	/**
	 * Enter a parse tree produced by the {@code newInstanceExpression}
	 * labeled alternative in {@link RefLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterNewInstanceExpression(RefLangParser.NewInstanceExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code newInstanceExpression}
	 * labeled alternative in {@link RefLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitNewInstanceExpression(RefLangParser.NewInstanceExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code unaryExpressionLabel}
	 * labeled alternative in {@link RefLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterUnaryExpressionLabel(RefLangParser.UnaryExpressionLabelContext ctx);
	/**
	 * Exit a parse tree produced by the {@code unaryExpressionLabel}
	 * labeled alternative in {@link RefLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitUnaryExpressionLabel(RefLangParser.UnaryExpressionLabelContext ctx);
	/**
	 * Enter a parse tree produced by the {@code termExpression}
	 * labeled alternative in {@link RefLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterTermExpression(RefLangParser.TermExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code termExpression}
	 * labeled alternative in {@link RefLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitTermExpression(RefLangParser.TermExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code binaryExpressionLabel}
	 * labeled alternative in {@link RefLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterBinaryExpressionLabel(RefLangParser.BinaryExpressionLabelContext ctx);
	/**
	 * Exit a parse tree produced by the {@code binaryExpressionLabel}
	 * labeled alternative in {@link RefLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitBinaryExpressionLabel(RefLangParser.BinaryExpressionLabelContext ctx);
	/**
	 * Enter a parse tree produced by the {@code ifExpression}
	 * labeled alternative in {@link RefLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterIfExpression(RefLangParser.IfExpressionContext ctx);
	/**
	 * Exit a parse tree produced by the {@code ifExpression}
	 * labeled alternative in {@link RefLangParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitIfExpression(RefLangParser.IfExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code identifierUseTerm}
	 * labeled alternative in {@link RefLangParser#term}.
	 * @param ctx the parse tree
	 */
	void enterIdentifierUseTerm(RefLangParser.IdentifierUseTermContext ctx);
	/**
	 * Exit a parse tree produced by the {@code identifierUseTerm}
	 * labeled alternative in {@link RefLangParser#term}.
	 * @param ctx the parse tree
	 */
	void exitIdentifierUseTerm(RefLangParser.IdentifierUseTermContext ctx);
	/**
	 * Enter a parse tree produced by the {@code methodCallTerm}
	 * labeled alternative in {@link RefLangParser#term}.
	 * @param ctx the parse tree
	 */
	void enterMethodCallTerm(RefLangParser.MethodCallTermContext ctx);
	/**
	 * Exit a parse tree produced by the {@code methodCallTerm}
	 * labeled alternative in {@link RefLangParser#term}.
	 * @param ctx the parse tree
	 */
	void exitMethodCallTerm(RefLangParser.MethodCallTermContext ctx);
	/**
	 * Enter a parse tree produced by the {@code indexedTerm}
	 * labeled alternative in {@link RefLangParser#term}.
	 * @param ctx the parse tree
	 */
	void enterIndexedTerm(RefLangParser.IndexedTermContext ctx);
	/**
	 * Exit a parse tree produced by the {@code indexedTerm}
	 * labeled alternative in {@link RefLangParser#term}.
	 * @param ctx the parse tree
	 */
	void exitIndexedTerm(RefLangParser.IndexedTermContext ctx);
	/**
	 * Enter a parse tree produced by the {@code litValueTerm}
	 * labeled alternative in {@link RefLangParser#term}.
	 * @param ctx the parse tree
	 */
	void enterLitValueTerm(RefLangParser.LitValueTermContext ctx);
	/**
	 * Exit a parse tree produced by the {@code litValueTerm}
	 * labeled alternative in {@link RefLangParser#term}.
	 * @param ctx the parse tree
	 */
	void exitLitValueTerm(RefLangParser.LitValueTermContext ctx);
	/**
	 * Enter a parse tree produced by the {@code dictionaryTerm}
	 * labeled alternative in {@link RefLangParser#term}.
	 * @param ctx the parse tree
	 */
	void enterDictionaryTerm(RefLangParser.DictionaryTermContext ctx);
	/**
	 * Exit a parse tree produced by the {@code dictionaryTerm}
	 * labeled alternative in {@link RefLangParser#term}.
	 * @param ctx the parse tree
	 */
	void exitDictionaryTerm(RefLangParser.DictionaryTermContext ctx);
	/**
	 * Enter a parse tree produced by the {@code bracketedExpressionTerm}
	 * labeled alternative in {@link RefLangParser#term}.
	 * @param ctx the parse tree
	 */
	void enterBracketedExpressionTerm(RefLangParser.BracketedExpressionTermContext ctx);
	/**
	 * Exit a parse tree produced by the {@code bracketedExpressionTerm}
	 * labeled alternative in {@link RefLangParser#term}.
	 * @param ctx the parse tree
	 */
	void exitBracketedExpressionTerm(RefLangParser.BracketedExpressionTermContext ctx);
	/**
	 * Enter a parse tree produced by the {@code chainableTerm}
	 * labeled alternative in {@link RefLangParser#term}.
	 * @param ctx the parse tree
	 */
	void enterChainableTerm(RefLangParser.ChainableTermContext ctx);
	/**
	 * Exit a parse tree produced by the {@code chainableTerm}
	 * labeled alternative in {@link RefLangParser#term}.
	 * @param ctx the parse tree
	 */
	void exitChainableTerm(RefLangParser.ChainableTermContext ctx);
	/**
	 * Enter a parse tree produced by the {@code tupleTerm}
	 * labeled alternative in {@link RefLangParser#term}.
	 * @param ctx the parse tree
	 */
	void enterTupleTerm(RefLangParser.TupleTermContext ctx);
	/**
	 * Exit a parse tree produced by the {@code tupleTerm}
	 * labeled alternative in {@link RefLangParser#term}.
	 * @param ctx the parse tree
	 */
	void exitTupleTerm(RefLangParser.TupleTermContext ctx);
	/**
	 * Enter a parse tree produced by the {@code thisInstanceTerm}
	 * labeled alternative in {@link RefLangParser#term}.
	 * @param ctx the parse tree
	 */
	void enterThisInstanceTerm(RefLangParser.ThisInstanceTermContext ctx);
	/**
	 * Exit a parse tree produced by the {@code thisInstanceTerm}
	 * labeled alternative in {@link RefLangParser#term}.
	 * @param ctx the parse tree
	 */
	void exitThisInstanceTerm(RefLangParser.ThisInstanceTermContext ctx);
	/**
	 * Enter a parse tree produced by the {@code listTerm}
	 * labeled alternative in {@link RefLangParser#term}.
	 * @param ctx the parse tree
	 */
	void enterListTerm(RefLangParser.ListTermContext ctx);
	/**
	 * Exit a parse tree produced by the {@code listTerm}
	 * labeled alternative in {@link RefLangParser#term}.
	 * @param ctx the parse tree
	 */
	void exitListTerm(RefLangParser.ListTermContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#chainable}.
	 * @param ctx the parse tree
	 */
	void enterChainable(RefLangParser.ChainableContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#chainable}.
	 * @param ctx the parse tree
	 */
	void exitChainable(RefLangParser.ChainableContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#thisInstance}.
	 * @param ctx the parse tree
	 */
	void enterThisInstance(RefLangParser.ThisInstanceContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#thisInstance}.
	 * @param ctx the parse tree
	 */
	void exitThisInstance(RefLangParser.ThisInstanceContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#bracketedExpression}.
	 * @param ctx the parse tree
	 */
	void enterBracketedExpression(RefLangParser.BracketedExpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#bracketedExpression}.
	 * @param ctx the parse tree
	 */
	void exitBracketedExpression(RefLangParser.BracketedExpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#unaryExpression}.
	 * @param ctx the parse tree
	 */
	void enterUnaryExpression(RefLangParser.UnaryExpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#unaryExpression}.
	 * @param ctx the parse tree
	 */
	void exitUnaryExpression(RefLangParser.UnaryExpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#negateNumeric}.
	 * @param ctx the parse tree
	 */
	void enterNegateNumeric(RefLangParser.NegateNumericContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#negateNumeric}.
	 * @param ctx the parse tree
	 */
	void exitNegateNumeric(RefLangParser.NegateNumericContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#negateLogical}.
	 * @param ctx the parse tree
	 */
	void enterNegateLogical(RefLangParser.NegateLogicalContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#negateLogical}.
	 * @param ctx the parse tree
	 */
	void exitNegateLogical(RefLangParser.NegateLogicalContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#binaryExpression}.
	 * @param ctx the parse tree
	 */
	void enterBinaryExpression(RefLangParser.BinaryExpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#binaryExpression}.
	 * @param ctx the parse tree
	 */
	void exitBinaryExpression(RefLangParser.BinaryExpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#list}.
	 * @param ctx the parse tree
	 */
	void enterList(RefLangParser.ListContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#list}.
	 * @param ctx the parse tree
	 */
	void exitList(RefLangParser.ListContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#tuple}.
	 * @param ctx the parse tree
	 */
	void enterTuple(RefLangParser.TupleContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#tuple}.
	 * @param ctx the parse tree
	 */
	void exitTuple(RefLangParser.TupleContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#dictionary}.
	 * @param ctx the parse tree
	 */
	void enterDictionary(RefLangParser.DictionaryContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#dictionary}.
	 * @param ctx the parse tree
	 */
	void exitDictionary(RefLangParser.DictionaryContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#kvpList}.
	 * @param ctx the parse tree
	 */
	void enterKvpList(RefLangParser.KvpListContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#kvpList}.
	 * @param ctx the parse tree
	 */
	void exitKvpList(RefLangParser.KvpListContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#kvp}.
	 * @param ctx the parse tree
	 */
	void enterKvp(RefLangParser.KvpContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#kvp}.
	 * @param ctx the parse tree
	 */
	void exitKvp(RefLangParser.KvpContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#methodCall}.
	 * @param ctx the parse tree
	 */
	void enterMethodCall(RefLangParser.MethodCallContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#methodCall}.
	 * @param ctx the parse tree
	 */
	void exitMethodCall(RefLangParser.MethodCallContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#binaryOperator}.
	 * @param ctx the parse tree
	 */
	void enterBinaryOperator(RefLangParser.BinaryOperatorContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#binaryOperator}.
	 * @param ctx the parse tree
	 */
	void exitBinaryOperator(RefLangParser.BinaryOperatorContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#newInstance}.
	 * @param ctx the parse tree
	 */
	void enterNewInstance(RefLangParser.NewInstanceContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#newInstance}.
	 * @param ctx the parse tree
	 */
	void exitNewInstance(RefLangParser.NewInstanceContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#paramDef}.
	 * @param ctx the parse tree
	 */
	void enterParamDef(RefLangParser.ParamDefContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#paramDef}.
	 * @param ctx the parse tree
	 */
	void exitParamDef(RefLangParser.ParamDefContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#typeGeneric}.
	 * @param ctx the parse tree
	 */
	void enterTypeGeneric(RefLangParser.TypeGenericContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#typeGeneric}.
	 * @param ctx the parse tree
	 */
	void exitTypeGeneric(RefLangParser.TypeGenericContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#typeFunc}.
	 * @param ctx the parse tree
	 */
	void enterTypeFunc(RefLangParser.TypeFuncContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#typeFunc}.
	 * @param ctx the parse tree
	 */
	void exitTypeFunc(RefLangParser.TypeFuncContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#typeTuple}.
	 * @param ctx the parse tree
	 */
	void enterTypeTuple(RefLangParser.TypeTupleContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#typeTuple}.
	 * @param ctx the parse tree
	 */
	void exitTypeTuple(RefLangParser.TypeTupleContext ctx);
	/**
	 * Enter a parse tree produced by {@link RefLangParser#lambda}.
	 * @param ctx the parse tree
	 */
	void enterLambda(RefLangParser.LambdaContext ctx);
	/**
	 * Exit a parse tree produced by {@link RefLangParser#lambda}.
	 * @param ctx the parse tree
	 */
	void exitLambda(RefLangParser.LambdaContext ctx);
}