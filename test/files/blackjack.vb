' VB.NET with Elan 2.0.0-beta1

Sub main()
  Dim game = New Game(1000) ' variable definition
  game.addPlayer(New HumanPlayer("Player A", 1000)) ' call procedure
  Dim anotherRound = True ' variable definition
  While anotherRound
    playOneRound(game) ' call procedure
    game.setMessage("Points updated. Do you want to play another round? (press y or n)") ' call procedure
    clearKeyBuffer() ' call procedure
    display(game) ' call procedure
    Dim k = waitForKey().lowerCase() ' variable definition
    If k.equals("y") Then
      game.setMessage("") ' call procedure
    Else
      anotherRound = False ' assignment
    End If
  End While
End Sub

Sub playOneRound(game As Game) ' procedure
  game.newRound() ' call procedure
  display(game) ' call procedure
  Dim dealer = game.dealer ' variable definition
  Dim faceCard = dealer.faceCard ' variable definition
  For Each player In game.players
    player.startTurn() ' call procedure
    display(game) ' call procedure
    While player.status = Status.active
      player.nextAction(faceCard) ' call procedure
      display(game) ' call procedure
    End While
  Next player
  dealer.play() ' call procedure
  display(game) ' call procedure
  While dealer.status = Status.active
    dealer.nextAction(faceCard) ' call procedure
    display(game) ' call procedure
  End While
  game.updatePoints() ' call procedure
End Sub

Sub display(game As Game) ' procedure
  Dim html = $"<style>{styleSheet}</style>{htmlForGame(game)}" ' variable definition
  displayHtml(html) ' call procedure
  sleep(1.5) ' call procedure
End Sub

Function determinePlayerOutcome(dealer As Dealer, player As Player) As Outcome
  Dim d = dealer.status ' variable definition
  Dim dTotal = dealer.handTotal ' variable definition
  Dim p = player.status ' variable definition
  Dim pTotal = player.handTotal ' variable definition
  Dim bust = Status.bust ' variable definition
  Dim bj = Status.blackjack ' variable definition
  Dim win = Outcome.win ' variable definition
  Dim winDouble = Outcome.winDouble ' variable definition
  Dim lose = Outcome.lose ' variable definition
  Dim draw = Outcome.draw ' variable definition
  Dim playerOutcome = draw ' variable definition
  If p = bust Then
    playerOutcome = lose ' assignment
  ElseIf (p = bj) And (d <> bj) Then
    playerOutcome = winDouble ' assignment
  ElseIf d = bust Then
    playerOutcome = win ' assignment
  ElseIf (d = bj) And (p = bj) Then
    playerOutcome = draw ' assignment
  ElseIf p = bj Then
    playerOutcome = winDouble ' assignment
  ElseIf d = bj Then
    playerOutcome = lose ' assignment
  ElseIf pTotal > dTotal Then
    playerOutcome = win ' assignment
  ElseIf pTotal < dTotal Then
    playerOutcome = lose ' assignment
  Else
    ' strictly, this 'else' clause is redundant - as the variable was initialised to 'draw' - but added for clarity
    playerOutcome = draw ' assignment
  End If
  Return playerOutcome
End Function

