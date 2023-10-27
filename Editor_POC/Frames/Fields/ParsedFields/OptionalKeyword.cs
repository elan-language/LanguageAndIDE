// Examples:  private, abstract, immutable
// The keyword is either present or absent in this location
// Field can be right-clicked to select the keyword, or will be recognised from first letter

public class OptionalKeyword : ParsedField
{
    private readonly string keyword;

    public OptionalKeyword(string keyword) : base(keyword, true)
    {
            this.keyword = keyword; 
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