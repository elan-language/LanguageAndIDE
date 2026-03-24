' VB.NET with Elan 2.0.0-alpha1

Sub main()
  Dim blocks = createBlockGraphics(white) ' variable
  Dim x = 20 ' variable
  Dim y = 15 ' variable
  While True
    blocks[x][y] = red ' set
    displayBlocks(blocks) ' call
    blocks[x][y] = black ' set
    Dim direction = randint(0, 3) ' variable
    If direction = 0 Then
      x = min({x + 1, 39}) ' set
    ElseIf direction = 1 Then
      x = max({x - 1, 0}) ' set
    ElseIf direction = 2 Then
      y = min({y + 1, 29}) ' set
    ElseIf direction = 3 Then
      y = max({y - 1, 0}) ' set
    End If
  End While
End Sub
