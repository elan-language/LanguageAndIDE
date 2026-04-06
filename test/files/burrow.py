# Python with Elan 2.0.0-alpha1

def main() -> None:
  blocks = createBlockGraphics(white) # variable definition
  x = 20 # variable definition
  y = 15 # variable definition
  while True:
    blocks[x][y] = red # change variable
    displayBlocks(blocks) # call procedure
    blocks[x][y] = black # change variable
    direction = randint(0, 3) # variable definition
    if direction == 0:
      x = min([x + 1, 39]) # change variable
    elif direction == 1:
      x = max([x - 1, 0]) # change variable
    elif direction == 2:
      y = min([y + 1, 29]) # change variable
    elif direction == 3:
      y = max([y - 1, 0]) # change variable

main()
