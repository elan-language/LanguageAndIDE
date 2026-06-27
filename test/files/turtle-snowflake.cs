// C# with Elan 2.0.0-beta1

static void main() {
  var t = new Turtle();
  t.placeAt(-50, 30); // procedure call
  t.turn(90); // procedure call
  foreach (var i in range(1, 4)) {
    drawSide(side, t); // procedure call
    t.turn(120); // procedure call
  } // end foreach
} // end main

static void drawSide(double length, Turtle t) { // procedure
  if ((length > 1)) {
    var third = length/3;
    drawSide(third, t); // procedure call
    t.turn(-60); // procedure call
    drawSide(third, t); // procedure call
    t.turn(120); // procedure call
    drawSide(third, t); // procedure call
    t.turn(-60); // procedure call
    drawSide(third, t); // procedure call
  } else {
    t.move(length); // procedure call
  } // end if
} // end procedure

const Int side = 100;
