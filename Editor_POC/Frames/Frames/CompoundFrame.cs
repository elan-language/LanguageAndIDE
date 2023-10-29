public abstract class CompoundFrame : Frame
{
    public CompoundFrame(Frame? superFrame, string prompt) : base(superFrame, prompt)
    {
    }

    public override string RenderCodeAsHtml()
    {
        // Aggregate equivalent method on all sub frames
        throw new NotImplementedException();
    }

    public override int LengthInChars()
    {
        return 0; //Aggregate of same method in subFrames
    }

    public override int Lines()
    {
        //Aggregate of same method in subFrames
        throw new NotImplementedException ();
    }

    public override string ProcessKeystroke(char key, int row, int col)
    {
        throw new NotImplementedException();
    }
}