<TestClass Class Test_determinePlayerOutcome
 <TestMethod> Sub test_determinePlayerOutcome()
  Dim dbj = (New Dealer(0)).withStatus(Status.blackjack) ' let
  Assert.AreEqual(Status.blackjack, dbj.status)
  Dim d21 = (New Dealer(0)).withStatus(Status.standing).withHandTotal(21) ' let
  Assert.AreEqual(Status.standing, d21.status)
  Assert.AreEqual(21, d21.handTotal)
  Dim d17 = (New Dealer(0)).withStatus(Status.standing).withHandTotal(17) ' let
  Dim dbu = (New Dealer(0)).withStatus(Status.bust) ' let
  Dim pbj = (New HumanPlayer("", 0)).withStatus(Status.blackjack) ' let
  Assert.AreEqual(Status.blackjack, pbj.status)
  Dim p21 = (New HumanPlayer("", 0)).withStatus(Status.standing).withHandTotal(21) ' let
  Dim p17 = (New HumanPlayer("", 0)).withStatus(Status.standing).withHandTotal(17) ' let
  Dim pbu = (New HumanPlayer("", 0)).withStatus(Status.bust) ' let
  Assert.AreEqual(Outcome.draw, determinePlayerOutcome(dbj, pbj))
  Assert.AreEqual(Outcome.lose, determinePlayerOutcome(dbj, p21))
  Assert.AreEqual(Outcome.lose, determinePlayerOutcome(dbj, pbu))
  Assert.AreEqual(Outcome.winDouble, determinePlayerOutcome(d21, pbj))
  Assert.AreEqual(Outcome.draw, determinePlayerOutcome(d21, p21))
  Assert.AreEqual(Outcome.lose, determinePlayerOutcome(d21, p17))
  Assert.AreEqual(Outcome.lose, determinePlayerOutcome(d21, pbu))
  Assert.AreEqual(Outcome.winDouble, determinePlayerOutcome(dbu, pbj))
  Assert.AreEqual(Outcome.win, determinePlayerOutcome(dbu, p17))
  Assert.AreEqual(Outcome.lose, determinePlayerOutcome(dbu, pbu))
 End Sub
End Class


Function dealCard(random As Double) As Card
  Dim number = (random*52).floor() ' variable definition
  Dim rank = ranks()(divAsInt(number, 4)) ' variable definition
  Dim suit = number Mod 4 ' variable definition
  Return New Card(rank, intAsSuit(suit), False)
End Function

<TestClass Class Test_dealCard
 <TestMethod> Sub test_dealCard()
  Dim c1 = dealCard(0) ' let
  Assert.AreEqual("2", c1.rank)
  Assert.AreEqual(Suit.clubs, c1.suit)
  Dim c2 = dealCard(0.9999999) ' let
  Assert.AreEqual("A", c2.rank)
  Assert.AreEqual(Suit.spades, c2.suit)
  Dim c3 = dealCard(0.5) ' let
  Assert.AreEqual("8", c3.rank)
  Assert.AreEqual(Suit.hearts, c3.suit)
  Dim c4 = dealCard(0.24) ' let
  Assert.AreEqual("5", c4.rank)
  Assert.AreEqual(Suit.clubs, c4.suit)
 End Sub
End Class


Function intAsSuit(n As Integer) As Suit
  Dim suit = Suit.clubs ' variable definition
  If n = 1 Then
    suit = Suit.diamonds ' assignment
  ElseIf n = 2 Then
    suit = Suit.hearts ' assignment
  ElseIf n = 3 Then
    suit = Suit.spades ' assignment
  End If
  Return suit
End Function

<TestClass Class Test_intAsSuit
 <TestMethod> Sub test_intAsSuit()
  Assert.AreEqual(Suit.clubs, intAsSuit(0))
  Assert.AreEqual(Suit.diamonds, intAsSuit(1))
  Assert.AreEqual(Suit.hearts, intAsSuit(2))
  Assert.AreEqual(Suit.spades, intAsSuit(3))
 End Sub
End Class


Function htmlForGame(game As Game) As String
  Dim html = "<div class='game'>" ' variable definition
  html = html + htmlForPlayer(game.dealer) ' assignment
  For Each player In game.players
    html = html + htmlForPlayer(player) ' assignment
  Next player
  html = html + $"<div class='message'>{game.message}</div>" ' assignment
  Return html + "</div>"
End Function

<TestClass Class Test_htmlForGame
 <TestMethod> Sub test_htmlForGame()
  Dim c1 = New Card("3", Suit.clubs, False) ' let
  Dim c2 = New Card("K", Suit.spades, True) ' let
  Dim p = (New HumanPlayer("fred", 10)).withCards({c1, c2}) ' let
  Dim players = (New List(Of Player)()).withAppend(p) ' let
  Dim g2 = (New Game(1)).withPlayers(players) ' let
  Assert.AreEqual("<div class='game'><div class='player'><div class='details'>Dealer - 1 points </div><div class='hand'></div></div><div class='player'><div class='details'>fred - 10 points - hand total: 0</div><div class='hand'><div class='card black'><div class='u'>3</div><div class='v'>&clubs;</div><div class='a'>&clubs;</div><div class='b'>&clubs;</div><div class='c'>&clubs;</div></div><div class='card reversed'></div></div></div><div class='message'></div></div>", htmlForGame(g2))
 End Sub
