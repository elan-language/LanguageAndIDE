' VB.NET with Elan 2.0.0-alpha1

' Turing Machine that converts a Year from decimal to roman numerals

' Run the program, enter the number to convert and watch the machine in action.

' This TM has 300+ transition rules! You can use the same TuringMachine class to solve

' a simpler task, just by writing rules in the same format:

' new Rule("currentState", "readSymbol", "newState", "writeSymbol", DirectionForHeadMove)

Sub main()
  Dim tm = New TuringMachine(initState, haltState) ' variable definition
  addRulesForRomanNumeralsInto(tm) ' call procedure
  Const dec = inputIntBetween("Enter a year:", 1, 3999)
  tm.setTape(dec.toString()) ' call procedure
  Dim steps = 0 ' variable definition
  While Not tm.isHalted()
    Dim rule = tm.findMatchingRule() ' variable definition
    tm.singleStep() ' call procedure
    steps = steps + 1 ' set
    clearPrintedText() ' call procedure
    print(tm.tape) ' call procedure
    printTab(tm.headPosition - 1, "^") ' call procedure
    print($"Step: {steps}") ' call procedure
    print($"State: {tm.currentState}") ' call procedure
    print($"Rule applied: {rule.toString()}") ' call procedure
    sleep_ms(40) ' call procedure
  End While
  print($"The roman numeral equivalent for {dec} is {tm.tape.trim()}") ' call procedure
End Sub

Const initState = "init"

Const haltState = "halt"

Class TuringMachine

  Public Sub New(initialState As String, haltState As String)
    Me.tape = "" ' set
    Me.initialState = initialState ' set
    Me.haltState = haltState ' set
    Me.rules = New List(Of Rule)() ' set
    Me.currentState = initialState ' set
    Me.headPosition = 0 ' set
  End Sub
  Function toString() As String
    Return ""
  End Function
  Property initialState As String
  Property currentState As String
  Property headPosition As Integer
  Property haltState As String
  Property rules As List(Of Rule)
  Property tape As String
  Sub setTape(tape As String) ' procedure
    Me.tape = tape ' set
  End Sub
  Sub append(rule As Rule) ' procedure
    Me.rules = Me.rules.withAppend(rule) ' set
  End Sub
  Sub singleStep() ' procedure
    Dim rule = Me.findMatchingRule() ' variable definition
    Me.execute(rule) ' call procedure
  End Sub
  Function isHalted() As Boolean
    Return Me.currentState.equals(Me.haltState)
  End Function
  Function findMatchingRule() As Rule
    Dim matches = Me.rules.filter(lambda r As Rule => (r.currentState.equals(Me.currentState)) And (r.currentSymbol.equals(Me.tape[Me.headPosition]))) ' variable definition
    If matches.length() = 0 Then
      Throw New ElanRuntimeError($"No rule matching state {Me.currentState} and symbol {Me.tape[Me.headPosition]}")
    End If
    Return matches.head()
  End Function
  Sub write(newSymbol As String) ' procedure
    Const hp = Me.headPosition
    Me.tape = Me.tape.subString(0, hp) + newSymbol + Me.tape.subString(hp + 1, Me.tape.length()) ' set
  End Sub
  Sub execute(rule As Rule) ' procedure
    Me.currentState = rule.nextState ' set
    Me.write(rule.writeSymbol) ' call procedure
    If rule.move = Dir.right Then
      Me.headPosition = Me.headPosition + 1 ' set
      If Me.headPosition >= Me.tape.length() Then
        Me.tape = Me.tape + " " ' set
      End If
    Else
      Me.headPosition = Me.headPosition - 1 ' set
      If Me.headPosition < 0 Then
        Me.tape = " " + Me.tape ' set
        Me.headPosition = 0 ' set
      End If
    End If
  End Sub
End Class

Class Rule

  Property currentState As String
  Property currentSymbol As String
  Property nextState As String
  Property writeSymbol As String
  Property move As Dir
  Public Sub New(currentState As String, currentSymbol As String, nextState As String, writeSymbol As String, move As Dir)
    Me.currentState = currentState ' set
    Me.currentSymbol = currentSymbol ' set
    Me.nextState = nextState ' set
    Me.writeSymbol = writeSymbol ' set
    Me.move = move ' set
  End Sub
  Function toString() As String
    Return $"{Me.currentState},{Me.currentSymbol},{Me.nextState},{Me.writeSymbol},{Me.move}"
  End Function
End Class

Enum Dir left, right

' rename this method and define new transition rules to solve a different problem

