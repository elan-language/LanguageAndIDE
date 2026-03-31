// C# with Elan 2.0.0-alpha1

static void main() {
  var reply = "";
  while (!reply.upperCase().equals("Q")) {
    reply = input("RETURN for time now or Unix time (positive integer) or Q to quit"); // set
    if (reply.equals("")) {
      const Int now = divAsInt(clock(), 1000);
      print(now); // call procedure
      print(getDate(now)); // call procedure
    } else {
      var td = parseAsInt(reply);
      if (td.item_0 && (td.item_1 >= 0)) {
        print(getDate(td.item_1)); // call procedure
      }
    }
  }
}

static string getDate(int unixSecs) { // function
  var dt = dateTime(unixSecs);
  const Int hour = dt.item_0;
  const Int minute = dt.item_1;
  const Int second = dt.item_2;
  const Int days = dt.item_3;
  const Int year = dt.item_4;
  const Int weekday = dt.item_5;
  const String z2 = "00";
  const String h = padLwithZero(hour);
  const String m = padLwithZero(minute);
  const String s = padLwithZero(second);
  var startDays = getStartDays();
  var startDaysL = startDaysList(year, startDays);
  var month_day = monthDay(startDaysL, (days % startDays[12]));
  const Int month = month_day.item_0;
  const Int day = month_day.item_1;
  const String dayName = getWeekdayName(weekday);
  const String d = padLwithZero(day);
  const String monthName = getMonthName(month);
  return $"{dayName}, {d} {monthName} {year} {h}:{m}:{s} UTC";
}

[TestMethod] static void test_getDate() {
  Assert.AreEqual("Tue, 31 Mar 2026 08:49:51 UTC", getDate(1774946991))
}

static (int, int, int, int, int, int) dateTime(int unixSecs) { // function
  // get separate values from Unix time
  const Int hour = (divAsInt(divAsInt(unixSecs, 60), 60) % 24);
  const Int minute = divAsInt(unixSecs, 60) % 60;
  const Int second = (unixSecs % 60);
  // days and years from Unix epoch
  const Int unixDay = divAsInt(unixSecs, daySecs);
  const Int years = ((unixDay + 1)/365.24).floor();
  // this year and weekday
  const Int year = unixYear + years;
  const Int weekday = (unixDay + unixWeekday) % 7;
  // day number (1-365 or 1-366) in this year
  const Int day = dayInYear(year, unixDay);
  return (hour, minute, second, day, year, weekday);
}

[TestMethod] static void test_dateTime() {
  Assert.AreEqual((8, 49, 51, 90, 2026, 2), dateTime(1774946991))
}

static int dayInYear(int year, int unixDays) { // function
  // unixDays start at 0, months, day numbers start at 1
  var dayNumber = unixDays + 1;
  if (year > unixYear) {
    // discount previous nominal years
    dayNumber = dayNumber - 365*(year - unixYear); // set
    // discount previous leap days
    foreach (y in range(unixYear, year)) {
      if (leap(y)) {
        dayNumber = dayNumber - 1; // set
      }
    }
  }
  return dayNumber;
}

[TestMethod] static void test_dayInYear() {
  Assert.AreEqual(-20087, dayInYear(2025, 1))
}

static bool leap(int year) { // function
  var leapYear = false;
  if ((year % 4) == 0) {
    leapYear = true; // set
    if (((year % 100) == 0) && ((divAsInt(year, 100) % 4) != 0)) {
      leapYear = false; // set
    }
  }
  return leapYear;
}

[TestMethod] static void test_leap() {
  Assert.AreEqual(false, leap(2025))
  Assert.AreEqual(true, leap(2024))
  Assert.AreEqual(false, leap(1900))
  Assert.AreEqual(true, leap(2000))
}

static (int, int) monthDay(List<int> startDays, int dayNumber) { // function
  // get month (1-12) &amp; day (1-31) from dayNumber (1-365 or 1-366)
  var month = 1;
  var day = 0;
  var monthFound = false;
  while (monthFound == false) {
    if ((dayNumber < startDays[month])) {
      monthFound = true; // set
      day = dayNumber - startDays[month - 1] + 1; // set
    } else {
      month = month + 1; // set
    }
  }
  return (month, day);
}

static List<int> startDaysList(int year, List<int> startDays) { // function
  // alter month start days if leap year
  var startDaysL = getStartDays();
  if (leap(year)) {
    foreach (m in range(2, 13)) {
      startDaysL = startDaysL.withSet(m, startDaysL[m] + 1); // set
    }
  }
  return startDaysL;
}

// Unix epoch is 1970.01.01 00:00:00 Thursday

const Int unixYear = 1970

const Int unixWeekday = 4

const Int daySecs = 86400

// day and month names, and day numbers

static string getWeekdayName(int weekDay) { // function
  var names = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return names[weekDay];
}

[TestMethod] static void test_getWeekdayName() {
  Assert.AreEqual("Sun", getWeekdayName(0))
  Assert.AreEqual("Sat", getWeekdayName(6))
}

static string getMonthName(int month) { // function
  var names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return names[month - 1];
}

[TestMethod] static void test_getMonthName() {
  Assert.AreEqual("Jan", getMonthName(1))
  Assert.AreEqual("Dec", getMonthName(12))
}

static List<int> getStartDays() { // function
  return [1, 32, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366];
}

static string padLwithZero(int i) { // function
  return pad("L", "00", i.toString());
}

[TestMethod] static void test_padLwithZero() {
  Assert.AreEqual("01", padLwithZero(1))
  Assert.AreEqual("10", padLwithZero(10))
  Assert.AreEqual("00", padLwithZero(0))
}

static string pad(string d, string p, string s) { // function
  // d: L or R for pad left or right
  // p: output string pattern of pad characters and of length
  // s: input string
  var sR = s;
  if (p.length() > s.length()) {
    if (d.upperCase().equals("L")) {
      const String ps = p + s;
      sR = ps.subString(ps.length() - p.length(), ps.length()); // set
    } else if (d.upperCase().equals("R")) {
      sR = (s + p).subString(0, p.length()); // set
    }
  }
  return sR;
}
