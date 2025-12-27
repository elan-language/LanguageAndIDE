# 44235531d03338e4cba87dd720983f9ba011c82d99e126aa472acd7058091988 Elan 1.9.0 guest default_profile valid

class Pupil
  mathsPercent: Int = None # [property]

end class

def main -> None:  # [main]
  allPupils = new List<of Pupil>() # [variable definition]
  passes = allPupils.filter(ref passedMathsTest) # [variable definition]


def passedMathsTest(p: Pupil) -> Boolean:  # [function]
  return p.mathsPercent > 35


