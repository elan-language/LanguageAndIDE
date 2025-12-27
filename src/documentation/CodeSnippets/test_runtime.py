# 794fb9afd40ee130381446f6da6391a38c3480c45abdc9ba785b2aa8ad770778 Elan 1.9.0 guest default_profile valid

def test_() -> None:  # [test]
  a = [5, 1, 7] # [variable definition]
  assertEqual(a[0], 5)  # [assert]
  assertEqual(a[2], 7)  # [assert]
  assertEqual(a[4], 0)  # [assert]
  assertEqual(a[4], "Out of range index: 4 size: 3")  # [assert]


