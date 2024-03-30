// Generated from c://Elan//Repository//Parser//Elan.g4 by ANTLR 4.13.1
import org.antlr.v4.runtime.tree.ParseTreeListener;

/**
 * This interface defines a complete listener for a parse tree produced by
 * {@link ElanParser}.
 */
public interface ElanListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by {@link ElanParser#file}.
	 * @param ctx the parse tree
	 */
	void enterFile(ElanParser.FileContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#file}.
	 * @param ctx the parse tree
	 */
	void exitFile(ElanParser.FileContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#importStatement}.
	 * @param ctx the parse tree
	 */
	void enterImportStatement(ElanParser.ImportStatementContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#importStatement}.
	 * @param ctx the parse tree
	 */
	void exitImportStatement(ElanParser.ImportStatementContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#namespace}.
	 * @param ctx the parse tree
	 */
	void enterNamespace(ElanParser.NamespaceContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#namespace}.
	 * @param ctx the parse tree
	 */
	void exitNamespace(ElanParser.NamespaceContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#main}.
	 * @param ctx the parse tree
	 */
	void enterMain(ElanParser.MainContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#main}.
	 * @param ctx the parse tree
	 */
	void exitMain(ElanParser.MainContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#test}.
	 * @param ctx the parse tree
	 */
	void enterTest(ElanParser.TestContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#test}.
	 * @param ctx the parse tree
	 */
	void exitTest(ElanParser.TestContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#statementBlock}.
	 * @param ctx the parse tree
	 */
	void enterStatementBlock(ElanParser.StatementBlockContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#statementBlock}.
	 * @param ctx the parse tree
	 */
	void exitStatementBlock(ElanParser.StatementBlockContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#testStatement}.
	 * @param ctx the parse tree
	 */
	void enterTestStatement(ElanParser.TestStatementContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#testStatement}.
	 * @param ctx the parse tree
	 */
	void exitTestStatement(ElanParser.TestStatementContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#assert}.
	 * @param ctx the parse tree
	 */
	void enterAssert(ElanParser.AssertContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#assert}.
	 * @param ctx the parse tree
	 */
	void exitAssert(ElanParser.AssertContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#callStatement}.
	 * @param ctx the parse tree
	 */
	void enterCallStatement(ElanParser.CallStatementContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#callStatement}.
	 * @param ctx the parse tree
	 */
	void exitCallStatement(ElanParser.CallStatementContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#throwException}.
	 * @param ctx the parse tree
	 */
	void enterThrowException(ElanParser.ThrowExceptionContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#throwException}.
	 * @param ctx the parse tree
	 */
	void exitThrowException(ElanParser.ThrowExceptionContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#printStatement}.
	 * @param ctx the parse tree
	 */
	void enterPrintStatement(ElanParser.PrintStatementContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#printStatement}.
	 * @param ctx the parse tree
	 */
	void exitPrintStatement(ElanParser.PrintStatementContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#varDef}.
	 * @param ctx the parse tree
	 */
	void enterVarDef(ElanParser.VarDefContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#varDef}.
	 * @param ctx the parse tree
	 */
	void exitVarDef(ElanParser.VarDefContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#assignment}.
	 * @param ctx the parse tree
	 */
	void enterAssignment(ElanParser.AssignmentContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#assignment}.
	 * @param ctx the parse tree
	 */
	void exitAssignment(ElanParser.AssignmentContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#inlineAsignment}.
	 * @param ctx the parse tree
	 */
	void enterInlineAsignment(ElanParser.InlineAsignmentContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#inlineAsignment}.
	 * @param ctx the parse tree
	 */
	void exitInlineAsignment(ElanParser.InlineAsignmentContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#assignableValue}.
	 * @param ctx the parse tree
	 */
	void enterAssignableValue(ElanParser.AssignableValueContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#assignableValue}.
	 * @param ctx the parse tree
	 */
	void exitAssignableValue(ElanParser.AssignableValueContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#procedureCall}.
	 * @param ctx the parse tree
	 */
	void enterProcedureCall(ElanParser.ProcedureCallContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#procedureCall}.
	 * @param ctx the parse tree
	 */
	void exitProcedureCall(ElanParser.ProcedureCallContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#functionCall}.
	 * @param ctx the parse tree
	 */
	void enterFunctionCall(ElanParser.FunctionCallContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#functionCall}.
	 * @param ctx the parse tree
	 */
	void exitFunctionCall(ElanParser.FunctionCallContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#systemCall}.
	 * @param ctx the parse tree
	 */
	void enterSystemCall(ElanParser.SystemCallContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#systemCall}.
	 * @param ctx the parse tree
	 */
	void exitSystemCall(ElanParser.SystemCallContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#input}.
	 * @param ctx the parse tree
	 */
	void enterInput(ElanParser.InputContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#input}.
	 * @param ctx the parse tree
	 */
	void exitInput(ElanParser.InputContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#argument}.
	 * @param ctx the parse tree
	 */
	void enterArgument(ElanParser.ArgumentContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#argument}.
	 * @param ctx the parse tree
	 */
	void exitArgument(ElanParser.ArgumentContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#argumentList}.
	 * @param ctx the parse tree
	 */
	void enterArgumentList(ElanParser.ArgumentListContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#argumentList}.
	 * @param ctx the parse tree
	 */
	void exitArgumentList(ElanParser.ArgumentListContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#procedureDef}.
	 * @param ctx the parse tree
	 */
	void enterProcedureDef(ElanParser.ProcedureDefContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#procedureDef}.
	 * @param ctx the parse tree
	 */
	void exitProcedureDef(ElanParser.ProcedureDefContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#procedureSignature}.
	 * @param ctx the parse tree
	 */
	void enterProcedureSignature(ElanParser.ProcedureSignatureContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#procedureSignature}.
	 * @param ctx the parse tree
	 */
	void exitProcedureSignature(ElanParser.ProcedureSignatureContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#procedureParameterList}.
	 * @param ctx the parse tree
	 */
	void enterProcedureParameterList(ElanParser.ProcedureParameterListContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#procedureParameterList}.
	 * @param ctx the parse tree
	 */
	void exitProcedureParameterList(ElanParser.ProcedureParameterListContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#parameterList}.
	 * @param ctx the parse tree
	 */
	void enterParameterList(ElanParser.ParameterListContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#parameterList}.
	 * @param ctx the parse tree
	 */
	void exitParameterList(ElanParser.ParameterListContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#parameter}.
	 * @param ctx the parse tree
	 */
	void enterParameter(ElanParser.ParameterContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#parameter}.
	 * @param ctx the parse tree
	 */
	void exitParameter(ElanParser.ParameterContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#procedureParameter}.
	 * @param ctx the parse tree
	 */
	void enterProcedureParameter(ElanParser.ProcedureParameterContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#procedureParameter}.
	 * @param ctx the parse tree
	 */
	void exitProcedureParameter(ElanParser.ProcedureParameterContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#functionDef}.
	 * @param ctx the parse tree
	 */
	void enterFunctionDef(ElanParser.FunctionDefContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#functionDef}.
	 * @param ctx the parse tree
	 */
	void exitFunctionDef(ElanParser.FunctionDefContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#functionWithBody}.
	 * @param ctx the parse tree
	 */
	void enterFunctionWithBody(ElanParser.FunctionWithBodyContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#functionWithBody}.
	 * @param ctx the parse tree
	 */
	void exitFunctionWithBody(ElanParser.FunctionWithBodyContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#expressionFunction}.
	 * @param ctx the parse tree
	 */
	void enterExpressionFunction(ElanParser.ExpressionFunctionContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#expressionFunction}.
	 * @param ctx the parse tree
	 */
	void exitExpressionFunction(ElanParser.ExpressionFunctionContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#functionSignature}.
	 * @param ctx the parse tree
	 */
	void enterFunctionSignature(ElanParser.FunctionSignatureContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#functionSignature}.
	 * @param ctx the parse tree
	 */
	void exitFunctionSignature(ElanParser.FunctionSignatureContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#constantDef}.
	 * @param ctx the parse tree
	 */
	void enterConstantDef(ElanParser.ConstantDefContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#constantDef}.
	 * @param ctx the parse tree
	 */
	void exitConstantDef(ElanParser.ConstantDefContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#enumDef}.
	 * @param ctx the parse tree
	 */
	void enterEnumDef(ElanParser.EnumDefContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#enumDef}.
	 * @param ctx the parse tree
	 */
	void exitEnumDef(ElanParser.EnumDefContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#enumType}.
	 * @param ctx the parse tree
	 */
	void enterEnumType(ElanParser.EnumTypeContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#enumType}.
	 * @param ctx the parse tree
	 */
	void exitEnumType(ElanParser.EnumTypeContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#enumValue}.
	 * @param ctx the parse tree
	 */
	void enterEnumValue(ElanParser.EnumValueContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#enumValue}.
	 * @param ctx the parse tree
	 */
	void exitEnumValue(ElanParser.EnumValueContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#classDef}.
	 * @param ctx the parse tree
	 */
	void enterClassDef(ElanParser.ClassDefContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#classDef}.
	 * @param ctx the parse tree
	 */
	void exitClassDef(ElanParser.ClassDefContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#mutableClass}.
	 * @param ctx the parse tree
	 */
	void enterMutableClass(ElanParser.MutableClassContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#mutableClass}.
	 * @param ctx the parse tree
	 */
	void exitMutableClass(ElanParser.MutableClassContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#abstractClass}.
	 * @param ctx the parse tree
	 */
	void enterAbstractClass(ElanParser.AbstractClassContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#abstractClass}.
	 * @param ctx the parse tree
	 */
	void exitAbstractClass(ElanParser.AbstractClassContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#immutableClass}.
	 * @param ctx the parse tree
	 */
	void enterImmutableClass(ElanParser.ImmutableClassContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#immutableClass}.
	 * @param ctx the parse tree
	 */
	void exitImmutableClass(ElanParser.ImmutableClassContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#abstractImmutableClass}.
	 * @param ctx the parse tree
	 */
	void enterAbstractImmutableClass(ElanParser.AbstractImmutableClassContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#abstractImmutableClass}.
	 * @param ctx the parse tree
	 */
	void exitAbstractImmutableClass(ElanParser.AbstractImmutableClassContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#inherits}.
	 * @param ctx the parse tree
	 */
	void enterInherits(ElanParser.InheritsContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#inherits}.
	 * @param ctx the parse tree
	 */
	void exitInherits(ElanParser.InheritsContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#property}.
	 * @param ctx the parse tree
	 */
	void enterProperty(ElanParser.PropertyContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#property}.
	 * @param ctx the parse tree
	 */
	void exitProperty(ElanParser.PropertyContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#constructor}.
	 * @param ctx the parse tree
	 */
	void enterConstructor(ElanParser.ConstructorContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#constructor}.
	 * @param ctx the parse tree
	 */
	void exitConstructor(ElanParser.ConstructorContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#newInstance}.
	 * @param ctx the parse tree
	 */
	void enterNewInstance(ElanParser.NewInstanceContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#newInstance}.
	 * @param ctx the parse tree
	 */
	void exitNewInstance(ElanParser.NewInstanceContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#withClause}.
	 * @param ctx the parse tree
	 */
	void enterWithClause(ElanParser.WithClauseContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#withClause}.
	 * @param ctx the parse tree
	 */
	void exitWithClause(ElanParser.WithClauseContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#proceduralControlFlow}.
	 * @param ctx the parse tree
	 */
	void enterProceduralControlFlow(ElanParser.ProceduralControlFlowContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#proceduralControlFlow}.
	 * @param ctx the parse tree
	 */
	void exitProceduralControlFlow(ElanParser.ProceduralControlFlowContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#if}.
	 * @param ctx the parse tree
	 */
	void enterIf(ElanParser.IfContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#if}.
	 * @param ctx the parse tree
	 */
	void exitIf(ElanParser.IfContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#for}.
	 * @param ctx the parse tree
	 */
	void enterFor(ElanParser.ForContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#for}.
	 * @param ctx the parse tree
	 */
	void exitFor(ElanParser.ForContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#each}.
	 * @param ctx the parse tree
	 */
	void enterEach(ElanParser.EachContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#each}.
	 * @param ctx the parse tree
	 */
	void exitEach(ElanParser.EachContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#while}.
	 * @param ctx the parse tree
	 */
	void enterWhile(ElanParser.WhileContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#while}.
	 * @param ctx the parse tree
	 */
	void exitWhile(ElanParser.WhileContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#repeat}.
	 * @param ctx the parse tree
	 */
	void enterRepeat(ElanParser.RepeatContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#repeat}.
	 * @param ctx the parse tree
	 */
	void exitRepeat(ElanParser.RepeatContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#try}.
	 * @param ctx the parse tree
	 */
	void enterTry(ElanParser.TryContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#try}.
	 * @param ctx the parse tree
	 */
	void exitTry(ElanParser.TryContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#switch}.
	 * @param ctx the parse tree
	 */
	void enterSwitch(ElanParser.SwitchContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#switch}.
	 * @param ctx the parse tree
	 */
	void exitSwitch(ElanParser.SwitchContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#case}.
	 * @param ctx the parse tree
	 */
	void enterCase(ElanParser.CaseContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#case}.
	 * @param ctx the parse tree
	 */
	void exitCase(ElanParser.CaseContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#caseDefault}.
	 * @param ctx the parse tree
	 */
	void enterCaseDefault(ElanParser.CaseDefaultContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#caseDefault}.
	 * @param ctx the parse tree
	 */
	void exitCaseDefault(ElanParser.CaseDefaultContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterExpression(ElanParser.ExpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitExpression(ElanParser.ExpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#bracketedExpression}.
	 * @param ctx the parse tree
	 */
	void enterBracketedExpression(ElanParser.BracketedExpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#bracketedExpression}.
	 * @param ctx the parse tree
	 */
	void exitBracketedExpression(ElanParser.BracketedExpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#ifExpression}.
	 * @param ctx the parse tree
	 */
	void enterIfExpression(ElanParser.IfExpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#ifExpression}.
	 * @param ctx the parse tree
	 */
	void exitIfExpression(ElanParser.IfExpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#elseExpression}.
	 * @param ctx the parse tree
	 */
	void enterElseExpression(ElanParser.ElseExpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#elseExpression}.
	 * @param ctx the parse tree
	 */
	void exitElseExpression(ElanParser.ElseExpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#lambda}.
	 * @param ctx the parse tree
	 */
	void enterLambda(ElanParser.LambdaContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#lambda}.
	 * @param ctx the parse tree
	 */
	void exitLambda(ElanParser.LambdaContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#index}.
	 * @param ctx the parse tree
	 */
	void enterIndex(ElanParser.IndexContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#index}.
	 * @param ctx the parse tree
	 */
	void exitIndex(ElanParser.IndexContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#range}.
	 * @param ctx the parse tree
	 */
	void enterRange(ElanParser.RangeContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#range}.
	 * @param ctx the parse tree
	 */
	void exitRange(ElanParser.RangeContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#value}.
	 * @param ctx the parse tree
	 */
	void enterValue(ElanParser.ValueContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#value}.
	 * @param ctx the parse tree
	 */
	void exitValue(ElanParser.ValueContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#scopeQualifier}.
	 * @param ctx the parse tree
	 */
	void enterScopeQualifier(ElanParser.ScopeQualifierContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#scopeQualifier}.
	 * @param ctx the parse tree
	 */
	void exitScopeQualifier(ElanParser.ScopeQualifierContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#literal}.
	 * @param ctx the parse tree
	 */
	void enterLiteral(ElanParser.LiteralContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#literal}.
	 * @param ctx the parse tree
	 */
	void exitLiteral(ElanParser.LiteralContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#literalValue}.
	 * @param ctx the parse tree
	 */
	void enterLiteralValue(ElanParser.LiteralValueContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#literalValue}.
	 * @param ctx the parse tree
	 */
	void exitLiteralValue(ElanParser.LiteralValueContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#dataStructureDefinition}.
	 * @param ctx the parse tree
	 */
	void enterDataStructureDefinition(ElanParser.DataStructureDefinitionContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#dataStructureDefinition}.
	 * @param ctx the parse tree
	 */
	void exitDataStructureDefinition(ElanParser.DataStructureDefinitionContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#literalDataStructure}.
	 * @param ctx the parse tree
	 */
	void enterLiteralDataStructure(ElanParser.LiteralDataStructureContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#literalDataStructure}.
	 * @param ctx the parse tree
	 */
	void exitLiteralDataStructure(ElanParser.LiteralDataStructureContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#tupleDefinition}.
	 * @param ctx the parse tree
	 */
	void enterTupleDefinition(ElanParser.TupleDefinitionContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#tupleDefinition}.
	 * @param ctx the parse tree
	 */
	void exitTupleDefinition(ElanParser.TupleDefinitionContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#literalTuple}.
	 * @param ctx the parse tree
	 */
	void enterLiteralTuple(ElanParser.LiteralTupleContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#literalTuple}.
	 * @param ctx the parse tree
	 */
	void exitLiteralTuple(ElanParser.LiteralTupleContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#deconstructedTuple}.
	 * @param ctx the parse tree
	 */
	void enterDeconstructedTuple(ElanParser.DeconstructedTupleContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#deconstructedTuple}.
	 * @param ctx the parse tree
	 */
	void exitDeconstructedTuple(ElanParser.DeconstructedTupleContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#listDefinition}.
	 * @param ctx the parse tree
	 */
	void enterListDefinition(ElanParser.ListDefinitionContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#listDefinition}.
	 * @param ctx the parse tree
	 */
	void exitListDefinition(ElanParser.ListDefinitionContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#literalList}.
	 * @param ctx the parse tree
	 */
	void enterLiteralList(ElanParser.LiteralListContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#literalList}.
	 * @param ctx the parse tree
	 */
	void exitLiteralList(ElanParser.LiteralListContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#listDecomp}.
	 * @param ctx the parse tree
	 */
	void enterListDecomp(ElanParser.ListDecompContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#listDecomp}.
	 * @param ctx the parse tree
	 */
	void exitListDecomp(ElanParser.ListDecompContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#arrayDefinition}.
	 * @param ctx the parse tree
	 */
	void enterArrayDefinition(ElanParser.ArrayDefinitionContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#arrayDefinition}.
	 * @param ctx the parse tree
	 */
	void exitArrayDefinition(ElanParser.ArrayDefinitionContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#dictionaryDefinition}.
	 * @param ctx the parse tree
	 */
	void enterDictionaryDefinition(ElanParser.DictionaryDefinitionContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#dictionaryDefinition}.
	 * @param ctx the parse tree
	 */
	void exitDictionaryDefinition(ElanParser.DictionaryDefinitionContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#literalDictionary}.
	 * @param ctx the parse tree
	 */
	void enterLiteralDictionary(ElanParser.LiteralDictionaryContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#literalDictionary}.
	 * @param ctx the parse tree
	 */
	void exitLiteralDictionary(ElanParser.LiteralDictionaryContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#kvp}.
	 * @param ctx the parse tree
	 */
	void enterKvp(ElanParser.KvpContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#kvp}.
	 * @param ctx the parse tree
	 */
	void exitKvp(ElanParser.KvpContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#literalKvp}.
	 * @param ctx the parse tree
	 */
	void enterLiteralKvp(ElanParser.LiteralKvpContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#literalKvp}.
	 * @param ctx the parse tree
	 */
	void exitLiteralKvp(ElanParser.LiteralKvpContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#unaryOp}.
	 * @param ctx the parse tree
	 */
	void enterUnaryOp(ElanParser.UnaryOpContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#unaryOp}.
	 * @param ctx the parse tree
	 */
	void exitUnaryOp(ElanParser.UnaryOpContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#binaryOp}.
	 * @param ctx the parse tree
	 */
	void enterBinaryOp(ElanParser.BinaryOpContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#binaryOp}.
	 * @param ctx the parse tree
	 */
	void exitBinaryOp(ElanParser.BinaryOpContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#arithmeticOp}.
	 * @param ctx the parse tree
	 */
	void enterArithmeticOp(ElanParser.ArithmeticOpContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#arithmeticOp}.
	 * @param ctx the parse tree
	 */
	void exitArithmeticOp(ElanParser.ArithmeticOpContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#logicalOp}.
	 * @param ctx the parse tree
	 */
	void enterLogicalOp(ElanParser.LogicalOpContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#logicalOp}.
	 * @param ctx the parse tree
	 */
	void exitLogicalOp(ElanParser.LogicalOpContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#conditionalOp}.
	 * @param ctx the parse tree
	 */
	void enterConditionalOp(ElanParser.ConditionalOpContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#conditionalOp}.
	 * @param ctx the parse tree
	 */
	void exitConditionalOp(ElanParser.ConditionalOpContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#type}.
	 * @param ctx the parse tree
	 */
	void enterType(ElanParser.TypeContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#type}.
	 * @param ctx the parse tree
	 */
	void exitType(ElanParser.TypeContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#dataStructureType}.
	 * @param ctx the parse tree
	 */
	void enterDataStructureType(ElanParser.DataStructureTypeContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#dataStructureType}.
	 * @param ctx the parse tree
	 */
	void exitDataStructureType(ElanParser.DataStructureTypeContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#genericSpecifier}.
	 * @param ctx the parse tree
	 */
	void enterGenericSpecifier(ElanParser.GenericSpecifierContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#genericSpecifier}.
	 * @param ctx the parse tree
	 */
	void exitGenericSpecifier(ElanParser.GenericSpecifierContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#tupleType}.
	 * @param ctx the parse tree
	 */
	void enterTupleType(ElanParser.TupleTypeContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#tupleType}.
	 * @param ctx the parse tree
	 */
	void exitTupleType(ElanParser.TupleTypeContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#typeList}.
	 * @param ctx the parse tree
	 */
	void enterTypeList(ElanParser.TypeListContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#typeList}.
	 * @param ctx the parse tree
	 */
	void exitTypeList(ElanParser.TypeListContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#funcType}.
	 * @param ctx the parse tree
	 */
	void enterFuncType(ElanParser.FuncTypeContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#funcType}.
	 * @param ctx the parse tree
	 */
	void exitFuncType(ElanParser.FuncTypeContext ctx);
}