' VB.NET with Elan 2.0.0-beta-pre1

Sub main()
  Dim t = New Turtle() ' variable definition
  t.placeAt(-100, 75) ' call procedure
  t.turnToHeading(90) ' call procedure
  For Each i In rangeInSteps(150, -1, -5)
    t.move(i) ' call procedure
    t.turn(90) ' call procedure
    sleep_ms(300) ' call procedure
  Next i
End Sub
