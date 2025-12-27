# b90e4be175217bf0d8ba5fc6fb1380d1b037622e1de7a6145b7d7a51d0234a55 Elan 1.9.0 guest default_profile valid

def main -> None:  # [main]
  li = [1, 2, 3, 4, 5] # [variable definition]
  print li.map(lambda n: Int => n^3)
  names = ["Tom", "Dick", "Harriet"] # [variable definition]
  print names.map(lambda s: String => s.upperCase())
  print names.map(lambda s: String => reverseString(s))
  print reverseStringsInList(names)


def reverseStringsInList(l: List<of String>) -> List<of String>:  # [function]
  lReversed = new List<of String>() # [variable definition]
  sl = 0 # [variable definition]
  for s in l:  # [each loop]
    lReversed = lReversed.withAppend(reverseString(s)) # [assign variable]
  return lReversed


def reverseString(s: String) -> String:  # [function]
  stringReversed = "" # [variable definition]
  for i in range(0, s.length() - 1, 1):  # [for loop]
    stringReversed = s[i] + stringReversed # [assign variable]
  return stringReversed


def test_() -> None:  # [test]
  assertEqual(reverseString("abcdefg"), "gfedcba")  # [assert]
  assertEqual(reverseStringsInList(["ab", "cde"]), ["ba", "edc"])  # [assert]


