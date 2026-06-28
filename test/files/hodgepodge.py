# Python with Elan 2.0.0-beta1

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
# end function

# vN : neighbourhood: von Neumann (4) true, Moore (8) false

vN = False # constant

def main() -> None:
  # colour grids: hodge for display, podge for working
  podge = createBlockGraphics(healthy) # variable definition
  hodge = AsRef[list[list[int]]](createBlockGraphics(healthy)) # variable definition
  blank = createBlockGraphics(healthy) # variable definition
  # initial colours of grid
  updateGrid(hodge, podge, True) # procedure call
  while not uniform(hodge.value()):
    # successive updates to grid in blank podge
    podge = blank # assignment
    updateGrid(hodge, podge, False) # procedure call
  # end while
# end main

def updateGrid(hodge: AsRef[list[list[int]]], podge: list[list[int]], initial: bool) -> None: # procedure
  colours = getColours() # variable definition
  for j in range(0, gH):
    for i in range(0, gW):
      if initial:
        podge[i][j] = colours[randint(0, (colours.length()) - 1)] # assignment
        podge[1][1] = 0x1a001a # assignment
      else:
        podge[i][j] = newColour(getNeighbourColours(hodge.value(), i, j), hodge.value()[i][j]) # assignment
      # end if
    # end for
  # end for
  a = 0 # variable definition
  hodge.set(podge) # procedure call
  displayBlocks(hodge.value()) # procedure call
  sleep_ms(50) # procedure call
# end procedure

def uniform(grid: list[list[int]]) -> bool: # function
  uniformGrid = createBlockGraphics(grid[0][0]) # variable definition
  return if_(grid.equals(uniformGrid), True, False)
# end function

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
    neighbourColours = [sL, sR, sA, sB, sLA, sRA, sLB, sRB] # assignment
  # end if
  return neighbourColours
# end function

def newColour(neighbourColours: list[int], nowColour: int) -> int: # function
  colours = getColours() # variable definition
  nInfected = 0 # variable definition
  nIll = 0 # variable definition
  sumStates = colours.indexOf(nowColour) # variable definition
  for colour in neighbourColours:
    sumStates = sumStates + colours.indexOf(colour) # assignment
    if colour < healthy:
      nInfected = nInfected + 1 # assignment
      if colour == ill:
        nIll = nIll + 1 # assignment
      # end if
    # end if
  # end for
  return updateColour(nowColour, sumStates, nInfected, nIll)
# end function

def updateColour(nowColour: int, sumStates: int, nInfected: int, nIll: int) -> int: # function
  colours = getColours() # variable definition
  state = 0 # variable definition
  if nowColour == healthy:
    state = divAsInt(nInfected, w1) + divAsInt(nIll, w2) # assignment
  elif nowColour != ill: # else if
    state = divAsInt(sumStates, (nInfected + 1)) + iR # assignment
  # end if
  return if_(state > (colours.length() - 1), ill, colours[state])
# end function

main()
