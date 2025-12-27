# 19a82f896097780e9675240b4803e4ed9ef31fe66b551bda31b2f149075fb9b8 Elan 1.9.0 guest default_profile valid

def main -> None:  # [main]
  rnd = new Random() # [variable definition]
  rnd.initialiseFromClock() # [call procedure]}
  dice = 0 # [variable definition]
  for i in range(1, 10, 1):  # [for loop]
    dice, rnd = rollDice(rnd) # [assign variable]
    print dice


def rollDice(rnd: Random) -> (Int, Random):  # [function]
  return rnd.nextInt(1, 6)


