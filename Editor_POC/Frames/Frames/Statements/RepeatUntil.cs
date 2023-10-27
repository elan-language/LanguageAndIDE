public class RepeatUntil : Frame, Statement
{
    public RepeatUntil(string condition) : base()
    {
       Condition.EnterText(condition);
    }

    private Expression Condition { get; set; } = new Expression("condition");

    public StatementBlock StatementBlock { get; set; } = new StatementBlock();


    public  string FrameName() => "Repeat Until loop";

    public  string RenderContent() => $@"{repeat} {NL} {StatementBlock} {NL} {until} {Condition}{NL}";
}
