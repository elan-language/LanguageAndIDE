# 7e4614ac0542efcc75d6b3fd25c7ca51889d68a7ad9e8126540e463e4d02679a Elan 1.9.0 guest default_profile valid

# Turing Machine that converts a Year from decimal to roman numerals
# Run the program, enter the number to convert and watch the machine in action.
# This TM has 300+ transition rules! You can use the same TuringMachine class to solve
# a simpler task, just by writing rules in the same format:
# newRule("currentState", "readSymbol", "newState", "writeSymbol", DirectionForHeadMove)
def main -> None:  # [main]
  tm = new TuringMachine(initState, haltState) # [variable definition]
  addRulesForRomanNumeralsInto(tm) # [call procedure]}
  decimal = inputIntBetween("Enter a year:", 1, 3999) # [variable definition]
  tm.setTape(decimal.asString()) # [call procedure]}
  steps = 0 # [variable definition]
  while not tm.isHalted()
    rule = tm.findMatchingRule() # [variable definition]
    tm.singleStep() # [call procedure]}
    steps = steps + 1 # [assign variable]
    clearPrintedText() # [call procedure]}
    printLine(tm.tape) # [call procedure]}
    printTab(tm.headPosition - 1, "^\n") # [call procedure]}
    printLine("Step: {steps}\nState: {tm.currentState}\nRule applied: {rule.asString()}") # [call procedure]}
    pause(40) # [call procedure]}
  print "\n\nThe roman numeral equivalent for {decimal} is {tm.tape.trim()}"


initState = "init"

haltState = "halt"

class TuringMachine
  constructor(initialState: String, haltState: String)
    property.initialState = initialState # [assign variable]
    property.haltState = haltState # [assign variable]
    property.rules = empty ListImmutable<of Rule> # [assign variable]
    property.currentState = initialState # [assign variable]
    property.headPosition = 0 # [assign variable]
  end constructor

  initialState: String = None # [property]

  currentState: String = None # [property]

  headPosition: Int = None # [property]

  haltState: String = None # [property]

  rules: ListImmutable<of Rule> = None # [property]

  tape: String = None # [property]

  procedure setTape(tape: String)
    property.tape = tape # [assign variable]

  procedure append(rule: Rule)
    property.rules = property.rules.withAppend(rule) # [assign variable]

  procedure singleStep()
    rule = findMatchingRule() # [variable definition]
    execute(rule) # [call procedure]}

  function isHalted() returns Boolean
    return property.currentState is property.haltState
  end function

  function findMatchingRule() returns Rule
    matches = property.rules.filter(lambda r: Rule => (r.currentState is property.currentState) and (r.currentSymbol is property.tape[property.headPosition])) # [variable definition]
    if matches.length() is 0 then
      throw exception "No rule matching state {property.currentState} and symbol {property.tape[property.headPosition]}"
    return matches.head()
  end function

  procedure write(newSymbol: String)
    hp = property.headPosition # [variable definition]
    property.tape = property.tape[..hp] + newSymbol + property.tape[hp + 1..] # [assign variable]

  procedure execute(rule: Rule)
    property.currentState = rule.nextState # [assign variable]
    write(rule.writeSymbol) # [call procedure]}
    if rule.move is Dir.right then
      property.headPosition = property.headPosition + 1 # [assign variable]
      if property.headPosition >= property.tape.length() then
        property.tape = property.tape + " " # [assign variable]
    else
      property.headPosition = property.headPosition - 1 # [assign variable]
      if property.headPosition < 0 then
        property.tape = " " + property.tape # [assign variable]
        property.headPosition = 0 # [assign variable]

end class

record Rule
  currentState: String = None # [property]

  currentSymbol: String = None # [property]

  nextState: String = None # [property]

  writeSymbol: String = None # [property]

  move: Dir = None # [property]

  function asString() returns String
    return "{property.currentState},{property.currentSymbol},{property.nextState},{property.writeSymbol},{property.move}"
  end function

end record

def newRule(currentState: String, currentSymbol: String, nextState: String, writeSymbol: String, move: Dir) -> Rule:  # [function]
  return new Rule() with currentState set to currentState, currentSymbol set to currentSymbol, nextState set to nextState, writeSymbol set to writeSymbol, move set to move


Dir = Enum ('Dir', 'left, right'})

