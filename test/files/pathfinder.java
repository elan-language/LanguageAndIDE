// Java with Elan 2.0.0-beta1

public class Global {

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
    var k = inputStringFromOptions(algPrompt, list("a", "d", "h"));
    clearPrintedText(); // call procedure
    var alg = getAlgFromLetter(k);
    runSolver(gr, start, destination, rocks, solver, alg); // call procedure
  } // end while
} // end main

static void runSolver(List<List<int>> gr, Point start, Point destination, List<Point> rocks, Solver solver, Algorithm alg) { // procedure
  solver.initialise(alg); // call procedure
  var gr2 = initialiseGraphics(start, destination, rocks);
  while (solver.running) {
    solver.visitNextPoint(); // call procedure
    gr2 = addVisited(gr2, solver.getLastVisited()); // reassign variable
    displayBlocks(gr2); // call procedure
    sleep_ms(0); // call procedure
  } // end while
  if (solver.getLastVisited().equals(destination)) {
    var rl = solver.getRouteAndLength();
    var route = rl.item_0;
    var length = rl.item_1;
    gr2 = addRoute(gr2, route); // reassign variable
    displayBlocks(gr2); // call procedure
    printNoLine(String.format("Length of route: % ", length.round(2))); // call procedure
  } else {
    printNoLine("No path found. "); // call procedure
  } // end if
} // end procedure

static void createRocksAndNodes(int percentRocks, List<Point> rocks, List<Node> nodes, Point start, Point dest) { // procedure
  foreach (var x in range(0, 40)) {
    foreach (var y in range(1, 30)) {
      var p = new Point(x, y);
      if (p.equals(start)) {
        nodes.append(new Node(p, 0, p.minDistTo(dest))); // call procedure
      } else if (p.equals(dest)) {
        nodes.append(new Node(p, infinity, 0)); // call procedure
      } else if (random() < divAsFloat(percentRocks, 100)) {
        rocks.append(p); // call procedure
      } else {
        nodes.append(new Node(p, infinity, p.minDistTo(dest))); // call procedure
      } // end if
    } // end foreach
  } // end foreach
} // end procedure

static List<List<int>> initialiseGraphics(Point start, Point dest, List<Point> rocks) { // function
  var gr = createBlockGraphics(white);
  foreach (var rock in rocks) {
    gr = withPut(gr, rock.x, rock.y, black); // reassign variable
  } // end foreach
  gr = withPut(gr, start.x, start.y, green); // reassign variable
  gr = withPut(gr, dest.x, dest.y, red); // reassign variable
  return gr;
} // end function

static List<List<int>> withPut(List<List<int>> graphics, int x, int y, int colour) { // function
  return graphics.withSet(x, graphics[x].withSet(y, colour));
} // end function

static List<List<int>> addVisited(List<List<int>> gr, Point visited) { // function
  return withPut(gr, visited.x, visited.y, lightBlue);
} // end function

static List<List<int>> addRoute(List<List<int>> gr, List<Point> route) { // function
  var graphics = gr;
  foreach (var p in route) {
    graphics = withPut(graphics, p.x, p.y, orange); // reassign variable
  } // end foreach
  var start = route[0];
  var dest = route[route.length() - 1];
  graphics = withPut(graphics, start.x, start.y, green); // reassign variable
  graphics = withPut(graphics, dest.x, dest.y, red); // reassign variable
  return graphics;
} // end function

class Solver {

  public Solver(List<Node> nodes, Point start, Point destination) {
    this.nodes = nodes; // reassign variable
    this.start = start; // reassign variable
    this.destination = destination; // reassign variable
    this.current = new Node(emptyPoint(), 0, 0); // reassign variable
  } // end constructor

  public String toString() { // function method
    return "A Solver";
  } // end function method

  public List<Node> nodes; // property

  public Point start; // property

  public Point destination; // property

  public Node current; // property

