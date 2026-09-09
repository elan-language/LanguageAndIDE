# Python with Elan 2.0.0-beta4

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
  podge = BlockGraphics() # variable definition
  hodge = BlockGraphics() # variable definition
  blank = BlockGraphics() # variable definition
  # initial colours of grid
  updateGrid(hodge, podge, True) # procedure call
  while not uniform(hodge):
    # successive updates to grid in blank podge
    podge = blank # assignment
    updateGrid(hodge, podge, False) # procedure call
  # end while
# end main

def updateGrid(hodge: BlockGraphics, podge: BlockGraphics, initial: bool) -> None: # procedure
  colours = getColours() # variable definition
  for j in range(0, gH):
    for i in range(0, gW):
      if initial:
        podge.put(i, j, colours[randint(0, (colours.length()) - 1)]) # procedure call
        podge[1][1] = 0x1a001a # assignment
      else:
        podge.put(i, j, newColour(getNeighbourColours(hodge, i, j), hodge.get(i, j))) # procedure call
      # end if
    # end for
  # end for
  a = 0 # variable definition
  # copy podgeValues into hodge
  for j in range(0, gH):
    for i in range(0, gW):
      podgeValue = podge.get(i, j) # variable definition
      hodge.put(i, j, podgeValue) # procedure call
    # end for
  # end for
  hodge.display() # procedure call
  sleep_ms(50) # procedure call
# end procedure

def uniform(grid: BlockGraphics) -> bool: # function
  cell0 = grid.get(0, 0) # variable definition
  isUniform = True # variable definition
  for j in range(0, gH):
    for i in range(0, gW):
      if grid.get(i, j) == cell0:
        isUniform = False # assignment
      # end if
    # end for
  # end for
  return isUniform
# end function

def getNeighbourColours(grid: BlockGraphics, i: int, j: int) -> list[int]: # function
  # grid wraps around: all cells have the same number of neighbours
  # H and V neighbours(von Neumann)
  sL = grid.get((i - 1 + gW) % gW, j) # variable definition
  sR = grid.get((i + 1 + gW) % gW, j) # variable definition
  sA = grid.get(i, (j - 1 + gH) % gH) # variable definition
  sB = grid.get(i, (j + 1 + gH) % gH) # variable definition
  neighbourColours = [sL, sR, sA, sB] # variable definition
  if vN == False:
    # add diagonal neighbours (Moore)
    sLA = grid.get((i - 1 + gW) % gW, (j - 1 + gH) % gH) # variable definition
    sRA = grid.get((i + 1 + gW) % gW, (j - 1 + gH) % gH) # variable definition
    sLB = grid.get((i - 1 + gW) % gW, (j + 1 + gH) % gH) # variable definition
    sRB = grid.get((i + 1 + gW) % gW, (j + 1 + gH) % gH) # variable definition
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
