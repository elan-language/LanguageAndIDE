public class ArgumentList : Field
{
    public ArgumentList(string prompt) : base(prompt, true)
    {
        AddArgument();
    }

    private List<Expression> Arguments;

    //Comma separated list
    public override string RenderValidContent()
    {
        return Arguments.Count() == 0 ? "" :
         Arguments.First().RenderValidContent() +
             Arguments.Skip(1).Aggregate("", (s, pd) => s + "," + pd.RenderValidContent());
    }

    public override void EnterText(string text)
    {
        throw new NotImplementedException();
        // Should only be called  if typing occurs before, after, or between argyments, in which case a comma should
        //cause a new expression field to be added into the appropriate place in the list. No other text should be
        // accepted, however, cursor/tab/return should cause cursor movements into appropriate param def.
    }

    public void AddArgument()
    {
        Arguments.Add(new Expression("value or expression"));
    }
}

