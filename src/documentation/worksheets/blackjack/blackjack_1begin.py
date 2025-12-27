# 3572c041672a57c1a2041680db171e91c97d718a251ba6de48e606930d3a1200 Elan 1.9.0 guest default_profile valid

def main -> None:  # [main]
  game = new Game(1000) # [variable definition]
  game.addPlayer(new HumanPlayer("Player A", 1000)) # [call procedure]}
  anotherRound = true # [variable definition]
  while anotherRound
    playOneRound(game) # [call procedure]}
    game.setMessage("Points updated. Do you want to play another round? (press y or n)") # [call procedure]}
    clearKeyBuffer() # [call procedure]}
    display(game) # [call procedure]}
    k = waitForKey().lowerCase() # [variable definition]
    if k is 'y' then
      game.setMessage("") # [call procedure]}
    else
      anotherRound = false # [assign variable]


def playOneRound(game: Game) -> None:  # [procedure]
  game.newRound() # [call procedure]}
  display(game) # [call procedure]}
  dealer = game.dealer # [variable definition]
  for player in game.players:  # [each loop]
    player.startTurn() # [call procedure]}
    display(game) # [call procedure]}
    while player.status is Status.active
      player.nextAction(dealer.faceCard) # [call procedure]}
      display(game) # [call procedure]}
  dealer.play() # [call procedure]}
  display(game) # [call procedure]}
  while dealer.status is Status.active
    dealer.nextAction(dealer.faceCard) # [call procedure]}
    display(game) # [call procedure]}
  game.updatePoints() # [call procedure]}


def display(game: Game) -> None:  # [procedure]
  html = "<style>{styleSheet}</style>{htmlForGame(game)}" # [variable definition]
  displayHtml(html) # [call procedure]}
  pause(1500) # [call procedure]}


def updatePoints(dealer: Dealer, player: Player, playerOutcome: Outcome) -> None:  # [procedure]
  if playerOutcome is Outcome.winDouble then
    player.changePointsBy(2) # [call procedure]}
    dealer.changePointsBy(-2) # [call procedure]}
  else if playerOutcome is Outcome.win then
    player.changePointsBy(1) # [call procedure]}
    dealer.changePointsBy(-1) # [call procedure]}
  else if playerOutcome is Outcome.lose then
    player.changePointsBy(-1) # [call procedure]}
    dealer.changePointsBy(1) # [call procedure]}


def determinePlayerOutcome(dealer: Dealer, player: Player) -> Outcome:  # [function]
  # These 'let' definitions are just to make the logic that follows them simpler to read
  d = dealer.status # [variable definition]
  dTotal = dealer.handTotal # [variable definition]
  p = player.status # [variable definition]
  pTotal = player.handTotal # [variable definition]
  bust = Status.bust # [variable definition]
  bj = Status.blackjack # [variable definition]
  win = Outcome.win # [variable definition]
  winDouble = Outcome.winDouble # [variable definition]
  lose = Outcome.lose # [variable definition]
  draw = Outcome.draw # [variable definition]
  playerOutcome = draw # [variable definition]
  if p is bust then
    playerOutcome = lose # [assign variable]
  else if (p is bj) and (d isnt bj) then
    playerOutcome = winDouble # [assign variable]
  else if d is bust then
    playerOutcome = win # [assign variable]
  else if (d is bj) and (p is bj) then
    playerOutcome = draw # [assign variable]
  else if p is bj then
    playerOutcome = winDouble # [assign variable]
  else if d is bj then
    playerOutcome = lose # [assign variable]
  else if pTotal > dTotal then
    playerOutcome = win # [assign variable]
  else if pTotal < dTotal then
    playerOutcome = lose # [assign variable]
  else
    # strictly, this 'else' clause is redundant - as the variable was initialised to 'draw' - but added for clarity
    playerOutcome = draw # [assign variable]
  return playerOutcome


