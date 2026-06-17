# Python with Elan 2.0.0-beta

# Hodgepodge, after M.Gerhardt, H.Schuster, J.Tyson (1990)  

# A Cellular Automaton Model of Excitable Media

#  

# gW, gH : grid width, height

gW = 40 # constant

gH = 30 # constant

# iR : infection rate (1..20)

iR = 1 # constant

# w1, w2 : weighting factors (low integers)

w1 = 4 # constant

w2 = 1 # constant

# colours : cellColour.s in descending order of RGB value

# state : of a cell is colours.indexOf(cellColour) in [0..colours.length() - 1]

# colours[0] = healthy; colours[colours.length() - 1] = ill, otherwise infected

healthy = white # constant

ill = black # constant

def getColours() -> list[int]: # function
  return [healthy, 0xffe6ff, 0xffccff, 0xffb3ff, 0xff99ff, 0xff80ff, 0xff66ff, 0xff4dff, 0xff33ff, 0xff1aff, 0xff00ff, 0xe600e6, 0xcc00cc, 0xb300b3, 0x990099, 0x800080, 0x660066, 0x4d004d, 0x330033, 0x1a001a, ill]

# vN : neighbourhood: von Neumann (4) true, Moore (8) false

vN = False # constant

def main() -> None:
  # colour grids: hodge for display, podge for working
  podge = createBlockGraphics(healthy) # variable definition
  hodge = AsRef[list[list[int]]](createBlockGraphics(healthy)) # variable definition
  blank = createBlockGraphics(healthy) # variable definition
  # initial colours of grid
  updateGrid(hodge, podge, True) # call procedure
  while not uniform(hodge.value()):
    # successive updates to grid in blank podge
    podge = blank # reassign variable
    updateGrid(hodge, podge, False) # call procedure

def updateGrid(hodge: AsRef[list[list[int]]], podge: list[list[int]], initial: bool) -> None: # procedure
  colours = getColours() # variable definition
  for j in range(0, gH):
    for i in range(0, gW):
      if initial:
        podge[i][j] = colours[randint(0, (colours.length()) - 1)] # reassign variable
        podge[1][1] = 0x1a001a # reassign variable
      else:
        podge[i][j] = newColour(getNeighbourColours(hodge.value(), i, j), hodge.value()[i][j]) # reassign variable
  a = 0 # variable definition
  hodge.set(podge) # call procedure
  displayBlocks(hodge.value()) # call procedure
  sleep_ms(50) # call procedure

def uniform(grid: list[list[int]]) -> bool: # function
  uniformGrid = createBlockGraphics(grid[0][0]) # variable definition
  return if_(grid.equals(uniformGrid), True, False)

def getNeighbourColours(grid: list[list[int]], i: int, j: int) -> list[int]: # function
  # grid wraps around: all cells have the same number of neighbours
  # H and V neighbours(von Neumann)
  sL = grid[(i - 1 + gW) % gW][j] # variable definition
  sR = grid[(i + 1 + gW) % gW][j] # variable definition
  sA = grid[i][(j - 1 + gH) % gH] # variable definition
  sB = grid[i][(j + 1 + gH) % gH] # variable definition
  neighbourColours = [sL, sR, sA, sB] # variable definition
  if vN == False:
    # add diagonal neighbours (Moore)
    sLA = grid[(i - 1 + gW) % gW][(j - 1 + gH) % gH] # variable definition
    sRA = grid[(i + 1 + gW) % gW][(j - 1 + gH) % gH] # variable definition
    sLB = grid[(i - 1 + gW) % gW][(j + 1 + gH) % gH] # variable definition
    sRB = grid[(i + 1 + gW) % gW][(j + 1 + gH) % gH] # variable definition
    neighbourColours = [sL, sR, sA, sB, sLA, sRA, sLB, sRB] # reassign variable
  return neighbourColours

def newColour(neighbourColours: list[int], nowColour: int) -> int: # function
  colours = getColours() # variable definition
  nInfected = 0 # variable definition
  nIll = 0 # variable definition
  sumStates = colours.indexOf(nowColour) # variable definition
  for colour in neighbourColours:
    sumStates = sumStates + colours.indexOf(colour) # reassign variable
    if colour < healthy:
      nInfected = nInfected + 1 # reassign variable
      if colour == ill:
        nIll = nIll + 1 # reassign variable
  return updateColour(nowColour, sumStates, nInfected, nIll)

def updateColour(nowColour: int, sumStates: int, nInfected: int, nIll: int) -> int: # function
  colours = getColours() # variable definition
  state = 0 # variable definition
  if nowColour == healthy:
    state = divAsInt(nInfected, w1) + divAsInt(nIll, w2) # reassign variable
  elif nowColour != ill: # else if
    state = divAsInt(sumStates, (nInfected + 1)) + iR # reassign variable
  return if_(state > (colours.length() - 1), ill, colours[state])

main()
