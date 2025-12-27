# aa7d185138a18d2aa29cd04f12a82d6c5fe5d3540981adaf9faddc97bec0ac2d Elan 1.9.0 guest default_profile valid

def main -> None:  # [main]
  # reusing variable fruit for each new ListImmutable
  fruit = empty ListImmutable<of String> # [variable definition]
  print fruit
  fruit = fruit.withAppend("apple") # [assign variable]
  fruit = fruit.withAppend("pear") # [assign variable]
  print fruit
  print fruit[1]
  print fruit.length()
  print fruit[fruit.length() - 2]
  print fruit.contains("banana")


