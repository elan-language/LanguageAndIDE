# Python with Elan 2.0.0-alpha5

def main() -> None:
  game = Game(1000) # variable definition
  game.addPlayer(HumanPlayer("Player A", 1000)) # call procedure
  anotherRound = True # variable definition
  while anotherRound:
    playOneRound(game) # call procedure
    game.setMessage("Points updated. Do you want to play another round? (press y or n)") # call procedure
    clearKeyBuffer() # call procedure
    display(game) # call procedure
    k = waitForKey().lowerCase() # variable definition
    if k.equals("y"):
      game.setMessage("") # call procedure
    else:
      anotherRound = False # reassign variable

def playOneRound(game: Game) -> None: # procedure
  game.newRound() # call procedure
  display(game) # call procedure
  dealer = game.dealer # variable definition
  faceCard = dealer.faceCard # variable definition
  for player in game.players:
    player.startTurn() # call procedure
    display(game) # call procedure
    while player.status == Status.active:
      player.nextAction(faceCard) # call procedure
      display(game) # call procedure
  dealer.play() # call procedure
  display(game) # call procedure
  while dealer.status == Status.active:
    dealer.nextAction(faceCard) # call procedure
    display(game) # call procedure
  game.updatePoints() # call procedure

def display(game: Game) -> None: # procedure
  html = f"<style>{styleSheet}</style>{htmlForGame(game)}" # variable definition
  displayHtml(html) # call procedure
  sleep(1.5) # call procedure

def determinePlayerOutcome(dealer: Dealer, player: Player) -> Outcome: # function
  d = dealer.status # variable definition
  dTotal = dealer.handTotal # variable definition
  p = player.status # variable definition
  pTotal = player.handTotal # variable definition
  bust = Status.bust # variable definition
  bj = Status.blackjack # variable definition
  win = Outcome.win # variable definition
  winDouble = Outcome.winDouble # variable definition
  lose = Outcome.lose # variable definition
  draw = Outcome.draw # variable definition
  playerOutcome = draw # variable definition
  if p == bust:
    playerOutcome = lose # reassign variable
  elif (p == bj) and (d != bj): # else if
    playerOutcome = winDouble # reassign variable
  elif d == bust: # else if
    playerOutcome = win # reassign variable
  elif (d == bj) and (p == bj): # else if
    playerOutcome = draw # reassign variable
  elif p == bj: # else if
    playerOutcome = winDouble # reassign variable
  elif d == bj: # else if
    playerOutcome = lose # reassign variable
  elif pTotal > dTotal: # else if
    playerOutcome = win # reassign variable
  elif pTotal < dTotal: # else if
    playerOutcome = lose # reassign variable
  else:
    # strictly, this 'else' clause is redundant - as the variable was initialised to 'draw' - but added for clarity
    playerOutcome = draw # reassign variable
  return playerOutcome

def test_determinePlayerOutcome(self) -> None:
  dbj = (Dealer(0)).withStatus(Status.blackjack) # let
  self.assertEqual(dbj.status, Status.blackjack)
  d21 = (Dealer(0)).withStatus(Status.standing).withHandTotal(21) # let
  self.assertEqual(d21.status, Status.standing)
  self.assertEqual(d21.handTotal, 21)
  d17 = (Dealer(0)).withStatus(Status.standing).withHandTotal(17) # let
  dbu = (Dealer(0)).withStatus(Status.bust) # let
  pbj = (HumanPlayer("", 0)).withStatus(Status.blackjack) # let
  self.assertEqual(pbj.status, Status.blackjack)
  p21 = (HumanPlayer("", 0)).withStatus(Status.standing).withHandTotal(21) # let
  p17 = (HumanPlayer("", 0)).withStatus(Status.standing).withHandTotal(17) # let
  pbu = (HumanPlayer("", 0)).withStatus(Status.bust) # let
  self.assertEqual(determinePlayerOutcome(dbj, pbj), Outcome.draw)
  self.assertEqual(determinePlayerOutcome(dbj, p21), Outcome.lose)
  self.assertEqual(determinePlayerOutcome(dbj, pbu), Outcome.lose)
  self.assertEqual(determinePlayerOutcome(d21, pbj), Outcome.winDouble)
  self.assertEqual(determinePlayerOutcome(d21, p21), Outcome.draw)
  self.assertEqual(determinePlayerOutcome(d21, p17), Outcome.lose)
  self.assertEqual(determinePlayerOutcome(d21, pbu), Outcome.lose)
  self.assertEqual(determinePlayerOutcome(dbu, pbj), Outcome.winDouble)
  self.assertEqual(determinePlayerOutcome(dbu, p17), Outcome.win)
  self.assertEqual(determinePlayerOutcome(dbu, pbu), Outcome.lose)

