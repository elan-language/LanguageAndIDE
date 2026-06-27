# Python with Elan 2.0.0-beta1

# Use the w,a,s,d keys to change snake's direction

def main() -> None:
  blocks = createBlockGraphics(white) # variable definition
  head = [20, 15] # variable definition
  tail = head # variable definition
  body = [head] # variable definition
  currentDir = Direction.right # variable definition
  gameOn = True # variable definition
  apple = [0, 0] # variable definition
  setAppleToRandomPosition(apple, body) # call procedure
  while gameOn:
    updateDisplay(blocks, head, tail, body, apple) # call procedure
    currentDirRef = AsRef[Direction](currentDir) # variable definition
    headRef = AsRef[list[int]](head) # variable definition
    tailRef = AsRef[list[int]](tail) # variable definition
    updateSnake(currentDirRef, tailRef, headRef, body) # call procedure
    head = headRef.value() # assignment
    tail = tailRef.value() # assignment
    currentDir = currentDirRef.value() # assignment
    gameOn = not hasHitEdge(head[0], head[1]) and not body.contains(head) # assignment
    if head.equals(apple):
      setAppleToRandomPosition(apple, body) # call procedure
    else:
      body.removeAt(0) # call procedure
    # end if
    sleep_ms(150) # call procedure
  # end while
  print(f"Game Over! Score: {body.length() - 1}")
# end main

def updateSnake(currentDirRef: AsRef[Direction], tailRef: AsRef[list[int]], headRef: AsRef[list[int]], body: list[list[int]]) -> None: # procedure
  head = headRef.value() # variable definition
  tail = tailRef.value() # variable definition
  currentDir = currentDirRef.value() # variable definition
  currentDir = directionByKey(currentDir, getKey()) # assignment
  tailRef.set(body[0]) # call procedure
  body.append(head) # call procedure
  headRef.set(getAdjacentSquare(head, currentDir)) # call procedure
  currentDirRef.set(currentDir) # call procedure
# end procedure

def updateDisplay(blocks: list[list[int]], head: list[int], tail: list[int], body: list[list[int]], apple: list[int]) -> None: # procedure
  blocks[head[0]][head[1]] = green # assignment
  tailColour = getTailColour(tail, body) # variable definition
  blocks[tail[0]][tail[1]] = tailColour # assignment
  blocks[apple[0]][apple[1]] = red # assignment
  displayBlocks(blocks) # call procedure
# end procedure

def setAppleToRandomPosition(apple: list[int], body: list[list[int]]) -> None: # procedure
  changePosition = True # variable definition
  while changePosition:
    apple[0] = randint(0, 39) # assignment
    apple[1] = randint(0, 29) # assignment
    if not body.contains(apple):
      changePosition = False # assignment
    # end if
  # end while
# end procedure

def getTailColour(tail: list[int], body: list[list[int]]) -> int: # function
  colour = white # variable definition
  if body[0].equals(tail):
    colour = green # assignment
  # end if
  return colour
# end function

def hasHitEdge(headX: int, headY: int) -> bool: # function
  return (headX < 0) or (headY < 0) or (headX > 39) or (headY > 29)
# end function

def getAdjacentSquare(sq: list[int], dir: Direction) -> list[int]: # function
  newX = sq[0] # variable definition
  newY = sq[1] # variable definition
  if dir == Direction.left:
    newX = newX - 1 # assignment
  elif dir == Direction.right: # else if
    newX = newX + 1 # assignment
  elif dir == Direction.up: # else if
    newY = newY - 1 # assignment
  elif dir == Direction.down: # else if
    newY = newY + 1 # assignment
  # end if
  return [newX, newY]
# end function

def directionByKey(current: Direction, key: str) -> Direction: # function
  dirn = current # variable definition
  if key.equals("w"):
    dirn = Direction.up # assignment
  elif key.equals("s"): # else if
    dirn = Direction.down # assignment
  elif key.equals("a"): # else if
    dirn = Direction.left # assignment
  elif key.equals("d"): # else if
    dirn = Direction.right # assignment
  # end if
  return dirn
# end function

class Direction(Enum):
  up = 1
  down = 2
  left = 3
  right = 4

class Test_getTailColour(unittest.TestCase):
 def test_getTailColour(self) -> None:
  self.assertEqual(getTailColour([3, 4], [[3, 4], [3, 5]]), green)
  self.assertEqual(getTailColour([3, 4], [[3, 5], [3, 6]]), white)
# end test

class Test_hasHitEdge(unittest.TestCase):
 def test_hasHitEdge(self) -> None:
  self.assertEqual(hasHitEdge(0, 0), False)
  self.assertEqual(hasHitEdge(0, 29), False)
  self.assertEqual(hasHitEdge(39, 0), False)
  self.assertEqual(hasHitEdge(29, 29), False)
  self.assertEqual(hasHitEdge(-1, 5), True)
  self.assertEqual(hasHitEdge(5, 30), True)
  self.assertEqual(hasHitEdge(40, 5), True)
  self.assertEqual(hasHitEdge(5, -1), True)
# end test

class Test_getAdjacentSquare(unittest.TestCase):
 def test_getAdjacentSquare(self) -> None:
  sq = [20, 15] # variable definition
  self.assertEqual(getAdjacentSquare(sq, Direction.up), [20, 14])
  self.assertEqual(getAdjacentSquare(sq, Direction.down), [20, 16])
  self.assertEqual(getAdjacentSquare(sq, Direction.left), [19, 15])
  self.assertEqual(getAdjacentSquare(sq, Direction.right), [21, 15])
  # boundary
  self.assertEqual(getAdjacentSquare([0, 15], Direction.left), [-1, 15])
# end test

class Test_directionByKey(unittest.TestCase):
 def test_directionByKey(self) -> None:
  current = Direction.up # variable definition
  self.assertEqual(directionByKey(current, ""), Direction.up)
  self.assertEqual(directionByKey(current, "x"), Direction.up)
  self.assertEqual(directionByKey(current, "w"), Direction.up)
  self.assertEqual(directionByKey(current, "s"), Direction.down)
  self.assertEqual(directionByKey(current, "a"), Direction.left)
  self.assertEqual(directionByKey(current, "d"), Direction.right)
  self.assertEqual(directionByKey(current, "D"), Direction.up)
# end test

main()
