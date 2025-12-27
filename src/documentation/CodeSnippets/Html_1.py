# 9319ba38630d0ac4a468462b5902f76fe582671d0f9d034d90ea672520a06339 Elan 1.9.0 guest default_profile valid

def main -> None:  # [main]
  # original quotes
  displayHtml("<h1 style='color: blue;'>A heading</h1><p>some text</p>") # [call procedure]}
  # 
  pause(1000) # [call procedure]}
  clearHtml() # [call procedure]}
  # 
  # swap quotes: print works, displayHtml() doesn't
  displayHtml('<h1 style="color: blue;">A heading</h1><p>some text</p>') # [call procedure]}
  # 
  pause(1000) # [call procedure]}
  clearHtml() # [call procedure]}
  # 
  s = '<h1 style="color: blue;">A heading</h1><p>some text</p>' # [variable definition]
  print s
  displayHtml(s) # [call procedure]}


