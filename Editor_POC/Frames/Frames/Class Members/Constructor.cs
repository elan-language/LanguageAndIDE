public class Constructor : CompoundFrame
{
    public Constructor(Frame? superFrame) : base(superFrame, "")
    {
        CannotBeDeletedWithinSuperFrame = true;
    }
}

