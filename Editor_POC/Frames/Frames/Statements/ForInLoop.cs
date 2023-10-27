public class ForIn : Frame, Statement
{
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

    public StatementBlock StatementBlock { get; set; } = new StatementBlock();

}