# 48c11f946223728fb102d43217946618ef07fb8f36716a51108382439524576d Elan 1.9.0 guest default_profile valid

class Square
  constructor(x: Int, y: Int)
    property.x = x # [assign variable]
    property.y = y # [assign variable]
  end constructor

  private x: Int = None # [property private]

  private y: Int = None # [property private]

end class

def main -> None:  # [main]
  tail = new Square(20, 15) # [variable definition]


