# Python with Elan 2.0.0-beta4

# Use the w,a,s,d keys to change snake's direction

def main() -> None:
  blocks = BlockGraphics() # variable definition
  head = 2015 # variable definition
  tail = head # variable definition
  body = [head] # variable definition
  currentDir = "d" # variable definition
  gameOn = True # variable definition
  apple = 0 # variable definition
  changeApplePosition = True # variable definition
  while gameOn:
    while changeApplePosition:
      apple = squareNo(randint(0, 39), randint(0, 29)) # assignment
      if not body.contains(apple):
        changeApplePosition = False # assignment
      # end if
    # end while
    updateDisplay(blocks, head, tail, body, apple) # procedure call
    key = getKey() # variable definition
    if not key.equals("") and "wasd".contains(key):
      currentDir = key # assignment
    # end if
    tail = body[0] # assignment
    body.append(head) # procedure call
    head = getAdjacentSquare(head, currentDir) # assignment
    gameOn = not hasHitEdge(head) and not body.contains(head) # assignment
    if head.equals(apple):
      changeApplePosition = True # assignment
    else:
      body.removeAt(0) # procedure call
    # end if
    sleep_ms(150) # procedure call
  # end while
  print(f"Game Over! Score: {body.length() - 1}")
# end main

def updateDisplay(blocks: BlockGraphics, head: int, tail: int, body: list[int], apple: int) -> None: # procedure
  blocks.put(x_coord(head), y_coord(head), green) # procedure call
  tailColour = getTailColour(tail, body) # variable definition
  blocks.put(x_coord(tail), y_coord(tail), tailColour) # procedure call
  blocks.put(x_coord(apple), y_coord(apple), red) # procedure call
  blocks.display() # procedure call
# end procedure

def getTailColour(tail: int, body: list[int]) -> int: # function
  colour = white # variable definition
  if body[0].equals(tail):
    colour = green # assignment
  # end if
  return colour
# end function

def hasHitEdge(head: int) -> bool: # function
  headX = x_coord(head) # variable definition
  headY = y_coord(head) # variable definition
  return (headX < 0) or (headY < 0) or (headX > 39) or (headY > 29)
# end function

def getAdjacentSquare(sq: int, dir: str) -> int: # function
  newX = x_coord(sq) # variable definition
  newY = y_coord(sq) # variable definition
  if dir.equals("a"):
    newX = newX - 1 # assignment
  elif dir.equals("d"): # else if
    newX = newX + 1 # assignment
  elif dir.equals("w"): # else if
    newY = newY - 1 # assignment
  elif dir.equals("s"): # else if
    newY = newY + 1 # assignment
  # end if
  return squareNo(newX, newY)
# end function

def squareNo(x: int, y: int) -> int: # function
  return x*100 + y
# end function

def x_coord(sq: int) -> int: # function
  return divAsInt(sq, 100)
# end function

def y_coord(sq: int) -> int: # function
  return sq % 100
# end function

class Test_square(unittest.TestCase):
 def test_square(self) -> None:
  self.assertEqual(squareNo(0, 0), 0)
  self.assertEqual(squareNo(39, 29), 3929)
  self.assertEqual(squareNo(-1, 15), -85)
  self.assertEqual(squareNo(15, -1), 1499)
# end test

class Test_y(unittest.TestCase):
 def test_y(self) -> None:
  self.assertEqual(y_coord(0500), 0)
  self.assertEqual(y_coord(0507), 7)
  self.assertEqual(y_coord(-0109), -9)
  self.assertEqual(y_coord(1499), 99)
# end test

class Test_x(unittest.TestCase):
 def test_x(self) -> None:
  self.assertEqual(x_coord(0015), 0)
  self.assertEqual(x_coord(0500), 5)
  self.assertEqual(x_coord(0507), 5)
  self.assertEqual(x_coord(-0109), -2)
# end test

class Test_getTailColour(unittest.TestCase):
 def test_getTailColour(self) -> None:
  self.assertEqual(getTailColour(0304, [0304, 0305]), green)
  self.assertEqual(getTailColour(0304, [0305, 0306]), white)
# end test

class Test_hasHitEdge(unittest.TestCase):
 def test_hasHitEdge(self) -> None:
  self.assertEqual(hasHitEdge(0000), False)
  self.assertEqual(hasHitEdge(0029), False)
  self.assertEqual(hasHitEdge(3900), False)
  self.assertEqual(hasHitEdge(3929), False)
  self.assertEqual(hasHitEdge(-0105), True)
  self.assertEqual(hasHitEdge(0530), True)
  self.assertEqual(hasHitEdge(4005), True)
  self.assertEqual(hasHitEdge(0499), True)
  self.assertEqual(hasHitEdge(1499), True)
  self.assertEqual(hasHitEdge(-85), True)
# end test

class Test_getAdjacentSquare(unittest.TestCase):
 def test_getAdjacentSquare(self) -> None:
  sq = 2015 # variable definition
  self.assertEqual(getAdjacentSquare(sq, "w"), 2014)
  self.assertEqual(getAdjacentSquare(sq, "s"), 2016)
  self.assertEqual(getAdjacentSquare(sq, "a"), 1915)
  self.assertEqual(getAdjacentSquare(sq, "d"), 2115)
  # boundary
  self.assertEqual(getAdjacentSquare(0015, "a"), -85)
# end test

main()
