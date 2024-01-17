import { Frame } from "../frame";
import { Global } from "./global";
import { nextId } from "../helpers";
import { Statement } from "../statements/statement";
import { StatementSelector } from "../statements/statement-selector";
import { Type } from "../text-entry-fields/type";
import { Constructor } from "../members/constructor";
import { Member } from "../members/member";
import { AsString } from "../members/as-string";
import { MemberSelector } from "../members/member-selector";


export class Class implements Global {

    public name : Type = new Type("class name");
    private cons: Constructor = new Constructor();
    private members: Array<Member> = new Array<Member>();
    public asString: AsString = new AsString();
    public htmlId: string ="";

    constructor() {
        this.htmlId = `class${nextId()}`;
        this.addMember(new MemberSelector());
    }

    private cls() : string {
        return "";
    };

    public renderAsHtml() : string {
        const ss: Array<string> = [];
        for (var m of this.members) {
            ss.push(m.renderAsHtml());
        }
        const members = ss.join("\n");
        return `<classDef class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<keyword>class </keyword>${this.name.renderAsHtml()}
${this.cons.renderAsHtml()}
${members}
${this.asString.renderAsHtml()}
<keyword>end class</keyword>
</classDef>`;
    }

    public addMember(m : Member) {
        this.members.push(m);
    }
}