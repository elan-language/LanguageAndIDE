# Python with Elan 2.0.0-alpha

allWords = "AAHED ZYMIC" # constant

allValidAnswers = "ABACK ZONAL" # constant

def main(): None:
  while True:
    choice = inputIntBetween("1 to solve puzzle set by computer\n2 to set a puzzle for computer to solve\n3 to test test_effectiveness of computer's algorithm\n4 to look up word", 1, 4) # constant
    clearAllDisplays() # call
    executeOption(choice) # call
    pressAnyKeyToContinue(True) # call
    clearAllDisplays() # call

def executeOption(choice: int) -> None: # procedure
  if choice == 1:
    print("Reduce screen magnification if you can't see all the keys") # call
    playGame() # call
  elif choice == 2:
    print("Mark using: 0 (grey), 1 (yellow), 2 (green), Enter") # call
    playReverseGame() # call
  elif choice == 3:
    print("Please wait for analysis to complete ...") # call
    analyse() # call
  else:
    word = inputStringWithLimits("Enter word: ", 5, 5).upperCase() # constant
    if allValidAnswers.contains(word):
      print(f"{word} is a valid answer") # call
    elif allWords.contains(word):
      print(f"{word} is not a valid answer, but is a valid guess word") # call
    else:
      print(f"{word} is not a recognised word") # call

def playGame() -> None: # procedure
  grid = list[list[str]]() # variable
  initialiseGrid(grid) # call
  used = Dictionary[str, str]() # variable
  for letter in "ABCDEFGHIJKLMNOPQRSTUVWXYZ":
    used.put(letter, " ") # call
  displayHtml(drawGrid(grid) + drawKeyboard(used)) # call
  target = allValidAnswers.split(" ")[randomInt(0, 2308)] # constant
  attemptNo = 0 # variable
  solved = False # variable
  while (attemptNo < 6) and (not solved):
    enterAttempt(attemptNo, grid, used) # call
    solvedRef = AsRef[bool](solved) # variable
    colourAttempt(attemptNo, grid, target, solvedRef, used) # call
    solved = solvedRef.value() # set
    attemptNo = attemptNo + 1 # set
  clearPrintedText() # call
  if solved:
    print("Well done!") # call

def initialiseGrid(grid: list[list[str]]) -> None: # procedure
  for i in range(0, 5):
    sa = list[str]() # variable
    for j in range(0, 6):
      sa.append("") # call
    grid.append(sa) # call

def enterAttempt(attemptNo: int, grid: list[list[str]], used: Dictionary[str, str]) -> None: # procedure
  chNo = 0 # variable
  word = "" # variable
  while chNo <= 5:
    k = waitForKey().upperCase() # variable
    if (k.equals("BACKSPACE")) and (chNo > 0):
      chNo = chNo - 1 # set
      grid[chNo][attemptNo] = "" # set
      word = word # set
      clearPrintedText() # call
    elif (chNo < 5) and isUCLetter(k):
      grid[chNo][attemptNo] = k # set
      chNo = chNo + 1 # set
      word = word + k # set
    elif (chNo == 5) and (k.equals("ENTER")):
      if allWords.contains(word):
        chNo = chNo + 1 # set
      else:
        print("Invalid word") # call
    displayHtml(drawGrid(grid) + drawKeyboard(used)) # call

def colourAttempt(attemptNo: int, grid: list[list[str]], target: str, solved: AsRef[bool], used: Dictionary[str, str]) -> None: # procedure
  attempt = getWord(attemptNo, grid) # variable
  marks = markAttempt(attempt, target) # variable
  for i in range(0, 5):
    letter = grid[i][attemptNo] # variable
    mark = marks[i] # variable
    grid[i][attemptNo] = letter + mark # set
    if mark.isAfter(used[letter]):
      used.put(letter, mark) # call
  if marks.equals("22222"):
    solved.set(True) # call
  displayHtml(drawGrid(grid) + drawKeyboard(used)) # call

