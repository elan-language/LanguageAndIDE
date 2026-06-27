# Python with Elan 2.0.0-beta1

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
      anotherRound = False # assignment
    # end if
  # end while
# end main

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
    # end while
  # end for
  dealer.play() # call procedure
  display(game) # call procedure
  while dealer.status == Status.active:
    dealer.nextAction(faceCard) # call procedure
    display(game) # call procedure
  # end while
  game.updatePoints() # call procedure
# end procedure

def display(game: Game) -> None: # procedure
  html = f"<style>{styleSheet}</style>{htmlForGame(game)}" # variable definition
  displayHtml(html) # call procedure
  sleep(1.5) # call procedure
# end procedure

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
    playerOutcome = lose # assignment
  elif (p == bj) and (d != bj): # else if
    playerOutcome = winDouble # assignment
  elif d == bust: # else if
    playerOutcome = win # assignment
  elif (d == bj) and (p == bj): # else if
    playerOutcome = draw # assignment
  elif p == bj: # else if
    playerOutcome = winDouble # assignment
  elif d == bj: # else if
    playerOutcome = lose # assignment
  elif pTotal > dTotal: # else if
    playerOutcome = win # assignment
  elif pTotal < dTotal: # else if
    playerOutcome = lose # assignment
  else:
    # strictly, this 'else' clause is redundant - as the variable was initialised to 'draw' - but added for clarity
    playerOutcome = draw # assignment
  # end if
  return playerOutcome
# end function

class Test_determinePlayerOutcome(unittest.TestCase):
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
# end test

def dealCard(random: float) -> Card: # function
  number = (random*52).floor() # variable definition
  rank = ranks()[divAsInt(number, 4)] # variable definition
  suit = number % 4 # variable definition
  return Card(rank, intAsSuit(suit), False)
# end function

class Test_dealCard(unittest.TestCase):
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
# end test

def intAsSuit(n: int) -> Suit: # function
  suit = Suit.clubs # variable definition
  if n == 1:
    suit = Suit.diamonds # assignment
  elif n == 2: # else if
    suit = Suit.hearts # assignment
  elif n == 3: # else if
    suit = Suit.spades # assignment
  # end if
  return suit
# end function

class Test_intAsSuit(unittest.TestCase):
 def test_intAsSuit(self) -> None:
  self.assertEqual(intAsSuit(0), Suit.clubs)
  self.assertEqual(intAsSuit(1), Suit.diamonds)
  self.assertEqual(intAsSuit(2), Suit.hearts)
  self.assertEqual(intAsSuit(3), Suit.spades)
# end test

def htmlForGame(game: Game) -> str: # function
  html = "<div class='game'>" # variable definition
  html = html + htmlForPlayer(game.dealer) # assignment
  for player in game.players:
    html = html + htmlForPlayer(player) # assignment
  # end for
  html = html + f"<div class='message'>{game.message}</div>" # assignment
  return html + "</div>"
# end function

class Test_htmlForGame(unittest.TestCase):
 def test_htmlForGame(self) -> None:
  c1 = Card("3", Suit.clubs, False) # let
  c2 = Card("K", Suit.spades, True) # let
  p = (HumanPlayer("fred", 10)).withCards([c1, c2]) # let
  players = (list[Player]()).withAppend(p) # let
  g2 = (Game(1)).withPlayers(players) # let
  self.assertEqual(htmlForGame(g2), "<div class='game'><div class='player'><div class='details'>Dealer - 1 points </div><div class='hand'></div></div><div class='player'><div class='details'>fred - 10 points - hand total: 0</div><div class='hand'><div class='card black'><div class='u'>3</div><div class='v'>&clubs;</div><div class='a'>&clubs;</div><div class='b'>&clubs;</div><div class='c'>&clubs;</div></div><div class='card reversed'></div></div></div><div class='message'></div></div>")
# end test

def htmlForPlayer(player: Player) -> str: # function
  html = "<div class='player'>" # variable definition
  html = html + f"<div class='details'>{player.name} - {player.points} points {player.getMessage()}</div>" # assignment
  html = html + "<div class='hand'>" # assignment
  for card in player.cards:
    suit = card.suit # variable definition
    rank = card.rank # variable definition
    html = html + htmlForCard(card) # assignment
  # end for
  return html + "</div></div>"
# end function

class Test_htmlForPlayer(unittest.TestCase):
 def test_htmlForPlayer(self) -> None:
  c1 = Card("3", Suit.clubs, False) # let
  c2 = Card("K", Suit.spades, True) # let
  p = (HumanPlayer("charlie", 10)).withCards([c1, c2]) # let
  self.assertEqual(htmlForPlayer(p), "<div class='player'><div class='details'>charlie - 10 points - hand total: 0</div><div class='hand'><div class='card black'><div class='u'>3</div><div class='v'>&clubs;</div><div class='a'>&clubs;</div><div class='b'>&clubs;</div><div class='c'>&clubs;</div></div><div class='card reversed'></div></div></div>")
