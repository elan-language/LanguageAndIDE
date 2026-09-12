' VB.NET with Elan 2.0.0-beta4

Sub main()
  Dim blocks = New BlockGraphics() ' variable definition
  While True
    Dim x = randint(0, 19) ' variable definition
    Dim y = randint(0, 14) ' variable definition
    Dim colour = randint(0, (pow(2, 24) - 1).floor()) ' variable definition
    blocks.put(20 + x, 15 - y, colour) ' procedure call
    blocks.put(20 + x, 15 + y, colour) ' procedure call
    blocks.put(20 - x, 15 - y, colour) ' procedure call
    blocks.put(20 - x, 15 + y, colour) ' procedure call
    displayBlockGraphics(blocks) ' procedure call
  End While
End Sub
