# d1d9b4aed222f1e298da450d79fba6ec63f957654328e07d206274c1a5afacc0 Elan 1.9.0 guest default_profile valid

sGW = 'grid { display: flex; flex-direction: column; margin-top: 40px; width: 500px; } word { display: flex; flex-direction: row; margin: auto; }'

def setInStyle(s: String) -> String:  # [function]
  return "<style>" + s + "<style>"


def test_() -> None:  # [test]
  assertEqual(setInStyle(sGW), '<style>' + sGW + '</style>')  # [assert]


