// Java with Elan 2.0.0-beta1

public class Global {

static void main() {
  var blocks = createBlockGraphics(white);
  var x = 20;
  var y = 15;
  while (true) {
    blocks[x][y] = red; // assignment
    displayBlocks(blocks); // call procedure
    blocks[x][y] = black; // assignment
    var direction = randint(0, 3);
    if (direction == 0) {
      x = min(list(x + 1, 39)); // assignment
    } else if (direction == 1) {
      x = max(list(x - 1, 0)); // assignment
    } else if (direction == 2) {
      y = min(list(y + 1, 29)); // assignment
    } else if (direction == 3) {
      y = max(list(y - 1, 0)); // assignment
    } // end if
  } // end while
} // end main
} // end Global
