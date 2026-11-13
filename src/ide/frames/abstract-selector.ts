import { AbstractFrame } from "./abstract-frame";
import { addDeleteToContextMenu } from "./frame-helpers";
import { editorEvent } from "./frame-interfaces/editor-event";
import { Field } from "./frame-interfaces/field";
import { Frame } from "./frame-interfaces/frame";
import { Parent } from "./frame-interfaces/parent";
import { Selector } from "./frame-interfaces/selector";
import { FrameType } from "./frame-type";
import { FrameWithStatements } from "./frame-with-statements";
import { Paradigm } from "./paradigm";
import { ParseStatus } from "./status-enums";

export abstract class AbstractSelector extends AbstractFrame implements Selector {
  frameType: FrameType = FrameType.selector;
  isSelector = true;
  isStatement = true;
  text: string = "";
  sourcePasting = false;

  constructor(parent: Parent) {
    super(parent);
    this.setParseStatus(ParseStatus.valid); //Can never be invalid.
  }

  getParadigm(): Paradigm {
    return this.getFile().getParadigm();
  }

  helpAsHtml(): string {
    const active = this.helpActive ? ` class="active"` : "";
    this.helpActive = false;

    return this.isSelected()
      ? `<el-help contenteditable="false" title="Click to open Help for any of these instructions"> <a href="documentation/LangRef.html#${this.helpId()}" target="help-iframe" tabindex="-1"${active}>?</a></el-help>`
      : ``;
  }

  abstract defaultOptions(): [FrameType, string, string, boolean][];
  abstract validWithinCurrentContext(type: FrameType, userEntry: boolean): boolean;

  optionsFilteredByContext(userEntry: boolean): [FrameType, string, string, boolean][] {
    return this.defaultOptions().filter((o) => this.validWithinCurrentContext(o[0], userEntry));
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

  abstract createFrame(type: FrameType, parent: Parent): Frame;

  addFrame(type: FrameType): Frame {
    const option = this.defaultOptions().filter((o) => o[0] === type)[0];
    const addAtPeerLevel = option[3];
    const parent = this.getParent();
    const newFrame: Frame = this.createFrame(type, parent);
    if (addAtPeerLevel) {
      parent.addChildBefore(newFrame, this);
    } else {
      parent.getParent().addChildAfter(newFrame, parent as unknown as Frame);
    }
    if (newFrame.getFields().length > 0) {
      newFrame.selectFirstField();
    } else if (newFrame instanceof FrameWithStatements) {
      newFrame.selectFirstChild(false);
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
    return `${this.language().languageHtmlClass}_select`;
  }

  override deselect(): void {
    super.deselect();
    this.text = "";
  }

  renderAsHtml(): string {
    const message = this.isSelected()
      ? "press Enter, or <i>right</i>-click here, to view options"
      : "new code";
    return `<${this.outerHtmlTag} contenteditable spellcheck="false" class="${this.cls()}" id='${this.htmlId}' tabindex="-1">${this.contextMenu()}<el-top class="newcode">${message}</el-top>${this.compileMsgAsHtml()}</${this.outerHtmlTag}>`;
  }

  renderAsSource(): string {
    return `${this.indent()}`;
  }

  private selectorControlKeys = ["d", "O", "v", "?"];

  // for special handling of try/catch statements, which don't have a field
  // in the the first line to catch the Backspace
  private deleteParentOnBackspace = false;
  setDeleteParentOnBackspace() {
    this.deleteParentOnBackspace = true;
  }

  processKey(e: editorEvent): boolean {
    let codeHasChanged = false;
    let key = e.key;

    if (e.modKey.control && !this.selectorControlKeys.includes(key ?? "")) {
      return super.processKey(e);
    }

    switch (key) {
      case "Backspace": {
        // Apologies for the wild casting.  Perhaps it can be done another way.
        const par = this.getParent() as unknown as AbstractFrame;
        if (this.deleteParentOnBackspace && par.isNewlyCreated()) {
          // it is the first selector in a new TryStatement, delete the whole TryStatement
          par.deleteIfPermissible();
        }
        this.text = this.text.substring(0, this.text.length - 1);
        break;
      }
      case "Delete": {
        this.deleteIfPermissible(); // Deleting selector is not a code change
        codeHasChanged = true;
        break;
      }
      case "Enter": {
        this.showContextMenu = true;
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

  protected handleContextMenuEvent(e: editorEvent): boolean {
    let codeHasChanged = false;
    if (e.command) {
      // This case is when user has selected an item FROM the context menu
      const map = this.getContextMenuItems();
      codeHasChanged = map.get(e.command)![1]?.(e.optionalData);
    } else {
      // Bringup the context menu
      if (!this.isSelected()) {
        this.select(true, false);
      }
      this.showContextMenu = true;
    }
    return codeHasChanged;
  }

  override deleteIfPermissible(): void {
    if (this.getParent().minimumNumberOfChildrenExceeded()) {
      this.delete();
    }
  }

  abstract parseFrames(code: string): Frame[];

  paste = (code?: string): boolean => {
    let result = true;

    code = (code ?? "").trim() + "\n";

    let parsedFrames: Frame[] = [];
    try {
      parsedFrames = this.parseFrames(code);
    } catch (_e) {
      this.pasteError = `Paste failed: Pasted code did not parse as ${this.language().languageFullName}`;
      result = false;
    }

    const rejectedFrames: FrameType[] = [];
    for (const frame of parsedFrames) {
      if (this.validWithinCurrentContext(frame.frameType, true)) {
        this.getParent().addChildBefore(frame, this);
      } else {
        rejectedFrames.push(frame.frameType);
      }
    }

    if (rejectedFrames.length > 0) {
      const names = rejectedFrames.reduce((f) => `${f.toString()}`, "");
      this.pasteError = `The following instructions were not pasted as they are not valid in the selected location: ${names}`;
      result = false;
    }

    return result;
  };

  processOptions(key: string | undefined) {
    const options = this.optionsFilteredByContext(true).filter((o) => o[1] === key);
    if (options.length === 1) {
      const typeToAdd = options[0][0];
      this.addFrame(typeToAdd);
      this.text = "";
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
    const allOptions = this.optionsFilteredByContext(true);
    allOptions.forEach((o) => {
      const type = o[0];
      const action = () => {
        this.addFrame(type);
        return true;
      };
      const html = `${o[2]}`;
      map.set(type.toString(), [html, action]);
    });
    map.set("paste", ["separator paste <span class='kb'>Ctrl+v</span>", this.paste]);
    addDeleteToContextMenu(this, map);
    return map;
  }

  protected getCommentMarker() {
    return this.getFile().language().COMMENT_MARKER;
  }
}
