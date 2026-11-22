# fbb128072dd48d6cc6a1f13740dcc35d83105961e0b046773da6e0a8d736ff35 Python with Elan 2.0.0-beta5 valid

def main() -> None:
  x = 1
  while x > 0:
    x = inputInt("Enter a starting number (0 to quit)")
    # Array of the values we have seen so far
    p = [x]
    # capture the max value so we can scale the graph
    max = x
    while x > 1:
      # Collatz sequence
      if (x % 2) == 0:
        x = divAsInt(x, 2)
      else:
        x = x*3 + 1
       
      # end if 
      if x > max:
        max = x
      # end if 
      p.append(x)
      # draw what we have got so far, scaled to the canvas
      vg = createVectorGraphics()
      for i in range(0, p.length() - 1):
        vg = vg.withAppend((LineVG()).withX1(scx(i, p)).withY1(scy(p[i], max)).withX2(scx(i + 1, p)).withY2(scy(p[i + 1], max)).withStrokeWidth(1))
      # end for 
      displayVectorGraphics(vg)
      print(x)
      sleep_ms(100)
    # end while 
  # end while 
  print("Finished")
# end main 

# scale x.  We pass in p just to get its length

def scx(i: int, p: list[int]) -> float:
  return divAsFloat(i*100, p.length())
# end function 

# scale y

# subtract from 70 because y increases down the canvas

# subtract 1 so that 1 is always at the same place on the canvas

def scy(pi: int, max: int) -> float:
  return 70 - divAsFloat((pi - 1)*65, (max - 1))
# end function 

grey = 0x808080

main()
