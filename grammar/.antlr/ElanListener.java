// Generated from c://Elan//IDE//grammar//Elan.g4 by ANTLR 4.13.1
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
	 * Enter a parse tree produced by {@link ElanParser#comment}.
	 * @param ctx the parse tree
	 */
	void enterComment(ElanParser.CommentContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#comment}.
	 * @param ctx the parse tree
	 */
	void exitComment(ElanParser.CommentContext ctx);
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
	 * Enter a parse tree produced by {@link ElanParser#global}.
	 * @param ctx the parse tree
	 */
	void enterGlobal(ElanParser.GlobalContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#global}.
	 * @param ctx the parse tree
	 */
	void exitGlobal(ElanParser.GlobalContext ctx);
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
	 * Enter a parse tree produced by {@link ElanParser#procedure}.
	 * @param ctx the parse tree
	 */
	void enterProcedure(ElanParser.ProcedureContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#procedure}.
	 * @param ctx the parse tree
	 */
	void exitProcedure(ElanParser.ProcedureContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#function}.
	 * @param ctx the parse tree
	 */
	void enterFunction(ElanParser.FunctionContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#function}.
	 * @param ctx the parse tree
	 */
	void exitFunction(ElanParser.FunctionContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#constant}.
	 * @param ctx the parse tree
	 */
	void enterConstant(ElanParser.ConstantContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#constant}.
	 * @param ctx the parse tree
	 */
	void exitConstant(ElanParser.ConstantContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#class}.
	 * @param ctx the parse tree
	 */
	void enterClass(ElanParser.ClassContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#class}.
	 * @param ctx the parse tree
	 */
	void exitClass(ElanParser.ClassContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#enum}.
	 * @param ctx the parse tree
	 */
	void enterEnum(ElanParser.EnumContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#enum}.
	 * @param ctx the parse tree
	 */
	void exitEnum(ElanParser.EnumContext ctx);
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
	 * Enter a parse tree produced by {@link ElanParser#paramList}.
	 * @param ctx the parse tree
	 */
	void enterParamList(ElanParser.ParamListContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#paramList}.
	 * @param ctx the parse tree
	 */
	void exitParamList(ElanParser.ParamListContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#paramDef}.
	 * @param ctx the parse tree
	 */
	void enterParamDef(ElanParser.ParamDefContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#paramDef}.
	 * @param ctx the parse tree
	 */
	void exitParamDef(ElanParser.ParamDefContext ctx);
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
	 * Enter a parse tree produced by {@link ElanParser#singleLineStatement}.
	 * @param ctx the parse tree
	 */
	void enterSingleLineStatement(ElanParser.SingleLineStatementContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#singleLineStatement}.
	 * @param ctx the parse tree
	 */
	void exitSingleLineStatement(ElanParser.SingleLineStatementContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#multiLineStatement}.
	 * @param ctx the parse tree
	 */
	void enterMultiLineStatement(ElanParser.MultiLineStatementContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#multiLineStatement}.
	 * @param ctx the parse tree
	 */
	void exitMultiLineStatement(ElanParser.MultiLineStatementContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#var}.
	 * @param ctx the parse tree
	 */
	void enterVar(ElanParser.VarContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#var}.
	 * @param ctx the parse tree
	 */
	void exitVar(ElanParser.VarContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#set}.
	 * @param ctx the parse tree
	 */
	void enterSet(ElanParser.SetContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#set}.
	 * @param ctx the parse tree
	 */
	void exitSet(ElanParser.SetContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#call}.
	 * @param ctx the parse tree
	 */
	void enterCall(ElanParser.CallContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#call}.
	 * @param ctx the parse tree
	 */
	void exitCall(ElanParser.CallContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#throw}.
	 * @param ctx the parse tree
	 */
	void enterThrow(ElanParser.ThrowContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#throw}.
	 * @param ctx the parse tree
	 */
	void exitThrow(ElanParser.ThrowContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#print}.
	 * @param ctx the parse tree
	 */
	void enterPrint(ElanParser.PrintContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#print}.
	 * @param ctx the parse tree
	 */
	void exitPrint(ElanParser.PrintContext ctx);
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
	 * Enter a parse tree produced by {@link ElanParser#external}.
	 * @param ctx the parse tree
	 */
	void enterExternal(ElanParser.ExternalContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#external}.
	 * @param ctx the parse tree
	 */
	void exitExternal(ElanParser.ExternalContext ctx);
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
	 * Enter a parse tree produced by {@link ElanParser#let}.
	 * @param ctx the parse tree
	 */
	void enterLet(ElanParser.LetContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#let}.
	 * @param ctx the parse tree
	 */
	void exitLet(ElanParser.LetContext ctx);
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
	 * Enter a parse tree produced by {@link ElanParser#methodCall}.
	 * @param ctx the parse tree
	 */
	void enterMethodCall(ElanParser.MethodCallContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#methodCall}.
	 * @param ctx the parse tree
	 */
	void exitMethodCall(ElanParser.MethodCallContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#argList}.
	 * @param ctx the parse tree
	 */
	void enterArgList(ElanParser.ArgListContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#argList}.
	 * @param ctx the parse tree
	 */
	void exitArgList(ElanParser.ArgListContext ctx);
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
	 * Enter a parse tree produced by {@link ElanParser#else}.
	 * @param ctx the parse tree
	 */
	void enterElse(ElanParser.ElseContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#else}.
	 * @param ctx the parse tree
	 */
	void exitElse(ElanParser.ElseContext ctx);
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
	 * Enter a parse tree produced by {@link ElanParser#defaultCase}.
	 * @param ctx the parse tree
	 */
	void enterDefaultCase(ElanParser.DefaultCaseContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#defaultCase}.
	 * @param ctx the parse tree
	 */
	void exitDefaultCase(ElanParser.DefaultCaseContext ctx);
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
	 * Enter a parse tree produced by {@link ElanParser#term}.
	 * @param ctx the parse tree
	 */
	void enterTerm(ElanParser.TermContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#term}.
	 * @param ctx the parse tree
	 */
	void exitTerm(ElanParser.TermContext ctx);
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
	 * Enter a parse tree produced by {@link ElanParser#varRef}.
	 * @param ctx the parse tree
	 */
	void enterVarRef(ElanParser.VarRefContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#varRef}.
	 * @param ctx the parse tree
	 */
	void exitVarRef(ElanParser.VarRefContext ctx);
	/**
	 * Enter a parse tree produced by {@link ElanParser#defaultType}.
	 * @param ctx the parse tree
	 */
	void enterDefaultType(ElanParser.DefaultTypeContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#defaultType}.
	 * @param ctx the parse tree
	 */
	void exitDefaultType(ElanParser.DefaultTypeContext ctx);
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
	 * Enter a parse tree produced by {@link ElanParser#deconstructedList}.
	 * @param ctx the parse tree
	 */
	void enterDeconstructedList(ElanParser.DeconstructedListContext ctx);
	/**
	 * Exit a parse tree produced by {@link ElanParser#deconstructedList}.
	 * @param ctx the parse tree
	 */
	void exitDeconstructedList(ElanParser.DeconstructedListContext ctx);
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