' VB.NET with Elan 2.0.0-beta4

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
  Dim podge = New BlockGraphics() ' variable definition
  Dim hodge = New BlockGraphics() ' variable definition
  Dim blank = New BlockGraphics() ' variable definition
  ' initial colours of grid
  updateGrid(hodge, podge, True) ' procedure call
  While Not uniform(hodge)
    ' successive updates to grid in blank podge
    podge = blank ' assignment
    updateGrid(hodge, podge, False) ' procedure call
  End While
End Sub

Sub updateGrid(hodge As BlockGraphics, podge As BlockGraphics, initial As Boolean) ' procedure
  Dim colours = getColours() ' variable definition
  For Each j In range(0, gH)
    For Each i In range(0, gW)
      If initial Then
        podge.put(i, j, colours(randint(0, (colours.length()) - 1))) ' procedure call
        podge(1)(1) = &H1a001a ' assignment
      Else
        podge.put(i, j, newColour(getNeighbourColours(hodge, i, j), hodge.get(i, j))) ' procedure call
      End If
    Next i
  Next j
  Dim a = 0 ' variable definition
  ' copy podgeValues into hodge
  For Each j In range(0, gH)
    For Each i In range(0, gW)
      Dim podgeValue = podge.get(i, j) ' variable definition
      hodge.put(i, j, podgeValue) ' procedure call
    Next i
  Next j
  displayBlockGraphics(hodge) ' procedure call
  sleep_ms(50) ' procedure call
End Sub

Function uniform(grid As BlockGraphics) As Boolean
  Dim cell0 = grid.get(0, 0) ' variable definition
  Dim isUniform = True ' variable definition
  For Each j In range(0, gH)
    For Each i In range(0, gW)
      If grid.get(i, j) = cell0 Then
        isUniform = False ' assignment
      End If
    Next i
  Next j
  Return isUniform
End Function

Function getNeighbourColours(grid As BlockGraphics, i As Integer, j As Integer) As List(Of Integer)
  ' grid wraps around: all cells have the same number of neighbours
  ' H and V neighbours(von Neumann)
  Dim sL = grid.get((i - 1 + gW) Mod gW, j) ' variable definition
  Dim sR = grid.get((i + 1 + gW) Mod gW, j) ' variable definition
  Dim sA = grid.get(i, (j - 1 + gH) Mod gH) ' variable definition
  Dim sB = grid.get(i, (j + 1 + gH) Mod gH) ' variable definition
  Dim neighbourColours = {sL, sR, sA, sB} ' variable definition
  If vN = False Then
    ' add diagonal neighbours (Moore)
    Dim sLA = grid.get((i - 1 + gW) Mod gW, (j - 1 + gH) Mod gH) ' variable definition
    Dim sRA = grid.get((i + 1 + gW) Mod gW, (j - 1 + gH) Mod gH) ' variable definition
    Dim sLB = grid.get((i - 1 + gW) Mod gW, (j + 1 + gH) Mod gH) ' variable definition
    Dim sRB = grid.get((i + 1 + gW) Mod gW, (j + 1 + gH) Mod gH) ' variable definition
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
