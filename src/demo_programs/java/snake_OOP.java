// Java with Elan 2.0.0-beta5

public class Global {

// Use the W,A,S,D keys to change Snake direction

static final int width = 40; // constant

static final int height = 30; // constant

static void main() {
  var game = new Game();
  while (game.isOn) {
    game.clockTick(getKey()); // procedure call
    var blocks = new BlockGraphics();
    game.updateBlocks(blocks); // procedure call
    displayBlockGraphics(blocks); // procedure call
    sleep_ms(150); // procedure call
  } // end while
  System.out.println(String.format("Game Over! Score: %", game.score())); // print statement
} // end main

class Game {

  public Game() {
    this.snake = new Snake(620); // assignment
    this.currentDir = "d"; // assignment
    this.newAppleNeeded = true; // assignment
    this.isOn = true; // assignment
  } // end constructor

  private Snake snake; // private property

  private String currentDir; // private property

  private int apple; // private property

  private boolean newAppleNeeded; // private property

  public boolean isOn; // property

  public void newAppleIfNeeded() { // procedure method
    while (this.newAppleNeeded || this.snake.bodyCovers(this.apple)) {
      this.apple = randint(0, width*height - 1); // assignment
      this.newAppleNeeded = false; // assignment
    } // end while
  } // end procedure method

  public void clockTick(String key) { // procedure method
    this.newAppleIfNeeded(); // procedure call
    this.setDirectionIfKeyPress(key); // procedure call
    //  TODO 3502
    var snake = this.snake;
    snake.moveHead(this.currentDir); // procedure call
    if (snake.bodyCovers(this.apple)) {
      this.newAppleNeeded = true; // assignment
    } else if (!snake.dead) {
      snake.moveTail(); // procedure call
    } // end if
    if (snake.dead) {
      this.isOn = false; // assignment
    } // end if
  } // end procedure method

  public void updateBlocks(BlockGraphics blocks) { // procedure method
    //  TODO 3502
    var snake = this.snake;
    snake.addToBlocks(blocks); // procedure call
    blocks.putBlockNo(this.apple, red); // procedure call
  } // end procedure method

  public void setDirectionIfKeyPress(String key) { // procedure method
    if (!key.equals("") && "wasd".contains(key)) {
      this.currentDir = key; // assignment
    } // end if
  } // end procedure method

  public int score() { // function method
    return this.snake.length() - 1;
  } // end function method

  public String toString() { // function method
    return "undefined";
  } // end function method

} // end class

class Snake {

  public Snake(int head) {
    this.head = head; // assignment
    this.body = list(this.head - 1, this.head); // assignment
  } // end constructor

  public int head; // property

  private List<int> body; // private property

  public boolean dead; // property

  public void moveHead(String dir) { // procedure method
    var newCol = this.head % width;
    var newRow = divAsInt(this.head, width);
    if (dir.equals("w")) {
      newRow = newRow - 1; // assignment
    } else if (dir.equals("a")) {
      newCol = newCol - 1; // assignment
    } else if (dir.equals("s")) {
      newRow = newRow + 1; // assignment
    } else if (dir.equals("d")) {
      newCol = newCol + 1; // assignment
    } // end if
    this.head = -1; // assignment
    if ((newCol >= 0) && (newCol < width) && (newRow >= 0) && (newRow < height)) {
      this.head = newRow*width + newCol; // assignment
    } // end if
    if ((this.head == -1) || this.body.contains(this.head)) {
      this.dead = true; // assignment
    } else {
      //  3502
      var body = this.body;
      body.append(this.head); // procedure call
    } // end if
  } // end procedure method

  public void moveTail() { // procedure method
    // 3502
    var body = this.body;
    body.removeAt(0); // procedure call
  } // end procedure method

  public void addToBlocks(BlockGraphics blocks) { // procedure method
    foreach (var block in this.body) {
      blocks.putBlockNo(block, green); // procedure call
    } // end foreach
  } // end procedure method

  public boolean bodyCovers(int sq) { // function method
    return this.body.contains(sq);
  } // end function method

  public int length() { // function method
    return this.body.length();
  } // end function method

  public String toString() { // function method
    return String.format("a Snake", );
  } // end function method

} // end class
} // end Global
