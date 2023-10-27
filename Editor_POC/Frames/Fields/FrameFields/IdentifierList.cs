public class IdentifierList : Field
{
    public IdentifierList(string prompt) : base(prompt, true)
    {
        AddIdentifier();
    }

    private List<Identifier> Identifiers;

    //Comma separated list
    public override string RenderValidContent()
    {
        return Identifiers.Count() == 0 ? "" :
         Identifiers.First().RenderValidContent() +
             Identifiers.Skip(1).Aggregate("", (s, pd) => s + "," + pd.RenderValidContent());
    }

    public override void EnterText(string text)
    {
        throw new NotImplementedException();
        // Should only be called  if typing occurs before, after, or between argyments, in which case a comma should
        //cause a new expression field to be added into the appropriate place in the list. No other text should be
        // accepted, however, cursor/tab/return should cause cursor movements into appropriate param def.
    }

    public void AddIdentifier()
    {
        Identifiers.Add(new Identifier("identifier"));
    }
}

