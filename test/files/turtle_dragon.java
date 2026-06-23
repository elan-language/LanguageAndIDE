// Java with Elan 2.0.0-beta

public class Global {

static void main() {
  var order = inputIntBetween("Enter order of dragon [1..12]: ", 1, 12);
  clearPrintedText(); // call procedure
  System.out.println(String.format("Dragon of order %", order)); // print
  var side = (75/pow(sqrt(2), order));
  var corner = side/12.0/cos(45);
  var turns = left;
  foreach (var i in range(1, order + 1)) {
    turns = setTurns(turns); // reassign variable
  } // end foreach
  var t = new Turtle();
  setupTurtle(t, order); // call procedure
  drawDragon(t, order, turns, side, corner); // call procedure
} // end main

static final String left = "1"; // constant

static final String right = "0"; // constant

static void drawDragon(Turtle t, int order, String turns, double side, double corner) { // procedure
  var p = (200.0/order).floor();
  var turnI = 0;
  foreach (var turn in turns) {
    turnI = (if_(turn.equals(left), 1, -1)); // reassign variable
    t.turn(-45*turnI); // call procedure
    t.move(corner); // call procedure
    t.turn(-45*turnI); // call procedure
    t.move(side); // call procedure
    sleep_ms(p); // call procedure
  } // end foreach
  t.penUp(); // call procedure
  t.hide(); // call procedure
} // end procedure

static void setupTurtle(Turtle t, int order) { // procedure
  t.turnToHeading(180 + order*45); // call procedure
  t.placeAt(-40, 20); // call procedure
  t.penColour(red); // call procedure
  t.penWidth(10.0/order); // call procedure
  t.penDown(); // call procedure
  t.show(); // call procedure
} // end procedure

static String setTurns(String turns) { // function
  var turnsR = turns + left + reflect(turns);
  // turnsR[0..turnsR.length() - 1]
  return turnsR.subString(0, turnsR.length() - 1);
} // end function

static String reflect(String s) { // function
  var sR = "";
  foreach (var i in range(1, s.length() + 1)) {
    sR = if_((s[i - 1]).equals(left), right, left) + sR; // reassign variable
  } // end foreach
  return sR;
} // end function

@Test static void test_setTurns() {
  assertEquals("11", setTurns("1"));
  assertEquals("1110", setTurns("11"));
  assertEquals("110110", setTurns("110"));
  assertEquals("11011001110010", setTurns("1101100"));
} // end test

@Test static void test_reflect() {
  assertEquals("100", reflect("110"));
  assertEquals("01111", reflect("00001"));
} // end test
} // end Global