End Class


Function htmlForPlayer(player As Player) As String
  Dim html = "<div class='player'>" ' variable definition
  html = html + $"<div class='details'>{player.name} - {player.points} points {player.getMessage()}</div>" ' assignment
  html = html + "<div class='hand'>" ' assignment
  For Each card In player.cards
    Dim suit = card.suit ' variable definition
    Dim rank = card.rank ' variable definition
    html = html + htmlForCard(card) ' assignment
  Next card
  Return html + "</div></div>"
End Function

<TestClass Class Test_htmlForPlayer
 <TestMethod> Sub test_htmlForPlayer()
  Dim c1 = New Card("3", Suit.clubs, False) ' let
  Dim c2 = New Card("K", Suit.spades, True) ' let
  Dim p = (New HumanPlayer("charlie", 10)).withCards({c1, c2}) ' let
  Assert.AreEqual("<div class='player'><div class='details'>charlie - 10 points - hand total: 0</div><div class='hand'><div class='card black'><div class='u'>3</div><div class='v'>&clubs;</div><div class='a'>&clubs;</div><div class='b'>&clubs;</div><div class='c'>&clubs;</div></div><div class='card reversed'></div></div></div>", htmlForPlayer(p))
 End Sub
End Class


Function htmlForCard(card As Card) As String
  Dim html = "" ' variable definition
  If card.faceDown Then
    html = "<div class='card reversed'>" ' assignment
  Else
    Dim rank = card.rank ' variable definition
    Dim suit = card.suit ' variable definition
    Dim colour = colourForSuit(suit) ' variable definition
    Dim symbol = symbolForSuit(suit) ' variable definition
    html = $"<div class='card {colour}'>" ' assignment
    Dim u = htmlForSpot("u", rank) ' variable definition
    Dim v = htmlForSpot("v", symbol) ' variable definition
    Dim grid = "" ' variable definition
    For Each location In gridForRank(rank)
      If location.equals("royal") Then
        grid = grid + htmlForSpot(location, rank) ' assignment
      Else
        grid = grid + htmlForSpot(location, symbol) ' assignment
      End If
    Next location
    html = html + $"{u}{v}{grid}" ' assignment
  End If
  Return html + "</div>"
End Function

<TestClass Class Test_htmlForCard
 <TestMethod> Sub test_htmlForCard()
  Dim c1 = New Card("3", Suit.clubs, False) ' variable definition
  Assert.AreEqual("<div class='card black'><div class='u'>3</div><div class='v'>&clubs;</div><div class='a'>&clubs;</div><div class='b'>&clubs;</div><div class='c'>&clubs;</div></div>", htmlForCard(c1))
  Dim c2 = New Card("K", Suit.spades, True) ' variable definition
  Assert.AreEqual("<div class='card reversed'></div>", htmlForCard(c2))
 End Sub
End Class


Function htmlForSpot(id As String, content As String) As String
  Return $"<div class='{id}'>{content}</div>"
End Function

<TestClass Class Test_htmlForSpot
 <TestMethod> Sub test_htmlForSpot()
  Assert.AreEqual("<div class='c'>&hearts;</div>", htmlForSpot("c", "&hearts;"))
  Assert.AreEqual("<div class='u'>10</div>", htmlForSpot("u", "10"))
 End Sub
End Class


Class Game

  Sub New(dealerStartPoints As Integer)
    Me.dealer = New Dealer(dealerStartPoints) ' assignment
    Me.players = New List(Of Player)() ' assignment
    Me.message = "" ' assignment
  End Sub

  Property dealer As Dealer

  Property players As List(Of Player)

  Property message As String

  Function withPlayers(p As List(Of Player)) As Game
    Dim copyOfThis = copy(Me) ' let
    copyOfThis.players = p ' assignment
    Return copyOfThis
  End Function

  Sub newRound() ' procedure method
    Dim dealer = Me.dealer ' variable definition
    dealer.newHand() ' call procedure
    For Each player In Me.players
      player.newHand() ' call procedure
    Next player
  End Sub

  Sub updatePoints() ' procedure method
    For Each player In Me.players
      player.determineOutcomeAndUpdatePoints(Me.dealer) ' call procedure
    Next player
  End Sub

  Sub addPlayer(player As Player) ' procedure method
    Dim players = Me.players ' variable definition
    players.append(player) ' call procedure
  End Sub

  Sub setMessage(message As String) ' procedure method
    Me.message = message ' assignment
  End Sub

  Function toString() As String
    Return "a Game"
  End Function

