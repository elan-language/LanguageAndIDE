import { ClassFrame } from "./globals/class-frame";
import { InheritanceNode } from "./parse-nodes/inheritanceNode";

export function languageHelper_inheritance(
  frame: ClassFrame,
  inheritsWord: string,
  implementsWord: string,
  joiner: string,
): string {
  const node = frame.inheritance.getRootNode()! as InheritanceNode;
  const field = frame.inheritance;
  let result = " <i>inheritance:</i> ";
  if (field.isSelected()) {
    result = ` ${field.renderAsHtml()}`;
  } else if (frame.doesInherit() && node.isValid()) {
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
      result += `${joiner}<el-kw>${implementsWord}</el-kw> ${csvTypes}`;
    }
  }
  return result;
}
