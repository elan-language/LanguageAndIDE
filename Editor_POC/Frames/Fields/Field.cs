// To consider. Should *every* field know whether it was:
// parsed text, frame, multipleChoice frame
// 0|1, 1,  0+_CommaSeparated, 0+_LineSeparated, 1+_CommaSeparated, 1+_LineSeparated  (0|1 means 'optional')

public abstract class Field
{
    public Field(string prompt, bool optional)
    {
        Prompt = prompt;
        Text = "";
        Optional = optional;
    }

    public bool Optional { get; init; }

    public string Prompt { get; init; }

    public string Text { get; set; }

    public abstract void EnterText(string text);

    public abstract string RenderValidContent();

}