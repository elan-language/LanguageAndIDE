// C# with Elan 2.0.0-beta

// https://en.wikipedia.org/wiki/Barnsley_fern

// Draws a fractal image

static void main() {
  var vg = new List<VectorGraphic>();
  var s = new State(new RectangleVG(), 0.0, 0.16, new Random());
  // can't call s.r.initialiseFromClock() directly
  var t = s.r;
  t.initialiseFromClock(); // call procedure
  // don't set the count limit too high
  // or the browser will run out of memory
  foreach (count in range(0, 1000)) {
    s = onepoint(s); // reassign variable
    vg.append(s.rect); // call procedure
    displayVectorGraphics(vg); // call procedure
  } // foreach
  Console.WriteLine("Finished"); // print
} // main

// The State class is used as a convenient way to pass multiple

// items in and out.

// The RectangleVG s.rect is ignored when passed in;

// it is just the RectangleVG from last time.

static State onepoint(State s) { // function
  // s.r.asFloat() is the current random number between 0 and 1
  var nx_ny = onestep(s.x, s.y, s.r.asFloat()); // let
  var nx = nx_ny.item_0; // let
  var ny = nx_ny.item_1; // let
  var rect = (new RectangleVG()).withX(nx*scale + 50).withY(75 - ny*scale).withWidth(0.5).withHeight(0.5).withFillColour(0x408040).withFillColour(0x408040).withStrokeWidth(0.25); // let
  // s.r.nextGen() moves the random number generator on to the next number
  return (new State(rect, nx, ny, s.r.nextGen()));
} // function

// r is random Float 0.0 <= r < 1.0

// returns new x and y

// written in a data-driven style

static (double, double) onestep(double x, double y, double r) { // function
  // Currently you can't make the params into one long line
  // as it makes the browser use 100% CPU
  // xx xy yx yy cx cy probablity
  var p1 = [0.0, 0.0, 0.0, 0.16, 0.0, 0.0, 0.01]; // let
  var p2 = [0.85, 0.04, -0.04, 0.85, 0.0, 1.60, 0.85]; // let
  var p3 = [0.20, -0.26, 0.23, 0.22, 0.0, 1.60, 0.07]; // let
  var p4 = [-0.15, 0.28, 0.26, 0.24, 0.0, 0.44, 0.07]; // let
  var allPs = [p1, p2, p3, p4]; // let
  // use the random number r to select one of p1 to p4
  // weighted by the probabilities and put it in pp
  var pp = getparams(r, allPs, 0.0); // let
  return (x*pp[0] + y*pp[1] + pp[4], x*pp[2] + y*pp[3] + pp[5]);
} // function

// select a parameter set depending on random number

// check the first element, cumulate the probability

// return the element when the cumulative probability reaches r

// otherwise recurse with the rest of the list of params

static List<double> getparams(double r, List<List<double>> prms, double cumuprob) { // function
  var head = prms.head(); // let
  var cp2 = cumuprob + head[6]; // let
  return if(r < cp2, head, getparams(r, prms.tail(), cp2));
} // function

// class to hold the working data passed in and out of onepoint()

class State {

  public State(RectangleVG rect, double x, double y, Random r) {
    this.rect = rect; // reassign variable
    this.x = x; // reassign variable
    this.y = y; // reassign variable
    this.r = r; // reassign variable
  } // constructor

  public RectangleVG rect {get; private set;} // property

  public double x {get; private set;} // property

  public double y {get; private set;} // property

  public Random r {get; private set;} // property

  public string toString() { // function method
    return $"rect at {this.rect.x}, {this.rect.y}";
  } // function method

} // class

[TestMethod] static void test_one() {
  Assert.AreEqual([0.0064, 1.736], roundtuple2(onestep(0.0, 0.16, 0.5)));
  Assert.AreEqual([-0.0416, 1.6352], roundtuple2(onestep(0.0, 0.16, 0.9)));
  var s = onepoint(new State(new RectangleVG(), 0.0, 0.16, new Random())); // let
  Assert.AreEqual("rect at 50.0448, 62.848", s.toString());
  var p1 = [0.0, 0.0, 0.0, 0.16, 0.0, 0.0, 0.01]; // let
  var p2 = [0.85, 0.04, -0.04, 0.85, 0.0, 1.60, 0.85]; // let
  Assert.AreEqual(p1, getparams(0.005, [p1, p2], 0.0));
  Assert.AreEqual(p2, getparams(0.03, [p1, p2], 0.0));
  Assert.AreEqual(p2, getparams(0.03, [p2], 0.01));
} // test

// two approaches to rounding a tuple to N decimal places

static (double, double) roundtuple1((double, double) n) { // function
  return (n.item_0.round(8), n.item_1.round(8));
} // function

static List<double> roundtuple2((double, double) n) { // function
  return [n.item_0, n.item_1].map(double x => x.round(8));
} // function

const Int scale = 7;
