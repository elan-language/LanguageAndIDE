# Python with Elan 2.0.0-alpha5

# Use the w,a,s,d keys to change snake's direction

def main() -> None:
  blocks = createBlockGraphics(white) # variable definition
  head = [20, 15] # variable definition
  tail = head # variable definition
  body = [head] # variable definition
  currentDir = "right" # variable definition
  gameOn = True # variable definition
  apple = [0, 0] # variable definition
  setAppleToRandomPosition(apple, body) # call procedure
  while gameOn:
    updateDisplay(blocks, head, tail, body, apple) # call procedure
    currentDirRef = AsRef[str](currentDir) # variable definition
    headRef = AsRef[list[int]](head) # variable definition
    tailRef = AsRef[list[int]](tail) # variable definition
    updateSnake(currentDirRef, tailRef, headRef, body) # call procedure
    head = headRef.value() # re-assign variable
    tail = tailRef.value() # re-assign variable
    currentDir = currentDirRef.value() # re-assign variable
    gameOn = not hasHitEdge(head[0], head[1]) and not body.contains(head) # re-assign variable
    if head.equals(apple):
      setAppleToRandomPosition(apple, body) # call procedure
    else:
      body.removeAt(0) # call procedure
    sleep_ms(150) # call procedure
  print(f"Game Over! Score: {body.length() - 1}")

def updateSnake(currentDirRef: AsRef[str], tailRef: AsRef[list[int]], headRef: AsRef[list[int]], body: list[list[int]]) -> None: # procedure
  head = headRef.value() # variable definition
  tail = tailRef.value() # variable definition
  currentDir = currentDirRef.value() # variable definition
  currentDir = directionByKey(currentDir, getKey()) # re-assign variable
  tailRef.set(body[0]) # call procedure
  body.append(head) # call procedure
  headRef.set(getAdjacentSquare(head, currentDir)) # call procedure
  currentDirRef.set(currentDir) # call procedure

def updateDisplay(blocks: list[list[int]], head: list[int], tail: list[int], body: list[list[int]], apple: list[int]) -> None: # procedure
  blocks[head[0]][head[1]] = green # re-assign variable
  tailColour = getTailColour(tail, body) # variable definition
  blocks[tail[0]][tail[1]] = tailColour # re-assign variable
  blocks[apple[0]][apple[1]] = red # re-assign variable
  displayBlocks(blocks) # call procedure

def setAppleToRandomPosition(apple: list[int], body: list[list[int]]) -> None: # procedure
  changePosition = True # variable definition
  while changePosition:
    apple[0] = randint(0, 39) # re-assign variable
    apple[1] = randint(0, 29) # re-assign variable
    if not body.contains(apple):
      changePosition = False # re-assign variable

def getTailColour(tail: list[int], body: list[list[int]]) -> int: # function
  colour = white # variable definition
  if body[0].equals(tail):
    colour = green # re-assign variable
  return colour

def hasHitEdge(headX: int, headY: int) -> bool: # function
  return (headX < 0) or (headY < 0) or (headX > 39) or (headY > 29)

def getAdjacentSquare(sq: list[int], dir: str) -> list[int]: # function
  newX = sq[0] # variable definition
  newY = sq[1] # variable definition
  if dir.equals("left"):
    newX = newX - 1 # re-assign variable
  elif dir.equals("right"): # else if
    newX = newX + 1 # re-assign variable
  elif dir.equals("up"): # else if
    newY = newY - 1 # re-assign variable
  elif dir.equals("down"): # else if
    newY = newY + 1 # re-assign variable
  return [newX, newY]

def directionByKey(current: str, key: str) -> str: # function
  dirn = current # variable definition
  d = ["w":"up", "s":"down", "a":"left", "d":"right"] # variable definition
  if d.keys().contains(key):
    dirn = d[key] # re-assign variable
  return dirn

def test_getTailColour(self) -> None:
  self.assertEqual(getTailColour([3, 4], [[3, 4], [3, 5]]), green)
  self.assertEqual(getTailColour([3, 4], [[3, 5], [3, 6]]), white)

def test_hasHitEdge(self) -> None:
  self.assertEqual(hasHitEdge(0, 0), False)
  self.assertEqual(hasHitEdge(0, 29), False)
  self.assertEqual(hasHitEdge(39, 0), False)
  self.assertEqual(hasHitEdge(29, 29), False)
  self.assertEqual(hasHitEdge(-1, 5), True)
  self.assertEqual(hasHitEdge(5, 30), True)
  self.assertEqual(hasHitEdge(40, 5), True)
  self.assertEqual(hasHitEdge(5, -1), True)

def test_getAdjacentSquare(self) -> None:
  sq = [20, 15] # variable definition
  self.assertEqual(getAdjacentSquare(sq, "up"), [20, 14])
  self.assertEqual(getAdjacentSquare(sq, "down"), [20, 16])
  self.assertEqual(getAdjacentSquare(sq, "left"), [19, 15])
  self.assertEqual(getAdjacentSquare(sq, "right"), [21, 15])
  # boundary
  self.assertEqual(getAdjacentSquare([0, 15], "left"), [-1, 15])

def test_directionByKey(self) -> None:
  current = "up" # variable definition
  self.assertEqual(directionByKey(current, ""), "up")
  self.assertEqual(directionByKey(current, "x"), "up")
  self.assertEqual(directionByKey(current, "w"), "up")
  self.assertEqual(directionByKey(current, "s"), "down")
  self.assertEqual(directionByKey(current, "a"), "left")
  self.assertEqual(directionByKey(current, "d"), "right")
  self.assertEqual(directionByKey(current, "D"), "up")

main()
