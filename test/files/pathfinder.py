# Python with Elan 2.0.0-beta1

def main() -> None:
  start = Point(5, 5) # variable definition
  destination = Point(34, 24) # variable definition
  percentRocks = inputIntBetween("Enter % rocks (0-100): ", 0, 100) # variable definition
  clearPrintedText() # call procedure
  rocks = list[Point]() # variable definition
  nodes = list[Node]() # variable definition
  createRocksAndNodes(percentRocks, rocks, nodes, start, destination) # call procedure
  gr = initialiseGraphics(start, destination, rocks) # variable definition
  displayBlocks(gr) # call procedure
  solver = Solver(nodes, start, destination) # variable definition
  while True:
    k = inputStringFromOptions(algPrompt, ["a", "d", "h"]) # variable definition
    clearPrintedText() # call procedure
    alg = getAlgFromLetter(k) # variable definition
    runSolver(gr, start, destination, rocks, solver, alg) # call procedure
  # end while
# end main

def runSolver(gr: list[list[int]], start: Point, destination: Point, rocks: list[Point], solver: Solver, alg: Algorithm) -> None: # procedure
  solver.initialise(alg) # call procedure
  gr2 = initialiseGraphics(start, destination, rocks) # variable definition
  while solver.running:
    solver.visitNextPoint() # call procedure
    gr2 = addVisited(gr2, solver.getLastVisited()) # reassign variable
    displayBlocks(gr2) # call procedure
    sleep_ms(0) # call procedure
  # end while
  if solver.getLastVisited().equals(destination):
    rl = solver.getRouteAndLength() # variable definition
    route = rl.item_0 # variable definition
    length = rl.item_1 # variable definition
    gr2 = addRoute(gr2, route) # reassign variable
    displayBlocks(gr2) # call procedure
    printNoLine(f"Length of route: {length.round(2)} ") # call procedure
  else:
    printNoLine("No path found. ") # call procedure
  # end if
# end procedure

def createRocksAndNodes(percentRocks: int, rocks: list[Point], nodes: list[Node], start: Point, dest: Point) -> None: # procedure
  for x in range(0, 40):
    for y in range(1, 30):
      p = Point(x, y) # variable definition
      if p.equals(start):
        nodes.append(Node(p, 0, p.minDistTo(dest))) # call procedure
      elif p.equals(dest): # else if
        nodes.append(Node(p, infinity, 0)) # call procedure
      elif random() < divAsFloat(percentRocks, 100): # else if
        rocks.append(p) # call procedure
      else:
        nodes.append(Node(p, infinity, p.minDistTo(dest))) # call procedure
      # end if
    # end for
  # end for
# end procedure

def initialiseGraphics(start: Point, dest: Point, rocks: list[Point]) -> list[list[int]]: # function
  gr = createBlockGraphics(white) # variable definition
  for rock in rocks:
    gr = withPut(gr, rock.x, rock.y, black) # reassign variable
  # end for
  gr = withPut(gr, start.x, start.y, green) # reassign variable
  gr = withPut(gr, dest.x, dest.y, red) # reassign variable
  return gr
# end function

def withPut(graphics: list[list[int]], x: int, y: int, colour: int) -> list[list[int]]: # function
  return graphics.withSet(x, graphics[x].withSet(y, colour))
# end function

def addVisited(gr: list[list[int]], visited: Point) -> list[list[int]]: # function
  return withPut(gr, visited.x, visited.y, lightBlue)
# end function

def addRoute(gr: list[list[int]], route: list[Point]) -> list[list[int]]: # function
  graphics = gr # variable definition
  for p in route:
    graphics = withPut(graphics, p.x, p.y, orange) # reassign variable
  # end for
  start = route[0] # variable definition
  dest = route[route.length() - 1] # variable definition
  graphics = withPut(graphics, start.x, start.y, green) # reassign variable
  graphics = withPut(graphics, dest.x, dest.y, red) # reassign variable
  return graphics
# end function

class Solver: # concrete class

  def __init__(self: Solver, nodes: list[Node], start: Point, destination: Point) -> None:
    self.nodes = nodes # reassign variable
    self.start = start # reassign variable
    self.destination = destination # reassign variable
    self.current = Node(emptyPoint(), 0, 0) # reassign variable
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
    self.alg = alg # reassign variable
    self.current = Node(self.start, 0, infinity) # reassign variable
    self.running = True # reassign variable
    for node in self.nodes:
      node.setDistanceFromStart(infinity) # call procedure
      node.setVia(emptyPoint()) # call procedure
      node.setVisited(False) # call procedure
    # end for
  # end procedure method

  def visitNextPoint(self: Solver) -> None: # procedure method
    self.updateNeighbours() # call procedure
    self.current = self.nextNodeToVisit() # reassign variable
    if (self.current.isEmpty or (self.current.point.equals(self.destination))):
      self.running = False # reassign variable
    else:
      current = self.current # variable definition
      current.setVisited(True) # call procedure
    # end if
  # end procedure method

  def updateNeighbours(self: Solver) -> None: # procedure method
    distToCurrent = self.current.distFromStart # variable definition
    currentPoint = self.current.point # variable definition
    for neighbour in self.currentNeighbours():
      distViaCurrent = distToCurrent + currentPoint.minDistTo(neighbour.point) # variable definition
      if distViaCurrent < neighbour.distFromStart:
        neighbour.setVia(currentPoint) # call procedure
        neighbour.setDistanceFromStart(distViaCurrent) # call procedure
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
        neighbours = neighbours.withAppend(node) # reassign variable
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
        lowestCostSoFar = cost # reassign variable
        lowestCostNode = nd # reassign variable
      # end if
    # end for
    return lowestCostNode
  # end function method

  def calculateCost(self: Solver, node: Node) -> float: # function method
    cost = 0.0 # variable definition
    fromStart = node.distFromStart # variable definition
    estToDest = node.estDistToDest # variable definition
    if self.alg == Algorithm.dijkstra:
      cost = fromStart # reassign variable
    elif self.alg == Algorithm.aStar: # else if
      cost = fromStart + estToDest # reassign variable
    elif self.alg == Algorithm.heuristic: # else if
      cost = estToDest # reassign variable
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
      length = length + p.minDistTo(previous) # reassign variable
      route = route.withInsert(0, previous) # reassign variable
      node = self.getNodeFor(previous) # reassign variable
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
      self.isEmpty = True # reassign variable
    # end if
    self.point = p # reassign variable
    self.visited = False # reassign variable
    self.distFromStart = distFromStart # reassign variable
    self.via = emptyPoint() # reassign variable
    self.estDistToDest = estDistToDest # reassign variable
  # end constructor

  point: Point # property

  visited: bool # property

  distFromStart: float # property

  via: Point # property

  estDistToDest: float # property

  isEmpty: bool # property

  def setVisited(self: Node, value: bool) -> None: # procedure method
    self.visited = value # reassign variable
  # end procedure method

  def setDistanceFromStart(self: Node, d: float) -> None: # procedure method
    self.distFromStart = d # reassign variable
  # end procedure method

  def setVia(self: Node, p: Point) -> None: # procedure method
    self.via = p # reassign variable
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
      self.isEmpty = True # reassign variable
    else:
      self.x = x # reassign variable
      self.y = y # reassign variable
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
    alg = Algorithm.aStar # reassign variable
  elif letter.equals("d"): # else if
    alg = Algorithm.dijkstra # reassign variable
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
