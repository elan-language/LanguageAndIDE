# 0c6e65ffd86978fce61327fcebe78182ee1ec02986a0710ba0cf908467ec8815 Elan 1.9.0 guest default_profile valid

def liveNeighbours(cells: List<of Boolean>, c: Int) -> Int:  # [function]
  neighbours = neighbourCells(c) # [variable definition]
  live = neighbours.filter(lambda i: Int => cells[i]) # [variable definition]
  return live.length()


def neighbourCells(c: Int) -> List<of Int>:  # [function]
  return [0]


