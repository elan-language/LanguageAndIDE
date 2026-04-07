' VB.NET with Elan 2.0.0-alpha1

Sub main()
  Dim fruit = {"apple", "avocado", "banana", "blueberry", "cherry", "fig", "grape", "kiwi", "lemon", "lychee", "mango", "orange", "papaya", "peach", "pear", "pineapple", "plum", "raspberry", "strawberry", "watermelon"} ' variable definition
  Dim done = False ' variable definition
  While Not done
    Dim wanted = input("What type of fruit do you want ('x' to exit)? ") ' variable definition
    If wanted.equals("x") Then
      done = True ' change variable
    Else
      Dim result = binarySearch(fruit, wanted) ' variable definition
      If result Then
        print($"\nWe can supply a {wanted}")
      Else
        print($"\nSorry, we cannot supply a {wanted}")
      End If
    End If
  End While
End Sub

Function binarySearch(li As List(Of String), item As String) As Boolean
  Dim result = False ' variable definition
  If li.length() > 0 Then
    Const mid = divAsInt(li.length(), 2)
    Dim value = li[mid] ' variable definition
    If item.equals(value) Then
      result = True ' change variable
    ElseIf item.isBefore(value) Then
      result = binarySearch(li.subList(0, mid), item) ' change variable
    Else
      result = binarySearch(li.subList(mid + 1, li.length()), item) ' change variable
    End If
  End If
  Return result
End Function

<TestMethod> Sub test_binarySearch()
  Dim li1 = {"lemon", "lime", "orange"} ' variable definition
  Assert.AreEqual(True, binarySearch(li1, "lemon"))
  Assert.AreEqual(True, binarySearch(li1, "lime"))
  Assert.AreEqual(True, binarySearch(li1, "orange"))
  Assert.AreEqual(False, binarySearch(li1, "pear"))
  Dim li2 = {"lemon", "orange"} ' variable definition
  Assert.AreEqual(True, binarySearch(li2, "lemon"))
  Assert.AreEqual(True, binarySearch(li2, "orange"))
  Assert.AreEqual(False, binarySearch(li2, "pear"))
  Dim li3 = {"lemon"} ' variable definition
  Assert.AreEqual(True, binarySearch(li3, "lemon"))
  Assert.AreEqual(False, binarySearch(li3, "lime"))
  Dim li4 = New List(Of String)() ' variable definition
  Assert.AreEqual(False, binarySearch(li4, "pear"))
End Sub
