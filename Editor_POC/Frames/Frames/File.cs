public class File : Frame
{
    public File()
    {
        code = new LineSeparatedList<TopLevelConstruct> ("Code");
    }

    private string version = "0.0-alpha"; //Temporarily hard-wired - will be looked up

    public LineSeparatedList<TopLevelConstruct> code { get; init; }

    public override string definition() => $@"
{comment} Elan {version}
{code}
";
}