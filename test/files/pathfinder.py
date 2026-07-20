# Python with Elan 2.0.0-beta2

def main() -> None:
  start = Point(5, 5) # variable definition
  destination = Point(34, 24) # variable definition
  percentRocks = inputIntBetween("Enter % rocks (0-100): ", 0, 100) # variable definition
  clearPrintedText() # procedure call
  rocks = list[Point]() # variable definition
  nodes = list[Node]() # variable definition
  createRocksAndNodes(percentRocks, rocks, nodes, start, destination) # procedure call
  gr = initialiseGraphics(start, destination, rocks) # variable definition
  displayBlocks(gr) # procedure call
  solver = Solver(nodes, start, destination) # variable definition
  while True:
    k = inputStringFromOptions(algPrompt, ["a", "d", "h"]) # variable definition
    clearPrintedText() # procedure call
    alg = getAlgFromLetter(k) # variable definition
    runSolver(gr, start, destination, rocks, solver, alg) # procedure call
  # end while
# end main

def runSolver(gr: list[list[int]], start: Point, destination: Point, rocks: list[Point], solver: Solver, alg: Algorithm) -> None: # procedure
  solver.initialise(alg) # procedure call
  gr2 = initialiseGraphics(start, destination, rocks) # variable definition
  while solver.running:
    solver.visitNextPoint() # procedure call
    gr2 = addVisited(gr2, solver.getLastVisited()) # assignment
    displayBlocks(gr2) # procedure call
    sleep_ms(0) # procedure call
  # end while
  if solver.getLastVisited().equals(destination):
    rl = solver.getRouteAndLength() # variable definition
    route = rl.item_0 # variable definition
    length = rl.item_1 # variable definition
    gr2 = addRoute(gr2, route) # assignment
    displayBlocks(gr2) # procedure call
    printNoLine(f"Length of route: {length.round(2)} ") # procedure call
  else:
    printNoLine("No path found. ") # procedure call
  # end if
# end procedure

def createRocksAndNodes(percentRocks: int, rocks: list[Point], nodes: list[Node], start: Point, dest: Point) -> None: # procedure
  for x in range(0, 40):
    for y in range(1, 30):
      p = Point(x, y) # variable definition
      if p.equals(start):
        nodes.append(Node(p, 0, p.minDistTo(dest))) # procedure call
      elif p.equals(dest): # else if
        nodes.append(Node(p, infinity, 0)) # procedure call
      elif random() < divAsFloat(percentRocks, 100): # else if
        rocks.append(p) # procedure call
      else:
        nodes.append(Node(p, infinity, p.minDistTo(dest))) # procedure call
      # end if
    # end for
  # end for
# end procedure

def initialiseGraphics(start: Point, dest: Point, rocks: list[Point]) -> list[list[int]]: # function
  gr = createBlockGraphics(white) # variable definition
  for rock in rocks:
    gr = withPut(gr, rock.x, rock.y, black) # assignment
  # end for
  gr = withPut(gr, start.x, start.y, green) # assignment
  gr = withPut(gr, dest.x, dest.y, red) # assignment
  return gr
# end function

def withPut(graphics: list[list[int]], x: int, y: int, colour: int) -> list[list[int]]: # function
  return graphics.withPut(x, graphics[x].withPut(y, colour))
# end function

def addVisited(gr: list[list[int]], visited: Point) -> list[list[int]]: # function
  return withPut(gr, visited.x, visited.y, lightBlue)
# end function

def addRoute(gr: list[list[int]], route: list[Point]) -> list[list[int]]: # function
  graphics = gr # variable definition
  for p in route:
    graphics = withPut(graphics, p.x, p.y, orange) # assignment
  # end for
  start = route[0] # variable definition
  dest = route[route.length() - 1] # variable definition
  graphics = withPut(graphics, start.x, start.y, green) # assignment
  graphics = withPut(graphics, dest.x, dest.y, red) # assignment
  return graphics
# end function

