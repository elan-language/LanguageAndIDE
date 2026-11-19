# 2be70c2019582dc122d83f7eebcd6436e5bd755490c39ea133c2f9c86bfc4f62 Python with Elan 2.0.0-beta5 valid

def main() -> None:
  fruit = ["apple", "avocado", "banana", "blueberry", "cherry", "fig", "grape", "kiwi", "lemon", "lychee", "mango", "orange", "papaya", "peach", "pear", "pineapple", "plum", "raspberry", "strawberry", "watermelon"]
  done = false
  while not done:
    wanted = input("What type of fruit do you want ('x' to exit)? ")
    if wanted.equals("x"):
      done = true
    else:
      result = binarySearch(fruit, wanted)
      if result:
        print(f" {wanted}")
      else:
        print(f" {wanted}")
       
      # end if 
     
    # end if 
  # end while 
# end main 

def binarySearch(li: list[str], item: str) -> bool:
  result = false
  if li.length() > 0:
    mid = divAsInt(li.length(), 2)
    value = li[mid]
    if item.equals(value):
      result = true
    elif item.isBefore(value):
      result = binarySearch(li.subList(0, mid), item)
     
    else:
      result = binarySearch(li.subList(mid + 1, li.length()), item)
     
    # end if 
  # end if 
  return result
# end function 

class Test_binarySearch(unittest.TestCase): def test_binarySearch(self) -> None:
  li1 = ["lemon", "lime", "orange"]
  self.assertEqual(binarySearch(li1, "lemon"), true)
  self.assertEqual(binarySearch(li1, "lime"), true)
  self.assertEqual(binarySearch(li1, "orange"), true)
  self.assertEqual(binarySearch(li1, "pear"), false)
  li2 = ["lemon", "orange"]
  self.assertEqual(binarySearch(li2, "lemon"), true)
  self.assertEqual(binarySearch(li2, "orange"), true)
  self.assertEqual(binarySearch(li2, "pear"), false)
  li3 = ["lemon"]
  self.assertEqual(binarySearch(li3, "lemon"), true)
  self.assertEqual(binarySearch(li3, "lime"), false)
  li4 = list[str]()
  self.assertEqual(binarySearch(li4, "pear"), false)
# end test 

main()
