# Python with Elan 2.0.0-beta4

def main() -> None:
  blocks = BlockGraphics() # variable definition
  while True:
    x = randint(0, 19) # variable definition
    y = randint(0, 14) # variable definition
    colour = randint(0, (pow(2, 24) - 1).floor()) # variable definition
    blocks.put(20 + x, 15 - y, colour) # procedure call
    blocks.put(20 + x, 15 + y, colour) # procedure call
    blocks.put(20 - x, 15 - y, colour) # procedure call
    blocks.put(20 - x, 15 + y, colour) # procedure call
    displayBlockGraphics(blocks) # procedure call
  # end while
# end main

main()
