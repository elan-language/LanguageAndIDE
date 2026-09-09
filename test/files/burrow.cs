// C# with Elan 2.0.0-beta4

static void main() {
  var blocks = new BlockGraphics();
  var x = 20;
  var y = 15;
  while (true) {
    blocks.put(x, y, red); // procedure call
    blocks.display(); // procedure call
    blocks.put(x, y, black); // procedure call
    var direction = randint(0, 3);
    if (direction == 0) {
      x = min(new [] {x + 1, 39}); // assignment
    } else if (direction == 1) {
      x = max(new [] {x - 1, 0}); // assignment
    } else if (direction == 2) {
      y = min(new [] {y + 1, 29}); // assignment
    } else if (direction == 3) {
      y = max(new [] {y - 1, 0}); // assignment
    } // end if
  } // end while
} // end main
