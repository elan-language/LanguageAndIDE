public abstract class ParsedField : Field
{
    public abstract Func<string, (bool, string)> ParseRule();

    public ParsedField(string prompt, bool optional) : base(prompt, optional) 
    {
    }

    public override void EnterText(string text)
    {
        throw new NotImplementedException();

    }

    public override string RenderValidContent() =>  Text;
}