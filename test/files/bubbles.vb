' VB.NET with Elan 2.0.0-alpha

Sub main()
  Dim bubbles = new List(of CircleVG)() ' variable
  ' create 20 small bubbles at the bottom
  For i = 1 To 20 Step 1
    Dim b = new CircleVG() with centreX set to i*5 + 2, centreY set to 75, radius set to 0, fillColour set to transparent, strokeColour set to randomInt(0, white) ' variable
    bubbles.append(b) ' call
  Next i
  While true
    moveGrowBurst(bubbles) ' call
  End While
End Sub

Sub moveGrowBurst(bubbles As List(of CircleVG)) ' procedure
  For Each b In bubbles
    If random() < 0.05 Then
      ' 5% chance bubble 'bursts' and starts again tiny at bottom
      b.setRadius(0) ' call
      b.setCentreY(75) ' call
    Else
      ' bubble rises and grows slightly
      b.setCentreY(b.centreY - 1) ' call
      b.setRadius(b.radius + 0.2) ' call
    End If
  Next b
  displayVectorGraphics(bubbles) ' call
  pause(50) ' call
End Sub
