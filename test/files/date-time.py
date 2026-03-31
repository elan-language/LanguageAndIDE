# Python with Elan 2.0.0-alpha1

def main() -> None:
  reply = "" # variable definition
  while not reply.upperCase().equals("Q"):
    reply = input("RETURN for time now or Unix time (positive integer) or Q to quit") # set
    if reply.equals(""):
      now = divAsInt(clock(), 1000) # constant
      print(now) # call procedure
      print(getDate(now)) # call procedure
    else:
      td = parseAsInt(reply) # variable definition
      if td.item_0 and (td.item_1 >= 0):
        print(getDate(td.item_1)) # call procedure

def getDate(unixSecs: int) -> str: # function
  dt = dateTime(unixSecs) # variable definition
  hour = dt.item_0 # constant
  minute = dt.item_1 # constant
  second = dt.item_2 # constant
  days = dt.item_3 # constant
  year = dt.item_4 # constant
  weekday = dt.item_5 # constant
  z2 = "00" # constant
  h = padLwithZero(hour) # constant
  m = padLwithZero(minute) # constant
  s = padLwithZero(second) # constant
  startDays = getStartDays() # variable definition
  startDaysL = startDaysList(year, startDays) # variable definition
  month_day = monthDay(startDaysL, (days % startDays[12])) # variable definition
  month = month_day.item_0 # constant
  day = month_day.item_1 # constant
  dayName = getWeekdayName(weekday) # constant
  d = padLwithZero(day) # constant
  monthName = getMonthName(month) # constant
  return f"{dayName}, {d} {monthName} {year} {h}:{m}:{s} UTC"

def test_getDate(self) -> None:
  self.assertEqual(getDate(1774946991), "Tue, 31 Mar 2026 08:49:51 UTC")

def dateTime(unixSecs: int) -> tuple[int, int, int, int, int, int]: # function
  # get separate values from Unix time
  hour = (divAsInt(divAsInt(unixSecs, 60), 60) % 24) # constant
  minute = divAsInt(unixSecs, 60) % 60 # constant
  second = (unixSecs % 60) # constant
  # days and years from Unix epoch
  unixDay = divAsInt(unixSecs, daySecs) # constant
  years = ((unixDay + 1)/365.24).floor() # constant
  # this year and weekday
  year = unixYear + years # constant
  weekday = (unixDay + unixWeekday) % 7 # constant
  # day number (1-365 or 1-366) in this year
  day = dayInYear(year, unixDay) # constant
  return (hour, minute, second, day, year, weekday)

def test_dateTime(self) -> None:
  self.assertEqual(dateTime(1774946991), (8, 49, 51, 90, 2026, 2))

def dayInYear(year: int, unixDays: int) -> int: # function
  # unixDays start at 0, months, day numbers start at 1
  dayNumber = unixDays + 1 # variable definition
  if year > unixYear:
    # discount previous nominal years
    dayNumber = dayNumber - 365*(year - unixYear) # set
    # discount previous leap days
    for y in range(unixYear, year):
      if leap(y):
        dayNumber = dayNumber - 1 # set
  return dayNumber

def test_dayInYear(self) -> None:
  self.assertEqual(dayInYear(2025, 1), -20087)

def leap(year: int) -> bool: # function
  leapYear = False # variable definition
  if (year % 4) == 0:
    leapYear = True # set
    if ((year % 100) == 0) and ((divAsInt(year, 100) % 4) != 0):
      leapYear = False # set
  return leapYear

def test_leap(self) -> None:
  self.assertEqual(leap(2025), False)
  self.assertEqual(leap(2024), True)
  self.assertEqual(leap(1900), False)
  self.assertEqual(leap(2000), True)

def monthDay(startDays: list[int], dayNumber: int) -> tuple[int, int]: # function
  # get month (1-12) &amp; day (1-31) from dayNumber (1-365 or 1-366)
  month = 1 # variable definition
  day = 0 # variable definition
  monthFound = False # variable definition
  while monthFound == False:
    if (dayNumber < startDays[month]):
      monthFound = True # set
      day = dayNumber - startDays[month - 1] + 1 # set
    else:
      month = month + 1 # set
  return (month, day)

def startDaysList(year: int, startDays: list[int]) -> list[int]: # function
  # alter month start days if leap year
  startDaysL = getStartDays() # variable definition
  if leap(year):
    for m in range(2, 13):
      startDaysL = startDaysL.withSet(m, startDaysL[m] + 1) # set
  return startDaysL

# Unix epoch is 1970.01.01 00:00:00 Thursday

unixYear = 1970 # constant

unixWeekday = 4 # constant

daySecs = 86400 # constant

# day and month names, and day numbers

def getWeekdayName(weekDay: int) -> str: # function
  names = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] # variable definition
  return names[weekDay]

def test_getWeekdayName(self) -> None:
  self.assertEqual(getWeekdayName(0), "Sun")
  self.assertEqual(getWeekdayName(6), "Sat")

def getMonthName(month: int) -> str: # function
  names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] # variable definition
  return names[month - 1]

def test_getMonthName(self) -> None:
  self.assertEqual(getMonthName(1), "Jan")
  self.assertEqual(getMonthName(12), "Dec")

def getStartDays() -> list[int]: # function
  return [1, 32, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366]

def padLwithZero(i: int) -> str: # function
  return pad("L", "00", i.toString())

def test_padLwithZero(self) -> None:
  self.assertEqual(padLwithZero(1), "01")
  self.assertEqual(padLwithZero(10), "10")
  self.assertEqual(padLwithZero(0), "00")

def pad(d: str, p: str, s: str) -> str: # function
  # d: L or R for pad left or right
  # p: output string pattern of pad characters and of length
  # s: input string
  sR = s # variable definition
  if p.length() > s.length():
    if d.upperCase().equals("L"):
      ps = p + s # constant
      sR = ps.subString(ps.length() - p.length(), ps.length()) # set
    elif d.upperCase().equals("R"):
      sR = (s + p).subString(0, p.length()) # set
  return sR
