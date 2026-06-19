' VB.NET with Elan 2.0.0-beta-pre1

Const nDiscs = 7

Const delay_ms = 300

Sub main()
  Dim stacks = create3Stacks(nDiscs) ' variable definition
  display(stacks) ' call procedure
  While stacks(2).length() <> nDiscs
    If (stacks(0).length() Mod 2) = 0 Then
      moveBetween(stacks, 0, 1) ' call procedure
      moveBetween(stacks, 0, 2) ' call procedure
      moveBetween(stacks, 1, 2) ' call procedure
    Else
      moveBetween(stacks, 0, 2) ' call procedure
      moveBetween(stacks, 0, 1) ' call procedure
      moveBetween(stacks, 1, 2) ' call procedure
    End If
  End While
End Sub

Sub moveBetween(stacks As List(Of List(Of Integer)), fromStack As Integer, toStack As Integer) ' procedure
  Dim a = stacks(fromStack) ' variable definition
  Dim b = stacks(toStack) ' variable definition
  If b.length() < nDiscs Then
    If (a.length() > 0) And ((b.length() = 0) Or (top(a) < top(b))) Then
      Dim disc = top(a) ' variable definition
      a.removeFirst(disc) ' call procedure
      b.append(disc) ' call procedure
    ElseIf b.length() > 0 Then
      Dim disc = top(b) ' variable definition
      b.removeFirst(disc) ' call procedure
      a.append(disc) ' call procedure
    End If
  End If
  display(stacks) ' call procedure
End Sub

Sub display(stacks As List(Of List(Of Integer))) ' procedure
  clearAllDisplays() ' call procedure
  Dim vg = createVectorGraphics() ' variable definition
  drawStack(stacks(0), 1, vg) ' call procedure
  drawStack(stacks(1), 2, vg) ' call procedure
  drawStack(stacks(2), 3, vg) ' call procedure
  displayVectorGraphics(vg) ' call procedure
  sleep_ms(delay_ms) ' call procedure
End Sub

Sub drawStack(s As List(Of Integer), peg As Integer, vg As List(Of VectorGraphic)) ' procedure
  For Each n In range(0, s.length())
    Dim discVG = createDisc(s(n), peg, n) ' variable definition
    vg.append(discVG) ' call procedure
  Next n
End Sub

Function createDisc(disc As Integer, peg As Integer, vertical As Integer) As RectangleVG
  Dim r = New RectangleVG() ' variable definition
  Return r.withFillColour(colour(disc)).withHeight(3).withWidth(disc*2 + 2).withX((peg - 1)*30 + 20 - disc).withY(50 - vertical*3).withStrokeWidth(0.25)
End Function

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

Function create3Stacks(nDiscs As Integer) As List(Of List(Of Integer))
  Dim s0 = rangeInSteps(nDiscs, 0, -1) ' variable definition
  Dim s1 = New List(Of Integer)() ' variable definition
  Dim s2 = New List(Of Integer)() ' variable definition
  Return {s0, s1, s2}
End Function

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

Function colour(disc As Integer) As Integer
  Dim colours = {red, yellow, blue, brown, green, &HFF9900, &H6600FF, &H00CC00, &H3399FF, &HFF99CC} ' variable definition
  Return colours(disc - 1)
End Function

<TestMethod> Sub test_colour()
  ' Normal cases
  Assert.AreEqual(green, colour(5))
  ' Edge cases
  Assert.AreEqual(red, colour(1))
  Assert.AreEqual(&HFF99CC, colour(10))
  ' Error cases
  Assert.AreEqual("Out of range index: 10 size: 10", colour(11))
End Sub

Function top(s As List(Of Integer)) As Integer
  Return s(s.length() - 1)
End Function

<TestMethod> Sub test_top()
  ' Normal cases
  Assert.AreEqual(1, top({3, 2, 1}))
  ' Edge cases
  Assert.AreEqual(7, top({7}))
  ' Error cases
  Assert.AreEqual("Out of range index: -1 size: 0", top(New List(Of Integer)()))
End Sub
