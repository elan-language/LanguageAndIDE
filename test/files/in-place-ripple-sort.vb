' VB.NET with Elan 2.0.0-alpha

Sub main()
  Dim li = {7, 1, 0, 4, 8, 3, 6} ' variable
  print(li) ' call
  inPlaceRippleSort(li) ' call
  print(li) ' call
End Sub

Sub inPlaceRippleSort(li As List(Of Integer)) ' procedure
  Dim hasChanged = True ' variable
  Dim lastComp = li.length() - 2 ' variable
  While hasChanged = True
    hasChanged = False ' set
    For i = 0 To lastComp + 1 - 1 Step 1
      If li[i] > li[i + 1] Then
        Dim temp = li[i] ' variable
        li.put(i, li[i + 1]) ' call
        li.put(i + 1, temp) ' call
        hasChanged = True ' set
      End If
    Next i
    lastComp = lastComp - 1 ' set
  End While
End Sub
