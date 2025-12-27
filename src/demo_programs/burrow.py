# 41c57d4faf278972f7298cdaa5034cb97c138d4fa246bcec3711272def79ea36 Elan 1.9.0 guest default_profile valid

def main -> None:  # [main]
  blocks = new Array2D<of Int>(40, 30, white) # [variable definition]
  x = 20 # [variable definition]
  y = 15 # [variable definition]
  while true
    blocks.put(x, y, red) # [call procedure]}
    displayBlocks(blocks) # [call procedure]}
    blocks.put(x, y, black) # [call procedure]}
    direction = randomInt(0, 3) # [variable definition]
    if direction is 0 then
      x = minInt([x + 1, 39]) # [assign variable]
    else if direction is 1 then
      x = maxInt([x - 1, 0]) # [assign variable]
    else if direction is 2 then
      y = minInt([y + 1, 29]) # [assign variable]
    else if direction is 3 then
      y = maxInt([y - 1, 0]) # [assign variable]


