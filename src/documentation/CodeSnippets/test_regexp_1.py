# a5ce5850547e5619ecdf02fcc8d1e4bb8dd83970797fcd5e4ce47af44c83834d Elan 1.9.0 guest default_profile valid

def test_() -> None:  # [test]
  s1 = "hello" # [variable definition]
  s2 = "World" # [variable definition]
  r = /^[a-z]*$/ # [variable definition]
  assertEqual(s1.matchesRegExp(r), true)  # [assert]
  assertEqual(s2.matchesRegExp(r), false)  # [assert]


def main -> None:  # [main]



