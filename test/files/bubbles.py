# Python with Elan 2.0.0-beta-pre1

def main() -> None:
  bubbles = list[CircleVG]() # variable definition
  # create 20 small bubbles at the bottom
  for i in range(1, 21):
    b = (CircleVG()).withCentreX(i*5 + 2).withCentreY(75).withRadius(0).withFillColour(transparent).withStrokeColour(randint(0, white)) # variable definition
    bubbles.append(b) # call procedure
  # end for
  while True:
    moveGrowBurst(bubbles) # call procedure
  # end while
# end main

def moveGrowBurst(bubbles: list[CircleVG]) -> None: # procedure
  for b in bubbles:
    if random() < 0.05:
      # 5% chance bubble 'bursts' and starts again tiny at bottom
      b.setRadius(0) # call procedure
      b.setCentreY(75) # call procedure
    else:
      # bubble rises and grows slightly
      b.setCentreY(b.centreY - 1) # call procedure
      b.setRadius(b.radius + 0.2) # call procedure
    # end if
  # end for
  displayVectorGraphics(bubbles) # call procedure
  sleep_ms(5) # call procedure
# end procedure

main()
