// C# with Elan 2.0.0-beta1

[TestClass] class Test_Map_Filter_Reduce
[TestMethod] static void test_Map_Filter_Reduce() {
  var nums = new [] {2.22, 5.37, 8.97, 7.53, 8.2, 9.43, 7.74, 7.03, 9.62, 2.5}; // let
  Assert.AreEqual(new [] {2.22, 2.5}, nums.filter(lessThan5));
  Assert.AreEqual(new [] {10.94, 154.85, 721.73, 426.96, 551.37, 838.56, 463.68, 347.43, 890.28, 15.63}, nums.map(cube));
  Assert.AreEqual(81480107, nums.reduce(1.0, product).floor());
  Assert.AreEqual(new [] {0.45, 0.4}, nums.filter(lessThan5).map(inverse));
  Assert.AreEqual("results: 0.45|0.4|", nums.filter(lessThan5).map(inverse).map(asString).reduce("results: ", concat));
}} // end test

static bool lessThan5(double n) { // function
  return n < 5;
} // end function

static double cube(double n) { // function
  return pow(n, 3).round(2);
} // end function

static double inverse(double n) { // function
  return (1/n).round(2);
} // end function

static string asString(double n) { // function
  return $"{n}|";
} // end function

static double product(double x, double y) { // function
  return (x*y);
} // end function

static string concat(string a, string b) { // function
  return a + b;
} // end function
