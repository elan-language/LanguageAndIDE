public class TopLevelConstruct : SelectorFrame
{
    public TopLevelConstruct(Frame? superFrame, string prompt) : base(superFrame, prompt, new MainRoutine(superFrame)) //etc.
    {
    }

}