# rename this method and define new transition rules to solve a different problem
def addRulesForRomanNumeralsInto(tm: TuringMachine) -> None:  # [procedure]
  # name: Denary to Roman "Numerals", initial state = "init", accept state = "halt"
  # Example tape input:  2024 (between 1 and 3999)
  tm.append(newRule("init", "0", "init", "0", Dir.right)) # [call procedure]}
  tm.append(newRule("init", "1", "init", "1", Dir.right)) # [call procedure]}
  tm.append(newRule("init", "2", "init", "2", Dir.right)) # [call procedure]}
  tm.append(newRule("init", "3", "init", "3", Dir.right)) # [call procedure]}
  tm.append(newRule("init", "4", "init", "4", Dir.right)) # [call procedure]}
  tm.append(newRule("init", "5", "init", "5", Dir.right)) # [call procedure]}
  tm.append(newRule("init", "6", "init", "6", Dir.right)) # [call procedure]}
  tm.append(newRule("init", "7", "init", "7", Dir.right)) # [call procedure]}
  tm.append(newRule("init", "8", "init", "8", Dir.right)) # [call procedure]}
  tm.append(newRule("init", "9", "init", "9", Dir.right)) # [call procedure]}
  tm.append(newRule("init", " ", "return", "]", Dir.left)) # [call procedure]}
  # read next digit
  tm.append(newRule("readNextDigit", "0", "write0", "[", Dir.right)) # [call procedure]}
  tm.append(newRule("readNextDigit", "1", "write1", "[", Dir.right)) # [call procedure]}
  tm.append(newRule("readNextDigit", "2", "write2", "[", Dir.right)) # [call procedure]}
  tm.append(newRule("readNextDigit", "3", "write3", "[", Dir.right)) # [call procedure]}
  tm.append(newRule("readNextDigit", "4", "write4", "[", Dir.right)) # [call procedure]}
  tm.append(newRule("readNextDigit", "5", "write5", "[", Dir.right)) # [call procedure]}
  tm.append(newRule("readNextDigit", "6", "write6", "[", Dir.right)) # [call procedure]}
  tm.append(newRule("readNextDigit", "7", "write7", "[", Dir.right)) # [call procedure]}
  tm.append(newRule("readNextDigit", "8", "write8", "[", Dir.right)) # [call procedure]}
  tm.append(newRule("readNextDigit", "9", "write9", "[", Dir.right)) # [call procedure]}
  tm.append(newRule("readNextDigit", "]", "gotoEnd", " ", Dir.right)) # [call procedure]}
  # write0
  tm.append(newRule("write0", "0", "write0", "0", Dir.right)) # [call procedure]}
  tm.append(newRule("write0", "1", "write0", "1", Dir.right)) # [call procedure]}
  tm.append(newRule("write0", "2", "write0", "2", Dir.right)) # [call procedure]}
  tm.append(newRule("write0", "3", "write0", "3", Dir.right)) # [call procedure]}
  tm.append(newRule("write0", "4", "write0", "4", Dir.right)) # [call procedure]}
  tm.append(newRule("write0", "5", "write0", "5", Dir.right)) # [call procedure]}
  tm.append(newRule("write0", "6", "write0", "6", Dir.right)) # [call procedure]}
  tm.append(newRule("write0", "7", "write0", "7", Dir.right)) # [call procedure]}
  tm.append(newRule("write0", "8", "write0", "8", Dir.right)) # [call procedure]}
  tm.append(newRule("write0", "9", "write0", "9", Dir.right)) # [call procedure]}
  tm.append(newRule("write0", "]", "write0", "]", Dir.right)) # [call procedure]}
  tm.append(newRule("write0", "I", "write0", "I", Dir.right)) # [call procedure]}
  tm.append(newRule("write0", "V", "write0", "V", Dir.right)) # [call procedure]}
  tm.append(newRule("write0", "X", "write0", "X", Dir.right)) # [call procedure]}
  tm.append(newRule("write0", "|", "write0", "|", Dir.right)) # [call procedure]}
  tm.append(newRule("write0", " ", "return", "|", Dir.left)) # [call procedure]}
  # write1
  tm.append(newRule("write1", "0", "write1", "0", Dir.right)) # [call procedure]}
  tm.append(newRule("write1", "1", "write1", "1", Dir.right)) # [call procedure]}
  tm.append(newRule("write1", "2", "write1", "2", Dir.right)) # [call procedure]}
  tm.append(newRule("write1", "3", "write1", "3", Dir.right)) # [call procedure]}
  tm.append(newRule("write1", "4", "write1", "4", Dir.right)) # [call procedure]}
  tm.append(newRule("write1", "5", "write1", "5", Dir.right)) # [call procedure]}
  tm.append(newRule("write1", "6", "write1", "6", Dir.right)) # [call procedure]}
  tm.append(newRule("write1", "7", "write1", "7", Dir.right)) # [call procedure]}
  tm.append(newRule("write1", "8", "write1", "8", Dir.right)) # [call procedure]}
  tm.append(newRule("write1", "9", "write1", "9", Dir.right)) # [call procedure]}
  tm.append(newRule("write1", "]", "write1", "]", Dir.right)) # [call procedure]}
  tm.append(newRule("write1", "I", "write1", "I", Dir.right)) # [call procedure]}
  tm.append(newRule("write1", "V", "write1", "V", Dir.right)) # [call procedure]}
  tm.append(newRule("write1", "X", "write1", "X", Dir.right)) # [call procedure]}
  tm.append(newRule("write1", "|", "write1", "|", Dir.right)) # [call procedure]}
  tm.append(newRule("write1", " ", "write0", "I", Dir.right)) # [call procedure]}
  # write2 
  tm.append(newRule("write2", "0", "write2", "0", Dir.right)) # [call procedure]}
  tm.append(newRule("write2", "1", "write2", "1", Dir.right)) # [call procedure]}
  tm.append(newRule("write2", "2", "write2", "2", Dir.right)) # [call procedure]}
  tm.append(newRule("write2", "3", "write2", "3", Dir.right)) # [call procedure]}
  tm.append(newRule("write2", "4", "write2", "4", Dir.right)) # [call procedure]}
  tm.append(newRule("write2", "5", "write2", "5", Dir.right)) # [call procedure]}
  tm.append(newRule("write2", "6", "write2", "6", Dir.right)) # [call procedure]}
  tm.append(newRule("write2", "7", "write2", "7", Dir.right)) # [call procedure]}
  tm.append(newRule("write2", "8", "write2", "8", Dir.right)) # [call procedure]}
  tm.append(newRule("write2", "9", "write2", "9", Dir.right)) # [call procedure]}
  tm.append(newRule("write2", "]", "write2", "]", Dir.right)) # [call procedure]}
  tm.append(newRule("write2", "I", "write2", "I", Dir.right)) # [call procedure]}
  tm.append(newRule("write2", "V", "write2", "V", Dir.right)) # [call procedure]}
  tm.append(newRule("write2", "X", "write2", "X", Dir.right)) # [call procedure]}
  tm.append(newRule("write2", "|", "write2", "|", Dir.right)) # [call procedure]}
  tm.append(newRule("write2", " ", "write1", "I", Dir.right)) # [call procedure]}
  # write3 
  tm.append(newRule("write3", "0", "write3", "0", Dir.right)) # [call procedure]}
  tm.append(newRule("write3", "1", "write3", "1", Dir.right)) # [call procedure]}
  tm.append(newRule("write3", "2", "write3", "2", Dir.right)) # [call procedure]}
  tm.append(newRule("write3", "3", "write3", "3", Dir.right)) # [call procedure]}
  tm.append(newRule("write3", "4", "write3", "4", Dir.right)) # [call procedure]}
  tm.append(newRule("write3", "5", "write3", "5", Dir.right)) # [call procedure]}
  tm.append(newRule("write3", "6", "write3", "6", Dir.right)) # [call procedure]}
  tm.append(newRule("write3", "7", "write3", "7", Dir.right)) # [call procedure]}
  tm.append(newRule("write3", "8", "write3", "8", Dir.right)) # [call procedure]}
  tm.append(newRule("write3", "9", "write3", "9", Dir.right)) # [call procedure]}
  tm.append(newRule("write3", "]", "write3", "]", Dir.right)) # [call procedure]}
  tm.append(newRule("write3", "I", "write3", "I", Dir.right)) # [call procedure]}
  tm.append(newRule("write3", "V", "write3", "V", Dir.right)) # [call procedure]}
  tm.append(newRule("write3", "X", "write3", "X", Dir.right)) # [call procedure]}
  tm.append(newRule("write3", "|", "write3", "|", Dir.right)) # [call procedure]}
  tm.append(newRule("write3", " ", "write2", "I", Dir.right)) # [call procedure]}
  # write4 
  tm.append(newRule("write4", "0", "write4", "0", Dir.right)) # [call procedure]}
  tm.append(newRule("write4", "1", "write4", "1", Dir.right)) # [call procedure]}
  tm.append(newRule("write4", "2", "write4", "2", Dir.right)) # [call procedure]}
  tm.append(newRule("write4", "3", "write4", "3", Dir.right)) # [call procedure]}
  tm.append(newRule("write4", "4", "write4", "4", Dir.right)) # [call procedure]}
  tm.append(newRule("write4", "5", "write4", "5", Dir.right)) # [call procedure]}
  tm.append(newRule("write4", "6", "write4", "6", Dir.right)) # [call procedure]}
  tm.append(newRule("write4", "7", "write4", "7", Dir.right)) # [call procedure]}
  tm.append(newRule("write4", "8", "write4", "8", Dir.right)) # [call procedure]}
  tm.append(newRule("write4", "9", "write4", "9", Dir.right)) # [call procedure]}
  tm.append(newRule("write4", "]", "write4", "]", Dir.right)) # [call procedure]}
  tm.append(newRule("write4", "I", "write4", "I", Dir.right)) # [call procedure]}
  tm.append(newRule("write4", "V", "write4", "V", Dir.right)) # [call procedure]}
  tm.append(newRule("write4", "X", "write4", "X", Dir.right)) # [call procedure]}
  tm.append(newRule("write4", "|", "write4", "|", Dir.right)) # [call procedure]}
  tm.append(newRule("write4", " ", "write5", "I", Dir.right)) # [call procedure]}
  # write5
  tm.append(newRule("write5", "0", "write5", "0", Dir.right)) # [call procedure]}
  tm.append(newRule("write5", "1", "write5", "1", Dir.right)) # [call procedure]}
  tm.append(newRule("write5", "2", "write5", "2", Dir.right)) # [call procedure]}
  tm.append(newRule("write5", "3", "write5", "3", Dir.right)) # [call procedure]}
  tm.append(newRule("write5", "4", "write5", "4", Dir.right)) # [call procedure]}
  tm.append(newRule("write5", "5", "write5", "5", Dir.right)) # [call procedure]}
  tm.append(newRule("write5", "6", "write5", "6", Dir.right)) # [call procedure]}
  tm.append(newRule("write5", "7", "write5", "7", Dir.right)) # [call procedure]}
  tm.append(newRule("write5", "8", "write5", "8", Dir.right)) # [call procedure]}
  tm.append(newRule("write5", "9", "write5", "9", Dir.right)) # [call procedure]}
  tm.append(newRule("write5", "]", "write5", "]", Dir.right)) # [call procedure]}
  tm.append(newRule("write5", "I", "write5", "I", Dir.right)) # [call procedure]}
  tm.append(newRule("write5", "V", "write5", "V", Dir.right)) # [call procedure]}
  tm.append(newRule("write5", "X", "write5", "X", Dir.right)) # [call procedure]}
  tm.append(newRule("write5", "|", "write5", "|", Dir.right)) # [call procedure]}
  tm.append(newRule("write5", " ", "write0", "V", Dir.right)) # [call procedure]}
  # write6
  tm.append(newRule("write6", "0", "write6", "0", Dir.right)) # [call procedure]}
  tm.append(newRule("write6", "1", "write6", "1", Dir.right)) # [call procedure]}
  tm.append(newRule("write6", "2", "write6", "2", Dir.right)) # [call procedure]}
  tm.append(newRule("write6", "3", "write6", "3", Dir.right)) # [call procedure]}
  tm.append(newRule("write6", "4", "write6", "4", Dir.right)) # [call procedure]}
  tm.append(newRule("write6", "5", "write6", "5", Dir.right)) # [call procedure]}
  tm.append(newRule("write6", "6", "write6", "6", Dir.right)) # [call procedure]}
  tm.append(newRule("write6", "7", "write6", "7", Dir.right)) # [call procedure]}
  tm.append(newRule("write6", "8", "write6", "8", Dir.right)) # [call procedure]}
  tm.append(newRule("write6", "9", "write6", "9", Dir.right)) # [call procedure]}
  tm.append(newRule("write6", "]", "write6", "]", Dir.right)) # [call procedure]}
  tm.append(newRule("write6", "I", "write6", "I", Dir.right)) # [call procedure]}
  tm.append(newRule("write6", "V", "write6", "V", Dir.right)) # [call procedure]}
  tm.append(newRule("write6", "X", "write6", "X", Dir.right)) # [call procedure]}
  tm.append(newRule("write6", "|", "write6", "|", Dir.right)) # [call procedure]}
  tm.append(newRule("write6", " ", "write1", "V", Dir.right)) # [call procedure]}
  # write7
  tm.append(newRule("write7", "0", "write7", "0", Dir.right)) # [call procedure]}
  tm.append(newRule("write7", "1", "write7", "1", Dir.right)) # [call procedure]}
  tm.append(newRule("write7", "2", "write7", "2", Dir.right)) # [call procedure]}
  tm.append(newRule("write7", "3", "write7", "3", Dir.right)) # [call procedure]}
  tm.append(newRule("write7", "4", "write7", "4", Dir.right)) # [call procedure]}
  tm.append(newRule("write7", "5", "write7", "5", Dir.right)) # [call procedure]}
  tm.append(newRule("write7", "6", "write7", "6", Dir.right)) # [call procedure]}
  tm.append(newRule("write7", "7", "write7", "7", Dir.right)) # [call procedure]}
  tm.append(newRule("write7", "8", "write7", "8", Dir.right)) # [call procedure]}
  tm.append(newRule("write7", "9", "write7", "9", Dir.right)) # [call procedure]}
  tm.append(newRule("write7", "]", "write7", "]", Dir.right)) # [call procedure]}
  tm.append(newRule("write7", "I", "write7", "I", Dir.right)) # [call procedure]}
  tm.append(newRule("write7", "V", "write7", "V", Dir.right)) # [call procedure]}
  tm.append(newRule("write7", "X", "write7", "X", Dir.right)) # [call procedure]}
  tm.append(newRule("write7", "|", "write7", "|", Dir.right)) # [call procedure]}
  tm.append(newRule("write7", " ", "write2", "V", Dir.right)) # [call procedure]}
  # write8
  tm.append(newRule("write8", "0", "write8", "0", Dir.right)) # [call procedure]}
  tm.append(newRule("write8", "1", "write8", "1", Dir.right)) # [call procedure]}
  tm.append(newRule("write8", "2", "write8", "2", Dir.right)) # [call procedure]}
  tm.append(newRule("write8", "3", "write8", "3", Dir.right)) # [call procedure]}
  tm.append(newRule("write8", "4", "write8", "4", Dir.right)) # [call procedure]}
  tm.append(newRule("write8", "5", "write8", "5", Dir.right)) # [call procedure]}
  tm.append(newRule("write8", "6", "write8", "6", Dir.right)) # [call procedure]}
  tm.append(newRule("write8", "7", "write8", "7", Dir.right)) # [call procedure]}
  tm.append(newRule("write8", "8", "write8", "8", Dir.right)) # [call procedure]}
  tm.append(newRule("write8", "9", "write8", "9", Dir.right)) # [call procedure]}
  tm.append(newRule("write8", "]", "write8", "]", Dir.right)) # [call procedure]}
  tm.append(newRule("write8", "I", "write8", "I", Dir.right)) # [call procedure]}
  tm.append(newRule("write8", "V", "write8", "V", Dir.right)) # [call procedure]}
  tm.append(newRule("write8", "X", "write8", "X", Dir.right)) # [call procedure]}
  tm.append(newRule("write8", "|", "write8", "|", Dir.right)) # [call procedure]}
  tm.append(newRule("write8", " ", "write3", "V", Dir.right)) # [call procedure]}
  # write9
  tm.append(newRule("write9", "0", "write9", "0", Dir.right)) # [call procedure]}
  tm.append(newRule("write9", "1", "write9", "1", Dir.right)) # [call procedure]}
  tm.append(newRule("write9", "2", "write9", "2", Dir.right)) # [call procedure]}
  tm.append(newRule("write9", "3", "write9", "3", Dir.right)) # [call procedure]}
  tm.append(newRule("write9", "4", "write9", "4", Dir.right)) # [call procedure]}
  tm.append(newRule("write9", "5", "write9", "5", Dir.right)) # [call procedure]}
  tm.append(newRule("write9", "6", "write9", "6", Dir.right)) # [call procedure]}
  tm.append(newRule("write9", "7", "write9", "7", Dir.right)) # [call procedure]}
  tm.append(newRule("write9", "8", "write9", "8", Dir.right)) # [call procedure]}
  tm.append(newRule("write9", "9", "write9", "9", Dir.right)) # [call procedure]}
  tm.append(newRule("write9", "]", "write9", "]", Dir.right)) # [call procedure]}
  tm.append(newRule("write9", "I", "write9", "I", Dir.right)) # [call procedure]}
  tm.append(newRule("write9", "V", "write9", "V", Dir.right)) # [call procedure]}
  tm.append(newRule("write9", "X", "write9", "X", Dir.right)) # [call procedure]}
  tm.append(newRule("write9", "|", "write9", "|", Dir.right)) # [call procedure]}
  tm.append(newRule("write9", " ", "write10", "I", Dir.right)) # [call procedure]}
  # Write10
  tm.append(newRule("write10", " ", "write0", "X", Dir.right)) # [call procedure]}
  # return 
  tm.append(newRule("return", "0", "return", "0", Dir.left)) # [call procedure]}
  tm.append(newRule("return", "1", "return", "1", Dir.left)) # [call procedure]}
  tm.append(newRule("return", "2", "return", "2", Dir.left)) # [call procedure]}
  tm.append(newRule("return", "3", "return", "3", Dir.left)) # [call procedure]}
  tm.append(newRule("return", "4", "return", "4", Dir.left)) # [call procedure]}
  tm.append(newRule("return", "5", "return", "5", Dir.left)) # [call procedure]}
  tm.append(newRule("return", "6", "return", "6", Dir.left)) # [call procedure]}
  tm.append(newRule("return", "7", "return", "7", Dir.left)) # [call procedure]}
  tm.append(newRule("return", "8", "return", "8", Dir.left)) # [call procedure]}
  tm.append(newRule("return", "9", "return", "9", Dir.left)) # [call procedure]}
  tm.append(newRule("return", "I", "return", "I", Dir.left)) # [call procedure]}
  tm.append(newRule("return", "V", "return", "V", Dir.left)) # [call procedure]}
  tm.append(newRule("return", "X", "return", "X", Dir.left)) # [call procedure]}
  tm.append(newRule("return", "|", "return", "|", Dir.left)) # [call procedure]}
  tm.append(newRule("return", "]", "return", "]", Dir.left)) # [call procedure]}
  tm.append(newRule("return", "[", "readNextDigit", " ", Dir.right)) # [call procedure]}
  tm.append(newRule("return", " ", "readNextDigit", " ", Dir.right)) # [call procedure]}
  # gotoEnd -  only after deleting input.
  tm.append(newRule("gotoEnd", "|", "gotoEnd", "|", Dir.right)) # [call procedure]}
  tm.append(newRule("gotoEnd", "I", "gotoEnd", "I", Dir.right)) # [call procedure]}
  tm.append(newRule("gotoEnd", "V", "gotoEnd", "V", Dir.right)) # [call procedure]}
  tm.append(newRule("gotoEnd", "X", "gotoEnd", "X", Dir.right)) # [call procedure]}
  tm.append(newRule("gotoEnd", " ", "deleteLastBar", " ", Dir.left)) # [call procedure]}
  tm.append(newRule("deleteLastBar", "|", "symbols1", " ", Dir.left)) # [call procedure]}
  # symbols1
  tm.append(newRule("symbols1", "I", "symbols1", "I", Dir.left)) # [call procedure]}
  tm.append(newRule("symbols1", "V", "symbols1", "V", Dir.left)) # [call procedure]}
  tm.append(newRule("symbols1", "X", "symbols1", "X", Dir.left)) # [call procedure]}
  tm.append(newRule("symbols1", "|", "symbols10", "|", Dir.left)) # [call procedure]}
  tm.append(newRule("symbols1", " ", "removeBars", " ", Dir.right)) # [call procedure]}
  tm.append(newRule("symbols10", "I", "symbols10", "X", Dir.left)) # [call procedure]}
  tm.append(newRule("symbols10", "V", "symbols10", "L", Dir.left)) # [call procedure]}
  tm.append(newRule("symbols10", "X", "symbols10", "C", Dir.left)) # [call procedure]}
  tm.append(newRule("symbols10", "|", "symbols100", "|", Dir.left)) # [call procedure]}
  tm.append(newRule("symbols10", " ", "removeBars", " ", Dir.right)) # [call procedure]}
  tm.append(newRule("symbols100", "I", "symbols100", "C", Dir.left)) # [call procedure]}
  tm.append(newRule("symbols100", "V", "symbols100", "D", Dir.left)) # [call procedure]}
  tm.append(newRule("symbols100", "X", "symbols100", "M", Dir.left)) # [call procedure]}
  tm.append(newRule("symbols100", "|", "symbols1000", "|", Dir.left)) # [call procedure]}
  tm.append(newRule("symbols100", " ", "removeBars", " ", Dir.right)) # [call procedure]}
  tm.append(newRule("symbols1000", "I", "symbols1000", "M", Dir.left)) # [call procedure]}
  tm.append(newRule("symbols1000", " ", "removeBars", " ", Dir.right)) # [call procedure]}
  # Remove bars
  tm.append(newRule("removeBars", "|", "removeBars", " ", Dir.right)) # [call procedure]}
  tm.append(newRule("removeBars", "I", "moveI", " ", Dir.right)) # [call procedure]}
  tm.append(newRule("removeBars", "V", "moveV", " ", Dir.right)) # [call procedure]}
  tm.append(newRule("removeBars", "X", "moveX", " ", Dir.right)) # [call procedure]}
  tm.append(newRule("removeBars", "L", "moveL", " ", Dir.right)) # [call procedure]}
  tm.append(newRule("removeBars", "C", "moveC", " ", Dir.right)) # [call procedure]}
  tm.append(newRule("removeBars", "D", "moveD", " ", Dir.right)) # [call procedure]}
  tm.append(newRule("removeBars", "M", "moveM", " ", Dir.right)) # [call procedure]}
  tm.append(newRule("nextChar", "|", "nextChar", "|", Dir.right)) # [call procedure]}
  tm.append(newRule("nextChar", " ", "checkForBars", " ", Dir.left)) # [call procedure]}
  tm.append(newRule("nextChar", "I", "moveI", "|", Dir.right)) # [call procedure]}
  tm.append(newRule("nextChar", "V", "moveV", "|", Dir.right)) # [call procedure]}
  tm.append(newRule("nextChar", "X", "moveX", "|", Dir.right)) # [call procedure]}
  tm.append(newRule("nextChar", "L", "moveL", "|", Dir.right)) # [call procedure]}
  tm.append(newRule("nextChar", "C", "moveC", "|", Dir.right)) # [call procedure]}
  tm.append(newRule("nextChar", "D", "moveD", "|", Dir.right)) # [call procedure]}
  tm.append(newRule("nextChar", "M", "moveM", "|", Dir.right)) # [call procedure]}
  # moveI
  tm.append(newRule("moveI", "|", "nextChar", "I", Dir.right)) # [call procedure]}
  tm.append(newRule("moveI", "I", "writeI", "I", Dir.left)) # [call procedure]}
  tm.append(newRule("moveI", "V", "writeI", "V", Dir.left)) # [call procedure]}
  tm.append(newRule("moveI", "X", "writeI", "X", Dir.left)) # [call procedure]}
  tm.append(newRule("moveI", " ", "writeI", " ", Dir.left)) # [call procedure]}
  # moveV
  tm.append(newRule("moveV", "|", "nextChar", "V", Dir.right)) # [call procedure]}
  tm.append(newRule("moveV", "I", "writeV", "I", Dir.left)) # [call procedure]}
  tm.append(newRule("moveV", " ", "writeV", " ", Dir.left)) # [call procedure]}
  # moveX 
  tm.append(newRule("moveX", "|", "nextChar", "X", Dir.right)) # [call procedure]}
  tm.append(newRule("moveX", "I", "writeX", "I", Dir.left)) # [call procedure]}
  tm.append(newRule("moveX", "V", "writeX", "V", Dir.left)) # [call procedure]}
  tm.append(newRule("moveX", "X", "writeX", "X", Dir.left)) # [call procedure]}
  tm.append(newRule("moveX", "L", "writeX", "L", Dir.left)) # [call procedure]}
  tm.append(newRule("moveX", "C", "writeX", "C", Dir.left)) # [call procedure]}
  tm.append(newRule("moveX", " ", "writeX", " ", Dir.left)) # [call procedure]}
  # moveL 
  tm.append(newRule("moveL", "|", "nextChar", "L", Dir.right)) # [call procedure]}
  tm.append(newRule("moveL", "I", "writeL", "I", Dir.left)) # [call procedure]}
  tm.append(newRule("moveL", "V", "writeL", "V", Dir.left)) # [call procedure]}
  tm.append(newRule("moveL", "X", "writeL", "X", Dir.left)) # [call procedure]}
  tm.append(newRule("moveL", " ", "writeL", " ", Dir.left)) # [call procedure]}
  # moveC 
  tm.append(newRule("moveC", "|", "nextChar", "C", Dir.right)) # [call procedure]}
  tm.append(newRule("moveC", "I", "writeC", "I", Dir.left)) # [call procedure]}
  tm.append(newRule("moveC", "V", "writeC", "V", Dir.left)) # [call procedure]}
  tm.append(newRule("moveC", "X", "writeC", "X", Dir.left)) # [call procedure]}
  tm.append(newRule("moveC", "L", "writeC", "L", Dir.left)) # [call procedure]}
  tm.append(newRule("moveC", "C", "writeC", "C", Dir.left)) # [call procedure]}
  tm.append(newRule("moveC", "D", "writeC", "D", Dir.left)) # [call procedure]}
  tm.append(newRule("moveC", "M", "writeC", "M", Dir.left)) # [call procedure]}
  tm.append(newRule("moveC", " ", "writeC", " ", Dir.left)) # [call procedure]}
  # moveD 
  tm.append(newRule("moveD", "|", "nextChar", "D", Dir.right)) # [call procedure]}
  tm.append(newRule("moveD", "I", "writeD", "I", Dir.left)) # [call procedure]}
  tm.append(newRule("moveD", "V", "writeD", "V", Dir.left)) # [call procedure]}
  tm.append(newRule("moveD", "X", "writeD", "X", Dir.left)) # [call procedure]}
  tm.append(newRule("moveD", "L", "writeD", "L", Dir.left)) # [call procedure]}
  tm.append(newRule("moveD", "C", "writeD", "C", Dir.left)) # [call procedure]}
  tm.append(newRule("moveD", " ", "writeD", " ", Dir.left)) # [call procedure]}
  # moveM
  tm.append(newRule("moveM", "|", "nextChar", "M", Dir.right)) # [call procedure]}
  tm.append(newRule("moveM", "I", "writeM", "I", Dir.left)) # [call procedure]}
  tm.append(newRule("moveM", "V", "writeM", "V", Dir.left)) # [call procedure]}
  tm.append(newRule("moveM", "X", "writeM", "X", Dir.left)) # [call procedure]}
  tm.append(newRule("moveM", "L", "writeM", "L", Dir.left)) # [call procedure]}
  tm.append(newRule("moveM", "C", "writeM", "C", Dir.left)) # [call procedure]}
  tm.append(newRule("moveM", "D", "writeM", "D", Dir.left)) # [call procedure]}
  tm.append(newRule("moveM", "M", "writeM", "M", Dir.left)) # [call procedure]}
  tm.append(newRule("moveM", " ", "writeM", " ", Dir.left)) # [call procedure]}
  # write char
  tm.append(newRule("writeI", "|", "nextChar", "I", Dir.right)) # [call procedure]}
  tm.append(newRule("writeI", " ", "nextChar", "I", Dir.right)) # [call procedure]}
  tm.append(newRule("writeV", "|", "nextChar", "V", Dir.right)) # [call procedure]}
  tm.append(newRule("writeV", " ", "nextChar", "V", Dir.right)) # [call procedure]}
  tm.append(newRule("writeX", "|", "nextChar", "X", Dir.right)) # [call procedure]}
  tm.append(newRule("writeX", " ", "nextChar", "X", Dir.right)) # [call procedure]}
  tm.append(newRule("writeL", "|", "nextChar", "L", Dir.right)) # [call procedure]}
  tm.append(newRule("writeL", " ", "nextChar", "L", Dir.right)) # [call procedure]}
  tm.append(newRule("writeC", "|", "nextChar", "C", Dir.right)) # [call procedure]}
  tm.append(newRule("writeC", " ", "nextChar", "C", Dir.right)) # [call procedure]}
  tm.append(newRule("writeD", "|", "nextChar", "D", Dir.right)) # [call procedure]}
  tm.append(newRule("writeD", " ", "nextChar", "D", Dir.right)) # [call procedure]}
  tm.append(newRule("writeM", "|", "nextChar", "M", Dir.right)) # [call procedure]}
  tm.append(newRule("writeM", " ", "nextChar", "M", Dir.right)) # [call procedure]}
  # checkForBars 
  tm.append(newRule("checkForBars", "I", "checkForBars", "I", Dir.left)) # [call procedure]}
  tm.append(newRule("checkForBars", "V", "checkForBars", "V", Dir.left)) # [call procedure]}
  tm.append(newRule("checkForBars", "X", "checkForBars", "X", Dir.left)) # [call procedure]}
  tm.append(newRule("checkForBars", "L", "checkForBars", "L", Dir.left)) # [call procedure]}
  tm.append(newRule("checkForBars", "C", "checkForBars", "C", Dir.left)) # [call procedure]}
  tm.append(newRule("checkForBars", "D", "checkForBars", "D", Dir.left)) # [call procedure]}
  tm.append(newRule("checkForBars", "M", "checkForBars", "M", Dir.left)) # [call procedure]}
  tm.append(newRule("checkForBars", "|", "barFound", "|", Dir.left)) # [call procedure]}
  tm.append(newRule("checkForBars", " ", "halt", " ", Dir.right)) # [call procedure]}
  # barFound
  tm.append(newRule("barFound", "I", "barFound", "I", Dir.left)) # [call procedure]}
  tm.append(newRule("barFound", "V", "barFound", "V", Dir.left)) # [call procedure]}
  tm.append(newRule("barFound", "X", "barFound", "X", Dir.left)) # [call procedure]}
  tm.append(newRule("barFound", "L", "barFound", "L", Dir.left)) # [call procedure]}
  tm.append(newRule("barFound", "C", "barFound", "C", Dir.left)) # [call procedure]}
  tm.append(newRule("barFound", "D", "barFound", "D", Dir.left)) # [call procedure]}
  tm.append(newRule("barFound", "M", "barFound", "M", Dir.left)) # [call procedure]}
  tm.append(newRule("barFound", "|", "barFound", "|", Dir.left)) # [call procedure]}
  tm.append(newRule("barFound", " ", "removeBars", " ", Dir.right)) # [call procedure]}


