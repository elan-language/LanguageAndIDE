' VB.NET with Elan 2.0.0-beta

<TestMethod> Sub test_Map_Filter_Reduce()
  Dim nums = {2.22, 5.37, 8.97, 7.53, 8.2, 9.43, 7.74, 7.03, 9.62, 2.5} ' let
  Assert.AreEqual({2.22, 2.5}, nums.filter(lessThan5))
  Assert.AreEqual({10.94, 154.85, 721.73, 426.96, 551.37, 838.56, 463.68, 347.43, 890.28, 15.63}, nums.map(cube))
  Assert.AreEqual(81480107, nums.reduce(1.0, product).floor())
  Assert.AreEqual({0.45, 0.4}, nums.filter(lessThan5).map(inverse))
  Assert.AreEqual("results: 0.45|0.4|", nums.filter(lessThan5).map(inverse).map(asString).reduce("results: ", concat))
End Sub

Function lessThan5(n As Double) As Boolean
  Return n < 5
End Function

Function cube(n As Double) As Double
  Return pow(n, 3).round(2)
End Function

Function inverse(n As Double) As Double
  Return (1/n).round(2)
End Function

Function asString(n As Double) As String
  Return $"{n}|"
End Function

Function product(x As Double, y As Double) As Double
  Return (x*y)
End Function

Function concat(a As String, b As String) As String
  Return a + b
End Function
