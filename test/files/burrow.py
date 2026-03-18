# Python with Elan 2.0.0-alpha

def main(): None:
  blocks = createBlockGraphics(white) # variable
  x = 20 # variable
  y = 15 # variable
  while True:
    blocks[x][y] = red # set
    displayBlocks(blocks) # call
    blocks[x][y] = black # set
    direction = randint(0, 3) # variable
    if direction == 0:
      x = minInt([x + 1, 39]) # set
    elif direction == 1:
      x = maxInt([x - 1, 0]) # set
    elif direction == 2:
      y = minInt([y + 1, 29]) # set
    elif direction == 3:
      y = maxInt([y - 1, 0]) # set
