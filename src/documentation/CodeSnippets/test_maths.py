# a2b03a91639c8a7b5eca7963d64034ccc45efbeb96754b09c639ab462dd2afd9 Elan 1.9.0 guest default_profile valid

def test_() -> None:  # [test]
  assertEqual(pi, 3.141592653589793)  # [assert]
  assertEqual(abs(-3.7), 3.7)  # [assert]
  assertEqual(asin(0.5).round(3), 0.524)  # [assert]
  assertEqual(acos(0.5).round(3), 1.047)  # [assert]
  assertEqual(atan(1).round(2), 0.79)  # [assert]
  assertEqual(sin(pi/6).round(2), 0.5)  # [assert]
  assertEqual(cos(pi/4).round(3), 0.707)  # [assert]
  assertEqual(tan(pi/4).round(2), 1)  # [assert]
  assertEqual(exp(2).round(3), 7.389)  # [assert]
  assertEqual(logE(7.389).round(2), 2)  # [assert]
  assertEqual(log10(1000), 3)  # [assert]
  assertEqual(log2(65536), 16)  # [assert]
  assertEqual(log2(0x10000), 16)  # [assert]
  assertEqual(sqrt(2).round(3), 1.414)  # [assert]


def main -> None:  # [main]



