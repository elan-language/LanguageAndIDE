' VB.NET with Elan 2.0.0-alpha5

Sub main()
  Dim blocks = createBlockGraphics(white) ' variable definition
  Dim x = 20 ' variable definition
  Dim y = 15 ' variable definition
  While True
    blocks[x][y] = red ' re-assign variable
    displayBlocks(blocks) ' call procedure
    blocks[x][y] = black ' re-assign variable
    Dim direction = randint(0, 3) ' variable definition
    If direction = 0 Then
      x = min({x + 1, 39}) ' re-assign variable
    ElseIf direction = 1 Then
      x = max({x - 1, 0}) ' re-assign variable
    ElseIf direction = 2 Then
      y = min({y + 1, 29}) ' re-assign variable
    ElseIf direction = 3 Then
      y = max({y - 1, 0}) ' re-assign variable
    End If
  End While
End Sub
