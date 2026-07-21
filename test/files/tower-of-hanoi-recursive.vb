' VB.NET with Elan 2.0.0-beta2

Const nDiscs = 7

Const delay_ms = 300

Sub main()
  Dim stacks = create3Stacks(nDiscs) ' variable definition
  display(stacks) ' procedure call
  moveMultiple(nDiscs, stacks, 0, 2, 1) ' procedure call
End Sub

Sub moveMultiple(n As Integer, stacks As List(Of List(Of Integer)), fromStack As Integer, toStack As Integer, spare As Integer) ' procedure
  If n = 1 Then
    moveOne(stacks, fromStack, toStack) ' procedure call
  Else
    moveMultiple(n - 1, stacks, fromStack, spare, toStack) ' procedure call
    moveOne(stacks, fromStack, toStack) ' procedure call
    moveMultiple(n - 1, stacks, spare, toStack, fromStack) ' procedure call
  End If
End Sub

Sub moveOne(stacks As List(Of List(Of Integer)), fromStack As Integer, toStack As Integer) ' procedure
  Dim disc = top(stacks(fromStack)) ' variable definition
  stacks(fromStack).removeFirst(disc) ' procedure call
  stacks(toStack).append(disc) ' procedure call
  display(stacks) ' procedure call
End Sub

Sub display(stacks As List(Of List(Of Integer))) ' procedure
  clearAllDisplays() ' procedure call
  Dim vg = createVectorGraphics() ' variable definition
  For Each i In range(0, 3)
    drawStack(stacks(i), i + 1, vg) ' procedure call
  Next i
  displayVectorGraphics(vg) ' procedure call
  sleep_ms(delay_ms) ' procedure call
End Sub

Sub drawStack(s As List(Of Integer), peg As Integer, vg As List(Of VectorGraphic)) ' procedure
  For Each n In range(0, s.length())
    Dim discVG = createDisc(s(n), peg, n) ' variable definition
    vg.append(discVG) ' procedure call
  Next n
End Sub

Function createDisc(disc As Integer, peg As Integer, vertical As Integer) As RectangleVG
  Dim r = New RectangleVG() ' variable definition
  Return r.withFillColour(colour(disc)).withHeight(3).withWidth(disc*2 + 2).withX((peg - 1)*30 + 20 - disc).withY(50 - vertical*3).withStrokeWidth(0.25)
End Function

<TestClass Class Test_createDisc
 <TestMethod> Sub test_createDisc()
  ' Normal cases
  Dim d = createDisc(5, 2, 4) ' variable definition
  Assert.AreEqual(green, d.fillColour)
  Assert.AreEqual(0.25, d.strokeWidth)
  Assert.AreEqual(3, d.height)
  Assert.AreEqual(12, d.width)
  Assert.AreEqual(45, d.x)
  Assert.AreEqual(38, d.y)
  ' Edge cases
  Dim d2 = createDisc(1, 1, 0) ' variable definition
  Assert.AreEqual(red, d2.fillColour)
  Assert.AreEqual(0.25, d2.strokeWidth)
  Assert.AreEqual(3, d2.height)
  Assert.AreEqual(4, d2.width)
  Assert.AreEqual(19, d2.x)
  Assert.AreEqual(50, d2.y)
  ' Error cases - none identified
 End Sub
End Class


Function create3Stacks(nDiscs As Integer) As List(Of List(Of Integer))
  Dim s0 = rangeInSteps(nDiscs, 0, -1) ' variable definition
  Dim s1 = New List(Of Integer)() ' variable definition
  Dim s2 = New List(Of Integer)() ' variable definition
  Return {s0, s1, s2}
End Function

<TestClass Class Test_create3Stacks
 <TestMethod> Sub test_create3Stacks()
  Dim emptyStack = New List(Of Integer)() ' variable definition
  ' Normal case(s)
  Assert.AreEqual({{7, 6, 5, 4, 3, 2, 1}, emptyStack, emptyStack}, create3Stacks(7))
  ' Edge case(s)
  Assert.AreEqual({{1}, emptyStack, emptyStack}, create3Stacks(1))
  Assert.AreEqual({emptyStack, emptyStack, emptyStack}, create3Stacks(0))
  ' Error case(s)
  Assert.AreEqual("Loop will not terminate when start < end start with negative step", create3Stacks(-1))
 End Sub
End Class


Function colour(disc As Integer) As Integer
  Dim colours = {red, yellow, blue, brown, green, &HFF9900, &H6600FF, &H00CC00, &H3399FF, &HFF99CC} ' variable definition
  Return colours(disc - 1)
End Function

<TestClass Class Test_colour
 <TestMethod> Sub test_colour()
  ' Normal cases
  Assert.AreEqual(green, colour(5))
  ' Edge cases
  Assert.AreEqual(red, colour(1))
  Assert.AreEqual(&HFF99CC, colour(10))
  ' Error cases
  Assert.AreEqual("Out of range index: 10 size: 10", colour(11))
 End Sub
End Class


Function top(s As List(Of Integer)) As Integer
  Return s(s.length() - 1)
End Function

<TestClass Class Test_top
 <TestMethod> Sub test_top()
  ' Normal cases
  Assert.AreEqual(1, top({3, 2, 1}))
  ' Edge cases
  Assert.AreEqual(7, top({7}))
  ' Error cases
  Assert.AreEqual("Out of range index: -1 size: 0", top(New List(Of Integer)()))
 End Sub
End Class

