import { ghostedAnnotation } from "../../compiler/keywords";
import { AbstractFrame } from "./abstract-frame";
import { CodeSourceFromString } from "./code-source-from-string";
import { Regexes } from "./fields/regexes";
import {
  addDeleteToContextMenu,
  helper_pastePopUp,
  isFrameWithStatements,
  isSelector,
} from "./frame-helpers";
import { CodeSource } from "./frame-interfaces/code-source";
import { editorEvent } from "./frame-interfaces/editor-event";
import { Field } from "./frame-interfaces/field";
import { Frame } from "./frame-interfaces/frame";
import { Parent } from "./frame-interfaces/parent";
import { Profile } from "./frame-interfaces/profile";
import { Overtyper } from "./overtyper";
import { parentHelper_insertOrGotoChildSelector } from "./parent-helpers";
import { ParseStatus } from "./status-enums";

export abstract class AbstractSelector extends AbstractFrame {
  isSelector = true;
  isStatement = true;
  text: string = "";
  label: string = "new code";
  protected profile: Profile;
  overtyper = new Overtyper();

  constructor(parent: Parent) {
    super(parent);
    this.profile = this.getFile().getProfile();
    this.setParseStatus(ParseStatus.valid); //Can never be invalid.
  }

  initialKeywords(): string {
    return "selector";
  }

  helpAsHtml(): string {
    const active = this.helpActive ? ` class="active"` : "";
    this.helpActive = false;

    return this.isSelected()
      ? `<el-help contenteditable="false" title="Click to open Help for any of these instructions"> <a href="documentation/LangRef.html#${this.helpId()}" target="help-iframe" tabindex="-1"${active}>?</a></el-help>`
      : ``;
  }

  abstract defaultOptions(): [string, (parent: Parent) => Frame][];
  abstract profileAllows(keyword: string): boolean;
  abstract validWithinCurrentContext(keyword: string, userEntry: boolean): boolean;

  optionsFilteredByContext(userEntry: boolean): [string, (parent: Parent) => Frame][] {
    return this.defaultOptions().filter((o) => this.validWithinCurrentContext(o[0], userEntry));
  }

  optionsFilteredByProfile(userEntry: boolean): [string, (parent: Parent) => Frame][] {
    return this.optionsFilteredByContext(userEntry).filter((o) => this.profileAllows(o[0]));
  }

  parseFrom(source: CodeSource): Frame {
    let compilerDirective = "";
    source.removeIndent();
    if (source.isMatchRegEx(Regexes.compilerDirective)) {
      compilerDirective = source
        .removeRegEx(Regexes.compilerDirective, false)
        .replace("[", "")
        .replace("] ", "");
    }

    const options = this.optionsFilteredByContext(false).filter((o) => source.isMatch(o[0]));
    if (options.length === 1) {
      const typeToAdd = options[0][0];
      const frame = this.addFrame(typeToAdd, "");
      this.processCompilerDirective(frame, compilerDirective);
      frame.parseFrom(source);
      return frame;
    } else {
      throw new Error(`${options.length} matches found at ${source.readToEndOfLine()} `);
    }
  }

  private processCompilerDirective(frame: Frame, compilerDirective: string) {
    if (compilerDirective === ghostedAnnotation) {
      frame.setGhosted(true);
    }
  }

  optionsMatchingUserInput(match: string): [string, (parent: Parent) => Frame][] {
    return this.optionsFilteredByProfile(true).filter((o) => o[0].startsWith(match));
  }

  commonStartText(match: string): string {
    return this.optionsMatchingUserInput(match)
      .map((o) => o[0])
      .reduce((soFar, o) => this.maxCommonStart(soFar, o));
  }

  private maxCommonStart(a: string, b: string): string {
    return a !== "" && b !== "" && a[0] === b[0]
      ? a[0] + this.maxCommonStart(a.slice(1), b.slice(1))
      : "";
  }

  getCompletion(): string {
    return this.optionsMatchingUserInput(this.text)
      .map((o) => o[0])
      .reduce((soFar, kw) => `${soFar} ${this.adjusted(kw, this.text, soFar)}`, "");
  }

  adjusted(kw: string, input: string, soFar: string): string {
    const words = kw.split(" ");
    if (words.length === 1) {
      return kw;
    } else if (input.startsWith(`${words[0]}`)) {
      return words[1];
    } else if (soFar.includes(`${words[0]}...`)) {
      return "";
    } else {
      return `${words[0]}...`;
    }
  }

  addFrame(keyword: string, pendingChars: string): Frame {
    const func = this.defaultOptions().filter((o) => o[0] === keyword)[0][1];
    const parent = this.getParent();
    const newFrame: Frame = func(parent);
    parent.addChildBefore(newFrame, this);
    newFrame.selectFirstField();
    const fields = newFrame.getFields();
    if (fields.length > 0) {
      fields[0].overtyper.consumeChars(pendingChars, 500);
    } else if (isFrameWithStatements(newFrame)) {
      const ss = newFrame.getFirstChild();
      if (ss instanceof AbstractSelector) {
        ss.overtyper.consumeChars(pendingChars, 500);
      }
    }

    return newFrame;
  }

