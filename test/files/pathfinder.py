# Python with Elan 2.0.0-alpha1

import math

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
    k = inputStringFromOptions(algPrompt, ["a", "d", "h"]) # constant
    clearPrintedText() # call procedure
    alg = getAlgFromLetter(k) # constant
    runSolver(gr, start, destination, rocks, solver, alg) # call procedure

def runSolver(gr: list[list[int]], start: Point, destination: Point, rocks: list[Point], solver: Solver, alg: Algorithm) -> None: # procedure
  solver.initialise(alg) # call procedure
  gr2 = initialiseGraphics(start, destination, rocks) # variable definition
  while solver.running:
    solver.visitNextPoint() # call procedure
    gr2 = addVisited(gr2, solver.getLastVisited()) # change variable
    displayBlocks(gr2) # call procedure
    sleep_ms(0) # call procedure
  if solver.getLastVisited().equals(destination):
    rl = solver.getRouteAndLength() # variable definition
    route = rl.item_0 # variable definition
    length = rl.item_1 # constant
    gr2 = addRoute(gr2, route) # change variable
    displayBlocks(gr2) # call procedure
    printNoLine(f"Length of route: {length.round(2)} ") # call procedure
  else:
    printNoLine("No path found. ") # call procedure

def createRocksAndNodes(percentRocks: int, rocks: list[Point], nodes: list[Node], start: Point, dest: Point) -> None: # procedure
  for x in range(0, 40):
    for y in range(1, 30):
      p = Point(x, y) # variable definition
      if p.equals(start):
        nodes.append(Node(p, 0, p.minDistTo(dest))) # call procedure
      elif p.equals(dest):
        nodes.append(Node(p, infinity, 0)) # call procedure
      elif random() < divAsFloat(percentRocks, 100):
        rocks.append(p) # call procedure
      else:
        nodes.append(Node(p, infinity, p.minDistTo(dest))) # call procedure

def initialiseGraphics(start: Point, dest: Point, rocks: list[Point]) -> list[list[int]]: # function
  gr = createBlockGraphics(white) # variable definition
  for rock in rocks:
    gr = withPut(gr, rock.x, rock.y, black) # change variable
  gr = withPut(gr, start.x, start.y, green) # change variable
  gr = withPut(gr, dest.x, dest.y, red) # change variable
  return gr

def withPut(graphics: list[list[int]], x: int, y: int, colour: int) -> list[list[int]]: # function
  return graphics.withSet(x, graphics[x].withSet(y, colour))

def addVisited(gr: list[list[int]], visited: Point) -> list[list[int]]: # function
  return withPut(gr, visited.x, visited.y, lightBlue)

def addRoute(gr: list[list[int]], route: list[Point]) -> list[list[int]]: # function
  graphics = gr # variable definition
  for p in route:
    graphics = withPut(graphics, p.x, p.y, orange) # change variable
  start = route[0] # variable definition
  dest = route[route.length() - 1] # variable definition
  graphics = withPut(graphics, start.x, start.y, green) # change variable
  graphics = withPut(graphics, dest.x, dest.y, red) # change variable
  return graphics

class Solver

  def __init__(self: Solver, nodes: list[Node], start: Point, destination: Point) -> None:
    self.nodes = nodes # change variable
    self.start = start # change variable
    self.destination = destination # change variable
    self.current = Node(emptyPoint(), 0, 0) # change variable
  def toString(self: Solver) -> str: # function
    return ""
  nodes: list[Node] # property
  start: Point # property
  destination: Point # property
  current: Node # property
  alg: Algorithm # property
  running: bool # property
  # TODO can this go into the constructor ?
  def initialise(self: Solver, alg: Algorithm) -> None: # procedure
    self.alg = alg # change variable
    self.current = Node(self.start, 0, infinity) # change variable
    self.running = True # change variable
    for node in self.nodes:
      node.setDistanceFromStart(infinity) # call procedure
      node.setVia(emptyPoint()) # call procedure
      node.setVisited(False) # call procedure
  def visitNextPoint(self: Solver) -> None: # procedure
    self.updateNeighbours() # call procedure
    self.current = self.nextNodeToVisit() # change variable
    if (self.current.isEmpty or (self.current.point.equals(self.destination))):
      self.running = False # change variable
    else:
      current = self.current # variable definition
      current.setVisited(True) # call procedure
  def updateNeighbours(self: Solver) -> None: # procedure
    distToCurrent = self.current.distFromStart # variable definition
    currentPoint = self.current.point # variable definition
    for neighbour in self.currentNeighbours():
      distViaCurrent = distToCurrent + currentPoint.minDistTo(neighbour.point) # variable definition
      if distViaCurrent < neighbour.distFromStart:
        neighbour.setVia(currentPoint) # call procedure
        neighbour.setDistanceFromStart(distViaCurrent) # call procedure
  def currentNeighbours(self: Solver) -> list[Node]: # function
    currentNode = self.current # variable definition
    currentPoint = currentNode.point # variable definition
    neighbours = list[Node]() # variable definition
    for p in currentPoint.neighbouringPoints():
      node = self.getNodeFor(p) # variable definition
      point = node.point # variable definition
      if not point.isEmpty:
        neighbours = neighbours.withAppend(node) # change variable
    return neighbours
  def getNodeFor(self: Solver, p: Point) -> Node: # function
    matches = self.nodes.filter(lambda n: Node => n.point.equals(p)) # variable definition
    return if(matches.length() == 1, matches.head(), emptyNode())
  def getLastVisited(self: Solver) -> Point: # function
    return self.current.point
  def nextNodeToVisit(self: Solver) -> Node: # function
    lowestCostSoFar = infinity # variable definition
    lowestCostNode = emptyNode() # variable definition
    possibilities = self.nodes.filter(lambda nd: Node => (not nd.visited) and (nd.distFromStart < infinity)) # variable definition
    for nd in possibilities:
      cost = self.calculateCost(nd) # variable definition
      if cost < lowestCostSoFar:
        lowestCostSoFar = cost # change variable
        lowestCostNode = nd # change variable
    return lowestCostNode
  def calculateCost(self: Solver, node: Node) -> float: # function
    cost = 0.0 # variable definition
    fromStart = node.distFromStart # constant
    estToDest = node.estDistToDest # constant
    if self.alg == Algorithm.dijkstra:
      cost = fromStart # change variable
    elif self.alg == Algorithm.aStar:
      cost = fromStart + estToDest # change variable
    elif self.alg == Algorithm.heuristic:
      cost = estToDest # change variable
    return cost
  def getRouteAndLength(self: Solver) -> tuple[list[Point], float]: # function
    route = [self.destination] # variable definition
    length = 0.0 # variable definition
    node = self.getNodeFor(self.destination) # variable definition
    while not node.point.equals(self.start):
      previous = node.via # variable definition
      p = node.point # variable definition
      length = length + p.minDistTo(previous) # change variable
      route = route.withInsert(0, previous) # change variable
      node = self.getNodeFor(previous) # change variable
    return (route, length)


