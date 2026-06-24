' VB.NET with Elan 2.0.0-beta

Function bestFitLine(points As List(Of Point)) As (Double, Double)
  Dim sumX = points.sumBy(Function (p As Point) p.x) ' let
  Dim sumXsq = points.sumBy(Function (p As Point) p.x*p.x) ' let
  Dim sumY = points.sumBy(Function (p As Point) p.y) ' let
  Dim sumXY = points.sumBy(Function (p As Point) p.x*p.y) ' let
  Dim n = points.length() ' let
  Dim a = (sumY*sumXsq - sumX*sumXY)/(n*sumXsq - sumX*sumX) ' let
  Dim b = (n*sumXY - sumX*sumY)/(n*sumXsq - sumX*sumX) ' let
  Return (a, b)
End Function

Class Point

  Property x As Double

  Property y As Double

  Sub New(x As Double, y As Double)
    Me.x = x ' reassign variable
    Me.y = y ' reassign variable
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

<TestMethod> Sub test_bestFit_empty()
  Dim l1 = New List(Of Point)() ' let
  Dim a_b = bestFitLine(l1) ' let
  ' NaN means 'Not A Number"
  Assert.AreEqual("(NaN, NaN)", a_b.toString())
End Sub
