// C# with Elan 2.0.0-alpha

static void main() {
  var li = [7, 1, 0, 4, 8, 3, 6];
  print(li); // call
  inPlaceRippleSort(li); // call
  print(li); // call
}

static void inPlaceRippleSort(List<int> li) { // procedure
  var hasChanged = true;
  var lastComp = li.length() - 2;
  while (hasChanged == true) {
    hasChanged = false; // set
    foreach (i in range(0, lastComp + 1)) {
      if (li[i] > li[i + 1]) {
        var temp = li[i];
        li[i] = li[i + 1]; // set
        li[i + 1] = temp; // set
        hasChanged = true; // set
      }
    }
    lastComp = lastComp - 1; // set
  }
}
