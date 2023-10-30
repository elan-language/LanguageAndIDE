public class Identifier : SimpleFrame
{
    public Identifier(Frame? superFrame) : base(superFrame,"name")
    {
    }

    public override (bool, string) ParseText(string text)
    {
        throw new NotImplementedException();
    }
}