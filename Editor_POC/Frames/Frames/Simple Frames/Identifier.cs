public class Identifier : SimpleFrame
{
    public Identifier(Frame? superFrame) : base(superFrame,"identifier")
    {
    }

    public override (bool, string) ParseText(string text)
    {
        throw new NotImplementedException();
    }
}