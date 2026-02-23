# Python with Elan 2.0.0-alpha

def main(): None:
  bubbles = new list[CircleVG]() # variable
  # create 20 small bubbles at the bottom
  for i in sequence(1, 20, 1):
    b = new CircleVG() with centreX set to i*5 + 2, centreY set to 75, radius set to 0, fillColour set to transparent, strokeColour set to randomInt(0, white) # variable
    bubbles.append(b) # call
  while true:
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
  pause(50) # call
