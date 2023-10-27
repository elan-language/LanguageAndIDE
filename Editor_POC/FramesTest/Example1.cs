using System.Linq.Expressions;

public static class Example1
{
    public static File CreateTree()
    {
        var file = new File();
        var m = new MainRoutine();
        file.AddTopLevelConstruct(m);       
        //m.AddStatement(new CallStatement("printLine", "welcome")); 
        //m.AddStatement(new VariableDeclaration("k","readKey()")); 
        //m.AddStatement(new VariableDeclaration("newGame", "true"));      
        //var while1 = new WhileLoop("newGame"); 
        //m.AddStatement(while1);

        //while1.AddStatement(new CallStatement("playGame", "")); 
        //while1.AddStatement(new CallStatement("print", "\"Do you want to play again (y/n)?\")")); 
        //while1.AddStatement(new VariableDeclaration("answer", "' '")); 

        //var repeat1 = new RepeatUntil("answer is 'y' or answer is 'n' ");
        //while1.AddStatement(repeat1);
        //repeat1.AddStatement(new Assignment("answer", "readKey()"));

        //var if1 = new IfStatement("answer is 'n'");
        //while1.AddStatement(if1);
        //if1.AddStatement(new Assignment("newGame", "false"));

        return file;
    }
}