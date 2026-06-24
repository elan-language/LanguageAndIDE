// Java with Elan 2.0.0-beta1

public class Global {

// Ideas for further development

// - rule for no more than 'n' same characters in succession

static final String upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // constant

static final String lowerChars = "abcdefghijklmnopqrstuvwxyz"; // constant

static final String digitChars = "01234567890"; // constant

static final String symbolChars = "!$%^&*"; // constant

static final Int length = 32; // constant

static final Boolean upper = true; // constant

static final Boolean lower = true; // constant

static final Boolean digit = true; // constant

static final Boolean symbol = true; // constant

static void main() {
  var all = upperChars + lowerChars + digitChars + symbolChars;
  var password = "";
  var valid = false;
  while (!valid) {
    var pwRef = new AsRef<String>("");
    populatePassword(pwRef, all); // call procedure
    password = pwRef.value(); // reassign variable
    valid = isValid(password, upper, lower, digit, symbol); // reassign variable
  } // end while
  System.out.println(password); // print
} // end main

static void populatePassword(AsRef<String> password, String all) { // procedure
  foreach (var i in range(1, length + 1)) {
    var rnd = randint(0, all.length() - 1);
    password.set(password.value() + all[rnd]); // call procedure
  } // end foreach
} // end procedure

static boolean isValid(String password, boolean mustHaveUpper, boolean mustHaveLower, boolean mustHaveDigit, boolean mustHaveSymbol) { // function
  var validForUpper = passesRule(mustHaveUpper, upperChars, password);
  var validForLower = passesRule(mustHaveLower, lowerChars, password);
  var validForDigits = passesRule(mustHaveDigit, digitChars, password);
  var validForSymbols = passesRule(mustHaveSymbol, symbolChars, password);
  return validForUpper && validForLower && validForDigits && validForSymbols;
} // end function

@Test static void test_isValid() {
  assertEquals(true, isValid("$4De", true, true, true, true));
  assertEquals(false, isValid("$4de", true, true, true, true));
  assertEquals(true, isValid("$4de", false, true, true, true));
  assertEquals(true, isValid("eD$4", true, true, true, true));
  assertEquals(true, isValid("$4De$4De", true, true, true, true));
} // end test

static boolean passesRule(boolean rule, String charSet, String password) { // function
  return (!rule) || hasAtLeastOneFrom(charSet, password);
} // end function

@Test static void test_passesRule() {
  assertEquals(true, passesRule(true, "12A", "ABC"));
  assertEquals(true, passesRule(false, "12A", "ABC"));
  assertEquals(false, passesRule(true, "12", "ABCD"));
  assertEquals(true, passesRule(false, "12", "ABCD"));
} // end test

static boolean hasAtLeastOneFrom(String fromChars, String password) { // function
  var hasOne = false;
  foreach (var ch in password) {
    hasOne = hasOne || fromChars.contains(ch); // reassign variable
  } // end foreach
  return hasOne;
} // end function

@Test static void test_hasAtLeastOneFrom() {
  assertEquals(true, hasAtLeastOneFrom("12A", "ABC"));
  assertEquals(true, hasAtLeastOneFrom("C12", "ABC"));
  assertEquals(false, hasAtLeastOneFrom("12", "ABCD"));
} // end test
} // end Global
