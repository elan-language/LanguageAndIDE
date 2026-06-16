// Java with Elan 2.0.0-beta

public class Global {

static void main() {
  var game = new Game(1000);
  game.addPlayer(new HumanPlayer("Player A", 1000)); // call procedure
  var anotherRound = true;
  while (anotherRound) {
    playOneRound(game); // call procedure
    game.setMessage("Points updated. Do you want to play another round? (press y or n)"); // call procedure
    clearKeyBuffer(); // call procedure
    display(game); // call procedure
    var k = waitForKey().lowerCase();
    if (k.equals("y")) {
      game.setMessage(""); // call procedure
    } else {
      anotherRound = false; // reassign variable
    } // if
  } // while
} // main

static void playOneRound(Game game) { // procedure
  game.newRound(); // call procedure
  display(game); // call procedure
  var dealer = game.dealer;
  var faceCard = dealer.faceCard;
  foreach (player in game.players) {
    player.startTurn(); // call procedure
    display(game); // call procedure
    while (player.status == Status.active) {
      player.nextAction(faceCard); // call procedure
      display(game); // call procedure
    } // while
  } // foreach
  dealer.play(); // call procedure
  display(game); // call procedure
  while (dealer.status == Status.active) {
    dealer.nextAction(faceCard); // call procedure
    display(game); // call procedure
  } // while
  game.updatePoints(); // call procedure
} // procedure

static void display(Game game) { // procedure
  var html = String.format("<style>%</style>%", styleSheet, htmlForGame(game));
  displayHtml(html); // call procedure
  sleep(1.5); // call procedure
} // procedure

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
    playerOutcome = lose; // reassign variable
  } else if ((p == bj) && (d != bj)) {
    playerOutcome = winDouble; // reassign variable
  } else if (d == bust) {
    playerOutcome = win; // reassign variable
  } else if ((d == bj) && (p == bj)) {
    playerOutcome = draw; // reassign variable
  } else if (p == bj) {
    playerOutcome = winDouble; // reassign variable
  } else if (d == bj) {
    playerOutcome = lose; // reassign variable
  } else if (pTotal > dTotal) {
    playerOutcome = win; // reassign variable
  } else if (pTotal < dTotal) {
    playerOutcome = lose; // reassign variable
  } else {
    // strictly, this 'else' clause is redundant - as the variable was initialised to 'draw' - but added for clarity
    playerOutcome = draw; // reassign variable
  } // if
  return playerOutcome;
} // function

@Test static void test_determinePlayerOutcome() {
  var dbj = (new Dealer(0)).withStatus(Status.blackjack); // let
  assertEquals(Status.blackjack, dbj.status);
  var d21 = (new Dealer(0)).withStatus(Status.standing).withHandTotal(21); // let
  assertEquals(Status.standing, d21.status);
  assertEquals(21, d21.handTotal);
  var d17 = (new Dealer(0)).withStatus(Status.standing).withHandTotal(17); // let
  var dbu = (new Dealer(0)).withStatus(Status.bust); // let
  var pbj = (new HumanPlayer("", 0)).withStatus(Status.blackjack); // let
  assertEquals(Status.blackjack, pbj.status);
  var p21 = (new HumanPlayer("", 0)).withStatus(Status.standing).withHandTotal(21); // let
  var p17 = (new HumanPlayer("", 0)).withStatus(Status.standing).withHandTotal(17); // let
  var pbu = (new HumanPlayer("", 0)).withStatus(Status.bust); // let
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
} // test

static Card dealCard(double random) { // function
  var number = (random*52).floor();
  var rank = rankValue().keys()[divAsInt(number, 4)];
  var suit = number % 4;
  return new Card(rank, intAsSuit(suit), false);
} // function

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
} // test

static Suit intAsSuit(int n) { // function
  var suit = Suit.clubs;
  if (n == 1) {
    suit = Suit.diamonds; // reassign variable
  } else if (n == 2) {
    suit = Suit.hearts; // reassign variable
  } else if (n == 3) {
    suit = Suit.spades; // reassign variable
  } // if
  return suit;
} // function

