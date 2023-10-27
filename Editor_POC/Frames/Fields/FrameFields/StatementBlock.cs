public class StatementBlock : Field
{
    public StatementBlock() : base("statement", true)
    {
    }

    private List<Frame> Statements;

    public override string RenderValidContent()
    {
        throw new NotImplementedException();
        //Remember that statements are line separated
    }

    public override void EnterText(string text)
    {
        throw new NotImplementedException();
    }

    public void AddNewStatement()
    {
        throw new NotImplementedException();
    }
}

