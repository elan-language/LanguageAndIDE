' VB.NET with Elan 2.0.0-alpha

Const allWords = "AAHED ZYMIC"

Const allValidAnswers = "ABACK ZONAL"

Sub main()
  While True
    Const choice = inputIntBetween("1 to solve puzzle set by computer\n2 to set a puzzle for computer to solve\n3 to test test_effectiveness of computer's algorithm\n4 to look up word", 1, 4)
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
    used[letter] = " " ' set
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
  For Each i In range(0, 5)
    Dim sa = New List(Of String)() ' variable
    For Each j In range(0, 6)
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
  For Each i In range(0, 5)
    Dim letter = grid[i][attemptNo] ' variable
    Dim mark = marks[i] ' variable
    grid[i][attemptNo] = letter + mark ' set
    If mark.isAfter(used[letter]) Then
      used[letter] = mark ' set
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
    For Each i In range(0, 5)
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
    outcomes[attempts] = outcomes[attempts] + 1 ' set
  Next word
  Dim success = 0 ' variable
  Dim weightedSum = 0 ' variable
  For Each i In range(1, 7)
    success = success + outcomes[i] ' set
    weightedSum = weightedSum + (i*outcomes[i]) ' set
  Next i
  clearPrintedText() ' call
  Const solved = (success/2309.0*100).floor()
  Const avg = divAsFloat(weightedSum, success).round(2)
  Const pc = "%"
  print($"For all 2309 possible answers,\nthe current reverse-game algorithm \nsolved {solved}{pc} within 6 attempts,\nwith an average of {avg} attempts.") ' call
End Sub

Function isUCLetter(k As String) As Boolean
  Const unicode = k.asUnicode()
  Return (k.length() = 1) And (unicode > 64) And (unicode < 91)
End Function

<TestMethod> Sub test_isUCLetter()
  Assert.AreEqual(True, isUCLetter("A"))
  Assert.AreEqual(True, isUCLetter("Z"))
  Assert.AreEqual(False, isUCLetter("a"))
  Assert.AreEqual(False, isUCLetter("1"))
  Assert.AreEqual(False, isUCLetter(" "))
End Sub

Function getWord(attemptNo As Integer, grid As List(Of List(Of String))) As String
  Dim guessWord = "" ' variable
  For Each i In range(0, 5)
    guessWord = guessWord + grid[i][attemptNo] ' set
  Next i
  Return guessWord
End Function

Function setChar(word As String, n As Integer, newChar As String) As String
  Return word.subString(0, n) + newChar + word.subString(n + 1, word.length())
End Function

<TestMethod> Sub test_setChar()
  Assert.AreEqual("_BCDE", setChar("ABCDE", 0, "_"))
  Assert.AreEqual("ABCD_", setChar("ABCDE", 4, "_"))
End Sub

Function markAttempt(attempt As String, target As String) As String
  Dim mark = "00000" ' variable
  Dim unused = target ' variable
  For Each n In range(0, 5)
    If attempt[n].equals(unused[n]) Then
      mark = setChar(mark, n, "2") ' set
      unused = setChar(unused, n, " ") ' set
    End If
  Next n
  For Each n In range(0, 5)
    If (Not mark[n].equals("2")) And unused.contains(attempt[n]) Then
      mark = setChar(mark, n, "1") ' set
      unused = setChar(unused, unused.indexOf(attempt[n]), " ") ' set
    End If
  Next n
  Return mark
End Function

<TestMethod> Sub test_markAttempt()
  Assert.AreEqual("00000", markAttempt("ABCDE", "XXXXX"))
  Assert.AreEqual("11111", markAttempt("ABCDE", "BCDEA"))
  Assert.AreEqual("22222", markAttempt("ABCDE", "ABCDE"))
  Assert.AreEqual("02000", markAttempt("SAINT", "LADLE"))
  Assert.AreEqual("01111", markAttempt("IDEAL", "LADLE"))
  Assert.AreEqual("10020", markAttempt("CABAL", "RECAP"))
  Assert.AreEqual("01100", markAttempt("COLON", "GLORY"))
  Assert.AreEqual("10120", markAttempt("AORTA", "RATTY"))
  Assert.AreEqual("11020", markAttempt("RATTY", "AORTA"))
  Assert.AreEqual("02012", markAttempt("FAIRY", "RATTY"))
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

<TestMethod> Sub test_possibleAnswersAfterAttempt()
  Dim prior = {"ABCDE", "BCDEA", "CDEAB", "DEABC", "EABCD"} ' variable
  Assert.AreEqual({"ABCDE"}, possibleAnswersAfterAttempt(prior, "AAAAA", "20000"))
  Assert.AreEqual({"BCDEA", "CDEAB", "DEABC", "EABCD"}, possibleAnswersAfterAttempt(prior, "AXXXX", "10000"))
  Assert.AreEqual({"BCDEA", "CDEAB", "EABCD"}, possibleAnswersAfterAttempt(prior, "AXXBX", "10010"))
  Assert.AreEqual({"RATTY"}, possibleAnswersAfterAttempt({"RATTY"}, "AORTA", "10120"))
  Assert.AreEqual({"RASPY", "RATTY"}, possibleAnswersAfterAttempt({"FAIRY", "HAIRY", "RAINY", "RASPY", "RATTY"}, "FAIRY", "02012"))
End Sub

Function drawGrid(grid As List(Of List(Of String))) As String
  Dim html = $"<style>{style}</style> <grid>" ' variable
  For Each row In range(0, 6)
    html = html + "<word>" ' set
    For Each col In range(0, 5)
      Const entry = grid[col][row]
      Const ch = if(entry.length() > 0, entry[0], "")
      Const mark = if(entry.length() > 1, entry.subString(1, entry.length()), "")
      html = html + $"<ch class='_{mark}'>{ch}</ch>" ' set
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
      html = html + $"<key class='_{used[k]}'>{k}</key>" ' set
    End If
  Next k
  Return html + "<key></key></div></keyboard>"
End Function

Const style = "grid { display: flex; flex-direction: column; margin-top: 40px; width: 500px;}word { display: flex; flex-direction: row; margin: auto;}ch, key { font-family: Segoe UI, Tahoma, Geneva, Verdana, sans-serif; font-weight: bold; background-color: white;}ch { text-align: center; font-size: 18pt; border: solid, 1.5px, black; margin: 2px; width: 37.5px; height: 37.5px; line-height: 33px;}ch:empty, key:empty { border-color: lightgrey;}key._ { background-color: lightgrey;}ch._2, key._2 { background-color: #6aaa64; border-color: #6aaa64; color: white;}ch._1, key._1 { background-color: #c9b458; border-color: #c9b458; color: white;}ch._0, key._0 { background-color: #787c7e; border-color: #787c7e; color: white;}keyboard { width: 500px; display: flex; flex-direction: column; margin-top:5px;}keyboard div { display: flex; flex-direction: row; margin:auto;}key { display: block; float: left; font-size: 10pt; width: 23px; margin: 2px; padding-bottom: 6px; padding-top:5px; text-align: center; border-radius: 5px;}"
