# c50b07de5cf622558a2dbab265775c09db9ea9a863c8731af552834c972cdb34 Elan 1.9.0 guest default_profile valid

def test_() -> None:  # [test]
  n = pi # [variable definition]
  assertEqual(n.floor(), 3)  # [assert]
  assertEqual(n.ceiling(), 4)  # [assert]
  assertEqual(n.round(3), 3.142)  # [assert]
  assertEqual(sqrt(-1).isNaN(), true)  # [assert]
  x = 1/0 # [variable definition]
  assertEqual(x.isInfinite(), true)  # [assert]


def main -> None:  # [main]