@Test static void test_intAsSuit() {
  assertEquals(Suit.clubs, intAsSuit(0));
  assertEquals(Suit.diamonds, intAsSuit(1));
  assertEquals(Suit.hearts, intAsSuit(2));
  assertEquals(Suit.spades, intAsSuit(3));
} // test

static String htmlForGame(Game game) { // function
  var html = "<div class='game'>";
  html = html + htmlForPlayer(game.dealer); // reassign variable
  foreach (player in game.players) {
    html = html + htmlForPlayer(player); // reassign variable
  } // foreach
  html = html + String.format("<div class='message'>%</div>", game.message); // reassign variable
  return html + "</div>";
} // function

@Test static void test_htmlForGame() {
  var c1 = new Card("3", Suit.clubs, false); // let
  var c2 = new Card("K", Suit.spades, true); // let
  var p = (new HumanPlayer("fred", 10)).withCards({c1, c2}); // let
  var players = (new List<Player>()).withAppend(p); // let
  var g2 = (new Game(1)).withPlayers(players); // let
  assertEquals("<div class='game'><div class='player'><div class='details'>Dealer - 1 points </div><div class='hand'></div></div><div class='player'><div class='details'>fred - 10 points - hand total: 0</div><div class='hand'><div class='card black'><div class='u'>3</div><div class='v'>&clubs;</div><div class='a'>&clubs;</div><div class='b'>&clubs;</div><div class='c'>&clubs;</div></div><div class='card reversed'></div></div></div><div class='message'></div></div>", htmlForGame(g2));
} // test

static String htmlForPlayer(Player player) { // function
  var html = "<div class='player'>";
  html = html + String.format("<div class='details'>% - % points %</div>", player.name, player.points, player.getMessage()); // reassign variable
  html = html + "<div class='hand'>"; // reassign variable
  foreach (card in player.cards) {
    var suit = card.suit;
    var rank = card.rank;
    html = html + htmlForCard(card); // reassign variable
  } // foreach
  return html + "</div></div>";
} // function

@Test static void test_htmlForPlayer() {
  var c1 = new Card("3", Suit.clubs, false); // let
  var c2 = new Card("K", Suit.spades, true); // let
  var p = (new HumanPlayer("charlie", 10)).withCards({c1, c2}); // let
  assertEquals("<div class='player'><div class='details'>charlie - 10 points - hand total: 0</div><div class='hand'><div class='card black'><div class='u'>3</div><div class='v'>&clubs;</div><div class='a'>&clubs;</div><div class='b'>&clubs;</div><div class='c'>&clubs;</div></div><div class='card reversed'></div></div></div>", htmlForPlayer(p));
} // test

static String htmlForCard(Card card) { // function
  var html = "";
  if (card.faceDown) {
    html = "<div class='card reversed'>"; // reassign variable
  } else {
    var rank = card.rank;
    var suit = card.suit;
    var colour = colourForSuit(suit);
    var symbol = symbolForSuit(suit);
    html = String.format("<div class='card %'>", colour); // reassign variable
    var u = htmlForSpot("u", rank);
    var v = htmlForSpot("v", symbol);
    var grid = "";
    foreach (location in gridForRank(rank)) {
      if (location.equals("royal")) {
        grid = grid + htmlForSpot(location, rank); // reassign variable
      } else {
        grid = grid + htmlForSpot(location, symbol); // reassign variable
      } // if
    } // foreach
    html = html + String.format("%%%", u, v, grid); // reassign variable
  } // if
  return html + "</div>";
} // function

@Test static void test_htmlForCard() {
  var c1 = new Card("3", Suit.clubs, false);
  assertEquals("<div class='card black'><div class='u'>3</div><div class='v'>&clubs;</div><div class='a'>&clubs;</div><div class='b'>&clubs;</div><div class='c'>&clubs;</div></div>", htmlForCard(c1));
  var c2 = new Card("K", Suit.spades, true);
  assertEquals("<div class='card reversed'></div>", htmlForCard(c2));
} // test

static String htmlForSpot(String id, String content) { // function
  return String.format("<div class='%'>%</div>", id, content);
} // function

@Test static void test_htmlForSpot() {
  assertEquals("<div class='c'>&hearts;</div>", htmlForSpot("c", "&hearts;"));
  assertEquals("<div class='u'>10</div>", htmlForSpot("u", "10"));
} // test

class Game {

