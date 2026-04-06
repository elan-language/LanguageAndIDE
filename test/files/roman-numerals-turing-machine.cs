// C# with Elan 2.0.0-alpha1

// Turing Machine that converts a Year from decimal to roman numerals

// Run the program, enter the number to convert and watch the machine in action.

// This TM has 300+ transition rules! You can use the same TuringMachine class to solve

// a simpler task, just by writing rules in the same format:

// new Rule("currentState", "readSymbol", "newState", "writeSymbol", DirectionForHeadMove)

static void main() {
  var tm = new TuringMachine(initState, haltState);
  addRulesForRomanNumeralsInto(tm); // call procedure
  const Int dec = inputIntBetween("Enter a year:", 1, 3999);
  tm.setTape(dec.toString()); // call procedure
  var steps = 0;
  while (!tm.isHalted()) {
    var rule = tm.findMatchingRule();
    tm.singleStep(); // call procedure
    steps = steps + 1; // change variable
    clearPrintedText(); // call procedure
    print(tm.tape); // call procedure
    printTab(tm.headPosition - 1, "^"); // call procedure
    print($"Step: {steps}"); // call procedure
    print($"State: {tm.currentState}"); // call procedure
    print($"Rule applied: {rule.toString()}"); // call procedure
    sleep_ms(40); // call procedure
  }
  print($"The roman numeral equivalent for {dec} is {tm.tape.trim()}"); // call procedure
}

const String initState = "init"

const String haltState = "halt"

class TuringMachine {

  public TuringMachine(string initialState, string haltState) {
    this.tape = ""; // change variable
    this.initialState = initialState; // change variable
    this.haltState = haltState; // change variable
    this.rules = new List<Rule>(); // change variable
    this.currentState = initialState; // change variable
    this.headPosition = 0; // change variable
  }
  public string toString() { // function
    return "";
  }
  public string initialState {get; private set;} // property
  public string currentState {get; private set;} // property
  public int headPosition {get; private set;} // property
  public string haltState {get; private set;} // property
  public List<Rule> rules {get; private set;} // property
  public string tape {get; private set;} // property
  public void setTape(string tape) { // procedure
    this.tape = tape; // change variable
  }
  public void append(Rule rule) { // procedure
    this.rules = this.rules.withAppend(rule); // change variable
  }
  public void singleStep() { // procedure
    var rule = this.findMatchingRule();
    this.execute(rule); // call procedure
  }
  public bool isHalted() { // function
    return this.currentState.equals(this.haltState);
  }
  public Rule findMatchingRule() { // function
    var matches = this.rules.filter(lambda Rule r => (r.currentState.equals(this.currentState)) && (r.currentSymbol.equals(this.tape[this.headPosition])));
    if (matches.length() == 0) {
      throw new ElanRuntimeError($"No rule matching state {this.currentState} and symbol {this.tape[this.headPosition]}")
    }
    return matches.head();
  }
  public void write(string newSymbol) { // procedure
    const Int hp = this.headPosition;
    this.tape = this.tape.subString(0, hp) + newSymbol + this.tape.subString(hp + 1, this.tape.length()); // change variable
  }
  public void execute(Rule rule) { // procedure
    this.currentState = rule.nextState; // change variable
    this.write(rule.writeSymbol); // call procedure
    if (rule.move == Dir.right) {
      this.headPosition = this.headPosition + 1; // change variable
      if (this.headPosition >= this.tape.length()) {
        this.tape = this.tape + " "; // change variable
      }
    } else {
      this.headPosition = this.headPosition - 1; // change variable
      if (this.headPosition < 0) {
        this.tape = " " + this.tape; // change variable
        this.headPosition = 0; // change variable
      }
    }
  }
}

class Rule {

  public string currentState {get; private set;} // property
  public string currentSymbol {get; private set;} // property
  public string nextState {get; private set;} // property
  public string writeSymbol {get; private set;} // property
  public Dir move {get; private set;} // property
  public Rule(string currentState, string currentSymbol, string nextState, string writeSymbol, Dir move) {
    this.currentState = currentState; // change variable
    this.currentSymbol = currentSymbol; // change variable
    this.nextState = nextState; // change variable
    this.writeSymbol = writeSymbol; // change variable
    this.move = move; // change variable
  }
  public string toString() { // function
    return $"{this.currentState},{this.currentSymbol},{this.nextState},{this.writeSymbol},{this.move}";
  }
}

enum Dir left, right

