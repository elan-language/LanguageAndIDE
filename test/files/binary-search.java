// Java with Elan 2.0.0-alpha

static void main() {
  var fruit = ["apple", "avocado", "banana", "blueberry", "cherry", "fig", "grape", "kiwi", "lemon", "lychee", "mango", "orange", "papaya", "peach", "pear", "pineapple", "plum", "raspberry", "strawberry", "watermelon"];
  var done = false;
  while (not done) {
    var wanted = inputString("What type of fruit do you want ('x' to exit)? ");
    if (wanted.equals("x")) {
      done = true; // set
    } else {
      var result = binarySearch(fruit, wanted);
      if (result) {
        print("\nWe can supply a " + (wanted).asString() + ""); // call
      } else {
        print("\nSorry, we cannot supply a " + (wanted).asString() + ""); // call
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
      result = true; // set
    } else if (item.isBefore(value)) {
      result = binarySearch(li.subList(0, mid), item); // set
    } else {
      result = binarySearch(li.subList(mid + 1, li.length()), item); // set
    }
  }
  return result;
}

static void test_() {
  var li1 = ["lemon", "lime", "orange"];
  assert binarySearch(li1, "lemon") is true 
  assert binarySearch(li1, "lime") is true 
  assert binarySearch(li1, "orange") is true 
  assert binarySearch(li1, "pear") is false 
  var li2 = ["lemon", "orange"];
  assert binarySearch(li2, "lemon") is true 
  assert binarySearch(li2, "orange") is true 
  assert binarySearch(li2, "pear") is false 
  var li3 = ["lemon"];
  assert binarySearch(li3, "lemon") is true 
  assert binarySearch(li3, "lime") is false 
  var li4 = new List<String>();
  assert binarySearch(li4, "pear") is false 
}
