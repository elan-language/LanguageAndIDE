// Java with Elan 2.0.0-beta

public class Global {

// Hodgepodge, after M.Gerhardt, H.Schuster, J.Tyson (1990)  

// A Cellular Automaton Model of Excitable Media

//  

// gW, gH : grid width, height

final Int gW = 40; // constant

final Int gH = 30; // constant

// iR : infection rate (1..20)

final Int iR = 1; // constant

// w1, w2 : weighting factors (low integers)

final Int w1 = 4; // constant

final Int w2 = 1; // constant

// colours : cellColour.s in descending order of RGB value

// state : of a cell is colours.indexOf(cellColour) in [0..colours.length() - 1]

// colours[0] = healthy; colours[colours.length() - 1] = ill, otherwise infected

final Int healthy = white; // constant

final Int ill = black; // constant

static List<int> getColours() { // function
  return {healthy, 0xffe6ff, 0xffccff, 0xffb3ff, 0xff99ff, 0xff80ff, 0xff66ff, 0xff4dff, 0xff33ff, 0xff1aff, 0xff00ff, 0xe600e6, 0xcc00cc, 0xb300b3, 0x990099, 0x800080, 0x660066, 0x4d004d, 0x330033, 0x1a001a, ill};
} // function

// vN : neighbourhood: von Neumann (4) true, Moore (8) false

final Boolean vN = false; // constant

static void main() {
  // colour grids: hodge for display, podge for working
  var podge = createBlockGraphics(healthy);
  var hodge = new AsRef<List<List<int>>>(createBlockGraphics(healthy));
  var blank = createBlockGraphics(healthy);
  // initial colours of grid
  updateGrid(hodge, podge, true); // call procedure
  while (!uniform(hodge.value())) {
    // successive updates to grid in blank podge
    podge = blank; // reassign variable
    updateGrid(hodge, podge, false); // call procedure
  } // while
} // main

static void updateGrid(AsRef<List<List<int>>> hodge, List<List<int>> podge, bool initial) { // procedure
  var colours = getColours();
  foreach (j in range(0, gH)) {
    foreach (i in range(0, gW)) {
      if (initial) {
        podge[i][j] = colours[randint(0, (colours.length()) - 1)]; // reassign variable
        podge[1][1] = 0x1a001a; // reassign variable
      } else {
        podge[i][j] = newColour(getNeighbourColours(hodge.value(), i, j), hodge.value()[i][j]); // reassign variable
      } // if
    } // foreach
  } // foreach
  var a = 0;
  hodge.set(podge); // call procedure
  displayBlocks(hodge.value()); // call procedure
  sleep_ms(50); // call procedure
} // procedure

static bool uniform(List<List<int>> grid) { // function
  var uniformGrid = createBlockGraphics(grid[0][0]);
  return if(grid.equals(uniformGrid), true, false);
} // function

static List<int> getNeighbourColours(List<List<int>> grid, int i, int j) { // function
  // grid wraps around: all cells have the same number of neighbours
  // H and V neighbours(von Neumann)
  var sL = grid[(i - 1 + gW) % gW][j];
  var sR = grid[(i + 1 + gW) % gW][j];
  var sA = grid[i][(j - 1 + gH) % gH];
  var sB = grid[i][(j + 1 + gH) % gH];
  var neighbourColours = {sL, sR, sA, sB};
  if (vN == false) {
    // add diagonal neighbours (Moore)
    var sLA = grid[(i - 1 + gW) % gW][(j - 1 + gH) % gH];
    var sRA = grid[(i + 1 + gW) % gW][(j - 1 + gH) % gH];
    var sLB = grid[(i - 1 + gW) % gW][(j + 1 + gH) % gH];
    var sRB = grid[(i + 1 + gW) % gW][(j + 1 + gH) % gH];
    neighbourColours = {sL, sR, sA, sB, sLA, sRA, sLB, sRB}; // reassign variable
  } // if
  return neighbourColours;
} // function

static int newColour(List<int> neighbourColours, int nowColour) { // function
  var colours = getColours();
  var nInfected = 0;
  var nIll = 0;
  var sumStates = colours.indexOf(nowColour);
  foreach (colour in neighbourColours) {
    sumStates = sumStates + colours.indexOf(colour); // reassign variable
    if (colour < healthy) {
      nInfected = nInfected + 1; // reassign variable
      if (colour == ill) {
        nIll = nIll + 1; // reassign variable
      } // if
    } // if
  } // foreach
  return updateColour(nowColour, sumStates, nInfected, nIll);
} // function

static int updateColour(int nowColour, int sumStates, int nInfected, int nIll) { // function
  var colours = getColours();
  var state = 0;
  if (nowColour == healthy) {
    state = divAsInt(nInfected, w1) + divAsInt(nIll, w2); // reassign variable
  } else if (nowColour != ill) {
    state = divAsInt(sumStates, (nInfected + 1)) + iR; // reassign variable
  } // if
  return if(state > (colours.length() - 1), ill, colours[state]);
} // function

}
