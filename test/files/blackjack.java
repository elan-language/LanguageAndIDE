// Java with Elan 2.0.0-beta2

public class Global {

static void main() {
  var game = new Game(1000);
  game.addPlayer(new HumanPlayer("Player A", 1000)); // procedure call
  var anotherRound = true;
  while (anotherRound) {
    playOneRound(game); // procedure call
    game.setMessage("Points updated. Do you want to play another round? (press y or n)"); // procedure call
    clearKeyBuffer(); // procedure call
    display(game); // procedure call
    var k = waitForKey().lowerCase();
    if (k.equals("y")) {
      game.setMessage(""); // procedure call
    } else {
      anotherRound = false; // assignment
    } // end if
  } // end while
} // end main

static void playOneRound(Game game) { // procedure
  game.newRound(); // procedure call
  display(game); // procedure call
  var dealer = game.dealer;
  var faceCard = dealer.faceCard;
  foreach (var player in game.players) {
    player.startTurn(); // procedure call
    display(game); // procedure call
    while (player.status == Status.active) {
      player.nextAction(faceCard); // procedure call
      display(game); // procedure call
    } // end while
  } // end foreach
  dealer.play(); // procedure call
  display(game); // procedure call
  while (dealer.status == Status.active) {
    dealer.nextAction(faceCard); // procedure call
    display(game); // procedure call
  } // end while
  game.updatePoints(); // procedure call
} // end procedure

static void display(Game game) { // procedure
  var html = String.format("<style>%</style>%", styleSheet, htmlForGame(game));
  displayHtml(html); // procedure call
  sleep(1.5); // procedure call
} // end procedure

static Outcome determinePlayerOutcome(Dealer dealer, Player player) { // function
  var d = dealer.status;
  var dTotal = dealer.handTotal;
  var p = player.status;
  var pTotal = player.handTotal;
  var bust = Status.bust;
  var bj = Status.blackjack;
  var win = Outcome.win;
  var winDouble = Outcome.winDouble;
  var lose = Outcome.lose;
  var draw = Outcome.draw;
  var playerOutcome = draw;
  if (p == bust) {
    playerOutcome = lose; // assignment
  } else if ((p == bj) && (d != bj)) {
    playerOutcome = winDouble; // assignment
  } else if (d == bust) {
    playerOutcome = win; // assignment
  } else if ((d == bj) && (p == bj)) {
    playerOutcome = draw; // assignment
  } else if (p == bj) {
    playerOutcome = winDouble; // assignment
  } else if (d == bj) {
    playerOutcome = lose; // assignment
  } else if (pTotal > dTotal) {
    playerOutcome = win; // assignment
  } else if (pTotal < dTotal) {
    playerOutcome = lose; // assignment
  } else {
    // strictly, this 'else' clause is redundant - as the variable was initialised to 'draw' - but added for clarity
    playerOutcome = draw; // assignment
  } // end if
  return playerOutcome;
} // end function

class Test_determinePlayerOutcome {
@Test static void test_determinePlayerOutcome() {
  var dbj = (new Dealer(0)).with_status(Status.blackjack); // let
  assertEquals(Status.blackjack, dbj.status);
  var d21 = (new Dealer(0)).with_status(Status.standing).with_handTotal(21); // let
  assertEquals(Status.standing, d21.status);
  assertEquals(21, d21.handTotal);
  var d17 = (new Dealer(0)).with_status(Status.standing).with_handTotal(17); // let
  var dbu = (new Dealer(0)).with_status(Status.bust); // let
  var pbj = (new HumanPlayer("", 0)).with_status(Status.blackjack); // let
  assertEquals(Status.blackjack, pbj.status);
  var p21 = (new HumanPlayer("", 0)).with_status(Status.standing).with_handTotal(21); // let
  var p17 = (new HumanPlayer("", 0)).with_status(Status.standing).with_handTotal(17); // let
  var pbu = (new HumanPlayer("", 0)).with_status(Status.bust); // let
  assertEquals(Outcome.draw, determinePlayerOutcome(dbj, pbj));
  assertEquals(Outcome.lose, determinePlayerOutcome(dbj, p21));
  assertEquals(Outcome.lose, determinePlayerOutcome(dbj, pbu));
  assertEquals(Outcome.winDouble, determinePlayerOutcome(d21, pbj));
  assertEquals(Outcome.draw, determinePlayerOutcome(d21, p21));
  assertEquals(Outcome.lose, determinePlayerOutcome(d21, p17));
  assertEquals(Outcome.lose, determinePlayerOutcome(d21, pbu));
  assertEquals(Outcome.winDouble, determinePlayerOutcome(dbu, pbj));
  assertEquals(Outcome.win, determinePlayerOutcome(dbu, p17));
  assertEquals(Outcome.lose, determinePlayerOutcome(dbu, pbu));
}} // end test

static Card dealCard(double random) { // function
  var number = (random*52).floor();
  var rank = ranks()[divAsInt(number, 4)];
  var suit = number % 4;
  return new Card(rank, intAsSuit(suit), false);
} // end function

class Test_dealCard {
@Test static void test_dealCard() {
  var c1 = dealCard(0); // let
  assertEquals("2", c1.rank);
  assertEquals(Suit.clubs, c1.suit);
  var c2 = dealCard(0.9999999); // let
  assertEquals("A", c2.rank);
  assertEquals(Suit.spades, c2.suit);
  var c3 = dealCard(0.5); // let
  assertEquals("8", c3.rank);
  assertEquals(Suit.hearts, c3.suit);
  var c4 = dealCard(0.24); // let
  assertEquals("5", c4.rank);
  assertEquals(Suit.clubs, c4.suit);
}} // end test

static Suit intAsSuit(int n) { // function
  var suit = Suit.clubs;
  if (n == 1) {
    suit = Suit.diamonds; // assignment
  } else if (n == 2) {
    suit = Suit.hearts; // assignment
  } else if (n == 3) {
    suit = Suit.spades; // assignment
  } // end if
  return suit;
} // end function

class Test_intAsSuit {
@Test static void test_intAsSuit() {
  assertEquals(Suit.clubs, intAsSuit(0));
  assertEquals(Suit.diamonds, intAsSuit(1));
  assertEquals(Suit.hearts, intAsSuit(2));
  assertEquals(Suit.spades, intAsSuit(3));
}} // end test

static String htmlForGame(Game game) { // function
  var html = "<div class='game'>";
  html = html + htmlForPlayer(game.dealer); // assignment
  foreach (var player in game.players) {
    html = html + htmlForPlayer(player); // assignment
  } // end foreach
  html = html + String.format("<div class='message'>%</div>", game.message); // assignment
  return html + "</div>";
} // end function

class Test_htmlForGame {
@Test static void test_htmlForGame() {
  var c1 = new Card("3", Suit.clubs, false); // let
  var c2 = new Card("K", Suit.spades, true); // let
  var p = (new HumanPlayer("fred", 10)).with_cards(list(c1, c2)); // let
  var players = (new List<Player>()).withAppend(p); // let
  var g2 = (new Game(1)).with_players(players); // let
  assertEquals("<div class='game'><div class='player'><div class='details'>Dealer - 1 points </div><div class='hand'></div></div><div class='player'><div class='details'>fred - 10 points - hand total: 0</div><div class='hand'><div class='card black'><div class='u'>3</div><div class='v'>&clubs;</div><div class='a'>&clubs;</div><div class='b'>&clubs;</div><div class='c'>&clubs;</div></div><div class='card reversed'></div></div></div><div class='message'></div></div>", htmlForGame(g2));
}} // end test

static String htmlForPlayer(Player player) { // function
  var html = "<div class='player'>";
  html = html + String.format("<div class='details'>% - % points %</div>", player.name, player.points, player.getMessage()); // assignment
  html = html + "<div class='hand'>"; // assignment
  foreach (var card in player.cards) {
    var suit = card.suit;
    var rank = card.rank;
    html = html + htmlForCard(card); // assignment
  } // end foreach
  return html + "</div></div>";
} // end function

class Test_htmlForPlayer {
@Test static void test_htmlForPlayer() {
  var c1 = new Card("3", Suit.clubs, false); // let
  var c2 = new Card("K", Suit.spades, true); // let
  var p = (new HumanPlayer("charlie", 10)).with_cards(list(c1, c2)); // let
  assertEquals("<div class='player'><div class='details'>charlie - 10 points - hand total: 0</div><div class='hand'><div class='card black'><div class='u'>3</div><div class='v'>&clubs;</div><div class='a'>&clubs;</div><div class='b'>&clubs;</div><div class='c'>&clubs;</div></div><div class='card reversed'></div></div></div>", htmlForPlayer(p));
}} // end test

static String htmlForCard(Card card) { // function
  var html = "";
  if (card.faceDown) {
    html = "<div class='card reversed'>"; // assignment
  } else {
    var rank = card.rank;
    var suit = card.suit;
    var colour = colourForSuit(suit);
    var symbol = symbolForSuit(suit);
    html = String.format("<div class='card %'>", colour); // assignment
    var u = htmlForSpot("u", rank);
    var v = htmlForSpot("v", symbol);
    var grid = "";
    foreach (var location in gridForRank(rank)) {
      if (location.equals("royal")) {
        grid = grid + htmlForSpot(location, rank); // assignment
      } else {
        grid = grid + htmlForSpot(location, symbol); // assignment
      } // end if
    } // end foreach
    html = html + String.format("%%%", u, v, grid); // assignment
  } // end if
  return html + "</div>";
} // end function

class Test_htmlForCard {
@Test static void test_htmlForCard() {
  var c1 = new Card("3", Suit.clubs, false);
  assertEquals("<div class='card black'><div class='u'>3</div><div class='v'>&clubs;</div><div class='a'>&clubs;</div><div class='b'>&clubs;</div><div class='c'>&clubs;</div></div>", htmlForCard(c1));
  var c2 = new Card("K", Suit.spades, true);
  assertEquals("<div class='card reversed'></div>", htmlForCard(c2));
}} // end test

static String htmlForSpot(String id, String content) { // function
  return String.format("<div class='%'>%</div>", id, content);
} // end function

class Test_htmlForSpot {
@Test static void test_htmlForSpot() {
  assertEquals("<div class='c'>&hearts;</div>", htmlForSpot("c", "&hearts;"));
  assertEquals("<div class='u'>10</div>", htmlForSpot("u", "10"));
}} // end test

class Game {

