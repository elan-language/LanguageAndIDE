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

Sub test_
  Dim li1 = {"lemon", "lime", "orange"} ' variable
  assert binarySearch(li1, "lemon") is True 
  assert binarySearch(li1, "lime") is True 
  assert binarySearch(li1, "orange") is True 
  assert binarySearch(li1, "pear") is False 
  Dim li2 = {"lemon", "orange"} ' variable
  assert binarySearch(li2, "lemon") is True 
  assert binarySearch(li2, "orange") is True 
  assert binarySearch(li2, "pear") is False 
  Dim li3 = {"lemon"} ' variable
  assert binarySearch(li3, "lemon") is True 
  assert binarySearch(li3, "lime") is False 
  Dim li4 = New List(Of String)() ' variable
  assert binarySearch(li4, "pear") is False 
End Sub
