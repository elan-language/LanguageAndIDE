// C# with Elan 2.0.0-alpha5

static int factorial(int n) { // function
  return if(n < 2, 1, n*factorial(n - 1));
} // function

[TestMethod] static void test_factorial() {
  Assert.AreEqual(2, factorial(2))
  Assert.AreEqual(6, factorial(3))
  Assert.AreEqual(5040, factorial(7))
  Assert.AreEqual(3628800, factorial(10))
  // edge cases:
  Assert.AreEqual(1, factorial(1))
  Assert.AreEqual(1, factorial(0))
} // test

static double sum(List<double> li) { // function
  return if(li.length() == 0, 0.0, li.head() + sum(li.tail()));
} // function

[TestMethod] static void test_sum() {
  var li = [3.1, 5.02, 4, 7.73, 9.9]; // let
  Assert.AreEqual(29.75, sum(li).round(2))
  // edge cases: empty, and one element lists
  var le = new List<double>(); // let
  Assert.AreEqual(0, sum(le))
  var l1 = [0.6]; // let
  Assert.AreEqual(0.6, sum(l1))
} // test

static List<double> reverse(List<double> li) { // function
  return if(li.length() < 2, li, reverse(li.tail()).withAppend(li.head()));
} // function

[TestMethod] static void test_reverse() {
  var l = [3.1, 5.02, 4, 7.73, 9.9]; // let
  Assert.AreEqual([9.9, 7.73, 4, 5.02, 3.1], reverse(l))
  // edge cases: empty, and one element lists
  var le = new List<double>(); // let
  Assert.AreEqual(le, reverse(le))
  var l1 = [0.6]; // let
  Assert.AreEqual(l1, reverse(l1))
} // test
