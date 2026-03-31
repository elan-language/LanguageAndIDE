' VB.NET with Elan 2.0.0-alpha1

' After image is displayed, press: &nbsp;

' - z to zoom in, x to zoom out

' - arrow keys to pan

' - g, j and y, h to change shape

' &nbsp;

' Acknowledgements:

' https://mathworld.wolfram.com/JuliaSet.html

' Implemented in Elan by Charles Wicksteed

Sub main()
  Dim p = New Coords() ' variable definition
  While True
    Dim vg = allpoints(p) ' variable definition
    displayVectorGraphics(vg) ' call procedure
    p.checkkeys() ' call procedure
    print($"x = {p.jx} y = {p.jy}") ' call procedure
  End While
End Sub

Function allpoints(p As Coords) As List(Of VectorGraphic)
  Dim vg2 = New List(Of VectorGraphic)() ' variable definition
  For Each xp In range(0, width + 1)
    For Each yp In range(0, height + 1)
      ' scale and centre
      Const n = onepoint(divAsFloat(divAsFloat(xp - width, 2), p.scale - p.xoff), divAsFloat(divAsFloat(yp - height, 2), p.scale - p.yoff), nmax, p)
      ' colour depends on how many iterations were done for that point
      Const col = if(n = nmax, &Hffffff, ((n*&H010201) Mod &Hffffff))
      Dim rect = (New RectangleVG()).withX(divAsFloat(xp, 2)).withY(divAsFloat(yp, 2)).withWidth(0.5).withHeight(0.5).withFillColour(col).withStrokeWidth(0.25) ' variable definition
      vg2 = vg2.withAppend(rect) ' set
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
    Const c = 2*a*b
    a = (a*a - b*b) + p.jx ' set
    b = c + p.jy ' set
    i = i + 1 ' set
    If (i >= maxnum) Or ((a*a + b*b) > 4) Then
      done = True ' set
    End If
  End While
  Return i
End Function

Class Coords

  Sub New()
    ' number of cells per unit distance on complex plane
    Me.scale = 100 ' set
    ' centered on the screen to start
    Me.xoff = 0 ' set
    Me.yoff = 0 ' set
    ' Julia set parameters
    Me.jx = -0.512 ' set
    Me.jy = 0.521 ' set
  End Sub
  Function toString() As String
    Return ""
  End Function
  Property scale As Double
  Property xoff As Double
  Property yoff As Double
  Property jx As Double
  Property jy As Double
  ' Arrow keys move the virtual camera
  ' eg Arrow Up moves the image down
  Sub checkkeys() ' procedure
    Const panstep = 10/Me.scale
    Dim jstep = 0.001 ' variable definition
    ' save some CPU by not recalculating until a parameter has been changed
    Dim changed = False ' variable definition
    While Not changed
      Dim k = getKey() ' variable definition
      ' loop because more than one key may have been pressed
      While Not k.equals("")
        If k.equals("z") Then
          Me.scale = Me.scale*1.2 ' set
        ElseIf k.equals("x") Then
          Me.scale = Me.scale/1.2 ' set
        ElseIf k.equals("ArrowUp") Then
          Me.yoff = Me.yoff + panstep ' set
        ElseIf k.equals("ArrowDown") Then
          Me.yoff = Me.yoff - panstep ' set
        ElseIf k.equals("ArrowLeft") Then
          Me.xoff = Me.xoff + panstep ' set
        ElseIf k.equals("ArrowRight") Then
          Me.xoff = Me.xoff - panstep ' set
        ElseIf k.equals("g") Then
          Me.jx = Me.jx + jstep ' set
        ElseIf k.equals("j") Then
          Me.jx = Me.jx - jstep ' set
        ElseIf k.equals("y") Then
          Me.jy = Me.jy + jstep ' set
        ElseIf k.equals("h") Then
          Me.jy = Me.jy - jstep ' set
          ' for autocomplete in the RHS expression, don't type "property"
        Else
          ' ignore erroneous key presses
        End If
        ' there is no harm in recalculating even if an invalid key was pressed
        changed = True ' set
        ' another key may have been pressed
        k = getKey() ' set
      End While
      sleep_ms(10) ' call procedure
    End While
  End Sub
End Class

<TestMethod> Sub test_one()
  Dim p = New Coords() ' variable definition
  Assert.AreEqual(100, onepoint(0, 0, 100, p))
  Assert.AreEqual(3, onepoint(0.5, 0.5, 100, p))
End Sub

Const width = 200

Const height = 150

Const nmax = 360