def test_determinePlayerOutcome() -> None:  # [test]
  dbj = new Dealer(0) with status set to Status.blackjack # [variable definition]
  d21 = new Dealer(0) with status set to Status.standing, handTotal set to 21 # [variable definition]
  d17 = new Dealer(0) with status set to Status.standing, handTotal set to 17 # [variable definition]
  dbu = new Dealer(0) with status set to Status.bust # [variable definition]
  pbj = new HumanPlayer("", 0) with status set to Status.blackjack # [variable definition]
  p21 = new HumanPlayer("", 0) with status set to Status.standing, handTotal set to 21 # [variable definition]
  p17 = new HumanPlayer("", 0) with status set to Status.standing, handTotal set to 17 # [variable definition]
  pbu = new HumanPlayer("", 0) with status set to Status.bust # [variable definition]
  assertEqual(determinePlayerOutcome(dbj, pbj), Outcome.draw)  # [assert]
  assertEqual(determinePlayerOutcome(dbj, p21), Outcome.lose)  # [assert]
  assertEqual(determinePlayerOutcome(dbj, pbu), Outcome.lose)  # [assert]
  assertEqual(determinePlayerOutcome(d21, pbj), Outcome.winDouble)  # [assert]
  assertEqual(determinePlayerOutcome(d21, p21), Outcome.draw)  # [assert]
  assertEqual(determinePlayerOutcome(d21, p17), Outcome.lose)  # [assert]
  assertEqual(determinePlayerOutcome(d21, pbu), Outcome.lose)  # [assert]
  assertEqual(determinePlayerOutcome(dbu, pbj), Outcome.winDouble)  # [assert]
  assertEqual(determinePlayerOutcome(dbu, p17), Outcome.win)  # [assert]
  assertEqual(determinePlayerOutcome(dbu, pbu), Outcome.lose)  # [assert]


def dealCard(random: Float) -> Card:  # [function]
  number = (random*52).floor() # [variable definition]
  rank = rankValue.keys()[(number/4).floor()] # [variable definition]
  suit = number mod 4 # [variable definition]
  return new Card() with rank set to rank, suit set to intAsSuit(suit)


def test_dealCard() -> None:  # [test]
  c1 = dealCard(0) # [variable definition]
  assertEqual(c1.rank, "2")  # [assert]
  assertEqual(c1.suit, Suit.clubs)  # [assert]
  c2 = dealCard(0.9999999) # [variable definition]
  assertEqual(c2.rank, "A")  # [assert]
  assertEqual(c2.suit, Suit.spades)  # [assert]
  c3 = dealCard(0.5) # [variable definition]
  assertEqual(c3.rank, "8")  # [assert]
  assertEqual(c3.suit, Suit.hearts)  # [assert]
  c4 = dealCard(0.24) # [variable definition]
  assertEqual(c4.rank, "5")  # [assert]
  assertEqual(c4.suit, Suit.clubs)  # [assert]


def intAsSuit(n: Int) -> Suit:  # [function]
  suit = Suit.clubs # [variable definition]
  if n is 1 then
    suit = Suit.diamonds # [assign variable]
  else if n is 2 then
    suit = Suit.hearts # [assign variable]
  else if n is 3 then
    suit = Suit.spades # [assign variable]
  return suit


def test_intAsSuit() -> None:  # [test]
  assertEqual(intAsSuit(0), Suit.clubs)  # [assert]
  assertEqual(intAsSuit(1), Suit.diamonds)  # [assert]
  assertEqual(intAsSuit(2), Suit.hearts)  # [assert]
  assertEqual(intAsSuit(3), Suit.spades)  # [assert]


def htmlForGame(game: Game) -> String:  # [function]
  html = "<div class='game'>" # [variable definition]
  html = html + htmlForPlayer(game.dealer) # [assign variable]
  for player in game.players:  # [each loop]
    html = html + htmlForPlayer(player) # [assign variable]
  html = html + "<div class='message'>{game.message}</div>" # [assign variable]
  return html + "</div>"


def test_htmlForGame() -> None:  # [test]
  c1 = new Card() with rank set to "3", suit set to Suit.clubs, faceDown set to false # [variable definition]
  c2 = new Card() with rank set to "K", suit set to Suit.spades, faceDown set to true # [variable definition]
  p = new HumanPlayer("fred", 10) with cards set to [c1, c2] # [variable definition]
  players = (empty List<of Player>).withAppend(p) # [variable definition]
  g2 = new Game(1) with players set to players # [variable definition]
  assertEqual(htmlForGame(g2), "<div class='game'><div class='player'><div class='details'>Dealer - 1 points </div><div class='hand'></div></div><div class='player'><div class='details'>fred - 10 points - hand total: 0</div><div class='hand'><div class='card black'><div class='u'>3</div><div class='v'>&clubs;</div><div class='a'>&clubs;</div><div class='b'>&clubs;</div><div class='c'>&clubs;</div></div><div class='card reversed'></div></div></div><div class='message'></div></div>")  # [assert]


