// C# with Elan 2.0.0-alpha4

// Implementation of the Merge sort algorithm demonstrating

// - Decomposition of the principal function 'sort' into smaller functions,

// - Recursive functions. Note that both 'sort' and 'merge' are indirectly  

//   recursive, because they delegate to other functions that invoke the function

//   they are invoked from

// - Testing. ALL functions are independently unit-tested, with normal ('happy')  

//   cases, and edge cases (where appropriate)

static List<string> sort(List<string> li) { // function
  return if(li.length() < 2, li, merge(sortedFrontHalf(li), sortedBackHalf(li)));
} // function

static List<string> sortedFrontHalf(List<string> li) { // function
  var mid = divAsInt(li.length(), 2); // let
  var frontHalf = li.subList(0, mid); // let
  return sort(frontHalf);
} // function

static List<string> sortedBackHalf(List<string> li) { // function
  var mid = divAsInt(li.length(), 2); // let
  var backHalf = li.subList(mid, li.length()); // let
  return sort(backHalf);
} // function

static List<string> merge(List<string> a, List<string> b) { // function
  var oneIsEmpty = (a.length() == 0) || (b.length() == 0); // let
  return if(oneIsEmpty, a.withAppendList(b), mergeNonEmpty(a, b));
} // function

static List<string> mergeNonEmpty(List<string> a, List<string> b) { // function
  var aHead = a.head(); // let
  var bHead = b.head(); // let
  var aTail = a.tail(); // let
  var bTail = b.tail(); // let
  return if(aHead.isBefore(bHead), [aHead].withAppendList(merge(aTail, b)), [bHead].withAppendList(merge(a, bTail)));
} // function

[TestMethod] static void test_sort() {
  // Edge case: empty
  var l1 = new List<string>(); // let
  Assert.AreEqual(l1, sort(l1))
  // Edge case: one item
  var li2 = ["plum"]; // let
  Assert.AreEqual(li2, sort(li2))
  // Happy case: odd number of members
  var li3 = ["plum", "apricot", "lime", "lemon", "melon", "apple", "orange", "strawberry", "pear"]; // let
  var sorted3 = ["apple", "apricot", "lemon", "lime", "melon", "orange", "pear", "plum", "strawberry"]; // let
  Assert.AreEqual(sorted3, sort(li3))
  // Happy case: even number of members
  var li4 = ["plum", "apricot", "lime", "lemon", "melon", "apple", "orange", "strawberry"]; // let
  var sorted4 = ["apple", "apricot", "lemon", "lime", "melon", "orange", "plum", "strawberry"]; // let
  Assert.AreEqual(sorted4, sort(li4))
  // Edge case: already sorted
  var li5 = ["apple", "apricot", "lemon", "lime", "melon", "orange", "pear", "strawberry"]; // let
  Assert.AreEqual(li5, sort(li5))
} // 

[TestMethod] static void test_sortedFrontHalf() {
  // Edge case: one item - so front half is empty
  var li1 = ["plum"]; // let
  Assert.AreEqual(new List<string>(), sortedFrontHalf(li1))
  // Happy case: odd number of members
  var li2 = ["plum", "apricot", "lime", "lemon", "melon", "apple", "orange", "strawberry", "pear"]; // let
  Assert.AreEqual(["apricot", "lemon", "lime", "plum"], sortedFrontHalf(li2))
  // Happy case: even number of members
  var li3 = ["plum", "apricot", "lemon", "melon", "apple", "orange", "strawberry", "pear"]; // let
  Assert.AreEqual(["apricot", "lemon", "melon", "plum"], sortedFrontHalf(li3))
  // Edge case: already sorted
  var li4 = ["apple", "apricot", "lemon", "lime", "melon", "orange", "pear"]; // let
  Assert.AreEqual(["apple", "apricot", "lemon"], sortedFrontHalf(li4))
} // 

[TestMethod] static void test_sortedBackHalf() {
  // Edge case: one item - so back half is whole list
  var li1 = ["plum"]; // let
  Assert.AreEqual(["plum"], sortedBackHalf(li1))
  // Happy case: odd number of members
  var li2 = ["plum", "apricot", "lime", "lemon", "melon", "apple", "orange", "strawberry", "pear"]; // let
  Assert.AreEqual(["apple", "melon", "orange", "pear", "strawberry"], sortedBackHalf(li2))
  // Happy case: even number of members
  var li3 = ["plum", "apricot", "lemon", "melon", "apple", "orange", "strawberry", "pear"]; // let
  Assert.AreEqual(["apple", "orange", "pear", "strawberry"], sortedBackHalf(li3))
  // Edge case: already sorted
  var li4 = ["apple", "apricot", "lemon", "lime", "melon", "orange", "pear"]; // let
  Assert.AreEqual(["lime", "melon", "orange", "pear"], sortedBackHalf(li4))
} // 

[TestMethod] static void test_merge() {
  // Happy cases:
  var l1 = ["apple", "lime", "pear"]; // let
  var l2 = ["apricot", "lemon", "plum", "watermelon"]; // let
  Assert.AreEqual(["melon", "orange"], merge(["orange"], ["melon"]))
  Assert.AreEqual(["apple", "apricot", "lemon", "lime", "pear", "plum", "watermelon"], merge(l1, l2))
  Assert.AreEqual(["apple", "apricot", "lemon", "lime", "pear", "plum", "watermelon"], merge(l2, l1))
  // Edge cases - empty list(s)
  var le = new List<string>(); // let
  Assert.AreEqual(le, merge(le, le))
  Assert.AreEqual(l1, merge(l1, le))
  Assert.AreEqual(l2, merge(le, l2))
  // Edge case - duplication
  Assert.AreEqual(["apple", "apple", "lime", "lime", "pear", "pear"], merge(l1, l1))
  // Error case lists not sorted will not produce correct result
  var lu = ["lime", "pear", "apple"]; // let
  Assert.AreEqual(["apricot", "lemon", "lime", "pear", "apple", "plum", "watermelon"], merge(lu, l2))
  Assert.AreEqual(["lime", "pear", "apple"], merge(lu, le))
} // 

[TestMethod] static void test_mergeNonEmpty() {
  var l1 = ["apple", "lime", "pear"]; // let
  var l2 = ["apricot", "lemon", "plum", "watermelon"]; // let
  Assert.AreEqual(["melon", "orange"], mergeNonEmpty(["orange"], ["melon"]))
  Assert.AreEqual(["apple", "apricot", "lemon", "lime", "pear", "plum", "watermelon"], mergeNonEmpty(l1, l2))
  Assert.AreEqual(["apple", "apricot", "lemon", "lime", "pear", "plum", "watermelon"], mergeNonEmpty(l2, l1))
  Assert.AreEqual(["apple", "apple", "lime", "lime", "pear", "pear"], mergeNonEmpty(l1, l1))
  //  Edge case: duplication
  Assert.AreEqual(["apple", "apple", "lime", "lime", "pear", "pear"], mergeNonEmpty(l1, l1))
  // Edge cases: single elements
  Assert.AreEqual(["apple", "lemon", "lime", "pear"], mergeNonEmpty(l1, ["lemon"]))
  Assert.AreEqual(["apple", "lime", "melon", "pear"], mergeNonEmpty(["melon"], l1))
  // Error case - pass empty list
  Assert.AreEqual("Out of range index: 0 size: 0", mergeNonEmpty(new List<string>(), l1))
  //  Error case unsorted list
  var lu = ["lime", "pear", "apple"]; // let
  Assert.AreEqual(["apricot", "lemon", "lime", "pear", "apple", "plum", "watermelon"], merge(lu, l2))
} // 
