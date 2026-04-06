// Java with Elan 2.0.0-alpha1

final String allWords = "AAHED ZYMIC" // constant

final String allValidAnswers = "ABACK ZONAL" // constant

static void main() {
  while (true) {
    final Int choice = inputIntBetween("1 to solve puzzle set by computer\n2 to set a puzzle for computer to solve\n3 to test test_effectiveness of computer's algorithm\n4 to look up word", 1, 4); // constant
    clearAllDisplays(); // call procedure
    executeOption(choice); // call procedure
    pressAnyKeyToContinue(true); // call procedure
    clearAllDisplays(); // call procedure
  }
}

static void executeOption(int choice) { // procedure
  if (choice == 1) {
    print("Reduce screen magnification if you can't see all the keys"); // call procedure
    playGame(); // call procedure
  } else if (choice == 2) {
    print("Mark using: 0 (grey), 1 (yellow), 2 (green), Enter"); // call procedure
    playReverseGame(); // call procedure
  } else if (choice == 3) {
    print("Please wait for analysis to complete ..."); // call procedure
    analyse(); // call procedure
  } else {
    final String word = inputStringWithLimits("Enter word: ", 5, 5).upperCase(); // constant
    if (allValidAnswers.contains(word)) {
      print(String.format("% is a valid answer", word)); // call procedure
    } else if (allWords.contains(word)) {
      print(String.format("% is not a valid answer, but is a valid guess word", word)); // call procedure
    } else {
      print(String.format("% is not a recognised word", word)); // call procedure
    }
  }
}

static void playGame() { // procedure
  var grid = new List<List<String>>();
  initialiseGrid(grid); // call procedure
  var used = new Dictionary<String, String>();
  foreach (letter in "ABCDEFGHIJKLMNOPQRSTUVWXYZ") {
    used[letter] = " "; // change variable
  }
  displayHtml(drawGrid(grid) + drawKeyboard(used)); // call procedure
  final String target = allValidAnswers.split(" ")[randint(0, 2308)]; // constant
  var attemptNo = 0;
  var solved = false;
  while ((attemptNo < 6) && (!solved)) {
    enterAttempt(attemptNo, grid, used); // call procedure
    var solvedRef = new AsRef<bool>(solved);
    colourAttempt(attemptNo, grid, target, solvedRef, used); // call procedure
    solved = solvedRef.value(); // change variable
    attemptNo = attemptNo + 1; // change variable
  }
  clearPrintedText(); // call procedure
  if (solved) {
    print("Well done!"); // call procedure
  }
}

static void initialiseGrid(List<List<String>> grid) { // procedure
  foreach (i in range(0, 5)) {
    var sa = new List<String>();
    foreach (j in range(0, 6)) {
      sa.append(""); // call procedure
    }
    grid.append(sa); // call procedure
  }
}

static void enterAttempt(int attemptNo, List<List<String>> grid, Dictionary<String, String> used) { // procedure
  var chNo = 0;
  var word = "";
  while (chNo <= 5) {
    var k = waitForKey().upperCase();
    if ((k.equals("BACKSPACE")) && (chNo > 0)) {
      chNo = chNo - 1; // change variable
      grid[chNo][attemptNo] = ""; // change variable
      word = word; // change variable
      clearPrintedText(); // call procedure
    } else if ((chNo < 5) && isUCLetter(k)) {
      grid[chNo][attemptNo] = k; // change variable
      chNo = chNo + 1; // change variable
      word = word + k; // change variable
    } else if ((chNo == 5) && (k.equals("ENTER"))) {
      if (allWords.contains(word)) {
        chNo = chNo + 1; // change variable
      } else {
        print("Invalid word"); // call procedure
      }
    }
    displayHtml(drawGrid(grid) + drawKeyboard(used)); // call procedure
  }
}

static void colourAttempt(int attemptNo, List<List<String>> grid, String target, AsRef<bool> solved, Dictionary<String, String> used) { // procedure
  var attempt = getWord(attemptNo, grid);
  var marks = markAttempt(attempt, target);
  foreach (i in range(0, 5)) {
    var letter = grid[i][attemptNo];
    var mark = marks[i];
    grid[i][attemptNo] = letter + mark; // change variable
    if (mark.isAfter(used[letter])) {
      used[letter] = mark; // change variable
    }
  }
  if (marks.equals("22222")) {
    solved.set(true); // call procedure
  }
  displayHtml(drawGrid(grid) + drawKeyboard(used)); // call procedure
}

