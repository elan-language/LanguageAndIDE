# 308474c4d702688959772b5ba7371c76a9e87230e2d61a3bb3d7097d6ebb3b01 Elan 1.9.0 guest default_profile valid

def main -> None:  # [main]
  score = 0 # [variable definition]
  while true
    holes = new Array<of Hole>(10, Hole.vacant) # [variable definition]
    hole = Hole.vacant # [variable definition]
    numberOfMoles = randomInt(1, 3) # [variable definition]
    for count in range(1, numberOfMoles, 1):  # [for loop]
      holeNumber = randomInt(0, 9) # [variable definition]
      holes.put(holeNumber, Hole.mole) # [call procedure]}
    html = htmlForFullGame(holes, score) # [variable definition]
    displayHtml(html) # [call procedure]}
    stop = clock() + 1000 # [variable definition]
    while clock() < stop
      processKey(holes, score) # [call procedure]}


def processKey(holes: Array<of Hole>, score: Int) -> None:  # [procedure]
  n = getNumericKey() # [variable definition]
  if n isnt -1 then
    if holes[n] is Hole.mole then
      holes.put(n, Hole.hit) # [call procedure]}
      score = score + 1 # [assign variable]
    else if holes[n] is Hole.vacant then
      holes.put(n, Hole.miss) # [call procedure]}
      score = score - 1 # [assign variable]
    html = htmlForFullGame(holes, score) # [variable definition]
    displayHtml(html) # [call procedure]}


Hole = Enum ('Hole', 'vacant, mole, hit, miss'})

def htmlForSimpleGame(hole: Hole, score: Int) -> String:  # [function]
  core = htmlForHole(hole, "hole") # [variable definition]
  return "<style>{styleSheet}</style><div class='game'>{core}</div><div class='score'>Score: {score}</score>"


def htmlForFullGame(holes: Array<of Hole>, score: Int) -> String:  # [function]
  core = "" # [variable definition]
  for i in range(0, holes.length() - 1, 1):  # [for loop]
    core = core + htmlForHole(holes[i], i.asString()) # [assign variable]
  return "<style>{styleSheet}</style><div class='game'>{core}</div><div class='score'>Score: {score}</score>"


def htmlForHole(hole: Hole, label: String) -> String:  # [function]
  img = imageForStatus[hole] # [variable definition]
  return "<div class='hole'><img src='{img}'><div class='label'>{label}</div></div>"


# Acknowledgement:  mole icon source https://www.flaticon.com/
vacantImg = "https://elan-lang.org/documentation/worksheets/whack-a-mole/vacant.png"

moleImg = "https://elan-lang.org/documentation/worksheets/whack-a-mole/mole.png"

hitImg = "https://elan-lang.org/documentation/worksheets/whack-a-mole/hit.png"

missImg = "https://elan-lang.org/documentation/worksheets/whack-a-mole/miss.png"

imageForStatus = {Hole.vacant:vacantImg, Hole.mole:moleImg, Hole.hit:hitImg, Hole.miss:missImg}

styleSheet = '\n.game { display: flex; flex-direction: row; }\n.hole { display: flex; flex-direction: column; width: 50px; height: 50px; border: 10px solid white;}\n.label {width: 40px; text-align: center;}\n.hole img {height: 40px; width: 40px}\n.score{ margin-top: 20px;}'
