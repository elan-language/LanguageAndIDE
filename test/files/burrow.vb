' VB.NET with Elan 2.0.0-beta2

Sub main()
  Dim blocks = createBlockGraphics(white) ' variable definition
  Dim x = 20 ' variable definition
  Dim y = 15 ' variable definition
  While True
    blocks(x)(y) = red ' assignment
    displayBlocks(blocks) ' procedure call
    blocks(x)(y) = black ' assignment
    Dim direction = randint(0, 3) ' variable definition
    If direction = 0 Then
      x = min({x + 1, 39}) ' assignment
    ElseIf direction = 1 Then
      x = max({x - 1, 0}) ' assignment
    ElseIf direction = 2 Then
      y = min({y + 1, 29}) ' assignment
    ElseIf direction = 3 Then
      y = max({y - 1, 0}) ' assignment
    End If
  End While
End Sub
