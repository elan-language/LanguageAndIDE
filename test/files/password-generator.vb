' VB.NET with Elan 2.0.0-beta1

' Ideas for further development

' - rule for no more than 'n' same characters in succession

Const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

Const lowerChars = "abcdefghijklmnopqrstuvwxyz"

Const digitChars = "01234567890"

Const symbolChars = "!$%^&*"

Const length = 32

Const upper = True

Const lower = True

Const digit = True

Const symbol = True

Sub main()
  Dim all = upperChars + lowerChars + digitChars + symbolChars ' variable definition
  Dim password = "" ' variable definition
  Dim valid = False ' variable definition
  While Not valid
    Dim pwRef = New AsRef(Of String)("") ' variable definition
    populatePassword(pwRef, all) ' call procedure
    password = pwRef.value() ' reassign variable
    valid = isValid(password, upper, lower, digit, symbol) ' reassign variable
  End While
  Console.WriteLine(password) ' print
End Sub

Sub populatePassword(password As AsRef(Of String), all As String) ' procedure
  For Each i In range(1, length + 1)
    Dim rnd = randint(0, all.length() - 1) ' variable definition
    password.set(password.value() + all(rnd)) ' call procedure
  Next i
End Sub

Function isValid(password As String, mustHaveUpper As Boolean, mustHaveLower As Boolean, mustHaveDigit As Boolean, mustHaveSymbol As Boolean) As Boolean
  Dim validForUpper = passesRule(mustHaveUpper, upperChars, password) ' variable definition
  Dim validForLower = passesRule(mustHaveLower, lowerChars, password) ' variable definition
  Dim validForDigits = passesRule(mustHaveDigit, digitChars, password) ' variable definition
  Dim validForSymbols = passesRule(mustHaveSymbol, symbolChars, password) ' variable definition
  Return validForUpper And validForLower And validForDigits And validForSymbols
End Function

<TestMethod> Sub test_isValid()
  Assert.AreEqual(True, isValid("$4De", True, True, True, True))
  Assert.AreEqual(False, isValid("$4de", True, True, True, True))
  Assert.AreEqual(True, isValid("$4de", False, True, True, True))
  Assert.AreEqual(True, isValid("eD$4", True, True, True, True))
  Assert.AreEqual(True, isValid("$4De$4De", True, True, True, True))
End Sub

Function passesRule(rule As Boolean, charSet As String, password As String) As Boolean
  Return (Not rule) Or hasAtLeastOneFrom(charSet, password)
End Function

<TestMethod> Sub test_passesRule()
  Assert.AreEqual(True, passesRule(True, "12A", "ABC"))
  Assert.AreEqual(True, passesRule(False, "12A", "ABC"))
  Assert.AreEqual(False, passesRule(True, "12", "ABCD"))
  Assert.AreEqual(True, passesRule(False, "12", "ABCD"))
End Sub

Function hasAtLeastOneFrom(fromChars As String, password As String) As Boolean
  Dim hasOne = False ' variable definition
  For Each ch In password
    hasOne = hasOne Or fromChars.contains(ch) ' reassign variable
  Next ch
  Return hasOne
End Function

<TestMethod> Sub test_hasAtLeastOneFrom()
  Assert.AreEqual(True, hasAtLeastOneFrom("12A", "ABC"))
  Assert.AreEqual(True, hasAtLeastOneFrom("C12", "ABC"))
  Assert.AreEqual(False, hasAtLeastOneFrom("12", "ABCD"))
End Sub
