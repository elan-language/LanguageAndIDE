// C# with Elan 2.0.0-beta-pre1

// Implementation of the Merge sort algorithm demonstrating

// - Decomposition of the principal function 'sort' into smaller functions,

// - Recursive functions. Note that both 'sort' and 'merge' are indirectly  

//   recursive, because they delegate to other functions that invoke the function

//   they are invoked from

// - Testing. ALL functions are independently unit-tested, with normal ('happy')  

//   cases, and edge cases (where appropriate)

static List<string> sort(List<string> li) { // function
  return if_(li.length() < 2, li, merge(sortedFrontHalf(li), sortedBackHalf(li)));
} // end function

static List<string> sortedFrontHalf(List<string> li) { // function
  var mid = divAsInt(li.length(), 2); // let
  var frontHalf = li.subList(0, mid); // let
  return sort(frontHalf);
} // end function

static List<string> sortedBackHalf(List<string> li) { // function
  var mid = divAsInt(li.length(), 2); // let
  var backHalf = li.subList(mid, li.length()); // let
  return sort(backHalf);
} // end function

static List<string> merge(List<string> a, List<string> b) { // function
  var oneIsEmpty = (a.length() == 0) || (b.length() == 0); // let
  return if_(oneIsEmpty, a.withAppendList(b), mergeNonEmpty(a, b));
} // end function

static List<string> mergeNonEmpty(List<string> a, List<string> b) { // function
  var aHead = a.head(); // let
  var bHead = b.head(); // let
  var aTail = a.tail(); // let
  var bTail = b.tail(); // let
  return if_(aHead.isBefore(bHead), new [] {aHead}.withAppendList(merge(aTail, b)), new [] {bHead}.withAppendList(merge(a, bTail)));
} // end function

[TestMethod] static void test_sort() {
  // Edge case: empty
  var l1 = new List<string>(); // let
  Assert.AreEqual(l1, sort(l1));
  // Edge case: one item
  var li2 = new [] {"plum"}; // let
  Assert.AreEqual(li2, sort(li2));
  // Happy case: odd number of members
  var li3 = new [] {"plum", "apricot", "lime", "lemon", "melon", "apple", "orange", "strawberry", "pear"}; // let
  var sorted3 = new [] {"apple", "apricot", "lemon", "lime", "melon", "orange", "pear", "plum", "strawberry"}; // let
  Assert.AreEqual(sorted3, sort(li3));
  // Happy case: even number of members
  var li4 = new [] {"plum", "apricot", "lime", "lemon", "melon", "apple", "orange", "strawberry"}; // let
  var sorted4 = new [] {"apple", "apricot", "lemon", "lime", "melon", "orange", "plum", "strawberry"}; // let
  Assert.AreEqual(sorted4, sort(li4));
  // Edge case: already sorted
  var li5 = new [] {"apple", "apricot", "lemon", "lime", "melon", "orange", "pear", "strawberry"}; // let
  Assert.AreEqual(li5, sort(li5));
} // end test

[TestMethod] static void test_sortedFrontHalf() {
  // Edge case: one item - so front half is empty
  var li1 = new [] {"plum"}; // let
  Assert.AreEqual(new List<string>(), sortedFrontHalf(li1));
  // Happy case: odd number of members
  var li2 = new [] {"plum", "apricot", "lime", "lemon", "melon", "apple", "orange", "strawberry", "pear"}; // let
  Assert.AreEqual(new [] {"apricot", "lemon", "lime", "plum"}, sortedFrontHalf(li2));
  // Happy case: even number of members
  var li3 = new [] {"plum", "apricot", "lemon", "melon", "apple", "orange", "strawberry", "pear"}; // let
  Assert.AreEqual(new [] {"apricot", "lemon", "melon", "plum"}, sortedFrontHalf(li3));
  // Edge case: already sorted
  var li4 = new [] {"apple", "apricot", "lemon", "lime", "melon", "orange", "pear"}; // let
  Assert.AreEqual(new [] {"apple", "apricot", "lemon"}, sortedFrontHalf(li4));
} // end test