def htmlForPlayer(player: Player) -> String:  # [function]
  html = "<div class='player'>" # [variable definition]
  html = html + "<div class='details'>{player.name} - {player.points} points {player.getMessage()}</div>" # [assign variable]
  html = html + "<div class='hand'>" # [assign variable]
  for card in player.cards:  # [each loop]
    suit = card.suit # [variable definition]
    rank = card.rank # [variable definition]
    html = html + htmlForCard(card) # [assign variable]
  return html + "</div></div>"


def test_htmlForPlayer() -> None:  # [test]
  c1 = new Card() with rank set to "3", suit set to Suit.clubs, faceDown set to false # [variable definition]
  c2 = new Card() with rank set to "K", suit set to Suit.spades, faceDown set to true # [variable definition]
  p = new HumanPlayer("charlie", 10) with cards set to [c1, c2] # [variable definition]
  assertEqual(htmlForPlayer(p), "<div class='player'><div class='details'>charlie - 10 points - hand total: 0</div><div class='hand'><div class='card black'><div class='u'>3</div><div class='v'>&clubs;</div><div class='a'>&clubs;</div><div class='b'>&clubs;</div><div class='c'>&clubs;</div></div><div class='card reversed'></div></div></div>")  # [assert]


def htmlForCard(card: Card) -> String:  # [function]
  html = "" # [variable definition]
  if card.faceDown then
    html = "<div class='card reversed'>" # [assign variable]
  else
    rank = card.rank # [variable definition]
    suit = card.suit # [variable definition]
    colour = colours[suit] # [variable definition]
    symbol = symbols[suit] # [variable definition]
    html = "<div class='card {colour}'>" # [assign variable]
    u = htmlForSpot("u", rank) # [variable definition]
    v = htmlForSpot("v", symbol) # [variable definition]
    grid = "" # [variable definition]
    for location in gridByRank[rank]:  # [each loop]
      if location is "royal" then
        grid = grid + htmlForSpot(location, rank) # [assign variable]
      else
        grid = grid + htmlForSpot(location, symbol) # [assign variable]
    html = html + "{u}{v}{grid}" # [assign variable]
  return html + "</div>"


def test_htmlForCard() -> None:  # [test]
  c1 = new Card() with rank set to "3", suit set to Suit.clubs, faceDown set to false # [variable definition]
  assertEqual(htmlForCard(c1), "<div class='card black'><div class='u'>3</div><div class='v'>&clubs;</div><div class='a'>&clubs;</div><div class='b'>&clubs;</div><div class='c'>&clubs;</div></div>")  # [assert]
  c2 = new Card() with rank set to "K", suit set to Suit.spades, faceDown set to true # [variable definition]
  assertEqual(htmlForCard(c2), "<div class='card reversed'></div>")  # [assert]


def htmlForSpot(id: String, content: String) -> String:  # [function]
  return "<div class='{id}'>{content}</div>"


def test_htmlForSpot() -> None:  # [test]
  assertEqual(htmlForSpot("c", "&hearts;"), "<div class='c'>&hearts;</div>")  # [assert]
  assertEqual(htmlForSpot("u", "10"), "<div class='u'>10</div>")  # [assert]


class Game
  constructor(dealerStartPoints: Int)
    property.dealer = new Dealer(dealerStartPoints) # [assign variable]
  end constructor

  dealer: Dealer = None # [property]

  players: List<of Player> = None # [property]

  message: String = None # [property]

  procedure newRound()
    property.dealer.newHand() # [call procedure]}
    for player in property.players:  # [each loop]
      player.newHand() # [call procedure]}

  procedure updatePoints()
    for player in property.players:  # [each loop]
      playerOutcome = determinePlayerOutcome(property.dealer, player) # [variable definition]
      global.updatePoints(property.dealer, player, playerOutcome) # [call procedure]}

  procedure addPlayer(player: Player)
    property.players.append(player) # [call procedure]}

  procedure setMessage(message: String)
    property.message = message # [assign variable]

end class

