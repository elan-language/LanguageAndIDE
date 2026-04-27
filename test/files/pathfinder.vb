' VB.NET with Elan 2.0.0-alpha1

Sub main()
  Dim start = New Point(5, 5) ' variable definition
  Dim destination = New Point(34, 24) ' variable definition
  Dim percentRocks = inputIntBetween("Enter % rocks (0-100): ", 0, 100) ' variable definition
  clearPrintedText() ' call procedure
  Dim rocks = New List(Of Point)() ' variable definition
  Dim nodes = New List(Of Node)() ' variable definition
  createRocksAndNodes(percentRocks, rocks, nodes, start, destination) ' call procedure
  Dim gr = initialiseGraphics(start, destination, rocks) ' variable definition
  displayBlocks(gr) ' call procedure
  Dim solver = New Solver(nodes, start, destination) ' variable definition
  While True
    Dim k = inputStringFromOptions(algPrompt, {"a", "d", "h"}) ' variable definition
    clearPrintedText() ' call procedure
    Dim alg = getAlgFromLetter(k) ' variable definition
    runSolver(gr, start, destination, rocks, solver, alg) ' call procedure
  End While
End Sub

Sub runSolver(gr As List(Of List(Of Integer)), start As Point, destination As Point, rocks As List(Of Point), solver As Solver, alg As Algorithm) ' procedure
  solver.initialise(alg) ' call procedure
  Dim gr2 = initialiseGraphics(start, destination, rocks) ' variable definition
  While solver.running
    solver.visitNextPoint() ' call procedure
    gr2 = addVisited(gr2, solver.getLastVisited()) ' change variable
    displayBlocks(gr2) ' call procedure
    sleep_ms(0) ' call procedure
  End While
  If solver.getLastVisited().equals(destination) Then
    Dim rl = solver.getRouteAndLength() ' variable definition
    Dim route = rl.item_0 ' variable definition
    Dim length = rl.item_1 ' variable definition
    gr2 = addRoute(gr2, route) ' change variable
    displayBlocks(gr2) ' call procedure
    printNoLine($"Length of route: {length.round(2)} ") ' call procedure
  Else
    printNoLine("No path found. ") ' call procedure
  End If
End Sub

Sub createRocksAndNodes(percentRocks As Integer, rocks As List(Of Point), nodes As List(Of Node), start As Point, dest As Point) ' procedure
  For Each x In range(0, 40)
    For Each y In range(1, 30)
      Dim p = New Point(x, y) ' variable definition
      If p.equals(start) Then
        nodes.append(New Node(p, 0, p.minDistTo(dest))) ' call procedure
      ElseIf p.equals(dest) Then
        nodes.append(New Node(p, infinity, 0)) ' call procedure
      ElseIf random() < divAsFloat(percentRocks, 100) Then
        rocks.append(p) ' call procedure
      Else
        nodes.append(New Node(p, infinity, p.minDistTo(dest))) ' call procedure
      End If
    Next y
  Next x
End Sub

Function initialiseGraphics(start As Point, dest As Point, rocks As List(Of Point)) As List(Of List(Of Integer))
  Dim gr = createBlockGraphics(white) ' variable definition
  For Each rock In rocks
    gr = withPut(gr, rock.x, rock.y, black) ' change variable
  Next rock
  gr = withPut(gr, start.x, start.y, green) ' change variable
  gr = withPut(gr, dest.x, dest.y, red) ' change variable
  Return gr
End Function

Function withPut(graphics As List(Of List(Of Integer)), x As Integer, y As Integer, colour As Integer) As List(Of List(Of Integer))
  Return graphics.withSet(x, graphics[x].withSet(y, colour))
End Function

Function addVisited(gr As List(Of List(Of Integer)), visited As Point) As List(Of List(Of Integer))
  Return withPut(gr, visited.x, visited.y, lightBlue)
End Function

Function addRoute(gr As List(Of List(Of Integer)), route As List(Of Point)) As List(Of List(Of Integer))
  Dim graphics = gr ' variable definition
  For Each p In route
    graphics = withPut(graphics, p.x, p.y, orange) ' change variable
  Next p
  Dim start = route[0] ' variable definition
  Dim dest = route[route.length() - 1] ' variable definition
  graphics = withPut(graphics, start.x, start.y, green) ' change variable
  graphics = withPut(graphics, dest.x, dest.y, red) ' change variable
  Return graphics
