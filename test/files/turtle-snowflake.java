// Java with Elan 2.0.0-alpha5

public class Global {

static void main() {
  var t = new Turtle();
  t.placeAt(-50, 30); // call procedure
  t.turn(90); // call procedure
  foreach (i in range(1, 4)) {
    drawSide(side, t); // call procedure
    t.turn(120); // call procedure
  } // foreach
} // main

static void drawSide(double length, Turtle t) { // procedure
  if ((length > 1)) {
    var third = length/3;
    drawSide(third, t); // call procedure
    t.turn(-60); // call procedure
    drawSide(third, t); // call procedure
    t.turn(120); // call procedure
    drawSide(third, t); // call procedure
    t.turn(-60); // call procedure
    drawSide(third, t); // call procedure
  } else {
    t.move(length); // call procedure
  } // if
} // procedure

final Int side = 100 // constant

}
