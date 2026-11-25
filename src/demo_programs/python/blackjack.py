# 76e3a0271024c7ca6b8bd64d8f9018f2b50948fdbecdf51b057471aaca4395d3 Python with Elan 3.0.0-alpha valid

def main() -> None:
  game = Game(1000) # variable definition
  game.addPlayer(HumanPlayer("Player A", 1000))
  anotherRound = True # variable definition
  while anotherRound:
    playOneRound(game)
    game.setMessage("Points updated. Do you want to play another round? (press y or n)")
    clearKeyBuffer()
    display(game)
    k = waitForKey().lowerCase() # variable definition
    if k.equals("y"):
      game.setMessage("")
    else:
      anotherRound = False # assignment
    # end if
  # end while
# end main

def playOneRound(game: Game) -> None: # procedure
  game.newRound()
  display(game)
  dealer = game.dealer # variable definition
  faceCard = dealer.faceCard # variable definition
  for player in game.players:
    player.startTurn()
    display(game)
    while player.status == Status.active:
      player.nextAction(faceCard)
      display(game)
    # end while
  # end for
  dealer.play()
  display(game)
  while dealer.status == Status.active:
    dealer.nextAction(faceCard)
    display(game)
  # end while
  game.updatePoints()
# end procedure

def display(game: Game) -> None: # procedure
  html = f"<style>{styleSheet}</style>{htmlForGame(game)}" # variable definition
  displayHtml(html)
  sleep(1.5)
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
  elif (p == bj) and (d != bj):
    playerOutcome = winDouble # assignment
  elif d == bust:
    playerOutcome = win # assignment
  elif (d == bj) and (p == bj):
    playerOutcome = draw # assignment
  elif p == bj:
    playerOutcome = winDouble # assignment
  elif d == bj:
    playerOutcome = lose # assignment
  elif pTotal > dTotal:
    playerOutcome = win # assignment
  elif pTotal < dTotal:
    playerOutcome = lose # assignment
  else:
    # strictly, this 'else' clause is redundant - as the variable was initialised to 'draw' - but added for clarity
    playerOutcome = draw # assignment
  # end if
  return playerOutcome
# end function

class Test_determinePlayerOutcome(unittest.TestCase):
 def test_determinePlayerOutcome(self: Test_determinePlayerOutcome) -> None:
  dbj = (Dealer(0)).with_status(Status.blackjack) # variable definition
  self.assertEqual(dbj.status, Status.blackjack)
  d21 = (Dealer(0)).with_status(Status.standing).with_handTotal(21) # variable definition
  self.assertEqual(d21.status, Status.standing)
  self.assertEqual(d21.handTotal, 21)
  d17 = (Dealer(0)).with_status(Status.standing).with_handTotal(17) # variable definition
  dbu = (Dealer(0)).with_status(Status.bust) # variable definition
  pbj = (HumanPlayer("", 0)).with_status(Status.blackjack) # variable definition
  self.assertEqual(pbj.status, Status.blackjack)
  p21 = (HumanPlayer("", 0)).with_status(Status.standing).with_handTotal(21) # variable definition
  p17 = (HumanPlayer("", 0)).with_status(Status.standing).with_handTotal(17) # variable definition
  pbu = (HumanPlayer("", 0)).with_status(Status.bust) # variable definition
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
 def test_dealCard(self: Test_dealCard) -> None:
  c1 = dealCard(0) # variable definition
  self.assertEqual(c1.rank, "2")
  self.assertEqual(c1.suit, Suit.clubs)
  c2 = dealCard(0.9999999) # variable definition
  self.assertEqual(c2.rank, "A")
  self.assertEqual(c2.suit, Suit.spades)
  c3 = dealCard(0.5) # variable definition
  self.assertEqual(c3.rank, "8")
  self.assertEqual(c3.suit, Suit.hearts)
  c4 = dealCard(0.24) # variable definition
  self.assertEqual(c4.rank, "5")
  self.assertEqual(c4.suit, Suit.clubs)
# end test

def intAsSuit(n: int) -> Suit: # function
  suit = Suit.clubs # variable definition
  if n == 1:
    suit = Suit.diamonds # assignment
  elif n == 2:
    suit = Suit.hearts # assignment
  elif n == 3:
    suit = Suit.spades # assignment
  # end if
  return suit
# end function

