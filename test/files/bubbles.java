// Java with Elan 2.0.0-alpha

static void main() {
  var bubbles = new List<CircleVG>();
  // create 20 small bubbles at the bottom
  for (int i = 1; i <= 20 + 1; i = i + 1) {
    var b = (new CircleVG()).withCentreX(i*5 + 2).withCentreY(75).withRadius(0).withFillColour(transparent).withFillColour(randomInt(0), white);
    bubbles.append(b); // call
  }
  while (true) {
    moveGrowBurst(bubbles); // call
  }
}

static void moveGrowBurst(List<CircleVG> bubbles) { // procedure
  foreach (b in bubbles) {
    if (random() < 0.05) {
      // 5% chance bubble 'bursts' and starts again tiny at bottom
      b.setRadius(0); // call
      b.setCentreY(75); // call
    } else {
      // bubble rises and grows slightly
      b.setCentreY(b.centreY - 1); // call
      b.setRadius(b.radius + 0.2); // call
    }
  }
  displayVectorGraphics(bubbles); // call
  pause(50); // call
}
