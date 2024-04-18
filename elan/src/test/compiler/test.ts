// class Foo {
//     static defaultInstance() : any { return system.defaultClass(Foo, [["bar", Bar.defaultInstance()]]);};
//     constructor() {
  
//     }
  
//     bar = Bar.defaultInstance();
  
//     asString() {
//       return "";
//     }
  
//   }
  
//   class Bar {
//     static defaultInstance() : any { return system.defaultClass(Bar, [["p1", 0], ["p2", ""], ["foo", Foo.defaultInstance()]]);};
//     constructor() {
  
//     }
  
//     p1 = 0;
  
//     p2 = "";
  
//     foo = Foo.defaultInstance();
  
//     asString() {
//       return "";
//     }
  
//   }