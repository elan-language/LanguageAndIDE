# b9fbcae514b9404a090316394cdc26c4f12f565aa9a7d42445e6240e3f240896 Elan 1.9.0 guest default_profile valid

def main -> None:  # [main]
  file = createFileForWriting("squares.txt") # [variable definition]
  for i in range(1, 100, 1):  # [for loop]
    file.writeLine("{i*i}") # [call procedure]}
  try
    file.saveAndClose() # [call procedure]}
  catch exception in e
    print "File save cancelled"
  end try


