' VB.NET with Elan 2.0.0-alpha1

' A program to investigate the Collatz Conjecture

' https://en.wikipedia.org/wiki/Collatz_conjecture

Sub main()
  Dim x = 1 ' variable definition
  While x > 0
    x = inputInt("Enter a starting number (0 to quit)") ' set
    ' Array of the values we have seen so far
    Dim p = {x} ' variable definition
    ' capture the max value so we can scale the graph
    Dim max = x ' variable definition
    While x > 1
      ' Collatz sequence
      If (x Mod 2) = 0 Then
        x = divAsInt(x, 2) ' set
      Else
        x = x*3 + 1 ' set
      End If
      If x > max Then
        max = x ' set
      End If
      p.append(x) ' call procedure
      ' draw what we have got so far, scaled to the canvas
      Dim vg = New List(Of VectorGraphic)() ' variable definition
      For Each i In range(0, p.length() - 1)
        vg = vg.withAppend((New LineVG()).withX1(scx(i, p)).withY1(scy(p[i], max)).withX2(scx(i + 1, p)).withY2(scy(p[i + 1], max)).withStrokeWidth(1)) ' set
      Next i
      displayVectorGraphics(vg) ' call procedure
      print(x) ' call procedure
      sleep_ms(100) ' call procedure
    End While
  End While
  print("Finished") ' call procedure
End Sub

' scale x. &nbsp;We pass in p just to get its length

Function scx(i As Integer, p As List(Of Integer)) As Double
  Return divAsFloat(i*100, p.length())
End Function

' scale y

' subtract from 70 because y increases down the canvas

' subtract 1 so that 1 is always at the same place on the canvas

Function scy(pi As Integer, max As Integer) As Double
  Return 70 - divAsFloat((pi - 1)*65, (max - 1))
End Function

Const grey = &H808080
