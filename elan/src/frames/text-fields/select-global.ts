import { Global } from "../globals/global";
import { Frame } from "../frame";
import { Text } from "./text";
import { File } from "../file";
import { MainFrame } from "../globals/main-frame";
import { Function } from "../globals/function";
import { Procedure } from "../globals/procedure";
import { Enum } from "../globals/enum";
import { GlobalComment } from "../globals/global-comment";
import { Class } from "../globals/class";
import { Constant } from "../globals/constant";

export class SelectGlobal extends Text implements Global {
    isGlobal = true;

    constructor(parent: Frame) {
        super(parent);
        this.setPrompt("class constant enum function main procedure #");
    }

    getPrefix(): string {
        return 'globalSelect';
    }

    renderAsHtml(): string {
        return `<global>${super.renderAsHtml()}</global>`;
    }

    indent(): string {
        return "";
    }

    renderAsSource(): string {
        return ``;
    } 

    private addBeforeAndSelect(global: Global) {
        (this.parent as File).addGlobalBefore(global, this);
        this.deselectAll(); //TODO should happen automatically
        global.select(true, false);
    }

    enterText(char: string): void {
        var empty = this.text ==="";
        if (empty && (char ==='m')) {
            var m = new MainFrame(this.parent);
            this.addBeforeAndSelect(m);
            return;
        }
        if (empty && (char ==='f')) {
            var f = new Function(this.parent);
            this.addBeforeAndSelect(f);
            return;
        }
        if (empty && (char ==='p')) {
            var p = new Procedure(this.parent);
            this.addBeforeAndSelect(p);
            return;
        }
        if (empty && (char ==='e')) {
            var e = new Enum(this.parent);
            this.addBeforeAndSelect(e);
            return;
        }
        if (empty && (char ==='#')) {
            var com = new GlobalComment(this.parent);
            this.addBeforeAndSelect(com);
            return;
        }     
        if (this.text === "c" && char ==="o") {
            var con= new Constant(this.parent);
            this.text = "";
            this.addBeforeAndSelect(con);
            return;
        }
        if (this.text === "c" && char ==="l") {
            var cl= new Class(this.parent);
            this.text = "";
            this.addBeforeAndSelect(cl);
            return;
        }
        super.enterText(char);
    }
}
