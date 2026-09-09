// Java with Elan 2.0.0-beta4

public class Global {

// Hodgepodge, after M.Gerhardt, H.Schuster, J.Tyson (1990)  

// A Cellular Automaton Model of Excitable Media

//  

// gW, gH : grid width, height

static final Int gW = 40; // constant

static final Int gH = 30; // constant

// iR : infection rate (1..20)

static final Int iR = 1; // constant

// w1, w2 : weighting factors (low integers)

static final Int w1 = 4; // constant

static final Int w2 = 1; // constant

// colours : cellColour.s in descending order of RGB value

// state : of a cell is colours.indexOf(cellColour) in [0..colours.length() - 1]

// colours[0] = healthy; colours[colours.length() - 1] = ill, otherwise infected

static final Int healthy = white; // constant

static final Int ill = black; // constant

static List<int> getColours() { // function
  return list(healthy, 0xffe6ff, 0xffccff, 0xffb3ff, 0xff99ff, 0xff80ff, 0xff66ff, 0xff4dff, 0xff33ff, 0xff1aff, 0xff00ff, 0xe600e6, 0xcc00cc, 0xb300b3, 0x990099, 0x800080, 0x660066, 0x4d004d, 0x330033, 0x1a001a, ill);
} // end function

// vN : neighbourhood: von Neumann (4) true, Moore (8) false

static final Boolean vN = false; // constant

static void main() {
  // colour grids: hodge for display, podge for working
  var podge = new BlockGraphics();
  var hodge = new BlockGraphics();
  var blank = new BlockGraphics();
  // initial colours of grid
  updateGrid(hodge, podge, true); // procedure call
  while (!uniform(hodge)) {
    // successive updates to grid in blank podge
    podge = blank; // assignment
    updateGrid(hodge, podge, false); // procedure call
  } // end while
} // end main

static void updateGrid(BlockGraphics hodge, BlockGraphics podge, boolean initial) { // procedure
  var colours = getColours();
  foreach (var j in range(0, gH)) {
    foreach (var i in range(0, gW)) {
      if (initial) {
        podge.put(i, j, colours[randint(0, (colours.length()) - 1)]); // procedure call
        podge[1][1] = 0x1a001a; // assignment
      } else {
        podge.put(i, j, newColour(getNeighbourColours(hodge, i, j), hodge.get(i, j))); // procedure call
      } // end if
    } // end foreach
  } // end foreach
  var a = 0;
  // copy podgeValues into hodge
  foreach (var j in range(0, gH)) {
    foreach (var i in range(0, gW)) {
      var podgeValue = podge.get(i, j);
      hodge.put(i, j, podgeValue); // procedure call
    } // end foreach
  } // end foreach
  hodge.display(); // procedure call
  sleep_ms(50); // procedure call
} // end procedure

static boolean uniform(BlockGraphics grid) { // function
  var cell0 = grid.get(0, 0);
  var isUniform = true;
  foreach (var j in range(0, gH)) {
    foreach (var i in range(0, gW)) {
      if (grid.get(i, j) == cell0) {
        isUniform = false; // assignment
      } // end if
    } // end foreach
  } // end foreach
  return isUniform;
} // end function

static List<int> getNeighbourColours(BlockGraphics grid, int i, int j) { // function
  // grid wraps around: all cells have the same number of neighbours
  // H and V neighbours(von Neumann)
  var sL = grid.get((i - 1 + gW) % gW, j);
  var sR = grid.get((i + 1 + gW) % gW, j);
  var sA = grid.get(i, (j - 1 + gH) % gH);
  var sB = grid.get(i, (j + 1 + gH) % gH);
  var neighbourColours = list(sL, sR, sA, sB);
  if (vN == false) {
    // add diagonal neighbours (Moore)
    var sLA = grid.get((i - 1 + gW) % gW, (j - 1 + gH) % gH);
    var sRA = grid.get((i + 1 + gW) % gW, (j - 1 + gH) % gH);
    var sLB = grid.get((i - 1 + gW) % gW, (j + 1 + gH) % gH);
    var sRB = grid.get((i + 1 + gW) % gW, (j + 1 + gH) % gH);
    neighbourColours = list(sL, sR, sA, sB, sLA, sRA, sLB, sRB); // assignment
  } // end if
  return neighbourColours;
} // end function

static int newColour(List<int> neighbourColours, int nowColour) { // function
  var colours = getColours();
  var nInfected = 0;
  var nIll = 0;
  var sumStates = colours.indexOf(nowColour);
  foreach (var colour in neighbourColours) {
    sumStates = sumStates + colours.indexOf(colour); // assignment
    if (colour < healthy) {
      nInfected = nInfected + 1; // assignment
      if (colour == ill) {
        nIll = nIll + 1; // assignment
      } // end if
    } // end if
  } // end foreach
  return updateColour(nowColour, sumStates, nInfected, nIll);
} // end function

static int updateColour(int nowColour, int sumStates, int nInfected, int nIll) { // function
  var colours = getColours();
  var state = 0;
  if (nowColour == healthy) {
    state = divAsInt(nInfected, w1) + divAsInt(nIll, w2); // assignment
  } else if (nowColour != ill) {
    state = divAsInt(sumStates, (nInfected + 1)) + iR; // assignment
  } // end if
  return if_(state > (colours.length() - 1), ill, colours[state]);
} // end function
} // end Global
