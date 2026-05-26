// C# with Elan 2.0.0-alpha4

static void main() {
  var start = new Point(5, 5);
  var destination = new Point(34, 24);
  var percentRocks = inputIntBetween("Enter % rocks (0-100): ", 0, 100);
  clearPrintedText(); // call procedure
  var rocks = new List<Point>();
  var nodes = new List<Node>();
  createRocksAndNodes(percentRocks, rocks, nodes, start, destination); // call procedure
  var gr = initialiseGraphics(start, destination, rocks);
  displayBlocks(gr); // call procedure
  var solver = new Solver(nodes, start, destination);
  while (true) {
    var k = inputStringFromOptions(algPrompt, ["a", "d", "h"]);
    clearPrintedText(); // call procedure
    var alg = getAlgFromLetter(k);
    runSolver(gr, start, destination, rocks, solver, alg); // call procedure
  } // while
} // main

static void runSolver(List<List<int>> gr, Point start, Point destination, List<Point> rocks, Solver solver, Algorithm alg) { // procedure
  solver.initialise(alg); // call procedure
  var gr2 = initialiseGraphics(start, destination, rocks);
  while (solver.running) {
    solver.visitNextPoint(); // call procedure
    gr2 = addVisited(gr2, solver.getLastVisited()); // re-assign variable
    displayBlocks(gr2); // call procedure
    sleep_ms(0); // call procedure
  } // while
  if (solver.getLastVisited().equals(destination)) {
    var rl = solver.getRouteAndLength();
    var route = rl.item_0;
    var length = rl.item_1;
    gr2 = addRoute(gr2, route); // re-assign variable
    displayBlocks(gr2); // call procedure
    printNoLine($"Length of route: {length.round(2)} "); // call procedure
  } else {
    printNoLine("No path found. "); // call procedure
  } // if
} // procedure

static void createRocksAndNodes(int percentRocks, List<Point> rocks, List<Node> nodes, Point start, Point dest) { // procedure
  foreach (x in range(0, 40)) {
    foreach (y in range(1, 30)) {
      var p = new Point(x, y);
      if (p.equals(start)) {
        nodes.append(new Node(p, 0, p.minDistTo(dest))); // call procedure
      } else if (p.equals(dest)) {
        nodes.append(new Node(p, infinity, 0)); // call procedure
      } else if (random() < divAsFloat(percentRocks, 100)) {
        rocks.append(p); // call procedure
      } else {
        nodes.append(new Node(p, infinity, p.minDistTo(dest))); // call procedure
      } // if
    } // foreach
  } // foreach
} // procedure

static List<List<int>> initialiseGraphics(Point start, Point dest, List<Point> rocks) { // function
  var gr = createBlockGraphics(white);
  foreach (rock in rocks) {
    gr = withPut(gr, rock.x, rock.y, black); // re-assign variable
  } // foreach
  gr = withPut(gr, start.x, start.y, green); // re-assign variable
  gr = withPut(gr, dest.x, dest.y, red); // re-assign variable
  return gr;
} // function

static List<List<int>> withPut(List<List<int>> graphics, int x, int y, int colour) { // function
  return graphics.withSet(x, graphics[x].withSet(y, colour));
} // function

static List<List<int>> addVisited(List<List<int>> gr, Point visited) { // function
  return withPut(gr, visited.x, visited.y, lightBlue);
} // function

static List<List<int>> addRoute(List<List<int>> gr, List<Point> route) { // function
  var graphics = gr;
  foreach (p in route) {
    graphics = withPut(graphics, p.x, p.y, orange); // re-assign variable
  } // foreach
  var start = route[0];
  var dest = route[route.length() - 1];
  graphics = withPut(graphics, start.x, start.y, green); // re-assign variable
  graphics = withPut(graphics, dest.x, dest.y, red); // re-assign variable
  return graphics;
} // function

class Solver {

