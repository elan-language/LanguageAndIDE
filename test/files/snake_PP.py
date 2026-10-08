# Python with Elan 2.0.0-beta5

def main() -> None:
  head = 621 # variable definition
  snake = [617, 618, 619, 620, head] # variable definition
  direction = "d" # variable definition
  gameOn = True # variable definition
  apple = -1 # variable definition
  while gameOn:
    while (apple == -1) or snake.contains(apple):
      apple = randint(0, 1200) # assignment
    # end while
    display(snake, apple) # procedure call
    sleep_ms(150) # procedure call
    key = getKey().lowerCase() # variable definition
    if isValid(key):
      direction = key # assignment
    # end if
    head = getAdjacentBlock(head, direction) # assignment
    if head == -1:
      gameOn = False # assignment
    # end if
    if head.equals(apple):
      apple = -1 # assignment
    else:
      snake.removeAt(0) # procedure call
    # end if
    snake.append(head) # procedure call
  # end while
# end main

def isValid(key: str) -> bool: # function
  return (not key.equals("")) and ("wasd".contains(key))
# end function

class Test_isValid(unittest.TestCase):
 def test_isValid(self) -> None:
  self.assertEqual(isValid("w"), True)
  self.assertEqual(isValid(""), False)
  self.assertEqual(isValid("x"), False)
# end test

def getAdjacentBlock(bl: int, direction: str) -> int: # function
  adj = -1 # variable definition
  if direction.equals("d") and ((bl % 40) < 39):
    adj = bl + 1 # assignment
  elif direction.equals("s") and (bl < 1160): # else if
    adj = bl + 40 # assignment
  elif direction.equals("w") and (bl > 39): # else if
    adj = bl - 40 # assignment
  elif direction.equals("a") and ((bl % 40) > 0): # else if
    adj = bl - 1 # assignment
  # end if
  return adj
# end function

class Test_getAdjacentBlock(unittest.TestCase):
 def test_getAdjacentBlock(self) -> None:
  self.assertEqual(getAdjacentBlock(119, "d"), -1)
  self.assertEqual(getAdjacentBlock(600, "a"), -1)
  self.assertEqual(getAdjacentBlock(7, "w"), -1)
  self.assertEqual(getAdjacentBlock(1190, "s"), -1)
# end test

def display(snake: list[int], apple: int) -> None: # procedure
  bg = BlockGraphics() # variable definition
  for segment in snake:
    bg.putBlockNo(segment, green) # procedure call
  # end for
  bg.putBlockNo(apple, red) # procedure call
  displayBlockGraphics(bg) # procedure call
# end procedure

main()