[TestMethod] static void test_sortedBackHalf() {
  // Edge case: one item - so back half is whole list
  var li1 = new [] {"plum"}; // let
  Assert.AreEqual(new [] {"plum"}, sortedBackHalf(li1));
  // Happy case: odd number of members
  var li2 = new [] {"plum", "apricot", "lime", "lemon", "melon", "apple", "orange", "strawberry", "pear"}; // let
  Assert.AreEqual(new [] {"apple", "melon", "orange", "pear", "strawberry"}, sortedBackHalf(li2));
  // Happy case: even number of members
  var li3 = new [] {"plum", "apricot", "lemon", "melon", "apple", "orange", "strawberry", "pear"}; // let
  Assert.AreEqual(new [] {"apple", "orange", "pear", "strawberry"}, sortedBackHalf(li3));
  // Edge case: already sorted
  var li4 = new [] {"apple", "apricot", "lemon", "lime", "melon", "orange", "pear"}; // let
  Assert.AreEqual(new [] {"lime", "melon", "orange", "pear"}, sortedBackHalf(li4));
} // end test

[TestMethod] static void test_merge() {
  // Happy cases:
  var l1 = new [] {"apple", "lime", "pear"}; // let
  var l2 = new [] {"apricot", "lemon", "plum", "watermelon"}; // let
  Assert.AreEqual(new [] {"melon", "orange"}, merge(new [] {"orange"}, new [] {"melon"}));
  Assert.AreEqual(new [] {"apple", "apricot", "lemon", "lime", "pear", "plum", "watermelon"}, merge(l1, l2));
  Assert.AreEqual(new [] {"apple", "apricot", "lemon", "lime", "pear", "plum", "watermelon"}, merge(l2, l1));
  // Edge cases - empty list(s)
  var le = new List<string>(); // let
  Assert.AreEqual(le, merge(le, le));
  Assert.AreEqual(l1, merge(l1, le));
  Assert.AreEqual(l2, merge(le, l2));
  // Edge case - duplication
  Assert.AreEqual(new [] {"apple", "apple", "lime", "lime", "pear", "pear"}, merge(l1, l1));
  // Error case lists not sorted will not produce correct result
  var lu = new [] {"lime", "pear", "apple"}; // let
  Assert.AreEqual(new [] {"apricot", "lemon", "lime", "pear", "apple", "plum", "watermelon"}, merge(lu, l2));
  Assert.AreEqual(new [] {"lime", "pear", "apple"}, merge(lu, le));
} // end test

[TestMethod] static void test_mergeNonEmpty() {
  var l1 = new [] {"apple", "lime", "pear"}; // let
  var l2 = new [] {"apricot", "lemon", "plum", "watermelon"}; // let
  Assert.AreEqual(new [] {"melon", "orange"}, mergeNonEmpty(new [] {"orange"}, new [] {"melon"}));
  Assert.AreEqual(new [] {"apple", "apricot", "lemon", "lime", "pear", "plum", "watermelon"}, mergeNonEmpty(l1, l2));
  Assert.AreEqual(new [] {"apple", "apricot", "lemon", "lime", "pear", "plum", "watermelon"}, mergeNonEmpty(l2, l1));
  Assert.AreEqual(new [] {"apple", "apple", "lime", "lime", "pear", "pear"}, mergeNonEmpty(l1, l1));
  //  Edge case: duplication
  Assert.AreEqual(new [] {"apple", "apple", "lime", "lime", "pear", "pear"}, mergeNonEmpty(l1, l1));
  // Edge cases: single elements
  Assert.AreEqual(new [] {"apple", "lemon", "lime", "pear"}, mergeNonEmpty(l1, new [] {"lemon"}));
  Assert.AreEqual(new [] {"apple", "lime", "melon", "pear"}, mergeNonEmpty(new [] {"melon"}, l1));
  // Error case - pass empty list
  Assert.AreEqual("Out of range index: 0 size: 0", mergeNonEmpty(new List<string>(), l1));
  //  Error case unsorted list
  var lu = new [] {"lime", "pear", "apple"}; // let
  Assert.AreEqual(new [] {"apricot", "lemon", "lime", "pear", "apple", "plum", "watermelon"}, merge(lu, l2));
} // end test
