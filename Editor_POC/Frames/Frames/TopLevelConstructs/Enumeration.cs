public class Enumeration : Frame, TopLevelConstruct
{
    private IdentifierList Values { get; set; } = new IdentifierList("enumValue"); 

    private Identifier Name { get; set; } = new Identifier("name");

    public string FrameName()
    {
        throw new NotImplementedException();
    }

    public string RenderContent()
    {
        return $@"
{@enumeration} {Name}{NL}
  {Values}
{@end} {enumeration} {NL}
";
    }
}