public abstract class Frame
{
    public Frame(Frame? superFrame, string prompt )
    {
            SuperFrame = superFrame;
            Prompt = prompt;
    }

    public Frame? SuperFrame { get; set; }

    public bool Optional { get; init; }

    //TODO - could make these abstract
    public bool CanBeDeletedWithinSuperFrame { get; init; }
    public bool CanBeMovedWithinSuperFrame { get; init; }
    public bool CanBeMovedOutOfSuperFrame { get; init; }

    //TODO: Immediate deletion ? i.e. remove incorrectly added

    public string Prompt { get; init; }

    public string Text { get; set; } = "";

    public bool HasFocus { get; }
    
    public (int, int) CursorPosition { get; set; } //Relevant only if HasFocus


    public abstract int LengthInChars();

    public abstract int Lines();

    public  abstract string RenderCodeAsHtml();

    public abstract string ProcessKeystroke(char key, int row, int col);

}