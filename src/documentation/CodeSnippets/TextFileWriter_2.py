# 9c3ee80f85f6c67b62ac17fc2a1382693f718027843b898048fd99b3ecc097ee Elan 1.9.0 guest default_profile valid

def main -> None:  # [main]
  file = createFileForWriting("squares.txt") # [variable definition]
  for i in range(1, 100, 1):  # [for loop]
    file.writeLine("{i*i}") # [call procedure]}
  file.saveAndClose() # [call procedure]}


