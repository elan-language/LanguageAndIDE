# 776d0c617d529603b4434844351dfdf9aaef82db67d18569823beaefbf3794fe Python with Elan 3.0.0-alpha valid

nDiscs = 7

delay_ms = 300

def main() -> None:
  stacks = create3Stacks(nDiscs) # variable definition
  display(stacks)
  while stacks[2].length() != nDiscs:
    if (stacks[0].length() % 2) == 0:
      moveBetween(stacks, 0, 1)
      moveBetween(stacks, 0, 2)
      moveBetween(stacks, 1, 2)
    else:
      moveBetween(stacks, 0, 2)
      moveBetween(stacks, 0, 1)
      moveBetween(stacks, 1, 2)
    # end if
  # end while
# end main

def moveBetween(stacks: list[list[int]], fromStack: int, toStack: int) -> None: # procedure
  a = stacks[fromStack] # variable definition
  b = stacks[toStack] # variable definition
  if b.length() < nDiscs:
    if (a.length() > 0) and ((b.length() == 0) or (top(a) < top(b))):
      disc = top(a) # variable definition
      a.removeFirst(disc)
      b.append(disc)
    elif b.length() > 0:
      disc = top(b) # variable definition
      b.removeFirst(disc)
      a.append(disc)
    # end if
  # end if
  display(stacks)
# end procedure

def display(stacks: list[list[int]]) -> None: # procedure
  clearAllDisplays()
  vg = createVectorGraphics() # variable definition
  for i in range(0, 3):
    drawStack(stacks[i], i + 1, vg)
  # end for
  displayVectorGraphics(vg)
  sleep_ms(delay_ms)
# end procedure

def drawStack(s: list[int], peg: int, vg: list[VectorGraphic]) -> None: # procedure
  for n in range(0, s.length()):
    discVG = createDisc(s[n], peg, n) # variable definition
    vg.append(discVG)
  # end for
# end procedure

def createDisc(disc: int, peg: int, vertical: int) -> RectangleVG: # function
  r = RectangleVG() # variable definition
  return r.withFillColour(colour(disc)).withHeight(3).withWidth(disc*2 + 2).withX((peg - 1)*30 + 20 - disc).withY(50 - vertical*3).withStrokeWidth(0.25)
# end function

class Test_createDisc(unittest.TestCase):
 def test_createDisc(self: Test_createDisc) -> None:
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

class Test_create3Stacks(unittest.TestCase):
 def test_create3Stacks(self: Test_create3Stacks) -> None:
  empty = list[int]() # variable definition
  # Normal case(s)
  self.assertEqual(create3Stacks(7), [[7, 6, 5, 4, 3, 2, 1], empty, empty])
  # Edge case(s)
  self.assertEqual(create3Stacks(1), [[1], empty, empty])
  self.assertEqual(create3Stacks(0), [empty, empty, empty])
  # Error case(s)
  self.assertEqual(create3Stacks(-1), "Loop will not terminate when start < end start with negative step")
# end test

def colour(disc: int) -> int: # function
  colours = [red, yellow, blue, brown, green, 0xff9900, 0x6600ff, 0x00cc00, 0x3399ff, 0xff99cc] # variable definition
  return colours[disc - 1]
# end function

class Test_colour(unittest.TestCase):
 def test_colour(self: Test_colour) -> None:
  # Normal cases
  self.assertEqual(colour(5), green)
  # Edge cases
  self.assertEqual(colour(1), red)
  self.assertEqual(colour(10), 0xff99cc)
  # Error cases
  self.assertEqual(colour(11), "Out of range index: 10 size: 10")
# end test

def top(s: list[int]) -> int: # function
  return s[s.length() - 1]
# end function

class Test_top(unittest.TestCase):
 def test_top(self: Test_top) -> None:
  # Normal cases
  self.assertEqual(top([3, 2, 1]), 1)
  # Edge cases
  self.assertEqual(top([7]), 7)
  # Error cases
  self.assertEqual(top(list[int]()), "Out of range index: -1 size: 0")
# end test

main()
