// Java with Elan 2.0.0-alpha1

static void main() {
  var li = [7, 1, 0, 4, 8, 3, 6];
  print(li);
  inPlaceRippleSort(li); // call procedure
  print(li);
}

static void inPlaceRippleSort(List<int> li) { // procedure
  var hasChanged = true;
  var lastComp = li.length() - 2;
  while (hasChanged == true) {
    hasChanged = false; // change variable
    foreach (i in range(0, lastComp + 1)) {
      if (li[i] > li[i + 1]) {
        var temp = li[i];
        li[i] = li[i + 1]; // change variable
        li[i + 1] = temp; // change variable
        hasChanged = true; // change variable
      }
    }
    lastComp = lastComp - 1; // change variable
  }
}
