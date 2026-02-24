// C# with Elan 2.0.0-alpha

static void main() {
  var bubbles = new List<CircleVG>();
  // create 20 small bubbles at the bottom
  for (int i = 1; i <= 20; i = i + 1) {
    var b = new CircleVG() with centreX set to i*5 + 2, centreY set to 75, radius set to 0, fillColour set to transparent, strokeColour set to randomInt(0, white);
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
