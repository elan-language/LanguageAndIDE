# 61ad23a29515dc1abcce86883bc91313bd8769bae4b1e1a1cf34dec0b04bd79f Elan 1.9.0 guest default_profile valid

def test_() -> None:  # [test]
  try
    foo() # [call procedure]}
    print "not caught"
  catch exception in e
    print e
  end try


def test_() -> None:  # [test]
  try
    foo() # [call procedure]}
    print "not caught"
  catch exception in e
    if e isnt "an expected message" then
      throw exception e
  end try


def foo() -> None:  # [procedure]