  protected setClasses() {
    super.setClasses();
    this.pushClass(this.text === "", "empty");
  }

  clearText(): void {
    this.text = "";
  }

  getFields(): Field[] {
    return [];
  }
  getIdPrefix(): string {
    return "select";
  }

  frameSpecificAnnotation(): string {
    return "";
  }

  override deselect(): void {
    super.deselect();
    this.text = "";
  }

  renderAsHtml(): string {
    return `<${this.outerHtmlTag} contenteditable spellcheck="false" class="${this.cls()}" id='${this.htmlId}' tabindex="-1" ${this.toolTip()}>${this.contextMenu()}${this.textToDisplayAsHtml()}</${this.outerHtmlTag}>`;
  }

  textToDisplayAsHtml(): string {
    return `<el-select><el-txt>${this.text}</el-txt><el-place>${this.label}</el-place><div class="options">${this.getCompletion()}</div>${helper_pastePopUp(this)}${this.helpAsHtml()}</el-select>`;
  }
  renderAsElanSource(): string {
    return `${this.indent()}`;
  }

  private selectorControlKeys = ["d", "O", "v", "?"];

  processKey(e: editorEvent): boolean {
    let codeHasChanged = false;
    let key = e.key;

    if (e.modKey.control && !this.selectorControlKeys.includes(key ?? "")) {
      return super.processKey(e);
    }

    switch (key) {
      case "Backspace": {
        this.text = this.text.substring(0, this.text.length - 1);
        break;
      }
      case "Delete": {
        this.deleteIfPermissible(); // Deleting selector is not a code change
        codeHasChanged = true;
        break;
      }
      case "Enter": {
        //do nothing. This is to prevent it being passed up to superclass
        break;
      }
      case "d": {
        if (e.modKey.control) {
          this.deleteIfPermissible(); // Deleting selector is not a code change
          codeHasChanged = true;
          break;
        }
      }
      case "v": {
        if (e.modKey.control) {
          this.paste(e.optionalData ?? "");
          codeHasChanged = true;
          break; // break inside condition (unusually) because 'v' without 'Ctrl' needs to be picked up by default case.
        }
      }
      case "O": {
        if (e.modKey.control) {
          this.expandCollapseAll();
          break;
        }
      }
      case "t": {
        if (e.modKey.alt) {
          this.getFile().removeAllSelectorsThatCanBe();
          break;
        }
      }
      case "?": {
        if (e.modKey.control) {
          this.showHelp();
          break;
        }
      }
      default: {
        if (!key || key.length === 1) {
          key = key?.toLowerCase();
          this.processOptions(key);
          codeHasChanged = true;
        } else {
          codeHasChanged = super.processKey(e);
        }
      }
    }
    return codeHasChanged;
  }

  override deleteIfPermissible(): void {
    if (this.getParent().minimumNumberOfChildrenExceeded()) {
      this.delete();
    }
  }

  paste = (code?: string): boolean => {
    try {
      code = (code ?? "").trim() + "\n";

      const source = new CodeSourceFromString(code, true);
      const newFrame = this.parseFrom(source);

      if (source.hasMoreCode() && source.getRemainingCode().trim()) {
        const remainingCode = source.getRemainingCode();
        const frame = this.getParent().getChildAfter(newFrame);
        const selector = isSelector(frame)
          ? frame
          : parentHelper_insertOrGotoChildSelector(this.getParent(), false, frame);
        selector.paste(remainingCode);
      }
      this.getFile().removeAllSelectorsThatCanBe();
    } catch (_e) {
      this.pasteError = `Paste failed: Cannot paste '${code}' into prompt`;
    }

    return true;
  };

  canBePastedIn(frame: Frame): boolean {
    return this.optionsMatchingUserInput(frame.initialKeywords()).length === 1;
  }

  processOptions(key: string | undefined) {
    if (this.overtyper.hasNotConsumed(key)) {
      const options = this.optionsMatchingUserInput(this.text + key);
      if (options.length > 1) {
        this.text += this.commonStartText(this.text + key).substring(this.text.length);
      } else if (options.length === 1) {
        const typeToAdd = options[0][0];

        const pendingChars = typeToAdd.slice((this.text + key).length);

        this.addFrame(typeToAdd, pendingChars);
        this.text = "";
      }
    }
  }

  insertPeerSelector(_after: boolean): void {
    throw new Error("Should never be called on a Selector");
  }

  selectFirstField(): boolean {
    this.select(true, false);
    return true;
  }

  selectLastField(): boolean {
    this.select(true, false);
    return true;
  }

  worstParseStatusOfFields(): ParseStatus {
    return this.text ? ParseStatus.incomplete : ParseStatus.valid;
  }

  getContextMenuItems() {
    const map = new Map<string, [string, (s?: string) => boolean]>();

    addDeleteToContextMenu(this, map);
    map.set("paste", ["paste <span class='kb'>Ctrl+v</span>", this.paste]);

    return map;
  }
}
