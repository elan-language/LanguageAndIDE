// C# with Elan 2.0.0-beta2

static void main() {
  var quit = false;
  while (!quit) {
    Console.WriteLine("t - for time now, q - to quit, or an integer value to convert");

      var reply = Console.ReadLine(); // input statement
    if (reply.upperCase().equals("Q")) {
      quit = true; // assignment
    } else if (reply.upperCase().equals("T")) {
      var now = divAsInt(clock(), 1000);
      Console.WriteLine(now); // print statement
      Console.WriteLine(getDate(now)); // print statement
    } else {
      try {
        var td = asInt(reply);
        if (td >= 0) {
          Console.WriteLine(getDate(td)); // print statement
        } // end if
      } catch (ElanRuntimeError e) {
      } // end try
    } // end if
  } // end while
} // end main

static string getDate(int unixSecs) { // function
  var dt = dateTime(unixSecs);
  var hour = dt.item_0;
  var minute = dt.item_1;
  var second = dt.item_2;
  var days = dt.item_3;
  var year = dt.item_4;
  var weekday = dt.item_5;
  var z2 = "00";
  var h = padLwithZero(hour);
  var m = padLwithZero(minute);
  var s = padLwithZero(second);
  var startDays = getStartDays();
  var startDaysL = startDaysList(year, startDays);
  var month_day = monthDay(startDaysL, (days % startDays[12]));
  var month = month_day.item_0;
  var day = month_day.item_1;
  var dayName = getWeekdayName(weekday);
  var d = padLwithZero(day);
  var monthName = getMonthName(month);
  return $"{dayName}, {d} {monthName} {year} {h}:{m}:{s} UTC";
} // end function

[TestClass] class Test_getDate
[TestMethod] static void test_getDate() {
  Assert.AreEqual("Tue, 31 Mar 2026 08:49:51 UTC", getDate(1774946991));
}} // end test

static (int, int, int, int, int, int) dateTime(int unixSecs) { // function
  // get separate values from Unix time
  var hour = (divAsInt(divAsInt(unixSecs, 60), 60) % 24);
  var minute = divAsInt(unixSecs, 60) % 60;
  var second = (unixSecs % 60);
  // days and years from Unix epoch
  var unixDay = divAsInt(unixSecs, daySecs);
  var years = ((unixDay + 1)/365.24).floor();
  // this year and weekday
  var year = unixYear + years;
  var weekday = (unixDay + unixWeekday) % 7;
  // day number (1-365 or 1-366) in this year
  var day = dayInYear(year, unixDay);
  return (hour, minute, second, day, year, weekday);
} // end function

[TestClass] class Test_dateTime
[TestMethod] static void test_dateTime() {
  Assert.AreEqual((8, 49, 51, 90, 2026, 2), dateTime(1774946991));
}} // end test

static int dayInYear(int year, int unixDays) { // function
  // unixDays start at 0, months, day numbers start at 1
  var dayNumber = unixDays + 1;
  if (year > unixYear) {
    // discount previous nominal years
    dayNumber = dayNumber - 365*(year - unixYear); // assignment
    // discount previous leap days
    foreach (var y in range(unixYear, year)) {
      if (leap(y)) {
        dayNumber = dayNumber - 1; // assignment
      } // end if
    } // end foreach
  } // end if
  return dayNumber;
} // end function

[TestClass] class Test_dayInYear
[TestMethod] static void test_dayInYear() {
  Assert.AreEqual(-20087, dayInYear(2025, 1));
}} // end test

static bool leap(int year) { // function
  return (((year % 4) == 0) && ((year % 100) != 0)) || ((year % 400) == 0);
} // end function

[TestClass] class Test_leap
[TestMethod] static void test_leap() {
  // normal cases
  Assert.AreEqual(false, leap(2025));
  Assert.AreEqual(true, leap(2024));
  // boundary cases
  Assert.AreEqual(false, leap(1900));
  Assert.AreEqual(true, leap(2000));
}} // end test

static (int, int) monthDay(List<int> startDays, int dayNumber) { // function
  // get month (1-12) & day (1-31) from dayNumber (1-365 or 1-366)
  var month = 1;
  var day = 0;
  var monthFound = false;
  while (monthFound == false) {
    if ((dayNumber < startDays[month])) {
      monthFound = true; // assignment
      day = dayNumber - startDays[month - 1] + 1; // assignment
    } else {
      month = month + 1; // assignment
    } // end if
  } // end while
  return (month, day);
} // end function

static List<int> startDaysList(int year, List<int> startDays) { // function
  // alter month start days if leap year
  var startDaysL = getStartDays();
  if (leap(year)) {
    foreach (var m in range(2, 13)) {
      startDaysL = startDaysL.withPut(m, startDaysL[m] + 1); // assignment
    } // end foreach
  } // end if
  return startDaysL;
} // end function

// Unix epoch is 1970.01.01 00:00:00 Thursday

const Int unixYear = 1970;

const Int unixWeekday = 4;

const Int daySecs = 86400;

// day and month names, and day numbers

static string getWeekdayName(int weekDay) { // function
  var names = new [] {"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"};
  return names[weekDay];
} // end function

[TestClass] class Test_getWeekdayName
[TestMethod] static void test_getWeekdayName() {
  Assert.AreEqual("Sun", getWeekdayName(0));
  Assert.AreEqual("Sat", getWeekdayName(6));
}} // end test

static string getMonthName(int month) { // function
  var names = new [] {"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"};
  return names[month - 1];
} // end function

[TestClass] class Test_getMonthName
[TestMethod] static void test_getMonthName() {
  Assert.AreEqual("Jan", getMonthName(1));
  Assert.AreEqual("Dec", getMonthName(12));
}} // end test

static List<int> getStartDays() { // function
  return new [] {1, 32, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366};
} // end function

static string padLwithZero(int i) { // function
  return pad("L", "00", i.toString());
} // end function

[TestClass] class Test_padLwithZero
[TestMethod] static void test_padLwithZero() {
  Assert.AreEqual("01", padLwithZero(1));
  Assert.AreEqual("10", padLwithZero(10));
  Assert.AreEqual("00", padLwithZero(0));
}} // end test

static string pad(string d, string p, string s) { // function
  // d: L or R for pad left or right
  // p: output string pattern of pad characters and of length
  // s: input string
  var sR = s;
  if (p.length() > s.length()) {
    if (d.upperCase().equals("L")) {
      var ps = p + s;
      sR = ps.subString(ps.length() - p.length(), ps.length()); // assignment
    } else if (d.upperCase().equals("R")) {
      sR = (s + p).subString(0, p.length()); // assignment
    } // end if
  } // end if
  return sR;
} // end function