static void playReverseGame() { // procedure
  var grid = new List<List<String>>();
  initialiseGrid(grid); // call procedure
  var attemptNo = 0;
  var solved = false;
  var possible = allValidAnswers.split(" ");
  var attempt = "ARISE";
  while ((attemptNo < 6) && (!solved)) {
    foreach (i in range(0, 5)) {
      grid[i][attemptNo] = attempt[i]; // change variable
    }
    displayHtml(drawGrid(grid)); // call procedure
    var mark = "";
    var markRef = new AsRef<String>(mark);
    enterMark(attemptNo, grid, markRef); // call procedure
    mark = markRef.value(); // change variable
    if (mark.equals("22222")) {
      solved = true; // change variable
    } else {
      attemptNo = attemptNo + 1; // change variable
      possible = possibleAnswersAfterAttempt(possible, attempt, mark); // change variable
    }
    if (possible.length() == 0) {
      print("No possible answer matches marks so far. Press any key to continue"); // call procedure
      attemptNo = 6; // change variable
    } else {
      attempt = possible[divAsInt(possible.length(), 2)]; // change variable
    }
  }
}

static void enterMark(int attemptNo, List<List<String>> grid, AsRef<String> markRef) { // procedure
  var mark = markRef.value();
  var guess = getWord(attemptNo, grid);
  var chNo = 0;
  while (chNo <= 5) {
    var k = waitForKey().upperCase();
    if ((k.equals("BACKSPACE")) && (chNo > 0)) {
      chNo = chNo - 1; // change variable
      var entry = grid[chNo][attemptNo];
      grid[chNo][attemptNo] = entry[0]; // change variable
      mark = mark.subString(0, chNo); // change variable
    } else if ((chNo < 5) && "012".contains(k)) {
      var ch = grid[chNo][attemptNo];
      grid[chNo][attemptNo] = ch + k; // change variable
      chNo = chNo + 1; // change variable
      mark = mark + k; // change variable
    } else if ((chNo == 5) && (k.equals("ENTER"))) {
      chNo = chNo + 1; // change variable
    }
    displayHtml(drawGrid(grid)); // call procedure
  }
  markRef.set(mark); // call procedure
}

static void analyse() { // procedure
  var outcomes = new List<int>();
  outcomes.initialise(10, 0); // call procedure
  foreach (word in allValidAnswers.split(" ")) {
    var possible = allValidAnswers.split(" ");
    var mark = "";
    var attempt = "RAISE";
    var attempts = 0;
    while ((!mark.equals("22222"))) {
      attempts = attempts + 1; // change variable
      mark = markAttempt(attempt, word); // change variable
      possible = possibleAnswersAfterAttempt(possible, attempt, mark); // change variable
      attempt = possible[0]; // change variable
    }
    outcomes[attempts] = outcomes[attempts] + 1; // change variable
  }
  var success = 0;
  var weightedSum = 0;
  foreach (i in range(1, 7)) {
    success = success + outcomes[i]; // change variable
    weightedSum = weightedSum + (i*outcomes[i]); // change variable
  }
  clearPrintedText(); // call procedure
  final Int solved = (success/2309.0*100).floor(); // constant
  final Float avg = divAsFloat(weightedSum, success).round(2); // constant
  final String pc = "%"; // constant
  print(String.format("For all 2309 possible answers,\nthe current reverse-game algorithm \nsolved %% within 6 attempts,\nwith an average of % attempts.", solved, pc, avg)); // call procedure
}

static bool isUCLetter(String k) { // function
  final Int unicode = k.asUnicode(); // constant
  return (k.length() == 1) && (unicode > 64) && (unicode < 91);
}

@Test static void test_isUCLetter() {
  assertEquals(true, isUCLetter("A"))
  assertEquals(true, isUCLetter("Z"))
  assertEquals(false, isUCLetter("a"))
  assertEquals(false, isUCLetter("1"))
  assertEquals(false, isUCLetter(" "))
}

static String getWord(int attemptNo, List<List<String>> grid) { // function
  var guessWord = "";
  foreach (i in range(0, 5)) {
    guessWord = guessWord + grid[i][attemptNo]; // change variable
  }
  return guessWord;
}

static String setChar(String word, int n, String newChar) { // function
  return word.subString(0, n) + newChar + word.subString(n + 1, word.length());
}

@Test static void test_setChar() {
  assertEquals("_BCDE", setChar("ABCDE", 0, "_"))
  assertEquals("ABCD_", setChar("ABCDE", 4, "_"))
}

