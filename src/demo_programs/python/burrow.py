# c645960efdc252939da3a223129f2c58b38e2e252a482bbf4e7b89dfcbc1f77a Python with Elan 3.0.0-alpha valid

def main() -> None:
  blocks = BlockGraphics() # variable definition
  x = 20 # variable definition
  y = 15 # variable definition
  while True:
    blocks.put(x, y, red)
    displayBlockGraphics(blocks)
    blocks.put(x, y, black)
    direction = randint(0, 3) # variable definition
    if direction == 0:
      x = min([x + 1, 39]) # assignment
    elif direction == 1:
      x = max([x - 1, 0]) # assignment
    elif direction == 2:
      y = min([y + 1, 29]) # assignment
    elif direction == 3:
      y = max([y - 1, 0]) # assignment
    # end if
  # end while
# end main

main()
