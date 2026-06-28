// Java with Elan 2.0.0-beta1

public class Global {

static void main() {
  var bubbles = new List<CircleVG>();
  // create 20 small bubbles at the bottom
  foreach (var i in range(1, 21)) {
    var b = (new CircleVG()).withCentreX(i*5 + 2).withCentreY(75).withRadius(0).withFillColour(transparent).withStrokeColour(randint(0, white));
    bubbles.append(b); // procedure call
  } // end foreach
  while (true) {
    moveGrowBurst(bubbles); // procedure call
  } // end while
} // end main

static void moveGrowBurst(List<CircleVG> bubbles) { // procedure
  foreach (var b in bubbles) {
    if (random() < 0.05) {
      // 5% chance bubble 'bursts' and starts again tiny at bottom
      b.setRadius(0); // procedure call
      b.setCentreY(75); // procedure call
    } else {
      // bubble rises and grows slightly
      b.setCentreY(b.centreY - 1); // procedure call
      b.setRadius(b.radius + 0.2); // procedure call
    } // end if
  } // end foreach
  displayVectorGraphics(bubbles); // procedure call
  sleep_ms(5); // procedure call
} // end procedure
} // end Global