# end test

def htmlForCard(card: Card) -> str: # function
  html = "" # variable definition
  if card.faceDown:
    html = "<div class='card reversed'>" # assignment
  else:
    rank = card.rank # variable definition
    suit = card.suit # variable definition
    colour = colourForSuit(suit) # variable definition
    symbol = symbolForSuit(suit) # variable definition
    html = f"<div class='card {colour}'>" # assignment
    u = htmlForSpot("u", rank) # variable definition
    v = htmlForSpot("v", symbol) # variable definition
    grid = "" # variable definition
    for location in gridForRank(rank):
      if location.equals("royal"):
        grid = grid + htmlForSpot(location, rank) # assignment
      else:
        grid = grid + htmlForSpot(location, symbol) # assignment
      # end if
    # end for
    html = html + f"{u}{v}{grid}" # assignment
  # end if
  return html + "</div>"
# end function

class Test_htmlForCard(unittest.TestCase):
 def test_htmlForCard(self) -> None:
  c1 = Card("3", Suit.clubs, False) # variable definition
  self.assertEqual(htmlForCard(c1), "<div class='card black'><div class='u'>3</div><div class='v'>&clubs;</div><div class='a'>&clubs;</div><div class='b'>&clubs;</div><div class='c'>&clubs;</div></div>")
  c2 = Card("K", Suit.spades, True) # variable definition
  self.assertEqual(htmlForCard(c2), "<div class='card reversed'></div>")
# end test

def htmlForSpot(id: str, content: str) -> str: # function
  return f"<div class='{id}'>{content}</div>"
# end function

class Test_htmlForSpot(unittest.TestCase):
 def test_htmlForSpot(self) -> None:
  self.assertEqual(htmlForSpot("c", "&hearts;"), "<div class='c'>&hearts;</div>")
  self.assertEqual(htmlForSpot("u", "10"), "<div class='u'>10</div>")
# end test

class Game: # concrete class

  def __init__(self: Game, dealerStartPoints: int) -> None:
    self.dealer = Dealer(dealerStartPoints) # assignment
    self.players = list[Player]() # assignment
    self.message = "" # assignment
  # end constructor

  dealer: Dealer # property

  players: list[Player] # property

  message: str # property

  def withPlayers(self: Game, p: list[Player]) -> Game: # function method
    copyOfThis = copy(self) # let
    copyOfThis.players = p # assignment
    return copyOfThis
  # end function method

  def newRound(self: Game) -> None: # procedure method
    dealer = self.dealer # variable definition
    dealer.newHand() # call procedure
    for player in self.players:
      player.newHand() # call procedure
    # end for
  # end procedure method

  def updatePoints(self: Game) -> None: # procedure method
    for player in self.players:
      player.determineOutcomeAndUpdatePoints(self.dealer) # call procedure
    # end for
  # end procedure method

  def addPlayer(self: Game, player: Player) -> None: # procedure method
    players = self.players # variable definition
    players.append(player) # call procedure
  # end procedure method

  def setMessage(self: Game, message: str) -> None: # procedure method
    self.message = message # assignment
  # end procedure method

  def toString(self: Game) -> str: # function method
    return "a Game"
  # end function method

# end class

class Card: # concrete class

  suit: Suit # property

  rank: str # property

  faceDown: bool # property

  def __init__(self: Card, rank: str, suit: Suit, facedown: bool) -> None:
    self.rank = rank # assignment
    self.suit = suit # assignment
    self.faceDown = facedown # assignment
  # end constructor

  def turnFaceUp(self: Card) -> None: # procedure method
    self.faceDown = False # assignment
  # end procedure method

  def turnFaceDown(self: Card) -> None: # procedure method
    self.faceDown = True # assignment
  # end procedure method

  def toString(self: Card) -> str: # function method
    return f"{self.rank}{symbolForSuit(self.suit)}"
  # end function method

# end class

