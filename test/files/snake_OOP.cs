// C# with Elan 2.0.0-beta4

// Use the W,A,S,D keys to change Snake direction

static void main() {
  var board = new Board();
  var game = new Game(board);
  while (!game.over()) {
    game.clockTick(getKey()); // procedure call
    var blocks = new BlockGraphics();
    game.updateBlocks(blocks); // procedure call
    displayBlockGraphics(blocks); // procedure call
    sleep_ms(150); // procedure call
  } // end while
  Console.WriteLine($"Game Over! Score: {game.score()}"); // print statement
} // end main

class Game {

  public Game(Board board) {
    this.board = board; // assignment
    this.snake = new Snake(board); // assignment
    this.currentDir = Direction.right; // assignment
    this.newAppleNeeded = true; // assignment
  } // end constructor

  public Board board {get; private set;} // property

  private Snake snake {get; private set;} // private property

  private Direction currentDir {get; private set;} // private property

  private int apple {get; private set;} // private property

  private bool newAppleNeeded {get; private set;} // private property

  public void newAppleIfNeeded() { // procedure method
    while (this.newAppleNeeded) {
      this.apple = randint(0, this.board.maxSquareNo()); // assignment
      if (!this.snake.bodyCovers(this.apple)) {
        this.newAppleNeeded = false; // assignment
      } // end if
    } // end while
  } // end procedure method

  public void clockTick(string key) { // procedure method
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
  } // end procedure method

  public void updateBlocks(BlockGraphics blocks) { // procedure method
    //  TODO 3502
    var snake = this.snake;
    snake.addToBlocks(blocks); // procedure call
    blocks.putBlockNo(this.apple, red); // procedure call
  } // end procedure method

  public void setDirectionIfKeyPress(string key) { // procedure method
    if (key.equals("w")) {
      this.currentDir = Direction.up; // assignment
    } else if (key.equals("s")) {
      this.currentDir = Direction.down; // assignment
    } else if (key.equals("a")) {
      this.currentDir = Direction.left; // assignment
    } else if (key.equals("d")) {
      this.currentDir = Direction.right; // assignment
    } // end if
  } // end procedure method

  public int score() { // function method
    return this.snake.length() - 1;
  } // end function method

  public bool over() { // function method
    return this.snake.dead;
  } // end function method

  public string toString() { // function method
    return "undefined";
  } // end function method

} // end class

class Snake {

  public Snake(Board board) {
    this.board = board; // assignment
    this.body = new [] {620, 619}; // assignment
  } // end constructor

  private List<int> body {get; private set;} // private property

  public Board board {get; private set;} // property

  public bool dead {get; private set;} // property

  public void moveHead(Direction dir) { // procedure method
    var head = this.body[0];
    var col = this.board.col(head);
    var row = this.board.row(head);
    if (dir == Direction.left) {
      col = col - 1; // assignment
    } else if (dir == Direction.right) {
      col = col + 1; // assignment
    } else if (dir == Direction.up) {
      row = row - 1; // assignment
    } else if (dir == Direction.down) {
      row = row + 1; // assignment
    } // end if
    var newHead = this.board.squareNo(col, row);
    var board = this.board;
    if (!this.board.isInBounds(col, row) || this.body.contains(newHead)) {
      this.dead = true; // assignment
    } else {
      //  3502
      var body = this.body;
      body.prepend(newHead); // procedure call
    } // end if
  } // end procedure method

  public void moveTail() { // procedure method
    // 3502
    var body = this.body;
    body.removeAt(this.length() - 1); // procedure call
  } // end procedure method

  public void addToBlocks(BlockGraphics blocks) { // procedure method
    foreach (var block in this.body) {
      blocks.putBlockNo(block, green); // procedure call
    } // end foreach
  } // end procedure method

  public bool bodyCovers(int sq) { // function method
    return this.body.contains(sq);
  } // end function method

  public int length() { // function method
    return this.body.length();
  } // end function method

  public string toString() { // function method
    return $"a Snake of length{this.length()}";
  } // end function method

} // end class

class Board {

  public Board() {
    this.width = 40; // assignment
    this.height = 30; // assignment
  } // end constructor

  private int width {get; private set;} // private property

  private int height {get; private set;} // private property

  public int squareNo(int col, int row) { // function method
    return row*this.width + col;
  } // end function method

  public int maxSquareNo() { // function method
    return this.width*this.height - 1;
  } // end function method

  public int col(int squareNo) { // function method
    return squareNo % this.width;
  } // end function method

  public int row(int squareNo) { // function method
    return divAsInt(squareNo, this.width);
  } // end function method

  public bool isInBounds(int col, int row) { // function method
    return (col >= 0) && (col < this.width) && (row >= 0) && (row < this.height);
  } // end function method

  public string toString() { // function method
    return "undefined";
  } // end function method

} // end class

enum Direction {up, down, left, right}
