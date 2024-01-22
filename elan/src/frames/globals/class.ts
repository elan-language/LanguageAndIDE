import { AbstractFrame } from "../abstract-frame";
import { Global } from "./global";
import { Type } from "../text-fields/type";
import { Constructor } from "../class-members/constructor";
import { Member } from "../class-members/member";
import { AsString } from "../class-members/as-string";
import { MemberSelector } from "../class-members/member-selector";
import { Frame } from "../frame";


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
        this.multiline = true;
    }
    
    public override initialize(frameMap: Map<string, Frame>, parent?: Frame | undefined): void {
        super.initialize(frameMap, parent);
        this.addMember(new MemberSelector());
        this.constr.initialize(frameMap, this);
        this.name.initialize(frameMap, this);
        this.asString.initialize(frameMap, this);
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
        m.initialize(this.frameMap, this);
        this.members.push(m);
    }
}