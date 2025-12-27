# 3d93a391d8907bcd62a28e455c587fdcf9565f026cbcae1c1e674b9cbd0fd5ac Elan 1.9.0 guest default_profile valid

def main -> None:  # [main]
  points = 1000 # [variable definition]
  rounds = 10000 # [variable definition]
  game = new Game(points) # [variable definition]
  game.addPlayer(new AutomatedPlayer("Player A", strategyA, points)) # [call procedure]}
  game.addPlayer(new AutomatedPlayer("Player B", strategyB, points)) # [call procedure]}
  while rounds > 0
    playOneRound(game) # [call procedure]}
    clearKeyBuffer() # [call procedure]}
    rounds = rounds - 1 # [assign variable]
  display(game) # [call procedure]}


def playOneRound(game: Game) -> None:  # [procedure]
  game.newRound() # [call procedure]}
  [ghosted] display(game) # [call procedure]}
  dealer = game.dealer # [variable definition]
  for player in game.players:  # [each loop]
    player.startTurn() # [call procedure]}
    [ghosted] display(game) # [call procedure]}
    while player.status is Status.active
      player.nextAction(dealer.faceCard) # [call procedure]}
      [ghosted] display(game) # [call procedure]}
  dealer.play() # [call procedure]}
  [ghosted] display(game) # [call procedure]}
  while dealer.status is Status.active
    dealer.nextAction(dealer.faceCard) # [call procedure]}
    [ghosted] display(game) # [call procedure]}
  game.updatePoints() # [call procedure]}


def display(game: Game) -> None:  # [procedure]
  html = "<style>{styleSheet}</style>{htmlForGame(game)}" # [variable definition]
  displayHtml(html) # [call procedure]}
  pause(1500) # [call procedure]}


def strategyA(p: Player, dealerFaceUp: Card) -> Action:  # [function]
  act = Action.stand # [variable definition]
  return act


def strategyB(p: Player, dealerFaceUp: Card) -> Action:  # [function]
  act = Action.stand # [variable definition]
  if p.handTotal < 17 then
    act = Action.draw # [assign variable]
  return act


[imported] def updatePoints(dealer: Dealer, player: Player, playerOutcome: Outcome) -> None:  # [procedure]
  if playerOutcome is Outcome.winDouble then
    player.changePointsBy(2) # [call procedure]}
    dealer.changePointsBy(-2) # [call procedure]}
  else if playerOutcome is Outcome.win then
    player.changePointsBy(1) # [call procedure]}
    dealer.changePointsBy(-1) # [call procedure]}
  else if playerOutcome is Outcome.lose then
    player.changePointsBy(-1) # [call procedure]}
    dealer.changePointsBy(1) # [call procedure]}


[imported] def determinePlayerOutcome(dealer: Dealer, player: Player) -> Outcome:  # [function]
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


[imported] def dealCard(random: Float) -> Card:  # [function]
  number = (random*52).floor() # [variable definition]
  rank = rankValue.keys()[number div 4] # [variable definition]
  suit = intAsSuit(number mod 4) # [variable definition]
  return new Card(rank, suit)


[imported] def intAsSuit(n: Int) -> Suit:  # [function]
  suit = Suit.clubs # [variable definition]
  if n is 1 then
    suit = Suit.diamonds # [assign variable]
  else if n is 2 then
    suit = Suit.hearts # [assign variable]
  else if n is 3 then
    suit = Suit.spades # [assign variable]
  return suit


[imported] def htmlForGame(game: Game) -> String:  # [function]
  html = "<div class='game'>" # [variable definition]
  html = html + htmlForPlayer(game.dealer) # [assign variable]
  for player in game.players:  # [each loop]
    html = html + htmlForPlayer(player) # [assign variable]
  html = html + "<div class='message'>{game.message}</div>" # [assign variable]
  return html + "</div>"


[imported] def htmlForPlayer(player: Player) -> String:  # [function]
  html = "<div class='player'>" # [variable definition]
  html = html + "<div class='details'>{player.name} - {player.points} points {player.getMessage()}</div>" # [assign variable]
  html = html + "<div class='hand'>" # [assign variable]
  for card in player.cards:  # [each loop]
    suit = card.suit # [variable definition]
    rank = card.rank # [variable definition]
    html = html + htmlForCard(card) # [assign variable]
  return html + "</div></div>"


[imported] def htmlForCard(card: Card) -> String:  # [function]
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


[imported] def htmlForSpot(id: String, content: String) -> String:  # [function]
  return "<div class='{id}'>{content}</div>"


[imported] class Game
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

[imported] class Card
  constructor(rank: String, suit: Suit)
    property.rank = rank # [assign variable]
    property.suit = suit # [assign variable]
    property.value = rankValue[rank] # [assign variable]
  end constructor

  suit: Suit = None # [property]

  rank: String = None # [property]

  value: Int = None # [property]

  faceDown: Boolean = None # [property]

  procedure turnFaceUp()
    property.faceDown = false # [assign variable]

  procedure turnFaceDown()
    property.faceDown = true # [assign variable]

end class

