# Python with Elan 2.0.0-beta2

def main() -> None:
  bubbles = list[CircleVG]() # variable definition
  # create 20 small bubbles at the bottom
  for i in range(1, 21):
    b = (CircleVG()).withCentreX(i*5 + 2).withCentreY(75).withRadius(0).withFillColour(transparent).withStrokeColour(randint(0, white)) # variable definition
    bubbles.append(b) # procedure call
  # end for
  while True:
    moveGrowBurst(bubbles) # procedure call
  # end while
# end main

def moveGrowBurst(bubbles: list[CircleVG]) -> None: # procedure
  for b in bubbles:
    if random() < 0.05:
      # 5% chance bubble 'bursts' and starts again tiny at bottom
      b.setRadius(0) # procedure call
      b.setCentreY(75) # procedure call
    else:
      # bubble rises and grows slightly
      b.setCentreY(b.centreY - 1) # procedure call
      b.setRadius(b.radius + 0.2) # procedure call
    # end if
  # end for
  displayVectorGraphics(bubbles) # procedure call
  sleep_ms(5) # procedure call
# end procedure

main()