class Solver: # concrete class

  def __init__(self: Solver, nodes: list[Node], start: Point, destination: Point) -> None:
    self.nodes = nodes # assignment
    self.start = start # assignment
    self.destination = destination # assignment
    self.current = Node(emptyPoint(), 0, 0) # assignment
  # end constructor

  def toString(self: Solver) -> str: # function method
    return "A Solver"
  # end function method

  nodes: list[Node] # property

  start: Point # property

  destination: Point # property

  current: Node # property

  alg: Algorithm # property

  running: bool # property

  # TODO can this go into the constructor ?
  def initialise(self: Solver, alg: Algorithm) -> None: # procedure method
    self.alg = alg # assignment
    self.current = Node(self.start, 0, infinity) # assignment
    self.running = True # assignment
    for node in self.nodes:
      node.setDistanceFromStart(infinity) # procedure call
      node.setVia(emptyPoint()) # procedure call
      node.setVisited(False) # procedure call
    # end for
  # end procedure method

  def visitNextPoint(self: Solver) -> None: # procedure method
    self.updateNeighbours() # procedure call
    self.current = self.nextNodeToVisit() # assignment
    if (self.current.isEmpty or (self.current.point.equals(self.destination))):
      self.running = False # assignment
    else:
      current = self.current # variable definition
      current.setVisited(True) # procedure call
    # end if
  # end procedure method

  def updateNeighbours(self: Solver) -> None: # procedure method
    distToCurrent = self.current.distFromStart # variable definition
    currentPoint = self.current.point # variable definition
    for neighbour in self.currentNeighbours():
      distViaCurrent = distToCurrent + currentPoint.minDistTo(neighbour.point) # variable definition
      if distViaCurrent < neighbour.distFromStart:
        neighbour.setVia(currentPoint) # procedure call
        neighbour.setDistanceFromStart(distViaCurrent) # procedure call
      # end if
    # end for
  # end procedure method

  def currentNeighbours(self: Solver) -> list[Node]: # function method
    currentNode = self.current # variable definition
    currentPoint = currentNode.point # variable definition
    neighbours = list[Node]() # variable definition
    for p in currentPoint.neighbouringPoints():
      node = self.getNodeFor(p) # variable definition
      point = node.point # variable definition
      if not point.isEmpty:
        neighbours = neighbours.withAppend(node) # assignment
      # end if
    # end for
    return neighbours
  # end function method

  def getNodeFor(self: Solver, p: Point) -> Node: # function method
    matches = self.nodes.filter(lambda n: Node: n.point.equals(p)) # variable definition
    return if_(matches.length() == 1, matches.head(), emptyNode())
  # end function method

  def getLastVisited(self: Solver) -> Point: # function method
    return self.current.point
  # end function method

  def nextNodeToVisit(self: Solver) -> Node: # function method
    lowestCostSoFar = infinity # variable definition
    lowestCostNode = emptyNode() # variable definition
    possibilities = self.nodes.filter(lambda nd: Node: (not nd.visited) and (nd.distFromStart < infinity)) # variable definition
    for nd in possibilities:
      cost = self.calculateCost(nd) # variable definition
      if cost < lowestCostSoFar:
        lowestCostSoFar = cost # assignment
        lowestCostNode = nd # assignment
      # end if
    # end for
    return lowestCostNode
  # end function method

  def calculateCost(self: Solver, node: Node) -> float: # function method
    cost = 0.0 # variable definition
    fromStart = node.distFromStart # variable definition
    estToDest = node.estDistToDest # variable definition
    if self.alg == Algorithm.dijkstra:
      cost = fromStart # assignment
    elif self.alg == Algorithm.aStar: # else if
      cost = fromStart + estToDest # assignment
    elif self.alg == Algorithm.heuristic: # else if
      cost = estToDest # assignment
    # end if
    return cost
  # end function method

  def getRouteAndLength(self: Solver) -> tuple[list[Point], float]: # function method
    route = [self.destination] # variable definition
    length = 0.0 # variable definition
    node = self.getNodeFor(self.destination) # variable definition
    while not node.point.equals(self.start):
      previous = node.via # variable definition
      p = node.point # variable definition
      length = length + p.minDistTo(previous) # assignment
      route = route.withInsert(0, previous) # assignment
      node = self.getNodeFor(previous) # assignment
    # end while
    return (route, length)
  # end function method

