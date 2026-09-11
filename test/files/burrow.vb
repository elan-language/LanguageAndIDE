' VB.NET with Elan 2.0.0-beta4

Sub main()
  Dim blocks = New BlockGraphics() ' variable definition
  Dim x = 20 ' variable definition
  Dim y = 15 ' variable definition
  While True
    blocks.put(x, y, red) ' procedure call
    displayBlockGraphics(blocks) ' procedure call
    blocks.put(x, y, black) ' procedure call
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
