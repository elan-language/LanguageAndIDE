' VB.NET with Elan 2.0.0-beta1

Sub main()
  Dim quit = False ' variable definition
  While Not quit
    Console.WriteLine("t - for time now, q - to quit, or an integer value to convert")

      Dim reply = Console.ReadLine() ' input statement
    If reply.upperCase().equals("Q") Then
      quit = True ' assignment
    ElseIf reply.upperCase().equals("T") Then
      Dim now = divAsInt(clock(), 1000) ' variable definition
      Console.WriteLine(now) ' print statement
      Console.WriteLine(getDate(now)) ' print statement
    Else
      Try 
        Dim td = asInt(reply) ' variable definition
        If td >= 0 Then
          Console.WriteLine(getDate(td)) ' print statement
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
  Dim month_day = monthDay(startDaysL, (days Mod startDays(12))) ' variable definition
  Dim month = month_day.item_0 ' variable definition
  Dim day = month_day.item_1 ' variable definition
  Dim dayName = getWeekdayName(weekday) ' variable definition
  Dim d = padLwithZero(day) ' variable definition
  Dim monthName = getMonthName(month) ' variable definition
  Return $"{dayName}, {d} {monthName} {year} {h}:{m}:{s} UTC"
End Function

<TestClass Class Test_getDate
 <TestMethod> Sub test_getDate()
  Assert.AreEqual("Tue, 31 Mar 2026 08:49:51 UTC", getDate(1774946991))
 End Sub
End Class


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

<TestClass Class Test_dateTime
 <TestMethod> Sub test_dateTime()
  Assert.AreEqual((8, 49, 51, 90, 2026, 2), dateTime(1774946991))
 End Sub
End Class


Function dayInYear(year As Integer, unixDays As Integer) As Integer
  ' unixDays start at 0, months, day numbers start at 1
  Dim dayNumber = unixDays + 1 ' variable definition
  If year > unixYear Then
    ' discount previous nominal years
    dayNumber = dayNumber - 365*(year - unixYear) ' assignment
    ' discount previous leap days
    For Each y In range(unixYear, year)
      If leap(y) Then
        dayNumber = dayNumber - 1 ' assignment
      End If
    Next y
  End If
  Return dayNumber
End Function

<TestClass Class Test_dayInYear
 <TestMethod> Sub test_dayInYear()
  Assert.AreEqual(-20087, dayInYear(2025, 1))
 End Sub
End Class


Function leap(year As Integer) As Boolean
  Return (((year Mod 4) = 0) And ((year Mod 100) <> 0)) Or ((year Mod 400) = 0)
End Function

<TestClass Class Test_leap
 <TestMethod> Sub test_leap()
  ' normal cases
  Assert.AreEqual(False, leap(2025))
  Assert.AreEqual(True, leap(2024))
  ' boundary cases
  Assert.AreEqual(False, leap(1900))
  Assert.AreEqual(True, leap(2000))
 End Sub
End Class


Function monthDay(startDays As List(Of Integer), dayNumber As Integer) As (Integer, Integer)
  ' get month (1-12) & day (1-31) from dayNumber (1-365 or 1-366)
  Dim month = 1 ' variable definition
  Dim day = 0 ' variable definition
  Dim monthFound = False ' variable definition
  While monthFound = False
    If (dayNumber < startDays(month)) Then
      monthFound = True ' assignment
      day = dayNumber - startDays(month - 1) + 1 ' assignment
    Else
      month = month + 1 ' assignment
    End If
  End While
  Return (month, day)
End Function

Function startDaysList(year As Integer, startDays As List(Of Integer)) As List(Of Integer)
  ' alter month start days if leap year
  Dim startDaysL = getStartDays() ' variable definition
  If leap(year) Then
    For Each m In range(2, 13)
      startDaysL = startDaysL.withSet(m, startDaysL(m) + 1) ' assignment
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
  Return names(weekDay)
End Function

<TestClass Class Test_getWeekdayName
 <TestMethod> Sub test_getWeekdayName()
  Assert.AreEqual("Sun", getWeekdayName(0))
  Assert.AreEqual("Sat", getWeekdayName(6))
 End Sub
End Class


Function getMonthName(month As Integer) As String
  Dim names = {"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"} ' variable definition
  Return names(month - 1)
End Function

<TestClass Class Test_getMonthName
 <TestMethod> Sub test_getMonthName()
  Assert.AreEqual("Jan", getMonthName(1))
  Assert.AreEqual("Dec", getMonthName(12))
 End Sub
End Class


Function getStartDays() As List(Of Integer)
  Return {1, 32, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366}
End Function

Function padLwithZero(i As Integer) As String
  Return pad("L", "00", i.toString())
End Function

<TestClass Class Test_padLwithZero
 <TestMethod> Sub test_padLwithZero()
  Assert.AreEqual("01", padLwithZero(1))
  Assert.AreEqual("10", padLwithZero(10))
  Assert.AreEqual("00", padLwithZero(0))
 End Sub
End Class


Function pad(d As String, p As String, s As String) As String
  ' d: L or R for pad left or right
  ' p: output string pattern of pad characters and of length
  ' s: input string
  Dim sR = s ' variable definition
  If p.length() > s.length() Then
    If d.upperCase().equals("L") Then
      Dim ps = p + s ' variable definition
      sR = ps.subString(ps.length() - p.length(), ps.length()) ' assignment
    ElseIf d.upperCase().equals("R") Then
      sR = (s + p).subString(0, p.length()) ' assignment
    End If
  End If
  Return sR
End Function
