public  class Assignment : Frame, Statement
{
    public Assignment()
    {
        Variable = new Identifier("variable name");
        Expression = new Expression("expression"); 
    }
    public Assignment(string variable, string expression) : base()
    {
        Variable.EnterText(variable);
        Expression.EnterText(expression);
    }

    public ParsedField Variable { get; set; }

    public Expression Expression { get; set; }

    public  string RenderContent() => $"{Variable} = {Expression} {NL}";

    public  string FrameName() => "Assignment";


}