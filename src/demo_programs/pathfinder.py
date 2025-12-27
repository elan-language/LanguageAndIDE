# cb52f9e818bd948ef54f40e199f26f21ddad99f9bf4b71a7fe92ccea1e8455ea Elan 1.9.0 guest default_profile valid

def main -> None:  # [main]
  start = newPoint(5, 5) # [variable definition]
  destination = newPoint(34, 24) # [variable definition]
  percentRocks = inputIntBetween("Enter % rocks (0-100): ", 0, 100) # [variable definition]
  clearPrintedText() # [call procedure]}
  rocks = empty List<of Point> # [variable definition]
  nodes = empty List<of Node> # [variable definition]
  createRocksAndNodes(percentRocks, rocks, nodes, start, destination) # [call procedure]}
  gr = initialiseGraphics(start, destination, rocks) # [variable definition]
  displayBlocks(gr) # [call procedure]}
  solver = new Solver(nodes, start, destination) # [variable definition]
  while true
    option = inputStringFromOptions(algPrompt, ["a", "d", "h"]) # [variable definition]
    clearPrintedText() # [call procedure]}
    alg = algFromLetter[option] # [variable definition]
    runSolver(gr, start, destination, rocks, solver, alg) # [call procedure]}


def runSolver(gr: Array2D<of Int>, start: Point, destination: Point, rocks: List<of Point>, solver: Solver, alg: Algorithm) -> None:  # [procedure]
  solver.initialise(alg) # [call procedure]}
  gr2 = initialiseGraphics(start, destination, rocks) # [variable definition]
  while solver.running
    solver.visitNextPoint() # [call procedure]}
    gr2 = addVisited(gr2, solver.getLastVisited()) # [assign variable]
    displayBlocks(gr2) # [call procedure]}
    pause(0) # [call procedure]}
  if solver.getLastVisited() is destination then
    route, length = solver.getRouteAndLength() # [variable definition]
    gr2 = addRoute(gr2, route) # [assign variable]
    displayBlocks(gr2) # [call procedure]}
    printNoLine("Length of route: {length.round(2)} ") # [call procedure]}
  else
    printNoLine("No path found. ") # [call procedure]}


def createRocksAndNodes(percentRocks: Int, rocks: List<of Point>, nodes: List<of Node>, start: Point, dest: Point) -> None:  # [procedure]
  for x in range(0, 39, 1):  # [for loop]
    for y in range(1, 29, 1):  # [for loop]
      p = newPoint(x, y) # [variable definition]
      if p is start then
        nodes.append(new Node(p, 0, p.minDistTo(dest))) # [call procedure]}
      else if p is dest then
        nodes.append(new Node(p, infinity, 0)) # [call procedure]}
      else if random() < percentRocks/100 then
        rocks.append(p) # [call procedure]}
      else
        nodes.append(new Node(p, infinity, p.minDistTo(dest))) # [call procedure]}


def initialiseGraphics(start: Point, dest: Point, rocks: List<of Point>) -> Array2D<of Int>:  # [function]
  gr = new Array2D<of Int>(40, 30, white) # [variable definition]
  for rock in rocks:  # [each loop]
    gr = gr.withPut(rock.x, rock.y, black) # [assign variable]
  gr = gr.withPut(start.x, start.y, green) # [assign variable]
  gr = gr.withPut(dest.x, dest.y, red) # [assign variable]
  return gr


def addVisited(gr: Array2D<of Int>, visited: Point) -> Array2D<of Int>:  # [function]
  return gr.withPut(visited.x, visited.y, lightBlue)


def addRoute(gr: Array2D<of Int>, route: ListImmutable<of Point>) -> Array2D<of Int>:  # [function]
  gr2 = gr # [variable definition]
  for p in route:  # [each loop]
    gr2 = gr2.withPut(p.x, p.y, orange) # [assign variable]
  start = route[0] # [variable definition]
  dest = route[route.length() - 1] # [variable definition]
  gr2 = gr2.withPut(start.x, start.y, green) # [assign variable]
  gr2 = gr2.withPut(dest.x, dest.y, red) # [assign variable]
  return gr2


