# b75f3c8736bdb2f3980ac2d2e8df2ba615c9db991ddb7bdd4d1ab7bdcf6e1998 Elan 1.9.0 guest default_profile valid

def main -> None:  # [main]
  vg = new List<of VectorGraphic>() # [variable definition]
  circ = new CircleVG() with centreX set to 20, centreY set to 20, radius set to 5, fillColour set to green, strokeColour set to red, strokeWidth set to 2 # [variable definition]
  vg.append(circ) # [call procedure]}
  displayVectorGraphics(vg) # [call procedure]}


