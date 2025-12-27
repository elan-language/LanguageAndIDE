# e53a3a88e70c9fac846d946b77fbeaec19256e54a74b9269ee8dc1c1b3ee9f4d Elan 1.9.0 guest default_profile valid

def main -> None:  # [main]
  blocks = new Array2D<of Int>(40, 30, white) # [variable definition]
  while true
    x = randomInt(0, 19) # [variable definition]
    y = randomInt(0, 14) # [variable definition]
    colour = randomInt(0, 2^24 - 1) # [variable definition]
    blocks.put(20 + x, 15 - y, colour) # [call procedure]}
    blocks.put(20 + x, 15 + y, colour) # [call procedure]}
    blocks.put(20 - x, 15 - y, colour) # [call procedure]}
    blocks.put(20 - x, 15 + y, colour) # [call procedure]}
    displayBlocks(blocks) # [call procedure]}


