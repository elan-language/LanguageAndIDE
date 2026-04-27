' VB.NET with Elan 2.0.0-alpha1

Sub main()
  Dim reply = "" ' variable definition
  While Not reply.upperCase().equals("Q")
    reply = input("RETURN for time now or Unix time (positive integer) or Q to quit") ' change variable
    If reply.equals("") Then
      Dim now = divAsInt(clock(), 1000) ' variable definition
      print(now)
      print(getDate(now))
    Else
      Try 
        Dim td = int(reply) ' variable definition
        If td >= 0 Then
          print(getDate(td))
        End If
      Catch e As ElanRuntimeError
      End Try
    End If
  End While
End Sub

Function getDate(unixSecs As Integer) As String
  Dim dt = dateTime(unixSecs) ' variable definition
  Dim hour = dt.item_0 ' variable definition
  Dim minute = dt.item_1 ' variable definition
  Dim second = dt.item_2 ' variable definition
  Dim days = dt.item_3 ' variable definition
  Dim year = dt.item_4 ' variable definition
  Dim weekday = dt.item_5 ' variable definition
  Dim z2 = "00" ' variable definition
  Dim h = padLwithZero(hour) ' variable definition
  Dim m = padLwithZero(minute) ' variable definition
  Dim s = padLwithZero(second) ' variable definition
  Dim startDays = getStartDays() ' variable definition
  Dim startDaysL = startDaysList(year, startDays) ' variable definition
  Dim month_day = monthDay(startDaysL, (days Mod startDays[12])) ' variable definition
  Dim month = month_day.item_0 ' variable definition
  Dim day = month_day.item_1 ' variable definition
  Dim dayName = getWeekdayName(weekday) ' variable definition
  Dim d = padLwithZero(day) ' variable definition
  Dim monthName = getMonthName(month) ' variable definition
  Return $"{dayName}, {d} {monthName} {year} {h}:{m}:{s} UTC"
End Function

<TestMethod> Sub test_getDate()
  Assert.AreEqual("Tue, 31 Mar 2026 08:49:51 UTC", getDate(1774946991))
End Sub

Function dateTime(unixSecs As Integer) As (Integer, Integer, Integer, Integer, Integer, Integer)
  ' get separate values from Unix time
  Dim hour = (divAsInt(divAsInt(unixSecs, 60), 60) Mod 24) ' variable definition
  Dim minute = divAsInt(unixSecs, 60) Mod 60 ' variable definition
  Dim second = (unixSecs Mod 60) ' variable definition
  ' days and years from Unix epoch
  Dim unixDay = divAsInt(unixSecs, daySecs) ' variable definition
  Dim years = ((unixDay + 1)/365.24).floor() ' variable definition
  ' this year and weekday
  Dim year = unixYear + years ' variable definition
  Dim weekday = (unixDay + unixWeekday) Mod 7 ' variable definition
  ' day number (1-365 or 1-366) in this year
  Dim day = dayInYear(year, unixDay) ' variable definition
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
      Dim ps = p + s ' variable definition
      sR = ps.subString(ps.length() - p.length(), ps.length()) ' change variable
    ElseIf d.upperCase().equals("R") Then
      sR = (s + p).subString(0, p.length()) ' change variable
    End If
  End If
  Return sR
End Function
