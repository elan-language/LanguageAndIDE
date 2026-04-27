# Python with Elan 2.0.0-alpha1

import math

import time
def clock():
  return int(time.time()*1000)

def main() -> None:
  reply = "" # variable definition
  while not reply.upper() == ("Q"):
    reply = input("RETURN for time now or Unix time (positive integer) or Q to quit") # change variable
    if reply == (""):
      now = math.floor((clock())/(1000)) # variable definition
      print(now)
      print(getDate(now))
    else:
      try:
        td = int(reply) # variable definition
        if td >= 0:
          print(getDate(td))
      except ElanRuntimeError: # catch

def getDate(unixSecs: int) -> str: # function
  dt = dateTime(unixSecs) # variable definition
  hour = dt[0] # variable definition
  minute = dt[1] # variable definition
  second = dt[2] # variable definition
  days = dt[3] # variable definition
  year = dt[4] # variable definition
  weekday = dt[5] # variable definition
  z2 = "00" # variable definition
  h = padLwithZero(hour) # variable definition
  m = padLwithZero(minute) # variable definition
  s = padLwithZero(second) # variable definition
  startDays = getStartDays() # variable definition
  startDaysL = startDaysList(year, startDays) # variable definition
  month_day = monthDay(startDaysL, (days % startDays[12])) # variable definition
  month = month_day[0] # variable definition
  day = month_day[1] # variable definition
  dayName = getWeekdayName(weekday) # variable definition
  d = padLwithZero(day) # variable definition
  monthName = getMonthName(month) # variable definition
  return f"{dayName}, {d} {monthName} {year} {h}:{m}:{s} UTC"

def test_getDate(self) -> None:
  self.assertEqual(getDate(1774946991), "Tue, 31 Mar 2026 08:49:51 UTC")

def dateTime(unixSecs: int) -> tuple[int, int, int, int, int, int]: # function
  # get separate values from Unix time
  hour = (math.floor((math.floor((unixSecs)/(60)))/(60)) % 24) # variable definition
  minute = math.floor((unixSecs)/(60)) % 60 # variable definition
  second = (unixSecs % 60) # variable definition
  # days and years from Unix epoch
  unixDay = math.floor((unixSecs)/(daySecs)) # variable definition
  years = math.floor(((unixDay + 1)/365.24)) # variable definition
  # this year and weekday
  year = unixYear + years # variable definition
  weekday = (unixDay + unixWeekday) % 7 # variable definition
  # day number (1-365 or 1-366) in this year
  day = dayInYear(year, unixDay) # variable definition
  return (hour, minute, second, day, year, weekday)

def test_dateTime(self) -> None:
  self.assertEqual(dateTime(1774946991), (8, 49, 51, 90, 2026, 2))

def dayInYear(year: int, unixDays: int) -> int: # function
  # unixDays start at 0, months, day numbers start at 1
  dayNumber = unixDays + 1 # variable definition
  if year > unixYear:
    # discount previous nominal years
    dayNumber = dayNumber - 365*(year - unixYear) # change variable
    # discount previous leap days
    for y in range(unixYear, year):
      if leap(y):
        dayNumber = dayNumber - 1 # change variable
  return dayNumber

def test_dayInYear(self) -> None:
  self.assertEqual(dayInYear(2025, 1), -20087)

def leap(year: int) -> bool: # function
  leapYear = False # variable definition
  if (year % 4) == 0:
    leapYear = True # change variable
    if ((year % 100) == 0) and ((math.floor((year)/(100)) % 4) != 0):
      leapYear = False # change variable
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
      monthFound = True # change variable
      day = dayNumber - startDays[month - 1] + 1 # change variable
    else:
      month = month + 1 # change variable
  return (month, day)

def startDaysList(year: int, startDays: list[int]) -> list[int]: # function
  # alter month start days if leap year
  startDaysL = getStartDays() # variable definition
  if leap(year):
    for m in range(2, 13):
      startDaysL = startDaysL.withSet(m, startDaysL[m] + 1) # change variable
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
  return pad("L", "00", str(i))

def test_padLwithZero(self) -> None:
  self.assertEqual(padLwithZero(1), "01")
  self.assertEqual(padLwithZero(10), "10")
  self.assertEqual(padLwithZero(0), "00")

def pad(d: str, p: str, s: str) -> str: # function
  # d: L or R for pad left or right
  # p: output string pattern of pad characters and of length
  # s: input string
  sR = s # variable definition
  if len(p) > len(s):
    if d.upper() == ("L"):
      ps = p + s # variable definition
      sR = ps[len(ps) - len(p):len(ps)] # change variable
    elif d.upper() == ("R"):
      sR = (s + p)[0:len(p)] # change variable
  return sR

main()
