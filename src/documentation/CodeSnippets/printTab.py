# 5b1251709bf8d5e189828b9212183bf4d7abaddf0281bd76ae6939a92e84cd3a Elan 1.9.0 guest default_profile valid

def main -> None:  # [main]
  printTab(0, "Number") # [call procedure]}
  printTab(10, "Square") # [call procedure]}
  printTab(20, "Cube\n") # [call procedure]}
  for i in range(1, 10, 1):  # [for loop]
    printTab(0, i.asString()) # [call procedure]}
    printTab(10, "{i^2}") # [call procedure]}
    printTab(20, "{i^3}\n") # [call procedure]}


