# ed03dde57fc7219eacbbae85c06b6aa3e96b76a305857f581100d8292b0e61cf Python with Elan 2.0.0-beta5 valid

def main() -> None:
  blocks = BlockGraphics()
  x = 20
  y = 15
  while true:
    blocks.put(x, y, red)
    displayBlockGraphics(blocks)
    blocks.put(x, y, black)
    direction = randint(0, 3)
    if direction == 0:
      x = min([x + 1, 39])
    elif direction == 1:
      x = max([x - 1, 0])
     
    elif direction == 2:
      y = min([y + 1, 29])
     
    elif direction == 3:
      y = max([y - 1, 0])
     
    # end if 
  # end while 
# end main 

main()
