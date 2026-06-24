# Python with Elan 2.0.0-beta1

def main() -> None:
  order = inputIntBetween("Enter order of dragon [1..12]: ", 1, 12) # variable definition
  clearPrintedText() # call procedure
  print(f"Dragon of order {order}")
  side = (75/pow(sqrt(2), order)) # variable definition
  corner = side/12.0/cos(45) # variable definition
  turns = left # variable definition
  for i in range(1, order + 1):
    turns = setTurns(turns) # reassign variable
  # end for
  t = Turtle() # variable definition
  setupTurtle(t, order) # call procedure
  drawDragon(t, order, turns, side, corner) # call procedure
# end main

left = "1" # constant

right = "0" # constant

def drawDragon(t: Turtle, order: int, turns: str, side: float, corner: float) -> None: # procedure
  p = (200.0/order).floor() # variable definition
  turnI = 0 # variable definition
  for turn in turns:
    turnI = (if_(turn.equals(left), 1, -1)) # reassign variable
    t.turn(-45*turnI) # call procedure
    t.move(corner) # call procedure
    t.turn(-45*turnI) # call procedure
    t.move(side) # call procedure
    sleep_ms(p) # call procedure
  # end for
  t.penUp() # call procedure
  t.hide() # call procedure
# end procedure

def setupTurtle(t: Turtle, order: int) -> None: # procedure
  t.turnToHeading(180 + order*45) # call procedure
  t.placeAt(-40, 20) # call procedure
  t.penColour(red) # call procedure
  t.penWidth(10.0/order) # call procedure
  t.penDown() # call procedure
  t.show() # call procedure
# end procedure

def setTurns(turns: str) -> str: # function
  turnsR = turns + left + reflect(turns) # variable definition
  # turnsR[0..turnsR.length() - 1]
  return turnsR.subString(0, turnsR.length() - 1)
# end function

def reflect(s: str) -> str: # function
  sR = "" # variable definition
  for i in range(1, s.length() + 1):
    sR = if_((s[i - 1]).equals(left), right, left) + sR # reassign variable
  # end for
  return sR
# end function

def test_setTurns(self) -> None:
  self.assertEqual(setTurns("1"), "11")
  self.assertEqual(setTurns("11"), "1110")
  self.assertEqual(setTurns("110"), "110110")
  self.assertEqual(setTurns("1101100"), "11011001110010")
# end test

def test_reflect(self) -> None:
  self.assertEqual(reflect("110"), "100")
  self.assertEqual(reflect("00001"), "01111")
# end test

main()
