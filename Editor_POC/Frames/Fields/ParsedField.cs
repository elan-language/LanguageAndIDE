// examples: Identifier, Expression, Type

public class ParsedField : Field
{
    Func<string, (bool, string)> parseRule { get; init; }

    public ParsedField(string prompt, Func<string, (bool, string)> rule) : base(prompt)
    {
        this.parseRule = rule;
    }
}