static String markAttempt(String attempt, String target) { // function
  var mark = "00000";
  var unused = target;
  foreach (n in range(0, 5)) {
    if (attempt[n].equals(unused[n])) {
      mark = setChar(mark, n, "2"); // change variable
      unused = setChar(unused, n, " "); // change variable
    }
  }
  foreach (n in range(0, 5)) {
    if ((!mark[n].equals("2")) && unused.contains(attempt[n])) {
      mark = setChar(mark, n, "1"); // change variable
      unused = setChar(unused, unused.indexOf(attempt[n]), " "); // change variable
    }
  }
  return mark;
}

@Test static void test_markAttempt() {
  assertEquals("00000", markAttempt("ABCDE", "XXXXX"))
  assertEquals("11111", markAttempt("ABCDE", "BCDEA"))
  assertEquals("22222", markAttempt("ABCDE", "ABCDE"))
  assertEquals("02000", markAttempt("SAINT", "LADLE"))
  assertEquals("01111", markAttempt("IDEAL", "LADLE"))
  assertEquals("10020", markAttempt("CABAL", "RECAP"))
  assertEquals("01100", markAttempt("COLON", "GLORY"))
  assertEquals("10120", markAttempt("AORTA", "RATTY"))
  assertEquals("11020", markAttempt("RATTY", "AORTA"))
  assertEquals("02012", markAttempt("FAIRY", "RATTY"))
}

static List<String> possibleAnswersAfterAttempt(List<String> possible, String attempt, String mark) { // function
  var newPossible = new List<String>();
  foreach (word in possible) {
    final String markForWord = markAttempt(attempt, word); // constant
    if (markForWord.equals(mark)) {
      newPossible = newPossible.withAppend(word); // change variable
    }
  }
  return newPossible;
}

@Test static void test_possibleAnswersAfterAttempt() {
  var prior = ["ABCDE", "BCDEA", "CDEAB", "DEABC", "EABCD"];
  assertEquals(["ABCDE"], possibleAnswersAfterAttempt(prior, "AAAAA", "20000"))
  assertEquals(["BCDEA", "CDEAB", "DEABC", "EABCD"], possibleAnswersAfterAttempt(prior, "AXXXX", "10000"))
  assertEquals(["BCDEA", "CDEAB", "EABCD"], possibleAnswersAfterAttempt(prior, "AXXBX", "10010"))
  assertEquals(["RATTY"], possibleAnswersAfterAttempt(["RATTY"], "AORTA", "10120"))
  assertEquals(["RASPY", "RATTY"], possibleAnswersAfterAttempt(["FAIRY", "HAIRY", "RAINY", "RASPY", "RATTY"], "FAIRY", "02012"))
}

static String drawGrid(List<List<String>> grid) { // function
  var html = String.format("<style>%</style> <grid>", style);
  foreach (row in range(0, 6)) {
    html = html + "<word>"; // change variable
    foreach (col in range(0, 5)) {
      final String entry = grid[col][row]; // constant
      final String ch = if(entry.length() > 0, entry[0], ""); // constant
      final String mark = if(entry.length() > 1, entry.subString(1, entry.length()), ""); // constant
      html = html + String.format("<ch class='_%'>%</ch>", mark, ch); // change variable
    }
    html = html + "</word>"; // change variable
  }
  return html + "</grid>";
}

static String drawKeyboard(Dictionary<String, String> used) { // function
  var html = "<keyboard><div>";
  foreach (k in "QWERTYUIOP-ASDFGHJKL-ZXCVBNM") {
    if (k.equals("-")) {
      html = html + "</div><div>"; // change variable
    } else {
      html = html + String.format("<key class='_%'>%</key>", used[k], k); // change variable
    }
  }
  return html + "<key></key></div></keyboard>";
}

final String style = "grid { display: flex; flex-direction: column; margin-top: 40px; width: 500px;}word { display: flex; flex-direction: row; margin: auto;}ch, key { font-family: Segoe UI, Tahoma, Geneva, Verdana, sans-serif; font-weight: bold; background-color: white;}ch { text-align: center; font-size: 18pt; border: solid, 1.5px, black; margin: 2px; width: 37.5px; height: 37.5px; line-height: 33px;}ch:empty, key:empty { border-color: lightgrey;}key._ { background-color: lightgrey;}ch._2, key._2 { background-color: #6aaa64; border-color: #6aaa64; color: white;}ch._1, key._1 { background-color: #c9b458; border-color: #c9b458; color: white;}ch._0, key._0 { background-color: #787c7e; border-color: #787c7e; color: white;}keyboard { width: 500px; display: flex; flex-direction: column; margin-top:5px;}keyboard div { display: flex; flex-direction: row; margin:auto;}key { display: block; float: left; font-size: 10pt; width: 23px; margin: 2px; padding-bottom: 6px; padding-top:5px; text-align: center; border-radius: 5px;}" // constant
