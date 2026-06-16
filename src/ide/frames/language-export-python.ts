// The tables used to translate library function calls in expressions
// when exporting in Python.
// The code is common between languages, in language-export-helpers.ts

import { LanguageExport } from "./frame-interfaces/language-export";

export class LanguageExportPython implements LanguageExport {
  // the math functions that don't just add "math."
  mathExceptions: { [propName: string]: string } = {
    pow: "pow",
    abs: "abs",
    logE: "math.log",
  };

  mathPrefix = "math";

  // non-math functions which are
  // - dot methods and stay dot methods, or
  // - standalone and stay standalone
  // these just need the name changing, and no import statement is needed
  plainMethodTable: { [propName: string]: string } = {
    unicode: "chr",
    rangeInSteps: "range",
    indexOf: "find", // "index" raises an exception on not found
    upperCase: "upper",
    lowerCase: "lower",
    trim: "strip",
    parseAsInt: "int",
  };
  // omitting 'split: "split"' as the name is the same

  // Dot methods which translate to standalone functions
  extensionTable: { [propName: string]: string } = {
    toString: "str",
    asUnicode: "ord",
    length: "len",
    floor: "math.floor",
    ceiling: "math.ceil",
    isNaN: "math.isnan",
    isInfinite: "math.isinf",
    round: "round",
    // these are adjusted in a later pass
    withAppend: "withAppendPy",
    equals: "equalsPy",
  };

  // Table for functions with parameters that need moving
  // Add brackets round the whole expression
  // if there may be a higher-priority operator adjacent
  standaloneTable: { [propName: string]: string } = {
    // there is no confusion with "if" statements
    // as this code is only run for expressions
    if: "($1 if $0 else $2)",
    divAsInt: "math.floor(($0)/($1))",
    divAsFloat: "(($0)/($1))",
    createPopulatedList: "[$1 for n in range($0)]",
    bitAnd: "(($0) & ($1))",
    bitOr: "($0 | $1)",
    bitXor: "($0 ^ $1)",
    bitNot: "(~$0)",
    bitShiftL: "($0 &lt;&lt; $1)",
    bitShiftR: "(($0 & (1&lt;&lt;32)-1) &gt;&gt; $1)",
    // copy TBD
    subString: "[$0:$1]",
    printNoLine: "print($0, end='')",
    withAppendPy: "($0 + [($1)])", // list + [value]
    equalsPy: "($0 == ($1))",
  };

  // some replacement functions are so simple
  // that they may as well be put in line as polyfills
  polyfillTable: { [propName: string]: string } = {
    clock: `import time
def clock():
  return int(time.time()*1000)
`,
  };

  // one piece of code which is language-specific and belongs in this file
  translateOddities(expr: string): string {
    // the items in a tuple
    return expr.replace(/\.<el-id>item_(\d)<\/el-id>/g, "[$1]");
  }

  // oh and another piece of code
  // return the required import line for a given function (after translation)
  getImportNeeded(funcname: string): string {
    return funcname.startsWith("math.") ? "import math\n" : "";
  }
}
