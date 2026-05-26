// Java with Elan 2.0.0-alpha5

// https://en.wikipedia.org/wiki/Barnsley_fern

// Draws a fractal image

static void main() {
  var vg = new List<VectorGraphic>();
  // coordinates
  var x = 0.0;
  var y = 0.16;
  // random number
  var r = new Random();
  r.initialiseFromClock(); // call procedure
  var rect = new RectangleVG();
  var count = 0;
  // don't set the count limit too high
  // or the browser will run out of memory
  while (count < 1000) {
    var point = onepoint(x, y, r);
    rect = point.item_0; // re-assign variable
    x = point.item_1; // re-assign variable
    y = point.item_2; // re-assign variable
    r = point.item_3; // re-assign variable
    vg.append(rect); // call procedure
    displayVectorGraphics(vg); // call procedure
    count = count + 1; // re-assign variable
  } // while
  print("Finished");
} // main

static (RectangleVG, double, double, Random) onepoint(double x, double y, Random r) { // function
  // next pseudo-random number (Grogono parameters)
  var rValue = r.asFloat();
  var rNext = r.nextGen();
  var nx_ny = onestep(x, y, rValue);
  var nx = nx_ny.item_0;
  var ny = nx_ny.item_1;
  var rect = (new RectangleVG()).withX(nx*scale + 50).withY(75 - ny*scale).withWidth(0.5).withHeight(0.5).withFillColour(0x408040).withFillColour(0x408040).withStrokeWidth(0.25);
  return (rect, nx, ny, rNext);
} // function

// r is random Float 0.0 <= r < 1.0

// returns new x and y

// written in a data-driven style

static (double, double) onestep(double x, double y, double r) { // function
  // Currently you can't make the params into one long line
  // as it makes the browser use 100% CPU
  // xx xy yx yy cx cy probablity
  var p1 = [0.0, 0.0, 0.0, 0.16, 0.0, 0.0, 0.01];
  var p2 = [0.85, 0.04, -0.04, 0.85, 0.0, 1.60, 0.85];
  var p3 = [0.20, -0.26, 0.23, 0.22, 0.0, 1.60, 0.07];
  var p4 = [-0.15, 0.28, 0.26, 0.24, 0.0, 0.44, 0.07];
  var allPs = [p1, p2, p3, p4];
  // cumulative probabilty
  var cumuprob = 0.0;
  var done = false;
  var nx = 0.0;
  var ny = 0.0;
  foreach (pp in allPs) {
    cumuprob = cumuprob + pp[6]; // re-assign variable
    if ((!done) && (r < cumuprob)) {
      nx = x*pp[0] + y*pp[1] + pp[4]; // re-assign variable
      ny = x*pp[2] + y*pp[3] + pp[5]; // re-assign variable
      done = true; // re-assign variable
    } // if
  } // foreach
  return (nx, ny);
} // function

@Test static void test_one() {
  assertEquals([0.0064, 1.736], roundtuple2(onestep(0.0, 0.16, 0.5)))
  assertEquals([-0.0416, 1.6352], roundtuple2(onestep(0.0, 0.16, 0.9)))
} // test

// two approaches to rounding a tuple to N decimal places

static (double, double) roundtuple1((double, double) n) { // function
  var a = n.item_0;
  var b = n.item_1;
  return (a.round(8), b.round(8));
} // function

static List<double> roundtuple2((double, double) n) { // function
  var a = n.item_0;
  var b = n.item_1;
  return [a, b].map((double x) -> x.round(8));
} // function

final Int scale = 7 // constant
