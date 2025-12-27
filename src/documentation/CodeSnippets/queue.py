# 875df23a83a9450f238b216eb003018534ebd1c2298826829623334730561811 Elan 1.9.0 guest default_profile valid

def main -> None:  # [main]
  qu = new Queue<of String>() # [variable definition]
  print qu.length()
  qu = qu.enqueue("apple") # [assign variable]
  qu = qu.enqueue("Pear") # [assign variable]
  print qu.length()
  print qu.peek()
  fruit = "" # [variable definition]
  fruit, qu = qu.dequeue() # [assign variable]
  print fruit
  fruit, qu = qu.dequeue() # [assign variable]
  print fruit
  print qu.length()


