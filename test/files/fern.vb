' VB.NET with Elan 2.0.0-beta2

' https://en.wikipedia.org/wiki/Barnsley_fern

' Draws a fractal image

Sub main()
  Dim vg = createVectorGraphics() ' variable definition
  Dim s = New State(New RectangleVG(), 0.0, 0.16, New Random()) ' variable definition
  ' can't call s.r.initialiseFromClock() directly
  Dim t = s.r ' variable definition
  t.initialiseFromClock() ' procedure call
  ' don't set the count limit too high
  ' or the browser will run out of memory
  For Each count In range(0, 1000)
    s = onepoint(s) ' assignment
    vg.append(s.rect) ' procedure call
    displayVectorGraphics(vg) ' procedure call
  Next count
  Console.WriteLine("Finished") ' print statement
End Sub

' The State class is used as a convenient way to pass multiple

' items in and out.

' The RectangleVG s.rect is ignored when passed in;

' it is just the RectangleVG from last time.

Function onepoint(s As State) As State
  ' s.r.asFloat() is the current random number between 0 and 1
  Dim nx_ny = onestep(s.x, s.y, s.r.asFloat()) ' let
  Dim nx = nx_ny.item_0 ' let
  Dim ny = nx_ny.item_1 ' let
  Dim rect = (New RectangleVG()).withX(nx*scale + 50).withY(75 - ny*scale).withWidth(0.5).withHeight(0.5).withFillColour(&H408040).withFillColour(&H408040).withStrokeWidth(0.25) ' let
  ' s.r.nextGen() moves the random number generator on to the next number
  Return (New State(rect, nx, ny, s.r.nextGen()))
End Function

' r is random Float 0.0 <= r < 1.0

' returns new x and y

' written in a data-driven style

Function onestep(x As Double, y As Double, r As Double) As (Double, Double)
  ' Currently you can't make the params into one long line
  ' as it makes the browser use 100% CPU
  ' xx xy yx yy cx cy probablity
  Dim p1 = {0.0, 0.0, 0.0, 0.16, 0.0, 0.0, 0.01} ' let
  Dim p2 = {0.85, 0.04, -0.04, 0.85, 0.0, 1.60, 0.85} ' let
  Dim p3 = {0.20, -0.26, 0.23, 0.22, 0.0, 1.60, 0.07} ' let
  Dim p4 = {-0.15, 0.28, 0.26, 0.24, 0.0, 0.44, 0.07} ' let
  Dim allPs = {p1, p2, p3, p4} ' let
  ' use the random number r to select one of p1 to p4
  ' weighted by the probabilities and put it in pp
  Dim pp = getparams(r, allPs, 0.0) ' let
  Return (x*pp(0) + y*pp(1) + pp(4), x*pp(2) + y*pp(3) + pp(5))
End Function

' select a parameter set depending on random number

' check the first element, cumulate the probability

' return the element when the cumulative probability reaches r

' otherwise recurse with the rest of the list of params

Function getparams(r As Double, prms As List(Of List(Of Double)), cumuprob As Double) As List(Of Double)
  Dim head = prms.head() ' let
  Dim cp2 = cumuprob + head(6) ' let
  Return if_(r < cp2, head, getparams(r, prms.tail(), cp2))
End Function

' class to hold the working data passed in and out of onepoint()

Class State

  Sub New(rect As RectangleVG, x As Double, y As Double, r As Random)
    Me.rect = rect ' assignment
    Me.x = x ' assignment
    Me.y = y ' assignment
    Me.r = r ' assignment
  End Sub

  Property rect As RectangleVG

  Property x As Double

  Property y As Double

  Property r As Random

  Function toString() As String
    Return $"rect at {Me.rect.x}, {Me.rect.y}"
  End Function

End Class

<TestClass Class Test_one
 <TestMethod> Sub test_one()
  Assert.AreEqual({0.0064, 1.736}, roundtuple2(onestep(0.0, 0.16, 0.5)))
  Assert.AreEqual({-0.0416, 1.6352}, roundtuple2(onestep(0.0, 0.16, 0.9)))
  Dim s = onepoint(New State(New RectangleVG(), 0.0, 0.16, New Random())) ' let
  Assert.AreEqual("rect at 50.0448, 62.848", s.toString())
  Dim p1 = {0.0, 0.0, 0.0, 0.16, 0.0, 0.0, 0.01} ' let
  Dim p2 = {0.85, 0.04, -0.04, 0.85, 0.0, 1.60, 0.85} ' let
  Assert.AreEqual(p1, getparams(0.005, {p1, p2}, 0.0))
  Assert.AreEqual(p2, getparams(0.03, {p1, p2}, 0.0))
  Assert.AreEqual(p2, getparams(0.03, {p2}, 0.01))
 End Sub
End Class


' two approaches to rounding a tuple to N decimal places

Function roundtuple1(n As (Double, Double)) As (Double, Double)
  Return (n.item_0.round(8), n.item_1.round(8))
End Function

Function roundtuple2(n As (Double, Double)) As List(Of Double)
  Return {n.item_0, n.item_1}.map(Function (x As Double) x.round(8))
End Function

Const scale = 7
