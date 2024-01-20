import { AbstractFrame } from "../abstract-frame";
import { Global } from "./global";

import { Statement } from "../statements/statement";
import { StatementSelector } from "../statements/statement-selector";
import { Type } from "../text-entry/type";
import { Constructor } from "../members/constructor";
import { Member } from "../members/member";
import { AsString } from "../members/as-string";
import { MemberSelector } from "../members/member-selector";


export class Class extends AbstractFrame implements Global {

    public name : Type = new Type("class name");
    private constr: Constructor = new Constructor();
    private members: Array<Member> = new Array<Member>();
    public asString: AsString = new AsString();
    public abstract: boolean = false;
    public immutable: boolean = false;

    constructor() {
        super();
        this.htmlId = `class${this.nextId()}`;
        this.isMultiLine = true;
        this.addMember(new MemberSelector());
    }

    private modifiers() : string {
        return `${this.abstract ? "<keyword>abstract </keyword>" : ""}${this.immutable ? "<keyword>immutable </keyword>" : ""}`;
    }

    public renderAsHtml() : string {
        const ss: Array<string> = [];
        for (var m of this.members) {
            ss.push(m.renderAsHtml());
        }
        const members = ss.join("\n");
        return `<classDef class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand>${this.modifiers()}<keyword>class </keyword>${this.name.renderAsHtml()}</top>
${this.constr.renderAsHtml()}
${members}
${this.asString.renderAsHtml()}
<keyword>end class</keyword>
</classDef>`;
    }

    public addMember(m : Member) {
        this.members.push(m);
    }
}