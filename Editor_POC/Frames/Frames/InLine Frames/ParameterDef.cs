public class ParameterDef : Frame
{
    private Identifier Name { get; set; } =    new Identifier("name");

    private Type Type { get; set; } = new Type("Type");

    public string FrameName()
    {
        throw new NotImplementedException();
    }

    public string RenderContent()
    {
        return $@"{Name} {Type}";
    }
}