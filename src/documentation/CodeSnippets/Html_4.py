# 28dea9ee05c246a207f5db2a583b4cde69517c5c102d982cb215c5b1055fc69d Elan 1.9.0 guest default_profile valid

def main -> None:  # [main]
  pic = "<img src='https://upload.wikimedia.org/wikipedia/commons/0/08/Corl0207_%2828225976491%29.jpg'\nwidth='400' height='200'\ntitle='shark' alt='shark'>" # [variable definition]
  displayHtml(pic) # [call procedure]}
  print "\n\npic"
  pause(2000) # [call procedure]}
  clearHtml() # [call procedure]}
  # swap quotes: not working in 1.4.0
  pic2 = '<img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Corl0207_%2828225976491%29.jpg" \n width="400" height="200" \n title="shark" alt="shark">' # [variable definition]
  displayHtml(pic2) # [call procedure]}
  print "pic2"


