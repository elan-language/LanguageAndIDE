' VB.NET with Elan 2.0.0-alpha

+Const allWords = "AAHED ZYMIC"

+Const allValidAnswers = "ABACK ZONAL"

Sub main()
  While True
    Const choice = inputIntBetween("1 to solve puzzle set by computer2 to set a puzzle for computer to solve3 to test test_effectiveness of computer's algorithm4 to look up word", 1, 4)
    clearAllDisplays() ' call
    executeOption(choice) ' call
    pressAnyKeyToContinue(True) ' call
    clearAllDisplays() ' call
  End While
End Sub

Sub executeOption(choice As Integer) ' procedure
  If choice = 1 Then
    print("Reduce screen magnification if you can't see all the keys") ' call
    playGame() ' call
  ElseIf choice = 2 Then
    print("Mark using: 0 (grey), 1 (yellow), 2 (green), Enter") ' call
    playReverseGame() ' call
  ElseIf choice = 3 Then
    print("Please wait for analysis to complete ...") ' call
    analyse() ' call
  Else
    Const word = inputStringWithLimits("Enter word: ", 5, 5).upperCase()
    If allValidAnswers.contains(word) Then
      print($"{word} is a valid answer") ' call
    ElseIf allWords.contains(word) Then
      print($"{word} is not a valid answer, but is a valid guess word") ' call
    Else
      print($"{word} is not a recognised word") ' call
    End If
  End If
End Sub

Sub playGame() ' procedure
  Dim grid = New List(Of List(Of String))() ' variable
  initialiseGrid(grid) ' call
  Dim used = New Dictionary(Of String, String)() ' variable
  For Each letter In "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    used.put(letter, " ") ' call
  Next letter
  displayHtml(drawGrid(grid) + drawKeyboard(used)) ' call
  Const target = allValidAnswers.split(" ")[randomInt(0, 2308)]
  Dim attemptNo = 0 ' variable
  Dim solved = False ' variable
  While (attemptNo < 6) And (Not solved)
    enterAttempt(attemptNo, grid, used) ' call
    Dim solvedRef = New AsRef(Of Boolean)(solved) ' variable
    colourAttempt(attemptNo, grid, target, solvedRef, used) ' call
    solved = solvedRef.value() ' set
    attemptNo = attemptNo + 1 ' set
  End While
  clearPrintedText() ' call
  If solved Then
    print("Well done!") ' call
  End If
End Sub

Sub initialiseGrid(grid As List(Of List(Of String))) ' procedure
  For i = 0 To 4 + 1 - 1 Step 1
    Dim sa = New List(Of String)() ' variable
    For j = 0 To 5 + 1 - 1 Step 1
      sa.append("") ' call
    Next j
    grid.append(sa) ' call
  Next i
End Sub

Sub enterAttempt(attemptNo As Integer, grid As List(Of List(Of String)), used As Dictionary(Of String, String)) ' procedure
  Dim chNo = 0 ' variable
  Dim word = "" ' variable
  While chNo <= 5
    Dim k = waitForKey().upperCase() ' variable
    If (k.equals("BACKSPACE")) And (chNo > 0) Then
      chNo = chNo - 1 ' set
      grid[chNo][attemptNo] = "" ' set
      word = word ' set
      clearPrintedText() ' call
    ElseIf (chNo < 5) And isUCLetter(k) Then
      grid[chNo][attemptNo] = k ' set
      chNo = chNo + 1 ' set
      word = word + k ' set
    ElseIf (chNo = 5) And (k.equals("ENTER")) Then
      If allWords.contains(word) Then
        chNo = chNo + 1 ' set
      Else
        print("Invalid word") ' call
      End If
    End If
    displayHtml(drawGrid(grid) + drawKeyboard(used)) ' call
  End While
End Sub

Sub colourAttempt(attemptNo As Integer, grid As List(Of List(Of String)), target As String, solved As AsRef(Of Boolean), used As Dictionary(Of String, String)) ' procedure
  Dim attempt = getWord(attemptNo, grid) ' variable
  Dim marks = markAttempt(attempt, target) ' variable
  For i = 0 To 4 + 1 - 1 Step 1
    Dim letter = grid[i][attemptNo] ' variable
    Dim mark = marks[i] ' variable
    grid[i][attemptNo] = letter + mark ' set
    If mark.isAfter(used[letter]) Then
      used.put(letter, mark) ' call
    End If
  Next i
  If marks.equals("22222") Then
    solved.set(True) ' call
  End If
  displayHtml(drawGrid(grid) + drawKeyboard(used)) ' call
End Sub

