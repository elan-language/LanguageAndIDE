# 7176cbda9abed38d907eeec93392ecda1e2e8a72fef4c30ecfa51e91121ef6bc Elan 1.9.0 guest default_profile valid

def dealCard(random: Float) -> Card:  # [function]
  number = (random*52).floor() # [variable definition]
  rank = rankValue.keys()[(number/4).floor()] # [variable definition]
  suit = number mod 4 # [variable definition]
  return new Card() with rank set to rank, suit set to suit


