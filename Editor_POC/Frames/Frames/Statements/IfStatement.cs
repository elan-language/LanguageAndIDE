public class IfStatement : Frame, Statement
{
    public IfStatement(string condition) : base()
    {
       Condition.EnterText(condition);
    }

    private Expression Condition { get; set; } = new Expression("condition");

    public StatementBlock StatementBlock { get; set; } = new StatementBlock();

    public  string FrameName() => "While loop";

    public  string RenderContent() => $@"{@if} {Condition} {then} {NL} {StatementBlock} {NL} {end} {@if}{NL}"; //TODO: need to accommodate else and else if clauses

}
