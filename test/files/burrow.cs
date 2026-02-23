// C# with Elan 2.0.0-alpha

static void main() {
  var blocks = createBlockGraphics(white);
  var x = 20;
  var y = 15;
  while (true) {
    blocks.put(x, y, red); // call
    displayBlocks(blocks); // call
    blocks.put(x, y, black); // call
    var direction = randomInt(0, 3);
    if (direction is 0) {
      x = minInt([x + 1, 39]); // set
    } else if (direction is 1) {
      x = maxInt([x - 1, 0]); // set
    } else if (direction is 2) {
      y = minInt([y + 1, 29]); // set
    } else if (direction is 3) {
      y = maxInt([y - 1, 0]); // set
    }
  }
}
