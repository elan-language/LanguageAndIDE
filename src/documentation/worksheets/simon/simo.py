# 74eab0f65a5c64ec3db98cbcdb6b339bf1e801fb3f48a743d17bb69ad93499d6 Elan 1.9.0 guest default_profile valid

def main -> None:  # [main]
  ok = true # [variable definition]
  interval = 1000 # [variable definition]
  sequence = empty List<of Int> # [variable definition]
  while ok
    simonsTurn(sequence, interval) # [call procedure]}
    clearVectorGraphics() # [call procedure]}
    pause(1000) # [call procedure]}
    playersTurn(sequence, interval, ok) # [call procedure]}
    clearVectorGraphics() # [call procedure]}
  print "Game over. You scored: {sequence.length() - 1}"


def simonsTurn(sequence: List<of Int>, interval: Int) -> None:  # [procedure]
  sequence.append(randomInt(1, 4)) # [call procedure]}
  for move in sequence:  # [each loop]
    displayMove(move, interval) # [call procedure]}


def playersTurn(sequence: List<of Int>, interval: Int, ok: Boolean) -> None:  # [procedure]
  counter = 0 # [variable definition]
  correctSoFar = true # [variable definition]
  while (counter < sequence.length()) and correctSoFar
    k = waitForKey() # [variable definition]
    valid, move = parseAsInt(k) # [variable definition]
    if valid and (sequence[counter] is move) then
      displayMove(move, interval) # [call procedure]}
    else
      correctSoFar = false # [assign variable]
      ok = false # [assign variable]
    counter = counter + 1 # [assign variable]


def displayMove(move: Int, interval: Int) -> None:  # [procedure]
  colours = [red, yellow, blue, green] # [variable definition]
  tones = [164.81, 220, 277.18, 329.63] # [variable definition]
  circle = new CircleVG() with centreX set to move*20 - 5, centreY set to 15, radius set to 10, strokeWidth set to 0, fillColour set to colours[move - 1] # [variable definition]
  displayVectorGraphics([circle]) # [call procedure]}
  tone(interval, tones[move - 1], 0.1) # [call procedure]}
  clearVectorGraphics() # [call procedure]}
  pause(100) # [call procedure]}