Sub playReverseGame() ' procedure
  Dim grid = New List(Of List(Of String))() ' variable
  initialiseGrid(grid) ' call
  Dim attemptNo = 0 ' variable
  Dim solved = False ' variable
  Dim possible = allValidAnswers.split(" ") ' variable
  Dim attempt = "ARISE" ' variable
  While (attemptNo < 6) And (Not solved)
    For i = 0 To 4 + 1 - 1 Step 1
      grid[i][attemptNo] = attempt[i] ' set
    Next i
    displayHtml(drawGrid(grid)) ' call
    Dim mark = "" ' variable
    Dim markRef = New AsRef(Of String)(mark) ' variable
    enterMark(attemptNo, grid, markRef) ' call
    mark = markRef.value() ' set
    If mark.equals("22222") Then
      solved = True ' set
    Else
      attemptNo = attemptNo + 1 ' set
      possible = possibleAnswersAfterAttempt(possible, attempt, mark) ' set
    End If
    If possible.length() = 0 Then
      print("No possible answer matches marks so far. Press any key to continue") ' call
      attemptNo = 6 ' set
    Else
      attempt = possible[divAsInt(possible.length(), 2)] ' set
    End If
  End While
End Sub

Sub enterMark(attemptNo As Integer, grid As List(Of List(Of String)), markRef As AsRef(Of String)) ' procedure
  Dim mark = markRef.value() ' variable
  Dim guess = getWord(attemptNo, grid) ' variable
  Dim chNo = 0 ' variable
  While chNo <= 5
    Dim k = waitForKey().upperCase() ' variable
    If (k.equals("BACKSPACE")) And (chNo > 0) Then
      chNo = chNo - 1 ' set
      Dim entry = grid[chNo][attemptNo] ' variable
      grid[chNo][attemptNo] = entry[0] ' set
      mark = mark.subString(0, chNo) ' set
    ElseIf (chNo < 5) And "012".contains(k) Then
      Dim ch = grid[chNo][attemptNo] ' variable
      grid[chNo][attemptNo] = ch + k ' set
      chNo = chNo + 1 ' set
      mark = mark + k ' set
    ElseIf (chNo = 5) And (k.equals("ENTER")) Then
      chNo = chNo + 1 ' set
    End If
    displayHtml(drawGrid(grid)) ' call
  End While
  markRef.set(mark) ' call
End Sub

Sub analyse() ' procedure
  Dim outcomes = New List(Of Integer)() ' variable
  outcomes.initialise(10, 0) ' call
  For Each word In allValidAnswers.split(" ")
    Dim possible = allValidAnswers.split(" ") ' variable
    Dim mark = "" ' variable
    Dim attempt = "RAISE" ' variable
    Dim attempts = 0 ' variable
    While (Not mark.equals("22222"))
      attempts = attempts + 1 ' set
      mark = markAttempt(attempt, word) ' set
      possible = possibleAnswersAfterAttempt(possible, attempt, mark) ' set
      attempt = possible[0] ' set
    End While
    outcomes.put(attempts, outcomes[attempts] + 1) ' call
  Next word
  Dim success = 0 ' variable
  Dim weightedSum = 0 ' variable
  For i = 1 To 6 + 1 - 1 Step 1
    success = success + outcomes[i] ' set
    weightedSum = weightedSum + (i*outcomes[i]) ' set
  Next i
  clearPrintedText() ' call
  print($"For all 2309 possible answers,the current reverse-game algorithmsolved {(success/2309.0*100).floor()}% within 6 attempts,with an average of {divAsFloat(weightedSum, success).round(2)} attempts.") ' call
End Sub

Function isUCLetter(k As String) As Boolean
  Const unicode = k.asUnicode()
  Return (k.length() = 1) And (unicode > 64) And (unicode < 91)
End Function

Sub test_isUCLetter
  assert isUCLetter("A") is True 
  assert isUCLetter("Z") is True 
  assert isUCLetter("a") is False 
  assert isUCLetter("1") is False 
  assert isUCLetter(" ") is False 
End Sub

Function getWord(attemptNo As Integer, grid As List(Of List(Of String))) As String
  Dim guessWord = "" ' variable
  For i = 0 To 4 + 1 - 1 Step 1
    guessWord = guessWord + grid[i][attemptNo] ' set
  Next i
  Return guessWord
End Function

Function setChar(word As String, n As Integer, newChar As String) As String
  Return word.subString(0, n) + newChar + word.subString(n + 1, word.length())
End Function

Sub test_setChar
  assert setChar("ABCDE", 0, "_") is "_BCDE" 
  assert setChar("ABCDE", 4, "_") is "ABCD_" 
End Sub

