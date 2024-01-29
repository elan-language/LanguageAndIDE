import { Global } from "../globals/global";
import { Frame } from "../frame";
import { Text } from "./text";
import { MainFrame } from "../globals/main-frame";
import { FileFrame } from "../file-frame";

export class SelectGlobal extends Text implements Global {
    isGlobal = true;

    constructor(parent: Frame) {
        super(parent);
        this.setPrompt("main, procedure, function, constant ...");
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

    enterText(char: string): void {
        var empty = this.text ==="";
        if (empty && (char ==='m')) {
            //main & exit
            var main = new MainFrame(this.parent);
            (this.parent as FileFrame).addGlobalBefore(main, this);
            main.select(true);
            return;
        }
        if (empty && (char ==='f')) {
            //function & exit
            return;
        }
        if (empty && (char ==='p')) {
            //procedure & exit
            return;
        }
        if (empty && (char ==='e')) {
            //enum & exit
            return;
        }
        if (empty && (char ==='#')) {
            //comment & exit
            return;
        }     
        if (this.text === "c" && char ==="o") {
            //constant & exit
            return;
        }
        if (this.text === "c" && char ==="l") {
            //class & exit
            return;
        }
        super.enterText(char);
    }
}
