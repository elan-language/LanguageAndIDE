//A list of one or more (zero or more if optional = true) of a given frame type, separated by a specified separator

public abstract class ListFrame : CompoundFrame
{
    protected ListFrame(Frame? superFrame, string prompt) : base(superFrame, prompt)
    {
    }

    public abstract System.Type MemberType { get; }

public abstract string Separator { get; }
}
