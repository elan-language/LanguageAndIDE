# 6558b9eda7b899dcbb0eb1b765a1f0bfe5fb57a52f2a7970826c4f592c0258f1 Elan 1.9.0 guest default_profile valid

def main -> None:  # [main]
  print factorial(7)


def factorial(n: Int) -> Int:  # [function]
  return (if n > 1 then n*factorial(n - 1) else 1)


def test_() -> None:  # [test]
  assertEqual(factorial(3), 6)  # [assert]


