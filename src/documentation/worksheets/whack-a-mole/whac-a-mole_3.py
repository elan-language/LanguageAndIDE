# 5bd169e74553035d7a8f425bb059389297295fe9db24e0dacd5ae00a04ecea66 Elan 1.9.0 guest default_profile valid

def main -> None:  # [main]
  score = 0 # [variable definition]
  while true
    holes = new Array<of Hole>(10, Hole.vacant) # [variable definition]
    hole = Hole.vacant # [variable definition]
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


[imported] Hole = Enum ('Hole', 'vacant, mole, hit, miss'})

[imported] def htmlForSimpleGame(hole: Hole, score: Int) -> String:  # [function]
  core = htmlForHole(hole, "hole") # [variable definition]
  return "<style>{styleSheet}</style><div class='game'>{core}</div><div class='score'>Score: {score}</score>"


[imported] def htmlForFullGame(holes: Array<of Hole>, score: Int) -> String:  # [function]
  core = "" # [variable definition]
  for i in range(0, holes.length() - 1, 1):  # [for loop]
    core = core + htmlForHole(holes[i], i.asString()) # [assign variable]
  return "<style>{styleSheet}</style><div class='game'>{core}</div><div class='score'>Score: {score}</score>"


[imported] def htmlForHole(hole: Hole, label: String) -> String:  # [function]
  img = imageForStatus[hole] # [variable definition]
  return "<div class='hole'><img src='{img}'><div class='label'>{label}</div></div>"


# Acknowledgement:  mole icon source https://www.flaticon.com/
[imported] vacantImg = "https://elan-lang.org/documentation/worksheets/whack-a-mole/vacant.png"

[imported] moleImg = "https://elan-lang.org/documentation/worksheets/whack-a-mole/mole.png"

[imported] hitImg = "https://elan-lang.org/documentation/worksheets/whack-a-mole/hit.png"

[imported] missImg = "https://elan-lang.org/documentation/worksheets/whack-a-mole/miss.png"

[imported] imageForStatus = {Hole.vacant:vacantImg, Hole.mole:moleImg, Hole.hit:hitImg, Hole.miss:missImg}

[imported] styleSheet = '\n.game { display: flex; flex-direction: row; }\n.hole { display: flex; flex-direction: column; width: 50px; height: 50px; border: 10px solid white;}\n.label {width: 40px; text-align: center;}\n.hole img {height: 40px; width: 40px}\n.score{ margin-top: 20px;}'
