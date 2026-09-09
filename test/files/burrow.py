# Python with Elan 2.0.0-beta4

def main() -> None:
  blocks = BlockGraphics() # variable definition
  x = 20 # variable definition
  y = 15 # variable definition
  while True:
    blocks.put(x, y, red) # procedure call
    blocks.display() # procedure call
    blocks.put(x, y, black) # procedure call
    direction = randint(0, 3) # variable definition
    if direction == 0:
      x = min([x + 1, 39]) # assignment
    elif direction == 1: # else if
      x = max([x - 1, 0]) # assignment
    elif direction == 2: # else if
      y = min([y + 1, 29]) # assignment
    elif direction == 3: # else if
      y = max([y - 1, 0]) # assignment
    # end if
  # end while
# end main

main()