  public Game(int dealerStartPoints) {
    this.dealer = new Dealer(dealerStartPoints); // assignment
    this.players = new List<Player>(); // assignment
    this.message = ""; // assignment
  } // end constructor

  public Dealer dealer; // property

  public List<Player> players; // property

  public String message; // property

  Game with_players(List<Player> players) { // copy with method
    return copyWithPropertyUpdated(this, "players", players);
  } // end with method

  public void newRound() { // procedure method
    var dealer = this.dealer;
    dealer.newHand(); // procedure call
    foreach (var player in this.players) {
      player.newHand(); // procedure call
    } // end foreach
  } // end procedure method

  public void updatePoints() { // procedure method
    foreach (var player in this.players) {
      player.determineOutcomeAndUpdatePoints(this.dealer); // procedure call
    } // end foreach
  } // end procedure method

  public void addPlayer(Player player) { // procedure method
    var players = this.players;
    players.append(player); // procedure call
  } // end procedure method

  public void setMessage(String message) { // procedure method
    this.message = message; // assignment
  } // end procedure method

  public String toString() { // function method
    return "a Game";
  } // end function method

} // end class

class Card {

  public Suit suit; // property

  public String rank; // property

  public boolean faceDown; // property

  public Card(String rank, Suit suit, boolean facedown) {
    this.rank = rank; // assignment
    this.suit = suit; // assignment
    this.faceDown = facedown; // assignment
  } // end constructor

