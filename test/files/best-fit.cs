// C# with Elan 2.0.0-beta

static (double, double) bestFitLine(List<Point> points) { // function
  var sumX = points.reduce(0.0, double s, Point p => s + p.x); // let
  var sumXsq = points.reduce(0.0, double s, Point p => s + pow(p.x, 2)); // let
  var sumY = points.reduce(0.0, double s, Point p => s + p.y); // let
  var sumXY = points.reduce(0.0, double s, Point p => s + p.x*p.y); // let
  var n = points.length(); // let
  var a = (sumY*sumXsq - sumX*sumXY)/(n*sumXsq - sumX*sumX); // let
  var b = (n*sumXY - sumX*sumY)/(n*sumXsq - sumX*sumX); // let
  return (a, b);
} // function

class Point {

  public double x {get; private set;} // property

  public double y {get; private set;} // property

  public Point(double x, double y) {
    this.x = x; // reassign variable
    this.y = y; // reassign variable
  } // constructor

  public string toString() { // function method
    return $"Point {this.x}, {this.y}";
  } // function method

} // class

static Point newPoint(double x, double y) { // function
  return new Point(x, y);
} // function

[TestMethod] static void test_bestFit() {
  var l1 = new [] {newPoint(0.71, 1.12), newPoint(3.56, 5.36), newPoint(7.83, 9.04)}; // let
  var a_b = bestFitLine(l1); // let
  var a = a_b.item_0; // let
  var b = a_b.item_1; // let
  Assert.AreEqual(0.766, a.round(3));
  Assert.AreEqual(1.093, b.round(3));
} // test

[TestMethod] static void test_bestFit_empty() {
  var l1 = new List<Point>(); // let
  var a_b = bestFitLine(l1); // let
  // NaN means 'Not A Number"
  Assert.AreEqual("(NaN, NaN)", a_b.toString());
} // test
