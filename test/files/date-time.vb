' VB.NET with Elan 2.0.0-alpha1

Sub main()
  Dim reply = "" ' variable definition
  While Not reply.upperCase().equals("Q")
    reply = input("RETURN for time now or Unix time (positive integer) or Q to quit") ' change variable
    If reply.equals("") Then
      Const now = divAsInt(clock(), 1000)
      print(now)
      print(getDate(now))
    Else
      Dim td = parseAsInt(reply) ' variable definition
      If td.item_0 And (td.item_1 >= 0) Then
        print(getDate(td.item_1))
      End If
    End If
  End While
End Sub

Function getDate(unixSecs As Integer) As String
  Dim dt = dateTime(unixSecs) ' variable definition
  Const hour = dt.item_0
  Const minute = dt.item_1
  Const second = dt.item_2
  Const days = dt.item_3
  Const year = dt.item_4
  Const weekday = dt.item_5
  Const z2 = "00"
  Const h = padLwithZero(hour)
  Const m = padLwithZero(minute)
  Const s = padLwithZero(second)
  Dim startDays = getStartDays() ' variable definition
  Dim startDaysL = startDaysList(year, startDays) ' variable definition
  Dim month_day = monthDay(startDaysL, (days Mod startDays[12])) ' variable definition
  Const month = month_day.item_0
  Const day = month_day.item_1
  Const dayName = getWeekdayName(weekday)
  Const d = padLwithZero(day)
  Const monthName = getMonthName(month)
  Return $"{dayName}, {d} {monthName} {year} {h}:{m}:{s} UTC"
End Function

<TestMethod> Sub test_getDate()
  Assert.AreEqual("Tue, 31 Mar 2026 08:49:51 UTC", getDate(1774946991))
End Sub

Function dateTime(unixSecs As Integer) As (Integer, Integer, Integer, Integer, Integer, Integer)
  ' get separate values from Unix time
  Const hour = (divAsInt(divAsInt(unixSecs, 60), 60) Mod 24)
  Const minute = divAsInt(unixSecs, 60) Mod 60
  Const second = (unixSecs Mod 60)
  ' days and years from Unix epoch
  Const unixDay = divAsInt(unixSecs, daySecs)
  Const years = ((unixDay + 1)/365.24).floor()
  ' this year and weekday
  Const year = unixYear + years
  Const weekday = (unixDay + unixWeekday) Mod 7
  ' day number (1-365 or 1-366) in this year
  Const day = dayInYear(year, unixDay)
  Return (hour, minute, second, day, year, weekday)
End Function

<TestMethod> Sub test_dateTime()
  Assert.AreEqual((8, 49, 51, 90, 2026, 2), dateTime(1774946991))
End Sub

Function dayInYear(year As Integer, unixDays As Integer) As Integer
  ' unixDays start at 0, months, day numbers start at 1
  Dim dayNumber = unixDays + 1 ' variable definition
  If year > unixYear Then
    ' discount previous nominal years
    dayNumber = dayNumber - 365*(year - unixYear) ' change variable
    ' discount previous leap days
    For Each y In range(unixYear, year)
      If leap(y) Then
        dayNumber = dayNumber - 1 ' change variable
      End If
    Next y
  End If
  Return dayNumber
End Function

<TestMethod> Sub test_dayInYear()
  Assert.AreEqual(-20087, dayInYear(2025, 1))
End Sub

Function leap(year As Integer) As Boolean
  Dim leapYear = False ' variable definition
  If (year Mod 4) = 0 Then
    leapYear = True ' change variable
    If ((year Mod 100) = 0) And ((divAsInt(year, 100) Mod 4) <> 0) Then
      leapYear = False ' change variable
    End If
  End If
  Return leapYear
End Function

<TestMethod> Sub test_leap()
  Assert.AreEqual(False, leap(2025))
  Assert.AreEqual(True, leap(2024))
  Assert.AreEqual(False, leap(1900))
  Assert.AreEqual(True, leap(2000))
End Sub

Function monthDay(startDays As List(Of Integer), dayNumber As Integer) As (Integer, Integer)
  ' get month (1-12) &amp; day (1-31) from dayNumber (1-365 or 1-366)
  Dim month = 1 ' variable definition
  Dim day = 0 ' variable definition
  Dim monthFound = False ' variable definition
  While monthFound = False
    If (dayNumber < startDays[month]) Then
      monthFound = True ' change variable
      day = dayNumber - startDays[month - 1] + 1 ' change variable
    Else
      month = month + 1 ' change variable
    End If
  End While
  Return (month, day)
End Function

Function startDaysList(year As Integer, startDays As List(Of Integer)) As List(Of Integer)
  ' alter month start days if leap year
  Dim startDaysL = getStartDays() ' variable definition
  If leap(year) Then
    For Each m In range(2, 13)
      startDaysL = startDaysL.withSet(m, startDaysL[m] + 1) ' change variable
    Next m
  End If
  Return startDaysL
End Function

' Unix epoch is 1970.01.01 00:00:00 Thursday

Const unixYear = 1970

Const unixWeekday = 4

Const daySecs = 86400

' day and month names, and day numbers

Function getWeekdayName(weekDay As Integer) As String
  Dim names = {"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"} ' variable definition
  Return names[weekDay]
End Function

<TestMethod> Sub test_getWeekdayName()
  Assert.AreEqual("Sun", getWeekdayName(0))
  Assert.AreEqual("Sat", getWeekdayName(6))
End Sub

Function getMonthName(month As Integer) As String
  Dim names = {"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"} ' variable definition
  Return names[month - 1]
End Function

<TestMethod> Sub test_getMonthName()
  Assert.AreEqual("Jan", getMonthName(1))
  Assert.AreEqual("Dec", getMonthName(12))
End Sub

Function getStartDays() As List(Of Integer)
  Return {1, 32, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366}
End Function

Function padLwithZero(i As Integer) As String
  Return pad("L", "00", i.toString())
End Function

<TestMethod> Sub test_padLwithZero()
  Assert.AreEqual("01", padLwithZero(1))
  Assert.AreEqual("10", padLwithZero(10))
  Assert.AreEqual("00", padLwithZero(0))
End Sub

Function pad(d As String, p As String, s As String) As String
  ' d: L or R for pad left or right
  ' p: output string pattern of pad characters and of length
  ' s: input string
  Dim sR = s ' variable definition
  If p.length() > s.length() Then
    If d.upperCase().equals("L") Then
      Const ps = p + s
      sR = ps.subString(ps.length() - p.length(), ps.length()) ' change variable
    ElseIf d.upperCase().equals("R") Then
      sR = (s + p).subString(0, p.length()) ' change variable
    End If
  End If
  Return sR
End Function
