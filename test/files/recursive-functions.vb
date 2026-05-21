' VB.NET with Elan 2.0.0-alpha4

Function factorial(n As Integer) As Integer
  Return if(n < 2, 1, n*factorial(n - 1))
End Function

<TestMethod> Sub test_factorial()
  Assert.AreEqual(2, factorial(2))
  Assert.AreEqual(6, factorial(3))
  Assert.AreEqual(5040, factorial(7))
  Assert.AreEqual(3628800, factorial(10))
  ' edge cases:
  Assert.AreEqual(1, factorial(1))
  Assert.AreEqual(1, factorial(0))
End Sub

Function sum(li As List(Of Double)) As Double
  Return if(li.length() = 0, 0.0, li.head() + sum(li.tail()))
End Function

<TestMethod> Sub test_sum()
  Dim li = {3.1, 5.02, 4, 7.73, 9.9} ' let
  Assert.AreEqual(29.75, sum(li).round(2))
  ' edge cases: empty, and one element lists
  Dim le = New List(Of Double)() ' let
  Assert.AreEqual(0, sum(le))
  Dim l1 = {0.6} ' let
  Assert.AreEqual(0.6, sum(l1))
End Sub

Function reverse(li As List(Of Double)) As List(Of Double)
  Return if(li.length() < 2, li, reverse(li.tail()).withAppend(li.head()))
End Function

<TestMethod> Sub test_reverse()
  Dim l = {3.1, 5.02, 4, 7.73, 9.9} ' let
  Assert.AreEqual({9.9, 7.73, 4, 5.02, 3.1}, reverse(l))
  ' edge cases: empty, and one element lists
  Dim le = New List(Of Double)() ' let
  Assert.AreEqual(le, reverse(le))
  Dim l1 = {0.6} ' let
  Assert.AreEqual(l1, reverse(l1))
End Sub
