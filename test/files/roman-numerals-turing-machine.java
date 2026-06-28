// Java with Elan 2.0.0-beta1

public class Global {

// Turing Machine that converts a Year from decimal to roman numerals

// Run the program, enter the number to convert and watch the machine in action.

// This TM has 300+ transition rules! You can use the same TuringMachine class to solve

// a simpler task, just by writing rules in the same format:

// new Rule("currentState", "readSymbol", "newState", "writeSymbol", DirectionForHeadMove)

static void main() {
  var tm = new TuringMachine(initState, haltState);
  addRulesForRomanNumeralsInto(tm); // procedure call
  var dec = inputIntBetween("Enter a year:", 1, 3999);
  tm.setTape(dec.toString()); // procedure call
  var steps = 0;
  while (!tm.isHalted()) {
    var rule = tm.findMatchingRule();
    tm.singleStep(); // procedure call
    steps = steps + 1; // assignment
    clearPrintedText(); // procedure call
    System.out.println(tm.tape); // print statement
    printTab(tm.headPosition - 1, "^"); // procedure call
    System.out.println(String.format("Step: %", steps)); // print statement
    System.out.println(String.format("State: %", tm.currentState)); // print statement
    System.out.println(String.format("Rule applied: %", rule.toString())); // print statement
    sleep_ms(40); // procedure call
  } // end while
  System.out.println(String.format("The roman numeral equivalent for % is %", dec, tm.tape.trim())); // print statement
} // end main

static final String initState = "init"; // constant

static final String haltState = "halt"; // constant

class TuringMachine {

  public TuringMachine(String initialState, String haltState) {
    this.tape = ""; // assignment
    this.initialState = initialState; // assignment
    this.haltState = haltState; // assignment
    this.rules = new List<Rule>(); // assignment
    this.currentState = initialState; // assignment
    this.headPosition = 0; // assignment
  } // end constructor

  public String toString() { // function method
    return "a TuringMachine";
  } // end function method

  public String initialState; // property

  public String currentState; // property

  public int headPosition; // property

  public String haltState; // property

  public List<Rule> rules; // property

  public String tape; // property

  public void setTape(String tape) { // procedure method
    this.tape = tape; // assignment
  } // end procedure method

  public void append(Rule rule) { // procedure method
    this.rules = this.rules.withAppend(rule); // assignment
  } // end procedure method

  public void singleStep() { // procedure method
    var rule = this.findMatchingRule();
    this.execute(rule); // procedure call
  } // end procedure method

  public boolean isHalted() { // function method
    return this.currentState.equals(this.haltState);
  } // end function method

  public Rule findMatchingRule() { // function method
    var matches = this.rules.filter((Rule r) -> (r.currentState.equals(this.currentState)) && (r.currentSymbol.equals(this.tape[this.headPosition])));
    if (matches.length() == 0) {
      throw new ElanRuntimeError(String.format("No rule matching state % and symbol %", this.currentState, this.tape[this.headPosition]));
    } // end if
    return matches.head();
  } // end function method

  public void write(String newSymbol) { // procedure method
    var hp = this.headPosition;
    this.tape = this.tape.subString(0, hp) + newSymbol + this.tape.subString(hp + 1, this.tape.length()); // assignment
  } // end procedure method

  public void execute(Rule rule) { // procedure method
    this.currentState = rule.nextState; // assignment
    this.write(rule.writeSymbol); // procedure call
    if (rule.move == Dir.right) {
      this.headPosition = this.headPosition + 1; // assignment
      if (this.headPosition >= this.tape.length()) {
        this.tape = this.tape + " "; // assignment
      } // end if
    } else {
      this.headPosition = this.headPosition - 1; // assignment
      if (this.headPosition < 0) {
        this.tape = " " + this.tape; // assignment
        this.headPosition = 0; // assignment
      } // end if
    } // end if
  } // end procedure method

} // end class

class Rule {

  public String currentState; // property

  public String currentSymbol; // property

  public String nextState; // property

  public String writeSymbol; // property

  public Dir move; // property

  public Rule(String currentState, String currentSymbol, String nextState, String writeSymbol, Dir move) {
    this.currentState = currentState; // assignment
    this.currentSymbol = currentSymbol; // assignment
    this.nextState = nextState; // assignment
    this.writeSymbol = writeSymbol; // assignment
    this.move = move; // assignment
  } // end constructor

