public class Constant : CompoundFrame
{
    public Constant(Frame? superFrame, string prompt) : base(superFrame, prompt)
    {
        SubFrames.Add(new FixedCode(this, $"{@constant} "));
        SubFrames.Add(new Identifier(this));
        SubFrames.Add(new FixedCode(this, $" = "));
        SubFrames.Add(new Literal(this));
        SubFrames.Add(new NewLine(this));
    }
}