End Function

Class Solver

  Sub New(nodes As List(Of Node), start As Point, destination As Point)
    Me.nodes = nodes ' change variable
    Me.start = start ' change variable
    Me.destination = destination ' change variable
    Me.current = New Node(emptyPoint(), 0, 0) ' change variable
  End Sub
  Function toString() As String
    Return ""
  End Function
  Property nodes As List(Of Node)
  Property start As Point
  Property destination As Point
  Property current As Node
  Property alg As Algorithm
  Property running As Boolean
  ' TODO can this go into the constructor ?
  Sub initialise(alg As Algorithm) ' procedure
    Me.alg = alg ' change variable
    Me.current = New Node(Me.start, 0, infinity) ' change variable
    Me.running = True ' change variable
    For Each node In Me.nodes
      node.setDistanceFromStart(infinity) ' call procedure
      node.setVia(emptyPoint()) ' call procedure
      node.setVisited(False) ' call procedure
    Next node
  End Sub
  Sub visitNextPoint() ' procedure
    Me.updateNeighbours() ' call procedure
    Me.current = Me.nextNodeToVisit() ' change variable
    If (Me.current.isEmpty Or (Me.current.point.equals(Me.destination))) Then
      Me.running = False ' change variable
    Else
      Dim current = Me.current ' variable definition
      current.setVisited(True) ' call procedure
    End If
  End Sub
  Sub updateNeighbours() ' procedure
    Dim distToCurrent = Me.current.distFromStart ' variable definition
    Dim currentPoint = Me.current.point ' variable definition
    For Each neighbour In Me.currentNeighbours()
      Dim distViaCurrent = distToCurrent + currentPoint.minDistTo(neighbour.point) ' variable definition
      If distViaCurrent < neighbour.distFromStart Then
        neighbour.setVia(currentPoint) ' call procedure
        neighbour.setDistanceFromStart(distViaCurrent) ' call procedure
      End If
    Next neighbour
  End Sub
  Function currentNeighbours() As List(Of Node)
    Dim currentNode = Me.current ' variable definition
    Dim currentPoint = currentNode.point ' variable definition
    Dim neighbours = New List(Of Node)() ' variable definition
    For Each p In currentPoint.neighbouringPoints()
      Dim node = Me.getNodeFor(p) ' variable definition
      Dim point = node.point ' variable definition
      If Not point.isEmpty Then
        neighbours = neighbours.withAppend(node) ' change variable
      End If
    Next p
    Return neighbours
  End Function
  Function getNodeFor(p As Point) As Node
    Dim matches = Me.nodes.filter(lambda n As Node => n.point.equals(p)) ' variable definition
    Return if(matches.length() = 1, matches.head(), emptyNode())
  End Function
  Function getLastVisited() As Point
    Return Me.current.point
  End Function
  Function nextNodeToVisit() As Node
    Dim lowestCostSoFar = infinity ' variable definition
    Dim lowestCostNode = emptyNode() ' variable definition
    Dim possibilities = Me.nodes.filter(lambda nd As Node => (Not nd.visited) And (nd.distFromStart < infinity)) ' variable definition
    For Each nd In possibilities
      Dim cost = Me.calculateCost(nd) ' variable definition
      If cost < lowestCostSoFar Then
        lowestCostSoFar = cost ' change variable
        lowestCostNode = nd ' change variable
      End If
    Next nd
    Return lowestCostNode
  End Function
  Function calculateCost(node As Node) As Double
    Dim cost = 0.0 ' variable definition
    Dim fromStart = node.distFromStart ' variable definition
    Dim estToDest = node.estDistToDest ' variable definition
    If Me.alg = Algorithm.dijkstra Then
      cost = fromStart ' change variable
    ElseIf Me.alg = Algorithm.aStar Then
      cost = fromStart + estToDest ' change variable
    ElseIf Me.alg = Algorithm.heuristic Then
      cost = estToDest ' change variable
    End If
    Return cost
  End Function
  Function getRouteAndLength() As (List(Of Point), Double)
    Dim route = {Me.destination} ' variable definition
    Dim length = 0.0 ' variable definition
    Dim node = Me.getNodeFor(Me.destination) ' variable definition
    While Not node.point.equals(Me.start)
      Dim previous = node.via ' variable definition
      Dim p = node.point ' variable definition
      length = length + p.minDistTo(previous) ' change variable
      route = route.withInsert(0, previous) ' change variable
      node = Me.getNodeFor(previous) ' change variable
    End While
    Return (route, length)
  End Function