  public void turnFaceUp() { // procedure method
    this.faceDown = false; // assignment
  } // end procedure method

  public void turnFaceDown() { // procedure method
    this.faceDown = true; // assignment
  } // end procedure method

  public String toString() { // function method
    return String.format("%%", this.rank, symbolForSuit(this.suit));
  } // end function method

} // end class

abstract class Player {

  public String name; // property

  public int points; // property

  public List<Card> cards; // property

  public int handTotal; // property

  public boolean softAce; // property

  public Status status; // property

  public boolean hasTurn; // property

  public void startTurn() { // procedure method
    if (this.status == Status.active) {
      this.hasTurn = true; // assignment
    } // end if
  } // end procedure method

  public void determineOutcomeAndUpdatePoints(Dealer dealer) { // procedure method
    var playerOutcome = determinePlayerOutcome(dealer, this);
    if (playerOutcome == Outcome.winDouble) {
      this.changePointsBy(2); // procedure call
      dealer.changePointsBy(-2); // procedure call
    } else if (playerOutcome == Outcome.win) {
      this.changePointsBy(1); // procedure call
      dealer.changePointsBy(-1); // procedure call
    } else if (playerOutcome == Outcome.lose) {
      this.changePointsBy(-1); // procedure call
      dealer.changePointsBy(1); // procedure call
    } // end if
  } // end procedure method

  public void evaluateStatus(Card newCard) { // procedure method
    if ((this.cardCount() == 2) && (this.handTotal == 21)) {
      this.status = Status.blackjack; // assignment
    } else if ((this.handTotal > 21) && (this.softAce)) {
      this.handTotal = this.handTotal - 10; // assignment
      this.softAce = false; // assignment
    } else if (this.handTotal > 21) {
      this.status = Status.bust; // assignment
    } else if (this.handTotal == 21) {
      this.status = Status.standing; // assignment
    } // end if
    if (this.status != Status.active) {
      this.hasTurn = false; // assignment
    } // end if
  } // end procedure method

