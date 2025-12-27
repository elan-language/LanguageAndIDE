# 381b5000acd54c1146bf86d9afe3e9f5e4126f05307bd12a458f364c18791f08 Elan 1.9.0 guest default_profile valid

def main -> None:  # [main]
  scale = [262, 294, 330, 349, 392, 440, 494, 523] # [variable definition]
  scaleL = scale.length() # [variable definition]
  quaver = 250 # [variable definition]
  volume = 1.5 # [variable definition]
  for i in range(0, scaleL - 1, 1):  # [for loop]
    tone(quaver, scale[i], volume) # [call procedure]}
  pause(1000) # [call procedure]}
  for i in range(0, scaleL - 1, 1):  # [for loop]
    tone(quaver, scale[scaleL - 1 - i], volume) # [call procedure]}


