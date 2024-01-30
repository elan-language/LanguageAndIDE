import {Global} from "./globals/global";
import { Member } from "./class-members/member";
import { Statement } from "./statements/statement";
import { Each } from "./statements/each";
import { Property } from "./class-members/property";
import { FunctionMethod } from "./class-members/function-method";
import { ProcedureMethod } from "./class-members/procedure-method";
import { FrameWithStatements } from "./frame-with-statements";
import {File} from "./file";
import { MainFrame } from "./globals/main-frame";
import { Class } from "./globals/class";
import { Procedure } from "./globals/procedure";
import { Function } from "./globals/function";
import { Enum } from "./globals/enum";
import { Constant } from "./globals/constant";
import { GlobalComment } from "./globals/global-comment";
import { Call } from "./statements/call";
import { For } from "./statements/for";
import { IfThen } from "./statements/if-then";
import { Print } from "./statements/print";
import { Repeat } from "./statements/repeat";
import { Throw } from "./statements/throw";
import { While } from "./statements/while";
import { TryCatch } from "./statements/try-catch";
import { Variable } from "./statements/variable";
import { SetStatement } from "./statements/set-statement";

export interface FrameFactory {
    //Globals
    addMainBefore(global: Global): void;
    addFunctionBefore(global: Global): void;
    addProcedureBefore(global: Global): void;
    addEnumBefore(global: Global): void;
    addClassBefore(global: Global): void;
    addGlobalCommentBefore(global: Global): void;
    addConstantBefore(global: Global): void;
   
    //Statements
    addCallBefore(s: Statement): void;
    addEachBefore(s: Statement): void;
    addForBefore(s: Statement): void;
    addIfThenBefore(s: Statement): void;
    addPrintBefore(s: Statement): void;
    addRepeatBefore(s: Statement): void;
    addSetBefore(s: Statement): void;
    addSwitchBefore(s: Statement): void;
    addThrowBefore(s: Statement): void;
    addTryBefore(s: Statement): void;
    addVarBefore(s: Statement): void;
    addWhileBefore(s: Statement): void;

    // Members
    addPropertyBefore(member: Member): void;
    addFunctionMethodBefore(member: Member): void;
    addProcedureMethodBefore(member: Member): void;
}

export class FrameFactoryImpl implements FrameFactory {
    addMainBefore(g: Global): void {
        var m = new MainFrame(g.getParent());
        this.addGlobalBeforeAndSelect(m,g);
    }
    addFunctionBefore(g: Global): void {
        var m = new Function(g.getParent());
        this.addGlobalBeforeAndSelect(m,g);
    }
    addProcedureBefore(g: Global): void {
        var m = new Procedure(g.getParent());
        this.addGlobalBeforeAndSelect(m,g);
    }
    addEnumBefore(g: Global): void {
        var m = new Enum(g.getParent());
        this.addGlobalBeforeAndSelect(m,g);
    }
    addClassBefore(g: Global): void {
        var m = new Class(g.getParent());
        this.addGlobalBeforeAndSelect(m,g);
    }
    addGlobalCommentBefore(g: Global): void {
        var m = new GlobalComment(g.getParent());
        this.addGlobalBeforeAndSelect(m,g);
    }
    addConstantBefore(g: Global): void {
        var m = new Constant(g.getParent());
        this.addGlobalBeforeAndSelect(m,g);
    }
    addCallBefore(s: Statement): void {
        var newS = new Call(s.getParent());
        this.addStatementBeforeAndSelect(newS,s);
    }
    addEachBefore(s: Statement): void {
        var newS = new Each(s.getParent());
        this.addStatementBeforeAndSelect(newS,s);
    }
    addForBefore(s: Statement): void {
        var newS = new For(s.getParent());
        this.addStatementBeforeAndSelect(newS,s);
    }
    addIfThenBefore(s: Statement): void {
        var newS = new IfThen(s.getParent());
        this.addStatementBeforeAndSelect(newS,s);
    }
    addPrintBefore(s: Statement): void {
        var newS = new Print(s.getParent());
        this.addStatementBeforeAndSelect(newS,s);
    }
    addRepeatBefore(s: Statement): void {
        var newS = new Repeat(s.getParent());
        this.addStatementBeforeAndSelect(newS,s);
    }
    addSetBefore(s: Statement): void {
        var newS = new SetStatement(s.getParent());
        this.addStatementBeforeAndSelect(newS,s);
    }
    addSwitchBefore(s: Statement): void {
        throw new Error("Method not implemented.");
    }
    addThrowBefore(s: Statement): void {
        var newS = new Throw(s.getParent());
        this.addStatementBeforeAndSelect(newS,s);
    }
    addTryBefore(s: Statement): void {
        var newS = new TryCatch(s.getParent());
        this.addStatementBeforeAndSelect(newS,s);
    }
    addVarBefore(s: Statement): void {
        var newS = new Variable(s.getParent());
        this.addStatementBeforeAndSelect(newS,s);
    }
    addWhileBefore(s: Statement): void {
        var newS = new While(s.getParent());
        this.addStatementBeforeAndSelect(newS,s);
    }
    addPropertyBefore(member: Member): void {
        var p = new Property(member.getParent());
        this.addMemberBeforeAndSelect(p, member);
    }
    addFunctionMethodBefore(member: Member): void {
        var p = new FunctionMethod(member.getParent());
        this.addMemberBeforeAndSelect(p, member);
    }
    addProcedureMethodBefore(member: Member): void {
        var p = new ProcedureMethod(member.getParent());
        this.addMemberBeforeAndSelect(p, member);
    }

    private addGlobalBeforeAndSelect(g: Global, before: Global) {
        ((before.getParent() as unknown) as File).addGlobalBefore(g, before);
        g.select(true, false);
    }

    private addStatementBeforeAndSelect(s: Statement, before: Statement) {
        (before.getParent() as FrameWithStatements).addStatementBefore(s, before);
        s.select(true, false);
    }
    private addMemberBeforeAndSelect(m: Member, before: Member) {
        (before.getParent() as Class).addMemberBefore(m, before);
        m.select(true, false);
    }
}