public class ParameterList : Field
{
    public ParameterList(string prompt) : base(prompt, true)
    {
        AddParameter();
    }

    private List<ParameterDef> Parameters;

    //Comma separated list
    public override string RenderValidContent()
    {
        return Parameters.Count() == 0 ? "" :
         Parameters.First().RenderContent() +
             Parameters.Skip(1).Aggregate("", (s, pd) => s + "," + pd.RenderContent());
    }
        
    public override void EnterText(string text)
    {
        throw new NotImplementedException();
        // Should only be called  if typing occurs before, after, or between parameter defs, in which case a comma should
        //cause a new parameterDef field to be added into the appropriate place in the list. No other text should be
        // accepted, however, cursor/tab/return should cause cursor movements into appropriate param def.
    }

    public void AddParameter()
    {
        Parameters.Add(new ParameterDef());
    }
}

