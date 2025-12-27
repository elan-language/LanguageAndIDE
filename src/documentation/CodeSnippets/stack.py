# 69079c7123737b3eef7e263c58f65e27e03e2fb1200dbc9d8a64e4662f740df9 Elan 1.9.0 guest default_profile valid

def main -> None:  # [main]
  st = new Stack<of String>() # [variable definition]
  print st.length()
  st = st.push("apple") # [assign variable]
  st = st.push("Pear") # [assign variable]
  print st.length()
  print st.peek()
  fruit = "" # [variable definition]
  fruit, st = st.pop() # [assign variable]
  print fruit
  fruit, st = st.pop() # [assign variable]
  print fruit
  print st.length()


