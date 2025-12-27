# 17ee1464f9b27354ba1930aba5115dfd4959b0b5f48aaa89352d20ac248ea2fc Elan 1.9.0 guest default_profile valid

def main -> None:  # [main]
  immD = new DictionaryImmutable<of String, Int>() # [variable definition]
  print immD
  immD = immD.withPut("a", 3) # [assign variable]
  print immD["a"]
  immD = immD.withRemoveAt("a") # [assign variable]
  print immD


