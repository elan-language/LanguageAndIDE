' VB.NET with Elan 2.0.0-beta4

Function bestFitLine(points As List(Of Point)) As (Double, Double)
  Dim sumX = points.sumBy(Function (p As Point) p.x) ' variable definition
  Dim sumXsq = points.sumBy(Function (p As Point) p.x*p.x) ' variable definition
  Dim sumY = points.sumBy(Function (p As Point) p.y) ' variable definition
  Dim sumXY = points.sumBy(Function (p As Point) p.x*p.y) ' variable definition
  Dim n = points.length() ' variable definition
  Dim a = (sumY*sumXsq - sumX*sumXY)/(n*sumXsq - sumX*sumX) ' variable definition
  Dim b = (n*sumXY - sumX*sumY)/(n*sumXsq - sumX*sumX) ' variable definition
  Return (a, b)
End Function

Class Point

  Sub New(x As Double, y As Double)
    Me.x = x ' assignment
    Me.y = y ' assignment
  End Sub

  Property x As Double

  Property y As Double

  Function toString() As String
    Return $"Point {Me.x}, {Me.y}"
  End Function

End Class

Function newPoint(x As Double, y As Double) As Point
  Return New Point(x, y)
End Function

<TestClass Class Test_bestFit
 <TestMethod> Sub test_bestFit()
  Dim l1 = {newPoint(0.71, 1.12), newPoint(3.56, 5.36), newPoint(7.83, 9.04)} ' variable definition
  Dim a_b = bestFitLine(l1) ' variable definition
  Dim a = a_b.item_0 ' variable definition
  Dim b = a_b.item_1 ' variable definition
  Assert.AreEqual(0.766, a.round(3))
  Assert.AreEqual(1.093, b.round(3))
 End Sub
End Class


<TestClass Class Test_bestFit_empty
 <TestMethod> Sub test_bestFit_empty()
  Dim l1 = New List(Of Point)() ' variable definition
  Dim a_b = bestFitLine(l1) ' variable definition
  ' NaN means 'Not A Number"
  Assert.AreEqual("(NaN, NaN)", a_b.toString())
 End Sub
End Class

