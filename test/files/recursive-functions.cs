// C# with Elan 2.0.0-beta2

static int factorial(int n) { // function
  return if_(n < 2, 1, n*factorial(n - 1));
} // end function

[TestClass] class Test_factorial
[TestMethod] static void test_factorial() {
  Assert.AreEqual(2, factorial(2));
  Assert.AreEqual(6, factorial(3));
  Assert.AreEqual(5040, factorial(7));
  Assert.AreEqual(3628800, factorial(10));
  // edge cases:
  Assert.AreEqual(1, factorial(1));
  Assert.AreEqual(1, factorial(0));
}} // end test

static double sum(List<double> li) { // function
  return if_(li.length() == 0, 0.0, li.head() + sum(li.tail()));
} // end function

[TestClass] class Test_sum
[TestMethod] static void test_sum() {
  var li = new [] {3.1, 5.02, 4, 7.73, 9.9}; // let
  Assert.AreEqual(29.75, sum(li).round(2));
  // edge cases: empty, and one element lists
  var le = new List<double>(); // let
  Assert.AreEqual(0, sum(le));
  var l1 = new [] {0.6}; // let
  Assert.AreEqual(0.6, sum(l1));
}} // end test

static List<double> reverse(List<double> li) { // function
  return if_(li.length() < 2, li, reverse(li.tail()).withAppend(li.head()));
} // end function

[TestClass] class Test_reverse
[TestMethod] static void test_reverse() {
  var l = new [] {3.1, 5.02, 4, 7.73, 9.9}; // let
  Assert.AreEqual(new [] {9.9, 7.73, 4, 5.02, 3.1}, reverse(l));
  // edge cases: empty, and one element lists
  var le = new List<double>(); // let
  Assert.AreEqual(le, reverse(le));
  var l1 = new [] {0.6}; // let
  Assert.AreEqual(l1, reverse(l1));
}} // end test