  public Solver(List<Node> nodes, Point start, Point destination) {
    this.nodes = nodes; // re-assign variable
    this.start = start; // re-assign variable
    this.destination = destination; // re-assign variable
    this.current = new Node(emptyPoint(), 0, 0); // re-assign variable
  } // constructor
  public string toString() { // function method
    return "";
  } // function method
  public List<Node> nodes {get; private set;} // property
  public Point start {get; private set;} // property
  public Point destination {get; private set;} // property
  public Node current {get; private set;} // property
  public Algorithm alg {get; private set;} // property
  public bool running {get; private set;} // property
  // TODO can this go into the constructor ?
  public void initialise(Algorithm alg) { // procedure method
    this.alg = alg; // re-assign variable
    this.current = new Node(this.start, 0, infinity); // re-assign variable
    this.running = true; // re-assign variable
    foreach (node in this.nodes) {
      node.setDistanceFromStart(infinity); // call procedure
      node.setVia(emptyPoint()); // call procedure
      node.setVisited(false); // call procedure
    } // foreach
  } // procedure method
  public void visitNextPoint() { // procedure method
    this.updateNeighbours(); // call procedure
    this.current = this.nextNodeToVisit(); // re-assign variable
    if ((this.current.isEmpty || (this.current.point.equals(this.destination)))) {
      this.running = false; // re-assign variable
    } else {
      var current = this.current;
      current.setVisited(true); // call procedure
    } // if
  } // procedure method
  public void updateNeighbours() { // procedure method
    var distToCurrent = this.current.distFromStart;
    var currentPoint = this.current.point;
    foreach (neighbour in this.currentNeighbours()) {
      var distViaCurrent = distToCurrent + currentPoint.minDistTo(neighbour.point);
      if (distViaCurrent < neighbour.distFromStart) {
        neighbour.setVia(currentPoint); // call procedure
        neighbour.setDistanceFromStart(distViaCurrent); // call procedure
      } // if
    } // foreach
  } // procedure method
  public List<Node> currentNeighbours() { // function method
    var currentNode = this.current;
    var currentPoint = currentNode.point;
    var neighbours = new List<Node>();
    foreach (p in currentPoint.neighbouringPoints()) {
      var node = this.getNodeFor(p);
      var point = node.point;
      if (!point.isEmpty) {
        neighbours = neighbours.withAppend(node); // re-assign variable
      } // if
    } // foreach
    return neighbours;
  } // function method
  public Node getNodeFor(Point p) { // function method
    var matches = this.nodes.filter(Node n => n.point.equals(p));
    return if(matches.length() == 1, matches.head(), emptyNode());
  } // function method
  public Point getLastVisited() { // function method
    return this.current.point;
  } // function method
  public Node nextNodeToVisit() { // function method
    var lowestCostSoFar = infinity;
    var lowestCostNode = emptyNode();
    var possibilities = this.nodes.filter(Node nd => (!nd.visited) && (nd.distFromStart < infinity));
    foreach (nd in possibilities) {
      var cost = this.calculateCost(nd);
      if (cost < lowestCostSoFar) {
        lowestCostSoFar = cost; // re-assign variable
        lowestCostNode = nd; // re-assign variable
      } // if
    } // foreach
    return lowestCostNode;
  } // function method
  public double calculateCost(Node node) { // function method
    var cost = 0.0;
    var fromStart = node.distFromStart;
    var estToDest = node.estDistToDest;
    if (this.alg == Algorithm.dijkstra) {
      cost = fromStart; // re-assign variable
    } else if (this.alg == Algorithm.aStar) {
      cost = fromStart + estToDest; // re-assign variable
    } else if (this.alg == Algorithm.heuristic) {
      cost = estToDest; // re-assign variable
    } // if
    return cost;
  } // function method
  public (List<Point>, double) getRouteAndLength() { // function method
    var route = [this.destination];
    var length = 0.0;
    var node = this.getNodeFor(this.destination);
    while (!node.point.equals(this.start)) {
      var previous = node.via;
      var p = node.point;
      length = length + p.minDistTo(previous); // re-assign variable
      route = route.withInsert(0, previous); // re-assign variable
      node = this.getNodeFor(previous); // re-assign variable
    } // while
    return (route, length);
  } // function method
} // class

