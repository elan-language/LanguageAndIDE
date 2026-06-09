// Java with Elan 2.0.0-alpha5

public class Global {

// Ideas for further development

// - rule for no more than 'n' same characters in succession

final String upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" // constant

final String lowerChars = "abcdefghijklmnopqrstuvwxyz" // constant

final String digitChars = "01234567890" // constant

final String symbolChars = "!$%^&*" // constant

final Int length = 32 // constant

final Boolean upper = true // constant

final Boolean lower = true // constant

final Boolean digit = true // constant

final Boolean symbol = true // constant

static void main() {
  var all = upperChars + lowerChars + digitChars + symbolChars;
  var password = "";
  var valid = false;
  while (!valid) {
    var pwRef = new AsRef<String>("");
    populatePassword(pwRef, all); // call procedure
    password = pwRef.value(); // reassign variable
    valid = isValid(password, upper, lower, digit, symbol); // reassign variable
  } // while
  System.out.println(password) // print
} // main

static void populatePassword(AsRef<String> password, String all) { // procedure
  foreach (i in range(1, length + 1)) {
    var rnd = randint(0, all.length() - 1);
    password.set(password.value() + all[rnd]); // call procedure
  } // foreach
} // procedure

static bool isValid(String password, bool mustHaveUpper, bool mustHaveLower, bool mustHaveDigit, bool mustHaveSymbol) { // function
  var validForUpper = passesRule(mustHaveUpper, upperChars, password);
  var validForLower = passesRule(mustHaveLower, lowerChars, password);
  var validForDigits = passesRule(mustHaveDigit, digitChars, password);
  var validForSymbols = passesRule(mustHaveSymbol, symbolChars, password);
  return validForUpper && validForLower && validForDigits && validForSymbols;
} // function

@Test static void test_isValid() {
  assertEquals(true, isValid("$4De", true, true, true, true))
  assertEquals(false, isValid("$4de", true, true, true, true))
  assertEquals(true, isValid("$4de", false, true, true, true))
  assertEquals(true, isValid("eD$4", true, true, true, true))
  assertEquals(true, isValid("$4De$4De", true, true, true, true))
} // test

static bool passesRule(bool rule, String charSet, String password) { // function
  return (!rule) || hasAtLeastOneFrom(charSet, password);
} // function

@Test static void test_passesRule() {
  assertEquals(true, passesRule(true, "12A", "ABC"))
  assertEquals(true, passesRule(false, "12A", "ABC"))
  assertEquals(false, passesRule(true, "12", "ABCD"))
  assertEquals(true, passesRule(false, "12", "ABCD"))
} // test

static bool hasAtLeastOneFrom(String fromChars, String password) { // function
  var hasOne = false;
  foreach (ch in password) {
    hasOne = hasOne || fromChars.contains(ch); // reassign variable
  } // foreach
  return hasOne;
} // function

@Test static void test_hasAtLeastOneFrom() {
  assertEquals(true, hasAtLeastOneFrom("12A", "ABC"))
  assertEquals(true, hasAtLeastOneFrom("C12", "ABC"))
  assertEquals(false, hasAtLeastOneFrom("12", "ABCD"))
} // test

}