def playReverseGame() -> None: # procedure
  grid = list[list[str]]() # variable
  initialiseGrid(grid) # call
  attemptNo = 0 # variable
  solved = False # variable
  possible = allValidAnswers.split(" ") # variable
  attempt = "ARISE" # variable
  while (attemptNo < 6) and (not solved):
    for i in range(0, 5):
      grid[i][attemptNo] = attempt[i] # set
    displayHtml(drawGrid(grid)) # call
    mark = "" # variable
    markRef = AsRef[str](mark) # variable
    enterMark(attemptNo, grid, markRef) # call
    mark = markRef.value() # set
    if mark.equals("22222"):
      solved = True # set
    else:
      attemptNo = attemptNo + 1 # set
      possible = possibleAnswersAfterAttempt(possible, attempt, mark) # set
    if possible.length() == 0:
      print("No possible answer matches marks so far. Press any key to continue") # call
      attemptNo = 6 # set
    else:
      attempt = possible[divAsInt(possible.length(), 2)] # set

def enterMark(attemptNo: int, grid: list[list[str]], markRef: AsRef[str]) -> None: # procedure
  mark = markRef.value() # variable
  guess = getWord(attemptNo, grid) # variable
  chNo = 0 # variable
  while chNo <= 5:
    k = waitForKey().upperCase() # variable
    if (k.equals("BACKSPACE")) and (chNo > 0):
      chNo = chNo - 1 # set
      entry = grid[chNo][attemptNo] # variable
      grid[chNo][attemptNo] = entry[0] # set
      mark = mark.subString(0, chNo) # set
    elif (chNo < 5) and "012".contains(k):
      ch = grid[chNo][attemptNo] # variable
      grid[chNo][attemptNo] = ch + k # set
      chNo = chNo + 1 # set
      mark = mark + k # set
    elif (chNo == 5) and (k.equals("ENTER")):
      chNo = chNo + 1 # set
    displayHtml(drawGrid(grid)) # call
  markRef.set(mark) # call

def analyse() -> None: # procedure
  outcomes = list[int]() # variable
  outcomes.initialise(10, 0) # call
  for word in allValidAnswers.split(" "):
    possible = allValidAnswers.split(" ") # variable
    mark = "" # variable
    attempt = "RAISE" # variable
    attempts = 0 # variable
    while (not mark.equals("22222")):
      attempts = attempts + 1 # set
      mark = markAttempt(attempt, word) # set
      possible = possibleAnswersAfterAttempt(possible, attempt, mark) # set
      attempt = possible[0] # set
    outcomes.put(attempts, outcomes[attempts] + 1) # call
  success = 0 # variable
  weightedSum = 0 # variable
  for i in range(1, 7):
    success = success + outcomes[i] # set
    weightedSum = weightedSum + (i*outcomes[i]) # set
  clearPrintedText() # call
  solved = (success/2309.0*100).floor() # constant
  avg = divAsFloat(weightedSum, success).round(2) # constant
  pc = "%" # constant
  print(f"For all 2309 possible answers,\nthe current reverse-game algorithm \nsolved {solved}{pc} within 6 attempts,\nwith an average of {avg} attempts.") # call

def isUCLetter(k: str) -> bool: # function
  unicode = k.asUnicode() # constant
  return (k.length() == 1) and (unicode > 64) and (unicode < 91)

def  test_isUCLetter()-> None:
  self.assertEqual(isUCLetter("A"), True) 
  self.assertEqual(isUCLetter("Z"), True) 
  self.assertEqual(isUCLetter("a"), False) 
  self.assertEqual(isUCLetter("1"), False) 
  self.assertEqual(isUCLetter(" "), False) 

def getWord(attemptNo: int, grid: list[list[str]]) -> str: # function
  guessWord = "" # variable
  for i in range(0, 5):
    guessWord = guessWord + grid[i][attemptNo] # set
  return guessWord

def setChar(word: str, n: int, newChar: str) -> str: # function
  return word.subString(0, n) + newChar + word.subString(n + 1, word.length())

