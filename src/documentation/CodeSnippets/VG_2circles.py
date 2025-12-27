# 2c2fe0ac26f0e3ce56885ae65ce67e5a9157f1bbe99ef0b0e2943048396403b5 Elan 1.9.0 guest default_profile valid

def main -> None:  # [main]
  vg = new List<of VectorGraphic>() # [variable definition]
  circ = new CircleVG() with centreX set to 50, centreY set to 37.5, radius set to 30, fillColour set to green # [variable definition]
  vg.append(circ) # [call procedure]}
  while true
    displayVectorGraphics(vg) # [call procedure]}
    pause(700) # [call procedure]}
    circ.setFillColour(red) # [call procedure]}
    displayVectorGraphics(vg) # [call procedure]}
    pause(700) # [call procedure]}
    circ.setFillColour(green) # [call procedure]}


