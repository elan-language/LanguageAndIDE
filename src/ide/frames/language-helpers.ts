import { ClassFrame } from "./globals/class-frame";
import { InheritanceNode } from "./parse-nodes/inheritanceNode";

export function languageHelper_inheritance(
  frame: ClassFrame,
  inheritsWord: string,
  implementsWord: string,
  joiner: string
): string {
  const node = frame.inheritance.getRootNode()! as InheritanceNode;
  const field = frame.inheritance;
  const hasSupertype = frame.doesInherit();
  let result = "";
  if (field.isSelected() || (frame.isSelected() && !hasSupertype)) {
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
