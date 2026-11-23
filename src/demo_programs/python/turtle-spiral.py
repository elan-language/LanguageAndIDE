# 5e7209227e0efde5a3436557915c034db774889f9f01c260ebeb14148c846d1d Python with Elan 2.0.0-beta5 valid

def main() -> None:
  t = Turtle()
  t.placeAt(-100, 75)
  t.turnToHeading(90)
  for i in rangeInSteps(150, -1, -5):
    t.move(i)
    t.turn(90)
    sleep_ms(300)
  # end for 
# end main 

main()
