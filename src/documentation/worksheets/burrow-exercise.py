# 0f3d4ad06be8d91b399e1ed2096916630a8e1b7df6a7e366fbd03278404f3eea Elan 1.9.0 guest default_profile valid

# Exercise: learn how to use simple Block Graphics, writing a program called 'burrow'
# 1. Create a main routine and within that add a 'let' statement defining a value named
#    'blocks' as a new Array2D of type Int, and with arguments 40, 30 (corresponding to
#    the width and height of the Display in blocks) and 'white' as the initial (Int)
#    value for each block
# 2. Define two variables 'x' and 'y' with initial values of 20 and 15 respectively,
#    being the coordinates of the centre of the display
# 3. Call the '.put' procedure-method on 'blocks' passing in arguments x, y, and 'red'
# 4. Call the procedure displayBlocks, passing in 'blocks' as the argument
# Run the program to check that this displays a red block in the centre of the Display
# 5. After the other instructions in main, add an infinite loop ('while true')
# 6. Select the first of the existing call instructions, then Shift-↓ to also select
#    the second one, cut them (Ctrl+x) then select the 'new code' within the while loop
#    and paste them there with Ctrl+v.
# 7. After the displayBlocks call, add another call to 'blocks.put' to change the block
#    at x, y to black
# 8. Add a new 'let' defining 'direction' as being a random integer in the range 0 to 3
#    (as soon as you start typing random you will see a suitable method for this)
# 9. Add an 'if' statement that tests if the direction is zero and if so increments 
#    the value of x by 1 using a 'set` instruction.
# 10.Within the if statement add three 'else if' clauses such that all four of the
#    possible values for direction are covered, and between them either increment or
#    decrement x or y by one. It doesn't matter which variant
#    goes in which clause as long as all four possible changes are handled.
# Run the program to see the red animal burrowing at random, but note that the program will
# stop when it reaches an edge with an error. Note carefully the error (shown in System info)
# and make sure you understand why this error has occcured.
# 11.Ensure the animal does not go over the edge of the screen by modifying each of the four
#    set instructions, using the functions minInt & maxInt to keep the values within bounds,
#    Since minInt & maxInt expect a list of integers as the only argument,
#    you can just render a pair of values as a literal list e.g. minInt([x_1,39])
# 12.Slow down the simulation slightly by calling pause within the loop
# Run the program and check that the animal stays within the bounds of the Display.
# 
# OPTIONAL REFINEMENTS (if you finish early)
# a. As well as moving orthogonally one square, make the random movement one of 8 options, which include the four diagonals.
# b. Have two burrowing animals working at once, with different colours. (Should be easier than it sounds). 
# c. Don't let the two animals ever overlap. If one is about to move onto the other's current location, cancel that move.
# d. Each time around the loop paint a random square white to represent a part of the burrow collapsing. When the burrow is small, you'll hardly see anything, but as it gets larger it will start to collapse more.
# e. Instead of moving at random, bias the movement such that it digs more aggressively. In other words, read the values of the four adjacent blocks and go to the first one it finds empty. If none are empty then move at random.