Function markAttempt(attempt As String, target As String) As String
  Dim mark = "00000" ' variable
  Dim unused = target ' variable
  For n = 0 To 4 + 1 - 1 Step 1
    If attempt[n].equals(unused[n]) Then
      mark = setChar(mark, n, "2") ' set
      unused = setChar(unused, n, " ") ' set
    End If
  Next n
  For n = 0 To 4 + 1 - 1 Step 1
    If (Not mark[n].equals("2")) And unused.contains(attempt[n]) Then
      mark = setChar(mark, n, "1") ' set
      unused = setChar(unused, unused.indexOf(attempt[n]), " ") ' set
    End If
  Next n
  Return mark
End Function

Sub test_markAttempt
  assert markAttempt("ABCDE", "XXXXX") is "00000" 
  assert markAttempt("ABCDE", "BCDEA") is "11111" 
  assert markAttempt("ABCDE", "ABCDE") is "22222" 
  assert markAttempt("SAINT", "LADLE") is "02000" 
  assert markAttempt("IDEAL", "LADLE") is "01111" 
  assert markAttempt("CABAL", "RECAP") is "10020" 
  assert markAttempt("COLON", "GLORY") is "01100" 
  assert markAttempt("AORTA", "RATTY") is "10120" 
  assert markAttempt("RATTY", "AORTA") is "11020" 
  assert markAttempt("FAIRY", "RATTY") is "02012" 
End Sub

Function possibleAnswersAfterAttempt(possible As List(Of String), attempt As String, mark As String) As List(Of String)
  Dim newPossible = New List(Of String)() ' variable
  For Each word In possible
    Const markForWord = markAttempt(attempt, word)
    If markForWord.equals(mark) Then
      newPossible = newPossible.withAppend(word) ' set
    End If
  Next word
  Return newPossible
End Function

Sub test_possibleAnswersAfterAttempt
  Dim prior = {"ABCDE", "BCDEA", "CDEAB", "DEABC", "EABCD"} ' variable
  assert possibleAnswersAfterAttempt(prior, "AAAAA", "20000") is {"ABCDE"} 
  assert possibleAnswersAfterAttempt(prior, "AXXXX", "10000") is {"BCDEA", "CDEAB", "DEABC", "EABCD"} 
  assert possibleAnswersAfterAttempt(prior, "AXXBX", "10010") is {"BCDEA", "CDEAB", "EABCD"} 
  assert possibleAnswersAfterAttempt({"RATTY"}, "AORTA", "10120") is {"RATTY"} 
  assert possibleAnswersAfterAttempt({"FAIRY", "HAIRY", "RAINY", "RASPY", "RATTY"}, "FAIRY", "02012") is {"RASPY", "RATTY"} 
End Sub

Function drawGrid(grid As List(Of List(Of String))) As String
  Dim html = $"{style} " ' variable
  For row = 0 To 5 + 1 - 1 Step 1
    html = html + "<word>" ' set
    For col = 0 To 4 + 1 - 1 Step 1
      Const entry = grid[col][row]
      Const ch = if entry.length() > 0 then entry[0] else ""
      Const mark = if entry.length() > 1 then entry.subString(1, entry.length()) else ""
      html = html + $"{mark}'>{ch}" ' set
    Next col
    html = html + "</word>" ' set
  Next row
  Return html + "</grid>"
End Function

Function drawKeyboard(used As Dictionary(Of String, String)) As String
  Dim html = "<keyboard><div>" ' variable
  For Each k In "QWERTYUIOP-ASDFGHJKL-ZXCVBNM"
    If k.equals("-") Then
      html = html + "</div><div>" ' set
    Else
      html = html + $"{used[k]}'>{k}" ' set
    End If
  Next k
  Return html + "<key></key></div></keyboard>"
End Function

+Const style = "grid { display: flex; flex-direction: column; margin-top: 40px; width: 500px;}word { display: flex; flex-direction: row; margin: auto;}ch, key { font-family: Segoe UI, Tahoma, Geneva, Verdana, sans-serif; font-weight: bold; background-color: white;}ch { text-align: center; font-size: 18pt; border: solid, 1.5px, black; margin: 2px; width: 37.5px; height: 37.5px; line-height: 33px;}ch:empty, key:empty { border-color: lightgrey;}key._ { background-color: lightgrey;}ch._2, key._2 { background-color: #6aaa64; border-color: #6aaa64; color: white;}ch._1, key._1 { background-color: #c9b458; border-color: #c9b458; color: white;}ch._0, key._0 { background-color: #787c7e; border-color: #787c7e; color: white;}keyboard { width: 500px; display: flex; flex-direction: column; margin-top:5px;}keyboard div { display: flex; flex-direction: row; margin:auto;}key { display: block; float: left; font-size: 10pt; width: 23px; margin: 2px; padding-bottom: 6px; padding-top:5px; text-align: center; border-radius: 5px;}"