End Class

Class Card

  Property suit As Suit

  Property rank As String

  Property faceDown As Boolean

  Sub New(rank As String, suit As Suit, facedown As Boolean)
    Me.rank = rank ' assignment
    Me.suit = suit ' assignment
    Me.faceDown = facedown ' assignment
  End Sub

  Sub turnFaceUp() ' procedure method
    Me.faceDown = False ' assignment
  End Sub

  Sub turnFaceDown() ' procedure method
    Me.faceDown = True ' assignment
  End Sub

  Function toString() As String
    Return $"{Me.rank}{symbolForSuit(Me.suit)}"
  End Function

End Class

MustInherit Class Player

  Property name As String

  Property points As Integer

  Property cards As List(Of Card)

  Property handTotal As Integer

  Property softAce As Boolean

  Property status As Status

  Property hasTurn As Boolean

  Sub startTurn() ' procedure method
    If Me.status = Status.active Then
      Me.hasTurn = True ' assignment
    End If
  End Sub

  Sub determineOutcomeAndUpdatePoints(dealer As Dealer) ' procedure method
    Dim playerOutcome = determinePlayerOutcome(dealer, Me) ' variable definition
    If playerOutcome = Outcome.winDouble Then
      Me.changePointsBy(2) ' call procedure
      dealer.changePointsBy(-2) ' call procedure
    ElseIf playerOutcome = Outcome.win Then
      Me.changePointsBy(1) ' call procedure
      dealer.changePointsBy(-1) ' call procedure
    ElseIf playerOutcome = Outcome.lose Then
      Me.changePointsBy(-1) ' call procedure
      dealer.changePointsBy(1) ' call procedure
    End If
  End Sub

  Sub evaluateStatus(newCard As Card) ' procedure method
    If (Me.cardCount() = 2) And (Me.handTotal = 21) Then
      Me.status = Status.blackjack ' assignment
    ElseIf (Me.handTotal > 21) And (Me.softAce) Then
      Me.handTotal = Me.handTotal - 10 ' assignment
      Me.softAce = False ' assignment
    ElseIf Me.handTotal > 21 Then
      Me.status = Status.bust ' assignment
    ElseIf Me.handTotal = 21 Then
      Me.status = Status.standing ' assignment
    End If
    If Me.status <> Status.active Then
      Me.hasTurn = False ' assignment
    End If
  End Sub

  Sub stand() ' procedure method
    Me.status = Status.standing ' assignment
    Me.hasTurn = False ' assignment
  End Sub

  Sub draw() ' procedure method
    Dim newCard = dealCard(random()) ' variable definition
    Dim cards = Me.cards ' variable definition
    cards.append(newCard) ' call procedure
    If newCard.rank.equals("A") Then
      Me.addAce() ' call procedure
    Else
      Me.handTotal = Me.handTotal + valueForRank(newCard.rank) ' assignment
    End If
    Me.evaluateStatus(newCard) ' call procedure
  End Sub

  Sub addAce() ' procedure method
    If Me.softAce Then
      Me.handTotal = Me.handTotal + 1 ' assignment
    Else
      Me.handTotal = Me.handTotal + 11 ' assignment
      Me.softAce = True ' assignment
    End If
  End Sub

  Function cardCount() As Integer
    Return Me.cards.length()
  End Function

  Sub changePointsBy(amount As Integer) ' procedure method
    Me.points = Me.points + amount ' assignment
  End Sub

  MustOverride Sub newHand()

  Protected Sub newHandHelper() ' private procedure method
    Me.hasTurn = False ' assignment
    Me.softAce = False ' assignment
    Me.cards = New List(Of Card)() ' assignment
    Me.handTotal = 0 ' assignment
    Me.status = Status.active ' assignment
    Me.draw() ' call procedure
    Me.draw() ' call procedure
  End Sub

  MustOverride Function getMessage() As String

  Protected Function getMessageHelper() As String
    Dim msg = "" ' variable definition
    Dim status = Me.status ' variable definition
    If Me.hasTurn Then
      msg = msg + " - PLAYING" ' assignment
    ElseIf status = Status.standing Then
      msg = msg + " - STANDING" ' assignment
    ElseIf status = Status.blackjack Then
      msg = msg + " - BLACKJACK" ' assignment
    ElseIf status = Status.bust Then
      msg = msg + " - BUST" ' assignment
    End If
    Return msg
  End Function

  MustOverride Sub nextAction(dealerFaceCard As Card)

