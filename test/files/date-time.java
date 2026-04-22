// Java with Elan 2.0.0-alpha1

static void main() {
  var reply = "";
  while (!reply.upperCase().equals("Q")) {
    reply = input("RETURN for time now or Unix time (positive integer) or Q to quit"); // change variable
    if (reply.equals("")) {
      final Int now = divAsInt(clock(), 1000); // constant
      print(now);
      print(getDate(now));
    } else {
      try {
        var td = int(reply);
        if (td >= 0) {
          print(getDate(td));
        }
      } catch (ElanRuntimeError e) {
      }
    }
  }
}

static String getDate(int unixSecs) { // function
  var dt = dateTime(unixSecs);
  final Int hour = dt.item_0; // constant
  final Int minute = dt.item_1; // constant
  final Int second = dt.item_2; // constant
  final Int days = dt.item_3; // constant
  final Int year = dt.item_4; // constant
  final Int weekday = dt.item_5; // constant
  final String z2 = "00"; // constant
  final String h = padLwithZero(hour); // constant
  final String m = padLwithZero(minute); // constant
  final String s = padLwithZero(second); // constant
  var startDays = getStartDays();
  var startDaysL = startDaysList(year, startDays);
  var month_day = monthDay(startDaysL, (days % startDays[12]));
  final Int month = month_day.item_0; // constant
  final Int day = month_day.item_1; // constant
  final String dayName = getWeekdayName(weekday); // constant
  final String d = padLwithZero(day); // constant
  final String monthName = getMonthName(month); // constant
  return String.format("%, % % % %:%:% UTC", dayName, d, monthName, year, h, m, s);
}

@Test static void test_getDate() {
  assertEquals("Tue, 31 Mar 2026 08:49:51 UTC", getDate(1774946991))
}

static (int, int, int, int, int, int) dateTime(int unixSecs) { // function
  // get separate values from Unix time
  final Int hour = (divAsInt(divAsInt(unixSecs, 60), 60) % 24); // constant
  final Int minute = divAsInt(unixSecs, 60) % 60; // constant
  final Int second = (unixSecs % 60); // constant
  // days and years from Unix epoch
  final Int unixDay = divAsInt(unixSecs, daySecs); // constant
  final Int years = ((unixDay + 1)/365.24).floor(); // constant
  // this year and weekday
  final Int year = unixYear + years; // constant
  final Int weekday = (unixDay + unixWeekday) % 7; // constant
  // day number (1-365 or 1-366) in this year
  final Int day = dayInYear(year, unixDay); // constant
  return (hour, minute, second, day, year, weekday);
}

@Test static void test_dateTime() {
  assertEquals((8, 49, 51, 90, 2026, 2), dateTime(1774946991))
}

static int dayInYear(int year, int unixDays) { // function
  // unixDays start at 0, months, day numbers start at 1
  var dayNumber = unixDays + 1;
  if (year > unixYear) {
    // discount previous nominal years
    dayNumber = dayNumber - 365*(year - unixYear); // change variable
    // discount previous leap days
    foreach (y in range(unixYear, year)) {
      if (leap(y)) {
        dayNumber = dayNumber - 1; // change variable
      }
    }
  }
  return dayNumber;
}

@Test static void test_dayInYear() {
  assertEquals(-20087, dayInYear(2025, 1))
}

static bool leap(int year) { // function
  var leapYear = false;
  if ((year % 4) == 0) {
    leapYear = true; // change variable
    if (((year % 100) == 0) && ((divAsInt(year, 100) % 4) != 0)) {
      leapYear = false; // change variable
    }
  }
  return leapYear;
}

@Test static void test_leap() {
  assertEquals(false, leap(2025))
  assertEquals(true, leap(2024))
  assertEquals(false, leap(1900))
  assertEquals(true, leap(2000))
}

static (int, int) monthDay(List<int> startDays, int dayNumber) { // function
  // get month (1-12) &amp; day (1-31) from dayNumber (1-365 or 1-366)
  var month = 1;
  var day = 0;
  var monthFound = false;
  while (monthFound == false) {
    if ((dayNumber < startDays[month])) {
      monthFound = true; // change variable
      day = dayNumber - startDays[month - 1] + 1; // change variable
    } else {
      month = month + 1; // change variable
    }
  }
  return (month, day);
}

static List<int> startDaysList(int year, List<int> startDays) { // function
  // alter month start days if leap year
  var startDaysL = getStartDays();
  if (leap(year)) {
    foreach (m in range(2, 13)) {
      startDaysL = startDaysL.withSet(m, startDaysL[m] + 1); // change variable
    }
  }
  return startDaysL;
}

// Unix epoch is 1970.01.01 00:00:00 Thursday

final Int unixYear = 1970 // constant

final Int unixWeekday = 4 // constant

final Int daySecs = 86400 // constant

// day and month names, and day numbers

static String getWeekdayName(int weekDay) { // function
  var names = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return names[weekDay];
}

@Test static void test_getWeekdayName() {
  assertEquals("Sun", getWeekdayName(0))
  assertEquals("Sat", getWeekdayName(6))
}

static String getMonthName(int month) { // function
  var names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return names[month - 1];
}

@Test static void test_getMonthName() {
  assertEquals("Jan", getMonthName(1))
  assertEquals("Dec", getMonthName(12))
}

static List<int> getStartDays() { // function
  return [1, 32, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366];
}

static String padLwithZero(int i) { // function
  return pad("L", "00", i.toString());
}

@Test static void test_padLwithZero() {
  assertEquals("01", padLwithZero(1))
  assertEquals("10", padLwithZero(10))
  assertEquals("00", padLwithZero(0))
}

static String pad(String d, String p, String s) { // function
  // d: L or R for pad left or right
  // p: output string pattern of pad characters and of length
  // s: input string
  var sR = s;
  if (p.length() > s.length()) {
    if (d.upperCase().equals("L")) {
      final String ps = p + s; // constant
      sR = ps.subString(ps.length() - p.length(), ps.length()); // change variable
    } else if (d.upperCase().equals("R")) {
      sR = (s + p).subString(0, p.length()); // change variable
    }
  }
  return sR;
}