  public void stand() { // procedure method
    this.status = Status.standing; // assignment
    this.hasTurn = false; // assignment
  } // end procedure method

  public void draw() { // procedure method
    var newCard = dealCard(random());
    var cards = this.cards;
    cards.append(newCard); // procedure call
    if (newCard.rank.equals("A")) {
      this.addAce(); // procedure call
    } else {
      this.handTotal = this.handTotal + valueForRank(newCard.rank); // assignment
    } // end if
    this.evaluateStatus(newCard); // procedure call
  } // end procedure method

  public void addAce() { // procedure method
    if (this.softAce) {
      this.handTotal = this.handTotal + 1; // assignment
    } else {
      this.handTotal = this.handTotal + 11; // assignment
      this.softAce = true; // assignment
    } // end if
  } // end procedure method

  public int cardCount() { // function method
    return this.cards.length();
  } // end function method

  public void changePointsBy(int amount) { // procedure method
    this.points = this.points + amount; // assignment
  } // end procedure method

  abstract void newHand(); // abstract procedure

  protected void newHandHelper() { // private procedure method
    this.hasTurn = false; // assignment
    this.softAce = false; // assignment
    this.cards = new List<Card>(); // assignment
    this.handTotal = 0; // assignment
    this.status = Status.active; // assignment
    this.draw(); // procedure call
    this.draw(); // procedure call
  } // end procedure method

  abstract String getMessage(); // abstract function

  protected String getMessageHelper() { // private function method
    var msg = "";
    var status = this.status;
    if (this.hasTurn) {
      msg = msg + " - PLAYING"; // assignment
    } else if (status == Status.standing) {
      msg = msg + " - STANDING"; // assignment
    } else if (status == Status.blackjack) {
      msg = msg + " - BLACKJACK"; // assignment
    } else if (status == Status.bust) {
      msg = msg + " - BUST"; // assignment
    } // end if
    return msg;
  } // end function method

  abstract void nextAction(Card dealerFaceCard); // abstract procedure

} // end class

class Dealer extends Player {

  public Dealer(int startingPoints) {
    this.name = "Dealer"; // assignment
    this.points = startingPoints; // assignment
    this.cards = new List<Card>(); // assignment
    this.faceCard = new Card("2", Suit.clubs, true); // assignment
  } // end constructor

  public Card faceCard; // property

  public boolean hasPlayed; // property

  Dealer with_status(Status status) { // copy with method
    return copyWithPropertyUpdated(this, "status", status);
  } // end with method

  Dealer with_handTotal(int handTotal) { // copy with method
    return copyWithPropertyUpdated(this, "handTotal", handTotal);
  } // end with method

  public void play() { // procedure method
    this.startTurn(); // procedure call
    var hiddenCard = this.cards[1];
    hiddenCard.turnFaceUp(); // procedure call
    this.hasPlayed = true; // assignment
  } // end procedure method

  public  void newHand() { // procedure method
    this.hasPlayed = false; // assignment
    this.newHandHelper(); // procedure call
    this.faceCard = this.cards[0]; // assignment
    var hiddenCard = this.cards[1];
    hiddenCard.turnFaceDown(); // procedure call
  } // end procedure method

  public  void nextAction(Card faceCard) { // procedure method
    if (this.handTotal < 17) {
      this.draw(); // procedure call
    } else {
      this.stand(); // procedure call
    } // end if
  } // end procedure method

  public  String getMessage() { // function method
    var msg = "";
    if (this.hasPlayed) {
      msg = this.getMessageHelper() + String.format(" - hand total: %", this.handTotal); // assignment
    } // end if
    return msg;
  } // end function method

  public String toString() { // function method
    return "the Dealer";
  } // end function method

} // end class

class HumanPlayer extends Player {

  public HumanPlayer(String name, int startingPoints) {
    this.name = name; // assignment
    this.points = startingPoints; // assignment
    this.cards = new List<Card>(); // assignment
  } // end constructor

  HumanPlayer with_status(Status status) { // copy with method
    return copyWithPropertyUpdated(this, "status", status);
  } // end with method

  HumanPlayer with_handTotal(int handTotal) { // copy with method
    return copyWithPropertyUpdated(this, "handTotal", handTotal);
  } // end with method

