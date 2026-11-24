' VB.NET with Elan 3.0.0-alpha

Sub main()
  Dim t = New Turtle() ' variable definition
  t.placeAt(-100, 75) ' procedure call
  t.turnToHeading(90) ' procedure call
  For Each i In rangeInSteps(150, -1, -5)
    t.move(i) ' procedure call
    t.turn(90) ' procedure call
    sleep_ms(300) ' procedure call
  Next i
End Sub
