// C# with Elan 2.0.0-alpha4

static void main() {
  foreach (n in range(1, 21)) {
    print($"{n}! is {factorial(n)}");
  }
}

static int factorial(int n) { // function
  return if(n < 2, 1, n*factorial(n - 1));
}

[TestMethod] static void test_factorial() {
  Assert.AreEqual(2, factorial(2))
  Assert.AreEqual(6, factorial(3))
  Assert.AreEqual(5040, factorial(7))
  Assert.AreEqual(3628800, factorial(10))
}
