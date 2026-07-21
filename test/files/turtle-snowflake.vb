' VB.NET with Elan 2.0.0-beta2

Sub main()
  Dim t = New Turtle() ' variable definition
  t.placeAt(-50, 30) ' procedure call
  t.turn(90) ' procedure call
  For Each i In range(1, 4)
    drawSide(side, t) ' procedure call
    t.turn(120) ' procedure call
  Next i
End Sub

Sub drawSide(length As Double, t As Turtle) ' procedure
  If (length > 1) Then
    Dim third = length/3 ' variable definition
    drawSide(third, t) ' procedure call
    t.turn(-60) ' procedure call
    drawSide(third, t) ' procedure call
    t.turn(120) ' procedure call
    drawSide(third, t) ' procedure call
    t.turn(-60) ' procedure call
    drawSide(third, t) ' procedure call
  Else
    t.move(length) ' procedure call
  End If
End Sub

Const side = 100
