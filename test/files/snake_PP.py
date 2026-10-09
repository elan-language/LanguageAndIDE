# Python with Elan 2.0.0-beta5

def main() -> None:
  head = 620 # variable definition
  snake = [619, head] # variable definition
  direction = "d" # variable definition
  apple = -1 # variable definition
  gameOn = True # variable definition
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
    if (head == -1) or snake.contains(head):
      gameOn = False # assignment
    # end if
    snake.append(head) # procedure call
    if head.equals(apple):
      apple = -1 # assignment
    else:
      snake.removeAt(0) # procedure call
    # end if
  # end while
  print(f"Game Over! Score: {snake.length() - 2}")
# end main

def display(snake: list[int], apple: int) -> None: # procedure
  bg = BlockGraphics() # variable definition
  for segment in snake:
    bg.putBlockNo(segment, green) # procedure call
  # end for
  bg.putBlockNo(apple, red) # procedure call
  displayBlockGraphics(bg) # procedure call
# end procedure

def isValid(key: str) -> bool: # function
  return (not key.equals("")) and ("wasd".contains(key))
# end function

def getAdjacentBlock(block: int, direction: str) -> int: # function
  adj = -1 # variable definition
  if direction.equals("d") and ((block % 40) < 39):
    adj = block + 1 # assignment
  elif direction.equals("s") and (block < 1160): # else if
    adj = block + 40 # assignment
  elif direction.equals("w") and (block > 39): # else if
    adj = block - 40 # assignment
  elif direction.equals("a") and ((block % 40) > 0): # else if
    adj = block - 1 # assignment
  # end if
  return adj
# end function

class Test_getAdjacentBlock(unittest.TestCase):
 def test_getAdjacentBlock(self) -> None:
  self.assertEqual(getAdjacentBlock(621, "w"), 581)
  self.assertEqual(getAdjacentBlock(621, "a"), 620)
  self.assertEqual(getAdjacentBlock(621, "s"), 661)
  self.assertEqual(getAdjacentBlock(621, "d"), 622)
  self.assertEqual(getAdjacentBlock(119, "d"), -1)
  self.assertEqual(getAdjacentBlock(600, "a"), -1)
  self.assertEqual(getAdjacentBlock(7, "w"), -1)
  self.assertEqual(getAdjacentBlock(1190, "s"), -1)
# end test

main()
