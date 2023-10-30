public class ClassMember : SelectorFrame
{
    public ClassMember(Frame? superFrame) : base(superFrame, "property, function, or procedure", new Property(superFrame)) //etc
    {
    }
}