public class StatementBlock : ListFrame
{
    protected StatementBlock(Frame? superFrame, string prompt) : base(superFrame, prompt)
    {
    }

    public override System.Type MemberType => typeof(Statement);

    public override string Separator => "newLine";
}