# end class

def emptyNode() -> Node: # function
  return Node(emptyPoint(), 0, 0)
# end function

class Node: # concrete class

  def __init__(self: Node, p: Point, distFromStart: float, estDistToDest: float) -> None:
    if p.isEmpty:
      self.isEmpty = True # assignment
    # end if
    self.point = p # assignment
    self.visited = False # assignment
    self.distFromStart = distFromStart # assignment
    self.via = emptyPoint() # assignment
    self.estDistToDest = estDistToDest # assignment
  # end constructor

  point: Point # property

  visited: bool # property

  distFromStart: float # property

  via: Point # property

  estDistToDest: float # property

  isEmpty: bool # property

  def setVisited(self: Node, value: bool) -> None: # procedure method
    self.visited = value # assignment
  # end procedure method

  def setDistanceFromStart(self: Node, d: float) -> None: # procedure method
    self.distFromStart = d # assignment
  # end procedure method

  def setVia(self: Node, p: Point) -> None: # procedure method
    self.via = p # assignment
  # end procedure method

  def toString(self: Node) -> str: # function method
    return f"[{self.point.toString()} {self.visited} {self.distFromStart}]"
  # end function method

# end class

def emptyPoint() -> Point: # function
  return Point(-1, -1)
# end function

class Point: # concrete class

  x: int # property

  y: int # property

  isEmpty: bool # property

  def __init__(self: Point, x: int, y: int) -> None:
    if (x < 0) or (y < 0):
      self.isEmpty = True # assignment
    else:
      self.x = x # assignment
      self.y = y # assignment
    # end if
  # end constructor

  def minDistTo(self: Point, p: Point) -> float: # function method
    return sqrt(pow((p.x - self.x), 2) + pow((p.y - self.y), 2))
  # end function method

  def isAdjacentTo(self: Point, p: Point) -> bool: # function method
    return (self.minDistTo(p) == 1) or (self.minDistTo(p).round(4) == sqrt(2).round(4))
  # end function method

  # Returns the 8 theoretically-neighbouring points, whether or not within bounds
  def neighbouringPoints(self: Point) -> list[Point]: # function method
    return [Point(self.x - 1, self.y - 1), Point(self.x, self.y - 1), Point(self.x + 1, self.y - 1), Point(self.x - 1, self.y), Point(self.x + 1, self.y), Point(self.x - 1, self.y + 1), Point(self.x, self.y + 1), Point(self.x + 1, self.y + 1)]
  # end function method

  def toString(self: Point) -> str: # function method
    return f"{self.x},{self.y}"
  # end function method

# end class

class Algorithm(Enum):
  dijkstra = 1
  aStar = 2
  heuristic = 3

# 'infinity' need only be larger than longest possible route

infinity = 2000.0 # constant

algPrompt = "Enter 'a' for A-star, 'd' for Dijkstra, 'h' for Heuristic" # constant

lightBlue = 0x80abff # constant

orange = 0xe97132 # constant

def getAlgFromLetter(letter: str) -> Algorithm: # function
  alg = Algorithm.heuristic # variable definition
  if letter.equals("a"):
    alg = Algorithm.aStar # assignment
  elif letter.equals("d"): # else if
    alg = Algorithm.dijkstra # assignment
  # end if
  return alg
# end function

class Test_getAlgFromLetter(unittest.TestCase):
 def test_getAlgFromLetter(self) -> None:
  self.assertEqual(getAlgFromLetter("a"), Algorithm.aStar)
  self.assertEqual(getAlgFromLetter("h"), Algorithm.heuristic)
  self.assertEqual(getAlgFromLetter("d"), Algorithm.dijkstra)
# end test

class Test_point(unittest.TestCase):
 def test_point(self) -> None:
  p = Point(0, 0) # variable definition
  n = p.neighbouringPoints() # variable definition
  expected = [Point(-1, -1), Point(0, -1), Point(1, -1), Point(-1, 0), Point(1, 0), Point(-1, 1), Point(0, 1), Point(1, 1)] # variable definition
  self.assertEqual(n, expected)
# end test

main()
