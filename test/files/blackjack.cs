// C# with Elan 2.0.0-beta

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
    } // end if
  } // end while
} // end main

static void playOneRound(Game game) { // procedure
  game.newRound(); // call procedure
  display(game); // call procedure
  var dealer = game.dealer;
  var faceCard = dealer.faceCard;
  foreach (var player in game.players) {
    player.startTurn(); // call procedure
    display(game); // call procedure
    while (player.status == Status.active) {
      player.nextAction(faceCard); // call procedure
      display(game); // call procedure
    } // end while
  } // end foreach
  dealer.play(); // call procedure
  display(game); // call procedure
  while (dealer.status == Status.active) {
    dealer.nextAction(faceCard); // call procedure
    display(game); // call procedure
  } // end while
  game.updatePoints(); // call procedure
} // end procedure

static void display(Game game) { // procedure
  var html = $"<style>{styleSheet}</style>{htmlForGame(game)}";
  displayHtml(html); // call procedure
  sleep(1.5); // call procedure
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
  } // end if
  return playerOutcome;
} // end function

[TestMethod] static void test_determinePlayerOutcome() {
  var dbj = (new Dealer(0)).withStatus(Status.blackjack); // let
  Assert.AreEqual(Status.blackjack, dbj.status);
  var d21 = (new Dealer(0)).withStatus(Status.standing).withHandTotal(21); // let
  Assert.AreEqual(Status.standing, d21.status);
  Assert.AreEqual(21, d21.handTotal);
  var d17 = (new Dealer(0)).withStatus(Status.standing).withHandTotal(17); // let
  var dbu = (new Dealer(0)).withStatus(Status.bust); // let
  var pbj = (new HumanPlayer("", 0)).withStatus(Status.blackjack); // let
  Assert.AreEqual(Status.blackjack, pbj.status);
  var p21 = (new HumanPlayer("", 0)).withStatus(Status.standing).withHandTotal(21); // let
  var p17 = (new HumanPlayer("", 0)).withStatus(Status.standing).withHandTotal(17); // let
  var pbu = (new HumanPlayer("", 0)).withStatus(Status.bust); // let
  Assert.AreEqual(Outcome.draw, determinePlayerOutcome(dbj, pbj));
  Assert.AreEqual(Outcome.lose, determinePlayerOutcome(dbj, p21));
  Assert.AreEqual(Outcome.lose, determinePlayerOutcome(dbj, pbu));
  Assert.AreEqual(Outcome.winDouble, determinePlayerOutcome(d21, pbj));
  Assert.AreEqual(Outcome.draw, determinePlayerOutcome(d21, p21));
  Assert.AreEqual(Outcome.lose, determinePlayerOutcome(d21, p17));
  Assert.AreEqual(Outcome.lose, determinePlayerOutcome(d21, pbu));
  Assert.AreEqual(Outcome.winDouble, determinePlayerOutcome(dbu, pbj));
  Assert.AreEqual(Outcome.win, determinePlayerOutcome(dbu, p17));
  Assert.AreEqual(Outcome.lose, determinePlayerOutcome(dbu, pbu));
} // end test

static Card dealCard(double random) { // function
  var number = (random*52).floor();
  var rank = ranks()[divAsInt(number, 4)];
  var suit = number % 4;
  return new Card(rank, intAsSuit(suit), false);
} // end function

[TestMethod] static void test_dealCard() {
  var c1 = dealCard(0); // let
  Assert.AreEqual("2", c1.rank);
  Assert.AreEqual(Suit.clubs, c1.suit);
  var c2 = dealCard(0.9999999); // let
  Assert.AreEqual("A", c2.rank);
  Assert.AreEqual(Suit.spades, c2.suit);
  var c3 = dealCard(0.5); // let
  Assert.AreEqual("8", c3.rank);
  Assert.AreEqual(Suit.hearts, c3.suit);
  var c4 = dealCard(0.24); // let
  Assert.AreEqual("5", c4.rank);
  Assert.AreEqual(Suit.clubs, c4.suit);
} // end test

