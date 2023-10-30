//Consists of contiguous run of keywords, spaces, newLines

public class FixedCode : SimpleFrame
{
    public FixedCode(Frame? superFrame, string markedUpText ) : base(superFrame, "")
    {
        Text = markedUpText;
        CanBeDeletedWithinSuperFrame = false;
        CanBeMovedOutOfSuperFrame = false;
        CanBeMovedWithinSuperFrame = false;
    }

    public override (bool, string) ParseText(string text)
    {
        return (true, text);
    }
}