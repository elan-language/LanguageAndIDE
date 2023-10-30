//Holds an (optional?) single frame, but will be one of a selection, and therefore will act as a pass-through
public abstract class SelectorFrame : Frame
{
    public SelectorFrame(Frame? superFrame, string prompt, params Frame[] candidates) : base(superFrame, prompt)
    {
        Candidates = candidates.ToList();
    }

    protected Frame? SelectedFrame { get; set; }

    public  List<Frame> Candidates { get; init; }

    public override int LengthInChars()
    {
        //pass through to selected frame
        throw new NotImplementedException();
    }

    public override int Lines()
    {
        //pass through to selected frame
        throw new NotImplementedException();
    }

    public override string ProcessKeystroke(char key, int row, int col)
    {
        //pass through to selected frame
        throw new NotImplementedException();
    }

    public override string RenderCodeAsHtml()
    {
        //pass through to selected frame
        throw new NotImplementedException();
    }
}