static Suit intAsSuit(int n) { // function
  var suit = Suit.clubs;
  if (n == 1) {
    suit = Suit.diamonds; // reassign variable
  } else if (n == 2) {
    suit = Suit.hearts; // reassign variable
  } else if (n == 3) {
    suit = Suit.spades; // reassign variable
  } // end if
  return suit;
} // end function

[TestMethod] static void test_intAsSuit() {
  Assert.AreEqual(Suit.clubs, intAsSuit(0));
  Assert.AreEqual(Suit.diamonds, intAsSuit(1));
  Assert.AreEqual(Suit.hearts, intAsSuit(2));
  Assert.AreEqual(Suit.spades, intAsSuit(3));
} // end test

static string htmlForGame(Game game) { // function
  var html = "<div class='game'>";
  html = html + htmlForPlayer(game.dealer); // reassign variable
  foreach (var player in game.players) {
    html = html + htmlForPlayer(player); // reassign variable
  } // end foreach
  html = html + $"<div class='message'>{game.message}</div>"; // reassign variable
  return html + "</div>";
} // end function

[TestMethod] static void test_htmlForGame() {
  var c1 = new Card("3", Suit.clubs, false); // let
  var c2 = new Card("K", Suit.spades, true); // let
  var p = (new HumanPlayer("fred", 10)).withCards(new [] {c1, c2}); // let
  var players = (new List<Player>()).withAppend(p); // let
  var g2 = (new Game(1)).withPlayers(players); // let
  Assert.AreEqual("<div class='game'><div class='player'><div class='details'>Dealer - 1 points </div><div class='hand'></div></div><div class='player'><div class='details'>fred - 10 points - hand total: 0</div><div class='hand'><div class='card black'><div class='u'>3</div><div class='v'>&clubs;</div><div class='a'>&clubs;</div><div class='b'>&clubs;</div><div class='c'>&clubs;</div></div><div class='card reversed'></div></div></div><div class='message'></div></div>", htmlForGame(g2));
} // end test

static string htmlForPlayer(Player player) { // function
  var html = "<div class='player'>";
  html = html + $"<div class='details'>{player.name} - {player.points} points {player.getMessage()}</div>"; // reassign variable
  html = html + "<div class='hand'>"; // reassign variable
  foreach (var card in player.cards) {
    var suit = card.suit;
    var rank = card.rank;
    html = html + htmlForCard(card); // reassign variable
  } // end foreach
  return html + "</div></div>";
} // end function

[TestMethod] static void test_htmlForPlayer() {
  var c1 = new Card("3", Suit.clubs, false); // let
  var c2 = new Card("K", Suit.spades, true); // let
  var p = (new HumanPlayer("charlie", 10)).withCards(new [] {c1, c2}); // let
  Assert.AreEqual("<div class='player'><div class='details'>charlie - 10 points - hand total: 0</div><div class='hand'><div class='card black'><div class='u'>3</div><div class='v'>&clubs;</div><div class='a'>&clubs;</div><div class='b'>&clubs;</div><div class='c'>&clubs;</div></div><div class='card reversed'></div></div></div>", htmlForPlayer(p));
} // end test

static string htmlForCard(Card card) { // function
  var html = "";
  if (card.faceDown) {
    html = "<div class='card reversed'>"; // reassign variable
  } else {
    var rank = card.rank;
    var suit = card.suit;
    var colour = colourForSuit(suit);
    var symbol = symbolForSuit(suit);
    html = $"<div class='card {colour}'>"; // reassign variable
    var u = htmlForSpot("u", rank);
    var v = htmlForSpot("v", symbol);
    var grid = "";
    foreach (var location in gridForRank(rank)) {
      if (location.equals("royal")) {
        grid = grid + htmlForSpot(location, rank); // reassign variable
      } else {
        grid = grid + htmlForSpot(location, symbol); // reassign variable
      } // end if
    } // end foreach
    html = html + $"{u}{v}{grid}"; // reassign variable
  } // end if
  return html + "</div>";
} // end function

