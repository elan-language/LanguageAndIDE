public class Statement : SelectorFrame
{
    public Statement(Frame? superFrame) : base(superFrame, "statement", new Assignment(superFrame)) //etc
    {
    }
}