# c129faed5ab2e4d541b9fbfbcfa18f8023e532315cf1df4ac534e050abfe875a Python with Elan 2.0.0-beta5 valid

def main() -> None:
  bubbles = list[CircleVG]() # variable definition
  # create 20 small bubbles at the bottom
  for i in range(1, 21):
    b = (CircleVG()).withCentreX(i*5 + 2).withCentreY(75).withRadius(0).withFillColour(transparent).withStrokeColour(randint(0, white)) # variable definition
    bubbles.append(b)
  # end for
  while True:
    moveGrowBurst(bubbles)
    sleep_ms(100)
  # end while
# end main

def moveGrowBurst(bubbles: list[CircleVG]) -> None: # procedure
  for b in bubbles:
    if random() < 0.05:
      # 5% chance bubble 'bursts' and starts again tiny at bottom
      b.setRadius(0)
      b.setCentreY(75)
    else:
      # bubble rises and grows slightly
      b.setCentreY(b.centreY - 1)
      b.setRadius(b.radius + 0.2)
    # end if
  # end for
  displayVectorGraphics(bubbles)
  sleep_ms(5)
# end procedure

main()
