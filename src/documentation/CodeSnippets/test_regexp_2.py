# 515a10e55cca09e1c83638a0f78c175798ee881a216a15528eb201f5e67a4ccd Elan 1.9.0 guest default_profile valid

def test_() -> None:  # [test]
  s1 = "hello" # [variable definition]
  s2 = "World" # [variable definition]
  r = "^[a-z]*$".asRegExp() # [variable definition]
  assertEqual(s1.matchesRegExp(r), true)  # [assert]
  assertEqual(s2.matchesRegExp(r), false)  # [assert]


def main -> None:  # [main]



