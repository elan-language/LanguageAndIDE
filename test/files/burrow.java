// Java with Elan 2.0.0-alpha4

static void main() {
  var blocks = createBlockGraphics(white);
  var x = 20;
  var y = 15;
  while (true) {
    blocks[x][y] = red; // re-assign variable
    displayBlocks(blocks); // call procedure
    blocks[x][y] = black; // re-assign variable
    var direction = randint(0, 3);
    if (direction == 0) {
      x = min([x + 1, 39]); // re-assign variable
    } else if (direction == 1) {
      x = max([x - 1, 0]); // re-assign variable
    } else if (direction == 2) {
      y = min([y + 1, 29]); // re-assign variable
    } else if (direction == 3) {
      y = max([y - 1, 0]); // re-assign variable
    }
  }
}