def emptyNode() -> Node: # function
  return Node(emptyPoint(), 0, 0)

class Node

  def __init__(self: Node, p: Point, distFromStart: float, estDistToDest: float) -> None:
    if p.isEmpty:
      self.isEmpty = True # change variable
    self.point = p # change variable
    self.visited = False # change variable
    self.distFromStart = distFromStart # change variable
    self.via = emptyPoint() # change variable
    self.estDistToDest = estDistToDest # change variable
  point: Point # property
  visited: bool # property
  distFromStart: float # property
  via: Point # property
  estDistToDest: float # property
  isEmpty: bool # property
  def setVisited(self: Node, value: bool) -> None: # procedure
    self.visited = value # change variable
  def setDistanceFromStart(self: Node, d: float) -> None: # procedure
    self.distFromStart = d # change variable
  def setVia(self: Node, p: Point) -> None: # procedure
    self.via = p # change variable
  def toString(self: Node) -> str: # function
    return f"[{self.point.toString()} {self.visited} {self.distFromStart}]"


def emptyPoint() -> Point: # function
  return Point(-1, -1)

class Point

  x: int # property
  y: int # property
  isEmpty: bool # property
  def __init__(self: Point, x: int, y: int) -> None:
    if (x < 0) or (y < 0):
      self.isEmpty = True # change variable
    else:
      self.x = x # change variable
      self.y = y # change variable
  def minDistTo(self: Point, p: Point) -> float: # function
    return math.sqrt(pow((p.x - self.x), 2) + pow((p.y - self.y), 2))
  def isAdjacentTo(self: Point, p: Point) -> bool: # function
    return (self.minDistTo(p) == 1) or (self.minDistTo(p).round(4) == math.sqrt(2).round(4))
  # Returns the 8 theoretically-neighbouring points, whether or not within bounds
  def neighbouringPoints(self: Point) -> list[Point]: # function
    return [Point(self.x - 1, self.y - 1), Point(self.x, self.y - 1), Point(self.x + 1, self.y - 1), Point(self.x - 1, self.y), Point(self.x + 1, self.y), Point(self.x - 1, self.y + 1), Point(self.x, self.y + 1), Point(self.x + 1, self.y + 1)]
  def toString(self: Point) -> str: # function
    return f"{self.x},{self.y}"


Algorithm = Enum('Algorithm', 'dijkstra, aStar, heuristic')

# 'infinity' need only be larger than longest possible route

infinity = 2000.0 # constant

algPrompt = "Enter 'a' for A-star, 'd' for Dijkstra, 'h' for Heuristic" # constant

lightBlue = 0x80abff # constant

orange = 0xe97132 # constant

def getAlgFromLetter(letter: str) -> Algorithm: # function
  algs = ["a":Algorithm.aStar, "d":Algorithm.dijkstra, "h":Algorithm.heuristic] # variable definition
  return algs[letter]

def test_getAlgFromLetter(self) -> None:
  self.assertEqual(getAlgFromLetter("a"), Algorithm.aStar)
  self.assertEqual(getAlgFromLetter("h"), Algorithm.heuristic)
  self.assertEqual(getAlgFromLetter("d"), Algorithm.dijkstra)

def test_point(self) -> None:
  p = Point(0, 0) # variable definition
  n = p.neighbouringPoints() # variable definition
  expected = [Point(-1, -1), Point(0, -1), Point(1, -1), Point(-1, 0), Point(1, 0), Point(-1, 1), Point(0, 1), Point(1, 1)] # variable definition
  self.assertEqual(n, expected)

main()
