import { getConstantType } from "../compile-api/parser-helpers";
import { Property } from "./class-members/property";
import { FileImpl } from "./file-impl";
import { Field } from "./frame-interfaces/field";
import { Frame } from "./frame-interfaces/frame";
import { Language } from "./frame-interfaces/language";
import { ConstantGlobal } from "./globals/constant-global";
import { FunctionFrame } from "./globals/function-frame";
import { TestFrame } from "./globals/test-frame";
import { LanguageCfamily } from "./language-c-family";
import { AssertStatement } from "./statements/assert-statement";
import { PrintStatement } from "./statements/print-statement";

export class LanguageJava extends LanguageCfamily {
  static Instance: Language = new LanguageJava();

  languageHtmlClass = "java";
  languageFullName: string = "Java";
  defaultFileExtension: string = "java";
  defaultMimeType: string = "text/plain";

  commentRegex(): RegExp {
    return this.common_commentRegex();
  }

  annotation(frame: Frame): string {
    let annotation = this.common_Annotation(frame);
    if (frame instanceof ConstantGlobal) {
      annotation = frame.frameSpecificAnnotation();
    }
    return annotation;
  }

  renderSingleLineAsHtml(frame: Frame): string {
    let html = "";
    if (frame instanceof AssertStatement) {
      html = `<el-method>assertEquals</el-method>(${frame.expected.renderAsHtml()}, ${frame.actual.renderAsHtml()});`;
    } else if (frame instanceof ConstantGlobal) {
      // special case because the </el-top> needs to be placed part way through the line
      html = `<el-kw>${this.STATIC} ${this.FINAL} </el-kw><el-type>${getConstantType(frame.value.text, this)} </el-type>${frame.name.renderAsHtml()}</el-top><el-punc> = </el-punc>${frame.value.renderAsHtml()};`;
    } else if (frame instanceof PrintStatement) {
      html = `<el-type>System</el-type>.<el-type>out</el-type>.<el-method>println</el-method>(${frame.arg.renderAsHtml()});`;
    } else if (frame instanceof Property) {
      html = `${this.modifierAsHtml(frame)}${frame.type.renderAsHtml()} ${frame.name.renderAsHtml()};`;
    } else {
      html = this.common_renderSingleLineAsHtml(frame);
    }
    return html;
  }

  renderTopAsHtml(frame: Frame): string {
    let html = "";
    if (frame instanceof TestFrame) {
      html = `<el-kw>class</el-kw> ${this.testClassNameAsHtml(frame)} {<br>@<el-type>Test</el-type> <el-kw>${this.STATIC} ${this.VOID} </el-kw>${frame.testName.renderAsHtml()}() {`;
    } else {
      html = this.common_renderTopAsHtml(frame);
    }
    return html;
  }

  renderBottomAsHtml(frame: Frame): string {
    let html = this.common_renderBottomAsHtml(frame);
    if (frame instanceof TestFrame) {
      html = `<el-punc>}</el-punc>${html}`;
    }
    return html;
  }

  renderFileImportsAsHtml(): string {
    return "";
  }
  renderSpecificHeaderAsHtml(_f: FileImpl): string {
    return "<div><el-kw>public class</el-kw> <el-type>Global</el-type> <el-punc>{</el-punc><br><br></div><div class='global-indent'>";
  }
  renderFileTrailerAsHtml(_f: FileImpl): string {
    return "</div>\n} <el-comment>// end Global</el-comment>";
  }

  public FINAL = "final";
  OVERRIDES = "";
  EXTENDS = "extends";
  IMPLEMENTS = "implements";
  BOOL_NAME: string = "boolean";
  FUNC_NAME: string = "Func";

  public STRING_NAME: string = "String";

  INTERPOLATED_STRING_PREFIX: string = "S"; // because of String.format

  postProcessHtml(html: string): string {
    return html;
  }

  functionFrameFields(frame: FunctionFrame): Field[] {
    return this.common_functionFrameFields(frame);
  }

  assertStatementFields(frame: AssertStatement): Field[] {
    return this.common_assertStatementFields(frame);
  }

  ARROW: string = "->";

  reservedWords: Set<string> = new Set<string>([
    `abstract`,
    `continue`,
    `for`,
    `new`,
    `switch`,
    `assert`,
    `default`,
    `goto`,
    `package`,
    `synchronized`,
    `boolean`,
    `do`,
    `if`,
    `private`,
    `this`,
    `break`,
    `double`,
    `implements`,
    `protected`,
    `throw`,
    `byte`,
    `else`,
    `import`,
    `public`,
    `throws`,
    `case`,
    `enum`,
    `instanceof`,
    `return`,
    `transient`,
    `catch`,
    `extends`,
    `int`,
    `short`,
    `try`,
    `char`,
    `final`,
    `interface`,
    `static`,
    `void`,
    `class`,
    `finally`,
    `long`,
    `strictfp`,
    `volatile`,
    `const`,
    `float`,
    `native`,
    `super`,
    `while`,
  ]);
}