[imported] abstract class Player
  name: String = None # [property]

  points: Int = None # [property]

  cards: List<of Card> = None # [property]

  handTotal: Int = None # [property]

  hasSoftAce: Boolean = None # [property]

  status: Status = None # [property]

  hasTurn: Boolean = None # [property]

  procedure startTurn()
    if property.status is Status.active then
      property.hasTurn = true # [assign variable]

  procedure evaluateStatus(newCard: Card)
    if (cardCount() is 2) and (property.handTotal is 21) then
      property.status = Status.blackjack # [assign variable]
    else if (property.handTotal > 21) and (property.hasSoftAce) then
      property.handTotal = property.handTotal - 10 # [assign variable]
      property.hasSoftAce = false # [assign variable]
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
      property.handTotal = property.handTotal + newCard.value # [assign variable]
    evaluateStatus(newCard) # [call procedure]}

  procedure addAce()
    if property.hasSoftAce then
      property.handTotal = property.handTotal + 1 # [assign variable]
    else
      property.handTotal = property.handTotal + 11 # [assign variable]
      property.hasSoftAce = true # [assign variable]

  function cardCount() returns Int
    return property.cards.length()
  end function

  procedure changePointsBy(amount: Int)
    property.points = property.points + amount # [assign variable]

  abstract procedure newHand()

  procedure newHandHelper()
    property.hasTurn = false # [assign variable]
    property.hasSoftAce = false # [assign variable]
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

[imported] class Dealer inherits Player
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

[imported] class HumanPlayer inherits Player
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

[imported] class AutomatedPlayer inherits Player
  constructor(name: String, decisionFunc: Func<of Player, Card => Action>, startingPoints: Int)
    property.name = name # [assign variable]
    property.decisionFunc = decisionFunc # [assign variable]
    property.points = startingPoints # [assign variable]
  end constructor

  decisionFunc: Func<of Player, Card => Action> = None # [property]

  procedure newHand()
    newHandHelper() # [call procedure]}

  procedure nextAction(dealerFaceCard: Card)
    act = decisionFunc(this, dealerFaceCard) # [variable definition]
    if act is Action.draw then
      draw() # [call procedure]}
    else
      stand() # [call procedure]}

  function getMessage() returns String
    return statusAsString() + " - hand total: {property.handTotal}"
  end function

end class

Action = Enum ('Action', 'stand, draw'})

Outcome = Enum ('Outcome', 'undecided, lose, draw, win, winDouble'})

Status = Enum ('Status', 'active, standing, blackjack, bust'})

Suit = Enum ('Suit', 'clubs, diamonds, hearts, spades'})

[imported] symbols = {Suit.clubs:"&clubs;", Suit.diamonds:"&diams;", Suit.hearts:"&hearts;", Suit.spades:"&spades;"}

[imported] rankValue = {"2":2, "3":3, "4":4, "5":5, "6":6, "7":7, "8":8, "9":9, "10":10, "J":10, "Q":10, "K":10, "A":11}

[imported] gridByRank = {"A":{"royal"}, "2":{"b", "c"}, "3":{"a", "b", "c"}, "4":{"d", "e", "f", "g"}, "5":{"a", "d", "e", "f", "g"}, "6":{"d", "e", "f", "g", "h", "i"}, "7":{"d", "e", "f", "g", "h", "i", "l"}, "8":{"d", "e", "f", "g", "h", "i", "l", "m"}, "9":{"a", "d", "e", "f", "g", "n", "o", "p", "r"}, "10":{"d", "e", "f", "g", "n", "o", "p", "r", "s", "t"}, "J":{"royal"}, "Q":{"royal"}, "K":{"royal"}}

[imported] colours = {Suit.clubs:"black", Suit.diamonds:"red", Suit.hearts:"red", Suit.spades:"black"}

[imported] styleSheet = ':root {\n    background-color: darkgreen;\n    padding-left: 5px;\n}\n\n.game {\n    padding: 5px;\n}\n\n.message, .details  {\n    color: white;\n    font-family: Arial, Helvetica, sans-serif;\n}\n\n.hand {\n        margin-top: 5px;\n        height: 150px;\n        padding-bottom: 10px;\n    }\n    \n.card {\n    position: relative;\n    float: left;\n    background-color: white;\n    width: 95px;\n    height:140px;\n    margin-right:10px;\n    padding: 5px;\n    border-radius: 5px;\n    font-family: Helvetica, sans-serif; \n}\n.royal,.a,.b,.c,.d,.e,.f,.g,.h,.i,.j,.k,.l,.m,.n,.o,.p,.q,.r,.s,.t,.u,.v,.w,.x,.y,.z {position: absolute; text-align:center;}\n\n/* Standard spots */ \n    .a,.b,.c,.d,.e,.f,.g,.h,.i,.l,.m,.n,.o,.p,.r,.s,.t  {font-size:  30px;}\n\n    /* columns */\n    .d,.n,.h,.p,.f {left: 18px }\n    .a,.b,.c,.l,.m,.s,.t {left: 43px;}\n    .e,.o,.i,.r,.g {left: 68px}\n\n    /* rows */\n    .d,.b,.e {top: 0px}\n    .s {top: 20px;}\n    .l {top: 28px;}\n    .n,.o {top: 37px;}\n    .h,.a,.i {top: 57px}\n    .p,.r {top: 75px;}\n    .m {top: 86px;}\n    .t {top: 93px;}\n    .f,.c,.g {top: 114px;}\n\n/* royals */\n    .royal {\n        position: absolute;\n        z-index: 1;\n        width: 95px;\n        height: 140px;\n        line-height: 140px;\n        font-size: 100px;\n    }\n\n/* corner summary */\n    .u {font-size: 15px; width: 15px; text-align: center; left: 0px; top: 2px;}\n    .v {font-size: 20px; width: 15px; text-align: center; left: 0px; top: 12px;}\n\n/* suit colors */\n    .red {color: red}\n    .black {color: black}\n\n/* back */\n    .card.reversed { background-color: rgba(0, 0, 255, 0.607);}'
