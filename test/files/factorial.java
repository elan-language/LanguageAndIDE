// Java with Elan 2.0.0-alpha4

static void main() {
  foreach (var n in range(1, 21)) {
    print(String.format("%! is %", n, factorial(n)));
  }
}

static int factorial(int n) { // function
  return if(n < 2, 1, n*factorial(n - 1));
}

@Test static void test_factorial() {
  assertEquals(2, factorial(2))
  assertEquals(6, factorial(3))
  assertEquals(5040, factorial(7))
  assertEquals(3628800, factorial(10))
}
