# Python with Elan 2.0.0-beta1

nDiscs = 7 # constant

delay_ms = 300 # constant

def main() -> None:
  stacks = create3Stacks(nDiscs) # variable definition
  display(stacks) # call procedure
  while stacks[2].length() != nDiscs:
    if (stacks[0].length() % 2) == 0:
      moveBetween(stacks, 0, 1) # call procedure
      moveBetween(stacks, 0, 2) # call procedure
      moveBetween(stacks, 1, 2) # call procedure
    else:
      moveBetween(stacks, 0, 2) # call procedure
      moveBetween(stacks, 0, 1) # call procedure
      moveBetween(stacks, 1, 2) # call procedure
    # end if
  # end while
# end main

def moveBetween(stacks: list[list[int]], fromStack: int, toStack: int) -> None: # procedure
  a = stacks[fromStack] # variable definition
  b = stacks[toStack] # variable definition
  if b.length() < nDiscs:
    if (a.length() > 0) and ((b.length() == 0) or (top(a) < top(b))):
      disc = top(a) # variable definition
      a.removeFirst(disc) # call procedure
      b.append(disc) # call procedure
    elif b.length() > 0: # else if
      disc = top(b) # variable definition
      b.removeFirst(disc) # call procedure
      a.append(disc) # call procedure
    # end if
  # end if
  display(stacks) # call procedure
# end procedure

def display(stacks: list[list[int]]) -> None: # procedure
  clearAllDisplays() # call procedure
  vg = createVectorGraphics() # variable definition
  drawStack(stacks[0], 1, vg) # call procedure
  drawStack(stacks[1], 2, vg) # call procedure
  drawStack(stacks[2], 3, vg) # call procedure
  displayVectorGraphics(vg) # call procedure
  sleep_ms(delay_ms) # call procedure
# end procedure

def drawStack(s: list[int], peg: int, vg: list[VectorGraphic]) -> None: # procedure
  for n in range(0, s.length()):
    discVG = createDisc(s[n], peg, n) # variable definition
    vg.append(discVG) # call procedure
  # end for
# end procedure

def createDisc(disc: int, peg: int, vertical: int) -> RectangleVG: # function
  r = RectangleVG() # variable definition
  return r.withFillColour(colour(disc)).withHeight(3).withWidth(disc*2 + 2).withX((peg - 1)*30 + 20 - disc).withY(50 - vertical*3).withStrokeWidth(0.25)
# end function

def test_createDisc(self) -> None:
  # Normal cases
  d = createDisc(5, 2, 4) # variable definition
  self.assertEqual(d.fillColour, green)
  self.assertEqual(d.strokeWidth, 0.25)
  self.assertEqual(d.height, 3)
  self.assertEqual(d.width, 12)
  self.assertEqual(d.x, 45)
  self.assertEqual(d.y, 38)
  # Edge cases
  d2 = createDisc(1, 1, 0) # variable definition
  self.assertEqual(d2.fillColour, red)
  self.assertEqual(d2.strokeWidth, 0.25)
  self.assertEqual(d2.height, 3)
  self.assertEqual(d2.width, 4)
  self.assertEqual(d2.x, 19)
  self.assertEqual(d2.y, 50)
  # Error cases - none identified
# end test

def create3Stacks(nDiscs: int) -> list[list[int]]: # function
  s0 = rangeInSteps(nDiscs, 0, -1) # variable definition
  s1 = list[int]() # variable definition
  s2 = list[int]() # variable definition
  return [s0, s1, s2]
# end function

def test_create3Stacks(self) -> None:
  emptyStack = list[int]() # variable definition
  # Normal case(s)
  self.assertEqual(create3Stacks(7), [[7, 6, 5, 4, 3, 2, 1], emptyStack, emptyStack])
  # Edge case(s)
  self.assertEqual(create3Stacks(1), [[1], emptyStack, emptyStack])
  self.assertEqual(create3Stacks(0), [emptyStack, emptyStack, emptyStack])
  # Error case(s)
  self.assertEqual(create3Stacks(-1), "Loop will not terminate when start < end start with negative step")
# end test

def colour(disc: int) -> int: # function
  colours = [red, yellow, blue, brown, green, 0xFF9900, 0x6600FF, 0x00CC00, 0x3399FF, 0xFF99CC] # variable definition
  return colours[disc - 1]
# end function

def test_colour(self) -> None:
  # Normal cases
  self.assertEqual(colour(5), green)
  # Edge cases
  self.assertEqual(colour(1), red)
  self.assertEqual(colour(10), 0xFF99CC)
  # Error cases
  self.assertEqual(colour(11), "Out of range index: 10 size: 10")
# end test

def top(s: list[int]) -> int: # function
  return s[s.length() - 1]
# end function

def test_top(self) -> None:
  # Normal cases
  self.assertEqual(top([3, 2, 1]), 1)
  # Edge cases
  self.assertEqual(top([7]), 7)
  # Error cases
  self.assertEqual(top(list[int]()), "Out of range index: -1 size: 0")
# end test

main()
