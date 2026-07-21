// Java with Elan 2.0.0-beta2

public class Global {

static int factorial(int n) { // function
  return if_(n < 2, 1, n*factorial(n - 1));
} // end function

class Test_factorial {
@Test static void test_factorial() {
  assertEquals(2, factorial(2));
  assertEquals(6, factorial(3));
  assertEquals(5040, factorial(7));
  assertEquals(3628800, factorial(10));
  // edge cases:
  assertEquals(1, factorial(1));
  assertEquals(1, factorial(0));
}} // end test

static double sum(List<double> li) { // function
  return if_(li.length() == 0, 0.0, li.head() + sum(li.tail()));
} // end function

class Test_sum {
@Test static void test_sum() {
  var li = list(3.1, 5.02, 4, 7.73, 9.9); // let
  assertEquals(29.75, sum(li).round(2));
  // edge cases: empty, and one element lists
  var le = new List<double>(); // let
  assertEquals(0, sum(le));
  var l1 = list(0.6); // let
  assertEquals(0.6, sum(l1));
}} // end test

static List<double> reverse(List<double> li) { // function
  return if_(li.length() < 2, li, reverse(li.tail()).withAppend(li.head()));
} // end function

class Test_reverse {
@Test static void test_reverse() {
  var l = list(3.1, 5.02, 4, 7.73, 9.9); // let
  assertEquals(list(9.9, 7.73, 4, 5.02, 3.1), reverse(l));
  // edge cases: empty, and one element lists
  var le = new List<double>(); // let
  assertEquals(le, reverse(le));
  var l1 = list(0.6); // let
  assertEquals(l1, reverse(l1));
}} // end test
} // end Global
