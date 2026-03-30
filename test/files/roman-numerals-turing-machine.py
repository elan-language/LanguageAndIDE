# Python with Elan 2.0.0-alpha1

# Turing Machine that converts a Year from decimal to roman numerals

# Run the program, enter the number to convert and watch the machine in action.

# This TM has 300+ transition rules! You can use the same TuringMachine class to solve

# a simpler task, just by writing rules in the same format:

# new Rule("currentState", "readSymbol", "newState", "writeSymbol", DirectionForHeadMove)

def main() -> None:
  tm = TuringMachine(initState, haltState) # variable definition
  addRulesForRomanNumeralsInto(tm) # call procedure
  dec = inputIntBetween("Enter a year:", 1, 3999) # constant
  tm.setTape(dec.toString()) # call procedure
  steps = 0 # variable definition
  while not tm.isHalted():
    rule = tm.findMatchingRule() # variable definition
    tm.singleStep() # call procedure
    steps = steps + 1 # set
    clearPrintedText() # call procedure
    print(tm.tape) # call procedure
    printTab(tm.headPosition - 1, "^") # call procedure
    print(f"Step: {steps}") # call procedure
    print(f"State: {tm.currentState}") # call procedure
    print(f"Rule applied: {rule.toString()}") # call procedure
    sleep_ms(40) # call procedure
  print(f"The roman numeral equivalent for {dec} is {tm.tape.trim()}") # call procedure

initState = "init" # constant

haltState = "halt" # constant

class TuringMachine

  def __init__(self: TuringMachine, initialState: str, haltState: str) -> None:
    self.tape = "" # set
    self.initialState = initialState # set
    self.haltState = haltState # set
    self.rules = list[Rule]() # set
    self.currentState = initialState # set
    self.headPosition = 0 # set
  def toString(self: TuringMachine, ) -> str: # function
    return ""
  initialState: str
  currentState: str
  headPosition: int
  haltState: str
  rules: list[Rule]
  tape: str
  def setTape(self: TuringMachine, tape: str) -> None: # procedure
    self.tape = tape # set
  def append(self: TuringMachine, rule: Rule) -> None: # procedure
    self.rules = self.rules.withAppend(rule) # set
  def singleStep(self: TuringMachine, ) -> None: # procedure
    rule = self.findMatchingRule() # variable definition
    self.execute(rule) # call procedure
  def isHalted(self: TuringMachine, ) -> bool: # function
    return self.currentState.equals(self.haltState)
  def findMatchingRule(self: TuringMachine, ) -> Rule: # function
    matches = self.rules.filter(lambda r: Rule => (r.currentState.equals(self.currentState)) and (r.currentSymbol.equals(self.tape[self.headPosition]))) # variable definition
    if matches.length() == 0:
      raise ElanRuntimeError("f"No rule matching state {self.currentState} and symbol {self.tape[self.headPosition]}"")
    return matches.head()
  def write(self: TuringMachine, newSymbol: str) -> None: # procedure
    hp = self.headPosition # constant
    self.tape = self.tape.subString(0, hp) + newSymbol + self.tape.subString(hp + 1, self.tape.length()) # set
  def execute(self: TuringMachine, rule: Rule) -> None: # procedure
    self.currentState = rule.nextState # set
    self.write(rule.writeSymbol) # call procedure
    if rule.move == Dir.right:
      self.headPosition = self.headPosition + 1 # set
      if self.headPosition >= self.tape.length():
        self.tape = self.tape + " " # set
    else:
      self.headPosition = self.headPosition - 1 # set
      if self.headPosition < 0:
        self.tape = " " + self.tape # set
        self.headPosition = 0 # set


class Rule

  currentState: str
  currentSymbol: str
  nextState: str
  writeSymbol: str
  move: Dir
  def __init__(self: Rule, currentState: str, currentSymbol: str, nextState: str, writeSymbol: str, move: Dir) -> None:
    self.currentState = currentState # set
    self.currentSymbol = currentSymbol # set
    self.nextState = nextState # set
    self.writeSymbol = writeSymbol # set
    self.move = move # set
  def toString(self: Rule, ) -> str: # function
    return f"{self.currentState},{self.currentSymbol},{self.nextState},{self.writeSymbol},{self.move}"


Dir = Enum('Dir', 'left, right')

# rename this method and define new transition rules to solve a different problem

