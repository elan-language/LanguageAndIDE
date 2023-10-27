// Choice of Property, Function, Procedure (last two with 'private' option)

public class MembersList : Field
{
    public MembersList(string prompt, bool optional) : base(prompt, true)
    {
    }

    private Member Member { get; set; }

    public override void EnterText(string text)
    {
        throw new NotImplementedException();
    }

    public override string RenderValidContent()
    {
        throw new NotImplementedException();
    }


}

