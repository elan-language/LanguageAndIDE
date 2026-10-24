import { mainKeyword } from "../../../compiler/elan-keywords";
import { AbstractSelector } from "../abstract-selector";
import { CompoundFrame } from "../compound-frame";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { File } from "../frame-interfaces/file";
import { GlobalFrame } from "../frame-interfaces/global-frame";
import { Parent } from "../frame-interfaces/parent";
import { StatementSelector } from "../statements/statement-selector";

export class MainRoutine extends CompoundFrame implements GlobalFrame {
  isMain = true;
  isGlobal = true;
  file: File;
  constructor(parent: Parent) {
    super(parent);
    this.file = parent.getFile();
  }

  newChildSelector(): AbstractSelector {
    return new StatementSelector(this);
  }

  initialKeywords(): string {
    return mainKeyword;
  }

  getFields(): Field[] {
    return []; //no direct fields
  }

  getIdPrefix(): string {
    return `${this.language().languageHtmlClass}_main`;
  }

  frameSpecificAnnotation(): string {
    return "main routine";
  }

  get symbolId() {
    return "__main";
  }

  override outerHtmlTag: string = "el-main";

  indent(): string {
    return "";
  }

  public renderAsElanSource(): string {
    return `${this.sourceAnnotations()}main\r
${this.renderChildrenAsElanSource()}\r
end main\r
`;
  }

  parseTop(source: CodeSource) {
    source.remove("main");
  }
  parseBottom(source: CodeSource): boolean {
    return this.parseStandardEnding(source, "end main");
  }
}
