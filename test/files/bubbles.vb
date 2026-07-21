' VB.NET with Elan 2.0.0-beta2

Sub main()
  Dim bubbles = New List(Of CircleVG)() ' variable definition
  ' create 20 small bubbles at the bottom
  For Each i In range(1, 21)
    Dim b = (New CircleVG()).withCentreX(i*5 + 2).withCentreY(75).withRadius(0).withFillColour(transparent).withStrokeColour(randint(0, white)) ' variable definition
    bubbles.append(b) ' procedure call
  Next i
  While True
    moveGrowBurst(bubbles) ' procedure call
  End While
End Sub

Sub moveGrowBurst(bubbles As List(Of CircleVG)) ' procedure
  For Each b In bubbles
    If random() < 0.05 Then
      ' 5% chance bubble 'bursts' and starts again tiny at bottom
      b.setRadius(0) ' procedure call
      b.setCentreY(75) ' procedure call
    Else
      ' bubble rises and grows slightly
      b.setCentreY(b.centreY - 1) ' procedure call
      b.setRadius(b.radius + 0.2) ' procedure call
    End If
  Next b
  displayVectorGraphics(bubbles) ' procedure call
  sleep_ms(5) ' procedure call
End Sub
