import { EnumValuesField } from "./fields/enum-values-field";
import { ParseStatus } from "./status-enums";

export enum LineFormat {
  inline,
  multiline,
}

export function languageHelper_enumValuesList(
  field: EnumValuesField,
  format: LineFormat,
  startingNumber: number,
  ending: string,
): string {
  let result = "";
  if (field.readParseStatus() === ParseStatus.valid && format === LineFormat.multiline) {
    const rawValues = field.getRootNode()!.matchedText.split(",");
    for (let i = 0; i < rawValues.length; i++) {
      const value = rawValues[i].trim();
      const line = `<br>  <el-id>${value}</el-id> = <el-lit>${i + startingNumber}</el-lit>`;
      result += line;
    }
    result += ending;
  } else {
    // bad parse status or format is inline
    result = field.default_renderAsHtml();
  }
  return result;
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