class Player(ABC): # abstract class

  name: str # property

  points: int # property

  cards: list[Card] # property

  handTotal: int # property

  softAce: bool # property

  status: Status # property

  hasTurn: bool # property

  def startTurn(self: Player) -> None: # procedure method
    if self.status == Status.active:
      self.hasTurn = True # assignment
    # end if
  # end procedure method

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
    # end if
  # end procedure method

  def evaluateStatus(self: Player, newCard: Card) -> None: # procedure method
    if (self.cardCount() == 2) and (self.handTotal == 21):
      self.status = Status.blackjack # assignment
    elif (self.handTotal > 21) and (self.softAce): # else if
      self.handTotal = self.handTotal - 10 # assignment
      self.softAce = False # assignment
    elif self.handTotal > 21: # else if
      self.status = Status.bust # assignment
    elif self.handTotal == 21: # else if
      self.status = Status.standing # assignment
    # end if
    if self.status != Status.active:
      self.hasTurn = False # assignment
    # end if
  # end procedure method

  def stand(self: Player) -> None: # procedure method
    self.status = Status.standing # assignment
    self.hasTurn = False # assignment
  # end procedure method

  def draw(self: Player) -> None: # procedure method
    newCard = dealCard(random()) # variable definition
    cards = self.cards # variable definition
    cards.append(newCard) # call procedure
    if newCard.rank.equals("A"):
      self.addAce() # call procedure
    else:
      self.handTotal = self.handTotal + valueForRank(newCard.rank) # assignment
    # end if
    self.evaluateStatus(newCard) # call procedure
  # end procedure method

  def addAce(self: Player) -> None: # procedure method
    if self.softAce:
      self.handTotal = self.handTotal + 1 # assignment
    else:
      self.handTotal = self.handTotal + 11 # assignment
      self.softAce = True # assignment
    # end if
  # end procedure method

  def cardCount(self: Player) -> int: # function method
    return self.cards.length()
  # end function method

  def changePointsBy(self: Player, amount: int) -> None: # procedure method
    self.points = self.points + amount # assignment
  # end procedure method

  @abstractmethod
  def newHand() -> None
    pass # abstract procedure

  def newHandHelper(self: Player) -> None: # private procedure method
    self.hasTurn = False # assignment
    self.softAce = False # assignment
    self.cards = list[Card]() # assignment
    self.handTotal = 0 # assignment
    self.status = Status.active # assignment
    self.draw() # call procedure
    self.draw() # call procedure
  # end procedure method

  @abstractmethod
  def getMessage() -> str:
    pass # abstract function

  def getMessageHelper(self: Player) -> str: # private function method
    msg = "" # variable definition
    status = self.status # variable definition
    if self.hasTurn:
      msg = msg + " - PLAYING" # assignment
    elif status == Status.standing: # else if
      msg = msg + " - STANDING" # assignment
    elif status == Status.blackjack: # else if
      msg = msg + " - BLACKJACK" # assignment
    elif status == Status.bust: # else if
      msg = msg + " - BUST" # assignment
    # end if
    return msg
  # end function method

  @abstractmethod
  def nextAction(dealerFaceCard: Card) -> None
    pass # abstract procedure

# end class

class Dealer(Player): # concrete class

  def __init__(self: Dealer, startingPoints: int) -> None:
    self.name = "Dealer" # assignment
    self.points = startingPoints # assignment
    self.cards = list[Card]() # assignment
    self.faceCard = Card("2", Suit.clubs, True) # assignment
  # end constructor

  faceCard: Card # property

  hasPlayed: bool # property

  def withStatus(self: Dealer, status: Status) -> Dealer: # function method
    copyOfThis = copy(self) # let
    copyOfThis.status = status # assignment
    return copyOfThis
  # end function method

  def withHandTotal(self: Dealer, ht: int) -> Dealer: # function method
    copyOfThis = copy(self) # let
    copyOfThis.handTotal = ht # assignment
    return copyOfThis
  # end function method

  def play(self: Dealer) -> None: # procedure method
    self.startTurn() # call procedure
    hiddenCard = self.cards[1] # variable definition
    hiddenCard.turnFaceUp() # call procedure
    self.hasPlayed = True # assignment
  # end procedure method

  def newHand(self: Dealer) -> None: # procedure method
    self.hasPlayed = False # assignment
    self.newHandHelper() # call procedure
    self.faceCard = self.cards[0] # assignment
    hiddenCard = self.cards[1] # variable definition
    hiddenCard.turnFaceDown() # call procedure
  # end procedure method

  def nextAction(self: Dealer, faceCard: Card) -> None: # procedure method
    if self.handTotal < 17:
      self.draw() # call procedure
    else:
      self.stand() # call procedure
    # end if
  # end procedure method

  def getMessage(self: Dealer) -> str: # function method
    msg = "" # variable definition
    if self.hasPlayed:
      msg = self.getMessageHelper() + f" - hand total: {self.handTotal}" # assignment
    # end if
    return msg
  # end function method

  def toString(self: Dealer) -> str: # function method
    return "the Dealer"
  # end function method

# end class

