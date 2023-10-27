public abstract class OptionalSingleFrameField : Field
{
    //optional true & multiple true means 0..n, optional false & multiple true means 1..n
    // Separator applies only for multiple and is typically comma or newLine
    public OptionalSingleFrameField(string prompt, Frame frame) : base(prompt, true) {
        Frame = frame;
    }

    protected Frame Frame;

    public override void EnterText(string text)
    {
        throw new NotImplementedException();
    }

    public abstract List<string> FieldSpecificMenuOptions();
}



