import { ClassFrame } from "./globals/class-frame";
import { Enum } from "./globals/enum";
import { EnumValuesList } from "./parse-nodes/enum-values-list";
import { InheritanceNode } from "./parse-nodes/inheritanceNode";

export enum EnumValuesFormat {csv, multiline}

export function languageHelper_enumValuesList(
   frame: Enum,
   format: EnumValuesFormat,
   startingNumber: number,
   ending: string  //Used only by VB 'End Enum', otherwise ""
): string {
  const field = frame.values;
  const values = field.getRootNode() as EnumValuesList;
  let result = "";
  if (field.isSelected()) {
    result = field.renderAsHtml();
  } else {
    if (format === EnumValuesFormat.csv) {
      result = field.renderAsHtml();
    } else { //format is multiline
      result = "<br>";
      const rawValues = values.matchedText.split(", ");
      for (let i = 0; i < rawValues.length; i++) {
        const value = rawValues[i];
        const line = `  <el-id>${value}</el-id> = <el-lit>${i+startingNumber}</el-lit><br>`;
        result += line;
      }
    }
    result += ending;
  }
  return result;
}

export function languageHelper_inheritance(
  frame: ClassFrame,
  inheritsWord: string,
  implementsWord: string,
  joiner: string,
): string {
  const node = frame.inheritance.getRootNode()! as InheritanceNode;
  const field = frame.inheritance;
  const hasSupertype = frame.doesInherit();
  let result = "";
  if (field.isSelected()) {
    result = ` ${field.renderAsHtml()}`;
  } else if (frame.isSelected() && !hasSupertype) {
     result = `${field.renderAsHtml()}`;
  } else if (hasSupertype && node.isValid()) {
    //TODO:  If frame is an interface, then any interface supertypes should be 'extend/inherit' rather than 'implements`
    const abstractClasses = node.getAbstractClassNames();
    if (abstractClasses.length > 0) {
      const typesAsHtml: string[] = abstractClasses.map((t) => `<el-type>${t}</el-type>`);
      const csvTypes = typesAsHtml.join(", ");
      result = `${joiner}<el-kw>${inheritsWord}</el-kw> ${csvTypes}`;
    }
    const interfaces = node.getInterfaceNames();
    if (interfaces.length > 0) {
      const typesAsHtml: string[] = interfaces.map((t) => `<el-type>${t}</el-type>`);
      const csvTypes = typesAsHtml.join(", ");
      const keyWord = frame.isInterface ? inheritsWord : implementsWord;
      result += `${joiner}<el-kw>${keyWord}</el-kw> ${csvTypes}`;
    }
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
