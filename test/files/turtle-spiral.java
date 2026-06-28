// Java with Elan 2.0.0-beta1

public class Global {

static void main() {
  var t = new Turtle();
  t.placeAt(-100, 75); // procedure call
  t.turnToHeading(90); // procedure call
  foreach (var i in rangeInSteps(150, -1, -5)) {
    t.move(i); // procedure call
    t.turn(90); // procedure call
    sleep_ms(300); // procedure call
  } // end foreach
} // end main
} // end Global
