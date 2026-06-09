// Java with Elan 2.0.0-alpha5

public class Global {

// Implementation of the Merge sort algorithm demonstrating

// - Decomposition of the principal function 'sort' into smaller functions,

// - Recursive functions. Note that both 'sort' and 'merge' are indirectly  

//   recursive, because they delegate to other functions that invoke the function

//   they are invoked from

// - Testing. ALL functions are independently unit-tested, with normal ('happy')  

//   cases, and edge cases (where appropriate)

static List<String> sort(List<String> li) { // function
  return if(li.length() < 2, li, merge(sortedFrontHalf(li), sortedBackHalf(li)));
} // function

static List<String> sortedFrontHalf(List<String> li) { // function
  var mid = divAsInt(li.length(), 2); // let
  var frontHalf = li.subList(0, mid); // let
  return sort(frontHalf);
} // function

static List<String> sortedBackHalf(List<String> li) { // function
  var mid = divAsInt(li.length(), 2); // let
  var backHalf = li.subList(mid, li.length()); // let
  return sort(backHalf);
} // function

static List<String> merge(List<String> a, List<String> b) { // function
  var oneIsEmpty = (a.length() == 0) || (b.length() == 0); // let
  return if(oneIsEmpty, a.withAppendList(b), mergeNonEmpty(a, b));
} // function

static List<String> mergeNonEmpty(List<String> a, List<String> b) { // function
  var aHead = a.head(); // let
  var bHead = b.head(); // let
  var aTail = a.tail(); // let
  var bTail = b.tail(); // let
  return if(aHead.isBefore(bHead), [aHead].withAppendList(merge(aTail, b)), [bHead].withAppendList(merge(a, bTail)));
} // function

@Test static void test_sort() {
  // Edge case: empty
  var l1 = new List<String>(); // let
  assertEquals(l1, sort(l1));
  // Edge case: one item
  var li2 = ["plum"]; // let
  assertEquals(li2, sort(li2));
  // Happy case: odd number of members
  var li3 = ["plum", "apricot", "lime", "lemon", "melon", "apple", "orange", "strawberry", "pear"]; // let
  var sorted3 = ["apple", "apricot", "lemon", "lime", "melon", "orange", "pear", "plum", "strawberry"]; // let
  assertEquals(sorted3, sort(li3));
  // Happy case: even number of members
  var li4 = ["plum", "apricot", "lime", "lemon", "melon", "apple", "orange", "strawberry"]; // let
  var sorted4 = ["apple", "apricot", "lemon", "lime", "melon", "orange", "plum", "strawberry"]; // let
  assertEquals(sorted4, sort(li4));
  // Edge case: already sorted
  var li5 = ["apple", "apricot", "lemon", "lime", "melon", "orange", "pear", "strawberry"]; // let
  assertEquals(li5, sort(li5));
} // test

@Test static void test_sortedFrontHalf() {
  // Edge case: one item - so front half is empty
  var li1 = ["plum"]; // let
  assertEquals(new List<String>(), sortedFrontHalf(li1));
  // Happy case: odd number of members
  var li2 = ["plum", "apricot", "lime", "lemon", "melon", "apple", "orange", "strawberry", "pear"]; // let
  assertEquals(["apricot", "lemon", "lime", "plum"], sortedFrontHalf(li2));
  // Happy case: even number of members
  var li3 = ["plum", "apricot", "lemon", "melon", "apple", "orange", "strawberry", "pear"]; // let
  assertEquals(["apricot", "lemon", "melon", "plum"], sortedFrontHalf(li3));
  // Edge case: already sorted
  var li4 = ["apple", "apricot", "lemon", "lime", "melon", "orange", "pear"]; // let
  assertEquals(["apple", "apricot", "lemon"], sortedFrontHalf(li4));
} // test

@Test static void test_sortedBackHalf() {
  // Edge case: one item - so back half is whole list
  var li1 = ["plum"]; // let
  assertEquals(["plum"], sortedBackHalf(li1));
  // Happy case: odd number of members
  var li2 = ["plum", "apricot", "lime", "lemon", "melon", "apple", "orange", "strawberry", "pear"]; // let
  assertEquals(["apple", "melon", "orange", "pear", "strawberry"], sortedBackHalf(li2));
  // Happy case: even number of members
  var li3 = ["plum", "apricot", "lemon", "melon", "apple", "orange", "strawberry", "pear"]; // let
  assertEquals(["apple", "orange", "pear", "strawberry"], sortedBackHalf(li3));
  // Edge case: already sorted
  var li4 = ["apple", "apricot", "lemon", "lime", "melon", "orange", "pear"]; // let
  assertEquals(["lime", "melon", "orange", "pear"], sortedBackHalf(li4));
} // test

@Test static void test_merge() {
  // Happy cases:
  var l1 = ["apple", "lime", "pear"]; // let
  var l2 = ["apricot", "lemon", "plum", "watermelon"]; // let
  assertEquals(["melon", "orange"], merge(["orange"], ["melon"]));
  assertEquals(["apple", "apricot", "lemon", "lime", "pear", "plum", "watermelon"], merge(l1, l2));
  assertEquals(["apple", "apricot", "lemon", "lime", "pear", "plum", "watermelon"], merge(l2, l1));
  // Edge cases - empty list(s)
  var le = new List<String>(); // let
  assertEquals(le, merge(le, le));
  assertEquals(l1, merge(l1, le));
  assertEquals(l2, merge(le, l2));
  // Edge case - duplication
  assertEquals(["apple", "apple", "lime", "lime", "pear", "pear"], merge(l1, l1));
  // Error case lists not sorted will not produce correct result
  var lu = ["lime", "pear", "apple"]; // let
  assertEquals(["apricot", "lemon", "lime", "pear", "apple", "plum", "watermelon"], merge(lu, l2));
  assertEquals(["lime", "pear", "apple"], merge(lu, le));
} // test

@Test static void test_mergeNonEmpty() {
  var l1 = ["apple", "lime", "pear"]; // let
  var l2 = ["apricot", "lemon", "plum", "watermelon"]; // let
  assertEquals(["melon", "orange"], mergeNonEmpty(["orange"], ["melon"]));
  assertEquals(["apple", "apricot", "lemon", "lime", "pear", "plum", "watermelon"], mergeNonEmpty(l1, l2));
  assertEquals(["apple", "apricot", "lemon", "lime", "pear", "plum", "watermelon"], mergeNonEmpty(l2, l1));
  assertEquals(["apple", "apple", "lime", "lime", "pear", "pear"], mergeNonEmpty(l1, l1));
  //  Edge case: duplication
  assertEquals(["apple", "apple", "lime", "lime", "pear", "pear"], mergeNonEmpty(l1, l1));
  // Edge cases: single elements
  assertEquals(["apple", "lemon", "lime", "pear"], mergeNonEmpty(l1, ["lemon"]));
  assertEquals(["apple", "lime", "melon", "pear"], mergeNonEmpty(["melon"], l1));
  // Error case - pass empty list
  assertEquals("Out of range index: 0 size: 0", mergeNonEmpty(new List<String>(), l1));
  //  Error case unsorted list
  var lu = ["lime", "pear", "apple"]; // let
  assertEquals(["apricot", "lemon", "lime", "pear", "apple", "plum", "watermelon"], merge(lu, l2));
} // test

}
