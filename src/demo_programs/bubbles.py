# 25401b36e0cbe942dd6856bd95c068ee6eff89c906eb24fa6b47820010d645d4 Elan 1.9.0 guest default_profile valid

def main -> None:  # [main]
  bubbles = new List<of CircleVG>() # [variable definition]
  # create 20 small bubbles at the bottom
  for i in range(1, 20, 1):  # [for loop]
    b = new CircleVG() with centreX set to i*5 + 2, centreY set to 75, radius set to 0, fillColour set to transparent, strokeColour set to randomInt(0, white) # [variable definition]
    bubbles.append(b) # [call procedure]}
  while true
    moveGrowBurst(bubbles) # [call procedure]}


def moveGrowBurst(bubbles: List<of CircleVG>) -> None:  # [procedure]
  for b in bubbles:  # [each loop]
    if random() < 0.05 then
      # 5% chance bubble 'bursts' and starts again tiny at bottom
      b.setRadius(0) # [call procedure]}
      b.setCentreY(75) # [call procedure]}
    else
      # bubble rises and grows slightly
      b.setCentreY(b.centreY - 1) # [call procedure]}
      b.setRadius(b.radius + 0.2) # [call procedure]}
  displayVectorGraphics(bubbles) # [call procedure]}
  pause(50) # [call procedure]}