def addRulesForRomanNumeralsInto(tm: TuringMachine) -> None: # procedure
  # name: Denary to Roman "Numerals", initial state = "init", accept state = "halt"
  # Example tape input: &nbsp;2024 (between 1 and 3999)
  tm.append(Rule("init", "0", "init", "0", Dir.right)) # call procedure
  tm.append(Rule("init", "1", "init", "1", Dir.right)) # call procedure
  tm.append(Rule("init", "2", "init", "2", Dir.right)) # call procedure
  tm.append(Rule("init", "3", "init", "3", Dir.right)) # call procedure
  tm.append(Rule("init", "4", "init", "4", Dir.right)) # call procedure
  tm.append(Rule("init", "5", "init", "5", Dir.right)) # call procedure
  tm.append(Rule("init", "6", "init", "6", Dir.right)) # call procedure
  tm.append(Rule("init", "7", "init", "7", Dir.right)) # call procedure
  tm.append(Rule("init", "8", "init", "8", Dir.right)) # call procedure
  tm.append(Rule("init", "9", "init", "9", Dir.right)) # call procedure
  tm.append(Rule("init", " ", "return", "]", Dir.left)) # call procedure
  # read next digit
  tm.append(Rule("readNextDigit", "0", "write0", "[", Dir.right)) # call procedure
  tm.append(Rule("readNextDigit", "1", "write1", "[", Dir.right)) # call procedure
  tm.append(Rule("readNextDigit", "2", "write2", "[", Dir.right)) # call procedure
  tm.append(Rule("readNextDigit", "3", "write3", "[", Dir.right)) # call procedure
  tm.append(Rule("readNextDigit", "4", "write4", "[", Dir.right)) # call procedure
  tm.append(Rule("readNextDigit", "5", "write5", "[", Dir.right)) # call procedure
  tm.append(Rule("readNextDigit", "6", "write6", "[", Dir.right)) # call procedure
  tm.append(Rule("readNextDigit", "7", "write7", "[", Dir.right)) # call procedure
  tm.append(Rule("readNextDigit", "8", "write8", "[", Dir.right)) # call procedure
  tm.append(Rule("readNextDigit", "9", "write9", "[", Dir.right)) # call procedure
  tm.append(Rule("readNextDigit", "]", "gotoEnd", " ", Dir.right)) # call procedure
  # write0
  tm.append(Rule("write0", "0", "write0", "0", Dir.right)) # call procedure
  tm.append(Rule("write0", "1", "write0", "1", Dir.right)) # call procedure
  tm.append(Rule("write0", "2", "write0", "2", Dir.right)) # call procedure
  tm.append(Rule("write0", "3", "write0", "3", Dir.right)) # call procedure
  tm.append(Rule("write0", "4", "write0", "4", Dir.right)) # call procedure
  tm.append(Rule("write0", "5", "write0", "5", Dir.right)) # call procedure
  tm.append(Rule("write0", "6", "write0", "6", Dir.right)) # call procedure
  tm.append(Rule("write0", "7", "write0", "7", Dir.right)) # call procedure
  tm.append(Rule("write0", "8", "write0", "8", Dir.right)) # call procedure
  tm.append(Rule("write0", "9", "write0", "9", Dir.right)) # call procedure
  tm.append(Rule("write0", "]", "write0", "]", Dir.right)) # call procedure
  tm.append(Rule("write0", "I", "write0", "I", Dir.right)) # call procedure
  tm.append(Rule("write0", "V", "write0", "V", Dir.right)) # call procedure
  tm.append(Rule("write0", "X", "write0", "X", Dir.right)) # call procedure
  tm.append(Rule("write0", "|", "write0", "|", Dir.right)) # call procedure
  tm.append(Rule("write0", " ", "return", "|", Dir.left)) # call procedure
  # write1
  tm.append(Rule("write1", "0", "write1", "0", Dir.right)) # call procedure
  tm.append(Rule("write1", "1", "write1", "1", Dir.right)) # call procedure
  tm.append(Rule("write1", "2", "write1", "2", Dir.right)) # call procedure
  tm.append(Rule("write1", "3", "write1", "3", Dir.right)) # call procedure
  tm.append(Rule("write1", "4", "write1", "4", Dir.right)) # call procedure
  tm.append(Rule("write1", "5", "write1", "5", Dir.right)) # call procedure
  tm.append(Rule("write1", "6", "write1", "6", Dir.right)) # call procedure
  tm.append(Rule("write1", "7", "write1", "7", Dir.right)) # call procedure
  tm.append(Rule("write1", "8", "write1", "8", Dir.right)) # call procedure
  tm.append(Rule("write1", "9", "write1", "9", Dir.right)) # call procedure
  tm.append(Rule("write1", "]", "write1", "]", Dir.right)) # call procedure
  tm.append(Rule("write1", "I", "write1", "I", Dir.right)) # call procedure
  tm.append(Rule("write1", "V", "write1", "V", Dir.right)) # call procedure
  tm.append(Rule("write1", "X", "write1", "X", Dir.right)) # call procedure
  tm.append(Rule("write1", "|", "write1", "|", Dir.right)) # call procedure
  tm.append(Rule("write1", " ", "write0", "I", Dir.right)) # call procedure
  # write2 &nbsp;
  tm.append(Rule("write2", "0", "write2", "0", Dir.right)) # call procedure
  tm.append(Rule("write2", "1", "write2", "1", Dir.right)) # call procedure
  tm.append(Rule("write2", "2", "write2", "2", Dir.right)) # call procedure
  tm.append(Rule("write2", "3", "write2", "3", Dir.right)) # call procedure
  tm.append(Rule("write2", "4", "write2", "4", Dir.right)) # call procedure
  tm.append(Rule("write2", "5", "write2", "5", Dir.right)) # call procedure
  tm.append(Rule("write2", "6", "write2", "6", Dir.right)) # call procedure
  tm.append(Rule("write2", "7", "write2", "7", Dir.right)) # call procedure
  tm.append(Rule("write2", "8", "write2", "8", Dir.right)) # call procedure
  tm.append(Rule("write2", "9", "write2", "9", Dir.right)) # call procedure
  tm.append(Rule("write2", "]", "write2", "]", Dir.right)) # call procedure
  tm.append(Rule("write2", "I", "write2", "I", Dir.right)) # call procedure
  tm.append(Rule("write2", "V", "write2", "V", Dir.right)) # call procedure
  tm.append(Rule("write2", "X", "write2", "X", Dir.right)) # call procedure
  tm.append(Rule("write2", "|", "write2", "|", Dir.right)) # call procedure
  tm.append(Rule("write2", " ", "write1", "I", Dir.right)) # call procedure
  # write3 &nbsp;
  tm.append(Rule("write3", "0", "write3", "0", Dir.right)) # call procedure
  tm.append(Rule("write3", "1", "write3", "1", Dir.right)) # call procedure
  tm.append(Rule("write3", "2", "write3", "2", Dir.right)) # call procedure
  tm.append(Rule("write3", "3", "write3", "3", Dir.right)) # call procedure
  tm.append(Rule("write3", "4", "write3", "4", Dir.right)) # call procedure
  tm.append(Rule("write3", "5", "write3", "5", Dir.right)) # call procedure
  tm.append(Rule("write3", "6", "write3", "6", Dir.right)) # call procedure
  tm.append(Rule("write3", "7", "write3", "7", Dir.right)) # call procedure
  tm.append(Rule("write3", "8", "write3", "8", Dir.right)) # call procedure
  tm.append(Rule("write3", "9", "write3", "9", Dir.right)) # call procedure
  tm.append(Rule("write3", "]", "write3", "]", Dir.right)) # call procedure
  tm.append(Rule("write3", "I", "write3", "I", Dir.right)) # call procedure
  tm.append(Rule("write3", "V", "write3", "V", Dir.right)) # call procedure
  tm.append(Rule("write3", "X", "write3", "X", Dir.right)) # call procedure
  tm.append(Rule("write3", "|", "write3", "|", Dir.right)) # call procedure
  tm.append(Rule("write3", " ", "write2", "I", Dir.right)) # call procedure
  # write4 &nbsp;
  tm.append(Rule("write4", "0", "write4", "0", Dir.right)) # call procedure
  tm.append(Rule("write4", "1", "write4", "1", Dir.right)) # call procedure
  tm.append(Rule("write4", "2", "write4", "2", Dir.right)) # call procedure
  tm.append(Rule("write4", "3", "write4", "3", Dir.right)) # call procedure
  tm.append(Rule("write4", "4", "write4", "4", Dir.right)) # call procedure
  tm.append(Rule("write4", "5", "write4", "5", Dir.right)) # call procedure
  tm.append(Rule("write4", "6", "write4", "6", Dir.right)) # call procedure
  tm.append(Rule("write4", "7", "write4", "7", Dir.right)) # call procedure
  tm.append(Rule("write4", "8", "write4", "8", Dir.right)) # call procedure
  tm.append(Rule("write4", "9", "write4", "9", Dir.right)) # call procedure
  tm.append(Rule("write4", "]", "write4", "]", Dir.right)) # call procedure
  tm.append(Rule("write4", "I", "write4", "I", Dir.right)) # call procedure
  tm.append(Rule("write4", "V", "write4", "V", Dir.right)) # call procedure
  tm.append(Rule("write4", "X", "write4", "X", Dir.right)) # call procedure
  tm.append(Rule("write4", "|", "write4", "|", Dir.right)) # call procedure
  tm.append(Rule("write4", " ", "write5", "I", Dir.right)) # call procedure
  # write5
  tm.append(Rule("write5", "0", "write5", "0", Dir.right)) # call procedure
  tm.append(Rule("write5", "1", "write5", "1", Dir.right)) # call procedure
  tm.append(Rule("write5", "2", "write5", "2", Dir.right)) # call procedure
  tm.append(Rule("write5", "3", "write5", "3", Dir.right)) # call procedure
  tm.append(Rule("write5", "4", "write5", "4", Dir.right)) # call procedure
  tm.append(Rule("write5", "5", "write5", "5", Dir.right)) # call procedure
  tm.append(Rule("write5", "6", "write5", "6", Dir.right)) # call procedure
  tm.append(Rule("write5", "7", "write5", "7", Dir.right)) # call procedure
  tm.append(Rule("write5", "8", "write5", "8", Dir.right)) # call procedure
  tm.append(Rule("write5", "9", "write5", "9", Dir.right)) # call procedure
  tm.append(Rule("write5", "]", "write5", "]", Dir.right)) # call procedure
  tm.append(Rule("write5", "I", "write5", "I", Dir.right)) # call procedure
  tm.append(Rule("write5", "V", "write5", "V", Dir.right)) # call procedure
  tm.append(Rule("write5", "X", "write5", "X", Dir.right)) # call procedure
  tm.append(Rule("write5", "|", "write5", "|", Dir.right)) # call procedure
  tm.append(Rule("write5", " ", "write0", "V", Dir.right)) # call procedure
  # write6
  tm.append(Rule("write6", "0", "write6", "0", Dir.right)) # call procedure
  tm.append(Rule("write6", "1", "write6", "1", Dir.right)) # call procedure
  tm.append(Rule("write6", "2", "write6", "2", Dir.right)) # call procedure
  tm.append(Rule("write6", "3", "write6", "3", Dir.right)) # call procedure
  tm.append(Rule("write6", "4", "write6", "4", Dir.right)) # call procedure
  tm.append(Rule("write6", "5", "write6", "5", Dir.right)) # call procedure
  tm.append(Rule("write6", "6", "write6", "6", Dir.right)) # call procedure
  tm.append(Rule("write6", "7", "write6", "7", Dir.right)) # call procedure
  tm.append(Rule("write6", "8", "write6", "8", Dir.right)) # call procedure
  tm.append(Rule("write6", "9", "write6", "9", Dir.right)) # call procedure
  tm.append(Rule("write6", "]", "write6", "]", Dir.right)) # call procedure
  tm.append(Rule("write6", "I", "write6", "I", Dir.right)) # call procedure
  tm.append(Rule("write6", "V", "write6", "V", Dir.right)) # call procedure
  tm.append(Rule("write6", "X", "write6", "X", Dir.right)) # call procedure
  tm.append(Rule("write6", "|", "write6", "|", Dir.right)) # call procedure
  tm.append(Rule("write6", " ", "write1", "V", Dir.right)) # call procedure
  # write7
  tm.append(Rule("write7", "0", "write7", "0", Dir.right)) # call procedure
  tm.append(Rule("write7", "1", "write7", "1", Dir.right)) # call procedure
  tm.append(Rule("write7", "2", "write7", "2", Dir.right)) # call procedure
  tm.append(Rule("write7", "3", "write7", "3", Dir.right)) # call procedure
  tm.append(Rule("write7", "4", "write7", "4", Dir.right)) # call procedure
  tm.append(Rule("write7", "5", "write7", "5", Dir.right)) # call procedure
  tm.append(Rule("write7", "6", "write7", "6", Dir.right)) # call procedure
  tm.append(Rule("write7", "7", "write7", "7", Dir.right)) # call procedure
  tm.append(Rule("write7", "8", "write7", "8", Dir.right)) # call procedure
  tm.append(Rule("write7", "9", "write7", "9", Dir.right)) # call procedure
  tm.append(Rule("write7", "]", "write7", "]", Dir.right)) # call procedure
  tm.append(Rule("write7", "I", "write7", "I", Dir.right)) # call procedure
  tm.append(Rule("write7", "V", "write7", "V", Dir.right)) # call procedure
  tm.append(Rule("write7", "X", "write7", "X", Dir.right)) # call procedure
  tm.append(Rule("write7", "|", "write7", "|", Dir.right)) # call procedure
  tm.append(Rule("write7", " ", "write2", "V", Dir.right)) # call procedure
  # write8
  tm.append(Rule("write8", "0", "write8", "0", Dir.right)) # call procedure
  tm.append(Rule("write8", "1", "write8", "1", Dir.right)) # call procedure
  tm.append(Rule("write8", "2", "write8", "2", Dir.right)) # call procedure
  tm.append(Rule("write8", "3", "write8", "3", Dir.right)) # call procedure
  tm.append(Rule("write8", "4", "write8", "4", Dir.right)) # call procedure
  tm.append(Rule("write8", "5", "write8", "5", Dir.right)) # call procedure
  tm.append(Rule("write8", "6", "write8", "6", Dir.right)) # call procedure
  tm.append(Rule("write8", "7", "write8", "7", Dir.right)) # call procedure
  tm.append(Rule("write8", "8", "write8", "8", Dir.right)) # call procedure
  tm.append(Rule("write8", "9", "write8", "9", Dir.right)) # call procedure
  tm.append(Rule("write8", "]", "write8", "]", Dir.right)) # call procedure
  tm.append(Rule("write8", "I", "write8", "I", Dir.right)) # call procedure
  tm.append(Rule("write8", "V", "write8", "V", Dir.right)) # call procedure
  tm.append(Rule("write8", "X", "write8", "X", Dir.right)) # call procedure
  tm.append(Rule("write8", "|", "write8", "|", Dir.right)) # call procedure
  tm.append(Rule("write8", " ", "write3", "V", Dir.right)) # call procedure
  # write9
  tm.append(Rule("write9", "0", "write9", "0", Dir.right)) # call procedure
  tm.append(Rule("write9", "1", "write9", "1", Dir.right)) # call procedure
  tm.append(Rule("write9", "2", "write9", "2", Dir.right)) # call procedure
  tm.append(Rule("write9", "3", "write9", "3", Dir.right)) # call procedure
  tm.append(Rule("write9", "4", "write9", "4", Dir.right)) # call procedure
  tm.append(Rule("write9", "5", "write9", "5", Dir.right)) # call procedure
  tm.append(Rule("write9", "6", "write9", "6", Dir.right)) # call procedure
  tm.append(Rule("write9", "7", "write9", "7", Dir.right)) # call procedure
  tm.append(Rule("write9", "8", "write9", "8", Dir.right)) # call procedure
  tm.append(Rule("write9", "9", "write9", "9", Dir.right)) # call procedure
  tm.append(Rule("write9", "]", "write9", "]", Dir.right)) # call procedure
  tm.append(Rule("write9", "I", "write9", "I", Dir.right)) # call procedure
  tm.append(Rule("write9", "V", "write9", "V", Dir.right)) # call procedure
  tm.append(Rule("write9", "X", "write9", "X", Dir.right)) # call procedure
  tm.append(Rule("write9", "|", "write9", "|", Dir.right)) # call procedure
  tm.append(Rule("write9", " ", "write10", "I", Dir.right)) # call procedure
  # Write10
  tm.append(Rule("write10", " ", "write0", "X", Dir.right)) # call procedure
  # return &nbsp;
  tm.append(Rule("return", "0", "return", "0", Dir.left)) # call procedure
  tm.append(Rule("return", "1", "return", "1", Dir.left)) # call procedure
  tm.append(Rule("return", "2", "return", "2", Dir.left)) # call procedure
  tm.append(Rule("return", "3", "return", "3", Dir.left)) # call procedure
  tm.append(Rule("return", "4", "return", "4", Dir.left)) # call procedure
  tm.append(Rule("return", "5", "return", "5", Dir.left)) # call procedure
  tm.append(Rule("return", "6", "return", "6", Dir.left)) # call procedure
  tm.append(Rule("return", "7", "return", "7", Dir.left)) # call procedure
  tm.append(Rule("return", "8", "return", "8", Dir.left)) # call procedure
  tm.append(Rule("return", "9", "return", "9", Dir.left)) # call procedure
  tm.append(Rule("return", "I", "return", "I", Dir.left)) # call procedure
  tm.append(Rule("return", "V", "return", "V", Dir.left)) # call procedure
  tm.append(Rule("return", "X", "return", "X", Dir.left)) # call procedure
  tm.append(Rule("return", "|", "return", "|", Dir.left)) # call procedure
  tm.append(Rule("return", "]", "return", "]", Dir.left)) # call procedure
  tm.append(Rule("return", "[", "readNextDigit", " ", Dir.right)) # call procedure
  tm.append(Rule("return", " ", "readNextDigit", " ", Dir.right)) # call procedure
  # gotoEnd - &nbsp;only after deleting input.
  tm.append(Rule("gotoEnd", "|", "gotoEnd", "|", Dir.right)) # call procedure
  tm.append(Rule("gotoEnd", "I", "gotoEnd", "I", Dir.right)) # call procedure
  tm.append(Rule("gotoEnd", "V", "gotoEnd", "V", Dir.right)) # call procedure
  tm.append(Rule("gotoEnd", "X", "gotoEnd", "X", Dir.right)) # call procedure
  tm.append(Rule("gotoEnd", " ", "deleteLastBar", " ", Dir.left)) # call procedure
  tm.append(Rule("deleteLastBar", "|", "symbols1", " ", Dir.left)) # call procedure
  # symbols1
  tm.append(Rule("symbols1", "I", "symbols1", "I", Dir.left)) # call procedure
  tm.append(Rule("symbols1", "V", "symbols1", "V", Dir.left)) # call procedure
  tm.append(Rule("symbols1", "X", "symbols1", "X", Dir.left)) # call procedure
  tm.append(Rule("symbols1", "|", "symbols10", "|", Dir.left)) # call procedure
  tm.append(Rule("symbols1", " ", "removeBars", " ", Dir.right)) # call procedure
  tm.append(Rule("symbols10", "I", "symbols10", "X", Dir.left)) # call procedure
  tm.append(Rule("symbols10", "V", "symbols10", "L", Dir.left)) # call procedure
  tm.append(Rule("symbols10", "X", "symbols10", "C", Dir.left)) # call procedure
  tm.append(Rule("symbols10", "|", "symbols100", "|", Dir.left)) # call procedure
  tm.append(Rule("symbols10", " ", "removeBars", " ", Dir.right)) # call procedure
  tm.append(Rule("symbols100", "I", "symbols100", "C", Dir.left)) # call procedure
  tm.append(Rule("symbols100", "V", "symbols100", "D", Dir.left)) # call procedure
  tm.append(Rule("symbols100", "X", "symbols100", "M", Dir.left)) # call procedure
  tm.append(Rule("symbols100", "|", "symbols1000", "|", Dir.left)) # call procedure
  tm.append(Rule("symbols100", " ", "removeBars", " ", Dir.right)) # call procedure
  tm.append(Rule("symbols1000", "I", "symbols1000", "M", Dir.left)) # call procedure
  tm.append(Rule("symbols1000", " ", "removeBars", " ", Dir.right)) # call procedure
  # Remove bars
  tm.append(Rule("removeBars", "|", "removeBars", " ", Dir.right)) # call procedure
  tm.append(Rule("removeBars", "I", "moveI", " ", Dir.right)) # call procedure
  tm.append(Rule("removeBars", "V", "moveV", " ", Dir.right)) # call procedure
  tm.append(Rule("removeBars", "X", "moveX", " ", Dir.right)) # call procedure
  tm.append(Rule("removeBars", "L", "moveL", " ", Dir.right)) # call procedure
  tm.append(Rule("removeBars", "C", "moveC", " ", Dir.right)) # call procedure
  tm.append(Rule("removeBars", "D", "moveD", " ", Dir.right)) # call procedure
  tm.append(Rule("removeBars", "M", "moveM", " ", Dir.right)) # call procedure
  tm.append(Rule("nextChar", "|", "nextChar", "|", Dir.right)) # call procedure
  tm.append(Rule("nextChar", " ", "checkForBars", " ", Dir.left)) # call procedure
  tm.append(Rule("nextChar", "I", "moveI", "|", Dir.right)) # call procedure
  tm.append(Rule("nextChar", "V", "moveV", "|", Dir.right)) # call procedure
  tm.append(Rule("nextChar", "X", "moveX", "|", Dir.right)) # call procedure
  tm.append(Rule("nextChar", "L", "moveL", "|", Dir.right)) # call procedure
  tm.append(Rule("nextChar", "C", "moveC", "|", Dir.right)) # call procedure
  tm.append(Rule("nextChar", "D", "moveD", "|", Dir.right)) # call procedure
  tm.append(Rule("nextChar", "M", "moveM", "|", Dir.right)) # call procedure
  # moveI
  tm.append(Rule("moveI", "|", "nextChar", "I", Dir.right)) # call procedure
  tm.append(Rule("moveI", "I", "writeI", "I", Dir.left)) # call procedure
  tm.append(Rule("moveI", "V", "writeI", "V", Dir.left)) # call procedure
  tm.append(Rule("moveI", "X", "writeI", "X", Dir.left)) # call procedure
  tm.append(Rule("moveI", " ", "writeI", " ", Dir.left)) # call procedure
  # moveV
  tm.append(Rule("moveV", "|", "nextChar", "V", Dir.right)) # call procedure
  tm.append(Rule("moveV", "I", "writeV", "I", Dir.left)) # call procedure
  tm.append(Rule("moveV", " ", "writeV", " ", Dir.left)) # call procedure
  # moveX &nbsp;
  tm.append(Rule("moveX", "|", "nextChar", "X", Dir.right)) # call procedure
  tm.append(Rule("moveX", "I", "writeX", "I", Dir.left)) # call procedure
  tm.append(Rule("moveX", "V", "writeX", "V", Dir.left)) # call procedure
  tm.append(Rule("moveX", "X", "writeX", "X", Dir.left)) # call procedure
  tm.append(Rule("moveX", "L", "writeX", "L", Dir.left)) # call procedure
  tm.append(Rule("moveX", "C", "writeX", "C", Dir.left)) # call procedure
  tm.append(Rule("moveX", " ", "writeX", " ", Dir.left)) # call procedure
  # moveL &nbsp;
  tm.append(Rule("moveL", "|", "nextChar", "L", Dir.right)) # call procedure
  tm.append(Rule("moveL", "I", "writeL", "I", Dir.left)) # call procedure
  tm.append(Rule("moveL", "V", "writeL", "V", Dir.left)) # call procedure
  tm.append(Rule("moveL", "X", "writeL", "X", Dir.left)) # call procedure
  tm.append(Rule("moveL", " ", "writeL", " ", Dir.left)) # call procedure
  # moveC &nbsp;
  tm.append(Rule("moveC", "|", "nextChar", "C", Dir.right)) # call procedure
  tm.append(Rule("moveC", "I", "writeC", "I", Dir.left)) # call procedure
  tm.append(Rule("moveC", "V", "writeC", "V", Dir.left)) # call procedure
  tm.append(Rule("moveC", "X", "writeC", "X", Dir.left)) # call procedure
  tm.append(Rule("moveC", "L", "writeC", "L", Dir.left)) # call procedure
  tm.append(Rule("moveC", "C", "writeC", "C", Dir.left)) # call procedure
  tm.append(Rule("moveC", "D", "writeC", "D", Dir.left)) # call procedure
  tm.append(Rule("moveC", "M", "writeC", "M", Dir.left)) # call procedure
  tm.append(Rule("moveC", " ", "writeC", " ", Dir.left)) # call procedure
  # moveD &nbsp;
  tm.append(Rule("moveD", "|", "nextChar", "D", Dir.right)) # call procedure
  tm.append(Rule("moveD", "I", "writeD", "I", Dir.left)) # call procedure
  tm.append(Rule("moveD", "V", "writeD", "V", Dir.left)) # call procedure
  tm.append(Rule("moveD", "X", "writeD", "X", Dir.left)) # call procedure
  tm.append(Rule("moveD", "L", "writeD", "L", Dir.left)) # call procedure
  tm.append(Rule("moveD", "C", "writeD", "C", Dir.left)) # call procedure
  tm.append(Rule("moveD", " ", "writeD", " ", Dir.left)) # call procedure
  # moveM
  tm.append(Rule("moveM", "|", "nextChar", "M", Dir.right)) # call procedure
  tm.append(Rule("moveM", "I", "writeM", "I", Dir.left)) # call procedure
  tm.append(Rule("moveM", "V", "writeM", "V", Dir.left)) # call procedure
  tm.append(Rule("moveM", "X", "writeM", "X", Dir.left)) # call procedure
  tm.append(Rule("moveM", "L", "writeM", "L", Dir.left)) # call procedure
  tm.append(Rule("moveM", "C", "writeM", "C", Dir.left)) # call procedure
  tm.append(Rule("moveM", "D", "writeM", "D", Dir.left)) # call procedure
  tm.append(Rule("moveM", "M", "writeM", "M", Dir.left)) # call procedure
  tm.append(Rule("moveM", " ", "writeM", " ", Dir.left)) # call procedure
  # write char
  tm.append(Rule("writeI", "|", "nextChar", "I", Dir.right)) # call procedure
  tm.append(Rule("writeI", " ", "nextChar", "I", Dir.right)) # call procedure
  tm.append(Rule("writeV", "|", "nextChar", "V", Dir.right)) # call procedure
  tm.append(Rule("writeV", " ", "nextChar", "V", Dir.right)) # call procedure
  tm.append(Rule("writeX", "|", "nextChar", "X", Dir.right)) # call procedure
  tm.append(Rule("writeX", " ", "nextChar", "X", Dir.right)) # call procedure
  tm.append(Rule("writeL", "|", "nextChar", "L", Dir.right)) # call procedure
  tm.append(Rule("writeL", " ", "nextChar", "L", Dir.right)) # call procedure
  tm.append(Rule("writeC", "|", "nextChar", "C", Dir.right)) # call procedure
  tm.append(Rule("writeC", " ", "nextChar", "C", Dir.right)) # call procedure
  tm.append(Rule("writeD", "|", "nextChar", "D", Dir.right)) # call procedure
  tm.append(Rule("writeD", " ", "nextChar", "D", Dir.right)) # call procedure
  tm.append(Rule("writeM", "|", "nextChar", "M", Dir.right)) # call procedure
  tm.append(Rule("writeM", " ", "nextChar", "M", Dir.right)) # call procedure
  # checkForBars &nbsp;
  tm.append(Rule("checkForBars", "I", "checkForBars", "I", Dir.left)) # call procedure
  tm.append(Rule("checkForBars", "V", "checkForBars", "V", Dir.left)) # call procedure
  tm.append(Rule("checkForBars", "X", "checkForBars", "X", Dir.left)) # call procedure
  tm.append(Rule("checkForBars", "L", "checkForBars", "L", Dir.left)) # call procedure
  tm.append(Rule("checkForBars", "C", "checkForBars", "C", Dir.left)) # call procedure
  tm.append(Rule("checkForBars", "D", "checkForBars", "D", Dir.left)) # call procedure
  tm.append(Rule("checkForBars", "M", "checkForBars", "M", Dir.left)) # call procedure
  tm.append(Rule("checkForBars", "|", "barFound", "|", Dir.left)) # call procedure
  tm.append(Rule("checkForBars", " ", "halt", " ", Dir.right)) # call procedure
  # barFound
  tm.append(Rule("barFound", "I", "barFound", "I", Dir.left)) # call procedure
  tm.append(Rule("barFound", "V", "barFound", "V", Dir.left)) # call procedure
  tm.append(Rule("barFound", "X", "barFound", "X", Dir.left)) # call procedure
  tm.append(Rule("barFound", "L", "barFound", "L", Dir.left)) # call procedure
  tm.append(Rule("barFound", "C", "barFound", "C", Dir.left)) # call procedure
  tm.append(Rule("barFound", "D", "barFound", "D", Dir.left)) # call procedure
  tm.append(Rule("barFound", "M", "barFound", "M", Dir.left)) # call procedure
  tm.append(Rule("barFound", "|", "barFound", "|", Dir.left)) # call procedure
  tm.append(Rule("barFound", " ", "removeBars", " ", Dir.right)) # call procedure
