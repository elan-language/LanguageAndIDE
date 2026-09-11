// C# with Elan 2.0.0-beta4

static void main() {
  var blocks = new BlockGraphics();
  while (true) {
    var x = randint(0, 19);
    var y = randint(0, 14);
    var colour = randint(0, (pow(2, 24) - 1).floor());
    blocks.put(20 + x, 15 - y, colour); // procedure call
    blocks.put(20 + x, 15 + y, colour); // procedure call
    blocks.put(20 - x, 15 - y, colour); // procedure call
    blocks.put(20 - x, 15 + y, colour); // procedure call
    displayBlockGraphics(blocks); // procedure call
  } // end while
} // end main