static Node emptyNode() { // function
  return new Node(emptyPoint(), 0, 0);
} // function

class Node {

  public Node(Point p, double distFromStart, double estDistToDest) {
    if (p.isEmpty) {
      this.isEmpty = true; // re-assign variable
    } // if
    this.point = p; // re-assign variable
    this.visited = false; // re-assign variable
    this.distFromStart = distFromStart; // re-assign variable
    this.via = emptyPoint(); // re-assign variable
    this.estDistToDest = estDistToDest; // re-assign variable
  } // constructor
  public Point point {get; private set;} // property
  public bool visited {get; private set;} // property
  public double distFromStart {get; private set;} // property
  public Point via {get; private set;} // property
  public double estDistToDest {get; private set;} // property
  public bool isEmpty {get; private set;} // property
  public void setVisited(bool value) { // procedure method
    this.visited = value; // re-assign variable
  } // procedure method
  public void setDistanceFromStart(double d) { // procedure method
    this.distFromStart = d; // re-assign variable
  } // procedure method
  public void setVia(Point p) { // procedure method
    this.via = p; // re-assign variable
  } // procedure method
  public string toString() { // function method
    return $"[{this.point.toString()} {this.visited} {this.distFromStart}]";
  } // function method
} // class

static Point emptyPoint() { // function
  return new Point(-1, -1);
} // function

class Point {

  public int x {get; private set;} // property
  public int y {get; private set;} // property
  public bool isEmpty {get; private set;} // property
  public Point(int x, int y) {
    if ((x < 0) || (y < 0)) {
      this.isEmpty = true; // re-assign variable
    } else {
      this.x = x; // re-assign variable
      this.y = y; // re-assign variable
    } // if
  } // constructor
  public double minDistTo(Point p) { // function method
    return sqrt(pow((p.x - this.x), 2) + pow((p.y - this.y), 2));
  } // function method
  public bool isAdjacentTo(Point p) { // function method
    return (this.minDistTo(p) == 1) || (this.minDistTo(p).round(4) == sqrt(2).round(4));
  } // function method
  // Returns the 8 theoretically-neighbouring points, whether or not within bounds
  public List<Point> neighbouringPoints() { // function method
    return [new Point(this.x - 1, this.y - 1), new Point(this.x, this.y - 1), new Point(this.x + 1, this.y - 1), new Point(this.x - 1, this.y), new Point(this.x + 1, this.y), new Point(this.x - 1, this.y + 1), new Point(this.x, this.y + 1), new Point(this.x + 1, this.y + 1)];
  } // function method
  public string toString() { // function method
    return $"{this.x},{this.y}";
  } // function method
} // class

enum Algorithm {dijkstra, aStar, heuristic}

// 'infinity' need only be larger than longest possible route

const Float infinity = 2000.0

const String algPrompt = "Enter 'a' for A-star, 'd' for Dijkstra, 'h' for Heuristic"

const Int lightBlue = 0x80abff

const Int orange = 0xe97132

static Algorithm getAlgFromLetter(string letter) { // function
  var algs = ["a":Algorithm.aStar, "d":Algorithm.dijkstra, "h":Algorithm.heuristic];
  return algs[letter];
} // function

[TestMethod] static void test_getAlgFromLetter() {
  Assert.AreEqual(Algorithm.aStar, getAlgFromLetter("a"))
  Assert.AreEqual(Algorithm.heuristic, getAlgFromLetter("h"))
  Assert.AreEqual(Algorithm.dijkstra, getAlgFromLetter("d"))
} // 

[TestMethod] static void test_point() {
  var p = new Point(0, 0);
  var n = p.neighbouringPoints();
  var expected = [new Point(-1, -1), new Point(0, -1), new Point(1, -1), new Point(-1, 0), new Point(1, 0), new Point(-1, 1), new Point(0, 1), new Point(1, 1)];
  Assert.AreEqual(expected, n)
} // 
