// C# with Elan 2.0.0-beta

static void main() {
  var quit = false;
  while (!quit) {
    Console.WriteLine("t - for time now, q - to quit, or an integer value to convert");

      var reply = Console.ReadLine(); // input
    if (reply.upperCase().equals("Q")) {
      quit = true; // reassign variable
    } else if (reply.upperCase().equals("T")) {
      var now = divAsInt(clock(), 1000);
      Console.WriteLine(now); // print
      Console.WriteLine(getDate(now)); // print
    } else {
      try {
        var td = int(reply);
        if (td >= 0) {
          Console.WriteLine(getDate(td)); // print
        } // if
      } catch (ElanRuntimeError e) {
      } // try
    } // if
  } // while
} // main

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
} // function

[TestMethod] static void test_getDate() {
  Assert.AreEqual("Tue, 31 Mar 2026 08:49:51 UTC", getDate(1774946991));
} // test

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
} // function

[TestMethod] static void test_dateTime() {
  Assert.AreEqual((8, 49, 51, 90, 2026, 2), dateTime(1774946991));
} // test

static int dayInYear(int year, int unixDays) { // function
  // unixDays start at 0, months, day numbers start at 1
  var dayNumber = unixDays + 1;
  if (year > unixYear) {
    // discount previous nominal years
    dayNumber = dayNumber - 365*(year - unixYear); // reassign variable
    // discount previous leap days
    foreach (y in range(unixYear, year)) {
      if (leap(y)) {
        dayNumber = dayNumber - 1; // reassign variable
      } // if
    } // foreach
  } // if
  return dayNumber;
} // function

[TestMethod] static void test_dayInYear() {
  Assert.AreEqual(-20087, dayInYear(2025, 1));
} // test

static bool leap(int year) { // function
  return (((year % 4) == 0) && ((year % 100) != 0)) || ((year % 400) == 0);
} // function

[TestMethod] static void test_leap() {
  // normal cases
  Assert.AreEqual(false, leap(2025));
  Assert.AreEqual(true, leap(2024));
  // boundary cases
  Assert.AreEqual(false, leap(1900));
  Assert.AreEqual(true, leap(2000));
} // test

static (int, int) monthDay(List<int> startDays, int dayNumber) { // function
  // get month (1-12) & day (1-31) from dayNumber (1-365 or 1-366)
  var month = 1;
  var day = 0;
  var monthFound = false;
  while (monthFound == false) {
    if ((dayNumber < startDays[month])) {
      monthFound = true; // reassign variable
      day = dayNumber - startDays[month - 1] + 1; // reassign variable
    } else {
      month = month + 1; // reassign variable
    } // if
  } // while
  return (month, day);
} // function

static List<int> startDaysList(int year, List<int> startDays) { // function
  // alter month start days if leap year
  var startDaysL = getStartDays();
  if (leap(year)) {
    foreach (m in range(2, 13)) {
      startDaysL = startDaysL.withSet(m, startDaysL[m] + 1); // reassign variable
    } // foreach
  } // if
  return startDaysL;
} // function

// Unix epoch is 1970.01.01 00:00:00 Thursday

const Int unixYear = 1970;

const Int unixWeekday = 4;

const Int daySecs = 86400;

// day and month names, and day numbers

static string getWeekdayName(int weekDay) { // function
  var names = new [] {"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"};
  return names[weekDay];
} // function

[TestMethod] static void test_getWeekdayName() {
  Assert.AreEqual("Sun", getWeekdayName(0));
  Assert.AreEqual("Sat", getWeekdayName(6));
} // test

static string getMonthName(int month) { // function
  var names = new [] {"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"};
  return names[month - 1];
} // function

[TestMethod] static void test_getMonthName() {
  Assert.AreEqual("Jan", getMonthName(1));
  Assert.AreEqual("Dec", getMonthName(12));
} // test

static List<int> getStartDays() { // function
  return new [] {1, 32, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366};
} // function

static string padLwithZero(int i) { // function
  return pad("L", "00", i.toString());
} // function

[TestMethod] static void test_padLwithZero() {
  Assert.AreEqual("01", padLwithZero(1));
  Assert.AreEqual("10", padLwithZero(10));
  Assert.AreEqual("00", padLwithZero(0));
} // test

static string pad(string d, string p, string s) { // function
  // d: L or R for pad left or right
  // p: output string pattern of pad characters and of length
  // s: input string
  var sR = s;
  if (p.length() > s.length()) {
    if (d.upperCase().equals("L")) {
      var ps = p + s;
      sR = ps.subString(ps.length() - p.length(), ps.length()); // reassign variable
    } else if (d.upperCase().equals("R")) {
      sR = (s + p).subString(0, p.length()); // reassign variable
    } // if
  } // if
  return sR;
} // function
