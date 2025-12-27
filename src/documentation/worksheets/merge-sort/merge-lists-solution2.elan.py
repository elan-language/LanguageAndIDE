# ec628d2f891db5e32394e6ad7d23ee26b64f797fd9e0b43b60eb5fe91a04b2e8 Elan 1.9.0 guest default_profile valid

def merge(a: List<of String>, b: List<of String>) -> List<of String>:  # [function ]
  result = empty List<of String> # [variable definition ]
  if a.length() is 0 then
    result = b # [assign variable ]
  else if b.length() is 0 then
    result = a # [assign variable ]
  else
    head_a, tail_a = a # [variable definition ]
    head_b, tail_b = b # [variable definition ]
    if head_a.isBefore(head_b) then
      result = [head_a].withAppendList(merge(tail_a, b)) # [assign variable ]
    else
      result = [head_b].withAppendList(merge(a, tail_b)) # [assign variable ]
  return result


