public abstract class Frame
{
    public Frame(Frame? superFrame, string prompt )
    {
            SuperFrame = superFrame;
            Prompt = prompt;
    }

    public Frame? SuperFrame { get; set; }

    public bool Optional { get; init; }

    public bool CannotBeDeletedWithinSuperFrame { get; init; }

    public string Prompt { get; init; }

    public string Text { get; set; } = "";


    public abstract int LengthInChars();

    public abstract int Lines();

    public  abstract string RenderCodeAsHtml();

    public abstract string ProcessKeystroke(char key, int row, int col);

}