// Java with Elan 2.0.0-alpha5

static void main() {
  var fruit = ["apple", "avocado", "banana", "blueberry", "cherry", "fig", "grape", "kiwi", "lemon", "lychee", "mango", "orange", "papaya", "peach", "pear", "pineapple", "plum", "raspberry", "strawberry", "watermelon"];
  var done = false;
  while (!done) {
    var wanted = input("What type of fruit do you want ('x' to exit)? ");
    if (wanted.equals("x")) {
      done = true; // reassign variable
    } else {
      var result = binarySearch(fruit, wanted);
      if (result) {
        print(String.format("\nWe can supply a %", wanted));
      } else {
        print(String.format("\nSorry, we cannot supply a %", wanted));
      } // if
    } // if
  } // while
} // main

static bool binarySearch(List<String> li, String item) { // function
  var result = false;
  if (li.length() > 0) {
    var mid = divAsInt(li.length(), 2);
    var value = li[mid];
    if (item.equals(value)) {
      result = true; // reassign variable
    } else if (item.isBefore(value)) {
      result = binarySearch(li.subList(0, mid), item); // reassign variable
    } else {
      result = binarySearch(li.subList(mid + 1, li.length()), item); // reassign variable
    } // if
  } // if
  return result;
} // function

@Test static void test_binarySearch() {
  var li1 = ["lemon", "lime", "orange"];
  assertEquals(true, binarySearch(li1, "lemon"))
  assertEquals(true, binarySearch(li1, "lime"))
  assertEquals(true, binarySearch(li1, "orange"))
  assertEquals(false, binarySearch(li1, "pear"))
  var li2 = ["lemon", "orange"];
  assertEquals(true, binarySearch(li2, "lemon"))
  assertEquals(true, binarySearch(li2, "orange"))
  assertEquals(false, binarySearch(li2, "pear"))
  var li3 = ["lemon"];
  assertEquals(true, binarySearch(li3, "lemon"))
  assertEquals(false, binarySearch(li3, "lime"))
  var li4 = new List<String>();
  assertEquals(false, binarySearch(li4, "pear"))
} // test
