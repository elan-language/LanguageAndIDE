' VB.NET with Elan 2.0.0-alpha

Sub main()
  Dim blocks = createBlockGraphics(white) ' variable
  Dim x = 20 ' variable
  Dim y = 15 ' variable
  While true
    blocks.put(x, y, red) ' call
    displayBlocks(blocks) ' call
    blocks.put(x, y, black) ' call
    Dim direction = randomInt(0, 3) ' variable
    If direction is 0 Then
      x = minInt([x + 1, 39]) ' set
    ElseIf direction is 1 Then
      x = maxInt([x - 1, 0]) ' set
    ElseIf direction is 2 Then
      y = minInt([y + 1, 29]) ' set
    ElseIf direction is 3 Then
      y = maxInt([y - 1, 0]) ' set
    End If
  End While
End Sub
