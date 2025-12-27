# 588e08b71cbb6d374e898f7fee2a1f6233d985ef7f036e91d81de25c989af076 Elan 1.9.0 guest default_profile valid

def main -> None:  # [main]
  blocks = new Array2D<of Int>(40, 30, white) # [variable definition]
  while true
    x = randomInt(0, 39) # [variable definition]
    y = randomInt(0, 29) # [variable definition]
    colour = randomInt(0, white - 1) # [variable definition]
    blocks.put(x, y, colour) # [call procedure]}
    displayBlocks(blocks) # [call procedure]}


def test_() -> None:  # [test]