[TestMethod] static void test_htmlForCard() {
  var c1 = new Card("3", Suit.clubs, false);
  Assert.AreEqual("<div class='card black'><div class='u'>3</div><div class='v'>&clubs;</div><div class='a'>&clubs;</div><div class='b'>&clubs;</div><div class='c'>&clubs;</div></div>", htmlForCard(c1));
  var c2 = new Card("K", Suit.spades, true);
  Assert.AreEqual("<div class='card reversed'></div>", htmlForCard(c2));
} // end test

static string htmlForSpot(string id, string content) { // function
  return $"<div class='{id}'>{content}</div>";
} // end function

[TestMethod] static void test_htmlForSpot() {
  Assert.AreEqual("<div class='c'>&hearts;</div>", htmlForSpot("c", "&hearts;"));
  Assert.AreEqual("<div class='u'>10</div>", htmlForSpot("u", "10"));
} // end test

class Game {

  public Game(int dealerStartPoints) {
    this.dealer = new Dealer(dealerStartPoints); // reassign variable
    this.players = new List<Player>(); // reassign variable
    this.message = ""; // reassign variable
  } // end constructor

  public Dealer dealer {get; private set;} // property

  public List<Player> players {get; private set;} // property

  public string message {get; private set;} // property

  public Game withPlayers(List<Player> p) { // function method
    var copyOfThis = copy(this); // let
    copyOfThis.players = p; // reassign variable
    return copyOfThis;
  } // end function method

  public void newRound() { // procedure method
    var dealer = this.dealer;
    dealer.newHand(); // call procedure
    foreach (var player in this.players) {
      player.newHand(); // call procedure
    } // end foreach
  } // end procedure method

  public void updatePoints() { // procedure method
    foreach (var player in this.players) {
      player.determineOutcomeAndUpdatePoints(this.dealer); // call procedure
    } // end foreach
  } // end procedure method

  public void addPlayer(Player player) { // procedure method
    var players = this.players;
    players.append(player); // call procedure
  } // end procedure method

  public void setMessage(string message) { // procedure method
    this.message = message; // reassign variable
  } // end procedure method

  public string toString() { // function method
    return "a Game";
  } // end function method

} // end class

class Card {

  public Suit suit {get; private set;} // property

  public string rank {get; private set;} // property

  public bool faceDown {get; private set;} // property

  public Card(string rank, Suit suit, bool facedown) {
    this.rank = rank; // reassign variable
    this.suit = suit; // reassign variable
    this.faceDown = facedown; // reassign variable
  } // end constructor

  public void turnFaceUp() { // procedure method
    this.faceDown = false; // reassign variable
  } // end procedure method

  public void turnFaceDown() { // procedure method
    this.faceDown = true; // reassign variable
  } // end procedure method

  public string toString() { // function method
    return $"{this.rank}{symbolForSuit(this.suit)}";
  } // end function method

} // end class

abstract class Player {

  public string name {get; private set;} // property

  public int points {get; private set;} // property

  public List<Card> cards {get; private set;} // property

  public int handTotal {get; private set;} // property

  public bool softAce {get; private set;} // property

  public Status status {get; private set;} // property

  public bool hasTurn {get; private set;} // property

