// C# with Elan 2.0.0-alpha1

static void main() {
  var bubbles = new List<CircleVG>();
  // create 20 small bubbles at the bottom
  foreach (i in range(1, 21)) {
    var b = (new CircleVG()).withCentreX(i*5 + 2).withCentreY(75).withRadius(0).withFillColour(transparent).withStrokeColour(randint(0, white));
    bubbles.append(b); // call procedure
  }
  while (true) {
    moveGrowBurst(bubbles); // call procedure
  }
}

static void moveGrowBurst(List<CircleVG> bubbles) { // procedure
  foreach (b in bubbles) {
    if (random() < 0.05) {
      // 5% chance bubble 'bursts' and starts again tiny at bottom
      b.setRadius(0); // call procedure
      b.setCentreY(75); // call procedure
    } else {
      // bubble rises and grows slightly
      b.setCentreY(b.centreY - 1); // call procedure
      b.setRadius(b.radius + 0.2); // call procedure
    }
  }
  displayVectorGraphics(bubbles); // call procedure
  sleep_ms(5); // call procedure
}
