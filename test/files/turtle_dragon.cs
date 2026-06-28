// C# with Elan 2.0.0-beta1

static void main() {
  var order = inputIntBetween("Enter order of dragon [1..12]: ", 1, 12);
  clearPrintedText(); // procedure call
  Console.WriteLine($"Dragon of order {order}"); // print statement
  var side = (75/pow(sqrt(2), order));
  var corner = side/12.0/cos(45);
  var turns = left;
  foreach (var i in range(1, order + 1)) {
    turns = setTurns(turns); // assignment
  } // end foreach
  var t = new Turtle();
  setupTurtle(t, order); // procedure call
  drawDragon(t, order, turns, side, corner); // procedure call
} // end main

const String left = "1";

const String right = "0";

static void drawDragon(Turtle t, int order, string turns, double side, double corner) { // procedure
  var p = (200.0/order).floor();
  var turnI = 0;
  foreach (var turn in turns) {
    turnI = (if_(turn.equals(left), 1, -1)); // assignment
    t.turn(-45*turnI); // procedure call
    t.move(corner); // procedure call
    t.turn(-45*turnI); // procedure call
    t.move(side); // procedure call
    sleep_ms(p); // procedure call
  } // end foreach
  t.penUp(); // procedure call
  t.hide(); // procedure call
} // end procedure

static void setupTurtle(Turtle t, int order) { // procedure
  t.turnToHeading(180 + order*45); // procedure call
  t.placeAt(-40, 20); // procedure call
  t.penColour(red); // procedure call
  t.penWidth(10.0/order); // procedure call
  t.penDown(); // procedure call
  t.show(); // procedure call
} // end procedure

static string setTurns(string turns) { // function
  var turnsR = turns + left + reflect(turns);
  // turnsR[0..turnsR.length() - 1]
  return turnsR.subString(0, turnsR.length() - 1);
} // end function

static string reflect(string s) { // function
  var sR = "";
  foreach (var i in range(1, s.length() + 1)) {
    sR = if_((s[i - 1]).equals(left), right, left) + sR; // assignment
  } // end foreach
  return sR;
} // end function

[TestClass] class Test_setTurns
[TestMethod] static void test_setTurns() {
  Assert.AreEqual("11", setTurns("1"));
  Assert.AreEqual("1110", setTurns("11"));
  Assert.AreEqual("110110", setTurns("110"));
  Assert.AreEqual("11011001110010", setTurns("1101100"));
}} // end test

[TestClass] class Test_reflect
[TestMethod] static void test_reflect() {
  Assert.AreEqual("100", reflect("110"));
  Assert.AreEqual("01111", reflect("00001"));
}} // end test
