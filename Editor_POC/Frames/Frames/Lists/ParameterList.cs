public class ParameterList : ListFrame
{
    public ParameterList(Frame? superFrame, string prompt) : base(superFrame, prompt)
    {
    }

    public override System.Type MemberType => typeof(ParameterDef);

    public override string Separator => "comma";
}

