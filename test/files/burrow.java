// Java with Elan 2.0.0-alpha1

static void main() {
  var blocks = createBlockGraphics(white);
  var x = 20;
  var y = 15;
  while (true) {
    blocks[x][y] = red; // change variable
    displayBlocks(blocks); // call procedure
    blocks[x][y] = black; // change variable
    var direction = randint(0, 3);
    if (direction == 0) {
      x = min([x + 1, 39]); // change variable
    } else if (direction == 1) {
      x = max([x - 1, 0]); // change variable
    } else if (direction == 2) {
      y = min([y + 1, 29]); // change variable
    } else if (direction == 3) {
      y = max([y - 1, 0]); // change variable
    }
  }
}
