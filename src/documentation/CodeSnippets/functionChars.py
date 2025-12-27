# 454b0057f406d5ae6f98329cbb0da43fb8a0a03e0cd3f2ffca0d9f863709c9a8 Elan 1.9.0 guest default_profile valid

def matchAt(a: String, b: String, p: Int) -> Boolean:  # [function]
  return if a[p] is b[p] then true else false


class Sequence
  matchAt: Func<of String, String, Int => Boolean> = None # [property]

end class

def main -> None:  # [main]
  m = new Sequence() # [variable definition]


