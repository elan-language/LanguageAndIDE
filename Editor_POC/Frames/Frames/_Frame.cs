public abstract class Frame
{
    //KNOW WHAT/WHETHER

    // Own name
    // Fields (properties) concrete sub-classes only
    // IsEditable
    // IsLeafNode
    // Text (if LeafNode)
    // IsMultiLinePart
    // IsAFieldInItself
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