End Class

Class Dealer
  Inherits Player


  Sub New(startingPoints As Integer)
    Me.name = "Dealer" ' assignment
    Me.points = startingPoints ' assignment
    Me.cards = New List(Of Card)() ' assignment
    Me.faceCard = New Card("2", Suit.clubs, True) ' assignment
  End Sub

  Property faceCard As Card

  Property hasPlayed As Boolean

  Function withStatus(status As Status) As Dealer
    Dim copyOfThis = copy(Me) ' let
    copyOfThis.status = status ' assignment
    Return copyOfThis
  End Function

  Function withHandTotal(ht As Integer) As Dealer
    Dim copyOfThis = copy(Me) ' let
    copyOfThis.handTotal = ht ' assignment
    Return copyOfThis
  End Function

  Sub play() ' procedure method
    Me.startTurn() ' call procedure
    Dim hiddenCard = Me.cards(1) ' variable definition
    hiddenCard.turnFaceUp() ' call procedure
    Me.hasPlayed = True ' assignment
  End Sub

  Overrides Sub newHand() ' procedure method
    Me.hasPlayed = False ' assignment
    Me.newHandHelper() ' call procedure
    Me.faceCard = Me.cards(0) ' assignment
    Dim hiddenCard = Me.cards(1) ' variable definition
    hiddenCard.turnFaceDown() ' call procedure
  End Sub

  Overrides Sub nextAction(faceCard As Card) ' procedure method
    If Me.handTotal < 17 Then
      Me.draw() ' call procedure
    Else
      Me.stand() ' call procedure
    End If
  End Sub

  Overrides Function getMessage() As String
    Dim msg = "" ' variable definition
    If Me.hasPlayed Then
      msg = Me.getMessageHelper() + $" - hand total: {Me.handTotal}" ' assignment
    End If
    Return msg
  End Function

  Function toString() As String
    Return "the Dealer"
  End Function

End Class

Class HumanPlayer
  Inherits Player


  Sub New(name As String, startingPoints As Integer)
    Me.name = name ' assignment
    Me.points = startingPoints ' assignment
    Me.cards = New List(Of Card)() ' assignment
  End Sub

  Function withStatus(status As Status) As HumanPlayer
    Dim copyOfThis = copy(Me) ' let
    copyOfThis.status = status ' assignment
    Return copyOfThis
  End Function

  Function withHandTotal(ht As Integer) As HumanPlayer
    Dim copyOfThis = copy(Me) ' let
    copyOfThis.handTotal = ht ' assignment
    Return copyOfThis
  End Function

  Function withCards(c As List(Of Card)) As HumanPlayer
    Dim copyOfThis = copy(Me) ' let
    copyOfThis.cards = c ' assignment
    Return copyOfThis
  End Function

  Overrides Sub newHand() ' procedure method
    Me.newHandHelper() ' call procedure
  End Sub

  Overrides Sub nextAction(dealerFaceCard As Card) ' procedure method
    Dim key = "" ' variable definition
    clearKeyBuffer() ' call procedure
    While key.equals("")
      key = waitForKey() ' assignment
      If key.equals("d") Then
        Me.draw() ' call procedure
      ElseIf key.equals("s") Then
        Me.stand() ' call procedure
      Else
        key = "" ' assignment
      End If
    End While
  End Sub

  Overrides Function getMessage() As String
    Dim msg = Me.getMessageHelper() + $"- hand total: {Me.handTotal}" ' variable definition
    If Me.hasTurn Then
      msg = msg + " - press 'd' to draw, 's' to stand" ' assignment
    End If
    Return msg
  End Function

  Function toString() As String
    Return $"Player: {Me.name}"
  End Function

