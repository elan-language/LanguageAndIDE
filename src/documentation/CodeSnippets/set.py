# 48df8eeaff4934d20d69b8515d65b09d2e1d3a9ecae6745af761ae6446bd9772 Elan 1.9.0 guest default_profile valid

def main -> None:  # [main]
  st = new Set<of Int>() # [variable definition]
  st = st.addFromList([3, 5, 7]) # [assign variable]
  print st.length()
  st = st.add(7) # [assign variable]
  print st.length()
  st = st.remove(3) # [assign variable]
  print st.length()
  st = st.remove(3) # [assign variable]
  print st.length()
  print st


