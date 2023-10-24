// Implemented by e.g. Statement, where the eventual frame will be one of a fixed set of Frame types

public class FrameChoice : Frame
{
    List<Frame> Choices;

    public FrameChoice(params Frame[] choices)
    {
        Choices = choices.ToList();
    }
}