class Card
  suit: Suit = None # [property]

  rank: String = None # [property]

  faceDown: Boolean = None # [property]

  procedure turnFaceUp()
    property.faceDown = false # [assign variable]

  procedure turnFaceDown()
    property.faceDown = true # [assign variable]

end class

abstract class Player
  name: String = None # [property]

  points: Int = None # [property]

  cards: List<of Card> = None # [property]

  handTotal: Int = None # [property]

  softAce: Boolean = None # [property]

  status: Status = None # [property]

  hasTurn: Boolean = None # [property]

  procedure startTurn()
    if property.status is Status.active then
      property.hasTurn = true # [assign variable]

  procedure evaluateStatus(newCard: Card)
    if (cardCount() is 2) and (property.handTotal is 21) then
      property.status = Status.blackjack # [assign variable]
    else if (property.handTotal > 21) and (property.softAce) then
      property.handTotal = property.handTotal - 10 # [assign variable]
      property.softAce = false # [assign variable]
    else if property.handTotal > 21 then
      property.status = Status.bust # [assign variable]
    else if property.handTotal is 21 then
      property.status = Status.standing # [assign variable]
    if property.status isnt Status.active then
      property.hasTurn = false # [assign variable]

  procedure stand()
    property.status = Status.standing # [assign variable]
    property.hasTurn = false # [assign variable]

  procedure draw()
    newCard = dealCard(random()) # [variable definition]
    property.cards.append(newCard) # [call procedure]}
    if newCard.rank is "A" then
      addAce() # [call procedure]}
    else
      property.handTotal = property.handTotal + rankValue[newCard.rank] # [assign variable]
    evaluateStatus(newCard) # [call procedure]}

  procedure addAce()
    if property.softAce then
      property.handTotal = property.handTotal + 1 # [assign variable]
    else
      property.handTotal = property.handTotal + 11 # [assign variable]
      property.softAce = true # [assign variable]

  function cardCount() returns Int
    return property.cards.length()
  end function

  procedure changePointsBy(amount: Int)
    property.points = property.points + amount # [assign variable]

  abstract procedure newHand()

  procedure newHandHelper()
    property.hasTurn = false # [assign variable]
    property.softAce = false # [assign variable]
    property.cards = empty List<of Card> # [assign variable]
    property.handTotal = 0 # [assign variable]
    property.status = Status.active # [assign variable]
    draw() # [call procedure]}
    draw() # [call procedure]}

  abstract function getMessage() returns String

  function statusAsString() returns String
    msg = "" # [variable definition]
    status = property.status # [variable definition]
    if property.hasTurn then
      msg = msg + " - PLAYING" # [assign variable]
    else if status is Status.standing then
      msg = msg + " - STANDING" # [assign variable]
    else if status is Status.blackjack then
      msg = msg + " - BLACKJACK" # [assign variable]
    else if status is Status.bust then
      msg = msg + " - BUST" # [assign variable]
    return msg
  end function

  abstract procedure nextAction(dealerFaceCard: Card)

end class

class Dealer inherits Player
  constructor(startingPoints: Int)
    property.name = "Dealer" # [assign variable]
    property.points = startingPoints # [assign variable]
  end constructor

  faceCard: Card = None # [property]

  hasPlayed: Boolean = None # [property]

  procedure play()
    startTurn() # [call procedure]}
    hiddenCard = property.cards[1] # [variable definition]
    hiddenCard.turnFaceUp() # [call procedure]}
    property.hasPlayed = true # [assign variable]

  procedure newHand()
    property.hasPlayed = false # [assign variable]
    newHandHelper() # [call procedure]}
    property.faceCard = property.cards[0] # [assign variable]
    hiddenCard = property.cards[1] # [variable definition]
    hiddenCard.turnFaceDown() # [call procedure]}

  procedure nextAction(faceCard: Card)
    if property.handTotal < 17 then
      draw() # [call procedure]}
    else
      stand() # [call procedure]}

  function getMessage() returns String
    msg = "" # [variable definition]
    if property.hasPlayed then
      msg = statusAsString() + " - hand total: {property.handTotal}" # [assign variable]
    return msg
  end function

end class

