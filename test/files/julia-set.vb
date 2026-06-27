' VB.NET with Elan 2.0.0-beta1

' After image is displayed, press:  

' - z to zoom in, x to zoom out

' - arrow keys to pan

' - g, j and y, h to change shape

'  

' Acknowledgements:

' https://mathworld.wolfram.com/JuliaSet.html

' Implemented in Elan by Charles Wicksteed

Sub main()
  Dim p = New Coords() ' variable definition
  While True
    Dim vg = allpoints(p) ' variable definition
    displayVectorGraphics(vg) ' call procedure
    p.checkkeys() ' call procedure
    Console.WriteLine($"x = {p.jx} y = {p.jy}") ' print statement
  End While
End Sub

Function allpoints(p As Coords) As List(Of VectorGraphic)
  Dim vg2 = createVectorGraphics() ' variable definition
  For Each xp In range(0, width)
    For Each yp In range(0, height)
      ' scale and centre
      Dim n = onepoint((xp - width/2.0)/p.scale - p.xoff, (yp - height/2.0)/p.scale - p.yoff, nmax, p) ' variable definition
      ' colour depends on how many iterations were done for that point
      Dim col = if_(n = nmax, &Hffffff, ((n*&H010201) Mod &Hffffff)) ' variable definition
      Dim rect = (New RectangleVG()).withX(xp/2.0).withY(yp/2.0).withWidth(0.5).withHeight(0.5).withFillColour(col).withStrokeColour(col).withStrokeWidth(0.25) ' variable definition
      vg2 = vg2.withAppend(rect) ' assignment
    Next yp
  Next xp
  Return vg2
End Function

Function onepoint(x As Double, y As Double, maxnum As Integer, p As Coords) As Integer
  Dim done = False ' variable definition
  Dim a = x ' variable definition
  Dim b = y ' variable definition
  Dim i = 0 ' variable definition
  While Not done
    Dim c = 2*a*b ' variable definition
    a = (a*a - b*b) + p.jx ' assignment
    b = c + p.jy ' assignment
    i = i + 1 ' assignment
    If (i >= maxnum) Or ((a*a + b*b) > 4) Then
      done = True ' assignment
    End If
  End While
  Return i
End Function

Class Coords

  Sub New()
    ' number of cells per unit distance on complex plane
    Me.scale = 100 ' assignment
    ' centered on the screen to start
    Me.xoff = 0 ' assignment
    Me.yoff = 0 ' assignment
    ' Julia set parameters
    Me.jx = -0.512 ' assignment
    Me.jy = 0.521 ' assignment
  End Sub

  Function toString() As String
    Return "a Coords"
  End Function

  Property scale As Double

  Property xoff As Double

  Property yoff As Double

  Property jx As Double

  Property jy As Double

  ' Arrow keys move the virtual camera
  ' eg Arrow Up moves the image down
  Sub checkkeys() ' procedure method
    Dim panstep = 10/Me.scale ' variable definition
    Dim jstep = 0.001 ' variable definition
    ' save some CPU by not recalculating until a parameter has been changed
    Dim changed = False ' variable definition
    While Not changed
      Dim k = getKey() ' variable definition
      ' loop because more than one key may have been pressed
      While Not k.equals("")
        If k.equals("z") Then
          Me.scale = Me.scale*1.2 ' assignment
        ElseIf k.equals("x") Then
          Me.scale = Me.scale/1.2 ' assignment
        ElseIf k.equals("ArrowUp") Then
          Me.yoff = Me.yoff + panstep ' assignment
        ElseIf k.equals("ArrowDown") Then
          Me.yoff = Me.yoff - panstep ' assignment
        ElseIf k.equals("ArrowLeft") Then
          Me.xoff = Me.xoff + panstep ' assignment
        ElseIf k.equals("ArrowRight") Then
          Me.xoff = Me.xoff - panstep ' assignment
        ElseIf k.equals("g") Then
          Me.jx = Me.jx + jstep ' assignment
        ElseIf k.equals("j") Then
          Me.jx = Me.jx - jstep ' assignment
        ElseIf k.equals("y") Then
          Me.jy = Me.jy + jstep ' assignment
        ElseIf k.equals("h") Then
          Me.jy = Me.jy - jstep ' assignment
        Else
          ' ignore erroneous key presses
        End If
        ' there is no harm in recalculating even if an invalid key was pressed
        changed = True ' assignment
        ' another key may have been pressed
        k = getKey() ' assignment
      End While
      sleep_ms(10) ' call procedure
    End While
  End Sub

End Class

<TestClass Class Test_one
 <TestMethod> Sub test_one()
  Dim p = New Coords() ' variable definition
  Assert.AreEqual(100, onepoint(0, 0, 100, p))
  Assert.AreEqual(3, onepoint(0.5, 0.5, 100, p))
 End Sub
End Class


Const width = 200

Const height = 150

Const nmax = 360
