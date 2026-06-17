// Java with Elan 2.0.0-alpha4

static final String allWords = "AAHED ZYMIC" // constant

static final String allValidAnswers = "ABACK ZONAL" // constant

static void main() {
  while (true) {
    static final Int choice = inputIntBetween("1 to solve puzzle reassign by computer\n2 to reassign a puzzle for computer to solve\n3 to test test_effectiveness of computer's algorithm\n4 to look up word", 1, 4); // constant
    clearAllDisplays(); // call procedure
    executeOption(choice); // call procedure
    pressAnyKeyToContinue(); // call procedure
    clearAllDisplays(); // call procedure
  }
}

static void executeOption(int choice) { // procedure
  if (choice == 1) {
    print("Reduce screen magnification if you can't see all the keys");
    playGame(); // call procedure
  } else if (choice == 2) {
    print("Mark using: 0 (grey), 1 (yellow), 2 (green), Enter");
    playReverseGame(); // call procedure
  } else if (choice == 3) {
    print("Please wait for analysis to complete ...");
    analyse(); // call procedure
  } else {
    static final String word = inputStringWithLimits("Enter word: ", 5, 5).upperCase(); // constant
    if (allValidAnswers.contains(word)) {
      print(String.format("% is a valid answer", word));
    } else if (allWords.contains(word)) {
      print(String.format("% is not a valid answer, but is a valid guess word", word));
    } else {
      print(String.format("% is not a recognised word", word));
    }
  }
}

static void playGame() { // procedure
  var grid = new List<List<String>>();
  initialiseGrid(grid); // call procedure
  var used = new Dictionary<String, String>();
  foreach (var letter in "ABCDEFGHIJKLMNOPQRSTUVWXYZ") {
    used[letter] = " "; // reassign variable
  }
  displayHtml(drawGrid(grid) + drawKeyboard(used)); // call procedure
  static final String target = allValidAnswers.split(" ")[randint(0, 2308)]; // constant
  var attemptNo = 0;
  var solved = false;
  while ((attemptNo < 6) && (!solved)) {
    enterAttempt(attemptNo, grid, used); // call procedure
    var solvedRef = new AsRef<boolean>(solved);
    colourAttempt(attemptNo, grid, target, solvedRef, used); // call procedure
    solved = solvedRef.value(); // reassign variable
    attemptNo = attemptNo + 1; // reassign variable
  }
  clearPrintedText(); // call procedure
  if (solved) {
    print("Well done!");
  }
}

static void initialiseGrid(List<List<String>> grid) { // procedure
  foreach (var i in range(0, 5)) {
    var sa = new List<String>();
    foreach (var j in range(0, 6)) {
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
      chNo = chNo - 1; // reassign variable
      grid[chNo][attemptNo] = ""; // reassign variable
      word = word; // reassign variable
      clearPrintedText(); // call procedure
    } else if ((chNo < 5) && isUCLetter(k)) {
      grid[chNo][attemptNo] = k; // reassign variable
      chNo = chNo + 1; // reassign variable
      word = word + k; // reassign variable
    } else if ((chNo == 5) && (k.equals("ENTER"))) {
      if (allWords.contains(word)) {
        chNo = chNo + 1; // reassign variable
      } else {
        print("Invalid word");
      }
    }
    displayHtml(drawGrid(grid) + drawKeyboard(used)); // call procedure
  }
}