class Solver
  constructor(nodes: List<of Node>, start: Point, destination: Point)
    property.nodes = nodes # [assign variable]
    property.start = start # [assign variable]
    property.destination = destination # [assign variable]
  end constructor

  nodes: List<of Node> = None # [property]

  start: Point = None # [property]

  destination: Point = None # [property]

  current: Node = None # [property]

  alg: Algorithm = None # [property]

  running: Boolean = None # [property]

  procedure initialise(alg: Algorithm)
    property.alg = alg # [assign variable]
    property.current = new Node(property.start, 0, infinity) # [assign variable]
    property.running = true # [assign variable]
    for node in property.nodes:  # [each loop]
      node.setDistanceFromStart(infinity) # [call procedure]}
      node.setVia(empty Point) # [call procedure]}
      node.setVisited(false) # [call procedure]}

  procedure visitNextPoint()
    updateNeighbours() # [call procedure]}
    property.current = nextNodeToVisit() # [assign variable]
    if (property.current is empty Node) or (property.current.point is property.destination) then
      property.running = false # [assign variable]
    else
      property.current.setVisited(true) # [call procedure]}

  procedure updateNeighbours()
    distToCurrent = property.current.distFromStart # [variable definition]
    for neighbour in currentNeighbours():  # [each loop]
      currentPoint = property.current.point # [variable definition]
      distViaCurrent = distToCurrent + currentPoint.minDistTo(neighbour.point) # [variable definition]
      if distViaCurrent < neighbour.distFromStart then
        neighbour.setVia(property.current.point) # [call procedure]}
        neighbour.setDistanceFromStart(distViaCurrent) # [call procedure]}

  function currentNeighbours() returns List<of Node>
    neighbours = new List<of Node>() # [variable definition]
    currentPoint = property.current.point # [variable definition]
    for p in currentPoint.neighbouringPoints():  # [each loop]
      node = getNodeFor(p) # [variable definition]
      point = node.point # [variable definition]
      if point.isNotEmpty then
        neighbours = neighbours.withAppend(node) # [assign variable]
    return neighbours
  end function

  function getNodeFor(p: Point) returns Node
    matches = property.nodes.filter(lambda n: Node => n.point is p) # [variable definition]
    return if matches.length() is 1 then matches.head() else empty Node
  end function

  function getLastVisited() returns Point
    return property.current.point
  end function

  function nextNodeToVisit() returns Node
    lowestCostSoFar = infinity # [variable definition]
    lowestCostNode = empty Node # [variable definition]
    possibilities = property.nodes.filter(lambda nd: Node => (not nd.visited) and (nd.distFromStart < infinity)) # [variable definition]
    for nd in possibilities:  # [each loop]
      cost = calculateCost(nd) # [variable definition]
      if cost < lowestCostSoFar then
        lowestCostSoFar = cost # [assign variable]
        lowestCostNode = nd # [assign variable]
    return lowestCostNode
  end function

  function calculateCost(node: Node) returns Float
    cost = 0.0 # [variable definition]
    fromStart = node.distFromStart # [variable definition]
    estToDest = node.estDistToDest # [variable definition]
    if property.alg is Algorithm.dijkstra then
      cost = fromStart # [assign variable]
    else if property.alg is Algorithm.aStar then
      cost = fromStart + estToDest # [assign variable]
    else if property.alg is Algorithm.heuristic then
      cost = estToDest # [assign variable]
    return cost
  end function

  function getRouteAndLength() returns (ListImmutable<of Point>, Float)
    route = {property.destination} # [variable definition]
    length = 0.0 # [variable definition]
    node = getNodeFor(property.destination) # [variable definition]
    while node.point isnt property.start
      previous = node.via # [variable definition]
      p = node.point # [variable definition]
      length = length + p.minDistTo(previous) # [assign variable]
      route = route.withInsert(0, previous) # [assign variable]
      node = getNodeFor(previous) # [assign variable]
    return tuple(route, length)
  end function

end class

class Node
  constructor(p: Point, distFromStart: Float, estDistToDest: Float)
    property.point = p # [assign variable]
    property.visited = false # [assign variable]
    property.distFromStart = distFromStart # [assign variable]
    property.via = empty Point # [assign variable]
    property.estDistToDest = estDistToDest # [assign variable]
  end constructor

  point: Point = None # [property]

  visited: Boolean = None # [property]

  distFromStart: Float = None # [property]

  via: Point = None # [property]

  estDistToDest: Float = None # [property]

  procedure setVisited(value: Boolean)
    property.visited = value # [assign variable]

  procedure setDistanceFromStart(d: Float)
    property.distFromStart = d # [assign variable]

  procedure setVia(p: Point)
    property.via = p # [assign variable]

  function asString() returns String
    return "[{property.point.asString()} {property.visited} {property.distFromStart}]"
  end function

end class

record Point
  x: Int = None # [property]

  y: Int = None # [property]

  isNotEmpty: Boolean = None # [property]

  function minDistTo(p: Point) returns Float
    return sqrt((p.x - property.x)^2 + (p.y - property.y)^2)
  end function

  function isAdjacentTo(p: Point) returns Boolean
    return (minDistTo(p) is 1) or (minDistTo(p).round(4) is sqrt(2).round(4))
  end function

  # Returns the 8 theoretically-neighbouring points, whether or not within bounds
  function neighbouringPoints() returns ListImmutable<of Point>
    return {newPoint(property.x - 1, property.y - 1), newPoint(property.x, property.y - 1), newPoint(property.x + 1, property.y - 1), newPoint(property.x - 1, property.y), newPoint(property.x + 1, property.y), newPoint(property.x - 1, property.y + 1), newPoint(property.x, property.y + 1), newPoint(property.x + 1, property.y + 1)}
  end function

  function asString() returns String
    return "{property.x},{property.y}"
  end function

end record

def newPoint(x: Int, y: Int) -> Point:  # [function]
  return new Point() with x set to x, y set to y, isNotEmpty set to true


Algorithm = Enum ('Algorithm', 'dijkstra, aStar, heuristic'})

# 'infinity' need only be larger than longest possible route
infinity = 2000.0

algFromLetter = {"a":Algorithm.aStar, "d":Algorithm.dijkstra, "h":Algorithm.heuristic}

algPrompt = "Enter 'a' for A-star, 'd' for Dijkstra, 'h' for Heuristic"

lightBlue = 0x80abff

orange = 0xe97132

def test_point() -> None:  # [test]
  p = newPoint(0, 0) # [variable definition]
  n = p.neighbouringPoints() # [variable definition]
  expected = {newPoint(-1, -1), newPoint(0, -1), newPoint(1, -1), newPoint(-1, 0), newPoint(1, 0), newPoint(-1, 1), newPoint(0, 1), newPoint(1, 1)} # [variable definition]
  assertEqual(n, expected)  # [assert]


