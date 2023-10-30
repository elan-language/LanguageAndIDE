public class EnumerationValuesList : ListFrame
{
    public EnumerationValuesList(Frame? superFrame, string prompt) : base(superFrame, prompt)
    {
    }

    public override System.Type MemberType => typeof(Identifier);

    public override string Separator => "comma";
}

