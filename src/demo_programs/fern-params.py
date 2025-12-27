# 615f28dc4bdab0bdc7e0336c5d6b78f45342d5443265be92fdeb5cd465ac58b8 Elan 1.9.0 guest default_profile valid

# Program to extract the parameters for the Barnsley Fern from the Wikipedia page
# https://en.wikipedia.org/wiki/Barnsley_fern
# Prints a string suitable for pasting into the main program
# for generating the Barnsley Fern.
# Save the Wikipedia page HTML to a file, to be processed by this program
# In Chrome do:
# - [three dots top right] -> Cast, save and share -> Save page as...
# - change "Web Page, Complete" to "Web  Page, HTML Only" bottom right
# - change the file name to end ".txt" and click Save.
# These instructions may not apply exactly to all versions of Chrome.
# When this program is run, select the saved file to open.
# Note that this program only does string manipulation:
# at no time in this program does it create an actual "List of List of Float",
# only a string presentation of one.
# In case it doesn't work in the future, the output is supposed to be:
# (split into two lines here)
# {{0.0,0.0,0.0,0.16,0.0,0.0,0.01},{0.85,0.04,-0.04,0.85,0.0,1.60,0.85},
# {0.20,-0.26,0.23,0.22,0.0,1.60,0.07},{-0.15,0.28,0.26,0.24,0.0,0.44,0.07}}
def main -> None:  # [main]
  openbrace = unicode(123) # [variable definition]
  file = openFileForReading() # [variable definition]
  result = openbrace + openbrace # [variable definition]
  skipping = true # [variable definition]
  while not file.endOfFile()
    line = file.readLine() # [variable definition]
    processoneline(line, result, skipping) # [call procedure]}
  file.close() # [call procedure]}
  print result


def processoneline(line: String, result: String, skipping: Boolean) -> None:  # [procedure]
  openbrace = unicode(123) # [variable definition]
  closebrace = unicode(125) # [variable definition]
  if line.contains("Portion generated") then
    # start of the part we are interested in
    skipping = false # [assign variable]
  if not skipping then
    # change Unicode Minus Sign to ASCII hyphen-minus
    linem = line # [variable definition]
    linem = linem.replace(unicode(0x2212), "-") # [assign variable]
    # fetch the number at the end of the line
    # note that the number is held as a string at all times in this program
    num = gettrailingnumber(linem) # [variable definition]
    if num isnt "" then
      if num is "0" then
        # all values must be Floats
        num = "0.0" # [assign variable]
      result = result + num + "," # [assign variable]
    if linem.contains("texhtml") then
      # next row of parameters
      result = result + closebrace + "," + openbrace # [assign variable]
    if linem.contains("Largest right-hand") then
      # end of parameters
      result = result + closebrace + closebrace # [assign variable]
      skipping = true # [assign variable]
      # we are done, tidy up result to remove excess separators
      result = result.replace(openbrace + closebrace + ",", "").replace("," + closebrace, closebrace) # [assign variable]


# find any number at the end of the given string
# if no number, return empty string
# for our purposes
# a number is just any string of digit, full stop or minus sign in any order
# only works if the string contains at least one non-number character
# written in a functional style, see if you can work out how it works
def gettrailingnumber(s: String) -> String:  # [function]
  return if s is "" then "" else s[last(sequence(0, s.length() - 1).filter(lambda n: Int => not isnumberchar(s[n]))) + 1..s.length()]


def isnumberchar(s: String) -> Boolean:  # [function]
  return numberChars.contains(s)


# return the last element in a list of Int
# a separate function so it can be applied to a complicated argument
def last(l: List<of Int>) -> Int:  # [function]
  return l[l.length() - 1]


def test_strings() -> None:  # [test]
  assertEqual(isnumberchar("5"), true)  # [assert]
  assertEqual(gettrailingnumber("abc123"), "123")  # [assert]
  assertEqual(gettrailingnumber("abc"), "")  # [assert]
  assertEqual(gettrailingnumber("3a-1.63"), "-1.63")  # [assert]
  assertEqual(gettrailingnumber(""), "")  # [assert]


def test_last() -> None:  # [test]
  assertEqual(last([5, 6, 7]), 7)  # [assert]


numberChars = "-.0123456789"
