// Java with Elan 2.0.0-beta1

public class Global {

static void main() {
  var li = list(7, 1, 0, 4, 8, 3, 6);
  System.out.println(li); // print
  inPlaceRippleSort(li); // call procedure
  System.out.println(li); // print
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
} // end Global
