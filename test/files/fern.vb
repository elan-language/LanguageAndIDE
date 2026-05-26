' VB.NET with Elan 2.0.0-alpha5

' https://en.wikipedia.org/wiki/Barnsley_fern

' Draws a fractal image

Sub main()
  Dim vg = New List(Of VectorGraphic)() ' variable definition
  ' coordinates
  Dim x = 0.0 ' variable definition
  Dim y = 0.16 ' variable definition
  ' random number
  Dim r = New Random() ' variable definition
  r.initialiseFromClock() ' call procedure
  Dim rect = New RectangleVG() ' variable definition
  Dim count = 0 ' variable definition
  ' don't set the count limit too high
  ' or the browser will run out of memory
  While count < 1000
    Dim point = onepoint(x, y, r) ' variable definition
    rect = point.item_0 ' reassign variable
    x = point.item_1 ' reassign variable
    y = point.item_2 ' reassign variable
    r = point.item_3 ' reassign variable
    vg.append(rect) ' call procedure
    displayVectorGraphics(vg) ' call procedure
    count = count + 1 ' reassign variable
  End While
  print("Finished")
End Sub

Function onepoint(x As Double, y As Double, r As Random) As (RectangleVG, Double, Double, Random)
  ' next pseudo-random number (Grogono parameters)
  Dim rValue = r.asFloat() ' variable definition
  Dim rNext = r.nextGen() ' variable definition
  Dim nx_ny = onestep(x, y, rValue) ' variable definition
  Dim nx = nx_ny.item_0 ' variable definition
  Dim ny = nx_ny.item_1 ' variable definition
  Dim rect = (New RectangleVG()).withX(nx*scale + 50).withY(75 - ny*scale).withWidth(0.5).withHeight(0.5).withFillColour(&H408040).withFillColour(&H408040).withStrokeWidth(0.25) ' variable definition
  Return (rect, nx, ny, rNext)
End Function

' r is random Float 0.0 <= r < 1.0

' returns new x and y

' written in a data-driven style

Function onestep(x As Double, y As Double, r As Double) As (Double, Double)
  ' Currently you can't make the params into one long line
  ' as it makes the browser use 100% CPU
  ' xx xy yx yy cx cy probablity
  Dim p1 = {0.0, 0.0, 0.0, 0.16, 0.0, 0.0, 0.01} ' variable definition
  Dim p2 = {0.85, 0.04, -0.04, 0.85, 0.0, 1.60, 0.85} ' variable definition
  Dim p3 = {0.20, -0.26, 0.23, 0.22, 0.0, 1.60, 0.07} ' variable definition
  Dim p4 = {-0.15, 0.28, 0.26, 0.24, 0.0, 0.44, 0.07} ' variable definition
  Dim allPs = {p1, p2, p3, p4} ' variable definition
  ' cumulative probabilty
  Dim cumuprob = 0.0 ' variable definition
  Dim done = False ' variable definition
  Dim nx = 0.0 ' variable definition
  Dim ny = 0.0 ' variable definition
  For Each pp In allPs
    cumuprob = cumuprob + pp[6] ' reassign variable
    If (Not done) And (r < cumuprob) Then
      nx = x*pp[0] + y*pp[1] + pp[4] ' reassign variable
      ny = x*pp[2] + y*pp[3] + pp[5] ' reassign variable
      done = True ' reassign variable
    End If
  Next pp
  Return (nx, ny)
End Function

<TestMethod> Sub test_one()
  Assert.AreEqual({0.0064, 1.736}, roundtuple2(onestep(0.0, 0.16, 0.5)))
  Assert.AreEqual({-0.0416, 1.6352}, roundtuple2(onestep(0.0, 0.16, 0.9)))
End Sub

' two approaches to rounding a tuple to N decimal places

Function roundtuple1(n As (Double, Double)) As (Double, Double)
  Dim a = n.item_0 ' variable definition
  Dim b = n.item_1 ' variable definition
  Return (a.round(8), b.round(8))
End Function

Function roundtuple2(n As (Double, Double)) As List(Of Double)
  Dim a = n.item_0 ' variable definition
  Dim b = n.item_1 ' variable definition
  Return {a, b}.map(Function (x As Double) x.round(8))
End Function

Const scale = 7
