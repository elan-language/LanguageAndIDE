# 4bfd33b95e29e24b068dab8d08eafc76f66c883b8f7c8c7a866562160ecf0303 Elan 1.9.0 guest default_profile valid

def test_bitwise() -> None:  # [test]
  a = 13 # [variable definition]
  assertEqual(a, 0xd)  # [assert]
  assertEqual(a, 0b1101)  # [assert]
  assertEqual(a.asBinary(), "1101")  # [assert]
  b = 30 # [variable definition]
  assertEqual(b, 0b11110)  # [assert]
  assertEqual(bitAnd(a, b), 0b1100)  # [assert]
  aob = bitOr(a, b) # [variable definition]
  assertEqual(aob, 0b11111)  # [assert]
  axb = bitXor(a, b) # [variable definition]
  assertEqual(axb, 0b10011)  # [assert]
  nota = bitNot(a) # [variable definition]
  assertEqual(nota, -14)  # [assert]
  aL = bitShiftL(a, 2) # [variable definition]
  assertEqual(aL, 0b110100)  # [assert]
  assertEqual(bitShiftR(a, 2), 0b11)  # [assert]


def main -> None:  # [main]



