public class Constant : Frame, TopLevelConstruct
{
    public Constant()
    {
        Name = new Identifier("name");
        Value = new Literal("value");
    }

    private ParsedField Name { get; set; }

    private ParsedField Value { get; set; } 
        
    public string definition() => $@"{@constant} {Name} = {Value} {NL}";

    public string FrameName()
    {
        throw new NotImplementedException();
    }

    public string RenderContent()
    {
        throw new NotImplementedException();
    }
}
