' VB.NET with Elan 2.0.0-alpha4

Sub main()
  Dim t = New Turtle() ' variable definition
  t.placeAt(-50, 30) ' call procedure
  t.turn(90) ' call procedure
  For Each i In range(1, 4)
    drawSide(side, t) ' call procedure
    t.turn(120) ' call procedure
  Next i
End Sub

Sub drawSide(length As Double, t As Turtle) ' procedure
  If (length > 1) Then
    Dim third = length/3 ' variable definition
    drawSide(third, t) ' call procedure
    t.turn(-60) ' call procedure
    drawSide(third, t) ' call procedure
    t.turn(120) ' call procedure
    drawSide(third, t) ' call procedure
    t.turn(-60) ' call procedure
    drawSide(third, t) ' call procedure
  Else
    t.move(length) ' call procedure
  End If
End Sub

Const side = 100
