' VB.NET with Elan 2.0.0-beta1

Sub main()
  Dim blocks = createBlockGraphics(white) ' variable definition
  While True
    Dim x = randint(0, 19) ' variable definition
    Dim y = randint(0, 14) ' variable definition
    Dim colour = randint(0, (pow(2, 24) - 1).floor()) ' variable definition
    blocks(20 + x)(15 - y) = colour ' assignment
    blocks(20 + x)(15 + y) = colour ' assignment
    blocks(20 - x)(15 - y) = colour ' assignment
    blocks(20 - x)(15 + y) = colour ' assignment
    displayBlocks(blocks) ' procedure call
  End While
End Sub
