# 13eeab2bbd88e65d128beb3ebe21307c46b45a8eebb32e27d9d9db09ee16402c Elan 1.9.0 guest default_profile valid

def main -> None:  # [main]
  print percent(11, 10)


def percent(value: Float, maximum: Float) -> Float:  # [function]
  r = 100.0 # [variable definition]
  if value > maximum then
    throw exception "proportion exceeds 100%"
  else
    r = value/maximum*r # [assign variable]
  return r


def onAxis(xp: Float, yp: Float, xq: Float, yq: Float) -> Float:  # [function]
  if yp is 0 then
    throw exception "yp is zero: {xp},{yp} + {xq},{yq}"
  return xp*yp


