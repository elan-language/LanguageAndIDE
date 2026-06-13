// C# with Elan 2.0.0-beta

static void main() {
  var blocks = createBlockGraphics(white);
  var x = 20;
  var y = 15;
  while (true) {
    blocks[x][y] = red; // reassign variable
    displayBlocks(blocks); // call procedure
    blocks[x][y] = black; // reassign variable
    var direction = randint(0, 3);
    if (direction == 0) {
      x = min([x + 1, 39]); // reassign variable
    } else if (direction == 1) {
      x = max([x - 1, 0]); // reassign variable
    } else if (direction == 2) {
      y = min([y + 1, 29]); // reassign variable
    } else if (direction == 3) {
      y = max([y - 1, 0]); // reassign variable
    } // if
  } // while
} // main