class Test_intAsSuit(unittest.TestCase):
 def test_intAsSuit(self: Test_intAsSuit) -> None:
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
 def test_htmlForGame(self: Test_htmlForGame) -> None:
  c1 = Card("3", Suit.clubs, False) # variable definition
  c2 = Card("K", Suit.spades, True) # variable definition
  p = (HumanPlayer("fred", 10)).with_cards([c1, c2]) # variable definition
  players = (list[Player]()).withAppend(p) # variable definition
  g2 = (Game(1)).with_players(players) # variable definition
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
 def test_htmlForPlayer(self: Test_htmlForPlayer) -> None:
  c1 = Card("3", Suit.clubs, False) # variable definition
  c2 = Card("K", Suit.spades, True) # variable definition
  p = (HumanPlayer("charlie", 10)).with_cards([c1, c2]) # variable definition
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
 def test_htmlForCard(self: Test_htmlForCard) -> None:
  c1 = Card("3", Suit.clubs, False) # variable definition
  self.assertEqual(htmlForCard(c1), "<div class='card black'><div class='u'>3</div><div class='v'>&clubs;</div><div class='a'>&clubs;</div><div class='b'>&clubs;</div><div class='c'>&clubs;</div></div>")
  c2 = Card("K", Suit.spades, True) # variable definition
  self.assertEqual(htmlForCard(c2), "<div class='card reversed'></div>")
# end test

def htmlForSpot(id: str, content: str) -> str: # function
  return f"<div class='{id}'>{content}</div>"
# end function

class Test_htmlForSpot(unittest.TestCase):
 def test_htmlForSpot(self: Test_htmlForSpot) -> None:
  self.assertEqual(htmlForSpot("c", "&hearts;"), "<div class='c'>&hearts;</div>")
  self.assertEqual(htmlForSpot("u", "10"), "<div class='u'>10</div>")
# end test

class Game:
  def __init__(self: <el-type>Game</el-type>, dealerStartPoints: int) -> None:
    self.dealer = Dealer(dealerStartPoints) # assignment
    self.players = list[Player]() # assignment
    self.message = "" # assignment
  # end constructor

  dealer: Dealer

  players: list[Player]

  message: str

  def with_players(self: <el-type>Game</el-type>, players: list[Player]) -> Game:
    return copyWith(self, "players", players)
  # end function

  def newRound(self: <el-type>Game</el-type>, ) -> None:
    dealer = self.dealer # variable definition
    dealer.newHand()
    for player in self.players:
      player.newHand()
    # end for
  # end procedure

  def updatePoints(self: <el-type>Game</el-type>, ) -> None:
    for player in self.players:
      player.determineOutcomeAndUpdatePoints(self.dealer)
    # end for
  # end procedure

  def addPlayer(self: <el-type>Game</el-type>, player: Player) -> None:
    players = self.players # variable definition
    players.append(player)
  # end procedure

  def setMessage(self: <el-type>Game</el-type>, message: str) -> None:
    self.message = message # assignment
  # end procedure

  def toString(self: <el-type>Game</el-type>, ) -> str:
    return "a Game"
  # end function

# end class

class Card:
  def __init__(self: <el-type>Card</el-type>, rank: str, suit: Suit, facedown: bool) -> None:
    self.rank = rank # assignment
    self.suit = suit # assignment
    self.faceDown = facedown # assignment
  # end constructor

  def turnFaceUp(self: <el-type>Card</el-type>, ) -> None:
    self.faceDown = False # assignment
  # end procedure

  def turnFaceDown(self: <el-type>Card</el-type>, ) -> None:
    self.faceDown = True # assignment
  # end procedure

  suit: Suit

  rank: str

  faceDown: bool

  def toString(self: <el-type>Card</el-type>, ) -> str:
    return f"{self.rank}{symbolForSuit(self.suit)}"
  # end function

# end class