  public void startTurn() { // procedure method
    if (this.status == Status.active) {
      this.hasTurn = true; // reassign variable
    } // end if
  } // end procedure method

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
    } // end if
  } // end procedure method

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
    } // end if
    if (this.status != Status.active) {
      this.hasTurn = false; // reassign variable
    } // end if
  } // end procedure method

  public void stand() { // procedure method
    this.status = Status.standing; // reassign variable
    this.hasTurn = false; // reassign variable
  } // end procedure method

  public void draw() { // procedure method
    var newCard = dealCard(random());
    var cards = this.cards;
    cards.append(newCard); // call procedure
    if (newCard.rank.equals("A")) {
      this.addAce(); // call procedure
    } else {
      this.handTotal = this.handTotal + valueForRank(newCard.rank); // reassign variable
    } // end if
    this.evaluateStatus(newCard); // call procedure
  } // end procedure method

  public void addAce() { // procedure method
    if (this.softAce) {
      this.handTotal = this.handTotal + 1; // reassign variable
    } else {
      this.handTotal = this.handTotal + 11; // reassign variable
      this.softAce = true; // reassign variable
    } // end if
  } // end procedure method

  public int cardCount() { // function method
    return this.cards.length();
  } // end function method

  public void changePointsBy(int amount) { // procedure method
    this.points = this.points + amount; // reassign variable
  } // end procedure method

  abstract void newHand(); // abstract procedure

  protected void newHandHelper() { // private procedure method
    this.hasTurn = false; // reassign variable
    this.softAce = false; // reassign variable
    this.cards = new List<Card>(); // reassign variable
    this.handTotal = 0; // reassign variable
    this.status = Status.active; // reassign variable
    this.draw(); // call procedure
    this.draw(); // call procedure
  } // end procedure method

  abstract string getMessage(); // abstract function

  protected string getMessageHelper() { // private function method
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
    } // end if
    return msg;
  } // end function method

  abstract void nextAction(Card dealerFaceCard); // abstract procedure

} // end class

class Dealer: Player {

  public Dealer(int startingPoints) {
    this.name = "Dealer"; // reassign variable
    this.points = startingPoints; // reassign variable
    this.cards = new List<Card>(); // reassign variable
    this.faceCard = new Card("2", Suit.clubs, true); // reassign variable
  } // end constructor

  public Card faceCard {get; private set;} // property

  public bool hasPlayed {get; private set;} // property

  public Dealer withStatus(Status status) { // function method
    var copyOfThis = copy(this); // let
    copyOfThis.status = status; // reassign variable
    return copyOfThis;
  } // end function method

  public Dealer withHandTotal(int ht) { // function method
    var copyOfThis = copy(this); // let
    copyOfThis.handTotal = ht; // reassign variable
    return copyOfThis;
  } // end function method

  public void play() { // procedure method
    this.startTurn(); // call procedure
    var hiddenCard = this.cards[1];
    hiddenCard.turnFaceUp(); // call procedure
    this.hasPlayed = true; // reassign variable
  } // end procedure method

  public override void newHand() { // procedure method
    this.hasPlayed = false; // reassign variable
    this.newHandHelper(); // call procedure
    this.faceCard = this.cards[0]; // reassign variable
    var hiddenCard = this.cards[1];
    hiddenCard.turnFaceDown(); // call procedure
  } // end procedure method

  public override void nextAction(Card faceCard) { // procedure method
    if (this.handTotal < 17) {
      this.draw(); // call procedure
    } else {
      this.stand(); // call procedure
    } // end if
  } // end procedure method

  public override string getMessage() { // function method
    var msg = "";
    if (this.hasPlayed) {
      msg = this.getMessageHelper() + $" - hand total: {this.handTotal}"; // reassign variable
    } // end if
    return msg;
  } // end function method

  public string toString() { // function method
    return "the Dealer";
  } // end function method

} // end class

class HumanPlayer: Player {

  public HumanPlayer(string name, int startingPoints) {
    this.name = name; // reassign variable
    this.points = startingPoints; // reassign variable
    this.cards = new List<Card>(); // reassign variable
  } // end constructor

  public HumanPlayer withStatus(Status status) { // function method
    var copyOfThis = copy(this); // let
    copyOfThis.status = status; // reassign variable
    return copyOfThis;
  } // end function method

  public HumanPlayer withHandTotal(int ht) { // function method
    var copyOfThis = copy(this); // let
    copyOfThis.handTotal = ht; // reassign variable
    return copyOfThis;
  } // end function method

  public HumanPlayer withCards(List<Card> c) { // function method
    var copyOfThis = copy(this); // let
    copyOfThis.cards = c; // reassign variable
    return copyOfThis;
  } // end function method

  public override void newHand() { // procedure method
    this.newHandHelper(); // call procedure
  } // end procedure method