End Class

Enum Choice 
  stand = 0
  draw = 1
End Enum

Enum Outcome 
  undecided = 0
  lose = 1
  draw = 2
  win = 3
  winDouble = 4
End Enum

Enum Status 
  active = 0
  standing = 1
  blackjack = 2
  bust = 3
End Enum

Enum Suit 
  clubs = 0
  diamonds = 1
  hearts = 2
  spades = 3
End Enum

Function symbolForSuit(suit As Suit) As String
  Dim suits = {Suit.clubs, Suit.diamonds, Suit.hearts, Suit.spades} ' variable definition
  Dim symbols = {"&clubs;", "&diams;", "&hearts;", "&spades;"} ' variable definition
  Return symbols(suits.indexOf(suit))
End Function

Function ranks() As List(Of String)
  Return {"2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"}
End Function

Function valueForRank(rank As String) As Integer
  Dim values = {2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11} ' variable definition
  Return values(ranks().indexOf(rank))
End Function

Function gridForRank(rank As String) As List(Of String)
  Dim grids = {{"b", "c"}, {"a", "b", "c"}, {"d", "e", "f", "g"}, {"a", "d", "e", "f", "g"}, {"d", "e", "f", "g", "h", "i"}, {"d", "e", "f", "g", "h", "i", "l"}, {"d", "e", "f", "g", "h", "i", "l", "m"}, {"a", "d", "e", "f", "g", "n", "o", "p", "r"}, {"d", "e", "f", "g", "n", "o", "p", "r", "s", "t"}, {"royal"}, {"royal"}, {"royal"}, {"royal"}} ' variable definition
  Return grids(ranks().indexOf(rank))
End Function

Function colourForSuit(suit As Suit) As String
  Dim suits = {Suit.clubs, Suit.diamonds, Suit.hearts, Suit.spades} ' variable definition
  Dim colours = {"black", "red", "red", "black"} ' variable definition
  Return colours(suits.indexOf(suit))
End Function

Const styleSheet = ":root {    background-color: darkgreen;    padding-left: 5px;}.game {    padding: 5px;}.message, .details  {    color: white;    font-family: Arial, Helvetica, sans-serif;}.hand {        margin-top: 5px;        height: 150px;        padding-bottom: 10px;    }    .card {    position: relative;    float: left;    background-color: white;    width: 95px;    height:140px;    margin-right:10px;    padding: 5px;    border-radius: 5px;    font-family: Helvetica, sans-serif; }.royal,.a,.b,.c,.d,.e,.f,.g,.h,.i,.j,.k,.l,.m,.n,.o,.p,.q,.r,.s,.t,.u,.v,.w,.x,.y,.z {position: absolute; text-align:center;}/* Standard spots */     .a,.b,.c,.d,.e,.f,.g,.h,.i,.l,.m,.n,.o,.p,.r,.s,.t  {font-size:  30px;}    /* columns */    .d,.n,.h,.p,.f {left: 18px }    .a,.b,.c,.l,.m,.s,.t {left: 43px;}    .e,.o,.i,.r,.g {left: 68px}    /* rows */    .d,.b,.e {top: 0px}    .suit {top: 20px;}    .l {top: 28px;}    .n,.o {top: 37px;}    .h,.a,.i {top: 57px}    .p,.r {top: 75px;}    .m {top: 86px;}    .t {top: 93px;}    .f,.c,.g {top: 114px;}/* royals */    .royal {        position: absolute;        z-index: 1;        width: 95px;        height: 140px;        line-height: 140px;        font-size: 100px;    }/* corner summary */    .u {font-size: 15px; width: 15px; text-align: center; left: 0px; top: 2px;}    .v {font-size: 20px; width: 15px; text-align: center; left: 0px; top: 12px;}/* suit colors */    .red {color: red}    .black {color: black}/* back */    .card.reversed { background-color: rgba(0, 0, 255, 0.607);}"