class Player:
  name: str

  points: int

  cards: list[Card]

  handTotal: int

  softAce: bool

  status: Status

  hasTurn: bool

  def startTurn(self: <el-type>Player</el-type>, ) -> None:
    if self.status == Status.active:
      self.hasTurn = True # assignment
    # end if
  # end procedure

  def determineOutcomeAndUpdatePoints(self: <el-type>Player</el-type>, dealer: Dealer) -> None:
    playerOutcome = determinePlayerOutcome(dealer, self) # variable definition
    if playerOutcome == Outcome.winDouble:
      self.changePointsBy(2)
      dealer.changePointsBy(-2)
    elif playerOutcome == Outcome.win:
      self.changePointsBy(1)
      dealer.changePointsBy(-1)
    elif playerOutcome == Outcome.lose:
      self.changePointsBy(-1)
      dealer.changePointsBy(1)
    # end if
  # end procedure

  def evaluateStatus(self: <el-type>Player</el-type>, newCard: Card) -> None:
    if (self.cardCount() == 2) and (self.handTotal == 21):
      self.status = Status.blackjack # assignment
    elif (self.handTotal > 21) and (self.softAce):
      self.handTotal = self.handTotal - 10 # assignment
      self.softAce = False # assignment
    elif self.handTotal > 21:
      self.status = Status.bust # assignment
    elif self.handTotal == 21:
      self.status = Status.standing # assignment
    # end if
    if self.status != Status.active:
      self.hasTurn = False # assignment
    # end if
  # end procedure

  def stand(self: <el-type>Player</el-type>, ) -> None:
    self.status = Status.standing # assignment
    self.hasTurn = False # assignment
  # end procedure

  def draw(self: <el-type>Player</el-type>, ) -> None:
    newCard = dealCard(random()) # variable definition
    cards = self.cards # variable definition
    cards.append(newCard)
    if newCard.rank.equals("A"):
      self.addAce()
    else:
      self.handTotal = self.handTotal + valueForRank(newCard.rank) # assignment
    # end if
    self.evaluateStatus(newCard)
  # end procedure

  def addAce(self: <el-type>Player</el-type>, ) -> None:
    if self.softAce:
      self.handTotal = self.handTotal + 1 # assignment
    else:
      self.handTotal = self.handTotal + 11 # assignment
      self.softAce = True # assignment
    # end if
  # end procedure

  def cardCount(self: <el-type>Player</el-type>, ) -> int:
    return self.cards.length()
  # end function

  def changePointsBy(self: <el-type>Player</el-type>, amount: int) -> None:
    self.points = self.points + amount # assignment
  # end procedure

  @abstractmethod
  def newHand() -> None
    pass

  def newHandHelper(self: <el-type>Player</el-type>, ) -> None:
    self.hasTurn = False # assignment
    self.softAce = False # assignment
    self.cards = list[Card]() # assignment
    self.handTotal = 0 # assignment
    self.status = Status.active # assignment
    self.draw()
    self.draw()
  # end procedure

  @abstractmethod
  def getMessage() -> str:
    pass

  def getMessageHelper(self: <el-type>Player</el-type>, ) -> str:
    msg = "" # variable definition
    status = self.status # variable definition
    if self.hasTurn:
      msg = msg + " - PLAYING" # assignment
    elif status == Status.standing:
      msg = msg + " - STANDING" # assignment
    elif status == Status.blackjack:
      msg = msg + " - BLACKJACK" # assignment
    elif status == Status.bust:
      msg = msg + " - BUST" # assignment
    # end if
    return msg
  # end function

  @abstractmethod
  def nextAction(dealerFaceCard: Card) -> None
    pass

# end class

class Dealer(Player):
  def __init__(self: <el-type>Dealer</el-type>, startingPoints: int) -> None:
    self.name = "Dealer" # assignment
    self.points = startingPoints # assignment
    self.cards = list[Card]() # assignment
    self.faceCard = Card("2", Suit.clubs, True) # assignment
  # end constructor

  faceCard: Card

  hasPlayed: bool

  def with_status(self: <el-type>Dealer</el-type>, status: Status) -> Dealer:
    return copyWith(self, "status", status)
  # end function

  def with_handTotal(self: <el-type>Dealer</el-type>, handTotal: int) -> Dealer:
    return copyWith(self, "handTotal", handTotal)
  # end function

  def play(self: <el-type>Dealer</el-type>, ) -> None:
    self.startTurn()
    hiddenCard = self.cards[1] # variable definition
    hiddenCard.turnFaceUp()
    self.hasPlayed = True # assignment
  # end procedure

  def newHand(self: <el-type>Dealer</el-type>, ) -> None:
    self.hasPlayed = False # assignment
    self.newHandHelper()
    self.faceCard = self.cards[0] # assignment
    hiddenCard = self.cards[1] # variable definition
    hiddenCard.turnFaceDown()
  # end procedure

  def nextAction(self: <el-type>Dealer</el-type>, faceCard: Card) -> None:
    if self.handTotal < 17:
      self.draw()
    else:
      self.stand()
    # end if
  # end procedure

  def getMessage(self: <el-type>Dealer</el-type>, ) -> str:
    msg = "" # variable definition
    if self.hasPlayed:
      msg = self.getMessageHelper() + f" - hand total: {self.handTotal}" # assignment
    # end if
    return msg
  # end function

  def toString(self: <el-type>Dealer</el-type>, ) -> str:
    return "the Dealer"
  # end function

