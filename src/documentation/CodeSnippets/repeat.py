# 8483fc3156ba48bf5896075cb4613e7088d9023127ca50ca4d7e8a24141649a6 Elan 1.9.0 guest default_profile valid

def main -> None:  # [main]
  names = ["Abel", "Boole", "Cantor", "Descartes"] # [variable definition]
  file = createFileForWriting("Maths.txt") # [variable definition]
  i = 0 # [variable definition]
  while i < names.length()
    file.writeLine(names[i]) # [call procedure]}
    i = i + 1 # [assign variable]
  file.saveAndClose() # [call procedure]}


