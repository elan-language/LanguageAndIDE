# 17a40a0372e155ec9dcc82c7385c595a6ed86931f6ad31f7c524cfc0c0c984a6 Python with Elan 2.0.0-beta5 valid

def main() -> None:
  head = 620
  snake = [619, head]
  direction = "d"
  apple = -1
  gameOn = true
  while gameOn:
    if apple == -1:
      apple = randint(0, 1200)
    # end if 
    display(snake, apple)
    sleep_ms(150)
    key = getKey().lowerCase()
    if isValid(key):
      direction = key
    # end if 
    head = getAdjacentBlock(head, direction)
    if (head == -1) or snake.contains(head):
      gameOn = false
    # end if 
    snake.append(head)
    if head.equals(apple):
      apple = -1
    else:
      snake.removeAt(0)
     
    # end if 
  # end while 
  print(f"Game Over! Score: {snake.length() - 2}")
# end main 

def display(snake: list[int], apple: int) -> None:
  bg = BlockGraphics()
  for segment in snake:
    bg.putBlockNo(segment, green)
  # end for 
  bg.putBlockNo(apple, red)
  displayBlockGraphics(bg)
# end procedure 

def isValid(key: str) -> bool:
  return (not key.equals("")) and ("wasd".contains(key))
# end function 

class Test_isValid(unittest.TestCase): def test_isValid(self) -> None:
  self.assertEqual(isValid("w"), true)
  self.assertEqual(isValid(""), false)
  self.assertEqual(isValid("x"), false)
# end test 

def getAdjacentBlock(block: int, direction: str) -> int:
  adj = -1
  if direction.equals("d") and ((block % 40) < 39):
    adj = block + 1
  elif direction.equals("s") and (block < 1160):
    adj = block + 40
   
  elif direction.equals("w") and (block > 39):
    adj = block - 40
   
  elif direction.equals("a") and ((block % 40) > 0):
    adj = block - 1
   
  # end if 
  return adj
# end function 

class Test_getAdjacentBlock(unittest.TestCase): def test_getAdjacentBlock(self) -> None:
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
