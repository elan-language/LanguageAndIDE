public class ForLoop : Frame, Statement
{
    public StatementBlock StatementBlock { get; set; } = new StatementBlock();

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
        throw new NotImplementedException();
    }

    public string StatementBlockRendered()
    {
        throw new NotImplementedException();
    }
}