  public Game(int dealerStartPoints) {
    this.dealer = new Dealer(dealerStartPoints); // reassign variable
    this.players = new List<Player>(); // reassign variable
    this.message = ""; // reassign variable
  } // constructor

  public Dealer dealer; // property

  public List<Player> players; // property

  public String message; // property

  public Game withPlayers(List<Player> p) { // function method
    var copyOfThis = copy(this); // let
    copyOfThis.players = p; // reassign variable
    return copyOfThis;
  } // function method

  public void newRound() { // procedure method
    var dealer = this.dealer;
    dealer.newHand(); // call procedure
    foreach (player in this.players) {
      player.newHand(); // call procedure
    } // foreach
  } // procedure method

  public void updatePoints() { // procedure method
    foreach (player in this.players) {
      player.determineOutcomeAndUpdatePoints(this.dealer); // call procedure
    } // foreach
  } // procedure method

  public void addPlayer(Player player) { // procedure method
    var players = this.players;
    players.append(player); // call procedure
  } // procedure method

  public void setMessage(String message) { // procedure method
    this.message = message; // reassign variable
  } // procedure method

  public String toString() { // function method
    return "a Game";
  } // function method

} // class

class Card {

  public Suit suit; // property

  public String rank; // property

  public bool faceDown; // property

  public Card(String rank, Suit suit, bool facedown) {
    this.rank = rank; // reassign variable
    this.suit = suit; // reassign variable
    this.faceDown = facedown; // reassign variable
  } // constructor

  public void turnFaceUp() { // procedure method
    this.faceDown = false; // reassign variable
  } // procedure method

  public void turnFaceDown() { // procedure method
    this.faceDown = true; // reassign variable
  } // procedure method

  public String toString() { // function method
    return String.format("%%", this.rank, symbolForSuit(this.suit));
  } // function method

} // class

abstract class Player {

  public String name; // property

  public int points; // property

  public List<Card> cards; // property

  public int handTotal; // property

  public bool softAce; // property

  public Status status; // property

  public bool hasTurn; // property

  public void startTurn() { // procedure method
    if (this.status == Status.active) {
      this.hasTurn = true; // reassign variable
    } // if
  } // procedure method

  public void determineOutcomeAndUpdatePoints(Dealer dealer) { // procedure method
    var playerOutcome = determinePlayerOutcome(dealer, this);
    if (playerOutcome == Outcome.winDouble) {
      this.changePointsBy(2); // call procedure
      dealer.changePointsBy(-2); // call procedure
    } else if (playerOutcome == Outcome.win) {
      this.changePointsBy(1); // call procedure
      dealer.changePointsBy(-1); // call procedure
    } else if (playerOutcome == Outcome.lose) {
      this.changePointsBy(-1); // call procedure
      dealer.changePointsBy(1); // call procedure
    } // if
  } // procedure method

  public void evaluateStatus(Card newCard) { // procedure method
    if ((this.cardCount() == 2) && (this.handTotal == 21)) {
      this.status = Status.blackjack; // reassign variable
    } else if ((this.handTotal > 21) && (this.softAce)) {
      this.handTotal = this.handTotal - 10; // reassign variable
      this.softAce = false; // reassign variable
    } else if (this.handTotal > 21) {
      this.status = Status.bust; // reassign variable
    } else if (this.handTotal == 21) {
      this.status = Status.standing; // reassign variable
    } // if
    if (this.status != Status.active) {
      this.hasTurn = false; // reassign variable
    } // if
  } // procedure method

  public void stand() { // procedure method
    this.status = Status.standing; // reassign variable
    this.hasTurn = false; // reassign variable
  } // procedure method

  public void draw() { // procedure method
    var newCard = dealCard(random());
    var cards = this.cards;
    cards.append(newCard); // call procedure
    if (newCard.rank.equals("A")) {
      this.addAce(); // call procedure
    } else {
      this.handTotal = this.handTotal + rankValue()[newCard.rank]; // reassign variable
    } // if
    this.evaluateStatus(newCard); // call procedure
  } // procedure method

  public void addAce() { // procedure method
    if (this.softAce) {
      this.handTotal = this.handTotal + 1; // reassign variable
    } else {
      this.handTotal = this.handTotal + 11; // reassign variable
      this.softAce = true; // reassign variable
    } // if
  } // procedure method

