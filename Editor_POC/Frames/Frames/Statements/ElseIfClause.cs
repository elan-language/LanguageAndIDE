public class ElseIfClause : Frame
{

    private Expression Condition { get; set; }

    public List<Frame> StatementBlock { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

    public void AddStatement(Frame s)
    {
        throw new NotImplementedException();
    }

    public string FrameName()
    {
        throw new NotImplementedException();
    }

    public string RenderContent()
    {
        return $"{@else} {@if} {Condition} {then} {NL}{StatementBlockRendered()}{NL}";
    }

    public string StatementBlockRendered()
    {
        throw new NotImplementedException();
    }
}