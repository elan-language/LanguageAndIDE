public class Literal : SimpleFrame
{
    public Literal(Frame? superFrame) : base(superFrame, "literal value")
    {
    }

    public override (bool, string) ParseText(string text)
    {
        throw new NotImplementedException();
    }
}