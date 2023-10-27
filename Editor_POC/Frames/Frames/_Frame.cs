public interface Frame
{
    public  string FrameName();

    //Called only when state of frame is valid
    public  string RenderContent();


    //KNOW WHAT/WHETHER

    // Own name (for listing as an option in right-click menu
    // Fields (properties) concrete sub-classes only
    // StartLineNo, and StartColNo

    //KNOW HOW TO
    // Determine whether cursor at (Line,Col) falls within this part, and if so whether on a field
    // Combine fields with fixed text (keywords & punctuations), formatted and coloured, to the screen at a specified start location



    //public virtual bool isRemovable() => false;

    //public abstract Part processText(string text);

    //protected IList<Part> subParts { get; set; } = new List<Part>();

    //public virtual bool mayBeEmpty => false;

    //public virtual bool wouldBeValidStart => false;
}