  HumanPlayer with_cards(List<Card> cards) { // copy with method
    return copyWithPropertyUpdated(this, "cards", cards);
  } // end with method

  public  void newHand() { // procedure method
    this.newHandHelper(); // procedure call
  } // end procedure method

  public  void nextAction(Card dealerFaceCard) { // procedure method
    var key = "";
    clearKeyBuffer(); // procedure call
    while (key.equals("")) {
      key = waitForKey(); // assignment
      if (key.equals("d")) {
        this.draw(); // procedure call
      } else if (key.equals("s")) {
        this.stand(); // procedure call
      } else {
        key = ""; // assignment
      } // end if
    } // end while
  } // end procedure method

  public  String getMessage() { // function method
    var msg = this.getMessageHelper() + String.format("- hand total: %", this.handTotal);
    if (this.hasTurn) {
      msg = msg + " - press 'd' to draw, 's' to stand"; // assignment
    } // end if
    return msg;
  } // end function method

  public String toString() { // function method
    return String.format("Player: %", this.name);
  } // end function method

} // end class

enum Choice {stand, draw}

enum Outcome {undecided, lose, draw, win, winDouble}

enum Status {active, standing, blackjack, bust}

enum Suit {clubs, diamonds, hearts, spades}

static String symbolForSuit(Suit suit) { // function
  var suits = list(Suit.clubs, Suit.diamonds, Suit.hearts, Suit.spades);
  var symbols = list("&clubs;", "&diams;", "&hearts;", "&spades;");
  return symbols[suits.indexOf(suit)];
} // end function

static List<String> ranks() { // function
  return list("2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A");
} // end function

static int valueForRank(String rank) { // function
  var values = list(2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11);
  return values[ranks().indexOf(rank)];
} // end function

static List<String> gridForRank(String rank) { // function
  var grids = list(list("b", "c"), list("a", "b", "c"), list("d", "e", "f", "g"), list("a", "d", "e", "f", "g"), list("d", "e", "f", "g", "h", "i"), list("d", "e", "f", "g", "h", "i", "l"), list("d", "e", "f", "g", "h", "i", "l", "m"), list("a", "d", "e", "f", "g", "n", "o", "p", "r"), list("d", "e", "f", "g", "n", "o", "p", "r", "s", "t"), list("royal"), list("royal"), list("royal"), list("royal"));
  return grids[ranks().indexOf(rank)];
} // end function

static String colourForSuit(Suit suit) { // function
  var suits = list(Suit.clubs, Suit.diamonds, Suit.hearts, Suit.spades);
  var colours = list("black", "red", "red", "black");
  return colours[suits.indexOf(suit)];
} // end function

static final String styleSheet = ":root {    background-color: darkgreen;    padding-left: 5px;}.game {    padding: 5px;}.message, .details  {    color: white;    font-family: Arial, Helvetica, sans-serif;}.hand {        margin-top: 5px;        height: 150px;        padding-bottom: 10px;    }    .card {    position: relative;    float: left;    background-color: white;    width: 95px;    height:140px;    margin-right:10px;    padding: 5px;    border-radius: 5px;    font-family: Helvetica, sans-serif; }.royal,.a,.b,.c,.d,.e,.f,.g,.h,.i,.j,.k,.l,.m,.n,.o,.p,.q,.r,.s,.t,.u,.v,.w,.x,.y,.z {position: absolute; text-align:center;}/* Standard spots */     .a,.b,.c,.d,.e,.f,.g,.h,.i,.l,.m,.n,.o,.p,.r,.s,.t  {font-size:  30px;}    /* columns */    .d,.n,.h,.p,.f {left: 18px }    .a,.b,.c,.l,.m,.s,.t {left: 43px;}    .e,.o,.i,.r,.g {left: 68px}    /* rows */    .d,.b,.e {top: 0px}    .suit {top: 20px;}    .l {top: 28px;}    .n,.o {top: 37px;}    .h,.a,.i {top: 57px}    .p,.r {top: 75px;}    .m {top: 86px;}    .t {top: 93px;}    .f,.c,.g {top: 114px;}/* royals */    .royal {        position: absolute;        z-index: 1;        width: 95px;        height: 140px;        line-height: 140px;        font-size: 100px;    }/* corner summary */    .u {font-size: 15px; width: 15px; text-align: center; left: 0px; top: 2px;}    .v {font-size: 20px; width: 15px; text-align: center; left: 0px; top: 12px;}/* suit colors */    .red {color: red}    .black {color: black}/* back */    .card.reversed { background-color: rgba(0, 0, 255, 0.607);}"; // constant
} // end Global
