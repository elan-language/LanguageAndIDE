public class TopLevelConstructList : ListFrame
{
    public TopLevelConstructList(Frame? superFrame, string prompt) : base(superFrame, prompt)
    {
    }

    public override System.Type MemberType => typeof(TopLevelConstruct);

    public override string Separator => "newLine";
}