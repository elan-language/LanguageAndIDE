# Python with Elan 2.0.0-alpha1

allWords = "AAHED ZYMIC" # constant

allValidAnswers = "ABACK ZONAL" # constant

def main() -> None:
  while True:
    choice = inputIntBetween("1 to solve puzzle set by computer\n2 to set a puzzle for computer to solve\n3 to test test_effectiveness of computer's algorithm\n4 to look up word", 1, 4) # constant
    clearAllDisplays() # call procedure
    executeOption(choice) # call procedure
    pressAnyKeyToContinue() # call procedure
    clearAllDisplays() # call procedure

def executeOption(choice: int) -> None: # procedure
  if choice == 1:
    print("Reduce screen magnification if you can't see all the keys")
    playGame() # call procedure
  elif choice == 2:
    print("Mark using: 0 (grey), 1 (yellow), 2 (green), Enter")
    playReverseGame() # call procedure
  elif choice == 3:
    print("Please wait for analysis to complete ...")
    analyse() # call procedure
  else:
    word = inputStringWithLimits("Enter word: ", 5, 5).upperCase() # constant
    if allValidAnswers.contains(word):
      print(f"{word} is a valid answer")
    elif allWords.contains(word):
      print(f"{word} is not a valid answer, but is a valid guess word")
    else:
      print(f"{word} is not a recognised word")

def playGame() -> None: # procedure
  grid = list[list[str]]() # variable definition
  initialiseGrid(grid) # call procedure
  used = Dictionary[str, str]() # variable definition
  for letter in "ABCDEFGHIJKLMNOPQRSTUVWXYZ":
    used[letter] = " " # change variable
  displayHtml(drawGrid(grid) + drawKeyboard(used)) # call procedure
  target = allValidAnswers.split(" ")[randint(0, 2308)] # constant
  attemptNo = 0 # variable definition
  solved = False # variable definition
  while (attemptNo < 6) and (not solved):
    enterAttempt(attemptNo, grid, used) # call procedure
    solvedRef = AsRef[bool](solved) # variable definition
    colourAttempt(attemptNo, grid, target, solvedRef, used) # call procedure
    solved = solvedRef.value() # change variable
    attemptNo = attemptNo + 1 # change variable
  clearPrintedText() # call procedure
  if solved:
    print("Well done!")

def initialiseGrid(grid: list[list[str]]) -> None: # procedure
  for i in range(0, 5):
    sa = list[str]() # variable definition
    for j in range(0, 6):
      sa.append("") # call procedure
    grid.append(sa) # call procedure

def enterAttempt(attemptNo: int, grid: list[list[str]], used: Dictionary[str, str]) -> None: # procedure
  chNo = 0 # variable definition
  word = "" # variable definition
  while chNo <= 5:
    k = waitForKey().upperCase() # variable definition
    if (k.equals("BACKSPACE")) and (chNo > 0):
      chNo = chNo - 1 # change variable
      grid[chNo][attemptNo] = "" # change variable
      word = word # change variable
      clearPrintedText() # call procedure
    elif (chNo < 5) and isUCLetter(k):
      grid[chNo][attemptNo] = k # change variable
      chNo = chNo + 1 # change variable
      word = word + k # change variable
    elif (chNo == 5) and (k.equals("ENTER")):
      if allWords.contains(word):
        chNo = chNo + 1 # change variable
      else:
        print("Invalid word")
    displayHtml(drawGrid(grid) + drawKeyboard(used)) # call procedure

def colourAttempt(attemptNo: int, grid: list[list[str]], target: str, solved: AsRef[bool], used: Dictionary[str, str]) -> None: # procedure
  attempt = getWord(attemptNo, grid) # variable definition
  marks = markAttempt(attempt, target) # variable definition
  for i in range(0, 5):
    letter = grid[i][attemptNo] # variable definition
    mark = marks[i] # variable definition
    grid[i][attemptNo] = letter + mark # change variable
    if mark.isAfter(used[letter]):
      used[letter] = mark # change variable
  if marks.equals("22222"):
    solved.set(True) # call procedure
  displayHtml(drawGrid(grid) + drawKeyboard(used)) # call procedure