def dealCard(random: float) -> Card: # function
  number = (random*52).floor() # variable definition
  rank = rankValue().keys()[divAsInt(number, 4)] # variable definition
  suit = number % 4 # variable definition
  return Card(rank, intAsSuit(suit), False)

def test_dealCard(self) -> None:
  c1 = dealCard(0) # let
  self.assertEqual(c1.rank, "2")
  self.assertEqual(c1.suit, Suit.clubs)
  c2 = dealCard(0.9999999) # let
  self.assertEqual(c2.rank, "A")
  self.assertEqual(c2.suit, Suit.spades)
  c3 = dealCard(0.5) # let
  self.assertEqual(c3.rank, "8")
  self.assertEqual(c3.suit, Suit.hearts)
  c4 = dealCard(0.24) # let
  self.assertEqual(c4.rank, "5")
  self.assertEqual(c4.suit, Suit.clubs)

def intAsSuit(n: int) -> Suit: # function
  suit = Suit.clubs # variable definition
  if n == 1:
    suit = Suit.diamonds # reassign variable
  elif n == 2: # else if
    suit = Suit.hearts # reassign variable
  elif n == 3: # else if
    suit = Suit.spades # reassign variable
  return suit

def test_intAsSuit(self) -> None:
  self.assertEqual(intAsSuit(0), Suit.clubs)
  self.assertEqual(intAsSuit(1), Suit.diamonds)
  self.assertEqual(intAsSuit(2), Suit.hearts)
  self.assertEqual(intAsSuit(3), Suit.spades)

def htmlForGame(game: Game) -> str: # function
  html = "<div class='game'>" # variable definition
  html = html + htmlForPlayer(game.dealer) # reassign variable
  for player in game.players:
    html = html + htmlForPlayer(player) # reassign variable
  html = html + f"<div class='message'>{game.message}</div>" # reassign variable
  return html + "</div>"

def test_htmlForGame(self) -> None:
  c1 = Card("3", Suit.clubs, False) # let
  c2 = Card("K", Suit.spades, True) # let
  p = (HumanPlayer("fred", 10)).withCards([c1, c2]) # let
  players = (list[Player]()).withAppend(p) # let
  g2 = (Game(1)).withPlayers(players) # let
  self.assertEqual(htmlForGame(g2), "<div class='game'><div class='player'><div class='details'>Dealer - 1 points </div><div class='hand'></div></div><div class='player'><div class='details'>fred - 10 points - hand total: 0</div><div class='hand'><div class='card black'><div class='u'>3</div><div class='v'>&clubs;</div><div class='a'>&clubs;</div><div class='b'>&clubs;</div><div class='c'>&clubs;</div></div><div class='card reversed'></div></div></div><div class='message'></div></div>")

def htmlForPlayer(player: Player) -> str: # function
  html = "<div class='player'>" # variable definition
  html = html + f"<div class='details'>{player.name} - {player.points} points {player.getMessage()}</div>" # reassign variable
  html = html + "<div class='hand'>" # reassign variable
  for card in player.cards:
    suit = card.suit # variable definition
    rank = card.rank # variable definition
    html = html + htmlForCard(card) # reassign variable
  return html + "</div></div>"

def test_htmlForPlayer(self) -> None:
  c1 = Card("3", Suit.clubs, False) # let
  c2 = Card("K", Suit.spades, True) # let
  p = (HumanPlayer("charlie", 10)).withCards([c1, c2]) # let
  self.assertEqual(htmlForPlayer(p), "<div class='player'><div class='details'>charlie - 10 points - hand total: 0</div><div class='hand'><div class='card black'><div class='u'>3</div><div class='v'>&clubs;</div><div class='a'>&clubs;</div><div class='b'>&clubs;</div><div class='c'>&clubs;</div></div><div class='card reversed'></div></div></div>")

def htmlForCard(card: Card) -> str: # function
  html = "" # variable definition
  if card.faceDown:
    html = "<div class='card reversed'>" # reassign variable
  else:
    rank = card.rank # variable definition
    suit = card.suit # variable definition
    colour = colourForSuit(suit) # variable definition
    symbol = symbolForSuit(suit) # variable definition
    html = f"<div class='card {colour}'>" # reassign variable
    u = htmlForSpot("u", rank) # variable definition
    v = htmlForSpot("v", symbol) # variable definition
    grid = "" # variable definition
    for location in gridForRank(rank):
      if location.equals("royal"):
        grid = grid + htmlForSpot(location, rank) # reassign variable
      else:
        grid = grid + htmlForSpot(location, symbol) # reassign variable
    html = html + f"{u}{v}{grid}" # reassign variable
  return html + "</div>"

