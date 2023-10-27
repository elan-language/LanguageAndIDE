public  class CallStatement : Frame, Statement
{
    public CallStatement(string methodName, string arguments) : base()
    {
        MethodName.EnterText(methodName);
        Arguments.EnterText(arguments);
    }

    public Identifier MethodName { get; set; } = new Identifier("method name");

    public ArgumentList Arguments { get; set; } = new ArgumentList("arguments"); //Or is it 'expression' ?

    public  string RenderContent() => $"{MethodName}({Arguments}) {NL}";

    public  string FrameName() => "Statement";


}