  public override void nextAction(Card dealerFaceCard) { // procedure method
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
      } // end if
    } // end while
  } // end procedure method

  public override string getMessage() { // function method
    var msg = this.getMessageHelper() + $"- hand total: {this.handTotal}";
    if (this.hasTurn) {
      msg = msg + " - press 'd' to draw, 's' to stand"; // reassign variable
    } // end if
    return msg;
  } // end function method

  public string toString() { // function method
    return $"Player: {this.name}";
  } // end function method

} // end class

enum Choice {stand, draw}

enum Outcome {undecided, lose, draw, win, winDouble}

enum Status {active, standing, blackjack, bust}

enum Suit {clubs, diamonds, hearts, spades}

static string symbolForSuit(Suit suit) { // function
  var suits = new [] {Suit.clubs, Suit.diamonds, Suit.hearts, Suit.spades};
  var symbols = new [] {"&clubs;", "&diams;", "&hearts;", "&spades;"};
  return symbols[suits.indexOf(suit)];
} // end function

static List<string> ranks() { // function
  return new [] {"2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"};
} // end function

static int valueForRank(string rank) { // function
  var values = new [] {2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11};
  return values[ranks().indexOf(rank)];
} // end function

static List<string> gridForRank(string rank) { // function
  var grids = new [] {new [] {"b", "c"}, new [] {"a", "b", "c"}, new [] {"d", "e", "f", "g"}, new [] {"a", "d", "e", "f", "g"}, new [] {"d", "e", "f", "g", "h", "i"}, new [] {"d", "e", "f", "g", "h", "i", "l"}, new [] {"d", "e", "f", "g", "h", "i", "l", "m"}, new [] {"a", "d", "e", "f", "g", "n", "o", "p", "r"}, new [] {"d", "e", "f", "g", "n", "o", "p", "r", "s", "t"}, new [] {"royal"}, new [] {"royal"}, new [] {"royal"}, new [] {"royal"}};
  return grids[ranks().indexOf(rank)];
} // end function

static string colourForSuit(Suit suit) { // function
  var suits = new [] {Suit.clubs, Suit.diamonds, Suit.hearts, Suit.spades};
  var colours = new [] {"black", "red", "red", "black"};
  return colours[suits.indexOf(suit)];
} // end function

const String styleSheet = ":root {    background-color: darkgreen;    padding-left: 5px;}.game {    padding: 5px;}.message, .details  {    color: white;    font-family: Arial, Helvetica, sans-serif;}.hand {        margin-top: 5px;        height: 150px;        padding-bottom: 10px;    }    .card {    position: relative;    float: left;    background-color: white;    width: 95px;    height:140px;    margin-right:10px;    padding: 5px;    border-radius: 5px;    font-family: Helvetica, sans-serif; }.royal,.a,.b,.c,.d,.e,.f,.g,.h,.i,.j,.k,.l,.m,.n,.o,.p,.q,.r,.s,.t,.u,.v,.w,.x,.y,.z {position: absolute; text-align:center;}/* Standard spots */     .a,.b,.c,.d,.e,.f,.g,.h,.i,.l,.m,.n,.o,.p,.r,.s,.t  {font-size:  30px;}    /* columns */    .d,.n,.h,.p,.f {left: 18px }    .a,.b,.c,.l,.m,.s,.t {left: 43px;}    .e,.o,.i,.r,.g {left: 68px}    /* rows */    .d,.b,.e {top: 0px}    .suit {top: 20px;}    .l {top: 28px;}    .n,.o {top: 37px;}    .h,.a,.i {top: 57px}    .p,.r {top: 75px;}    .m {top: 86px;}    .t {top: 93px;}    .f,.c,.g {top: 114px;}/* royals */    .royal {        position: absolute;        z-index: 1;        width: 95px;        height: 140px;        line-height: 140px;        font-size: 100px;    }/* corner summary */    .u {font-size: 15px; width: 15px; text-align: center; left: 0px; top: 2px;}    .v {font-size: 20px; width: 15px; text-align: center; left: 0px; top: 12px;}/* suit colors */    .red {color: red}    .black {color: black}/* back */    .card.reversed { background-color: rgba(0, 0, 255, 0.607);}";