  public int cardCount() { // function method
    return this.cards.length();
  } // function method

  public void changePointsBy(int amount) { // procedure method
    this.points = this.points + amount; // reassign variable
  } // procedure method

  abstract void newHand(); // abstract procedure

  protected void newHandHelper() { // private procedure method
    this.hasTurn = false; // reassign variable
    this.softAce = false; // reassign variable
    this.cards = new List<Card>(); // reassign variable
    this.handTotal = 0; // reassign variable
    this.status = Status.active; // reassign variable
    this.draw(); // call procedure
    this.draw(); // call procedure
  } // procedure method

  abstract String getMessage(); // abstract function

  protected String getMessageHelper() { // private function method
    var msg = "";
    var status = this.status;
    if (this.hasTurn) {
      msg = msg + " - PLAYING"; // reassign variable
    } else if (status == Status.standing) {
      msg = msg + " - STANDING"; // reassign variable
    } else if (status == Status.blackjack) {
      msg = msg + " - BLACKJACK"; // reassign variable
    } else if (status == Status.bust) {
      msg = msg + " - BUST"; // reassign variable
    } // if
    return msg;
  } // function method

  abstract void nextAction(Card dealerFaceCard); // abstract procedure

} // class

class Dealer extends Player {

  public Dealer(int startingPoints) {
    this.name = "Dealer"; // reassign variable
    this.points = startingPoints; // reassign variable
    this.cards = new List<Card>(); // reassign variable
    this.faceCard = new Card("2", Suit.clubs, true); // reassign variable
  } // constructor

  public Card faceCard; // property

  public bool hasPlayed; // property

  public Dealer withStatus(Status status) { // function method
    var copyOfThis = copy(this); // let
    copyOfThis.status = status; // reassign variable
    return copyOfThis;
  } // function method

  public Dealer withHandTotal(int ht) { // function method
    var copyOfThis = copy(this); // let
    copyOfThis.handTotal = ht; // reassign variable
    return copyOfThis;
  } // function method

  public void play() { // procedure method
    this.startTurn(); // call procedure
    var hiddenCard = this.cards[1];
    hiddenCard.turnFaceUp(); // call procedure
    this.hasPlayed = true; // reassign variable
  } // procedure method

  public  void newHand() { // procedure method
    this.hasPlayed = false; // reassign variable
    this.newHandHelper(); // call procedure
    this.faceCard = this.cards[0]; // reassign variable
    var hiddenCard = this.cards[1];
    hiddenCard.turnFaceDown(); // call procedure
  } // procedure method

  public  void nextAction(Card faceCard) { // procedure method
    if (this.handTotal < 17) {
      this.draw(); // call procedure
    } else {
      this.stand(); // call procedure
    } // if
  } // procedure method

  public  String getMessage() { // function method
    var msg = "";
    if (this.hasPlayed) {
      msg = this.getMessageHelper() + String.format(" - hand total: %", this.handTotal); // reassign variable
    } // if
    return msg;
  } // function method

  public String toString() { // function method
    return "the Dealer";
  } // function method

} // class

class HumanPlayer extends Player {

  public HumanPlayer(String name, int startingPoints) {
    this.name = name; // reassign variable
    this.points = startingPoints; // reassign variable
    this.cards = new List<Card>(); // reassign variable
  } // constructor

  public HumanPlayer withStatus(Status status) { // function method
    var copyOfThis = copy(this); // let
    copyOfThis.status = status; // reassign variable
    return copyOfThis;
  } // function method

  public HumanPlayer withHandTotal(int ht) { // function method
    var copyOfThis = copy(this); // let
    copyOfThis.handTotal = ht; // reassign variable
    return copyOfThis;
  } // function method

  public HumanPlayer withCards(List<Card> c) { // function method
    var copyOfThis = copy(this); // let
    copyOfThis.cards = c; // reassign variable
    return copyOfThis;
  } // function method

  public  void newHand() { // procedure method
    this.newHandHelper(); // call procedure
  } // procedure method

