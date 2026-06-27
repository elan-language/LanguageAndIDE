// Java with Elan 2.0.0-beta1

public class Global {

static void main() {
  var li = list(7, 1, 0, 4, 8, 3, 6);
  System.out.println(li); // print statement
  inPlaceRippleSort(li); // call procedure
  System.out.println(li); // print statement
} // end main

static void inPlaceRippleSort(List<int> li) { // procedure
  var hasChanged = true;
  var lastComp = li.length() - 2;
  while (hasChanged == true) {
    hasChanged = false; // assignment
    foreach (var i in range(0, lastComp + 1)) {
      if (li[i] > li[i + 1]) {
        var temp = li[i];
        li[i] = li[i + 1]; // assignment
        li[i + 1] = temp; // assignment
        hasChanged = true; // assignment
      } // end if
    } // end foreach
    lastComp = lastComp - 1; // assignment
  } // end while
} // end procedure
} // end Global