def test_htmlForCard(self) -> None:
  c1 = Card("3", Suit.clubs, False) # variable definition
  self.assertEqual(htmlForCard(c1), "<div class='card black'><div class='u'>3</div><div class='v'>&clubs;</div><div class='a'>&clubs;</div><div class='b'>&clubs;</div><div class='c'>&clubs;</div></div>")
  c2 = Card("K", Suit.spades, True) # variable definition
  self.assertEqual(htmlForCard(c2), "<div class='card reversed'></div>")

def htmlForSpot(id: str, content: str) -> str: # function
  return f"<div class='{id}'>{content}</div>"

def test_htmlForSpot(self) -> None:
  self.assertEqual(htmlForSpot("c", "&hearts;"), "<div class='c'>&hearts;</div>")
  self.assertEqual(htmlForSpot("u", "10"), "<div class='u'>10</div>")

class Game # concrete class

  def __init__(self: Game, dealerStartPoints: int) -> None:
    self.dealer = Dealer(dealerStartPoints) # reassign variable
    self.players = list[Player]() # reassign variable
    self.message = "" # reassign variable

  dealer: Dealer # property

  players: list[Player] # property

  message: str # property

  def withPlayers(self: Game, p: list[Player]) -> Game: # function method
    copyOfThis = copy(self) # let
    copyOfThis.players = p # reassign variable
    return copyOfThis

  def newRound(self: Game) -> None: # procedure method
    dealer = self.dealer # variable definition
    dealer.newHand() # call procedure
    for player in self.players:
      player.newHand() # call procedure

  def updatePoints(self: Game) -> None: # procedure method
    for player in self.players:
      player.determineOutcomeAndUpdatePoints(self.dealer) # call procedure

  def addPlayer(self: Game, player: Player) -> None: # procedure method
    players = self.players # variable definition
    players.append(player) # call procedure

  def setMessage(self: Game, message: str) -> None: # procedure method
    self.message = message # reassign variable

  def toString(self: Game) -> str: # function method
    return "a Game"



class Card # concrete class

  suit: Suit # property

  rank: str # property

  faceDown: bool # property

  def __init__(self: Card, rank: str, suit: Suit, facedown: bool) -> None:
    self.rank = rank # reassign variable
    self.suit = suit # reassign variable
    self.faceDown = facedown # reassign variable

  def turnFaceUp(self: Card) -> None: # procedure method
    self.faceDown = False # reassign variable

  def turnFaceDown(self: Card) -> None: # procedure method
    self.faceDown = True # reassign variable

  def toString(self: Card) -> str: # function method
    return f"{self.rank}{symbolForSuit(self.suit)}"



class Player(ABC) # abstract class

  name: str # property

  points: int # property

  cards: list[Card] # property

  handTotal: int # property

  softAce: bool # property

  status: Status # property

  hasTurn: bool # property

  def startTurn(self: Player) -> None: # procedure method
    if self.status == Status.active:
      self.hasTurn = True # reassign variable

  def determineOutcomeAndUpdatePoints(self: Player, dealer: Dealer) -> None: # procedure method
    playerOutcome = determinePlayerOutcome(dealer, self) # variable definition
    if playerOutcome == Outcome.winDouble:
      self.changePointsBy(2) # call procedure
      dealer.changePointsBy(-2) # call procedure
    elif playerOutcome == Outcome.win: # else if
      self.changePointsBy(1) # call procedure
      dealer.changePointsBy(-1) # call procedure
    elif playerOutcome == Outcome.lose: # else if
      self.changePointsBy(-1) # call procedure
      dealer.changePointsBy(1) # call procedure

  def evaluateStatus(self: Player, newCard: Card) -> None: # procedure method
    if (self.cardCount() == 2) and (self.handTotal == 21):
      self.status = Status.blackjack # reassign variable
    elif (self.handTotal > 21) and (self.softAce): # else if
      self.handTotal = self.handTotal - 10 # reassign variable
      self.softAce = False # reassign variable
    elif self.handTotal > 21: # else if
      self.status = Status.bust # reassign variable
    elif self.handTotal == 21: # else if
      self.status = Status.standing # reassign variable
    if self.status != Status.active:
      self.hasTurn = False # reassign variable

  def stand(self: Player) -> None: # procedure method
    self.status = Status.standing # reassign variable
    self.hasTurn = False # reassign variable

  def draw(self: Player) -> None: # procedure method
    newCard = dealCard(random()) # variable definition
    cards = self.cards # variable definition
    cards.append(newCard) # call procedure
    if newCard.rank.equals("A"):
      self.addAce() # call procedure
    else:
      self.handTotal = self.handTotal + rankValue()[newCard.rank] # reassign variable
    self.evaluateStatus(newCard) # call procedure

  def addAce(self: Player) -> None: # procedure method
    if self.softAce:
      self.handTotal = self.handTotal + 1 # reassign variable
    else:
      self.handTotal = self.handTotal + 11 # reassign variable
      self.softAce = True # reassign variable

  def cardCount(self: Player) -> int: # function method
    return self.cards.length()

  def changePointsBy(self: Player, amount: int) -> None: # procedure method
    self.points = self.points + amount # reassign variable

  @abstractmethod
