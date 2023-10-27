public class WhileLoop : Frame, Statement
{
    public WhileLoop(string condition) : base()
    {
        Condition.EnterText(condition);
    }

    public StatementBlock StatementBlock { get; set; } = new StatementBlock();

    private Expression Condition { get; set; } = new Expression("condition");

    public string FrameName() => "While loop";

    public string RenderContent() => $@"{@while} {Condition} {NL} {StatementBlock} {NL} {end} {@while}{NL}";


}
