' VB.NET with Elan 2.0.0-beta2

Sub main()
  Dim order = inputIntBetween("Enter order of dragon (1..12): ", 1, 12) ' variable definition
  clearPrintedText() ' procedure call
  Console.WriteLine($"Dragon of order {order}") ' print statement
  Dim side = (75/pow(sqrt(2), order)) ' variable definition
  Dim corner = side/12.0/cos(45) ' variable definition
  Dim turns = left ' variable definition
  For Each i In range(1, order + 1)
    turns = setTurns(turns) ' assignment
  Next i
  Dim t = New Turtle() ' variable definition
  setupTurtle(t, order) ' procedure call
  drawDragon(t, order, turns, side, corner) ' procedure call
End Sub

Const left = "1"

Const right = "0"

Sub drawDragon(t As Turtle, order As Integer, turns As String, side As Double, corner As Double) ' procedure
  Dim p = (200.0/order).floor() ' variable definition
  Dim turnI = 0 ' variable definition
  For Each turn In turns
    turnI = (if_(turn.equals(left), 1, -1)) ' assignment
    t.turn(-45*turnI) ' procedure call
    t.move(corner) ' procedure call
    t.turn(-45*turnI) ' procedure call
    t.move(side) ' procedure call
    sleep_ms(p) ' procedure call
  Next turn
  t.penUp() ' procedure call
  t.hide() ' procedure call
End Sub

Sub setupTurtle(t As Turtle, order As Integer) ' procedure
  t.turnToHeading(180 + order*45) ' procedure call
  t.placeAt(-40, 20) ' procedure call
  t.penColour(red) ' procedure call
  t.penWidth(10.0/order) ' procedure call
  t.penDown() ' procedure call
  t.show() ' procedure call
End Sub

Function setTurns(turns As String) As String
  Dim turnsR = turns + left + reflect(turns) ' variable definition
  ' turnsR[0..turnsR.length() - 1]
  Return turnsR.subString(0, turnsR.length() - 1)
End Function

Function reflect(s As String) As String
  Dim sR = "" ' variable definition
  For Each i In range(1, s.length() + 1)
    sR = if_((s(i - 1)).equals(left), right, left) + sR ' assignment
  Next i
  Return sR
End Function

<TestClass Class Test_setTurns
 <TestMethod> Sub test_setTurns()
  Assert.AreEqual("11", setTurns("1"))
  Assert.AreEqual("1110", setTurns("11"))
  Assert.AreEqual("110110", setTurns("110"))
  Assert.AreEqual("11011001110010", setTurns("1101100"))
 End Sub
End Class


<TestClass Class Test_reflect
 <TestMethod> Sub test_reflect()
  Assert.AreEqual("100", reflect("110"))
  Assert.AreEqual("01111", reflect("00001"))
 End Sub
End Class