  public Algorithm alg; // property

  public boolean running; // property

  // TODO can this go into the constructor ?
  public void initialise(Algorithm alg) { // procedure method
    this.alg = alg; // reassign variable
    this.current = new Node(this.start, 0, infinity); // reassign variable
    this.running = true; // reassign variable
    foreach (var node in this.nodes) {
      node.setDistanceFromStart(infinity); // call procedure
      node.setVia(emptyPoint()); // call procedure
      node.setVisited(false); // call procedure
    } // end foreach
  } // end procedure method

  public void visitNextPoint() { // procedure method
    this.updateNeighbours(); // call procedure
    this.current = this.nextNodeToVisit(); // reassign variable
    if ((this.current.isEmpty || (this.current.point.equals(this.destination)))) {
      this.running = false; // reassign variable
    } else {
      var current = this.current;
      current.setVisited(true); // call procedure
    } // end if
  } // end procedure method

  public void updateNeighbours() { // procedure method
    var distToCurrent = this.current.distFromStart;
    var currentPoint = this.current.point;
    foreach (var neighbour in this.currentNeighbours()) {
      var distViaCurrent = distToCurrent + currentPoint.minDistTo(neighbour.point);
      if (distViaCurrent < neighbour.distFromStart) {
        neighbour.setVia(currentPoint); // call procedure
        neighbour.setDistanceFromStart(distViaCurrent); // call procedure
      } // end if
    } // end foreach
  } // end procedure method

  public List<Node> currentNeighbours() { // function method
    var currentNode = this.current;
    var currentPoint = currentNode.point;
    var neighbours = new List<Node>();
    foreach (var p in currentPoint.neighbouringPoints()) {
      var node = this.getNodeFor(p);
      var point = node.point;
      if (!point.isEmpty) {
        neighbours = neighbours.withAppend(node); // reassign variable
      } // end if
    } // end foreach
    return neighbours;
  } // end function method

  public Node getNodeFor(Point p) { // function method
    var matches = this.nodes.filter((Node n) -> n.point.equals(p));
    return if_(matches.length() == 1, matches.head(), emptyNode());
  } // end function method

  public Point getLastVisited() { // function method
    return this.current.point;
  } // end function method

  public Node nextNodeToVisit() { // function method
    var lowestCostSoFar = infinity;
    var lowestCostNode = emptyNode();
    var possibilities = this.nodes.filter((Node nd) -> (!nd.visited) && (nd.distFromStart < infinity));
    foreach (var nd in possibilities) {
      var cost = this.calculateCost(nd);
      if (cost < lowestCostSoFar) {
        lowestCostSoFar = cost; // reassign variable
        lowestCostNode = nd; // reassign variable
      } // end if
    } // end foreach
    return lowestCostNode;
  } // end function method

  public double calculateCost(Node node) { // function method
    var cost = 0.0;
    var fromStart = node.distFromStart;
    var estToDest = node.estDistToDest;
    if (this.alg == Algorithm.dijkstra) {
      cost = fromStart; // reassign variable
    } else if (this.alg == Algorithm.aStar) {
      cost = fromStart + estToDest; // reassign variable
    } else if (this.alg == Algorithm.heuristic) {
      cost = estToDest; // reassign variable
    } // end if
    return cost;
  } // end function method

  public (List<Point>, double) getRouteAndLength() { // function method
    var route = list(this.destination);
    var length = 0.0;
    var node = this.getNodeFor(this.destination);
    while (!node.point.equals(this.start)) {
      var previous = node.via;
      var p = node.point;
      length = length + p.minDistTo(previous); // reassign variable
      route = route.withInsert(0, previous); // reassign variable
      node = this.getNodeFor(previous); // reassign variable
    } // end while
    return (route, length);
  } // end function method

} // end class

static Node emptyNode() { // function
  return new Node(emptyPoint(), 0, 0);
} // end function

class Node {