  public  void nextAction(Card dealerFaceCard) { // procedure method
    var key = "";
    clearKeyBuffer(); // call procedure
    while (key.equals("")) {
      key = waitForKey(); // reassign variable
      if (key.equals("d")) {
        this.draw(); // call procedure
      } else if (key.equals("s")) {
        this.stand(); // call procedure
      } else {
        key = ""; // reassign variable
      } // if
    } // while
  } // procedure method

  public  String getMessage() { // function method
    var msg = this.getMessageHelper() + String.format("- hand total: %", this.handTotal);
    if (this.hasTurn) {
      msg = msg + " - press 'd' to draw, 's' to stand"; // reassign variable
    } // if
    return msg;
  } // function method

  public String toString() { // function method
    return String.format("Player: %", this.name);
  } // function method

} // class

enum Choice {stand, draw}

enum Outcome {undecided, lose, draw, win, winDouble}

enum Status {active, standing, blackjack, bust}

enum Suit {clubs, diamonds, hearts, spades}

static String symbolForSuit(Suit suit) { // function
  var dc = [Suit.clubs:"&clubs;", Suit.diamonds:"&diams;", Suit.hearts:"&hearts;", Suit.spades:"&spades;"];
  return dc[suit];
} // function

static Dictionary<String, int> rankValue() { // function
  return ["2":2, "3":3, "4":4, "5":5, "6":6, "7":7, "8":8, "9":9, "10":10, "J":10, "Q":10, "K":10, "A":11];
} // function

static List<String> gridForRank(String rank) { // function
  var dc = ["A":{"royal"}, "2":{"b", "c"}, "3":{"a", "b", "c"}, "4":{"d", "e", "f", "g"}, "5":{"a", "d", "e", "f", "g"}, "6":{"d", "e", "f", "g", "h", "i"}, "7":{"d", "e", "f", "g", "h", "i", "l"}, "8":{"d", "e", "f", "g", "h", "i", "l", "m"}, "9":{"a", "d", "e", "f", "g", "n", "o", "p", "r"}, "10":{"d", "e", "f", "g", "n", "o", "p", "r", "s", "t"}, "J":{"royal"}, "Q":{"royal"}, "K":{"royal"}];
  return dc[rank];
} // function

static String colourForSuit(Suit suit) { // function
  var dc = [Suit.clubs:"black", Suit.diamonds:"red", Suit.hearts:"red", Suit.spades:"black"];
  return dc[suit];
} // function

final String styleSheet = ":root {    background-color: darkgreen;    padding-left: 5px;}.game {    padding: 5px;}.message, .details  {    color: white;    font-family: Arial, Helvetica, sans-serif;}.hand {        margin-top: 5px;        height: 150px;        padding-bottom: 10px;    }    .card {    position: relative;    float: left;    background-color: white;    width: 95px;    height:140px;    margin-right:10px;    padding: 5px;    border-radius: 5px;    font-family: Helvetica, sans-serif; }.royal,.a,.b,.c,.d,.e,.f,.g,.h,.i,.j,.k,.l,.m,.n,.o,.p,.q,.r,.s,.t,.u,.v,.w,.x,.y,.z {position: absolute; text-align:center;}/* Standard spots */     .a,.b,.c,.d,.e,.f,.g,.h,.i,.l,.m,.n,.o,.p,.r,.s,.t  {font-size:  30px;}    /* columns */    .d,.n,.h,.p,.f {left: 18px }    .a,.b,.c,.l,.m,.s,.t {left: 43px;}    .e,.o,.i,.r,.g {left: 68px}    /* rows */    .d,.b,.e {top: 0px}    .suit {top: 20px;}    .l {top: 28px;}    .n,.o {top: 37px;}    .h,.a,.i {top: 57px}    .p,.r {top: 75px;}    .m {top: 86px;}    .t {top: 93px;}    .f,.c,.g {top: 114px;}/* royals */    .royal {        position: absolute;        z-index: 1;        width: 95px;        height: 140px;        line-height: 140px;        font-size: 100px;    }/* corner summary */    .u {font-size: 15px; width: 15px; text-align: center; left: 0px; top: 2px;}    .v {font-size: 20px; width: 15px; text-align: center; left: 0px; top: 12px;}/* suit colors */    .red {color: red}    .black {color: black}/* back */    .card.reversed { background-color: rgba(0, 0, 255, 0.607);}"; // constant

}