  public String toString() { // function method
    return String.format("%,%,%,%,%", this.currentState, this.currentSymbol, this.nextState, this.writeSymbol, enumValue(this.move));
  } // end function method

} // end class

enum Dir {left, right}

// rename this method and define new transition rules to solve a different problem

static void addRulesForRomanNumeralsInto(TuringMachine tm) { // procedure
  // name: Denary to Roman "Numerals", initial state = "init", accept state = "halt"
  // Example tape input:  2024 (between 1 and 3999)
  tm.append(new Rule("init", "0", "init", "0", Dir.right)); // procedure call
  tm.append(new Rule("init", "1", "init", "1", Dir.right)); // procedure call
  tm.append(new Rule("init", "2", "init", "2", Dir.right)); // procedure call
  tm.append(new Rule("init", "3", "init", "3", Dir.right)); // procedure call
  tm.append(new Rule("init", "4", "init", "4", Dir.right)); // procedure call
  tm.append(new Rule("init", "5", "init", "5", Dir.right)); // procedure call
  tm.append(new Rule("init", "6", "init", "6", Dir.right)); // procedure call
  tm.append(new Rule("init", "7", "init", "7", Dir.right)); // procedure call
  tm.append(new Rule("init", "8", "init", "8", Dir.right)); // procedure call
  tm.append(new Rule("init", "9", "init", "9", Dir.right)); // procedure call
  tm.append(new Rule("init", " ", "return", "]", Dir.left)); // procedure call
  // read next digit
  tm.append(new Rule("readNextDigit", "0", "write0", "[", Dir.right)); // procedure call
  tm.append(new Rule("readNextDigit", "1", "write1", "[", Dir.right)); // procedure call
  tm.append(new Rule("readNextDigit", "2", "write2", "[", Dir.right)); // procedure call
  tm.append(new Rule("readNextDigit", "3", "write3", "[", Dir.right)); // procedure call
  tm.append(new Rule("readNextDigit", "4", "write4", "[", Dir.right)); // procedure call
  tm.append(new Rule("readNextDigit", "5", "write5", "[", Dir.right)); // procedure call
  tm.append(new Rule("readNextDigit", "6", "write6", "[", Dir.right)); // procedure call
  tm.append(new Rule("readNextDigit", "7", "write7", "[", Dir.right)); // procedure call
  tm.append(new Rule("readNextDigit", "8", "write8", "[", Dir.right)); // procedure call
  tm.append(new Rule("readNextDigit", "9", "write9", "[", Dir.right)); // procedure call
  tm.append(new Rule("readNextDigit", "]", "gotoEnd", " ", Dir.right)); // procedure call
  // write0
  tm.append(new Rule("write0", "0", "write0", "0", Dir.right)); // procedure call
  tm.append(new Rule("write0", "1", "write0", "1", Dir.right)); // procedure call
  tm.append(new Rule("write0", "2", "write0", "2", Dir.right)); // procedure call
  tm.append(new Rule("write0", "3", "write0", "3", Dir.right)); // procedure call
  tm.append(new Rule("write0", "4", "write0", "4", Dir.right)); // procedure call
  tm.append(new Rule("write0", "5", "write0", "5", Dir.right)); // procedure call
  tm.append(new Rule("write0", "6", "write0", "6", Dir.right)); // procedure call
  tm.append(new Rule("write0", "7", "write0", "7", Dir.right)); // procedure call
  tm.append(new Rule("write0", "8", "write0", "8", Dir.right)); // procedure call
  tm.append(new Rule("write0", "9", "write0", "9", Dir.right)); // procedure call
  tm.append(new Rule("write0", "]", "write0", "]", Dir.right)); // procedure call
  tm.append(new Rule("write0", "I", "write0", "I", Dir.right)); // procedure call
  tm.append(new Rule("write0", "V", "write0", "V", Dir.right)); // procedure call
  tm.append(new Rule("write0", "X", "write0", "X", Dir.right)); // procedure call
  tm.append(new Rule("write0", "|", "write0", "|", Dir.right)); // procedure call
  tm.append(new Rule("write0", " ", "return", "|", Dir.left)); // procedure call
  // write1
  tm.append(new Rule("write1", "0", "write1", "0", Dir.right)); // procedure call
  tm.append(new Rule("write1", "1", "write1", "1", Dir.right)); // procedure call
  tm.append(new Rule("write1", "2", "write1", "2", Dir.right)); // procedure call
  tm.append(new Rule("write1", "3", "write1", "3", Dir.right)); // procedure call
  tm.append(new Rule("write1", "4", "write1", "4", Dir.right)); // procedure call
  tm.append(new Rule("write1", "5", "write1", "5", Dir.right)); // procedure call
  tm.append(new Rule("write1", "6", "write1", "6", Dir.right)); // procedure call
  tm.append(new Rule("write1", "7", "write1", "7", Dir.right)); // procedure call
  tm.append(new Rule("write1", "8", "write1", "8", Dir.right)); // procedure call
  tm.append(new Rule("write1", "9", "write1", "9", Dir.right)); // procedure call
  tm.append(new Rule("write1", "]", "write1", "]", Dir.right)); // procedure call
  tm.append(new Rule("write1", "I", "write1", "I", Dir.right)); // procedure call
  tm.append(new Rule("write1", "V", "write1", "V", Dir.right)); // procedure call
  tm.append(new Rule("write1", "X", "write1", "X", Dir.right)); // procedure call
  tm.append(new Rule("write1", "|", "write1", "|", Dir.right)); // procedure call
  tm.append(new Rule("write1", " ", "write0", "I", Dir.right)); // procedure call
  // write2  
  tm.append(new Rule("write2", "0", "write2", "0", Dir.right)); // procedure call
  tm.append(new Rule("write2", "1", "write2", "1", Dir.right)); // procedure call
  tm.append(new Rule("write2", "2", "write2", "2", Dir.right)); // procedure call
  tm.append(new Rule("write2", "3", "write2", "3", Dir.right)); // procedure call
  tm.append(new Rule("write2", "4", "write2", "4", Dir.right)); // procedure call
  tm.append(new Rule("write2", "5", "write2", "5", Dir.right)); // procedure call
  tm.append(new Rule("write2", "6", "write2", "6", Dir.right)); // procedure call
  tm.append(new Rule("write2", "7", "write2", "7", Dir.right)); // procedure call
  tm.append(new Rule("write2", "8", "write2", "8", Dir.right)); // procedure call
  tm.append(new Rule("write2", "9", "write2", "9", Dir.right)); // procedure call
  tm.append(new Rule("write2", "]", "write2", "]", Dir.right)); // procedure call
  tm.append(new Rule("write2", "I", "write2", "I", Dir.right)); // procedure call
  tm.append(new Rule("write2", "V", "write2", "V", Dir.right)); // procedure call
  tm.append(new Rule("write2", "X", "write2", "X", Dir.right)); // procedure call
  tm.append(new Rule("write2", "|", "write2", "|", Dir.right)); // procedure call
  tm.append(new Rule("write2", " ", "write1", "I", Dir.right)); // procedure call
  // write3  
  tm.append(new Rule("write3", "0", "write3", "0", Dir.right)); // procedure call
  tm.append(new Rule("write3", "1", "write3", "1", Dir.right)); // procedure call
  tm.append(new Rule("write3", "2", "write3", "2", Dir.right)); // procedure call
  tm.append(new Rule("write3", "3", "write3", "3", Dir.right)); // procedure call
  tm.append(new Rule("write3", "4", "write3", "4", Dir.right)); // procedure call
  tm.append(new Rule("write3", "5", "write3", "5", Dir.right)); // procedure call
  tm.append(new Rule("write3", "6", "write3", "6", Dir.right)); // procedure call
  tm.append(new Rule("write3", "7", "write3", "7", Dir.right)); // procedure call
  tm.append(new Rule("write3", "8", "write3", "8", Dir.right)); // procedure call
  tm.append(new Rule("write3", "9", "write3", "9", Dir.right)); // procedure call
  tm.append(new Rule("write3", "]", "write3", "]", Dir.right)); // procedure call
  tm.append(new Rule("write3", "I", "write3", "I", Dir.right)); // procedure call
  tm.append(new Rule("write3", "V", "write3", "V", Dir.right)); // procedure call
  tm.append(new Rule("write3", "X", "write3", "X", Dir.right)); // procedure call
  tm.append(new Rule("write3", "|", "write3", "|", Dir.right)); // procedure call
  tm.append(new Rule("write3", " ", "write2", "I", Dir.right)); // procedure call
  // write4  
  tm.append(new Rule("write4", "0", "write4", "0", Dir.right)); // procedure call
  tm.append(new Rule("write4", "1", "write4", "1", Dir.right)); // procedure call
  tm.append(new Rule("write4", "2", "write4", "2", Dir.right)); // procedure call
  tm.append(new Rule("write4", "3", "write4", "3", Dir.right)); // procedure call
  tm.append(new Rule("write4", "4", "write4", "4", Dir.right)); // procedure call
  tm.append(new Rule("write4", "5", "write4", "5", Dir.right)); // procedure call
  tm.append(new Rule("write4", "6", "write4", "6", Dir.right)); // procedure call
  tm.append(new Rule("write4", "7", "write4", "7", Dir.right)); // procedure call
  tm.append(new Rule("write4", "8", "write4", "8", Dir.right)); // procedure call
  tm.append(new Rule("write4", "9", "write4", "9", Dir.right)); // procedure call
  tm.append(new Rule("write4", "]", "write4", "]", Dir.right)); // procedure call
  tm.append(new Rule("write4", "I", "write4", "I", Dir.right)); // procedure call
  tm.append(new Rule("write4", "V", "write4", "V", Dir.right)); // procedure call
  tm.append(new Rule("write4", "X", "write4", "X", Dir.right)); // procedure call
  tm.append(new Rule("write4", "|", "write4", "|", Dir.right)); // procedure call
  tm.append(new Rule("write4", " ", "write5", "I", Dir.right)); // procedure call
  // write5
  tm.append(new Rule("write5", "0", "write5", "0", Dir.right)); // procedure call
  tm.append(new Rule("write5", "1", "write5", "1", Dir.right)); // procedure call
  tm.append(new Rule("write5", "2", "write5", "2", Dir.right)); // procedure call
  tm.append(new Rule("write5", "3", "write5", "3", Dir.right)); // procedure call
  tm.append(new Rule("write5", "4", "write5", "4", Dir.right)); // procedure call
  tm.append(new Rule("write5", "5", "write5", "5", Dir.right)); // procedure call
  tm.append(new Rule("write5", "6", "write5", "6", Dir.right)); // procedure call
  tm.append(new Rule("write5", "7", "write5", "7", Dir.right)); // procedure call
  tm.append(new Rule("write5", "8", "write5", "8", Dir.right)); // procedure call
  tm.append(new Rule("write5", "9", "write5", "9", Dir.right)); // procedure call
  tm.append(new Rule("write5", "]", "write5", "]", Dir.right)); // procedure call
  tm.append(new Rule("write5", "I", "write5", "I", Dir.right)); // procedure call
  tm.append(new Rule("write5", "V", "write5", "V", Dir.right)); // procedure call
  tm.append(new Rule("write5", "X", "write5", "X", Dir.right)); // procedure call
  tm.append(new Rule("write5", "|", "write5", "|", Dir.right)); // procedure call
  tm.append(new Rule("write5", " ", "write0", "V", Dir.right)); // procedure call
  // write6
  tm.append(new Rule("write6", "0", "write6", "0", Dir.right)); // procedure call
  tm.append(new Rule("write6", "1", "write6", "1", Dir.right)); // procedure call
  tm.append(new Rule("write6", "2", "write6", "2", Dir.right)); // procedure call
  tm.append(new Rule("write6", "3", "write6", "3", Dir.right)); // procedure call
  tm.append(new Rule("write6", "4", "write6", "4", Dir.right)); // procedure call
  tm.append(new Rule("write6", "5", "write6", "5", Dir.right)); // procedure call
  tm.append(new Rule("write6", "6", "write6", "6", Dir.right)); // procedure call
  tm.append(new Rule("write6", "7", "write6", "7", Dir.right)); // procedure call
  tm.append(new Rule("write6", "8", "write6", "8", Dir.right)); // procedure call
  tm.append(new Rule("write6", "9", "write6", "9", Dir.right)); // procedure call
  tm.append(new Rule("write6", "]", "write6", "]", Dir.right)); // procedure call
  tm.append(new Rule("write6", "I", "write6", "I", Dir.right)); // procedure call
  tm.append(new Rule("write6", "V", "write6", "V", Dir.right)); // procedure call
  tm.append(new Rule("write6", "X", "write6", "X", Dir.right)); // procedure call
  tm.append(new Rule("write6", "|", "write6", "|", Dir.right)); // procedure call
  tm.append(new Rule("write6", " ", "write1", "V", Dir.right)); // procedure call
  // write7
  tm.append(new Rule("write7", "0", "write7", "0", Dir.right)); // procedure call
  tm.append(new Rule("write7", "1", "write7", "1", Dir.right)); // procedure call
  tm.append(new Rule("write7", "2", "write7", "2", Dir.right)); // procedure call
  tm.append(new Rule("write7", "3", "write7", "3", Dir.right)); // procedure call
  tm.append(new Rule("write7", "4", "write7", "4", Dir.right)); // procedure call
  tm.append(new Rule("write7", "5", "write7", "5", Dir.right)); // procedure call
  tm.append(new Rule("write7", "6", "write7", "6", Dir.right)); // procedure call
  tm.append(new Rule("write7", "7", "write7", "7", Dir.right)); // procedure call
  tm.append(new Rule("write7", "8", "write7", "8", Dir.right)); // procedure call
  tm.append(new Rule("write7", "9", "write7", "9", Dir.right)); // procedure call
  tm.append(new Rule("write7", "]", "write7", "]", Dir.right)); // procedure call
  tm.append(new Rule("write7", "I", "write7", "I", Dir.right)); // procedure call
  tm.append(new Rule("write7", "V", "write7", "V", Dir.right)); // procedure call
  tm.append(new Rule("write7", "X", "write7", "X", Dir.right)); // procedure call
  tm.append(new Rule("write7", "|", "write7", "|", Dir.right)); // procedure call
  tm.append(new Rule("write7", " ", "write2", "V", Dir.right)); // procedure call
  // write8
  tm.append(new Rule("write8", "0", "write8", "0", Dir.right)); // procedure call
  tm.append(new Rule("write8", "1", "write8", "1", Dir.right)); // procedure call
  tm.append(new Rule("write8", "2", "write8", "2", Dir.right)); // procedure call
  tm.append(new Rule("write8", "3", "write8", "3", Dir.right)); // procedure call
  tm.append(new Rule("write8", "4", "write8", "4", Dir.right)); // procedure call
  tm.append(new Rule("write8", "5", "write8", "5", Dir.right)); // procedure call
  tm.append(new Rule("write8", "6", "write8", "6", Dir.right)); // procedure call
  tm.append(new Rule("write8", "7", "write8", "7", Dir.right)); // procedure call
  tm.append(new Rule("write8", "8", "write8", "8", Dir.right)); // procedure call
  tm.append(new Rule("write8", "9", "write8", "9", Dir.right)); // procedure call
  tm.append(new Rule("write8", "]", "write8", "]", Dir.right)); // procedure call
  tm.append(new Rule("write8", "I", "write8", "I", Dir.right)); // procedure call
  tm.append(new Rule("write8", "V", "write8", "V", Dir.right)); // procedure call
  tm.append(new Rule("write8", "X", "write8", "X", Dir.right)); // procedure call
  tm.append(new Rule("write8", "|", "write8", "|", Dir.right)); // procedure call
  tm.append(new Rule("write8", " ", "write3", "V", Dir.right)); // procedure call
  // write9
  tm.append(new Rule("write9", "0", "write9", "0", Dir.right)); // procedure call
  tm.append(new Rule("write9", "1", "write9", "1", Dir.right)); // procedure call
  tm.append(new Rule("write9", "2", "write9", "2", Dir.right)); // procedure call
  tm.append(new Rule("write9", "3", "write9", "3", Dir.right)); // procedure call
  tm.append(new Rule("write9", "4", "write9", "4", Dir.right)); // procedure call
  tm.append(new Rule("write9", "5", "write9", "5", Dir.right)); // procedure call
  tm.append(new Rule("write9", "6", "write9", "6", Dir.right)); // procedure call
  tm.append(new Rule("write9", "7", "write9", "7", Dir.right)); // procedure call
  tm.append(new Rule("write9", "8", "write9", "8", Dir.right)); // procedure call
  tm.append(new Rule("write9", "9", "write9", "9", Dir.right)); // procedure call
  tm.append(new Rule("write9", "]", "write9", "]", Dir.right)); // procedure call
  tm.append(new Rule("write9", "I", "write9", "I", Dir.right)); // procedure call
  tm.append(new Rule("write9", "V", "write9", "V", Dir.right)); // procedure call
  tm.append(new Rule("write9", "X", "write9", "X", Dir.right)); // procedure call
  tm.append(new Rule("write9", "|", "write9", "|", Dir.right)); // procedure call
  tm.append(new Rule("write9", " ", "write10", "I", Dir.right)); // procedure call
  // Write10
  tm.append(new Rule("write10", " ", "write0", "X", Dir.right)); // procedure call
  // return  
  tm.append(new Rule("return", "0", "return", "0", Dir.left)); // procedure call
  tm.append(new Rule("return", "1", "return", "1", Dir.left)); // procedure call
  tm.append(new Rule("return", "2", "return", "2", Dir.left)); // procedure call
  tm.append(new Rule("return", "3", "return", "3", Dir.left)); // procedure call
  tm.append(new Rule("return", "4", "return", "4", Dir.left)); // procedure call
  tm.append(new Rule("return", "5", "return", "5", Dir.left)); // procedure call
  tm.append(new Rule("return", "6", "return", "6", Dir.left)); // procedure call
  tm.append(new Rule("return", "7", "return", "7", Dir.left)); // procedure call
  tm.append(new Rule("return", "8", "return", "8", Dir.left)); // procedure call
  tm.append(new Rule("return", "9", "return", "9", Dir.left)); // procedure call
  tm.append(new Rule("return", "I", "return", "I", Dir.left)); // procedure call
  tm.append(new Rule("return", "V", "return", "V", Dir.left)); // procedure call
  tm.append(new Rule("return", "X", "return", "X", Dir.left)); // procedure call
  tm.append(new Rule("return", "|", "return", "|", Dir.left)); // procedure call
  tm.append(new Rule("return", "]", "return", "]", Dir.left)); // procedure call
  tm.append(new Rule("return", "[", "readNextDigit", " ", Dir.right)); // procedure call
  tm.append(new Rule("return", " ", "readNextDigit", " ", Dir.right)); // procedure call
  // gotoEnd -  only after deleting input.
  tm.append(new Rule("gotoEnd", "|", "gotoEnd", "|", Dir.right)); // procedure call
  tm.append(new Rule("gotoEnd", "I", "gotoEnd", "I", Dir.right)); // procedure call
  tm.append(new Rule("gotoEnd", "V", "gotoEnd", "V", Dir.right)); // procedure call
  tm.append(new Rule("gotoEnd", "X", "gotoEnd", "X", Dir.right)); // procedure call
  tm.append(new Rule("gotoEnd", " ", "deleteLastBar", " ", Dir.left)); // procedure call
  tm.append(new Rule("deleteLastBar", "|", "symbols1", " ", Dir.left)); // procedure call
  // symbols1
  tm.append(new Rule("symbols1", "I", "symbols1", "I", Dir.left)); // procedure call
  tm.append(new Rule("symbols1", "V", "symbols1", "V", Dir.left)); // procedure call
  tm.append(new Rule("symbols1", "X", "symbols1", "X", Dir.left)); // procedure call
  tm.append(new Rule("symbols1", "|", "symbols10", "|", Dir.left)); // procedure call
  tm.append(new Rule("symbols1", " ", "removeBars", " ", Dir.right)); // procedure call
  tm.append(new Rule("symbols10", "I", "symbols10", "X", Dir.left)); // procedure call
  tm.append(new Rule("symbols10", "V", "symbols10", "L", Dir.left)); // procedure call
  tm.append(new Rule("symbols10", "X", "symbols10", "C", Dir.left)); // procedure call
  tm.append(new Rule("symbols10", "|", "symbols100", "|", Dir.left)); // procedure call
  tm.append(new Rule("symbols10", " ", "removeBars", " ", Dir.right)); // procedure call
  tm.append(new Rule("symbols100", "I", "symbols100", "C", Dir.left)); // procedure call
  tm.append(new Rule("symbols100", "V", "symbols100", "D", Dir.left)); // procedure call
  tm.append(new Rule("symbols100", "X", "symbols100", "M", Dir.left)); // procedure call
  tm.append(new Rule("symbols100", "|", "symbols1000", "|", Dir.left)); // procedure call
  tm.append(new Rule("symbols100", " ", "removeBars", " ", Dir.right)); // procedure call
  tm.append(new Rule("symbols1000", "I", "symbols1000", "M", Dir.left)); // procedure call
  tm.append(new Rule("symbols1000", " ", "removeBars", " ", Dir.right)); // procedure call
  // Remove bars
  tm.append(new Rule("removeBars", "|", "removeBars", " ", Dir.right)); // procedure call
  tm.append(new Rule("removeBars", "I", "moveI", " ", Dir.right)); // procedure call
  tm.append(new Rule("removeBars", "V", "moveV", " ", Dir.right)); // procedure call
  tm.append(new Rule("removeBars", "X", "moveX", " ", Dir.right)); // procedure call
  tm.append(new Rule("removeBars", "L", "moveL", " ", Dir.right)); // procedure call
  tm.append(new Rule("removeBars", "C", "moveC", " ", Dir.right)); // procedure call
  tm.append(new Rule("removeBars", "D", "moveD", " ", Dir.right)); // procedure call
  tm.append(new Rule("removeBars", "M", "moveM", " ", Dir.right)); // procedure call
  tm.append(new Rule("nextChar", "|", "nextChar", "|", Dir.right)); // procedure call
  tm.append(new Rule("nextChar", " ", "checkForBars", " ", Dir.left)); // procedure call
  tm.append(new Rule("nextChar", "I", "moveI", "|", Dir.right)); // procedure call
  tm.append(new Rule("nextChar", "V", "moveV", "|", Dir.right)); // procedure call
  tm.append(new Rule("nextChar", "X", "moveX", "|", Dir.right)); // procedure call
  tm.append(new Rule("nextChar", "L", "moveL", "|", Dir.right)); // procedure call
  tm.append(new Rule("nextChar", "C", "moveC", "|", Dir.right)); // procedure call
  tm.append(new Rule("nextChar", "D", "moveD", "|", Dir.right)); // procedure call
  tm.append(new Rule("nextChar", "M", "moveM", "|", Dir.right)); // procedure call
  // moveI
  tm.append(new Rule("moveI", "|", "nextChar", "I", Dir.right)); // procedure call
  tm.append(new Rule("moveI", "I", "writeI", "I", Dir.left)); // procedure call
  tm.append(new Rule("moveI", "V", "writeI", "V", Dir.left)); // procedure call
  tm.append(new Rule("moveI", "X", "writeI", "X", Dir.left)); // procedure call
  tm.append(new Rule("moveI", " ", "writeI", " ", Dir.left)); // procedure call
  // moveV
  tm.append(new Rule("moveV", "|", "nextChar", "V", Dir.right)); // procedure call
  tm.append(new Rule("moveV", "I", "writeV", "I", Dir.left)); // procedure call
  tm.append(new Rule("moveV", " ", "writeV", " ", Dir.left)); // procedure call
  // moveX  
  tm.append(new Rule("moveX", "|", "nextChar", "X", Dir.right)); // procedure call
  tm.append(new Rule("moveX", "I", "writeX", "I", Dir.left)); // procedure call
  tm.append(new Rule("moveX", "V", "writeX", "V", Dir.left)); // procedure call
  tm.append(new Rule("moveX", "X", "writeX", "X", Dir.left)); // procedure call
  tm.append(new Rule("moveX", "L", "writeX", "L", Dir.left)); // procedure call
  tm.append(new Rule("moveX", "C", "writeX", "C", Dir.left)); // procedure call
  tm.append(new Rule("moveX", " ", "writeX", " ", Dir.left)); // procedure call
  // moveL  
  tm.append(new Rule("moveL", "|", "nextChar", "L", Dir.right)); // procedure call
  tm.append(new Rule("moveL", "I", "writeL", "I", Dir.left)); // procedure call
  tm.append(new Rule("moveL", "V", "writeL", "V", Dir.left)); // procedure call
  tm.append(new Rule("moveL", "X", "writeL", "X", Dir.left)); // procedure call
  tm.append(new Rule("moveL", " ", "writeL", " ", Dir.left)); // procedure call
  // moveC  
  tm.append(new Rule("moveC", "|", "nextChar", "C", Dir.right)); // procedure call
  tm.append(new Rule("moveC", "I", "writeC", "I", Dir.left)); // procedure call
  tm.append(new Rule("moveC", "V", "writeC", "V", Dir.left)); // procedure call
  tm.append(new Rule("moveC", "X", "writeC", "X", Dir.left)); // procedure call
  tm.append(new Rule("moveC", "L", "writeC", "L", Dir.left)); // procedure call
  tm.append(new Rule("moveC", "C", "writeC", "C", Dir.left)); // procedure call
  tm.append(new Rule("moveC", "D", "writeC", "D", Dir.left)); // procedure call
  tm.append(new Rule("moveC", "M", "writeC", "M", Dir.left)); // procedure call
  tm.append(new Rule("moveC", " ", "writeC", " ", Dir.left)); // procedure call
  // moveD  
  tm.append(new Rule("moveD", "|", "nextChar", "D", Dir.right)); // procedure call
  tm.append(new Rule("moveD", "I", "writeD", "I", Dir.left)); // procedure call
  tm.append(new Rule("moveD", "V", "writeD", "V", Dir.left)); // procedure call
  tm.append(new Rule("moveD", "X", "writeD", "X", Dir.left)); // procedure call
  tm.append(new Rule("moveD", "L", "writeD", "L", Dir.left)); // procedure call
  tm.append(new Rule("moveD", "C", "writeD", "C", Dir.left)); // procedure call
  tm.append(new Rule("moveD", " ", "writeD", " ", Dir.left)); // procedure call
  // moveM
  tm.append(new Rule("moveM", "|", "nextChar", "M", Dir.right)); // procedure call
  tm.append(new Rule("moveM", "I", "writeM", "I", Dir.left)); // procedure call
  tm.append(new Rule("moveM", "V", "writeM", "V", Dir.left)); // procedure call
  tm.append(new Rule("moveM", "X", "writeM", "X", Dir.left)); // procedure call
  tm.append(new Rule("moveM", "L", "writeM", "L", Dir.left)); // procedure call
  tm.append(new Rule("moveM", "C", "writeM", "C", Dir.left)); // procedure call
  tm.append(new Rule("moveM", "D", "writeM", "D", Dir.left)); // procedure call
  tm.append(new Rule("moveM", "M", "writeM", "M", Dir.left)); // procedure call
  tm.append(new Rule("moveM", " ", "writeM", " ", Dir.left)); // procedure call
  // write char
  tm.append(new Rule("writeI", "|", "nextChar", "I", Dir.right)); // procedure call
  tm.append(new Rule("writeI", " ", "nextChar", "I", Dir.right)); // procedure call
  tm.append(new Rule("writeV", "|", "nextChar", "V", Dir.right)); // procedure call
  tm.append(new Rule("writeV", " ", "nextChar", "V", Dir.right)); // procedure call
  tm.append(new Rule("writeX", "|", "nextChar", "X", Dir.right)); // procedure call
  tm.append(new Rule("writeX", " ", "nextChar", "X", Dir.right)); // procedure call
  tm.append(new Rule("writeL", "|", "nextChar", "L", Dir.right)); // procedure call
  tm.append(new Rule("writeL", " ", "nextChar", "L", Dir.right)); // procedure call
  tm.append(new Rule("writeC", "|", "nextChar", "C", Dir.right)); // procedure call
  tm.append(new Rule("writeC", " ", "nextChar", "C", Dir.right)); // procedure call
  tm.append(new Rule("writeD", "|", "nextChar", "D", Dir.right)); // procedure call
  tm.append(new Rule("writeD", " ", "nextChar", "D", Dir.right)); // procedure call
  tm.append(new Rule("writeM", "|", "nextChar", "M", Dir.right)); // procedure call
  tm.append(new Rule("writeM", " ", "nextChar", "M", Dir.right)); // procedure call
  // checkForBars  
  tm.append(new Rule("checkForBars", "I", "checkForBars", "I", Dir.left)); // procedure call
  tm.append(new Rule("checkForBars", "V", "checkForBars", "V", Dir.left)); // procedure call
  tm.append(new Rule("checkForBars", "X", "checkForBars", "X", Dir.left)); // procedure call
  tm.append(new Rule("checkForBars", "L", "checkForBars", "L", Dir.left)); // procedure call
  tm.append(new Rule("checkForBars", "C", "checkForBars", "C", Dir.left)); // procedure call
  tm.append(new Rule("checkForBars", "D", "checkForBars", "D", Dir.left)); // procedure call
  tm.append(new Rule("checkForBars", "M", "checkForBars", "M", Dir.left)); // procedure call
  tm.append(new Rule("checkForBars", "|", "barFound", "|", Dir.left)); // procedure call
  tm.append(new Rule("checkForBars", " ", "halt", " ", Dir.right)); // procedure call
  // barFound
  tm.append(new Rule("barFound", "I", "barFound", "I", Dir.left)); // procedure call
  tm.append(new Rule("barFound", "V", "barFound", "V", Dir.left)); // procedure call
  tm.append(new Rule("barFound", "X", "barFound", "X", Dir.left)); // procedure call
  tm.append(new Rule("barFound", "L", "barFound", "L", Dir.left)); // procedure call
  tm.append(new Rule("barFound", "C", "barFound", "C", Dir.left)); // procedure call
  tm.append(new Rule("barFound", "D", "barFound", "D", Dir.left)); // procedure call
  tm.append(new Rule("barFound", "M", "barFound", "M", Dir.left)); // procedure call
  tm.append(new Rule("barFound", "|", "barFound", "|", Dir.left)); // procedure call
  tm.append(new Rule("barFound", " ", "removeBars", " ", Dir.right)); // procedure call
} // end procedure
} // end Global
