# 11b2152a87f700782f41b0149b4b86817ae17cda013536a46ad22495d255c5fb Elan 1.9.0 guest default_profile valid

def score(g: Game) -> Int:  # [function]
  return g.body.length() - 2


def main -> None:  # [main]
  g = new Game() # [variable definition]
  print score(g)


class Game
  body: String = None # [property]

end class
