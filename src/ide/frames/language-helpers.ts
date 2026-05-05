import { EnumValuesField } from "./fields/enum-values-field";
import { InheritsFromField } from "./fields/inherits-from-field";
import { ClassFrame } from "./globals/class-frame";
import { InheritanceNode } from "./parse-nodes/inheritanceNode";
import { ParseStatus } from "./status-enums";

export enum LineFormat {inline, multiline}

export function languageHelper_enumValuesList(
   field: EnumValuesField,
   format: LineFormat,
   startingNumber: number,
   ending: string  //Used only by VB 'End Enum', otherwise ""
): string {
  let result = "";
  if (field.readParseStatus() === ParseStatus.valid) {
      if (format === LineFormat.multiline) {
        result = `<el-field id="${field.htmlId}"><br>`;
        const rawValues = field.getRootNode()!.matchedText.split(",");
        for (let i = 0; i < rawValues.length; i++) {
          const value = rawValues[i].trim();
          const line = `  <el-id>${value}</el-id> = <el-lit>${i+startingNumber}</el-lit><br>`;
          result += line;
        }
      } else {
         result = field.default_renderAsHtml();
      }
      result += `${ending}</el-field>` ;
  } else {
    result = field.default_renderAsHtml();
  }
  return result;
}

export function languageHelper_inheritance(
  field: InheritsFromField,
  start: string,
  inheritsWord: string,
  joiner: string,
  implementsWord: string,
  finish: string
): string {
  const frame = field.getHolder() as ClassFrame;
  const node = field.getRootNode()! as InheritanceNode;
  let result = "";
  if (frame.doesInherit() && field.readParseStatus() === ParseStatus.valid) {
    const inheritsKw = inheritsWord === "" ? "" : `<el-kw>${inheritsWord}</el-kw> `;
    const implementsKw = implementsWord === "" ? "" : `<el-kw>${implementsWord}</el-kw> `;
    result = `<el-field id="${field.htmlId}">${start}`;
    const abstractClasses = node.getAbstractClassNames();
    if (abstractClasses.length > 0) {
      const typesAsHtml: string[] = abstractClasses.map((t) => `<el-type>${t}</el-type>`);
      const csvTypes = typesAsHtml.join(", ");

      result += `${joiner}${inheritsKw}${csvTypes}`;
    }
    const interfaces = node.getInterfaceNames();
    if (interfaces.length > 0) {
      const typesAsHtml: string[] = interfaces.map((t) => `<el-type>${t}</el-type>`);
      const csvTypes = typesAsHtml.join(", ");
      const keyWord = frame.isInterface ? inheritsKw : implementsKw;
      result += `${joiner}<el-kw>${keyWord}</el-kw> ${csvTypes}`;
    }
    result += `${finish}</el-field>`;
  } else {
    result = field.default_renderasHtml();
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
