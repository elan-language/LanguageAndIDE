' VB.NET with Elan 2.0.0-alpha1

Sub main()
  Dim bubbles = New List(Of CircleVG)() ' variable
  ' create 20 small bubbles at the bottom
  For Each i In range(1, 21)
    Dim b = (New CircleVG()).withCentreX(i*5 + 2).withCentreY(75).withRadius(0).withFillColour(transparent).withStrokeColour(randint(0, white)) ' variable
    bubbles.append(b) ' call
  Next i
  While True
    moveGrowBurst(bubbles) ' call
  End While
End Sub

Sub moveGrowBurst(bubbles As List(Of CircleVG)) ' procedure
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
  sleep_ms(5) ' call
End Sub
