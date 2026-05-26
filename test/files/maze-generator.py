# Python with Elan 2.0.0-alpha5

def main() -> None:
  blocks = createBlockGraphics(black) # variable definition
  blocks = createStart(blocks) # reassign variable
  for i in range(0, displayWidth + 1):
    x = randint(0, 39) # variable definition
    y = randint(0, 29) # variable definition
    p = Point(x, y) # variable definition
    existing = getValue(p, blocks) # variable definition
    setTo = (random() + 0.7).floor() # variable definition
    if okToSet(p, setTo, blocks):
      colour = if(setTo == 1, white, black) # variable definition
      blocks[p.x][p.y] = colour # reassign variable
  displayBlocks(blocks) # call procedure
  name = input("File name to save: ") # variable definition
  if not name.equals("x"):
    saveAsFile(name, blocks) # call procedure

displayWidth = 150 # constant

def saveAsFile(name: str, b: list[list[int]]) -> None: # procedure
  file = createFileForWriting(name) # variable definition
  for row in range(0, 30):
    line = "" # variable definition
    for col in range(0, 40):
      colour = b[col][row] # variable definition
      symbol = if(colour == white, " ", "X") # variable definition
      line = line + symbol # reassign variable
    file.writeLine(line) # call procedure
  file.saveAndClose() # call procedure

def createStart(b: list[list[int]]) -> list[list[int]]: # function
  b2 = b # variable definition
  for i in rangeInSteps(0, 16, 2):
    b2 = addRectangle(b2, i, i, 39 - 2*i, 29 - 2*i) # reassign variable
  return b2

def addRectangle(b: list[list[int]], startX: int, startY: int, width: int, depth: int) -> list[list[int]]: # function
  paint = white # variable definition
  b2 = b # variable definition
  for x in range(startX, startX + width + 1):
    b2 = withPut(b2, x, startY, paint) # reassign variable
    b2 = withPut(b2, x, startY + depth, paint) # reassign variable
  for y in range(startY, startY + depth + 1):
    b2 = withPut(b2, startX, y, paint) # reassign variable
    b2 = withPut(b2, startX + width, y, paint) # reassign variable
  return b2

def withPut(graphics: list[list[int]], x: int, y: int, colour: int) -> list[list[int]]: # function
  return graphics.withSet(x, graphics[x].withSet(y, colour))

# colour: 0 for black, 1 for white

def okToSet(p: Point, colour: int, g: list[list[int]]) -> bool: # function
  n = p.neighbouringPoints().map(lambda p: Point: getValue(p, g)) # variable definition
  q1 = isValidQuadrant(n[0] + n[1]*2 + colour*4 + n[3]*8) # variable definition
  q2 = isValidQuadrant(n[1] + n[2]*2 + n[4]*4 + colour*8) # variable definition
  q3 = isValidQuadrant(colour + n[4]*2 + n[7]*4 + n[6]*8) # variable definition
  q4 = isValidQuadrant(n[3] + colour*2 + n[6]*4 + n[5]*8) # variable definition
  return q1 and q2 and q3 and q4

def getValue(p: Point, b: list[list[int]]) -> int: # function
  result = 0 # variable definition
  if (p.x > -1) and (p.x < 40) and (p.y > -1) and (p.y < 30):
    colour = b[p.x][p.y] # variable definition
    result = if(colour == black, 0, 1) # reassign variable
  return result

def flip01(v: int) -> int: # function
  return if(v == 0, 1, 0)

def test_flip01(self) -> None:
  self.assertEqual(flip01(0), 1)
  self.assertEqual(flip01(1), 0)

def isValidQuadrant(q: int) -> bool: # function
  return (q % 5) != 0

def test_isValidQuadrant(self) -> None:
  self.assertEqual(isValidQuadrant(0), False)
  self.assertEqual(isValidQuadrant(1), True)
  self.assertEqual(isValidQuadrant(2), True)
  self.assertEqual(isValidQuadrant(3), True)
  self.assertEqual(isValidQuadrant(4), True)
  self.assertEqual(isValidQuadrant(5), False)
  self.assertEqual(isValidQuadrant(6), True)
  self.assertEqual(isValidQuadrant(7), True)
  self.assertEqual(isValidQuadrant(8), True)
  self.assertEqual(isValidQuadrant(9), True)
  self.assertEqual(isValidQuadrant(10), False)
  self.assertEqual(isValidQuadrant(11), True)
  self.assertEqual(isValidQuadrant(12), True)
  self.assertEqual(isValidQuadrant(13), True)
  self.assertEqual(isValidQuadrant(14), True)
  self.assertEqual(isValidQuadrant(15), False)

class Point # concrete class

  x: int # property
  y: int # property
  def __init__(self: Point, x: int, y: int) -> None:
    self.x = x # reassign variable
    self.y = y # reassign variable
  def toString(self: Point) -> str: # function method
    return ""
  # Returns the 8 theoretically-neighbouring points, whether or not within bounds
  def neighbouringPoints(self: Point) -> list[Point]: # function method
    x = self.x # variable definition
    y = self.y # variable definition
    return [Point(x - 1, y - 1), Point(x, y - 1), Point(x + 1, y - 1), Point(x - 1, y), Point(x + 1, y), Point(x - 1, y + 1), Point(x, y + 1), Point(x + 1, y + 1)]


def test_neighbouringPoints(self) -> None:
  p = Point(0, 0) # variable definition
  n = p.neighbouringPoints() # variable definition
  expected = [Point(-1, -1), Point(0, -1), Point(1, -1), Point(-1, 0), Point(1, 0), Point(-1, 1), Point(0, 1), Point(1, 1)] # variable definition
  self.assertEqual(n, expected)

main()