class HumanPlayer(Player): # concrete class

  def __init__(self: HumanPlayer, name: str, startingPoints: int) -> None:
    self.name = name # assignment
    self.points = startingPoints # assignment
    self.cards = list[Card]() # assignment
  # end constructor

  def withStatus(self: HumanPlayer, status: Status) -> HumanPlayer: # function method
    copyOfThis = copy(self) # let
    copyOfThis.status = status # assignment
    return copyOfThis
  # end function method

  def withHandTotal(self: HumanPlayer, ht: int) -> HumanPlayer: # function method
    copyOfThis = copy(self) # let
    copyOfThis.handTotal = ht # assignment
    return copyOfThis
  # end function method

  def withCards(self: HumanPlayer, c: list[Card]) -> HumanPlayer: # function method
    copyOfThis = copy(self) # let
    copyOfThis.cards = c # assignment
    return copyOfThis
  # end function method

  def newHand(self: HumanPlayer) -> None: # procedure method
    self.newHandHelper() # call procedure
  # end procedure method

  def nextAction(self: HumanPlayer, dealerFaceCard: Card) -> None: # procedure method
    key = "" # variable definition
    clearKeyBuffer() # call procedure
    while key.equals(""):
      key = waitForKey() # assignment
      if key.equals("d"):
        self.draw() # call procedure
      elif key.equals("s"): # else if
        self.stand() # call procedure
      else:
        key = "" # assignment
      # end if
    # end while
  # end procedure method

  def getMessage(self: HumanPlayer) -> str: # function method
    msg = self.getMessageHelper() + f"- hand total: {self.handTotal}" # variable definition
    if self.hasTurn:
      msg = msg + " - press 'd' to draw, 's' to stand" # assignment
    # end if
    return msg
  # end function method

  def toString(self: HumanPlayer) -> str: # function method
    return f"Player: {self.name}"
  # end function method

# end class

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
  suits = [Suit.clubs, Suit.diamonds, Suit.hearts, Suit.spades] # variable definition
  symbols = ["&clubs;", "&diams;", "&hearts;", "&spades;"] # variable definition
  return symbols[suits.indexOf(suit)]
# end function

def ranks() -> list[str]: # function
  return ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]
# end function

def valueForRank(rank: str) -> int: # function
  values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11] # variable definition
  return values[ranks().indexOf(rank)]
# end function

def gridForRank(rank: str) -> list[str]: # function
  grids = [["b", "c"], ["a", "b", "c"], ["d", "e", "f", "g"], ["a", "d", "e", "f", "g"], ["d", "e", "f", "g", "h", "i"], ["d", "e", "f", "g", "h", "i", "l"], ["d", "e", "f", "g", "h", "i", "l", "m"], ["a", "d", "e", "f", "g", "n", "o", "p", "r"], ["d", "e", "f", "g", "n", "o", "p", "r", "s", "t"], ["royal"], ["royal"], ["royal"], ["royal"]] # variable definition
  return grids[ranks().indexOf(rank)]
# end function

def colourForSuit(suit: Suit) -> str: # function
  suits = [Suit.clubs, Suit.diamonds, Suit.hearts, Suit.spades] # variable definition
  colours = ["black", "red", "red", "black"] # variable definition
  return colours[suits.indexOf(suit)]
# end function

styleSheet = ":root {    background-color: darkgreen;    padding-left: 5px;}.game {    padding: 5px;}.message, .details  {    color: white;    font-family: Arial, Helvetica, sans-serif;}.hand {        margin-top: 5px;        height: 150px;        padding-bottom: 10px;    }    .card {    position: relative;    float: left;    background-color: white;    width: 95px;    height:140px;    margin-right:10px;    padding: 5px;    border-radius: 5px;    font-family: Helvetica, sans-serif; }.royal,.a,.b,.c,.d,.e,.f,.g,.h,.i,.j,.k,.l,.m,.n,.o,.p,.q,.r,.s,.t,.u,.v,.w,.x,.y,.z {position: absolute; text-align:center;}/* Standard spots */     .a,.b,.c,.d,.e,.f,.g,.h,.i,.l,.m,.n,.o,.p,.r,.s,.t  {font-size:  30px;}    /* columns */    .d,.n,.h,.p,.f {left: 18px }    .a,.b,.c,.l,.m,.s,.t {left: 43px;}    .e,.o,.i,.r,.g {left: 68px}    /* rows */    .d,.b,.e {top: 0px}    .suit {top: 20px;}    .l {top: 28px;}    .n,.o {top: 37px;}    .h,.a,.i {top: 57px}    .p,.r {top: 75px;}    .m {top: 86px;}    .t {top: 93px;}    .f,.c,.g {top: 114px;}/* royals */    .royal {        position: absolute;        z-index: 1;        width: 95px;        height: 140px;        line-height: 140px;        font-size: 100px;    }/* corner summary */    .u {font-size: 15px; width: 15px; text-align: center; left: 0px; top: 2px;}    .v {font-size: 20px; width: 15px; text-align: center; left: 0px; top: 12px;}/* suit colors */    .red {color: red}    .black {color: black}/* back */    .card.reversed { background-color: rgba(0, 0, 255, 0.607);}" # constant

main()