// rename this method and define new transition rules to solve a different problem

static void addRulesForRomanNumeralsInto(TuringMachine tm) { // procedure
  // name: Denary to Roman "Numerals", initial state = "init", accept state = "halt"
  // Example tape input:  2024 (between 1 and 3999)
  tm.append(new Rule("init", "0", "init", "0", Dir.right)); // call procedure
  tm.append(new Rule("init", "1", "init", "1", Dir.right)); // call procedure
  tm.append(new Rule("init", "2", "init", "2", Dir.right)); // call procedure
  tm.append(new Rule("init", "3", "init", "3", Dir.right)); // call procedure
  tm.append(new Rule("init", "4", "init", "4", Dir.right)); // call procedure
  tm.append(new Rule("init", "5", "init", "5", Dir.right)); // call procedure
  tm.append(new Rule("init", "6", "init", "6", Dir.right)); // call procedure
  tm.append(new Rule("init", "7", "init", "7", Dir.right)); // call procedure
  tm.append(new Rule("init", "8", "init", "8", Dir.right)); // call procedure
  tm.append(new Rule("init", "9", "init", "9", Dir.right)); // call procedure
  tm.append(new Rule("init", " ", "return", "]", Dir.left)); // call procedure
  // read next digit
  tm.append(new Rule("readNextDigit", "0", "write0", "[", Dir.right)); // call procedure
  tm.append(new Rule("readNextDigit", "1", "write1", "[", Dir.right)); // call procedure
  tm.append(new Rule("readNextDigit", "2", "write2", "[", Dir.right)); // call procedure
  tm.append(new Rule("readNextDigit", "3", "write3", "[", Dir.right)); // call procedure
  tm.append(new Rule("readNextDigit", "4", "write4", "[", Dir.right)); // call procedure
  tm.append(new Rule("readNextDigit", "5", "write5", "[", Dir.right)); // call procedure
  tm.append(new Rule("readNextDigit", "6", "write6", "[", Dir.right)); // call procedure
  tm.append(new Rule("readNextDigit", "7", "write7", "[", Dir.right)); // call procedure
  tm.append(new Rule("readNextDigit", "8", "write8", "[", Dir.right)); // call procedure
  tm.append(new Rule("readNextDigit", "9", "write9", "[", Dir.right)); // call procedure
  tm.append(new Rule("readNextDigit", "]", "gotoEnd", " ", Dir.right)); // call procedure
  // write0
  tm.append(new Rule("write0", "0", "write0", "0", Dir.right)); // call procedure
  tm.append(new Rule("write0", "1", "write0", "1", Dir.right)); // call procedure
  tm.append(new Rule("write0", "2", "write0", "2", Dir.right)); // call procedure
  tm.append(new Rule("write0", "3", "write0", "3", Dir.right)); // call procedure
  tm.append(new Rule("write0", "4", "write0", "4", Dir.right)); // call procedure
  tm.append(new Rule("write0", "5", "write0", "5", Dir.right)); // call procedure
  tm.append(new Rule("write0", "6", "write0", "6", Dir.right)); // call procedure
  tm.append(new Rule("write0", "7", "write0", "7", Dir.right)); // call procedure
  tm.append(new Rule("write0", "8", "write0", "8", Dir.right)); // call procedure
  tm.append(new Rule("write0", "9", "write0", "9", Dir.right)); // call procedure
  tm.append(new Rule("write0", "]", "write0", "]", Dir.right)); // call procedure
  tm.append(new Rule("write0", "I", "write0", "I", Dir.right)); // call procedure
  tm.append(new Rule("write0", "V", "write0", "V", Dir.right)); // call procedure
  tm.append(new Rule("write0", "X", "write0", "X", Dir.right)); // call procedure
  tm.append(new Rule("write0", "|", "write0", "|", Dir.right)); // call procedure
  tm.append(new Rule("write0", " ", "return", "|", Dir.left)); // call procedure
  // write1
  tm.append(new Rule("write1", "0", "write1", "0", Dir.right)); // call procedure
  tm.append(new Rule("write1", "1", "write1", "1", Dir.right)); // call procedure
  tm.append(new Rule("write1", "2", "write1", "2", Dir.right)); // call procedure
  tm.append(new Rule("write1", "3", "write1", "3", Dir.right)); // call procedure
  tm.append(new Rule("write1", "4", "write1", "4", Dir.right)); // call procedure
  tm.append(new Rule("write1", "5", "write1", "5", Dir.right)); // call procedure
  tm.append(new Rule("write1", "6", "write1", "6", Dir.right)); // call procedure
  tm.append(new Rule("write1", "7", "write1", "7", Dir.right)); // call procedure
  tm.append(new Rule("write1", "8", "write1", "8", Dir.right)); // call procedure
  tm.append(new Rule("write1", "9", "write1", "9", Dir.right)); // call procedure
  tm.append(new Rule("write1", "]", "write1", "]", Dir.right)); // call procedure
  tm.append(new Rule("write1", "I", "write1", "I", Dir.right)); // call procedure
  tm.append(new Rule("write1", "V", "write1", "V", Dir.right)); // call procedure
  tm.append(new Rule("write1", "X", "write1", "X", Dir.right)); // call procedure
  tm.append(new Rule("write1", "|", "write1", "|", Dir.right)); // call procedure
  tm.append(new Rule("write1", " ", "write0", "I", Dir.right)); // call procedure
  // write2  
  tm.append(new Rule("write2", "0", "write2", "0", Dir.right)); // call procedure
  tm.append(new Rule("write2", "1", "write2", "1", Dir.right)); // call procedure
  tm.append(new Rule("write2", "2", "write2", "2", Dir.right)); // call procedure
  tm.append(new Rule("write2", "3", "write2", "3", Dir.right)); // call procedure
  tm.append(new Rule("write2", "4", "write2", "4", Dir.right)); // call procedure
  tm.append(new Rule("write2", "5", "write2", "5", Dir.right)); // call procedure
  tm.append(new Rule("write2", "6", "write2", "6", Dir.right)); // call procedure
  tm.append(new Rule("write2", "7", "write2", "7", Dir.right)); // call procedure
  tm.append(new Rule("write2", "8", "write2", "8", Dir.right)); // call procedure
  tm.append(new Rule("write2", "9", "write2", "9", Dir.right)); // call procedure
  tm.append(new Rule("write2", "]", "write2", "]", Dir.right)); // call procedure
  tm.append(new Rule("write2", "I", "write2", "I", Dir.right)); // call procedure
  tm.append(new Rule("write2", "V", "write2", "V", Dir.right)); // call procedure
  tm.append(new Rule("write2", "X", "write2", "X", Dir.right)); // call procedure
  tm.append(new Rule("write2", "|", "write2", "|", Dir.right)); // call procedure
  tm.append(new Rule("write2", " ", "write1", "I", Dir.right)); // call procedure
  // write3  
  tm.append(new Rule("write3", "0", "write3", "0", Dir.right)); // call procedure
  tm.append(new Rule("write3", "1", "write3", "1", Dir.right)); // call procedure
  tm.append(new Rule("write3", "2", "write3", "2", Dir.right)); // call procedure
  tm.append(new Rule("write3", "3", "write3", "3", Dir.right)); // call procedure
  tm.append(new Rule("write3", "4", "write3", "4", Dir.right)); // call procedure
  tm.append(new Rule("write3", "5", "write3", "5", Dir.right)); // call procedure
  tm.append(new Rule("write3", "6", "write3", "6", Dir.right)); // call procedure
  tm.append(new Rule("write3", "7", "write3", "7", Dir.right)); // call procedure
  tm.append(new Rule("write3", "8", "write3", "8", Dir.right)); // call procedure
  tm.append(new Rule("write3", "9", "write3", "9", Dir.right)); // call procedure
  tm.append(new Rule("write3", "]", "write3", "]", Dir.right)); // call procedure
  tm.append(new Rule("write3", "I", "write3", "I", Dir.right)); // call procedure
  tm.append(new Rule("write3", "V", "write3", "V", Dir.right)); // call procedure
  tm.append(new Rule("write3", "X", "write3", "X", Dir.right)); // call procedure
  tm.append(new Rule("write3", "|", "write3", "|", Dir.right)); // call procedure
  tm.append(new Rule("write3", " ", "write2", "I", Dir.right)); // call procedure
  // write4  
  tm.append(new Rule("write4", "0", "write4", "0", Dir.right)); // call procedure
  tm.append(new Rule("write4", "1", "write4", "1", Dir.right)); // call procedure
  tm.append(new Rule("write4", "2", "write4", "2", Dir.right)); // call procedure
  tm.append(new Rule("write4", "3", "write4", "3", Dir.right)); // call procedure
  tm.append(new Rule("write4", "4", "write4", "4", Dir.right)); // call procedure
  tm.append(new Rule("write4", "5", "write4", "5", Dir.right)); // call procedure
  tm.append(new Rule("write4", "6", "write4", "6", Dir.right)); // call procedure
  tm.append(new Rule("write4", "7", "write4", "7", Dir.right)); // call procedure
  tm.append(new Rule("write4", "8", "write4", "8", Dir.right)); // call procedure
  tm.append(new Rule("write4", "9", "write4", "9", Dir.right)); // call procedure
  tm.append(new Rule("write4", "]", "write4", "]", Dir.right)); // call procedure
  tm.append(new Rule("write4", "I", "write4", "I", Dir.right)); // call procedure
  tm.append(new Rule("write4", "V", "write4", "V", Dir.right)); // call procedure
  tm.append(new Rule("write4", "X", "write4", "X", Dir.right)); // call procedure
  tm.append(new Rule("write4", "|", "write4", "|", Dir.right)); // call procedure
  tm.append(new Rule("write4", " ", "write5", "I", Dir.right)); // call procedure
  // write5
  tm.append(new Rule("write5", "0", "write5", "0", Dir.right)); // call procedure
  tm.append(new Rule("write5", "1", "write5", "1", Dir.right)); // call procedure
  tm.append(new Rule("write5", "2", "write5", "2", Dir.right)); // call procedure
  tm.append(new Rule("write5", "3", "write5", "3", Dir.right)); // call procedure
  tm.append(new Rule("write5", "4", "write5", "4", Dir.right)); // call procedure
  tm.append(new Rule("write5", "5", "write5", "5", Dir.right)); // call procedure
  tm.append(new Rule("write5", "6", "write5", "6", Dir.right)); // call procedure
  tm.append(new Rule("write5", "7", "write5", "7", Dir.right)); // call procedure
  tm.append(new Rule("write5", "8", "write5", "8", Dir.right)); // call procedure
  tm.append(new Rule("write5", "9", "write5", "9", Dir.right)); // call procedure
  tm.append(new Rule("write5", "]", "write5", "]", Dir.right)); // call procedure
  tm.append(new Rule("write5", "I", "write5", "I", Dir.right)); // call procedure
  tm.append(new Rule("write5", "V", "write5", "V", Dir.right)); // call procedure
  tm.append(new Rule("write5", "X", "write5", "X", Dir.right)); // call procedure
  tm.append(new Rule("write5", "|", "write5", "|", Dir.right)); // call procedure
  tm.append(new Rule("write5", " ", "write0", "V", Dir.right)); // call procedure
  // write6
  tm.append(new Rule("write6", "0", "write6", "0", Dir.right)); // call procedure
  tm.append(new Rule("write6", "1", "write6", "1", Dir.right)); // call procedure
  tm.append(new Rule("write6", "2", "write6", "2", Dir.right)); // call procedure
  tm.append(new Rule("write6", "3", "write6", "3", Dir.right)); // call procedure
  tm.append(new Rule("write6", "4", "write6", "4", Dir.right)); // call procedure
  tm.append(new Rule("write6", "5", "write6", "5", Dir.right)); // call procedure
  tm.append(new Rule("write6", "6", "write6", "6", Dir.right)); // call procedure
  tm.append(new Rule("write6", "7", "write6", "7", Dir.right)); // call procedure
  tm.append(new Rule("write6", "8", "write6", "8", Dir.right)); // call procedure
  tm.append(new Rule("write6", "9", "write6", "9", Dir.right)); // call procedure
  tm.append(new Rule("write6", "]", "write6", "]", Dir.right)); // call procedure
  tm.append(new Rule("write6", "I", "write6", "I", Dir.right)); // call procedure
  tm.append(new Rule("write6", "V", "write6", "V", Dir.right)); // call procedure
  tm.append(new Rule("write6", "X", "write6", "X", Dir.right)); // call procedure
  tm.append(new Rule("write6", "|", "write6", "|", Dir.right)); // call procedure
  tm.append(new Rule("write6", " ", "write1", "V", Dir.right)); // call procedure
  // write7
  tm.append(new Rule("write7", "0", "write7", "0", Dir.right)); // call procedure
  tm.append(new Rule("write7", "1", "write7", "1", Dir.right)); // call procedure
  tm.append(new Rule("write7", "2", "write7", "2", Dir.right)); // call procedure
  tm.append(new Rule("write7", "3", "write7", "3", Dir.right)); // call procedure
  tm.append(new Rule("write7", "4", "write7", "4", Dir.right)); // call procedure
  tm.append(new Rule("write7", "5", "write7", "5", Dir.right)); // call procedure
  tm.append(new Rule("write7", "6", "write7", "6", Dir.right)); // call procedure
  tm.append(new Rule("write7", "7", "write7", "7", Dir.right)); // call procedure
  tm.append(new Rule("write7", "8", "write7", "8", Dir.right)); // call procedure
  tm.append(new Rule("write7", "9", "write7", "9", Dir.right)); // call procedure
  tm.append(new Rule("write7", "]", "write7", "]", Dir.right)); // call procedure
  tm.append(new Rule("write7", "I", "write7", "I", Dir.right)); // call procedure
  tm.append(new Rule("write7", "V", "write7", "V", Dir.right)); // call procedure
  tm.append(new Rule("write7", "X", "write7", "X", Dir.right)); // call procedure
  tm.append(new Rule("write7", "|", "write7", "|", Dir.right)); // call procedure
  tm.append(new Rule("write7", " ", "write2", "V", Dir.right)); // call procedure
  // write8
  tm.append(new Rule("write8", "0", "write8", "0", Dir.right)); // call procedure
  tm.append(new Rule("write8", "1", "write8", "1", Dir.right)); // call procedure
  tm.append(new Rule("write8", "2", "write8", "2", Dir.right)); // call procedure
  tm.append(new Rule("write8", "3", "write8", "3", Dir.right)); // call procedure
  tm.append(new Rule("write8", "4", "write8", "4", Dir.right)); // call procedure
  tm.append(new Rule("write8", "5", "write8", "5", Dir.right)); // call procedure
  tm.append(new Rule("write8", "6", "write8", "6", Dir.right)); // call procedure
  tm.append(new Rule("write8", "7", "write8", "7", Dir.right)); // call procedure
  tm.append(new Rule("write8", "8", "write8", "8", Dir.right)); // call procedure
  tm.append(new Rule("write8", "9", "write8", "9", Dir.right)); // call procedure
  tm.append(new Rule("write8", "]", "write8", "]", Dir.right)); // call procedure
  tm.append(new Rule("write8", "I", "write8", "I", Dir.right)); // call procedure
  tm.append(new Rule("write8", "V", "write8", "V", Dir.right)); // call procedure
  tm.append(new Rule("write8", "X", "write8", "X", Dir.right)); // call procedure
  tm.append(new Rule("write8", "|", "write8", "|", Dir.right)); // call procedure
  tm.append(new Rule("write8", " ", "write3", "V", Dir.right)); // call procedure
  // write9
  tm.append(new Rule("write9", "0", "write9", "0", Dir.right)); // call procedure
  tm.append(new Rule("write9", "1", "write9", "1", Dir.right)); // call procedure
  tm.append(new Rule("write9", "2", "write9", "2", Dir.right)); // call procedure
  tm.append(new Rule("write9", "3", "write9", "3", Dir.right)); // call procedure
  tm.append(new Rule("write9", "4", "write9", "4", Dir.right)); // call procedure
  tm.append(new Rule("write9", "5", "write9", "5", Dir.right)); // call procedure
  tm.append(new Rule("write9", "6", "write9", "6", Dir.right)); // call procedure
  tm.append(new Rule("write9", "7", "write9", "7", Dir.right)); // call procedure
  tm.append(new Rule("write9", "8", "write9", "8", Dir.right)); // call procedure
  tm.append(new Rule("write9", "9", "write9", "9", Dir.right)); // call procedure
  tm.append(new Rule("write9", "]", "write9", "]", Dir.right)); // call procedure
  tm.append(new Rule("write9", "I", "write9", "I", Dir.right)); // call procedure
  tm.append(new Rule("write9", "V", "write9", "V", Dir.right)); // call procedure
  tm.append(new Rule("write9", "X", "write9", "X", Dir.right)); // call procedure
  tm.append(new Rule("write9", "|", "write9", "|", Dir.right)); // call procedure
  tm.append(new Rule("write9", " ", "write10", "I", Dir.right)); // call procedure
  // Write10
  tm.append(new Rule("write10", " ", "write0", "X", Dir.right)); // call procedure
  // return  
  tm.append(new Rule("return", "0", "return", "0", Dir.left)); // call procedure
  tm.append(new Rule("return", "1", "return", "1", Dir.left)); // call procedure
  tm.append(new Rule("return", "2", "return", "2", Dir.left)); // call procedure
  tm.append(new Rule("return", "3", "return", "3", Dir.left)); // call procedure
  tm.append(new Rule("return", "4", "return", "4", Dir.left)); // call procedure
  tm.append(new Rule("return", "5", "return", "5", Dir.left)); // call procedure
  tm.append(new Rule("return", "6", "return", "6", Dir.left)); // call procedure
  tm.append(new Rule("return", "7", "return", "7", Dir.left)); // call procedure
  tm.append(new Rule("return", "8", "return", "8", Dir.left)); // call procedure
  tm.append(new Rule("return", "9", "return", "9", Dir.left)); // call procedure
  tm.append(new Rule("return", "I", "return", "I", Dir.left)); // call procedure
  tm.append(new Rule("return", "V", "return", "V", Dir.left)); // call procedure
  tm.append(new Rule("return", "X", "return", "X", Dir.left)); // call procedure
  tm.append(new Rule("return", "|", "return", "|", Dir.left)); // call procedure
  tm.append(new Rule("return", "]", "return", "]", Dir.left)); // call procedure
  tm.append(new Rule("return", "[", "readNextDigit", " ", Dir.right)); // call procedure
  tm.append(new Rule("return", " ", "readNextDigit", " ", Dir.right)); // call procedure
  // gotoEnd -  only after deleting input.
  tm.append(new Rule("gotoEnd", "|", "gotoEnd", "|", Dir.right)); // call procedure
  tm.append(new Rule("gotoEnd", "I", "gotoEnd", "I", Dir.right)); // call procedure
  tm.append(new Rule("gotoEnd", "V", "gotoEnd", "V", Dir.right)); // call procedure
  tm.append(new Rule("gotoEnd", "X", "gotoEnd", "X", Dir.right)); // call procedure
  tm.append(new Rule("gotoEnd", " ", "deleteLastBar", " ", Dir.left)); // call procedure
  tm.append(new Rule("deleteLastBar", "|", "symbols1", " ", Dir.left)); // call procedure
  // symbols1
  tm.append(new Rule("symbols1", "I", "symbols1", "I", Dir.left)); // call procedure
  tm.append(new Rule("symbols1", "V", "symbols1", "V", Dir.left)); // call procedure
  tm.append(new Rule("symbols1", "X", "symbols1", "X", Dir.left)); // call procedure
  tm.append(new Rule("symbols1", "|", "symbols10", "|", Dir.left)); // call procedure
  tm.append(new Rule("symbols1", " ", "removeBars", " ", Dir.right)); // call procedure
  tm.append(new Rule("symbols10", "I", "symbols10", "X", Dir.left)); // call procedure
  tm.append(new Rule("symbols10", "V", "symbols10", "L", Dir.left)); // call procedure
  tm.append(new Rule("symbols10", "X", "symbols10", "C", Dir.left)); // call procedure
  tm.append(new Rule("symbols10", "|", "symbols100", "|", Dir.left)); // call procedure
  tm.append(new Rule("symbols10", " ", "removeBars", " ", Dir.right)); // call procedure
  tm.append(new Rule("symbols100", "I", "symbols100", "C", Dir.left)); // call procedure
  tm.append(new Rule("symbols100", "V", "symbols100", "D", Dir.left)); // call procedure
  tm.append(new Rule("symbols100", "X", "symbols100", "M", Dir.left)); // call procedure
  tm.append(new Rule("symbols100", "|", "symbols1000", "|", Dir.left)); // call procedure
  tm.append(new Rule("symbols100", " ", "removeBars", " ", Dir.right)); // call procedure
  tm.append(new Rule("symbols1000", "I", "symbols1000", "M", Dir.left)); // call procedure
  tm.append(new Rule("symbols1000", " ", "removeBars", " ", Dir.right)); // call procedure
  // Remove bars
  tm.append(new Rule("removeBars", "|", "removeBars", " ", Dir.right)); // call procedure
  tm.append(new Rule("removeBars", "I", "moveI", " ", Dir.right)); // call procedure
  tm.append(new Rule("removeBars", "V", "moveV", " ", Dir.right)); // call procedure
  tm.append(new Rule("removeBars", "X", "moveX", " ", Dir.right)); // call procedure
  tm.append(new Rule("removeBars", "L", "moveL", " ", Dir.right)); // call procedure
  tm.append(new Rule("removeBars", "C", "moveC", " ", Dir.right)); // call procedure
  tm.append(new Rule("removeBars", "D", "moveD", " ", Dir.right)); // call procedure
  tm.append(new Rule("removeBars", "M", "moveM", " ", Dir.right)); // call procedure
  tm.append(new Rule("nextChar", "|", "nextChar", "|", Dir.right)); // call procedure
  tm.append(new Rule("nextChar", " ", "checkForBars", " ", Dir.left)); // call procedure
  tm.append(new Rule("nextChar", "I", "moveI", "|", Dir.right)); // call procedure
  tm.append(new Rule("nextChar", "V", "moveV", "|", Dir.right)); // call procedure
  tm.append(new Rule("nextChar", "X", "moveX", "|", Dir.right)); // call procedure
  tm.append(new Rule("nextChar", "L", "moveL", "|", Dir.right)); // call procedure
  tm.append(new Rule("nextChar", "C", "moveC", "|", Dir.right)); // call procedure
  tm.append(new Rule("nextChar", "D", "moveD", "|", Dir.right)); // call procedure
  tm.append(new Rule("nextChar", "M", "moveM", "|", Dir.right)); // call procedure
  // moveI
  tm.append(new Rule("moveI", "|", "nextChar", "I", Dir.right)); // call procedure
  tm.append(new Rule("moveI", "I", "writeI", "I", Dir.left)); // call procedure
  tm.append(new Rule("moveI", "V", "writeI", "V", Dir.left)); // call procedure
  tm.append(new Rule("moveI", "X", "writeI", "X", Dir.left)); // call procedure
  tm.append(new Rule("moveI", " ", "writeI", " ", Dir.left)); // call procedure
  // moveV
  tm.append(new Rule("moveV", "|", "nextChar", "V", Dir.right)); // call procedure
  tm.append(new Rule("moveV", "I", "writeV", "I", Dir.left)); // call procedure
  tm.append(new Rule("moveV", " ", "writeV", " ", Dir.left)); // call procedure
  // moveX  
  tm.append(new Rule("moveX", "|", "nextChar", "X", Dir.right)); // call procedure
  tm.append(new Rule("moveX", "I", "writeX", "I", Dir.left)); // call procedure
  tm.append(new Rule("moveX", "V", "writeX", "V", Dir.left)); // call procedure
  tm.append(new Rule("moveX", "X", "writeX", "X", Dir.left)); // call procedure
  tm.append(new Rule("moveX", "L", "writeX", "L", Dir.left)); // call procedure
  tm.append(new Rule("moveX", "C", "writeX", "C", Dir.left)); // call procedure
  tm.append(new Rule("moveX", " ", "writeX", " ", Dir.left)); // call procedure
  // moveL  
  tm.append(new Rule("moveL", "|", "nextChar", "L", Dir.right)); // call procedure
  tm.append(new Rule("moveL", "I", "writeL", "I", Dir.left)); // call procedure
  tm.append(new Rule("moveL", "V", "writeL", "V", Dir.left)); // call procedure
  tm.append(new Rule("moveL", "X", "writeL", "X", Dir.left)); // call procedure
  tm.append(new Rule("moveL", " ", "writeL", " ", Dir.left)); // call procedure
  // moveC  
  tm.append(new Rule("moveC", "|", "nextChar", "C", Dir.right)); // call procedure
  tm.append(new Rule("moveC", "I", "writeC", "I", Dir.left)); // call procedure
  tm.append(new Rule("moveC", "V", "writeC", "V", Dir.left)); // call procedure
  tm.append(new Rule("moveC", "X", "writeC", "X", Dir.left)); // call procedure
  tm.append(new Rule("moveC", "L", "writeC", "L", Dir.left)); // call procedure
  tm.append(new Rule("moveC", "C", "writeC", "C", Dir.left)); // call procedure
  tm.append(new Rule("moveC", "D", "writeC", "D", Dir.left)); // call procedure
  tm.append(new Rule("moveC", "M", "writeC", "M", Dir.left)); // call procedure
  tm.append(new Rule("moveC", " ", "writeC", " ", Dir.left)); // call procedure
  // moveD  
  tm.append(new Rule("moveD", "|", "nextChar", "D", Dir.right)); // call procedure
  tm.append(new Rule("moveD", "I", "writeD", "I", Dir.left)); // call procedure
  tm.append(new Rule("moveD", "V", "writeD", "V", Dir.left)); // call procedure
  tm.append(new Rule("moveD", "X", "writeD", "X", Dir.left)); // call procedure
  tm.append(new Rule("moveD", "L", "writeD", "L", Dir.left)); // call procedure
  tm.append(new Rule("moveD", "C", "writeD", "C", Dir.left)); // call procedure
  tm.append(new Rule("moveD", " ", "writeD", " ", Dir.left)); // call procedure
  // moveM
  tm.append(new Rule("moveM", "|", "nextChar", "M", Dir.right)); // call procedure
  tm.append(new Rule("moveM", "I", "writeM", "I", Dir.left)); // call procedure
  tm.append(new Rule("moveM", "V", "writeM", "V", Dir.left)); // call procedure
  tm.append(new Rule("moveM", "X", "writeM", "X", Dir.left)); // call procedure
  tm.append(new Rule("moveM", "L", "writeM", "L", Dir.left)); // call procedure
  tm.append(new Rule("moveM", "C", "writeM", "C", Dir.left)); // call procedure
  tm.append(new Rule("moveM", "D", "writeM", "D", Dir.left)); // call procedure
  tm.append(new Rule("moveM", "M", "writeM", "M", Dir.left)); // call procedure
  tm.append(new Rule("moveM", " ", "writeM", " ", Dir.left)); // call procedure
  // write char
  tm.append(new Rule("writeI", "|", "nextChar", "I", Dir.right)); // call procedure
  tm.append(new Rule("writeI", " ", "nextChar", "I", Dir.right)); // call procedure
  tm.append(new Rule("writeV", "|", "nextChar", "V", Dir.right)); // call procedure
  tm.append(new Rule("writeV", " ", "nextChar", "V", Dir.right)); // call procedure
  tm.append(new Rule("writeX", "|", "nextChar", "X", Dir.right)); // call procedure
  tm.append(new Rule("writeX", " ", "nextChar", "X", Dir.right)); // call procedure
  tm.append(new Rule("writeL", "|", "nextChar", "L", Dir.right)); // call procedure
  tm.append(new Rule("writeL", " ", "nextChar", "L", Dir.right)); // call procedure
  tm.append(new Rule("writeC", "|", "nextChar", "C", Dir.right)); // call procedure
  tm.append(new Rule("writeC", " ", "nextChar", "C", Dir.right)); // call procedure
  tm.append(new Rule("writeD", "|", "nextChar", "D", Dir.right)); // call procedure
  tm.append(new Rule("writeD", " ", "nextChar", "D", Dir.right)); // call procedure
  tm.append(new Rule("writeM", "|", "nextChar", "M", Dir.right)); // call procedure
  tm.append(new Rule("writeM", " ", "nextChar", "M", Dir.right)); // call procedure
  // checkForBars  
  tm.append(new Rule("checkForBars", "I", "checkForBars", "I", Dir.left)); // call procedure
  tm.append(new Rule("checkForBars", "V", "checkForBars", "V", Dir.left)); // call procedure
  tm.append(new Rule("checkForBars", "X", "checkForBars", "X", Dir.left)); // call procedure
  tm.append(new Rule("checkForBars", "L", "checkForBars", "L", Dir.left)); // call procedure
  tm.append(new Rule("checkForBars", "C", "checkForBars", "C", Dir.left)); // call procedure
  tm.append(new Rule("checkForBars", "D", "checkForBars", "D", Dir.left)); // call procedure
  tm.append(new Rule("checkForBars", "M", "checkForBars", "M", Dir.left)); // call procedure
  tm.append(new Rule("checkForBars", "|", "barFound", "|", Dir.left)); // call procedure
  tm.append(new Rule("checkForBars", " ", "halt", " ", Dir.right)); // call procedure
  // barFound
  tm.append(new Rule("barFound", "I", "barFound", "I", Dir.left)); // call procedure
  tm.append(new Rule("barFound", "V", "barFound", "V", Dir.left)); // call procedure
  tm.append(new Rule("barFound", "X", "barFound", "X", Dir.left)); // call procedure
  tm.append(new Rule("barFound", "L", "barFound", "L", Dir.left)); // call procedure
  tm.append(new Rule("barFound", "C", "barFound", "C", Dir.left)); // call procedure
  tm.append(new Rule("barFound", "D", "barFound", "D", Dir.left)); // call procedure
  tm.append(new Rule("barFound", "M", "barFound", "M", Dir.left)); // call procedure
  tm.append(new Rule("barFound", "|", "barFound", "|", Dir.left)); // call procedure
  tm.append(new Rule("barFound", " ", "removeBars", " ", Dir.right)); // call procedure
}