def playReverseGame() -> None: # procedure
  grid = list[list[str]]() # variable definition
  initialiseGrid(grid) # call procedure
  attemptNo = 0 # variable definition
  solved = False # variable definition
  possible = allValidAnswers.split(" ") # variable definition
  attempt = "ARISE" # variable definition
  while (attemptNo < 6) and (not solved):
    for i in range(0, 5):
      grid[i][attemptNo] = attempt[i] # change variable
    displayHtml(drawGrid(grid)) # call procedure
    mark = "" # variable definition
    markRef = AsRef[str](mark) # variable definition
    enterMark(attemptNo, grid, markRef) # call procedure
    mark = markRef.value() # change variable
    if mark.equals("22222"):
      solved = True # change variable
    else:
      attemptNo = attemptNo + 1 # change variable
      possible = possibleAnswersAfterAttempt(possible, attempt, mark) # change variable
    if possible.length() == 0:
      print("No possible answer matches marks so far. Press any key to continue")
      attemptNo = 6 # change variable
    else:
      attempt = possible[divAsInt(possible.length(), 2)] # change variable

def enterMark(attemptNo: int, grid: list[list[str]], markRef: AsRef[str]) -> None: # procedure
  mark = markRef.value() # variable definition
  guess = getWord(attemptNo, grid) # variable definition
  chNo = 0 # variable definition
  while chNo <= 5:
    k = waitForKey().upperCase() # variable definition
    if (k.equals("BACKSPACE")) and (chNo > 0):
      chNo = chNo - 1 # change variable
      entry = grid[chNo][attemptNo] # variable definition
      grid[chNo][attemptNo] = entry[0] # change variable
      mark = mark.subString(0, chNo) # change variable
    elif (chNo < 5) and "012".contains(k):
      ch = grid[chNo][attemptNo] # variable definition
      grid[chNo][attemptNo] = ch + k # change variable
      chNo = chNo + 1 # change variable
      mark = mark + k # change variable
    elif (chNo == 5) and (k.equals("ENTER")):
      chNo = chNo + 1 # change variable
    displayHtml(drawGrid(grid)) # call procedure
  markRef.set(mark) # call procedure

def analyse() -> None: # procedure
  outcomes = list[int]() # variable definition
  outcomes.initialise(10, 0) # call procedure
  for word in allValidAnswers.split(" "):
    possible = allValidAnswers.split(" ") # variable definition
    mark = "" # variable definition
    attempt = "RAISE" # variable definition
    attempts = 0 # variable definition
    while (not mark.equals("22222")):
      attempts = attempts + 1 # change variable
      mark = markAttempt(attempt, word) # change variable
      possible = possibleAnswersAfterAttempt(possible, attempt, mark) # change variable
      attempt = possible[0] # change variable
    outcomes[attempts] = outcomes[attempts] + 1 # change variable
  success = 0 # variable definition
  weightedSum = 0 # variable definition
  for i in range(1, 7):
    success = success + outcomes[i] # change variable
    weightedSum = weightedSum + (i*outcomes[i]) # change variable
  clearPrintedText() # call procedure
  solved = (success/2309.0*100).floor() # constant
  avg = divAsFloat(weightedSum, success).round(2) # constant
  pc = "%" # constant
  print(f"For all 2309 possible answers,\nthe current reverse-game algorithm \nsolved {solved}{pc} within 6 attempts,\nwith an average of {avg} attempts.")

def isUCLetter(k: str) -> bool: # function
  unicode = k.asUnicode() # constant
  return (k.length() == 1) and (unicode > 64) and (unicode < 91)

def test_isUCLetter(self) -> None:
  self.assertEqual(isUCLetter("A"), True)
  self.assertEqual(isUCLetter("Z"), True)
  self.assertEqual(isUCLetter("a"), False)
  self.assertEqual(isUCLetter("1"), False)
  self.assertEqual(isUCLetter(" "), False)

def getWord(attemptNo: int, grid: list[list[str]]) -> str: # function
  guessWord = "" # variable definition
  for i in range(0, 5):
    guessWord = guessWord + grid[i][attemptNo] # change variable
  return guessWord

def setChar(word: str, n: int, newChar: str) -> str: # function
  return word.subString(0, n) + newChar + word.subString(n + 1, word.length())

def test_setChar(self) -> None:
  self.assertEqual(setChar("ABCDE", 0, "_"), "_BCDE")
  self.assertEqual(setChar("ABCDE", 4, "_"), "ABCD_")

def markAttempt(attempt: str, target: str) -> str: # function
  mark = "00000" # variable definition
  unused = target # variable definition
  for n in range(0, 5):
    if attempt[n].equals(unused[n]):
      mark = setChar(mark, n, "2") # change variable
      unused = setChar(unused, n, " ") # change variable
  for n in range(0, 5):
    if (not mark[n].equals("2")) and unused.contains(attempt[n]):
      mark = setChar(mark, n, "1") # change variable
      unused = setChar(unused, unused.indexOf(attempt[n]), " ") # change variable
  return mark

