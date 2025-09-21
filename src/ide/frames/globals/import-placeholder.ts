import { constantKeyword, importKeyword } from "../../../compiler/keywords";
import { AbstractFrame } from "../abstract-frame";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { File } from "../frame-interfaces/file";
import { GlobalFrame } from "../frame-interfaces/global-frame";

// Import acts as a *temporary placeholder* when importing code from a file, Once the code is read
// and parses, the appropriate frames are added *in place* of this, each with its `imported` flag set.
export class ImportPlaceholder extends AbstractFrame implements GlobalFrame {
  isGlobal = true;
  file: File;
  constructor(parent: File) {
    super(parent);
    this.file = parent;
    this.canHaveBreakPoint = false;
  }
  initialKeywords(): string {
    return constantKeyword;
  }

  getFields(): Field[] {
    return [];
  }

  getIdPrefix(): string {
    return "import";
  }
  renderAsHtml(): string {
    return `<el-global class="${this.cls()}" id='${this.htmlId}' tabindex="-1" ${this.toolTip()}>${this.contextMenu()}${this.bpAsHtml()}<el-kw>${importKeyword} </el-kw> <el-txt>Right-click or Ctrl-m and 'select file'</el-txt>${this.helpAsHtml()}</el-global>`;
  }

  indent(): string {
    return "";
  }
  renderAsSource(): string {
    return ``; // Not saved to source
  }

  parseFrom(source: CodeSource): void {
    throw new Error(`Import should not be parsed: ${source}`);
  }
}
