# 7492cc866d77acbfbe07ef862e54166a09c86e49f11b74461ec5a83e6be35cac Elan 1.9.0 guest default_profile valid

def main -> None:  # [main]
  blocks = new Array2D<of Int>(40, 30, black) # [variable definition]
  blocks = createStart(blocks) # [assign variable]
  for i in range(0, displayWidth, 1):  # [for loop]
    x = randomInt(0, 39) # [variable definition]
    y = randomInt(0, 29) # [variable definition]
    p = newPoint(x, y) # [variable definition]
    existing = getValue(p, blocks) # [variable definition]
    setTo = (random() + 0.7).floor() # [variable definition]
    if okToSet(p, setTo, blocks) then
      colour = if setTo is 1 then white else black # [variable definition]
      blocks = blocks.withPut(p.x, p.y, colour) # [assign variable]
  displayBlocks(blocks) # [call procedure]}
  name = inputString("File name to save: ") # [variable definition]
  if name isnt "x" then
    saveAsFile(name, blocks) # [call procedure]}


displayWidth = 150

def saveAsFile(name: String, b: Array2D<of Int>) -> None:  # [procedure]
  file = createFileForWriting(name) # [variable definition]
  for row in range(0, 29, 1):  # [for loop]
    line = "" # [variable definition]
    for col in range(0, 39, 1):  # [for loop]
      colour = b[col, row] # [variable definition]
      symbol = if colour is white then " " else "X" # [variable definition]
      line = line + symbol # [assign variable]
    file.writeLine(line) # [call procedure]}
  file.saveAndClose() # [call procedure]}


def createStart(b: Array2D<of Int>) -> Array2D<of Int>:  # [function]
  b2 = b # [variable definition]
  for i in range(0, 15, 2):  # [for loop]
    b2 = addRectangle(b2, i, i, 39 - 2*i, 29 - 2*i) # [assign variable]
  return b2


def addRectangle(b: Array2D<of Int>, startX: Int, startY: Int, width: Int, depth: Int) -> Array2D<of Int>:  # [function]
  paint = white # [variable definition]
  b2 = b # [variable definition]
  for x in range(startX, startX + width, 1):  # [for loop]
    b2 = b2.withPut(x, startY, paint) # [assign variable]
    b2 = b2.withPut(x, startY + depth, paint) # [assign variable]
  for y in range(startY, startY + depth, 1):  # [for loop]
    b2 = b2.withPut(startX, y, paint) # [assign variable]
    b2 = b2.withPut(startX + width, y, paint) # [assign variable]
  return b2


# colour: 0 for black, 1 for white
def okToSet(p: Point, colour: Int, g: Array2D<of Int>) -> Boolean:  # [function]
  n = p.neighbouringPoints().map(lambda p: Point => getValue(p, g)) # [variable definition]
  q1 = isValidQuadrant(n[0] + n[1]*2 + colour*4 + n[3]*8) # [variable definition]
  q2 = isValidQuadrant(n[1] + n[2]*2 + n[4]*4 + colour*8) # [variable definition]
  q3 = isValidQuadrant(colour + n[4]*2 + n[7]*4 + n[6]*8) # [variable definition]
  q4 = isValidQuadrant(n[3] + colour*2 + n[6]*4 + n[5]*8) # [variable definition]
  return q1 and q2 and q3 and q4


def getValue(p: Point, b: Array2D<of Int>) -> Int:  # [function]
  result = 0 # [variable definition]
  if (p.x > -1) and (p.x < 40) and (p.y > -1) and (p.y < 30) then
    colour = b[p.x, p.y] # [variable definition]
    result = if colour is black then 0 else 1 # [assign variable]
  return result


def flip01(v: Int) -> Int:  # [function]
  return if v is 0 then 1 else 0


def test_flip01() -> None:  # [test]
  assertEqual(flip01(0), 1)  # [assert]
  assertEqual(flip01(1), 0)  # [assert]


def isValidQuadrant(q: Int) -> Boolean:  # [function]
  return (q mod 5) isnt 0


def test_isValidQuadrant() -> None:  # [test]
  assertEqual(isValidQuadrant(0), false)  # [assert]
  assertEqual(isValidQuadrant(1), true)  # [assert]
  assertEqual(isValidQuadrant(2), true)  # [assert]
  assertEqual(isValidQuadrant(3), true)  # [assert]
  assertEqual(isValidQuadrant(4), true)  # [assert]
  assertEqual(isValidQuadrant(5), false)  # [assert]
  assertEqual(isValidQuadrant(6), true)  # [assert]
  assertEqual(isValidQuadrant(7), true)  # [assert]
  assertEqual(isValidQuadrant(8), true)  # [assert]
  assertEqual(isValidQuadrant(9), true)  # [assert]
  assertEqual(isValidQuadrant(10), false)  # [assert]
  assertEqual(isValidQuadrant(11), true)  # [assert]
  assertEqual(isValidQuadrant(12), true)  # [assert]
  assertEqual(isValidQuadrant(13), true)  # [assert]
  assertEqual(isValidQuadrant(14), true)  # [assert]
  assertEqual(isValidQuadrant(15), false)  # [assert]


record Point
  x: Int = None # [property]

  y: Int = None # [property]

  isNotEmpty: Boolean = None # [property]

  # Returns the 8 theoretically-neighbouring points, whether or not within bounds
  function neighbouringPoints() returns List<of Point>
    return [newPoint(property.x - 1, property.y - 1), newPoint(property.x, property.y - 1), newPoint(property.x + 1, property.y - 1), newPoint(property.x - 1, property.y), newPoint(property.x + 1, property.y), newPoint(property.x - 1, property.y + 1), newPoint(property.x, property.y + 1), newPoint(property.x + 1, property.y + 1)]
  end function

end record

def newPoint(x: Int, y: Int) -> Point:  # [function]
  return new Point() with x set to x, y set to y, isNotEmpty set to true


def test_neighbouringPoints() -> None:  # [test]
  p = newPoint(0, 0) # [variable definition]
  n = p.neighbouringPoints() # [variable definition]
  expected = [newPoint(-1, -1), newPoint(0, -1), newPoint(1, -1), newPoint(-1, 0), newPoint(1, 0), newPoint(-1, 1), newPoint(0, 1), newPoint(1, 1)] # [variable definition]
  assertEqual(n, expected)  # [assert]


