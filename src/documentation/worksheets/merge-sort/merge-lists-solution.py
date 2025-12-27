# 028d3b656fa7453789f04eccad5d5ada60644fdb8b5ddb24710d254f0529775d Elan 1.9.0 guest default_profile valid

def merge(a: List<of String>, b: List<of String>) -> List<of String>:  # [function]
  result = empty List<of String> # [variable definition]
  if a.length() is 0 then
    result = b # [assign variable]
  else if b.length() is 0 then
    result = a # [assign variable]
  else if a[0].isBefore(b[0]) then
    result = [a[0]].withAppendList(merge(a[1..], b)) # [assign variable]
  else
    result = [b[0]].withAppendList(merge(a, b[1..])) # [assign variable]
  return result