def newHand() -> None
  pass # abstract procedure

  def newHandHelper(self: Player) -> None: # private procedure method
    self.hasTurn = False # reassign variable
    self.softAce = False # reassign variable
    self.cards = list[Card]() # reassign variable
    self.handTotal = 0 # reassign variable
    self.status = Status.active # reassign variable
    self.draw() # call procedure
    self.draw() # call procedure

  @abstractmethod
def getMessage() -> str:
  pass # abstract function

  def getMessageHelper(self: Player) -> str: # private function method
    msg = "" # variable definition
    status = self.status # variable definition
    if self.hasTurn:
      msg = msg + " - PLAYING" # reassign variable
    elif status == Status.standing: # else if
      msg = msg + " - STANDING" # reassign variable
    elif status == Status.blackjack: # else if
      msg = msg + " - BLACKJACK" # reassign variable
    elif status == Status.bust: # else if
      msg = msg + " - BUST" # reassign variable
    return msg

  @abstractmethod
def nextAction(dealerFaceCard: Card) -> None
  pass # abstract procedure



class Dealer(Player) # concrete class

  def __init__(self: Dealer, startingPoints: int) -> None:
    self.name = "Dealer" # reassign variable
    self.points = startingPoints # reassign variable
    self.cards = list[Card]() # reassign variable
    self.faceCard = Card("2", Suit.clubs, True) # reassign variable

  faceCard: Card # property

  hasPlayed: bool # property

  def withStatus(self: Dealer, status: Status) -> Dealer: # function method
    copyOfThis = copy(self) # let
    copyOfThis.status = status # reassign variable
    return copyOfThis

  def withHandTotal(self: Dealer, ht: int) -> Dealer: # function method
    copyOfThis = copy(self) # let
    copyOfThis.handTotal = ht # reassign variable
    return copyOfThis

  def play(self: Dealer) -> None: # procedure method
    self.startTurn() # call procedure
    hiddenCard = self.cards[1] # variable definition
    hiddenCard.turnFaceUp() # call procedure
    self.hasPlayed = True # reassign variable

  def newHand(self: Dealer) -> None: # procedure method
    self.hasPlayed = False # reassign variable
    self.newHandHelper() # call procedure
    self.faceCard = self.cards[0] # reassign variable
    hiddenCard = self.cards[1] # variable definition
    hiddenCard.turnFaceDown() # call procedure

  def nextAction(self: Dealer, faceCard: Card) -> None: # procedure method
    if self.handTotal < 17:
      self.draw() # call procedure
    else:
      self.stand() # call procedure

  def getMessage(self: Dealer) -> str: # function method
    msg = "" # variable definition
    if self.hasPlayed:
      msg = self.getMessageHelper() + f" - hand total: {self.handTotal}" # reassign variable
    return msg

  def toString(self: Dealer) -> str: # function method
    return "the Dealer"



class HumanPlayer(Player) # concrete class

  def __init__(self: HumanPlayer, name: str, startingPoints: int) -> None:
    self.name = name # reassign variable
    self.points = startingPoints # reassign variable
    self.cards = list[Card]() # reassign variable

  def withStatus(self: HumanPlayer, status: Status) -> HumanPlayer: # function method
    copyOfThis = copy(self) # let
    copyOfThis.status = status # reassign variable
    return copyOfThis

  def withHandTotal(self: HumanPlayer, ht: int) -> HumanPlayer: # function method
    copyOfThis = copy(self) # let
    copyOfThis.handTotal = ht # reassign variable
    return copyOfThis

  def withCards(self: HumanPlayer, c: list[Card]) -> HumanPlayer: # function method
    copyOfThis = copy(self) # let
    copyOfThis.cards = c # reassign variable
    return copyOfThis

  def newHand(self: HumanPlayer) -> None: # procedure method
    self.newHandHelper() # call procedure

  def nextAction(self: HumanPlayer, dealerFaceCard: Card) -> None: # procedure method
    key = "" # variable definition
    clearKeyBuffer() # call procedure
    while key.equals(""):
      key = waitForKey() # reassign variable
      if key.equals("d"):
        self.draw() # call procedure
      elif key.equals("s"): # else if
        self.stand() # call procedure
      else:
        key = "" # reassign variable

  def getMessage(self: HumanPlayer) -> str: # function method
    msg = self.getMessageHelper() + f"- hand total: {self.handTotal}" # variable definition
    if self.hasTurn:
      msg = msg + " - press 'd' to draw, 's' to stand" # reassign variable
    return msg

  def toString(self: HumanPlayer) -> str: # function method
    return f"Player: {self.name}"



