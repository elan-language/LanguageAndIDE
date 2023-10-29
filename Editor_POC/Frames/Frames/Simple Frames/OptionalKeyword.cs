// Examples:  private, abstract, immutable
// The keyword is either present or absent in this location
// Frame can be right-clicked to select the keyword, or will be recognised from first letter

public class OptionalKeyword : SimpleFrame
{
    public OptionalKeyword(Frame? superFrame, string keyword) : base(superFrame, keyword)
    {
    }

    public override (bool, string) ParseText(string text)
    {
        throw new NotImplementedException();
    }
}