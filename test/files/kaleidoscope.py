# Python with Elan 2.0.0-alpha5

def main() -> None:
  blocks = createBlockGraphics(white) # variable definition
  while True:
    x = randint(0, 19) # variable definition
    y = randint(0, 14) # variable definition
    colour = randint(0, (pow(2, 24) - 1).floor()) # variable definition
    blocks[20 + x][15 - y] = colour # reassign variable
    blocks[20 + x][15 + y] = colour # reassign variable
    blocks[20 - x][15 - y] = colour # reassign variable
    blocks[20 - x][15 + y] = colour # reassign variable
    displayBlocks(blocks) # call procedure

main()