class Choice(Enum):
  stand = 1
  draw = 2

class Outcome(Enum):
  undecided = 1
  lose = 2
  draw = 3
  win = 4
  winDouble = 5

class Status(Enum):
  active = 1
  standing = 2
  blackjack = 3
  bust = 4

class Suit(Enum):
  clubs = 1
  diamonds = 2
  hearts = 3
  spades = 4

def symbolForSuit(suit: Suit) -> str: # function
  dc = [Suit.clubs:"&clubs;", Suit.diamonds:"&diams;", Suit.hearts:"&hearts;", Suit.spades:"&spades;"] # variable definition
  return dc[suit]

def rankValue() -> Dictionary[str, int]: # function
  return ["2":2, "3":3, "4":4, "5":5, "6":6, "7":7, "8":8, "9":9, "10":10, "J":10, "Q":10, "K":10, "A":11]

def gridForRank(rank: str) -> list[str]: # function
  dc = ["A":["royal"], "2":["b", "c"], "3":["a", "b", "c"], "4":["d", "e", "f", "g"], "5":["a", "d", "e", "f", "g"], "6":["d", "e", "f", "g", "h", "i"], "7":["d", "e", "f", "g", "h", "i", "l"], "8":["d", "e", "f", "g", "h", "i", "l", "m"], "9":["a", "d", "e", "f", "g", "n", "o", "p", "r"], "10":["d", "e", "f", "g", "n", "o", "p", "r", "s", "t"], "J":["royal"], "Q":["royal"], "K":["royal"]] # variable definition
  return dc[rank]

def colourForSuit(suit: Suit) -> str: # function
  dc = [Suit.clubs:"black", Suit.diamonds:"red", Suit.hearts:"red", Suit.spades:"black"] # variable definition
  return dc[suit]

styleSheet = ":root {    background-color: darkgreen;    padding-left: 5px;}.game {    padding: 5px;}.message, .details  {    color: white;    font-family: Arial, Helvetica, sans-serif;}.hand {        margin-top: 5px;        height: 150px;        padding-bottom: 10px;    }    .card {    position: relative;    float: left;    background-color: white;    width: 95px;    height:140px;    margin-right:10px;    padding: 5px;    border-radius: 5px;    font-family: Helvetica, sans-serif; }.royal,.a,.b,.c,.d,.e,.f,.g,.h,.i,.j,.k,.l,.m,.n,.o,.p,.q,.r,.s,.t,.u,.v,.w,.x,.y,.z {position: absolute; text-align:center;}/* Standard spots */     .a,.b,.c,.d,.e,.f,.g,.h,.i,.l,.m,.n,.o,.p,.r,.s,.t  {font-size:  30px;}    /* columns */    .d,.n,.h,.p,.f {left: 18px }    .a,.b,.c,.l,.m,.s,.t {left: 43px;}    .e,.o,.i,.r,.g {left: 68px}    /* rows */    .d,.b,.e {top: 0px}    .suit {top: 20px;}    .l {top: 28px;}    .n,.o {top: 37px;}    .h,.a,.i {top: 57px}    .p,.r {top: 75px;}    .m {top: 86px;}    .t {top: 93px;}    .f,.c,.g {top: 114px;}/* royals */    .royal {        position: absolute;        z-index: 1;        width: 95px;        height: 140px;        line-height: 140px;        font-size: 100px;    }/* corner summary */    .u {font-size: 15px; width: 15px; text-align: center; left: 0px; top: 2px;}    .v {font-size: 20px; width: 15px; text-align: center; left: 0px; top: 12px;}/* suit colors */    .red {color: red}    .black {color: black}/* back */    .card.reversed { background-color: rgba(0, 0, 255, 0.607);}" # constant

main()
