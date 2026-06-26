' VB.NET with Elan 2.0.0-beta1

Sub main()
  Dim blocks = createBlockGraphics(black) ' variable definition
  blocks = createStart(blocks) ' reassign variable
  For Each i In range(0, displayWidth + 1)
    Dim x = randint(0, 39) ' variable definition
    Dim y = randint(0, 29) ' variable definition
    Dim p = New Point(x, y) ' variable definition
    Dim existing = getValue(p, blocks) ' variable definition
    Dim setTo = (random() + 0.7).floor() ' variable definition
    If okToSet(p, setTo, blocks) Then
      Dim colour = if_(setTo = 1, white, black) ' variable definition
      blocks(p.x)(p.y) = colour ' reassign variable
    End If
  Next i
  displayBlocks(blocks) ' call procedure
  Console.WriteLine("File name to save: ")

      Dim name = Console.ReadLine() ' input
  If Not name.equals("x") Then
    saveAsFile(name, blocks) ' call procedure
  End If
End Sub

Const displayWidth = 150

Sub saveAsFile(name As String, b As List(Of List(Of Integer))) ' procedure
  Dim file = createFileForWriting(name) ' variable definition
  For Each row In range(0, 30)
    Dim line = "" ' variable definition
    For Each col In range(0, 40)
      Dim colour = b(col)(row) ' variable definition
      Dim symbol = if_(colour = white, " ", "X") ' variable definition
      line = line + symbol ' reassign variable
    Next col
    file.writeLine(line) ' call procedure
  Next row
  file.saveAndClose() ' call procedure
End Sub

Function createStart(b As List(Of List(Of Integer))) As List(Of List(Of Integer))
  Dim b2 = b ' variable definition
  For Each i In rangeInSteps(0, 16, 2)
    b2 = addRectangle(b2, i, i, 39 - 2*i, 29 - 2*i) ' reassign variable
  Next i
  Return b2
End Function

Function addRectangle(b As List(Of List(Of Integer)), startX As Integer, startY As Integer, width As Integer, depth As Integer) As List(Of List(Of Integer))
  Dim paint = white ' variable definition
  Dim b2 = b ' variable definition
  For Each x In range(startX, startX + width + 1)
    b2 = withPut(b2, x, startY, paint) ' reassign variable
    b2 = withPut(b2, x, startY + depth, paint) ' reassign variable
  Next x
  For Each y In range(startY, startY + depth + 1)
    b2 = withPut(b2, startX, y, paint) ' reassign variable
    b2 = withPut(b2, startX + width, y, paint) ' reassign variable
  Next y
  Return b2
End Function

Function withPut(graphics As List(Of List(Of Integer)), x As Integer, y As Integer, colour As Integer) As List(Of List(Of Integer))
  Return graphics.withSet(x, graphics(x).withSet(y, colour))
End Function

' colour: 0 for black, 1 for white

Function okToSet(p As Point, colour As Integer, g As List(Of List(Of Integer))) As Boolean
  Dim n = p.neighbouringPoints().map(Function (p As Point) getValue(p, g)) ' variable definition
  Dim q1 = isValidQuadrant(n(0) + n(1)*2 + colour*4 + n(3)*8) ' variable definition
  Dim q2 = isValidQuadrant(n(1) + n(2)*2 + n(4)*4 + colour*8) ' variable definition
  Dim q3 = isValidQuadrant(colour + n(4)*2 + n(7)*4 + n(6)*8) ' variable definition
  Dim q4 = isValidQuadrant(n(3) + colour*2 + n(6)*4 + n(5)*8) ' variable definition
  Return q1 And q2 And q3 And q4
End Function

Function getValue(p As Point, b As List(Of List(Of Integer))) As Integer
  Dim result = 0 ' variable definition
  If (p.x > -1) And (p.x < 40) And (p.y > -1) And (p.y < 30) Then
    Dim colour = b(p.x)(p.y) ' variable definition
    result = if_(colour = black, 0, 1) ' reassign variable
  End If
  Return result
End Function

Function flip01(v As Integer) As Integer
  Return if_(v = 0, 1, 0)
End Function

<TestClass Class Test_flip01
 <TestMethod> Sub test_flip01()
  Assert.AreEqual(1, flip01(0))
  Assert.AreEqual(0, flip01(1))
 End Sub
End Class


Function isValidQuadrant(q As Integer) As Boolean
  Return (q Mod 5) <> 0
End Function

<TestClass Class Test_isValidQuadrant
 <TestMethod> Sub test_isValidQuadrant()
  Assert.AreEqual(False, isValidQuadrant(0))
  Assert.AreEqual(True, isValidQuadrant(1))
  Assert.AreEqual(True, isValidQuadrant(2))
  Assert.AreEqual(True, isValidQuadrant(3))
  Assert.AreEqual(True, isValidQuadrant(4))
  Assert.AreEqual(False, isValidQuadrant(5))
  Assert.AreEqual(True, isValidQuadrant(6))
  Assert.AreEqual(True, isValidQuadrant(7))
  Assert.AreEqual(True, isValidQuadrant(8))
  Assert.AreEqual(True, isValidQuadrant(9))
  Assert.AreEqual(False, isValidQuadrant(10))
  Assert.AreEqual(True, isValidQuadrant(11))
  Assert.AreEqual(True, isValidQuadrant(12))
  Assert.AreEqual(True, isValidQuadrant(13))
  Assert.AreEqual(True, isValidQuadrant(14))
  Assert.AreEqual(False, isValidQuadrant(15))
 End Sub
End Class


Class Point

  Property x As Integer

  Property y As Integer

  Sub New(x As Integer, y As Integer)
    Me.x = x ' reassign variable
    Me.y = y ' reassign variable
  End Sub

  Function toString() As String
    Return $"Point at {Me.x}, {Me.y}"
  End Function

  ' Returns the 8 theoretically-neighbouring points, whether or not within bounds
  Function neighbouringPoints() As List(Of Point)
    Dim x = Me.x ' variable definition
    Dim y = Me.y ' variable definition
    Return {New Point(x - 1, y - 1), New Point(x, y - 1), New Point(x + 1, y - 1), New Point(x - 1, y), New Point(x + 1, y), New Point(x - 1, y + 1), New Point(x, y + 1), New Point(x + 1, y + 1)}
  End Function

End Class

<TestClass Class Test_neighbouringPoints
 <TestMethod> Sub test_neighbouringPoints()
  Dim p = New Point(0, 0) ' variable definition
  Dim n = p.neighbouringPoints() ' variable definition
  Dim expected = {New Point(-1, -1), New Point(0, -1), New Point(1, -1), New Point(-1, 0), New Point(1, 0), New Point(-1, 1), New Point(0, 1), New Point(1, 1)} ' variable definition
  Assert.AreEqual(expected, n)
 End Sub
End Class