def test_markAttempt(self) -> None:
  self.assertEqual(markAttempt("ABCDE", "XXXXX"), "00000")
  self.assertEqual(markAttempt("ABCDE", "BCDEA"), "11111")
  self.assertEqual(markAttempt("ABCDE", "ABCDE"), "22222")
  self.assertEqual(markAttempt("SAINT", "LADLE"), "02000")
  self.assertEqual(markAttempt("IDEAL", "LADLE"), "01111")
  self.assertEqual(markAttempt("CABAL", "RECAP"), "10020")
  self.assertEqual(markAttempt("COLON", "GLORY"), "01100")
  self.assertEqual(markAttempt("AORTA", "RATTY"), "10120")
  self.assertEqual(markAttempt("RATTY", "AORTA"), "11020")
  self.assertEqual(markAttempt("FAIRY", "RATTY"), "02012")

def possibleAnswersAfterAttempt(possible: list[str], attempt: str, mark: str) -> list[str]: # function
  newPossible = list[str]() # variable definition
  for word in possible:
    markForWord = markAttempt(attempt, word) # constant
    if markForWord.equals(mark):
      newPossible = newPossible.withAppend(word) # change variable
  return newPossible

def test_possibleAnswersAfterAttempt(self) -> None:
  prior = ["ABCDE", "BCDEA", "CDEAB", "DEABC", "EABCD"] # variable definition
  self.assertEqual(possibleAnswersAfterAttempt(prior, "AAAAA", "20000"), ["ABCDE"])
  self.assertEqual(possibleAnswersAfterAttempt(prior, "AXXXX", "10000"), ["BCDEA", "CDEAB", "DEABC", "EABCD"])
  self.assertEqual(possibleAnswersAfterAttempt(prior, "AXXBX", "10010"), ["BCDEA", "CDEAB", "EABCD"])
  self.assertEqual(possibleAnswersAfterAttempt(["RATTY"], "AORTA", "10120"), ["RATTY"])
  self.assertEqual(possibleAnswersAfterAttempt(["FAIRY", "HAIRY", "RAINY", "RASPY", "RATTY"], "FAIRY", "02012"), ["RASPY", "RATTY"])

def drawGrid(grid: list[list[str]]) -> str: # function
  html = f"<style>{style}</style> <grid>" # variable definition
  for row in range(0, 6):
    html = html + "<word>" # change variable
    for col in range(0, 5):
      entry = grid[col][row] # constant
      ch = if(entry.length() > 0, entry[0], "") # constant
      mark = if(entry.length() > 1, entry.subString(1, entry.length()), "") # constant
      html = html + f"<ch class='_{mark}'>{ch}</ch>" # change variable
    html = html + "</word>" # change variable
  return html + "</grid>"

def drawKeyboard(used: Dictionary[str, str]) -> str: # function
  html = "<keyboard><div>" # variable definition
  for k in "QWERTYUIOP-ASDFGHJKL-ZXCVBNM":
    if k.equals("-"):
      html = html + "</div><div>" # change variable
    else:
      html = html + f"<key class='_{used[k]}'>{k}</key>" # change variable
  return html + "<key></key></div></keyboard>"

style = "grid { display: flex; flex-direction: column; margin-top: 40px; width: 500px;}word { display: flex; flex-direction: row; margin: auto;}ch, key { font-family: Segoe UI, Tahoma, Geneva, Verdana, sans-serif; font-weight: bold; background-color: white;}ch { text-align: center; font-size: 18pt; border: solid, 1.5px, black; margin: 2px; width: 37.5px; height: 37.5px; line-height: 33px;}ch:empty, key:empty { border-color: lightgrey;}key._ { background-color: lightgrey;}ch._2, key._2 { background-color: #6aaa64; border-color: #6aaa64; color: white;}ch._1, key._1 { background-color: #c9b458; border-color: #c9b458; color: white;}ch._0, key._0 { background-color: #787c7e; border-color: #787c7e; color: white;}keyboard { width: 500px; display: flex; flex-direction: column; margin-top:5px;}keyboard div { display: flex; flex-direction: row; margin:auto;}key { display: block; float: left; font-size: 10pt; width: 23px; margin: 2px; padding-bottom: 6px; padding-top:5px; text-align: center; border-radius: 5px;}" # constant
