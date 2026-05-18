' VB.NET with Elan 2.0.0-alpha4

Function bestFitLine(points As List(Of Point)) As (Double, Double)
  Dim sumX = points.reduce(0.0, Function (s As Double, p As Point) s + p.x) ' let
  Dim sumXsq = points.reduce(0.0, Function (s As Double, p As Point) s + pow(p.x, 2)) ' let
  Dim sumY = points.reduce(0.0, Function (s As Double, p As Point) s + p.y) ' let
  Dim sumXY = points.reduce(0.0, Function (s As Double, p As Point) s + p.x*p.y) ' let
  Dim n = points.length() ' let
  Dim a = (sumY*sumXsq - sumX*sumXY)/(n*sumXsq - sumX*sumX) ' let
  Dim b = (n*sumXY - sumX*sumY)/(n*sumXsq - sumX*sumX) ' let
  Return (a, b)
End Function

Class Point

  Property x As Double
  Property y As Double
  Sub New(x As Double, y As Double)
    Me.x = x ' re-assign variable
    Me.y = y ' re-assign variable
  End Sub
  Function toString() As String
    Return $"Point {Me.x}, {Me.y}"
  End Function
End Class

Function newPoint(x As Double, y As Double) As Point
  Return New Point(x, y)
End Function

<TestMethod> Sub test_bestFit()
  Dim l1 = {newPoint(0.71, 1.12), newPoint(3.56, 5.36), newPoint(7.83, 9.04)} ' let
  Dim a_b = bestFitLine(l1) ' let
  Dim a = a_b.item_0 ' let
  Dim b = a_b.item_1 ' let
  Assert.AreEqual(0.766, a.round(3))
  Assert.AreEqual(1.093, b.round(3))
End Sub
