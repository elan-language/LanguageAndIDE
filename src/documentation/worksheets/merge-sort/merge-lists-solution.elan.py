# c27080f2933cca80d0c58dec2f79fdb3accb4fc10124c2b7029687d7537cf551 Elan 1.9.0 guest default_profile valid

def merge(a: List<of String>, b: List<of String>) -> List<of String>:  # [function ]
  result = empty List<of String> # [variable definition ]
  if a.length() is 0 then
    result = b # [assign variable ]
  else if b.length() is 0 then
    result = a # [assign variable ]
  else if a[0].isBefore(b[0]) then
    result = [a[0]].withAppendList(merge(a[1..], b)) # [assign variable ]
  else
    result = [b[0]].withAppendList(merge(a, b[1..])) # [assign variable ]
  return result


