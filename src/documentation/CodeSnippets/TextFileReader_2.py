# 4c52d25e0ecd9ac4bba62eac67beae2d50fd1c7c73def7557e78457bbe98d67b Elan 1.9.0 guest default_profile valid

def main -> None:  # [main]
  file = openFileForReading() # [variable definition]
  lines = empty List<of String> # [variable definition]
  while not file.endOfFile()
    line = file.readLine() # [variable definition]
    lines.append(line) # [call procedure]}
  print lines
  file.close() # [call procedure]}


