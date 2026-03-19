# Python with Elan 2.0.0-alpha

def main(): None:
  bubbles = list[CircleVG]() # variable
  # create 20 small bubbles at the bottom
  for i in range(1, 21):
    b = (CircleVG()).withCentreX(i*5 + 2).withCentreY(75).withRadius(0).withFillColour(transparent).withStrokeColour(randint(0, white)) # variable
    bubbles.append(b) # call
  while True:
    moveGrowBurst(bubbles) # call

def moveGrowBurst(bubbles: list[CircleVG]) -> None: # procedure
  for b in bubbles:
    if random() < 0.05:
      # 5% chance bubble 'bursts' and starts again tiny at bottom
      b.setRadius(0) # call
      b.setCentreY(75) # call
    else:
      # bubble rises and grows slightly
      b.setCentreY(b.centreY - 1) # call
      b.setRadius(b.radius + 0.2) # call
  displayVectorGraphics(bubbles) # call
  sleep_ms(5) # call
