using System.ComponentModel;
using System.Data.Common;
using System.Runtime.CompilerServices;
using System.Text.RegularExpressions;

// All frames should have:
// Can accept char c
// Can delete last char ?
// Append char to text
// Instantiate with (valid) text.
// delete last char from text ?
// Status: empty, incomplete, complete - should never be grammatically invalid. 
// Optional (true/false)

// Selectors: no common implementation. One holds accumulating text and tests using a single method that
// tests all cases specific to its own decision. And it instantiates sub-frames as needed
// placing the cursor according to how much text was supplied - which may be within hard text.
// Note that more than one space is ignored (except in literal string). 

// Entered spaces are generally ignored (unless in literals) but are added back in to the rendered code. Note, however,
// that a space will be recognised as a terminator for a frame, and may be necessary for e.g. signifying transition from
// a keyword to an identifer.
// It also follows that when editing, it needs to be possible to locate cursor at the end or beginning of any items separated
// by a space.

public abstract class Frame
{
    protected string text;
    protected string prompt;
    public FrameStatus Status { get; protected set; }
    public bool Optional { get; protected set; }

    public Frame? parent { get; protected set; }

    public Frame(Frame? parent, string prompt = "")
    {
        this.parent = parent;
        this.prompt = prompt;
        this.Status = FrameStatus.empty;
        Optional = false;
    }

    //Maybe these two could be put into one tryAppend(char c) returning Frame and optional error message.
    public abstract bool canAppend(char c);
    public abstract Frame append(char c);

}

public enum FrameStatus
{
    empty, incomplete, complete
}

public class File : Frame
{
    public File(Frame? parent, string prompt = "") : base(parent, prompt)
    {
        header = new FixedText(this, "Elan v 0.0");
        globalSelector = new GlobalSelector(this, "main, constant, procedure, function, class, enum");
    }

    public override Frame append(char c)
    {
        throw new NotImplementedException();
    }

    public override bool canAppend(char c)
    {
        throw new NotImplementedException();
    }

    private FixedText header { get; set; }

    private GlobalSelector globalSelector { get; set; } 
}

public class FixedText : Frame
{
    public FixedText(Frame? parent, string prompt = "") : base(parent, prompt)
    {
        this.text = text;
    }

    public override Frame append(char c)
    {
        throw new NotImplementedException();
    }

    public override bool canAppend(char c)
    {
        throw new NotImplementedException();
    }
}

public class GlobalSelector : Frame
{
    public GlobalSelector(Frame? parent, string prompt = "") : base(parent, prompt)
    {
    }

    public override Frame append(char c)
    {
        text += c;
        switch (text)
        {
            case "m":
                Selected = new Main(this);
                return Selected;
            case "co":
                Selected = new Constant(this);
                return Selected;
            //TODO: others
        }
        return Selected ?? this;
    }

    public override bool canAppend(char c)
    {
        throw new NotImplementedException();
    }

    private Frame? Selected { get; set; }


}

public class Main : Frame
{
    public Main(Frame? parent, string prompt = "") : base(parent, prompt)
    {
    }

    public override Frame append(char c)
    {
        throw new NotImplementedException();
    }

    public override bool canAppend(char c)
    {
        throw new NotImplementedException();
    }
}

public class Constant : Frame
{
    public Constant(Frame? parent, string prompt = "") : base(parent, prompt)
    {
        kw_constant = new FixedText(this, "constant");
        identifier = new Identifier(this);
        kw_is = new FixedText(this, "is");
        value = new Value(this);
    }

    public override Frame append(char c)
    {
        throw new NotImplementedException();
    }

    public override bool canAppend(char c)
    {
        throw new NotImplementedException();
    }

    private FixedText kw_constant { get; set; }

    private Frame identifier { get; set; }

    private FixedText kw_is { get; set; }

    private Frame value { get; set; }

}

public class Identifier : Frame
{
    public Identifier(Frame? parent, string prompt = "") : base(parent, prompt)
    {
    }

    public override Frame append(char c)
    {
        throw new NotImplementedException();
    }

    public override bool canAppend(char c)
    {
        throw new NotImplementedException();
    }
}

public class Value : Frame
{
    public Value(Frame? parent, string prompt = "") : base(parent, prompt)
    {
    }

    public override Frame append(char c)
    {
        throw new NotImplementedException();
    }

    public override bool canAppend(char c)
    {
        throw new NotImplementedException();
    }
}



