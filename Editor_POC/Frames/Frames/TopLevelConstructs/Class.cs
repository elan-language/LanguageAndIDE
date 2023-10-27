public class Class : TopLevelConstruct
{
    private OptionalKeyword Abstract = new OptionalKeyword(@abstract);

    private OptionalKeyword Immutable = new OptionalKeyword(@immutable);

    private Identifier Name = new Identifier("name");

    private Expression AsString = new Expression("expression");

    private MembersList Members = new MembersList("property, function or procedure", true);

    public StatementBlock StatementBlock { get; set; } = new StatementBlock();

    public string FrameName()
    {
        throw new NotImplementedException();
    }

    public string RenderContent()
    {
        return @$"
{Abstract} {Immutable} {@class} {Name}
  {@constructor}()
    {StatementBlock}
  {@end} {@constructor}

  {Members}

  {@function} asString() as String
    {@return} {AsString}
  {end} {function}
{@end} {@class}
";
    }

    public void AddMember(Member m)
    {
        throw new NotImplementedException();
    }
}