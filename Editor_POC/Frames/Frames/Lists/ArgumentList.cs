
public class ArgumentList : ListFrame
{
    public ArgumentList(Frame? superFrame, string prompt) : base(superFrame, prompt)
    {
    }

    public override System.Type MemberType => typeof(Expression);

    public override string Separator => ",";
}

