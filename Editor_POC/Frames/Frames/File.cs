public class File : Frame
{

    public File()
    {
    }

    private string version = "0.0-alpha"; //Temporarily hard-wired - will be looked up

    public List<Frame> topLevelConstructs { get; init; } = new List<Frame>();

    public void AddTopLevelConstruct(Frame topLevelConstruct)
    {
        topLevelConstructs.Add(topLevelConstruct);
    }

    public string RenderContent() => $@"
{comment} Elan {version}
{topLevelConstructs}
";

    public  string FrameName() => "File";
}