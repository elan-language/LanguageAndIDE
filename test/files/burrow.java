// Java with Elan 2.0.0-beta1

public class Global {

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
      x = min(list(x + 1, 39)); // reassign variable
    } else if (direction == 1) {
      x = max(list(x - 1, 0)); // reassign variable
    } else if (direction == 2) {
      y = min(list(y + 1, 29)); // reassign variable
    } else if (direction == 3) {
      y = max(list(y - 1, 0)); // reassign variable
    } // end if
  } // end while
} // end main
} // end Global
