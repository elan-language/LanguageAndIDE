# Python with Elan 2.0.0-beta1

# Ideas for further development

# - rule for no more than 'n' same characters in succession

upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" # constant

lowerChars = "abcdefghijklmnopqrstuvwxyz" # constant

digitChars = "01234567890" # constant

symbolChars = "!$%^&*" # constant

length = 32 # constant

upper = True # constant

lower = True # constant

digit = True # constant

symbol = True # constant

def main() -> None:
  all = upperChars + lowerChars + digitChars + symbolChars # variable definition
  password = "" # variable definition
  valid = False # variable definition
  while not valid:
    pwRef = AsRef[str]("") # variable definition
    populatePassword(pwRef, all) # call procedure
    password = pwRef.value() # reassign variable
    valid = isValid(password, upper, lower, digit, symbol) # reassign variable
  # end while
  print(password)
# end main

def populatePassword(password: AsRef[str], all: str) -> None: # procedure
  for i in range(1, length + 1):
    rnd = randint(0, all.length() - 1) # variable definition
    password.set(password.value() + all[rnd]) # call procedure
  # end for
# end procedure

def isValid(password: str, mustHaveUpper: bool, mustHaveLower: bool, mustHaveDigit: bool, mustHaveSymbol: bool) -> bool: # function
  validForUpper = passesRule(mustHaveUpper, upperChars, password) # variable definition
  validForLower = passesRule(mustHaveLower, lowerChars, password) # variable definition
  validForDigits = passesRule(mustHaveDigit, digitChars, password) # variable definition
  validForSymbols = passesRule(mustHaveSymbol, symbolChars, password) # variable definition
  return validForUpper and validForLower and validForDigits and validForSymbols
# end function

class Test_isValid(unittest.TestCase):
 def test_isValid(self) -> None:
  self.assertEqual(isValid("$4De", True, True, True, True), True)
  self.assertEqual(isValid("$4de", True, True, True, True), False)
  self.assertEqual(isValid("$4de", False, True, True, True), True)
  self.assertEqual(isValid("eD$4", True, True, True, True), True)
  self.assertEqual(isValid("$4De$4De", True, True, True, True), True)
# end test

def passesRule(rule: bool, charSet: str, password: str) -> bool: # function
  return (not rule) or hasAtLeastOneFrom(charSet, password)
# end function

class Test_passesRule(unittest.TestCase):
 def test_passesRule(self) -> None:
  self.assertEqual(passesRule(True, "12A", "ABC"), True)
  self.assertEqual(passesRule(False, "12A", "ABC"), True)
  self.assertEqual(passesRule(True, "12", "ABCD"), False)
  self.assertEqual(passesRule(False, "12", "ABCD"), True)
# end test

def hasAtLeastOneFrom(fromChars: str, password: str) -> bool: # function
  hasOne = False # variable definition
  for ch in password:
    hasOne = hasOne or fromChars.contains(ch) # reassign variable
  # end for
  return hasOne
# end function

class Test_hasAtLeastOneFrom(unittest.TestCase):
 def test_hasAtLeastOneFrom(self) -> None:
  self.assertEqual(hasAtLeastOneFrom("12A", "ABC"), True)
  self.assertEqual(hasAtLeastOneFrom("C12", "ABC"), True)
  self.assertEqual(hasAtLeastOneFrom("12", "ABCD"), False)
# end test

main()
