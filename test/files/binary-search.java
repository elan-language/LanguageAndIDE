// Java with Elan 2.0.0-alpha1

static void main() {
  var fruit = ["apple", "avocado", "banana", "blueberry", "cherry", "fig", "grape", "kiwi", "lemon", "lychee", "mango", "orange", "papaya", "peach", "pear", "pineapple", "plum", "raspberry", "strawberry", "watermelon"];
  var done = false;
  while (!done) {
    var wanted = input("What type of fruit do you want ('x' to exit)? ");
    if (wanted.equals("x")) {
      done = true; // change variable
    } else {
      var result = binarySearch(fruit, wanted);
      if (result) {
        print(String.format("\nWe can supply a %", wanted));
      } else {
        print(String.format("\nSorry, we cannot supply a %", wanted));
      }
    }
  }
}

static bool binarySearch(List<String> li, String item) { // function
  var result = false;
  if (li.length() > 0) {
    final Int mid = divAsInt(li.length(), 2); // constant
    var value = li[mid];
    if (item.equals(value)) {
      result = true; // change variable
    } else if (item.isBefore(value)) {
      result = binarySearch(li.subList(0, mid), item); // change variable
    } else {
      result = binarySearch(li.subList(mid + 1, li.length()), item); // change variable
    }
  }
  return result;
}

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
}
