public abstract class SimpleFrame : Frame
{
    public SimpleFrame(Frame? superFrame, string prompt) : base(superFrame,prompt)
    {
    }

    public override string RenderCodeAsHtml()
    {
        // Return text, suitably marked up
        throw new NotImplementedException();
    }

    public override int LengthInChars()
    {
        return Text.Length;
    }

    public override int Lines()
    {
        //return count of newLines in Text + 1
        throw new NotImplementedException();
    }

    public abstract (bool, string) ParseText(string text);

    public override string ProcessKeystroke(char key, int row, int col)
    {
        throw new NotImplementedException();
    }

}