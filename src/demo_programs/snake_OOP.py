# 50d31327310356e5c74bc7dc5a9ea0011d17dbc8185f56ed16eeb9377502b600 Elan 1.9.0 guest default_profile valid

# Use the W,A,S,D keys to change Snake direction
def main -> None:  # [main]
  blocks = new Array2D<of Int>(40, 30, white) # [variable definition]
  snake = new Snake() # [variable definition]
  apple = new Apple() # [variable definition]
  apple.newRandomPosition(snake) # [call procedure]}
  while not snake.gameOver()
    snake.updateBlocks(blocks) # [call procedure]}
    apple.updateBlocks(blocks) # [call procedure]}
    displayBlocks(blocks) # [call procedure]}
    pause(150) # [call procedure]}
    snake.clockTick(getKey(), apple) # [call procedure]}
  print "Game Over! Score: {snake.score()}"


class Snake
  constructor()
    tail = new Square(20, 15) # [variable definition]
    property.currentDir = Direction.right # [assign variable]
    property.body = [tail] # [assign variable]
    property.head = tail.getAdjacentSquare(property.currentDir) # [assign variable]
    property.priorTail = tail # [assign variable]
  end constructor

  private currentDir: Direction = None # [property private]

  private head: Square = None # [property private]

  private body: List<of Square> = None # [property private]

  private priorTail: Square = None # [property private]

  procedure clockTick(key: String, apple: Apple)
    setDirection(key) # [call procedure]}
    property.priorTail = property.body[0] # [assign variable]
    property.body.append(property.head) # [call procedure]}
    property.head = property.head.getAdjacentSquare(property.currentDir) # [assign variable]
    if property.head is apple.location then
      apple.newRandomPosition(this) # [call procedure]}
    else
      property.body = property.body[1..] # [assign variable]

  procedure updateBlocks(blocks: Array2D<of Int>)
    blocks.put(property.head.x, property.head.y, green) # [call procedure]}
    if property.body[0] isnt property.priorTail then
      blocks.put(property.priorTail.x, property.priorTail.y, white) # [call procedure]}

  function score() returns Int
    return property.body.length() - 1
  end function

  function bodyCovers(sq: Square) returns Boolean
    result = false # [variable definition]
    for seg in property.body:  # [each loop]
      if (seg is sq) then
        result = true # [assign variable]
    return result
  end function

  function gameOver() returns Boolean
    return bodyCovers(property.head) or property.head.hasHitEdge()
  end function

  private procedure setDirection(key: String)
    if key is "w" then
      property.currentDir = Direction.up # [assign variable]
    else if key is "s" then
      property.currentDir = Direction.down # [assign variable]
    else if key is "a" then
      property.currentDir = Direction.left # [assign variable]
    else if key is "d" then
      property.currentDir = Direction.right # [assign variable]

end class

class Apple
  location: Square = None # [property]

  procedure newRandomPosition(snake: Snake)
    changePosition = true # [variable definition]
    while changePosition
      ranX = randomInt(0, 39) # [variable definition]
      ranY = randomInt(0, 29) # [variable definition]
      property.location = new Square(ranX, ranY) # [assign variable]
      if not snake.bodyCovers(property.location) then
        changePosition = false # [assign variable]

  procedure updateBlocks(blocks: Array2D<of Int>)
    blocks.put(property.location.x, property.location.y, red) # [call procedure]}

end class

class Square
  constructor(x: Int, y: Int)
    property.x = x # [assign variable]
    property.y = y # [assign variable]
  end constructor

  x: Int = None # [property]

  y: Int = None # [property]

  function getAdjacentSquare(d: Direction) returns Square
    newX = property.x # [variable definition]
    newY = property.y # [variable definition]
    if d is Direction.left then
      newX = property.x - 1 # [assign variable]
    else if d is Direction.right then
      newX = property.x + 1 # [assign variable]
    else if d is Direction.up then
      newY = property.y - 1 # [assign variable]
    else if d is Direction.down then
      newY = property.y + 1 # [assign variable]
    return new Square(newX, newY)
  end function

  function hasHitEdge() returns Boolean
    return (property.x is -1) or (property.y is -1) or (property.x is 40) or (property.y is 30)
  end function

end class

Direction = Enum ('Direction', 'up, down, left, right'})

def test_snake() -> None:  # [test]
  snake = new Snake() # [variable definition]
  # bodyCovers
  assertEqual(snake.bodyCovers(new Square(20, 15)), true)  # [assert]
  assertEqual(snake.bodyCovers(new Square(21, 15)), false)  # [assert]
  # gameOver, score - can only test for default - which is not thorough test
  assertEqual(snake.gameOver(), false)  # [assert]
  assertEqual(snake.score(), 0)  # [assert]


def test_apple() -> None:  # [test]
  # no tests


def test_square() -> None:  # [test]
  # constructor - not testable as properties are private
  # getAdjacentSquare
  sq1 = new Square(3, 4) # [variable definition]
  assertEqual(sq1.getAdjacentSquare(Direction.up), new Square(3, 3))  # [assert]
  assertEqual(sq1.getAdjacentSquare(Direction.down), new Square(3, 5))  # [assert]
  assertEqual(sq1.getAdjacentSquare(Direction.left), new Square(2, 4))  # [assert]
  assertEqual(sq1.getAdjacentSquare(Direction.right), new Square(4, 4))  # [assert]
  sq2 = new Square(0, 0) # [variable definition]
  sq3 = new Square(-1, 0) # [variable definition]
  assertEqual(sq2.getAdjacentSquare(Direction.left), sq3)  # [assert]
  # hasHitEdge
  assertEqual((new Square(0, 0)).hasHitEdge(), false)  # [assert]
  assertEqual((new Square(39, 20)).hasHitEdge(), false)  # [assert]
  assertEqual((new Square(-1, 3)).hasHitEdge(), true)  # [assert]
  assertEqual((new Square(3, -1)).hasHitEdge(), true)  # [assert]
  assertEqual((new Square(40, 3)).hasHitEdge(), true)  # [assert]
  assertEqual((new Square(3, 30)).hasHitEdge(), true)  # [assert]


