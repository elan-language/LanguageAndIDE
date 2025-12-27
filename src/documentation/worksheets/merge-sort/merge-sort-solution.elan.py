# 015067b5badd765d69989ed818f17ef096407598f85a7e5dbcd9b5a583bd8e59 Elan 1.9.0 guest default_profile valid

def sort(li: List<of String>) -> List<of String>:  # [function ]
  result = li # [variable definition ]
  len = li.length() # [variable definition ]
  if len > 1 then
    mid = (len/2).floor() # [variable definition ]
    frontHalf = sort(li[..mid]) # [variable definition ]
    backHalf = sort(li[mid..]) # [variable definition ]
    result = merge(frontHalf, backHalf) # [assign variable ]
  return result


