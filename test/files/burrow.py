# Python with Elan 2.0.0-alpha4

def main() -> None:
  blocks = createBlockGraphics(white) # variable definition
  x = 20 # variable definition
  y = 15 # variable definition
  while True:
    blocks[x][y] = red # re-assign variable
    displayBlocks(blocks) # call procedure
    blocks[x][y] = black # re-assign variable
    direction = randint(0, 3) # variable definition
    if direction == 0:
      x = min([x + 1, 39]) # re-assign variable
    elif direction == 1: # else if
      x = max([x - 1, 0]) # re-assign variable
    elif direction == 2: # else if
      y = min([y + 1, 29]) # re-assign variable
    elif direction == 3: # else if
      y = max([y - 1, 0]) # re-assign variable

main()
