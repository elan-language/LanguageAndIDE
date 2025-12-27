# 7f01fd620797a9025db77b69ca6012c09cc6a58c2c12f9b4f6c2e43fe9ea29d5 Elan 1.9.0 guest default_profile valid

def main -> None:  # [main]
  for n in range(50, 72, 1):  # [for loop]
    s = lambda n: Int => n.asString().length() # [variable definition]
    np = 2^n # [variable definition]
    printTab(-s(n), "{n}") # [call procedure]}
    printTab(30 - s(np), "{np}\n") # [call procedure]}


