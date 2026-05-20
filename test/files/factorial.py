# Python with Elan 2.0.0-alpha4

def main() -> None:
  for n in range(1, 21):
    print(f"{n}! is {factorial(n)}")

def factorial(n: int) -> int: # function
  return if(n < 2, 1, n*factorial(n - 1))

def test_factorial(self) -> None:
  self.assertEqual(factorial(2), 2)
  self.assertEqual(factorial(3), 6)
  self.assertEqual(factorial(7), 5040)
  self.assertEqual(factorial(10), 3628800)

main()