End Class

Function emptyNode() As Node
  Return New Node(emptyPoint(), 0, 0)
End Function

Class Node

  Sub New(p As Point, distFromStart As Double, estDistToDest As Double)
    If p.isEmpty Then
      Me.isEmpty = True ' change variable
    End If
    Me.point = p ' change variable
    Me.visited = False ' change variable
    Me.distFromStart = distFromStart ' change variable
    Me.via = emptyPoint() ' change variable
    Me.estDistToDest = estDistToDest ' change variable
  End Sub
  Property point As Point
  Property visited As Boolean
  Property distFromStart As Double
  Property via As Point
  Property estDistToDest As Double
  Property isEmpty As Boolean
  Sub setVisited(value As Boolean) ' procedure
    Me.visited = value ' change variable
  End Sub
  Sub setDistanceFromStart(d As Double) ' procedure
    Me.distFromStart = d ' change variable
  End Sub
  Sub setVia(p As Point) ' procedure
    Me.via = p ' change variable
  End Sub
  Function toString() As String
    Return $"[{Me.point.toString()} {Me.visited} {Me.distFromStart}]"
  End Function
End Class

Function emptyPoint() As Point
  Return New Point(-1, -1)
End Function

Class Point

  Property x As Integer
  Property y As Integer
  Property isEmpty As Boolean
  Sub New(x As Integer, y As Integer)
    If (x < 0) Or (y < 0) Then
      Me.isEmpty = True ' change variable
    Else
      Me.x = x ' change variable
      Me.y = y ' change variable
    End If
  End Sub
  Function minDistTo(p As Point) As Double
    Return sqrt(pow((p.x - Me.x), 2) + pow((p.y - Me.y), 2))
  End Function
  Function isAdjacentTo(p As Point) As Boolean
    Return (Me.minDistTo(p) = 1) Or (Me.minDistTo(p).round(4) = sqrt(2).round(4))
  End Function
  ' Returns the 8 theoretically-neighbouring points, whether or not within bounds
  Function neighbouringPoints() As List(Of Point)
    Return {New Point(Me.x - 1, Me.y - 1), New Point(Me.x, Me.y - 1), New Point(Me.x + 1, Me.y - 1), New Point(Me.x - 1, Me.y), New Point(Me.x + 1, Me.y), New Point(Me.x - 1, Me.y + 1), New Point(Me.x, Me.y + 1), New Point(Me.x + 1, Me.y + 1)}
  End Function
  Function toString() As String
    Return $"{Me.x},{Me.y}"
  End Function
End Class

Enum Algorithm dijkstra, aStar, heuristic

' 'infinity' need only be larger than longest possible route

Const infinity = 2000.0

Const algPrompt = "Enter 'a' for A-star, 'd' for Dijkstra, 'h' for Heuristic"

Const lightBlue = &H80abff

Const orange = &He97132

Function getAlgFromLetter(letter As String) As Algorithm
  Dim algs = ["a":Algorithm.aStar, "d":Algorithm.dijkstra, "h":Algorithm.heuristic] ' variable definition
  Return algs[letter]
End Function

<TestMethod> Sub test_getAlgFromLetter()
  Assert.AreEqual(Algorithm.aStar, getAlgFromLetter("a"))
  Assert.AreEqual(Algorithm.heuristic, getAlgFromLetter("h"))
  Assert.AreEqual(Algorithm.dijkstra, getAlgFromLetter("d"))
End Sub

<TestMethod> Sub test_point()
  Dim p = New Point(0, 0) ' variable definition
  Dim n = p.neighbouringPoints() ' variable definition
  Dim expected = {New Point(-1, -1), New Point(0, -1), New Point(1, -1), New Point(-1, 0), New Point(1, 0), New Point(-1, 1), New Point(0, 1), New Point(1, 1)} ' variable definition
  Assert.AreEqual(expected, n)
End Sub
