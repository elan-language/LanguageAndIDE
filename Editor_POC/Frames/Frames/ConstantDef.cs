public class Main : Frame
{
    public Main()
    {
        Name = new ParsedField("name", ParseRules.Identifier);
        Value = new ParsedField("value", ParseRules.Literal);
    }

    private ParsedField Name { get; set; }

    private ParsedField Value { get; set; } 
        
    public string definition() => $@"{Key.constant} {Name} = {Value} {NL}";

}
