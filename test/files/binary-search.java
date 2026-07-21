// Java with Elan 2.0.0-beta2

public class Global {

static void main() {
  var fruit = list("apple", "avocado", "banana", "blueberry", "cherry", "fig", "grape", "kiwi", "lemon", "lychee", "mango", "orange", "papaya", "peach", "pear", "pineapple", "plum", "raspberry", "strawberry", "watermelon");
  var done = false;
  while (!done) {
    var wanted = Console.ReadLine("What type of fruit do you want ('x' to exit)? "); // input statement
    if (wanted.equals("x")) {
      done = true; // assignment
    } else {
      var result = binarySearch(fruit, wanted);
      if (result) {
        System.out.println(String.format("\nWe can supply a %", wanted)); // print statement
      } else {
        System.out.println(String.format("\nSorry, we cannot supply a %", wanted)); // print statement
      } // end if
    } // end if
  } // end while
} // end main

static boolean binarySearch(List<String> li, String item) { // function
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

class Test_binarySearch {
@Test static void test_binarySearch() {
  var li1 = list("lemon", "lime", "orange");
  assertEquals(true, binarySearch(li1, "lemon"));
  assertEquals(true, binarySearch(li1, "lime"));
  assertEquals(true, binarySearch(li1, "orange"));
  assertEquals(false, binarySearch(li1, "pear"));
  var li2 = list("lemon", "orange");
  assertEquals(true, binarySearch(li2, "lemon"));
  assertEquals(true, binarySearch(li2, "orange"));
  assertEquals(false, binarySearch(li2, "pear"));
  var li3 = list("lemon");
  assertEquals(true, binarySearch(li3, "lemon"));
  assertEquals(false, binarySearch(li3, "lime"));
  var li4 = new List<String>();
  assertEquals(false, binarySearch(li4, "pear"));
}} // end test
} // end Global
