// Java with Elan 2.0.0-alpha5

static void main() {
  var li = [7, 1, 0, 4, 8, 3, 6];
  print(li);
  inPlaceRippleSort(li); // call procedure
  print(li);
} // main

static void inPlaceRippleSort(List<int> li) { // procedure
  var hasChanged = true;
  var lastComp = li.length() - 2;
  while (hasChanged == true) {
    hasChanged = false; // reassign variable
    foreach (i in range(0, lastComp + 1)) {
      if (li[i] > li[i + 1]) {
        var temp = li[i];
        li[i] = li[i + 1]; // reassign variable
        li[i + 1] = temp; // reassign variable
        hasChanged = true; // reassign variable
      } // if
    } // foreach
    lastComp = lastComp - 1; // reassign variable
  } // while
} // procedure
