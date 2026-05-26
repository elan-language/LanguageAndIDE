# Python with Elan 2.0.0-alpha5

def main() -> None:
  blocks = createBlockGraphics(white) # variable definition
  x = 20 # variable definition
  y = 15 # variable definition
  while True:
    blocks[x][y] = red # reassign variable
    displayBlocks(blocks) # call procedure
    blocks[x][y] = black # reassign variable
    direction = randint(0, 3) # variable definition
    if direction == 0:
      x = min([x + 1, 39]) # reassign variable
    elif direction == 1: # else if
      x = max([x - 1, 0]) # reassign variable
    elif direction == 2: # else if
      y = min([y + 1, 29]) # reassign variable
    elif direction == 3: # else if
      y = max([y - 1, 0]) # reassign variable

main()
