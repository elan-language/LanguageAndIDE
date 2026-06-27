' VB.NET with Elan 2.0.0-beta1

Sub main()
  Dim li = {7, 1, 0, 4, 8, 3, 6} ' variable definition
  Console.WriteLine(li) ' print statement
  inPlaceRippleSort(li) ' procedure call
  Console.WriteLine(li) ' print statement
End Sub

Sub inPlaceRippleSort(li As List(Of Integer)) ' procedure
  Dim hasChanged = True ' variable definition
  Dim lastComp = li.length() - 2 ' variable definition
  While hasChanged = True
    hasChanged = False ' assignment
    For Each i In range(0, lastComp + 1)
      If li(i) > li(i + 1) Then
        Dim temp = li(i) ' variable definition
        li(i) = li(i + 1) ' assignment
        li(i + 1) = temp ' assignment
        hasChanged = True ' assignment
      End If
    Next i
    lastComp = lastComp - 1 ' assignment
  End While
End Sub
