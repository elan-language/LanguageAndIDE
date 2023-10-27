public class MainRoutine : TopLevelConstruct
{
    public StatementBlock StatementBlock { get; set; } = new StatementBlock();

    public  string FrameName() => "Main routine";

    public  string RenderContent() => $@"{main} {NL} {StatementBlock} {NL} {end} {main}";
}
