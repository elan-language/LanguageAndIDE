// C# with Elan 2.0.0-beta-pre1

static void main() {
  var li = new [] {7, 1, 0, 4, 8, 3, 6};
  Console.WriteLine(li); // print
  inPlaceRippleSort(li); // call procedure
  Console.WriteLine(li); // print
} // end main

static void inPlaceRippleSort(List<int> li) { // procedure
  var hasChanged = true;
  var lastComp = li.length() - 2;
  while (hasChanged == true) {
    hasChanged = false; // reassign variable
    foreach (var i in range(0, lastComp + 1)) {
      if (li[i] > li[i + 1]) {
        var temp = li[i];
        li[i] = li[i + 1]; // reassign variable
        li[i + 1] = temp; // reassign variable
        hasChanged = true; // reassign variable
      } // end if
    } // end foreach
    lastComp = lastComp - 1; // reassign variable
  } // end while
} // end procedure
