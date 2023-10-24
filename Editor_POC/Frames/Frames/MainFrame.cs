public class Main : Frame
{
    public ConstantDef()
    {
        Name = new ParsedField("name", ParseRules.Identifier);
        Value = new ParsedField("value", ParseRules.Literal);
    }

    private ParsedField Name { get; set; }

        
    public string definition() => $@"{Key.main} {NL} {Statements} {NL} {Key.end} {Key.main}";

}
