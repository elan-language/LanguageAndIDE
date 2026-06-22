// C# with Elan 2.0.0-beta-pre1

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
      x = min(new [] {x + 1, 39}); // reassign variable
    } else if (direction == 1) {
      x = max(new [] {x - 1, 0}); // reassign variable
    } else if (direction == 2) {
      y = min(new [] {y + 1, 29}); // reassign variable
    } else if (direction == 3) {
      y = max(new [] {y - 1, 0}); // reassign variable
    } // end if
  } // end while
} // end main
