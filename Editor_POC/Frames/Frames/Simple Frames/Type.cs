public class Type : SimpleFrame
{
    public Type(Frame? superFrame) : base(superFrame, "Type")
    {
    }

    public override (bool, string) ParseText(string text)
    {
        //Enforce Regex rule for Typename (starting u.c.)
        throw new NotImplementedException();
    }
}