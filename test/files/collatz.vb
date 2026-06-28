' VB.NET with Elan 2.0.0-beta1

' A program to investigate the Collatz Conjecture

' https://en.wikipedia.org/wiki/Collatz_conjecture

Sub main()
  Dim x = 1 ' variable definition
  While x > 0
    x = inputInt("Enter a starting number (0 to quit)") ' assignment
    ' Array of the values we have seen so far
    Dim p = {x} ' variable definition
    ' capture the max value so we can scale the graph
    Dim max = x ' variable definition
    While x > 1
      ' Collatz sequence
      If (x Mod 2) = 0 Then
        x = divAsInt(x, 2) ' assignment
      Else
        x = x*3 + 1 ' assignment
      End If
      If x > max Then
        max = x ' assignment
      End If
      p.append(x) ' procedure call
      ' draw what we have got so far, scaled to the canvas
      Dim vg = createVectorGraphics() ' variable definition
      For Each i In range(0, p.length() - 1)
        vg = vg.withAppend((New LineVG()).withX1(scx(i, p)).withY1(scy(p(i), max)).withX2(scx(i + 1, p)).withY2(scy(p(i + 1), max)).withStrokeWidth(1)) ' assignment
      Next i
      displayVectorGraphics(vg) ' procedure call
      Console.WriteLine(x) ' print statement
      sleep_ms(100) ' procedure call
    End While
  End While
  Console.WriteLine("Finished") ' print statement
End Sub

' scale x.  We pass in p just to get its length

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
