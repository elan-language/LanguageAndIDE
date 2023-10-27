public class Function : Frame, TopLevelConstruct
{
    public StatementBlock StatementBlock {  get; set; } = new StatementBlock();

    public Identifier Name { get; set; } = new Identifier("name");

    public Type ReturnType { get; set; } = new Type("Type (to return)");

    public Expression ReturnExpression { get; set; } = new Expression("expression");

    public void AddStatement(Frame s)
    {
        throw new NotImplementedException();
    }

    public string FrameName()
    {
        throw new NotImplementedException();
    }

    public string RenderContent()
    {
        return @$"
{function} {Name}() {@as} {ReturnType} {NL}
  {StatementBlock}
  {@return} {ReturnExpression}
{end} {function} {NL}
";
    }

}

