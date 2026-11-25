# bef41e917837f34f556148be58b028b901b6df014341def089e0fc43df522ea5 Python with Elan 3.0.0-alpha valid

def main() -> None:
  blocks = BlockGraphics() # variable definition
  while True:
    x = randint(0, 19) # variable definition
    y = randint(0, 14) # variable definition
    colour = randint(0, (pow(2, 24) - 1).floor()) # variable definition
    blocks.put(20 + x, 15 - y, colour)
    blocks.put(20 + x, 15 + y, colour)
    blocks.put(20 - x, 15 - y, colour)
    blocks.put(20 - x, 15 + y, colour)
    displayBlockGraphics(blocks)
  # end while
# end main

main()
