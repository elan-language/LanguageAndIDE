public class FunctionMethod : Frame, Member
{
    public StatementBlock StatementBlock { get; set; } = new StatementBlock();

    public Identifier Name { get; set; } = new Identifier("name");

    public Type ReturnType { get; set; } = new Type("Type (to return)");

    public OptionalKeyword Private { get; set; } = new OptionalKeyword(@private);

    public Expression ReturnExpression { get; set; } = new Expression("expression");


    public string FrameName()
    {
        throw new NotImplementedException();
    }

    public string RenderContent()
    {
        return @$"
{Private} {function} {Name}() {@as} {ReturnType} {NL}
  {StatementBlock}
  {@return} {ReturnExpression}
{end} {function} {NL}
";
    }
}

