# a6841cb8bb4531ae90ffaf12f9ab914f7554f2f00d179455b0345a7b1011d2f6 Elan 1.9.0 guest default_profile valid

# Ideas for further development
# - rule for no more than 'n' same characters in succession
upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

lowerChars = "abcdefghijklmnopqrstuvwxyz"

digitChars = "01234567890"

symbolChars = "!$%^&*"

length = 32

upper = true

lower = true

digit = true

symbol = true

def main -> None:  # [main]
  all = upperChars + lowerChars + digitChars + symbolChars # [variable definition]
  password = "" # [variable definition]
  valid = false # [variable definition]
  while not valid
    password = "" # [assign variable]
    populatePassword(password, all) # [call procedure]}
    valid = isValid(password, upper, lower, digit, symbol) # [assign variable]
  print password


def populatePassword(password: String, all: String) -> None:  # [procedure]
  for i in range(1, length, 1):  # [for loop]
    rnd = randomInt(0, all.length() - 1) # [variable definition]
    password = password + all[rnd] # [assign variable]


def isValid(password: String, mustHaveUpper: Boolean, mustHaveLower: Boolean, mustHaveDigit: Boolean, mustHaveSymbol: Boolean) -> Boolean:  # [function]
  validForUpper = passesRule(mustHaveUpper, upperChars, password) # [variable definition]
  validForLower = passesRule(mustHaveLower, lowerChars, password) # [variable definition]
  validForDigits = passesRule(mustHaveDigit, digitChars, password) # [variable definition]
  validForSymbols = passesRule(mustHaveSymbol, symbolChars, password) # [variable definition]
  return validForUpper and validForLower and validForDigits and validForSymbols


def test_isValid() -> None:  # [test]
  assertEqual(isValid("$4De", true, true, true, true), true)  # [assert]
  assertEqual(isValid("$4de", true, true, true, true), false)  # [assert]
  assertEqual(isValid("$4de", false, true, true, true), true)  # [assert]
  assertEqual(isValid("eD$4", true, true, true, true), true)  # [assert]
  assertEqual(isValid("$4De$4De", true, true, true, true), true)  # [assert]


def passesRule(rule: Boolean, charSet: String, password: String) -> Boolean:  # [function]
  return (not rule) or hasAtLeastOneFrom(charSet, password)


def test_passesRule() -> None:  # [test]
  assertEqual(passesRule(true, "12A", "ABC"), true)  # [assert]
  assertEqual(passesRule(false, "12A", "ABC"), true)  # [assert]
  assertEqual(passesRule(true, "12", "ABCD"), false)  # [assert]
  assertEqual(passesRule(false, "12", "ABCD"), true)  # [assert]


def hasAtLeastOneFrom(fromChars: String, password: String) -> Boolean:  # [function]
  hasOne = false # [variable definition]
  for ch in password:  # [each loop]
    hasOne = hasOne or fromChars.contains(ch) # [assign variable]
  return hasOne


def test_hasAtLeastOneFrom() -> None:  # [test]
  assertEqual(hasAtLeastOneFrom("12A", "ABC"), true)  # [assert]
  assertEqual(hasAtLeastOneFrom("C12", "ABC"), true)  # [assert]
  assertEqual(hasAtLeastOneFrom("12", "ABCD"), false)  # [assert]


