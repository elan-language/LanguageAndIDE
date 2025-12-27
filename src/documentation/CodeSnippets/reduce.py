# d92d39a04045f6779bc4ac3fcd41cb4b8fe6bd1cde558efff1ed6af7fc81f684 Elan 1.9.0 guest default_profile valid

def main -> None:  # [main]
  #   sum the integers in a List
  li = [2, 3, 4, 7, 11] # [variable definition]
  print li.reduce(0, lambda isum: Int, item: Int => isum + item)
  #   sum the integers in a ListImmutable
  lim = {2, 3, 4, 7, 11} # [variable definition]
  print lim.reduce(0, lambda isum: Int, item: Int => isum + item)
  #   sum the floats in a list
  lj = [0.1, 2.5, 2, 0.3, 5.7, 0.2] # [variable definition]
  print lj.reduce(0.0, lambda fsum: Float, item: Float => fsum + item).round(1)
  #   concatenate the strings in a list
  ls = ["Eeny", "Meeny", "Miny", "Mo"] # [variable definition]
  print ls.reduce(empty String, lambda concat: String, item: String => concat + item)
  #   find the longest string
  print ls.reduce(empty String, lambda longest: String, item: String => if item.length() > longest.length() then item else longest)
  #   reverse the order of a list
  print li.reduce(empty List<of Int>, lambda liR: List<of Int>, item: Int => liR.withPrepend(item))
  #   reverse the order of a string
  s = "'Twas brillig and the slithy toves" # [variable definition]
  print s.split(empty String).reduce(empty List<of String>, lambda sR: List<of String>, item: String => sR.withPrepend(item)).join(empty String)


