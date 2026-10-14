export enum LineFormat {
  inline,
  multiline,
}

// Functions in the standard library which should be prefixed with "math" or "Math"
// This is a deliberately all-encompassing list
// Some of these are not in the math module in every language
// It is up to each language to remove the ones that don't apply
// and apply a special mapping as required
// eg abs and pow are not math functions in Python (math.pow is different)
// and radians and degrees have different names in VB and C#
export const languageHelper_mathFunctions = [
  "pow",
  "abs",
  "acos",
  "asin",
  "atan",
  "cos",
  "exp",
  "logE",
  "log10",
  "log2",
  "sin",
  "sqrt",
  "tan",
  "radians",
  "degrees",
];
