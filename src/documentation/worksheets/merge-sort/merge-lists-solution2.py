# df564c44ed344ed55b41b986d16c0cb03d36cb89c2eb89c53d0ffb3dfa7569a3 Elan 1.9.0 guest default_profile valid

def merge(a: List<of String>, b: List<of String>) -> List<of String>:  # [function]
  result = empty List<of String> # [variable definition]
  if a.length() is 0 then
    result = b # [assign variable]
  else if b.length() is 0 then
    result = a # [assign variable]
  else
    head_a, tail_a = a # [variable definition]
    head_b, tail_b = b # [variable definition]
    if head_a.isBefore(head_b) then
      result = [head_a].withAppendList(merge(tail_a, b)) # [assign variable]
    else
      result = [head_b].withAppendList(merge(a, tail_b)) # [assign variable]
  return result


