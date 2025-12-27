# 49d53fa71d5b393d12d0ed7c311366e476f9ee04621113088dd7816662140f3b Elan 1.9.0 guest default_profile valid

# Use the w,a,s,d keys to change snake's direction
def main -> None:  # [main]
  blocks = new Array2D<of Int>(40, 30, white) # [variable definition]
  head = [20, 15] # [variable definition]
  tail = head # [variable definition]
  body = [head] # [variable definition]
  currentDir = "right" # [variable definition]
  gameOn = true # [variable definition]
  apple = [0, 0] # [variable definition]
  setAppleToRandomPosition(apple, body) # [call procedure]}
  while gameOn
    updateDisplay(blocks, head, tail, body, apple) # [call procedure]}
    updateSnake(currentDir, tail, head, body) # [call procedure]}
    gameOn = not hasHitEdge(head[0], head[1]) and not body.contains(head) # [assign variable]
    if head is apple then
      setAppleToRandomPosition(apple, body) # [call procedure]}
    else
      body.removeAt(0) # [call procedure]}
    pause(150) # [call procedure]}
  print "Game Over! Score: {body.length() - 1}"


def updateSnake(currentDir: String, tail: List<of Int>, head: List<of Int>, body: List<of List<of Int>>) -> None:  # [procedure]
  currentDir = directionByKey(currentDir, getKey()) # [assign variable]
  tail = body[0] # [assign variable]
  body.append(head) # [call procedure]}
  head = getAdjacentSquare(head, currentDir) # [assign variable]


def updateDisplay(blocks: Array2D<of Int>, head: List<of Int>, tail: List<of Int>, body: List<of List<of Int>>, apple: List<of Int>) -> None:  # [procedure]
  blocks.put(head[0], head[1], green) # [call procedure]}
  tailColour = getTailColour(tail, body) # [variable definition]
  blocks.put(tail[0], tail[1], tailColour) # [call procedure]}
  blocks.put(apple[0], apple[1], red) # [call procedure]}
  displayBlocks(blocks) # [call procedure]}


def setAppleToRandomPosition(apple: List<of Int>, body: List<of List<of Int>>) -> None:  # [procedure]
  changePosition = true # [variable definition]
  while changePosition
    apple.put(0, randomInt(0, 39)) # [call procedure]}
    apple.put(1, randomInt(0, 29)) # [call procedure]}
    if not body.contains(apple) then
      changePosition = false # [assign variable]


def getTailColour(tail: List<of Int>, body: List<of List<of Int>>) -> Int:  # [function]
  colour = white # [variable definition]
  if body[0] is tail then
    colour = green # [assign variable]
  return colour


def hasHitEdge(headX: Int, headY: Int) -> Boolean:  # [function]
  return (headX < 0) or (headY < 0) or (headX > 39) or (headY > 29)


def getAdjacentSquare(sq: List<of Int>, dir: String) -> List<of Int>:  # [function]
  newX = sq[0] # [variable definition]
  newY = sq[1] # [variable definition]
  if dir is "left" then
    newX = newX - 1 # [assign variable]
  else if dir is "right" then
    newX = newX + 1 # [assign variable]
  else if dir is "up" then
    newY = newY - 1 # [assign variable]
  else if dir is "down" then
    newY = newY + 1 # [assign variable]
  return [newX, newY]


def directionByKey(current: String, key: String) -> String:  # [function]
  dir = current # [variable definition]
  dict = ["w":"up", "s":"down", "a":"left", "d":"right"] # [variable definition]
  if dict.keys().contains(key) then
    dir = dict[key] # [assign variable]
  return dir


def test_getTailColour() -> None:  # [test]
  assertEqual(getTailColour([3, 4], [[3, 4], [3, 5]]), green)  # [assert]
  assertEqual(getTailColour([3, 4], [[3, 5], [3, 6]]), white)  # [assert]


def test_hasHitEdge() -> None:  # [test]
  assertEqual(hasHitEdge(0, 0), false)  # [assert]
  assertEqual(hasHitEdge(0, 29), false)  # [assert]
  assertEqual(hasHitEdge(39, 0), false)  # [assert]
  assertEqual(hasHitEdge(29, 29), false)  # [assert]
  assertEqual(hasHitEdge(-1, 5), true)  # [assert]
  assertEqual(hasHitEdge(5, 30), true)  # [assert]
  assertEqual(hasHitEdge(40, 5), true)  # [assert]
  assertEqual(hasHitEdge(5, -1), true)  # [assert]


def test_getAdjacentSquare() -> None:  # [test]
  sq = [20, 15] # [variable definition]
  assertEqual(getAdjacentSquare(sq, "up"), [20, 14])  # [assert]
  assertEqual(getAdjacentSquare(sq, "down"), [20, 16])  # [assert]
  assertEqual(getAdjacentSquare(sq, "left"), [19, 15])  # [assert]
  assertEqual(getAdjacentSquare(sq, "right"), [21, 15])  # [assert]
  # boundary
  assertEqual(getAdjacentSquare([0, 15], "left"), [-1, 15])  # [assert]


def test_directionByKey() -> None:  # [test]
  current = "up" # [variable definition]
  assertEqual(directionByKey(current, ""), "up")  # [assert]
  assertEqual(directionByKey(current, "x"), "up")  # [assert]
  assertEqual(directionByKey(current, "w"), "up")  # [assert]
  assertEqual(directionByKey(current, "s"), "down")  # [assert]
  assertEqual(directionByKey(current, "a"), "left")  # [assert]
  assertEqual(directionByKey(current, "d"), "right")  # [assert]
  assertEqual(directionByKey(current, "D"), "up")  # [assert]


