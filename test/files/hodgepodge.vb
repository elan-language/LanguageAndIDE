' VB.NET with Elan 2.0.0-beta1

' Hodgepodge, after M.Gerhardt, H.Schuster, J.Tyson (1990)  

' A Cellular Automaton Model of Excitable Media

'  

' gW, gH : grid width, height

Const gW = 40

Const gH = 30

' iR : infection rate (1..20)

Const iR = 1

' w1, w2 : weighting factors (low integers)

Const w1 = 4

Const w2 = 1

' colours : cellColour.s in descending order of RGB value

' state : of a cell is colours.indexOf(cellColour) in [0..colours.length() - 1]

' colours[0] = healthy; colours[colours.length() - 1] = ill, otherwise infected

Const healthy = white

Const ill = black

Function getColours() As List(Of Integer)
  Return {healthy, &Hffe6ff, &Hffccff, &Hffb3ff, &Hff99ff, &Hff80ff, &Hff66ff, &Hff4dff, &Hff33ff, &Hff1aff, &Hff00ff, &He600e6, &Hcc00cc, &Hb300b3, &H990099, &H800080, &H660066, &H4d004d, &H330033, &H1a001a, ill}
End Function

' vN : neighbourhood: von Neumann (4) true, Moore (8) false

Const vN = False

Sub main()
  ' colour grids: hodge for display, podge for working
  Dim podge = createBlockGraphics(healthy) ' variable definition
  Dim hodge = New AsRef(Of List(Of List(Of Integer)))(createBlockGraphics(healthy)) ' variable definition
  Dim blank = createBlockGraphics(healthy) ' variable definition
  ' initial colours of grid
  updateGrid(hodge, podge, True) ' procedure call
  While Not uniform(hodge.value())
    ' successive updates to grid in blank podge
    podge = blank ' assignment
    updateGrid(hodge, podge, False) ' procedure call
  End While
End Sub

Sub updateGrid(hodge As AsRef(Of List(Of List(Of Integer))), podge As List(Of List(Of Integer)), initial As Boolean) ' procedure
  Dim colours = getColours() ' variable definition
  For Each j In range(0, gH)
    For Each i In range(0, gW)
      If initial Then
        podge(i)(j) = colours(randint(0, (colours.length()) - 1)) ' assignment
        podge(1)(1) = &H1a001a ' assignment
      Else
        podge(i)(j) = newColour(getNeighbourColours(hodge.value(), i, j), hodge.value()(i)(j)) ' assignment
      End If
    Next i
  Next j
  Dim a = 0 ' variable definition
  hodge.set(podge) ' procedure call
  displayBlocks(hodge.value()) ' procedure call
  sleep_ms(50) ' procedure call
End Sub

Function uniform(grid As List(Of List(Of Integer))) As Boolean
  Dim uniformGrid = createBlockGraphics(grid(0)(0)) ' variable definition
  Return if_(grid.equals(uniformGrid), True, False)
End Function

Function getNeighbourColours(grid As List(Of List(Of Integer)), i As Integer, j As Integer) As List(Of Integer)
  ' grid wraps around: all cells have the same number of neighbours
  ' H and V neighbours(von Neumann)
  Dim sL = grid((i - 1 + gW) Mod gW)(j) ' variable definition
  Dim sR = grid((i + 1 + gW) Mod gW)(j) ' variable definition
  Dim sA = grid(i)((j - 1 + gH) Mod gH) ' variable definition
  Dim sB = grid(i)((j + 1 + gH) Mod gH) ' variable definition
  Dim neighbourColours = {sL, sR, sA, sB} ' variable definition
  If vN = False Then
    ' add diagonal neighbours (Moore)
    Dim sLA = grid((i - 1 + gW) Mod gW)((j - 1 + gH) Mod gH) ' variable definition
    Dim sRA = grid((i + 1 + gW) Mod gW)((j - 1 + gH) Mod gH) ' variable definition
    Dim sLB = grid((i - 1 + gW) Mod gW)((j + 1 + gH) Mod gH) ' variable definition
    Dim sRB = grid((i + 1 + gW) Mod gW)((j + 1 + gH) Mod gH) ' variable definition
    neighbourColours = {sL, sR, sA, sB, sLA, sRA, sLB, sRB} ' assignment
  End If
  Return neighbourColours
End Function

Function newColour(neighbourColours As List(Of Integer), nowColour As Integer) As Integer
  Dim colours = getColours() ' variable definition
  Dim nInfected = 0 ' variable definition
  Dim nIll = 0 ' variable definition
  Dim sumStates = colours.indexOf(nowColour) ' variable definition
  For Each colour In neighbourColours
    sumStates = sumStates + colours.indexOf(colour) ' assignment
    If colour < healthy Then
      nInfected = nInfected + 1 ' assignment
      If colour = ill Then
        nIll = nIll + 1 ' assignment
      End If
    End If
  Next colour
  Return updateColour(nowColour, sumStates, nInfected, nIll)
End Function

Function updateColour(nowColour As Integer, sumStates As Integer, nInfected As Integer, nIll As Integer) As Integer
  Dim colours = getColours() ' variable definition
  Dim state = 0 ' variable definition
  If nowColour = healthy Then
    state = divAsInt(nInfected, w1) + divAsInt(nIll, w2) ' assignment
  ElseIf nowColour <> ill Then
    state = divAsInt(sumStates, (nInfected + 1)) + iR ' assignment
  End If
  Return if_(state > (colours.length() - 1), ill, colours(state))
End Function
