// C# with Elan 2.0.0-alpha1

// After image is displayed, press: &nbsp;

// - z to zoom in, x to zoom out

// - arrow keys to pan

// - g, j and y, h to change shape

// &nbsp;

// Acknowledgements:

// https://mathworld.wolfram.com/JuliaSet.html

// Implemented in Elan by Charles Wicksteed

static void main() {
  var p = new Coords();
  while (true) {
    var vg = allpoints(p);
    displayVectorGraphics(vg); // call procedure
    p.checkkeys(); // call procedure
    print($"x = {p.jx} y = {p.jy}");
  }
}

static List<VectorGraphic> allpoints(Coords p) { // function
  var vg2 = new List<VectorGraphic>();
  foreach (xp in range(0, width + 1)) {
    foreach (yp in range(0, height + 1)) {
      // scale and centre
      const Int n = onepoint(divAsFloat(divAsFloat(xp - width, 2), p.scale - p.xoff), divAsFloat(divAsFloat(yp - height, 2), p.scale - p.yoff), nmax, p);
      // colour depends on how many iterations were done for that point
      const Int col = if(n == nmax, 0xffffff, ((n*0x010201) % 0xffffff));
      var rect = (new RectangleVG()).withX(divAsFloat(xp, 2)).withY(divAsFloat(yp, 2)).withWidth(0.5).withHeight(0.5).withFillColour(col).withStrokeWidth(0.25);
      vg2 = vg2.withAppend(rect); // change variable
    }
  }
  return vg2;
}

static int onepoint(double x, double y, int maxnum, Coords p) { // function
  var done = false;
  var a = x;
  var b = y;
  var i = 0;
  while (!done) {
    const Float c = 2*a*b;
    a = (a*a - b*b) + p.jx; // change variable
    b = c + p.jy; // change variable
    i = i + 1; // change variable
    if ((i >= maxnum) || ((a*a + b*b) > 4)) {
      done = true; // change variable
    }
  }
  return i;
}

class Coords {

  public Coords() {
    // number of cells per unit distance on complex plane
    this.scale = 100; // change variable
    // centered on the screen to start
    this.xoff = 0; // change variable
    this.yoff = 0; // change variable
    // Julia set parameters
    this.jx = -0.512; // change variable
    this.jy = 0.521; // change variable
  }
  public string toString() { // function
    return "";
  }
  public double scale {get; private set;} // property
  public double xoff {get; private set;} // property
  public double yoff {get; private set;} // property
  public double jx {get; private set;} // property
  public double jy {get; private set;} // property
  // Arrow keys move the virtual camera
  // eg Arrow Up moves the image down
  public void checkkeys() { // procedure
    const Float panstep = 10/this.scale;
    var jstep = 0.001;
    // save some CPU by not recalculating until a parameter has been changed
    var changed = false;
    while (!changed) {
      var k = getKey();
      // loop because more than one key may have been pressed
      while (!k.equals("")) {
        if (k.equals("z")) {
          this.scale = this.scale*1.2; // change variable
        } else if (k.equals("x")) {
          this.scale = this.scale/1.2; // change variable
        } else if (k.equals("ArrowUp")) {
          this.yoff = this.yoff + panstep; // change variable
        } else if (k.equals("ArrowDown")) {
          this.yoff = this.yoff - panstep; // change variable
        } else if (k.equals("ArrowLeft")) {
          this.xoff = this.xoff + panstep; // change variable
        } else if (k.equals("ArrowRight")) {
          this.xoff = this.xoff - panstep; // change variable
        } else if (k.equals("g")) {
          this.jx = this.jx + jstep; // change variable
        } else if (k.equals("j")) {
          this.jx = this.jx - jstep; // change variable
        } else if (k.equals("y")) {
          this.jy = this.jy + jstep; // change variable
        } else if (k.equals("h")) {
          this.jy = this.jy - jstep; // change variable
          // for autocomplete in the RHS expression, don't type "property"
        } else {
          // ignore erroneous key presses
        }
        // there is no harm in recalculating even if an invalid key was pressed
        changed = true; // change variable
        // another key may have been pressed
        k = getKey(); // change variable
      }
      sleep_ms(10); // call procedure
    }
  }
}

[TestMethod] static void test_one() {
  var p = new Coords();
  Assert.AreEqual(100, onepoint(0, 0, 100, p))
  Assert.AreEqual(3, onepoint(0.5, 0.5, 100, p))
}

const Int width = 200

const Int height = 150

const Int nmax = 360
