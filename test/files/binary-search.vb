' VB.NET with Elan 2.0.0-alpha

Sub main()
  Dim fruit = {"apple", "avocado", "banana", "blueberry", "cherry", "fig", "grape", "kiwi", "lemon", "lychee", "mango", "orange", "papaya", "peach", "pear", "pineapple", "plum", "raspberry", "strawberry", "watermelon"} ' variable
  Dim done = False ' variable
  While Not done
    Dim wanted = inputString("What type of fruit do you want ('x' to exit)? ") ' variable
    If wanted.equals("x") Then
      done = True ' set
    Else
      Dim result = binarySearch(fruit, wanted) ' variable
      If result Then
        print($"\nWe can supply a {wanted}") ' call
      Else
        print($"\nSorry, we cannot supply a {wanted}") ' call
      End If
    End If
  End While
End Sub

Function binarySearch(li As List(Of String), item As String) As Boolean
  Dim result = False ' variable
  If li.length() > 0 Then
    Const mid = divAsInt(li.length(), 2)
    Dim value = li[mid] ' variable
    If item.equals(value) Then
      result = True ' set
    ElseIf item.isBefore(value) Then
      result = binarySearch(li.subList(0, mid), item) ' set
    Else
      result = binarySearch(li.subList(mid + 1, li.length()), item) ' set
    End If
  End If
  Return result
End Function

<TestMethod> Sub test_binarySearch()
  Dim li1 = {"lemon", "lime", "orange"} ' variable
  Assert.AreEqual(True, binarySearch(li1, "lemon"))
  Assert.AreEqual(True, binarySearch(li1, "lime"))
  Assert.AreEqual(True, binarySearch(li1, "orange"))
  Assert.AreEqual(False, binarySearch(li1, "pear"))
  Dim li2 = {"lemon", "orange"} ' variable
  Assert.AreEqual(True, binarySearch(li2, "lemon"))
  Assert.AreEqual(True, binarySearch(li2, "orange"))
  Assert.AreEqual(False, binarySearch(li2, "pear"))
  Dim li3 = {"lemon"} ' variable
  Assert.AreEqual(True, binarySearch(li3, "lemon"))
  Assert.AreEqual(False, binarySearch(li3, "lime"))
  Dim li4 = New List(Of String)() ' variable
  Assert.AreEqual(False, binarySearch(li4, "pear"))
End Sub
