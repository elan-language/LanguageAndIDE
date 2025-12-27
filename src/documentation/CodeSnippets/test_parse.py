# a81323687b1218c616ebf35dd571b8664489de0861a7d88abd21d76b84312595 Elan 1.9.0 guest default_profile valid

def test_() -> None:  # [test]
  assertEqual(parseAsInt("31"), tuple(true, 31))  # [assert]
  assertEqual(parseAsInt("0"), tuple(true, 0))  # [assert]
  assertEqual(parseAsInt("thirty one"), tuple(false, 0))  # [assert]
  assertEqual(parseAsInt("3.1"), tuple(false, 0))  # [assert]
  assertEqual(parseAsFloat("31"), tuple(true, 31))  # [assert]
  assertEqual(parseAsFloat("0"), tuple(true, 0))  # [assert]
  assertEqual(parseAsFloat("3.1"), tuple(true, 3.1))  # [assert]


