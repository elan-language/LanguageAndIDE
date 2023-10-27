public  class VariableDeclaration : Frame, Statement
{
    public VariableDeclaration()
    {
        Variable = new Identifier("variable name");
        Expression = new Expression("expression"); 
    }
    public VariableDeclaration(string variable, string expression) : base()
    {
        Variable.EnterText(variable);
        Expression.EnterText(expression);
    }

    public ParsedField Variable { get; set; }

    public Expression Expression { get; set; }

    public  string RenderContent() => $"var {Variable} = {Expression} {NL}";

    public  string FrameName() => "Statement";


}