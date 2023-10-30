// Used in the 'inherits' clause
public class TypeList : ListFrame
{
    public TypeList(Frame? superFrame, string prompt) : base(superFrame, prompt)
    {
    }

    public override System.Type MemberType => typeof(Type);

    public override string Separator => "comma";
}

