// Java with Elan 2.0.0-alpha1

// A program to investigate the Collatz Conjecture

// https://en.wikipedia.org/wiki/Collatz_conjecture

static void main() {
  var x = 1;
  while (x > 0) {
    x = inputInt("Enter a starting number (0 to quit)"); // change variable
    // Array of the values we have seen so far
    var p = [x];
    // capture the max value so we can scale the graph
    var max = x;
    while (x > 1) {
      // Collatz sequence
      if ((x % 2) == 0) {
        x = divAsInt(x, 2); // change variable
      } else {
        x = x*3 + 1; // change variable
      }
      if (x > max) {
        max = x; // change variable
      }
      p.append(x); // call procedure
      // draw what we have got so far, scaled to the canvas
      var vg = new List<VectorGraphic>();
      foreach (i in range(0, p.length() - 1)) {
        vg = vg.withAppend((new LineVG()).withX1(scx(i, p)).withY1(scy(p[i], max)).withX2(scx(i + 1, p)).withY2(scy(p[i + 1], max)).withStrokeWidth(1)); // change variable
      }
      displayVectorGraphics(vg); // call procedure
      print(x);
      sleep_ms(100); // call procedure
    }
  }
  print("Finished");
}

// scale x.  We pass in p just to get its length

static double scx(int i, List<int> p) { // function
  return divAsFloat(i*100, p.length());
}

// scale y

// subtract from 70 because y increases down the canvas

// subtract 1 so that 1 is always at the same place on the canvas

static double scy(int pi, int max) { // function
  return 70 - divAsFloat((pi - 1)*65, (max - 1));
}

final Int grey = 0x808080 // constant
