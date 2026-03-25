' VB.NET with Elan 2.0.0-alpha1

Sub main()
  Dim li = {7, 1, 0, 4, 8, 3, 6} ' variable definition 
  print(li) ' call procedure
  inPlaceRippleSort(li) ' call procedure
  print(li) ' call procedure
End Sub

Sub inPlaceRippleSort(li As List(Of Integer)) ' procedure
  Dim hasChanged = True ' variable definition 
  Dim lastComp = li.length() - 2 ' variable definition 
  While hasChanged = True
    hasChanged = False ' set
    For Each i In range(0, lastComp + 1)
      If li[i] > li[i + 1] Then
        Dim temp = li[i] ' variable definition 
        li[i] = li[i + 1] ' set
        li[i + 1] = temp ' set
        hasChanged = True ' set
      End If
    Next i
    lastComp = lastComp - 1 ' set
  End While
End Sub