class HumanPlayer inherits Player
  constructor(name: String, startingPoints: Int)
    property.name = name # [assign variable]
    property.points = startingPoints # [assign variable]
  end constructor

  procedure newHand()
    newHandHelper() # [call procedure]}

  procedure nextAction(dealerFaceCard: Card)
    key = "" # [variable definition]
    clearKeyBuffer() # [call procedure]}
    while key is ""
      key = waitForKey() # [assign variable]
      if key is "d" then
        draw() # [call procedure]}
      else if key is "s" then
        stand() # [call procedure]}
      else
        key = "" # [assign variable]

  function getMessage() returns String
    msg = statusAsString() + "- hand total: {property.handTotal}" # [variable definition]
    if property.hasTurn then
      msg = msg + " - press 'd' to draw, 's' to stand" # [assign variable]
    return msg
  end function

end class

Action = Enum ('Action', 'stand, draw'})

Outcome = Enum ('Outcome', 'undecided, lose, draw, win, winDouble'})

Status = Enum ('Status', 'active, standing, blackjack, bust'})

Suit = Enum ('Suit', 'clubs, diamonds, hearts, spades'})

symbols = {Suit.clubs:"&clubs;", Suit.diamonds:"&diams;", Suit.hearts:"&hearts;", Suit.spades:"&spades;"}

rankValue = {"2":2, "3":3, "4":4, "5":5, "6":6, "7":7, "8":8, "9":9, "10":10, "J":10, "Q":10, "K":10, "A":11}

gridByRank = {"A":{"royal"}, "2":{"b", "c"}, "3":{"a", "b", "c"}, "4":{"d", "e", "f", "g"}, "5":{"a", "d", "e", "f", "g"}, "6":{"d", "e", "f", "g", "h", "i"}, "7":{"d", "e", "f", "g", "h", "i", "l"}, "8":{"d", "e", "f", "g", "h", "i", "l", "m"}, "9":{"a", "d", "e", "f", "g", "n", "o", "p", "r"}, "10":{"d", "e", "f", "g", "n", "o", "p", "r", "s", "t"}, "J":{"royal"}, "Q":{"royal"}, "K":{"royal"}}

colours = {Suit.clubs:"black", Suit.diamonds:"red", Suit.hearts:"red", Suit.spades:"black"}

styleSheet = ':root {\n    background-color: darkgreen;\n    padding-left: 5px;\n}\n\n.game {\n    padding: 5px;\n}\n\n.message, .details  {\n    color: white;\n    font-family: Arial, Helvetica, sans-serif;\n}\n\n.hand {\n        margin-top: 5px;\n        height: 150px;\n        padding-bottom: 10px;\n    }\n    \n.card {\n    position: relative;\n    float: left;\n    background-color: white;\n    width: 95px;\n    height:140px;\n    margin-right:10px;\n    padding: 5px;\n    border-radius: 5px;\n    font-family: Helvetica, sans-serif; \n}\n.royal,.a,.b,.c,.d,.e,.f,.g,.h,.i,.j,.k,.l,.m,.n,.o,.p,.q,.r,.s,.t,.u,.v,.w,.x,.y,.z {position: absolute; text-align:center;}\n\n/* Standard spots */ \n    .a,.b,.c,.d,.e,.f,.g,.h,.i,.l,.m,.n,.o,.p,.r,.s,.t  {font-size:  30px;}\n\n    /* columns */\n    .d,.n,.h,.p,.f {left: 18px }\n    .a,.b,.c,.l,.m,.s,.t {left: 43px;}\n    .e,.o,.i,.r,.g {left: 68px}\n\n    /* rows */\n    .d,.b,.e {top: 0px}\n    .s {top: 20px;}\n    .l {top: 28px;}\n    .n,.o {top: 37px;}\n    .h,.a,.i {top: 57px}\n    .p,.r {top: 75px;}\n    .m {top: 86px;}\n    .t {top: 93px;}\n    .f,.c,.g {top: 114px;}\n\n/* royals */\n    .royal {\n        position: absolute;\n        z-index: 1;\n        width: 95px;\n        height: 140px;\n        line-height: 140px;\n        font-size: 100px;\n    }\n\n/* corner summary */\n    .u {font-size: 15px; width: 15px; text-align: center; left: 0px; top: 2px;}\n    .v {font-size: 20px; width: 15px; text-align: center; left: 0px; top: 12px;}\n\n/* suit colors */\n    .red {color: red}\n    .black {color: black}\n\n/* back */\n    .card.reversed { background-color: rgba(0, 0, 255, 0.607);}'
