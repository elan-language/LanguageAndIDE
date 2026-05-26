' VB.NET with Elan 2.0.0-alpha5

Sub main()
  Dim order = inputIntBetween("Enter order of dragon [1..12]: ", 1, 12) ' variable definition
  clearPrintedText() ' call procedure
  print($"Dragon of order {order}")
  Dim side = (75/pow(sqrt(2), order)) ' variable definition
  Dim corner = side/12.0/cos(45) ' variable definition
  Dim turns = left ' variable definition
  For Each i In range(1, order + 1)
    turns = setTurns(turns) ' reassign variable
  Next i
  Dim t = New Turtle() ' variable definition
  setupTurtle(t, order) ' call procedure
  drawDragon(t, order, turns, side, corner) ' call procedure
End Sub

Const left = "1"

Const right = "0"

Sub drawDragon(t As Turtle, order As Integer, turns As String, side As Double, corner As Double) ' procedure
  Dim p = (200.0/order).floor() ' variable definition
  Dim turnI = 0 ' variable definition
  For Each turn In turns
    turnI = (if(turn.equals(left), 1, -1)) ' reassign variable
    t.turn(-45*turnI) ' call procedure
    t.move(corner) ' call procedure
    t.turn(-45*turnI) ' call procedure
    t.move(side) ' call procedure
    sleep_ms(p) ' call procedure
  Next turn
  t.penUp() ' call procedure
  t.hide() ' call procedure
End Sub

Sub setupTurtle(t As Turtle, order As Integer) ' procedure
  t.turnToHeading(180 + order*45) ' call procedure
  t.placeAt(-40, 20) ' call procedure
  t.penColour(red) ' call procedure
  t.penWidth(10.0/order) ' call procedure
  t.penDown() ' call procedure
  t.show() ' call procedure
End Sub

Function setTurns(turns As String) As String
  Dim turnsR = turns + left + reflect(turns) ' variable definition
  ' turnsR[0..turnsR.length() - 1]
  Return turnsR.subString(0, turnsR.length() - 1)
End Function

Function reflect(s As String) As String
  Dim sR = "" ' variable definition
  For Each i In range(1, s.length() + 1)
    sR = if((s[i - 1]).equals(left), right, left) + sR ' reassign variable
  Next i
  Return sR
End Function

<TestMethod> Sub test_setTurns()
  Assert.AreEqual("11", setTurns("1"))
  Assert.AreEqual("1110", setTurns("11"))
  Assert.AreEqual("110110", setTurns("110"))
  Assert.AreEqual("11011001110010", setTurns("1101100"))
End Sub

<TestMethod> Sub test_reflect()
  Assert.AreEqual("100", reflect("110"))
  Assert.AreEqual("01111", reflect("00001"))
End Sub
