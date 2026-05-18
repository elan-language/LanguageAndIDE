// Java with Elan 2.0.0-alpha4

static void main() {
  var t = new Turtle();
  t.placeAt(-100, 75); // call procedure
  t.turnToHeading(90); // call procedure
  foreach (i in rangeInSteps(150, -1, -5)) {
    t.move(i); // call procedure
    t.turn(90); // call procedure
    sleep_ms(300); // call procedure
  }
}
