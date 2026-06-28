// C# with Elan 2.0.0-beta1

static void main() {
  var blocks = createBlockGraphics(white);
  while (true) {
    var x = randint(0, 19);
    var y = randint(0, 14);
    var colour = randint(0, (pow(2, 24) - 1).floor());
    blocks[20 + x][15 - y] = colour; // assignment
    blocks[20 + x][15 + y] = colour; // assignment
    blocks[20 - x][15 - y] = colour; // assignment
    blocks[20 - x][15 + y] = colour; // assignment
    displayBlocks(blocks); // procedure call
  } // end while
} // end main