  public Node(Point p, double distFromStart, double estDistToDest) {
    if (p.isEmpty) {
      this.isEmpty = true; // reassign variable
    } // end if
    this.point = p; // reassign variable
    this.visited = false; // reassign variable
    this.distFromStart = distFromStart; // reassign variable
    this.via = emptyPoint(); // reassign variable
    this.estDistToDest = estDistToDest; // reassign variable
  } // end constructor

  public Point point; // property

  public boolean visited; // property

  public double distFromStart; // property

  public Point via; // property

  public double estDistToDest; // property

  public boolean isEmpty; // property

  public void setVisited(boolean value) { // procedure method
    this.visited = value; // reassign variable
  } // end procedure method

  public void setDistanceFromStart(double d) { // procedure method
    this.distFromStart = d; // reassign variable
  } // end procedure method

  public void setVia(Point p) { // procedure method
    this.via = p; // reassign variable
  } // end procedure method

  public String toString() { // function method
    return String.format("[% % %]", this.point.toString(), this.visited, this.distFromStart);
  } // end function method

} // end class

static Point emptyPoint() { // function
  return new Point(-1, -1);
} // end function

class Point {

  public int x; // property

  public int y; // property

  public boolean isEmpty; // property

  public Point(int x, int y) {
    if ((x < 0) || (y < 0)) {
      this.isEmpty = true; // reassign variable
    } else {
      this.x = x; // reassign variable
      this.y = y; // reassign variable
    } // end if
  } // end constructor

  public double minDistTo(Point p) { // function method
    return sqrt(pow((p.x - this.x), 2) + pow((p.y - this.y), 2));
  } // end function method

  public boolean isAdjacentTo(Point p) { // function method
    return (this.minDistTo(p) == 1) || (this.minDistTo(p).round(4) == sqrt(2).round(4));
  } // end function method

  // Returns the 8 theoretically-neighbouring points, whether or not within bounds
  public List<Point> neighbouringPoints() { // function method
    return list(new Point(this.x - 1, this.y - 1), new Point(this.x, this.y - 1), new Point(this.x + 1, this.y - 1), new Point(this.x - 1, this.y), new Point(this.x + 1, this.y), new Point(this.x - 1, this.y + 1), new Point(this.x, this.y + 1), new Point(this.x + 1, this.y + 1));
  } // end function method

  public String toString() { // function method
    return String.format("%,%", this.x, this.y);
  } // end function method

} // end class

enum Algorithm {dijkstra, aStar, heuristic}

// 'infinity' need only be larger than longest possible route

static final Float infinity = 2000.0; // constant

static final String algPrompt = "Enter 'a' for A-star, 'd' for Dijkstra, 'h' for Heuristic"; // constant

static final Int lightBlue = 0x80abff; // constant

static final Int orange = 0xe97132; // constant

static Algorithm getAlgFromLetter(String letter) { // function
  var alg = Algorithm.heuristic;
  if (letter.equals("a")) {
    alg = Algorithm.aStar; // reassign variable
  } else if (letter.equals("d")) {
    alg = Algorithm.dijkstra; // reassign variable
  } // end if
  return alg;
} // end function

class Test_getAlgFromLetter {
@Test static void test_getAlgFromLetter() {
  assertEquals(Algorithm.aStar, getAlgFromLetter("a"));
  assertEquals(Algorithm.heuristic, getAlgFromLetter("h"));
  assertEquals(Algorithm.dijkstra, getAlgFromLetter("d"));
}} // end test

class Test_point {
@Test static void test_point() {
  var p = new Point(0, 0);
  var n = p.neighbouringPoints();
  var expected = list(new Point(-1, -1), new Point(0, -1), new Point(1, -1), new Point(-1, 0), new Point(1, 0), new Point(-1, 1), new Point(0, 1), new Point(1, 1));
  assertEquals(expected, n);
}} // end test
} // end Global
