# 4f517fc635370a41cb9edc70a8f0ecd54c81ff8f93759ef169683d4d7965e40b Elan 1.9.0 guest default_profile valid

def main -> None:  # [main]
  point = tuple(3, 4) # [variable definition]
  x1, y1 = point # [variable definition]
  x2, y2 = point # [variable definition]
  x2, y2 = point # [assign variable]
  x3, _ = point # [variable definition]
  _, y3 = point # [variable definition]
  print point.item0
  print point.item1


