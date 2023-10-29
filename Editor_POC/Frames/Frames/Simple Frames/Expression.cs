public class Expression : SimpleFrame
{
    public Expression(Frame? superFrame) : base(superFrame, "expression")
    {
    }

    public override (bool, string) ParseText(string text)
    {
        throw new NotImplementedException();
    }
}