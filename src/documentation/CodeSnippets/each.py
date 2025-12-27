# 0d716cb6112434892538b32c1139a313fd715eca14bf4b712b93ffb30d853b29 Elan 1.9.0 guest default_profile valid

def main -> None:  # [main]
  names = ["Tom", "Dick", "Harriet"] # [variable definition]
  print names[0]
  for n in names:  # [each loop]
    print n
  print reverse("Harriet")


def reverse(s: String) -> String:  # [function]
  sReturn = empty String # [variable definition]
  for ch in s:  # [each loop]
    sReturn = ch + sReturn # [assign variable]
  return sReturn


