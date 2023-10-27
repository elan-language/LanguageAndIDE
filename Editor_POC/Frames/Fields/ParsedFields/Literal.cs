public class Literal : ParsedField
{
    public Literal(string prompt) : base(prompt, false)
    {
    }

    public override void EnterText(string text)
    {
        throw new NotImplementedException();
    }

    public override Func<string, (bool, string)> ParseRule()
    {
        throw new NotImplementedException();
    }
}