def  test_setChar()-> None:
  self.assertEqual(setChar("ABCDE", 0, "_"), "_BCDE") 
  self.assertEqual(setChar("ABCDE", 4, "_"), "ABCD_") 

def markAttempt(attempt: str, target: str) -> str: # function
  mark = "00000" # variable
  unused = target # variable
  for n in range(0, 5):
    if attempt[n].equals(unused[n]):
      mark = setChar(mark, n, "2") # set
      unused = setChar(unused, n, " ") # set
  for n in range(0, 5):
    if (not mark[n].equals("2")) and unused.contains(attempt[n]):
      mark = setChar(mark, n, "1") # set
      unused = setChar(unused, unused.indexOf(attempt[n]), " ") # set
  return mark

def  test_markAttempt()-> None:
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
  newPossible = list[str]() # variable
  for word in possible:
    markForWord = markAttempt(attempt, word) # constant
    if markForWord.equals(mark):
      newPossible = newPossible.withAppend(word) # set
  return newPossible

def  test_possibleAnswersAfterAttempt()-> None:
  prior = ["ABCDE", "BCDEA", "CDEAB", "DEABC", "EABCD"] # variable
  self.assertEqual(possibleAnswersAfterAttempt(prior, "AAAAA", "20000"), ["ABCDE"]) 
  self.assertEqual(possibleAnswersAfterAttempt(prior, "AXXXX", "10000"), ["BCDEA", "CDEAB", "DEABC", "EABCD"]) 
  self.assertEqual(possibleAnswersAfterAttempt(prior, "AXXBX", "10010"), ["BCDEA", "CDEAB", "EABCD"]) 
  self.assertEqual(possibleAnswersAfterAttempt(["RATTY"], "AORTA", "10120"), ["RATTY"]) 
  self.assertEqual(possibleAnswersAfterAttempt(["FAIRY", "HAIRY", "RAINY", "RASPY", "RATTY"], "FAIRY", "02012"), ["RASPY", "RATTY"]) 

def drawGrid(grid: list[list[str]]) -> str: # function
  html = f"<style>{style}</style> <grid>" # variable
  for row in range(0, 6):
    html = html + "<word>" # set
    for col in range(0, 5):
      entry = grid[col][row] # constant
      ch = if(entry.length() > 0, entry[0], "") # constant
      mark = if(entry.length() > 1, entry.subString(1, entry.length()), "") # constant
      html = html + f"<ch class='_{mark}'>{ch}</ch>" # set
    html = html + "</word>" # set
  return html + "</grid>"

def drawKeyboard(used: Dictionary[str, str]) -> str: # function
  html = "<keyboard><div>" # variable
  for k in "QWERTYUIOP-ASDFGHJKL-ZXCVBNM":
    if k.equals("-"):
      html = html + "</div><div>" # set
    else:
      html = html + f"<key class='_{used[k]}'>{k}</key>" # set
  return html + "<key></key></div></keyboard>"

style = "grid { display: flex; flex-direction: column; margin-top: 40px; width: 500px;}word { display: flex; flex-direction: row; margin: auto;}ch, key { font-family: Segoe UI, Tahoma, Geneva, Verdana, sans-serif; font-weight: bold; background-color: white;}ch { text-align: center; font-size: 18pt; border: solid, 1.5px, black; margin: 2px; width: 37.5px; height: 37.5px; line-height: 33px;}ch:empty, key:empty { border-color: lightgrey;}key._ { background-color: lightgrey;}ch._2, key._2 { background-color: #6aaa64; border-color: #6aaa64; color: white;}ch._1, key._1 { background-color: #c9b458; border-color: #c9b458; color: white;}ch._0, key._0 { background-color: #787c7e; border-color: #787c7e; color: white;}keyboard { width: 500px; display: flex; flex-direction: column; margin-top:5px;}keyboard div { display: flex; flex-direction: row; margin:auto;}key { display: block; float: left; font-size: 10pt; width: 23px; margin: 2px; padding-bottom: 6px; padding-top:5px; text-align: center; border-radius: 5px;}" # constant
