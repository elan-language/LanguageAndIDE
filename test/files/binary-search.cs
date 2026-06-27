// C# with Elan 2.0.0-beta1

static void main() {
  var fruit = new [] {"apple", "avocado", "banana", "blueberry", "cherry", "fig", "grape", "kiwi", "lemon", "lychee", "mango", "orange", "papaya", "peach", "pear", "pineapple", "plum", "raspberry", "strawberry", "watermelon"};
  var done = false;
  while (!done) {
    Console.WriteLine("What type of fruit do you want ('x' to exit)? ");

      var wanted = Console.ReadLine(); // input
    if (wanted.equals("x")) {
      done = true; // assignment
    } else {
      var result = binarySearch(fruit, wanted);
      if (result) {
        Console.WriteLine($"\nWe can supply a {wanted}"); // print statement
      } else {
        Console.WriteLine($"\nSorry, we cannot supply a {wanted}"); // print statement
      } // end if
    } // end if
  } // end while
} // end main

static bool binarySearch(List<string> li, string item) { // function
  var result = false;
  if (li.length() > 0) {
    var mid = divAsInt(li.length(), 2);
    var value = li[mid];
    if (item.equals(value)) {
      result = true; // assignment
    } else if (item.isBefore(value)) {
      result = binarySearch(li.subList(0, mid), item); // assignment
    } else {
      result = binarySearch(li.subList(mid + 1, li.length()), item); // assignment
    } // end if
  } // end if
  return result;
} // end function

[TestClass] class Test_binarySearch
[TestMethod] static void test_binarySearch() {
  var li1 = new [] {"lemon", "lime", "orange"};
  Assert.AreEqual(true, binarySearch(li1, "lemon"));
  Assert.AreEqual(true, binarySearch(li1, "lime"));
  Assert.AreEqual(true, binarySearch(li1, "orange"));
  Assert.AreEqual(false, binarySearch(li1, "pear"));
  var li2 = new [] {"lemon", "orange"};
  Assert.AreEqual(true, binarySearch(li2, "lemon"));
  Assert.AreEqual(true, binarySearch(li2, "orange"));
  Assert.AreEqual(false, binarySearch(li2, "pear"));
  var li3 = new [] {"lemon"};
  Assert.AreEqual(true, binarySearch(li3, "lemon"));
  Assert.AreEqual(false, binarySearch(li3, "lime"));
  var li4 = new List<string>();
  Assert.AreEqual(false, binarySearch(li4, "pear"));
}} // end test
