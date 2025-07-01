import { AbstractFrame } from "./abstract-frame";
import { helper_pastePopUp, isFrameWithStatements } from "./frame-helpers";
import { CodeSource } from "./frame-interfaces/code-source";
import { editorEvent } from "./frame-interfaces/editor-event";
import { Field } from "./frame-interfaces/field";
import { Frame } from "./frame-interfaces/frame";
import { Parent } from "./frame-interfaces/parent";
import { Profile } from "./frame-interfaces/profile";
import { Overtyper } from "./overtyper";
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
    return this.isSelected()
      ? `<el-help title="Click to open Help for any of these instructions"> <a href="documentation/LangRef.html#${this.helpId()}" target="doc-iframe">?</a></el-help>`
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

  parseFrom(source: CodeSource): void {
    source.removeIndent();
    const options = this.optionsFilteredByContext(false).filter((o) => source.isMatch(o[0]));
    if (options.length === 1) {
      const typeToAdd = options[0][0];
      const frame = this.addFrame(typeToAdd, "");
      frame.parseFrom(source);
    } else {
      throw new Error(`${options.length} matches found at ${source.readToEndOfLine()} `);
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
  override deselect(): void {
    super.deselect();
    this.text = "";
  }
  textToDisplayAsHtml(): string {
    return `<el-select><el-txt>${this.text}</el-txt><el-place>${this.label}</el-place><div class="options">${this.getCompletion()}</div>${helper_pastePopUp(this)}${this.helpAsHtml()}</el-select>`;
  }
  renderAsSource(): string {
    return `${this.indent()}`;
  }
  processKey(e: editorEvent): boolean {
    let codeHasChanged = false;
    let key = e.key;
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
          this.paste();
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

  paste(): void {
    const parent = this.getParent();
    const sp = this.getScratchPad();
    const frames = sp.readFrames();
    let ok = frames && frames.length > 0;
    if (ok) {
      for (const fr of frames!) {
        ok = ok && this.canBePastedIn(fr);
      }
      if (ok) {
        for (const fr of frames!) {
          parent.addChildBefore(fr, this);
          fr.setParent(parent);
          fr.select(true, false);
        }
        sp.remove(frames!);
        this.deleteIfPermissible();
      } else {
        this.pasteError = "Paste Failed: Cannot paste frame into location";
      }
    } else {
      this.pasteError = "Paste Failed: Nothing to paste";
    }
  }

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
}
