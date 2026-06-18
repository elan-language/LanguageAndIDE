// C# with Elan 2.0.0-beta

// Ideas for further development

// - rule for no more than 'n' same characters in succession

const String upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const String lowerChars = "abcdefghijklmnopqrstuvwxyz";

const String digitChars = "01234567890";

const String symbolChars = "!$%^&*";

const Int length = 32;

const Boolean upper = true;

const Boolean lower = true;

const Boolean digit = true;

const Boolean symbol = true;

static void main() {
  var all = upperChars + lowerChars + digitChars + symbolChars;
  var password = "";
  var valid = false;
  while (!valid) {
    var pwRef = new AsRef<string>("");
    populatePassword(pwRef, all); // call procedure
    password = pwRef.value(); // reassign variable
    valid = isValid(password, upper, lower, digit, symbol); // reassign variable
  } // end while
  Console.WriteLine(password); // print
} // end main

static void populatePassword(AsRef<string> password, string all) { // procedure
  foreach (var i in range(1, length + 1)) {
    var rnd = randint(0, all.length() - 1);
    password.set(password.value() + all[rnd]); // call procedure
  } // end foreach
} // end procedure

static bool isValid(string password, bool mustHaveUpper, bool mustHaveLower, bool mustHaveDigit, bool mustHaveSymbol) { // function
  var validForUpper = passesRule(mustHaveUpper, upperChars, password);
  var validForLower = passesRule(mustHaveLower, lowerChars, password);
  var validForDigits = passesRule(mustHaveDigit, digitChars, password);
  var validForSymbols = passesRule(mustHaveSymbol, symbolChars, password);
  return validForUpper && validForLower && validForDigits && validForSymbols;
} // end function

[TestMethod] static void test_isValid() {
  Assert.AreEqual(true, isValid("$4De", true, true, true, true));
  Assert.AreEqual(false, isValid("$4de", true, true, true, true));
  Assert.AreEqual(true, isValid("$4de", false, true, true, true));
  Assert.AreEqual(true, isValid("eD$4", true, true, true, true));
  Assert.AreEqual(true, isValid("$4De$4De", true, true, true, true));
} // end test

static bool passesRule(bool rule, string charSet, string password) { // function
  return (!rule) || hasAtLeastOneFrom(charSet, password);
} // end function

[TestMethod] static void test_passesRule() {
  Assert.AreEqual(true, passesRule(true, "12A", "ABC"));
  Assert.AreEqual(true, passesRule(false, "12A", "ABC"));
  Assert.AreEqual(false, passesRule(true, "12", "ABCD"));
  Assert.AreEqual(true, passesRule(false, "12", "ABCD"));
} // end test

static bool hasAtLeastOneFrom(string fromChars, string password) { // function
  var hasOne = false;
  foreach (var ch in password) {
    hasOne = hasOne || fromChars.contains(ch); // reassign variable
  } // end foreach
  return hasOne;
} // end function

[TestMethod] static void test_hasAtLeastOneFrom() {
  Assert.AreEqual(true, hasAtLeastOneFrom("12A", "ABC"));
  Assert.AreEqual(true, hasAtLeastOneFrom("C12", "ABC"));
  Assert.AreEqual(false, hasAtLeastOneFrom("12", "ABCD"));
} // end test
