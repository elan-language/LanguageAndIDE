# a2d08a3dc9d20c9437f6766a3934975615a1db29476220d6a8fe3ae548b3196c Elan 1.9.0 guest default_profile valid

def sort(li: List<of String>) -> List<of String>:  # [function]
  result = li # [variable definition]
  len = li.length() # [variable definition]
  if len > 1 then
    mid = (len/2).floor() # [variable definition]
    frontHalf = sort(li[..mid]) # [variable definition]
    backHalf = sort(li[mid..]) # [variable definition]
    result = merge(frontHalf, backHalf) # [assign variable]
  return result


