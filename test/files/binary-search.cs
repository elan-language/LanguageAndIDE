// C# with Elan 2.0.0-alpha

static void main() {
  var fruit = ["apple", "avocado", "banana", "blueberry", "cherry", "fig", "grape", "kiwi", "lemon", "lychee", "mango", "orange", "papaya", "peach", "pear", "pineapple", "plum", "raspberry", "strawberry", "watermelon"];
  var done = false;
  while (!done) {
    var wanted = inputString("What type of fruit do you want ('x' to exit)? ");
    if (wanted.equals("x")) {
      done = true; // set
    } else {
      var result = binarySearch(fruit, wanted);
      if (result) {
        print($"\nWe can supply a {wanted}"); // call
      } else {
        print($"\nSorry, we cannot supply a {wanted}"); // call
      }
    }
  }
}

static bool binarySearch(List<string> li, string item) { // function
  var result = false;
  if (li.length() > 0) {
    const Int mid = divAsInt(li.length(), 2);
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

[TestMethod] static void test_binarySearch() {
  var li1 = ["lemon", "lime", "orange"];
  Assert.AreEqual(true, binarySearch(li1, "lemon") 
  Assert.AreEqual(true, binarySearch(li1, "lime") 
  Assert.AreEqual(true, binarySearch(li1, "orange") 
  Assert.AreEqual(false, binarySearch(li1, "pear") 
  var li2 = ["lemon", "orange"];
  Assert.AreEqual(true, binarySearch(li2, "lemon") 
  Assert.AreEqual(true, binarySearch(li2, "orange") 
  Assert.AreEqual(false, binarySearch(li2, "pear") 
  var li3 = ["lemon"];
  Assert.AreEqual(true, binarySearch(li3, "lemon") 
  Assert.AreEqual(false, binarySearch(li3, "lime") 
  var li4 = new List<string>();
  Assert.AreEqual(false, binarySearch(li4, "pear") 
}
