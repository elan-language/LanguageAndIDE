import { AbstractFrame } from "../abstract-frame";
import { Global } from "./global";
import { Type } from "../text-fields/type";
import { Constructor } from "../class-members/constructor";
import { Member } from "../class-members/member";
import { AsString } from "../class-members/as-string";
import { MemberSelector } from "../class-members/member-selector";
import { Frame } from "../frame";
import { HasChildren } from "../has-children";
import { isMember } from "../helpers";


export class Class extends AbstractFrame implements Global, HasChildren {

    public name: Type = new Type("class name");
    private members: Array<Member> = new Array<Member>();
    public abstract: boolean = false;
    public immutable: boolean = false;

    constructor() {
        super();
        this.htmlId = `class${this.nextId()}`;
        this.multiline = true;
    }

    private get constr() {
        return this.members[0] as Constructor;
    }

    get asString() {
        return this.members[this.members.length -1] as AsString;
    }

    selectFirstChild(): void {
        this.members[0].select();
    }

    selectLastChild(): void {
        this.members[this.members.length - 1].select();
    }

    selectChildAfter(child: Frame): void {
        if (isMember(child)) {
            const index = this.members.indexOf(child);
            if (index >=0 && index < this.members.length - 1) {
                this.members[index + 1].select();
            }
        }
    }
    selectChildBefore(child: Frame): void {
        if (isMember(child)) {
            const index = this.members.indexOf(child);
            if (index > 0) {
                this.members[index - 1].select();
            }
        }
    }

    public override initialize(frameMap: Map<string, Frame>, parent?: Frame | undefined): void {
        super.initialize(frameMap, parent);
        this.addFixedMember(new Constructor());
        this.addFixedMember(new MemberSelector());
        this.addFixedMember(new AsString());
        this.name.initialize(frameMap, this);
    }

    isGlobal = true;

    private modifiers(): string {
        return `${this.abstract ? "<keyword>abstract </keyword>" : ""}${this.immutable ? "<keyword>immutable </keyword>" : ""}`;
    }

    public renderAsHtml(): string {
        const ss: Array<string> = [];
        for (var m of this.members) {
            ss.push(m.renderAsHtml());
        }
        const members = ss.join("\n");
        return `<classDef class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand>${this.modifiers()}<keyword>class </keyword>${this.name.renderAsHtml()}</top>
${members}
<keyword>end class</keyword>
</classDef>`;
    }

    private addFixedMember(m: Member) {
        m.initialize(this.frameMap, this);
        this.members.push(m);
    }

    public addMember(m: Member) {
        m.initialize(this.frameMap, this);
        const asString = this.members.pop();
        this.members.push(m);
        this.members.push(asString!);
    }
}