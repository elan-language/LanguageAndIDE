// Java with Elan 2.0.0-beta

public class Global {

static void main() {
  var li = list(7, 1, 0, 4, 8, 3, 6);
  System.out.println(li); // print
  inPlaceRippleSort(li); // call procedure
  System.out.println(li); // print
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

}
