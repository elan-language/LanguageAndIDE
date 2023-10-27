public class Property : Frame, Member
{
    private Identifier Name { get; set; } = new Identifier("name");

    private Type PropertyType { get; set; } = new Type("Type");

    private OptionalKeyword Private { get; set; } = new OptionalKeyword(@private);


    public string FrameName()
    {
        throw new NotImplementedException();
    }

    public string RenderContent()
    {
        return $@"{Private} {property} {Name} {PropertyType}{NL}";
    }
}