static void colourAttempt(int attemptNo, List<List<String>> grid, String target, AsRef<boolean> solved, Dictionary<String, String> used) { // procedure
  var attempt = getWord(attemptNo, grid);
  var marks = markAttempt(attempt, target);
  foreach (var i in range(0, 5)) {
    var letter = grid[i][attemptNo];
    var mark = marks[i];
    grid[i][attemptNo] = letter + mark; // reassign variable
    if (mark.isAfter(used[letter])) {
      used[letter] = mark; // reassign variable
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
    foreach (var i in range(0, 5)) {
      grid[i][attemptNo] = attempt[i]; // reassign variable
    }
    displayHtml(drawGrid(grid)); // call procedure
    var mark = "";
    var markRef = new AsRef<String>(mark);
    enterMark(attemptNo, grid, markRef); // call procedure
    mark = markRef.value(); // reassign variable
    if (mark.equals("22222")) {
      solved = true; // reassign variable
    } else {
      attemptNo = attemptNo + 1; // reassign variable
      possible = possibleAnswersAfterAttempt(possible, attempt, mark); // reassign variable
    }
    if (possible.length() == 0) {
      print("No possible answer matches marks so far. Press any key to continue");
      attemptNo = 6; // reassign variable
    } else {
      attempt = possible[divAsInt(possible.length(), 2)]; // reassign variable
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
      chNo = chNo - 1; // reassign variable
      var entry = grid[chNo][attemptNo];
      grid[chNo][attemptNo] = entry[0]; // reassign variable
      mark = mark.subString(0, chNo); // reassign variable
    } else if ((chNo < 5) && "012".contains(k)) {
      var ch = grid[chNo][attemptNo];
      grid[chNo][attemptNo] = ch + k; // reassign variable
      chNo = chNo + 1; // reassign variable
      mark = mark + k; // reassign variable
    } else if ((chNo == 5) && (k.equals("ENTER"))) {
      chNo = chNo + 1; // reassign variable
    }
    displayHtml(drawGrid(grid)); // call procedure
  }
  markRef.set(mark); // call procedure
}

static void analyse() { // procedure
  var outcomes = new List<int>();
  outcomes.initialise(10, 0); // call procedure
  foreach (var word in allValidAnswers.split(" ")) {
    var possible = allValidAnswers.split(" ");
    var mark = "";
    var attempt = "RAISE";
    var attempts = 0;
    while ((!mark.equals("22222"))) {
      attempts = attempts + 1; // reassign variable
      mark = markAttempt(attempt, word); // reassign variable
      possible = possibleAnswersAfterAttempt(possible, attempt, mark); // reassign variable
      attempt = possible[0]; // reassign variable
    }
    outcomes[attempts] = outcomes[attempts] + 1; // reassign variable
  }
  var success = 0;
  var weightedSum = 0;
  foreach (var i in range(1, 7)) {
    success = success + outcomes[i]; // reassign variable
    weightedSum = weightedSum + (i*outcomes[i]); // reassign variable
  }
  clearPrintedText(); // call procedure
  static final Int solved = (success/2309.0*100).floor(); // constant
  static final Float avg = divAsFloat(weightedSum, success).round(2); // constant
  static final String pc = "%"; // constant
  print(String.format("For all 2309 possible answers,\nthe current reverse-game algorithm \nsolved %% within 6 attempts,\nwith an average of % attempts.", solved, pc, avg));
}

static boolean isUCLetter(String k) { // function
  static final Int unicode = k.asUnicode(); // constant
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
  foreach (var i in range(0, 5)) {
    guessWord = guessWord + grid[i][attemptNo]; // reassign variable
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
  foreach (var n in range(0, 5)) {
    if (attempt[n].equals(unused[n])) {
      mark = setChar(mark, n, "2"); // reassign variable
      unused = setChar(unused, n, " "); // reassign variable
    }
  }
  foreach (var n in range(0, 5)) {
    if ((!mark[n].equals("2")) && unused.contains(attempt[n])) {
      mark = setChar(mark, n, "1"); // reassign variable
      unused = setChar(unused, unused.indexOf(attempt[n]), " "); // reassign variable
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
  foreach (var word in possible) {
    static final String markForWord = markAttempt(attempt, word); // constant
    if (markForWord.equals(mark)) {
      newPossible = newPossible.withAppend(word); // reassign variable
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
  foreach (var row in range(0, 6)) {
    html = html + "<word>"; // reassign variable
    foreach (var col in range(0, 5)) {
      static final String entry = grid[col][row]; // constant
      static final String ch = if_(entry.length() > 0, entry[0], ""); // constant
      static final String mark = if_(entry.length() > 1, entry.subString(1, entry.length()), ""); // constant
      html = html + String.format("<ch class='_%'>%</ch>", mark, ch); // reassign variable
    }
    html = html + "</word>"; // reassign variable
  }
  return html + "</grid>";
}

static String drawKeyboard(Dictionary<String, String> used) { // function
  var html = "<keyboard><div>";
  foreach (var k in "QWERTYUIOP-ASDFGHJKL-ZXCVBNM") {
    if (k.equals("-")) {
      html = html + "</div><div>"; // reassign variable
    } else {
      html = html + String.format("<key class='_%'>%</key>", used[k], k); // reassign variable
    }
  }
  return html + "<key></key></div></keyboard>";
}

static final String style = "grid { display: flex; flex-direction: column; margin-top: 40px; width: 500px;}word { display: flex; flex-direction: row; margin: auto;}ch, key { font-family: Segoe UI, Tahoma, Geneva, Verdana, sans-serif; font-weight: bold; background-color: white;}ch { text-align: center; font-size: 18pt; border: solid, 1.5px, black; margin: 2px; width: 37.5px; height: 37.5px; line-height: 33px;}ch:empty, key:empty { border-color: lightgrey;}key._ { background-color: lightgrey;}ch._2, key._2 { background-color: #6aaa64; border-color: #6aaa64; color: white;}ch._1, key._1 { background-color: #c9b458; border-color: #c9b458; color: white;}ch._0, key._0 { background-color: #787c7e; border-color: #787c7e; color: white;}keyboard { width: 500px; display: flex; flex-direction: column; margin-top:5px;}keyboard div { display: flex; flex-direction: row; margin:auto;}key { display: block; float: left; font-size: 10pt; width: 23px; margin: 2px; padding-bottom: 6px; padding-top:5px; text-align: center; border-radius: 5px;}" // constant