# end class

class HumanPlayer(Player):
  def __init__(self: <el-type>HumanPlayer</el-type>, name: str, startingPoints: int) -> None:
    self.name = name # assignment
    self.points = startingPoints # assignment
    self.cards = list[Card]() # assignment
  # end constructor

  def with_status(self: <el-type>HumanPlayer</el-type>, status: Status) -> HumanPlayer:
    return copyWith(self, "status", status)
  # end function

  def with_handTotal(self: <el-type>HumanPlayer</el-type>, handTotal: int) -> HumanPlayer:
    return copyWith(self, "handTotal", handTotal)
  # end function

  def with_cards(self: <el-type>HumanPlayer</el-type>, cards: list[Card]) -> HumanPlayer:
    return copyWith(self, "cards", cards)
  # end function

  def newHand(self: <el-type>HumanPlayer</el-type>, ) -> None:
    self.newHandHelper()
  # end procedure

  def nextAction(self: <el-type>HumanPlayer</el-type>, dealerFaceCard: Card) -> None:
    key = "" # variable definition
    clearKeyBuffer()
    while key.equals(""):
      key = waitForKey() # assignment
      if key.equals("d"):
        self.draw()
      elif key.equals("s"):
        self.stand()
      else:
        key = "" # assignment
      # end if
    # end while
  # end procedure

  def getMessage(self: <el-type>HumanPlayer</el-type>, ) -> str:
    msg = self.getMessageHelper() + f"- hand total: {self.handTotal}" # variable definition
    if self.hasTurn:
      msg = msg + " - press 'd' to draw, 's' to stand" # assignment
    # end if
    return msg
  # end function

  def toString(self: <el-type>HumanPlayer</el-type>, ) -> str:
    return f"Player: {self.name}"
  # end function

# end class

class Choice(Enum):stand, draw

class Outcome(Enum):undecided, lose, draw, win, winDouble

class Status(Enum):active, standing, blackjack, bust

class Suit(Enum):clubs, diamonds, hearts, spades

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

styleSheet = ":root {    background-color: darkgreen;    padding-left: 5px;}.game {    padding: 5px;}.message, .details  {    color: white;    font-family: Arial, Helvetica, sans-serif;}.hand {        margin-top: 5px;        height: 150px;        padding-bottom: 10px;    }    .card {    position: relative;    float: left;    background-color: white;    width: 95px;    height:140px;    margin-right:10px;    padding: 5px;    border-radius: 5px;    font-family: Helvetica, sans-serif; }.royal,.a,.b,.c,.d,.e,.f,.g,.h,.i,.j,.k,.l,.m,.n,.o,.p,.q,.r,.s,.t,.u,.v,.w,.x,.y,.z {position: absolute; text-align:center;}/* Standard spots */     .a,.b,.c,.d,.e,.f,.g,.h,.i,.l,.m,.n,.o,.p,.r,.s,.t  {font-size:  30px;}    /* columns */    .d,.n,.h,.p,.f {left: 18px }    .a,.b,.c,.l,.m,.s,.t {left: 43px;}    .e,.o,.i,.r,.g {left: 68px}    /* rows */    .d,.b,.e {top: 0px}    .suit {top: 20px;}    .l {top: 28px;}    .n,.o {top: 37px;}    .h,.a,.i {top: 57px}    .p,.r {top: 75px;}    .m {top: 86px;}    .t {top: 93px;}    .f,.c,.g {top: 114px;}/* royals */    .royal {        position: absolute;        z-index: 1;        width: 95px;        height: 140px;        line-height: 140px;        font-size: 100px;    }/* corner summary */    .u {font-size: 15px; width: 15px; text-align: center; left: 0px; top: 2px;}    .v {font-size: 20px; width: 15px; text-align: center; left: 0px; top: 12px;}/* suit colors */    .red {color: red}    .black {color: black}/* back */    .card.reversed { background-color: rgba(0, 0, 255, 0.607);}"

main()
