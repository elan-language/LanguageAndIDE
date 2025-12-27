# 827e432e332df36d1017ca4a70eb4f8e5313ddba6630d1a85e7006b8c63db0f9 Elan 1.9.0 guest default_profile valid

maxHits = 10

turquoise = 0x00ced1

liveCell = black

phi = 1.618

gameOver = true

warningMsg = "Limit reached"

fruit = {"apple", "orange", "banana"}

palette = {red, blue, yellow, turquoise}

Suit = Enum ('Suit', 'spades, hearts, diamonds, clubs'})

colours = {Suit.spades:black, Suit.hearts:red, Suit.diamonds:red, Suit.clubs:black}

scrabbleValues = {"A":1, "B":3, "C":3, "D":2, "E":1, "F":4, "G":2, "H":4, "I":1, "J":8, "K":5, "L":1, "M":3, "N":1, "O":1, "P":3, "Q":10, "R":1, "S":1, "T":1, "U":1, "V":4, "W":4, "X":8, "Y":4, "Z":10}

Action = Enum ('Action', 'stand, draw'})

Outcome = Enum ('Outcome', 'undecided, win, lose, draw, winDouble'})

Status = Enum ('Status', 'pending, playing, standing, blackjack, bust'})

def main -> None:  # [main]