Sub addRulesForRomanNumeralsInto(tm As TuringMachine) ' procedure
  ' name: Denary to Roman "Numerals", initial state = "init", accept state = "halt"
  ' Example tape input: &nbsp;2024 (between 1 and 3999)
  tm.append(New Rule("init", "0", "init", "0", Dir.right)) ' call procedure
  tm.append(New Rule("init", "1", "init", "1", Dir.right)) ' call procedure
  tm.append(New Rule("init", "2", "init", "2", Dir.right)) ' call procedure
  tm.append(New Rule("init", "3", "init", "3", Dir.right)) ' call procedure
  tm.append(New Rule("init", "4", "init", "4", Dir.right)) ' call procedure
  tm.append(New Rule("init", "5", "init", "5", Dir.right)) ' call procedure
  tm.append(New Rule("init", "6", "init", "6", Dir.right)) ' call procedure
  tm.append(New Rule("init", "7", "init", "7", Dir.right)) ' call procedure
  tm.append(New Rule("init", "8", "init", "8", Dir.right)) ' call procedure
  tm.append(New Rule("init", "9", "init", "9", Dir.right)) ' call procedure
  tm.append(New Rule("init", " ", "return", "]", Dir.left)) ' call procedure
  ' read next digit
  tm.append(New Rule("readNextDigit", "0", "write0", "[", Dir.right)) ' call procedure
  tm.append(New Rule("readNextDigit", "1", "write1", "[", Dir.right)) ' call procedure
  tm.append(New Rule("readNextDigit", "2", "write2", "[", Dir.right)) ' call procedure
  tm.append(New Rule("readNextDigit", "3", "write3", "[", Dir.right)) ' call procedure
  tm.append(New Rule("readNextDigit", "4", "write4", "[", Dir.right)) ' call procedure
  tm.append(New Rule("readNextDigit", "5", "write5", "[", Dir.right)) ' call procedure
  tm.append(New Rule("readNextDigit", "6", "write6", "[", Dir.right)) ' call procedure
  tm.append(New Rule("readNextDigit", "7", "write7", "[", Dir.right)) ' call procedure
  tm.append(New Rule("readNextDigit", "8", "write8", "[", Dir.right)) ' call procedure
  tm.append(New Rule("readNextDigit", "9", "write9", "[", Dir.right)) ' call procedure
  tm.append(New Rule("readNextDigit", "]", "gotoEnd", " ", Dir.right)) ' call procedure
  ' write0
  tm.append(New Rule("write0", "0", "write0", "0", Dir.right)) ' call procedure
  tm.append(New Rule("write0", "1", "write0", "1", Dir.right)) ' call procedure
  tm.append(New Rule("write0", "2", "write0", "2", Dir.right)) ' call procedure
  tm.append(New Rule("write0", "3", "write0", "3", Dir.right)) ' call procedure
  tm.append(New Rule("write0", "4", "write0", "4", Dir.right)) ' call procedure
  tm.append(New Rule("write0", "5", "write0", "5", Dir.right)) ' call procedure
  tm.append(New Rule("write0", "6", "write0", "6", Dir.right)) ' call procedure
  tm.append(New Rule("write0", "7", "write0", "7", Dir.right)) ' call procedure
  tm.append(New Rule("write0", "8", "write0", "8", Dir.right)) ' call procedure
  tm.append(New Rule("write0", "9", "write0", "9", Dir.right)) ' call procedure
  tm.append(New Rule("write0", "]", "write0", "]", Dir.right)) ' call procedure
  tm.append(New Rule("write0", "I", "write0", "I", Dir.right)) ' call procedure
  tm.append(New Rule("write0", "V", "write0", "V", Dir.right)) ' call procedure
  tm.append(New Rule("write0", "X", "write0", "X", Dir.right)) ' call procedure
  tm.append(New Rule("write0", "|", "write0", "|", Dir.right)) ' call procedure
  tm.append(New Rule("write0", " ", "return", "|", Dir.left)) ' call procedure
  ' write1
  tm.append(New Rule("write1", "0", "write1", "0", Dir.right)) ' call procedure
  tm.append(New Rule("write1", "1", "write1", "1", Dir.right)) ' call procedure
  tm.append(New Rule("write1", "2", "write1", "2", Dir.right)) ' call procedure
  tm.append(New Rule("write1", "3", "write1", "3", Dir.right)) ' call procedure
  tm.append(New Rule("write1", "4", "write1", "4", Dir.right)) ' call procedure
  tm.append(New Rule("write1", "5", "write1", "5", Dir.right)) ' call procedure
  tm.append(New Rule("write1", "6", "write1", "6", Dir.right)) ' call procedure
  tm.append(New Rule("write1", "7", "write1", "7", Dir.right)) ' call procedure
  tm.append(New Rule("write1", "8", "write1", "8", Dir.right)) ' call procedure
  tm.append(New Rule("write1", "9", "write1", "9", Dir.right)) ' call procedure
  tm.append(New Rule("write1", "]", "write1", "]", Dir.right)) ' call procedure
  tm.append(New Rule("write1", "I", "write1", "I", Dir.right)) ' call procedure
  tm.append(New Rule("write1", "V", "write1", "V", Dir.right)) ' call procedure
  tm.append(New Rule("write1", "X", "write1", "X", Dir.right)) ' call procedure
  tm.append(New Rule("write1", "|", "write1", "|", Dir.right)) ' call procedure
  tm.append(New Rule("write1", " ", "write0", "I", Dir.right)) ' call procedure
  ' write2 &nbsp;
  tm.append(New Rule("write2", "0", "write2", "0", Dir.right)) ' call procedure
  tm.append(New Rule("write2", "1", "write2", "1", Dir.right)) ' call procedure
  tm.append(New Rule("write2", "2", "write2", "2", Dir.right)) ' call procedure
  tm.append(New Rule("write2", "3", "write2", "3", Dir.right)) ' call procedure
  tm.append(New Rule("write2", "4", "write2", "4", Dir.right)) ' call procedure
  tm.append(New Rule("write2", "5", "write2", "5", Dir.right)) ' call procedure
  tm.append(New Rule("write2", "6", "write2", "6", Dir.right)) ' call procedure
  tm.append(New Rule("write2", "7", "write2", "7", Dir.right)) ' call procedure
  tm.append(New Rule("write2", "8", "write2", "8", Dir.right)) ' call procedure
  tm.append(New Rule("write2", "9", "write2", "9", Dir.right)) ' call procedure
  tm.append(New Rule("write2", "]", "write2", "]", Dir.right)) ' call procedure
  tm.append(New Rule("write2", "I", "write2", "I", Dir.right)) ' call procedure
  tm.append(New Rule("write2", "V", "write2", "V", Dir.right)) ' call procedure
  tm.append(New Rule("write2", "X", "write2", "X", Dir.right)) ' call procedure
  tm.append(New Rule("write2", "|", "write2", "|", Dir.right)) ' call procedure
  tm.append(New Rule("write2", " ", "write1", "I", Dir.right)) ' call procedure
  ' write3 &nbsp;
  tm.append(New Rule("write3", "0", "write3", "0", Dir.right)) ' call procedure
  tm.append(New Rule("write3", "1", "write3", "1", Dir.right)) ' call procedure
  tm.append(New Rule("write3", "2", "write3", "2", Dir.right)) ' call procedure
  tm.append(New Rule("write3", "3", "write3", "3", Dir.right)) ' call procedure
  tm.append(New Rule("write3", "4", "write3", "4", Dir.right)) ' call procedure
  tm.append(New Rule("write3", "5", "write3", "5", Dir.right)) ' call procedure
  tm.append(New Rule("write3", "6", "write3", "6", Dir.right)) ' call procedure
  tm.append(New Rule("write3", "7", "write3", "7", Dir.right)) ' call procedure
  tm.append(New Rule("write3", "8", "write3", "8", Dir.right)) ' call procedure
  tm.append(New Rule("write3", "9", "write3", "9", Dir.right)) ' call procedure
  tm.append(New Rule("write3", "]", "write3", "]", Dir.right)) ' call procedure
  tm.append(New Rule("write3", "I", "write3", "I", Dir.right)) ' call procedure
  tm.append(New Rule("write3", "V", "write3", "V", Dir.right)) ' call procedure
  tm.append(New Rule("write3", "X", "write3", "X", Dir.right)) ' call procedure
  tm.append(New Rule("write3", "|", "write3", "|", Dir.right)) ' call procedure
  tm.append(New Rule("write3", " ", "write2", "I", Dir.right)) ' call procedure
  ' write4 &nbsp;
  tm.append(New Rule("write4", "0", "write4", "0", Dir.right)) ' call procedure
  tm.append(New Rule("write4", "1", "write4", "1", Dir.right)) ' call procedure
  tm.append(New Rule("write4", "2", "write4", "2", Dir.right)) ' call procedure
  tm.append(New Rule("write4", "3", "write4", "3", Dir.right)) ' call procedure
  tm.append(New Rule("write4", "4", "write4", "4", Dir.right)) ' call procedure
  tm.append(New Rule("write4", "5", "write4", "5", Dir.right)) ' call procedure
  tm.append(New Rule("write4", "6", "write4", "6", Dir.right)) ' call procedure
  tm.append(New Rule("write4", "7", "write4", "7", Dir.right)) ' call procedure
  tm.append(New Rule("write4", "8", "write4", "8", Dir.right)) ' call procedure
  tm.append(New Rule("write4", "9", "write4", "9", Dir.right)) ' call procedure
  tm.append(New Rule("write4", "]", "write4", "]", Dir.right)) ' call procedure
  tm.append(New Rule("write4", "I", "write4", "I", Dir.right)) ' call procedure
  tm.append(New Rule("write4", "V", "write4", "V", Dir.right)) ' call procedure
  tm.append(New Rule("write4", "X", "write4", "X", Dir.right)) ' call procedure
  tm.append(New Rule("write4", "|", "write4", "|", Dir.right)) ' call procedure
  tm.append(New Rule("write4", " ", "write5", "I", Dir.right)) ' call procedure
  ' write5
  tm.append(New Rule("write5", "0", "write5", "0", Dir.right)) ' call procedure
  tm.append(New Rule("write5", "1", "write5", "1", Dir.right)) ' call procedure
  tm.append(New Rule("write5", "2", "write5", "2", Dir.right)) ' call procedure
  tm.append(New Rule("write5", "3", "write5", "3", Dir.right)) ' call procedure
  tm.append(New Rule("write5", "4", "write5", "4", Dir.right)) ' call procedure
  tm.append(New Rule("write5", "5", "write5", "5", Dir.right)) ' call procedure
  tm.append(New Rule("write5", "6", "write5", "6", Dir.right)) ' call procedure
  tm.append(New Rule("write5", "7", "write5", "7", Dir.right)) ' call procedure
  tm.append(New Rule("write5", "8", "write5", "8", Dir.right)) ' call procedure
  tm.append(New Rule("write5", "9", "write5", "9", Dir.right)) ' call procedure
  tm.append(New Rule("write5", "]", "write5", "]", Dir.right)) ' call procedure
  tm.append(New Rule("write5", "I", "write5", "I", Dir.right)) ' call procedure
  tm.append(New Rule("write5", "V", "write5", "V", Dir.right)) ' call procedure
  tm.append(New Rule("write5", "X", "write5", "X", Dir.right)) ' call procedure
  tm.append(New Rule("write5", "|", "write5", "|", Dir.right)) ' call procedure
  tm.append(New Rule("write5", " ", "write0", "V", Dir.right)) ' call procedure
  ' write6
  tm.append(New Rule("write6", "0", "write6", "0", Dir.right)) ' call procedure
  tm.append(New Rule("write6", "1", "write6", "1", Dir.right)) ' call procedure
  tm.append(New Rule("write6", "2", "write6", "2", Dir.right)) ' call procedure
  tm.append(New Rule("write6", "3", "write6", "3", Dir.right)) ' call procedure
  tm.append(New Rule("write6", "4", "write6", "4", Dir.right)) ' call procedure
  tm.append(New Rule("write6", "5", "write6", "5", Dir.right)) ' call procedure
  tm.append(New Rule("write6", "6", "write6", "6", Dir.right)) ' call procedure
  tm.append(New Rule("write6", "7", "write6", "7", Dir.right)) ' call procedure
  tm.append(New Rule("write6", "8", "write6", "8", Dir.right)) ' call procedure
  tm.append(New Rule("write6", "9", "write6", "9", Dir.right)) ' call procedure
  tm.append(New Rule("write6", "]", "write6", "]", Dir.right)) ' call procedure
  tm.append(New Rule("write6", "I", "write6", "I", Dir.right)) ' call procedure
  tm.append(New Rule("write6", "V", "write6", "V", Dir.right)) ' call procedure
  tm.append(New Rule("write6", "X", "write6", "X", Dir.right)) ' call procedure
  tm.append(New Rule("write6", "|", "write6", "|", Dir.right)) ' call procedure
  tm.append(New Rule("write6", " ", "write1", "V", Dir.right)) ' call procedure
  ' write7
  tm.append(New Rule("write7", "0", "write7", "0", Dir.right)) ' call procedure
  tm.append(New Rule("write7", "1", "write7", "1", Dir.right)) ' call procedure
  tm.append(New Rule("write7", "2", "write7", "2", Dir.right)) ' call procedure
  tm.append(New Rule("write7", "3", "write7", "3", Dir.right)) ' call procedure
  tm.append(New Rule("write7", "4", "write7", "4", Dir.right)) ' call procedure
  tm.append(New Rule("write7", "5", "write7", "5", Dir.right)) ' call procedure
  tm.append(New Rule("write7", "6", "write7", "6", Dir.right)) ' call procedure
  tm.append(New Rule("write7", "7", "write7", "7", Dir.right)) ' call procedure
  tm.append(New Rule("write7", "8", "write7", "8", Dir.right)) ' call procedure
  tm.append(New Rule("write7", "9", "write7", "9", Dir.right)) ' call procedure
  tm.append(New Rule("write7", "]", "write7", "]", Dir.right)) ' call procedure
  tm.append(New Rule("write7", "I", "write7", "I", Dir.right)) ' call procedure
  tm.append(New Rule("write7", "V", "write7", "V", Dir.right)) ' call procedure
  tm.append(New Rule("write7", "X", "write7", "X", Dir.right)) ' call procedure
  tm.append(New Rule("write7", "|", "write7", "|", Dir.right)) ' call procedure
  tm.append(New Rule("write7", " ", "write2", "V", Dir.right)) ' call procedure
  ' write8
  tm.append(New Rule("write8", "0", "write8", "0", Dir.right)) ' call procedure
  tm.append(New Rule("write8", "1", "write8", "1", Dir.right)) ' call procedure
  tm.append(New Rule("write8", "2", "write8", "2", Dir.right)) ' call procedure
  tm.append(New Rule("write8", "3", "write8", "3", Dir.right)) ' call procedure
  tm.append(New Rule("write8", "4", "write8", "4", Dir.right)) ' call procedure
  tm.append(New Rule("write8", "5", "write8", "5", Dir.right)) ' call procedure
  tm.append(New Rule("write8", "6", "write8", "6", Dir.right)) ' call procedure
  tm.append(New Rule("write8", "7", "write8", "7", Dir.right)) ' call procedure
  tm.append(New Rule("write8", "8", "write8", "8", Dir.right)) ' call procedure
  tm.append(New Rule("write8", "9", "write8", "9", Dir.right)) ' call procedure
  tm.append(New Rule("write8", "]", "write8", "]", Dir.right)) ' call procedure
  tm.append(New Rule("write8", "I", "write8", "I", Dir.right)) ' call procedure
  tm.append(New Rule("write8", "V", "write8", "V", Dir.right)) ' call procedure
  tm.append(New Rule("write8", "X", "write8", "X", Dir.right)) ' call procedure
  tm.append(New Rule("write8", "|", "write8", "|", Dir.right)) ' call procedure
  tm.append(New Rule("write8", " ", "write3", "V", Dir.right)) ' call procedure
  ' write9
  tm.append(New Rule("write9", "0", "write9", "0", Dir.right)) ' call procedure
  tm.append(New Rule("write9", "1", "write9", "1", Dir.right)) ' call procedure
  tm.append(New Rule("write9", "2", "write9", "2", Dir.right)) ' call procedure
  tm.append(New Rule("write9", "3", "write9", "3", Dir.right)) ' call procedure
  tm.append(New Rule("write9", "4", "write9", "4", Dir.right)) ' call procedure
  tm.append(New Rule("write9", "5", "write9", "5", Dir.right)) ' call procedure
  tm.append(New Rule("write9", "6", "write9", "6", Dir.right)) ' call procedure
  tm.append(New Rule("write9", "7", "write9", "7", Dir.right)) ' call procedure
  tm.append(New Rule("write9", "8", "write9", "8", Dir.right)) ' call procedure
  tm.append(New Rule("write9", "9", "write9", "9", Dir.right)) ' call procedure
  tm.append(New Rule("write9", "]", "write9", "]", Dir.right)) ' call procedure
  tm.append(New Rule("write9", "I", "write9", "I", Dir.right)) ' call procedure
  tm.append(New Rule("write9", "V", "write9", "V", Dir.right)) ' call procedure
  tm.append(New Rule("write9", "X", "write9", "X", Dir.right)) ' call procedure
  tm.append(New Rule("write9", "|", "write9", "|", Dir.right)) ' call procedure
  tm.append(New Rule("write9", " ", "write10", "I", Dir.right)) ' call procedure
  ' Write10
  tm.append(New Rule("write10", " ", "write0", "X", Dir.right)) ' call procedure
  ' return &nbsp;
  tm.append(New Rule("return", "0", "return", "0", Dir.left)) ' call procedure
  tm.append(New Rule("return", "1", "return", "1", Dir.left)) ' call procedure
  tm.append(New Rule("return", "2", "return", "2", Dir.left)) ' call procedure
  tm.append(New Rule("return", "3", "return", "3", Dir.left)) ' call procedure
  tm.append(New Rule("return", "4", "return", "4", Dir.left)) ' call procedure
  tm.append(New Rule("return", "5", "return", "5", Dir.left)) ' call procedure
  tm.append(New Rule("return", "6", "return", "6", Dir.left)) ' call procedure
  tm.append(New Rule("return", "7", "return", "7", Dir.left)) ' call procedure
  tm.append(New Rule("return", "8", "return", "8", Dir.left)) ' call procedure
  tm.append(New Rule("return", "9", "return", "9", Dir.left)) ' call procedure
  tm.append(New Rule("return", "I", "return", "I", Dir.left)) ' call procedure
  tm.append(New Rule("return", "V", "return", "V", Dir.left)) ' call procedure
  tm.append(New Rule("return", "X", "return", "X", Dir.left)) ' call procedure
  tm.append(New Rule("return", "|", "return", "|", Dir.left)) ' call procedure
  tm.append(New Rule("return", "]", "return", "]", Dir.left)) ' call procedure
  tm.append(New Rule("return", "[", "readNextDigit", " ", Dir.right)) ' call procedure
  tm.append(New Rule("return", " ", "readNextDigit", " ", Dir.right)) ' call procedure
  ' gotoEnd - &nbsp;only after deleting input.
  tm.append(New Rule("gotoEnd", "|", "gotoEnd", "|", Dir.right)) ' call procedure
  tm.append(New Rule("gotoEnd", "I", "gotoEnd", "I", Dir.right)) ' call procedure
  tm.append(New Rule("gotoEnd", "V", "gotoEnd", "V", Dir.right)) ' call procedure
  tm.append(New Rule("gotoEnd", "X", "gotoEnd", "X", Dir.right)) ' call procedure
  tm.append(New Rule("gotoEnd", " ", "deleteLastBar", " ", Dir.left)) ' call procedure
  tm.append(New Rule("deleteLastBar", "|", "symbols1", " ", Dir.left)) ' call procedure
  ' symbols1
  tm.append(New Rule("symbols1", "I", "symbols1", "I", Dir.left)) ' call procedure
  tm.append(New Rule("symbols1", "V", "symbols1", "V", Dir.left)) ' call procedure
  tm.append(New Rule("symbols1", "X", "symbols1", "X", Dir.left)) ' call procedure
  tm.append(New Rule("symbols1", "|", "symbols10", "|", Dir.left)) ' call procedure
  tm.append(New Rule("symbols1", " ", "removeBars", " ", Dir.right)) ' call procedure
  tm.append(New Rule("symbols10", "I", "symbols10", "X", Dir.left)) ' call procedure
  tm.append(New Rule("symbols10", "V", "symbols10", "L", Dir.left)) ' call procedure
  tm.append(New Rule("symbols10", "X", "symbols10", "C", Dir.left)) ' call procedure
  tm.append(New Rule("symbols10", "|", "symbols100", "|", Dir.left)) ' call procedure
  tm.append(New Rule("symbols10", " ", "removeBars", " ", Dir.right)) ' call procedure
  tm.append(New Rule("symbols100", "I", "symbols100", "C", Dir.left)) ' call procedure
  tm.append(New Rule("symbols100", "V", "symbols100", "D", Dir.left)) ' call procedure
  tm.append(New Rule("symbols100", "X", "symbols100", "M", Dir.left)) ' call procedure
  tm.append(New Rule("symbols100", "|", "symbols1000", "|", Dir.left)) ' call procedure
  tm.append(New Rule("symbols100", " ", "removeBars", " ", Dir.right)) ' call procedure
  tm.append(New Rule("symbols1000", "I", "symbols1000", "M", Dir.left)) ' call procedure
  tm.append(New Rule("symbols1000", " ", "removeBars", " ", Dir.right)) ' call procedure
  ' Remove bars
  tm.append(New Rule("removeBars", "|", "removeBars", " ", Dir.right)) ' call procedure
  tm.append(New Rule("removeBars", "I", "moveI", " ", Dir.right)) ' call procedure
  tm.append(New Rule("removeBars", "V", "moveV", " ", Dir.right)) ' call procedure
  tm.append(New Rule("removeBars", "X", "moveX", " ", Dir.right)) ' call procedure
  tm.append(New Rule("removeBars", "L", "moveL", " ", Dir.right)) ' call procedure
  tm.append(New Rule("removeBars", "C", "moveC", " ", Dir.right)) ' call procedure
  tm.append(New Rule("removeBars", "D", "moveD", " ", Dir.right)) ' call procedure
  tm.append(New Rule("removeBars", "M", "moveM", " ", Dir.right)) ' call procedure
  tm.append(New Rule("nextChar", "|", "nextChar", "|", Dir.right)) ' call procedure
  tm.append(New Rule("nextChar", " ", "checkForBars", " ", Dir.left)) ' call procedure
  tm.append(New Rule("nextChar", "I", "moveI", "|", Dir.right)) ' call procedure
  tm.append(New Rule("nextChar", "V", "moveV", "|", Dir.right)) ' call procedure
  tm.append(New Rule("nextChar", "X", "moveX", "|", Dir.right)) ' call procedure
  tm.append(New Rule("nextChar", "L", "moveL", "|", Dir.right)) ' call procedure
  tm.append(New Rule("nextChar", "C", "moveC", "|", Dir.right)) ' call procedure
  tm.append(New Rule("nextChar", "D", "moveD", "|", Dir.right)) ' call procedure
  tm.append(New Rule("nextChar", "M", "moveM", "|", Dir.right)) ' call procedure
  ' moveI
  tm.append(New Rule("moveI", "|", "nextChar", "I", Dir.right)) ' call procedure
  tm.append(New Rule("moveI", "I", "writeI", "I", Dir.left)) ' call procedure
  tm.append(New Rule("moveI", "V", "writeI", "V", Dir.left)) ' call procedure
  tm.append(New Rule("moveI", "X", "writeI", "X", Dir.left)) ' call procedure
  tm.append(New Rule("moveI", " ", "writeI", " ", Dir.left)) ' call procedure
  ' moveV
  tm.append(New Rule("moveV", "|", "nextChar", "V", Dir.right)) ' call procedure
  tm.append(New Rule("moveV", "I", "writeV", "I", Dir.left)) ' call procedure
  tm.append(New Rule("moveV", " ", "writeV", " ", Dir.left)) ' call procedure
  ' moveX &nbsp;
  tm.append(New Rule("moveX", "|", "nextChar", "X", Dir.right)) ' call procedure
  tm.append(New Rule("moveX", "I", "writeX", "I", Dir.left)) ' call procedure
  tm.append(New Rule("moveX", "V", "writeX", "V", Dir.left)) ' call procedure
  tm.append(New Rule("moveX", "X", "writeX", "X", Dir.left)) ' call procedure
  tm.append(New Rule("moveX", "L", "writeX", "L", Dir.left)) ' call procedure
  tm.append(New Rule("moveX", "C", "writeX", "C", Dir.left)) ' call procedure
  tm.append(New Rule("moveX", " ", "writeX", " ", Dir.left)) ' call procedure
  ' moveL &nbsp;
  tm.append(New Rule("moveL", "|", "nextChar", "L", Dir.right)) ' call procedure
  tm.append(New Rule("moveL", "I", "writeL", "I", Dir.left)) ' call procedure
  tm.append(New Rule("moveL", "V", "writeL", "V", Dir.left)) ' call procedure
  tm.append(New Rule("moveL", "X", "writeL", "X", Dir.left)) ' call procedure
  tm.append(New Rule("moveL", " ", "writeL", " ", Dir.left)) ' call procedure
  ' moveC &nbsp;
  tm.append(New Rule("moveC", "|", "nextChar", "C", Dir.right)) ' call procedure
  tm.append(New Rule("moveC", "I", "writeC", "I", Dir.left)) ' call procedure
  tm.append(New Rule("moveC", "V", "writeC", "V", Dir.left)) ' call procedure
  tm.append(New Rule("moveC", "X", "writeC", "X", Dir.left)) ' call procedure
  tm.append(New Rule("moveC", "L", "writeC", "L", Dir.left)) ' call procedure
  tm.append(New Rule("moveC", "C", "writeC", "C", Dir.left)) ' call procedure
  tm.append(New Rule("moveC", "D", "writeC", "D", Dir.left)) ' call procedure
  tm.append(New Rule("moveC", "M", "writeC", "M", Dir.left)) ' call procedure
  tm.append(New Rule("moveC", " ", "writeC", " ", Dir.left)) ' call procedure
  ' moveD &nbsp;
  tm.append(New Rule("moveD", "|", "nextChar", "D", Dir.right)) ' call procedure
  tm.append(New Rule("moveD", "I", "writeD", "I", Dir.left)) ' call procedure
  tm.append(New Rule("moveD", "V", "writeD", "V", Dir.left)) ' call procedure
  tm.append(New Rule("moveD", "X", "writeD", "X", Dir.left)) ' call procedure
  tm.append(New Rule("moveD", "L", "writeD", "L", Dir.left)) ' call procedure
  tm.append(New Rule("moveD", "C", "writeD", "C", Dir.left)) ' call procedure
  tm.append(New Rule("moveD", " ", "writeD", " ", Dir.left)) ' call procedure
  ' moveM
  tm.append(New Rule("moveM", "|", "nextChar", "M", Dir.right)) ' call procedure
  tm.append(New Rule("moveM", "I", "writeM", "I", Dir.left)) ' call procedure
  tm.append(New Rule("moveM", "V", "writeM", "V", Dir.left)) ' call procedure
  tm.append(New Rule("moveM", "X", "writeM", "X", Dir.left)) ' call procedure
  tm.append(New Rule("moveM", "L", "writeM", "L", Dir.left)) ' call procedure
  tm.append(New Rule("moveM", "C", "writeM", "C", Dir.left)) ' call procedure
  tm.append(New Rule("moveM", "D", "writeM", "D", Dir.left)) ' call procedure
  tm.append(New Rule("moveM", "M", "writeM", "M", Dir.left)) ' call procedure
  tm.append(New Rule("moveM", " ", "writeM", " ", Dir.left)) ' call procedure
  ' write char
  tm.append(New Rule("writeI", "|", "nextChar", "I", Dir.right)) ' call procedure
  tm.append(New Rule("writeI", " ", "nextChar", "I", Dir.right)) ' call procedure
  tm.append(New Rule("writeV", "|", "nextChar", "V", Dir.right)) ' call procedure
  tm.append(New Rule("writeV", " ", "nextChar", "V", Dir.right)) ' call procedure
  tm.append(New Rule("writeX", "|", "nextChar", "X", Dir.right)) ' call procedure
  tm.append(New Rule("writeX", " ", "nextChar", "X", Dir.right)) ' call procedure
  tm.append(New Rule("writeL", "|", "nextChar", "L", Dir.right)) ' call procedure
  tm.append(New Rule("writeL", " ", "nextChar", "L", Dir.right)) ' call procedure
  tm.append(New Rule("writeC", "|", "nextChar", "C", Dir.right)) ' call procedure
  tm.append(New Rule("writeC", " ", "nextChar", "C", Dir.right)) ' call procedure
  tm.append(New Rule("writeD", "|", "nextChar", "D", Dir.right)) ' call procedure
  tm.append(New Rule("writeD", " ", "nextChar", "D", Dir.right)) ' call procedure
  tm.append(New Rule("writeM", "|", "nextChar", "M", Dir.right)) ' call procedure
  tm.append(New Rule("writeM", " ", "nextChar", "M", Dir.right)) ' call procedure
  ' checkForBars &nbsp;
  tm.append(New Rule("checkForBars", "I", "checkForBars", "I", Dir.left)) ' call procedure
  tm.append(New Rule("checkForBars", "V", "checkForBars", "V", Dir.left)) ' call procedure
  tm.append(New Rule("checkForBars", "X", "checkForBars", "X", Dir.left)) ' call procedure
  tm.append(New Rule("checkForBars", "L", "checkForBars", "L", Dir.left)) ' call procedure
  tm.append(New Rule("checkForBars", "C", "checkForBars", "C", Dir.left)) ' call procedure
  tm.append(New Rule("checkForBars", "D", "checkForBars", "D", Dir.left)) ' call procedure
  tm.append(New Rule("checkForBars", "M", "checkForBars", "M", Dir.left)) ' call procedure
  tm.append(New Rule("checkForBars", "|", "barFound", "|", Dir.left)) ' call procedure
  tm.append(New Rule("checkForBars", " ", "halt", " ", Dir.right)) ' call procedure
  ' barFound
  tm.append(New Rule("barFound", "I", "barFound", "I", Dir.left)) ' call procedure
  tm.append(New Rule("barFound", "V", "barFound", "V", Dir.left)) ' call procedure
  tm.append(New Rule("barFound", "X", "barFound", "X", Dir.left)) ' call procedure
  tm.append(New Rule("barFound", "L", "barFound", "L", Dir.left)) ' call procedure
  tm.append(New Rule("barFound", "C", "barFound", "C", Dir.left)) ' call procedure
  tm.append(New Rule("barFound", "D", "barFound", "D", Dir.left)) ' call procedure
  tm.append(New Rule("barFound", "M", "barFound", "M", Dir.left)) ' call procedure
  tm.append(New Rule("barFound", "|", "barFound", "|", Dir.left)) ' call procedure
  tm.append(New Rule("barFound", " ", "removeBars", " ", Dir.right)) ' call procedure
End Sub
