# 8b49524307bd824e509786717a42c5d40a3e4fda64aa2bf3100d50843f6d905d Python with Elan 2.0.0-beta5 valid

def main() -> None:
  order = inputIntBetween("Enter order of dragon [1..12]: ", 1, 12)
  clearPrintedText()
  print(f"Dragon of order {order}")
  side = (75/pow(sqrt(2), order))
  corner = side/12.0/cos(45)
  turns = left
  for i in range(1, order + 1):
    turns = setTurns(turns)
  # end for 
  t = Turtle()
  setupTurtle(t, order)
  drawDragon(t, order, turns, side, corner)
# end main 

left = "1"

right = "0"

def drawDragon(t: Turtle, order: int, turns: str, side: float, corner: float) -> None:
  p = (200.0/order).floor()
  turnI = 0
  for turn in turns:
    turnI = (1 if turn.equals(left) else -1)
    t.turn(-45)
    t.move(corner)
    t.turn(-45)
    t.move(side)
    sleep_ms(p)
  # end for 
  t.penUp()
  t.hide()
# end procedure 

def setupTurtle(t: Turtle, order: int) -> None:
  t.turnToHeading(180 + order*45)
  t.placeAt(-40, 20)
  t.penColour(red)
  t.penWidth(10.0/order)
  t.penDown()
  t.show()
# end procedure 

def setTurns(turns: str) -> str:
  turnsR = turns + left + reflect(turns)
  # turnsR[0..turnsR.length() - 1]
  return turnsR.subString(0, turnsR.length() - 1)
# end function 

def reflect(s: str) -> str:
  sR = ""
  for i in range(1, s.length() + 1):
    inverse = right if (s[i - 1]).equals(left) else left
    sR = inverse + sR
  # end for 
  return sR
# end function 

class Test_setTurns(unittest.TestCase): def test_setTurns(self) -> None:
  self.assertEqual(setTurns("1"), "11")
  self.assertEqual(setTurns("11"), "1110")
  self.assertEqual(setTurns("110"), "110110")
  self.assertEqual(setTurns("1101100"), "11011001110010")
# end test 

class Test_reflect(unittest.TestCase): def test_reflect(self) -> None:
  self.assertEqual(reflect("110"), "100")
  self.assertEqual(reflect("00001"), "01111")
# end test 

main()
