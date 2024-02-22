import { Each } from "./statements/each";
import { FrameWithStatements } from "./frame-with-statements";
import { Call } from "./statements/call";
import { For } from "./statements/for";
import { IfThen } from "./statements/if-statements";
import { Print } from "./statements/print";
import { Repeat } from "./statements/repeat";
import { Throw } from "./statements/throw";
import { While } from "./statements/while";
import { TryCatch } from "./statements/try-catch";
import { Variable } from "./statements/variable";
import { SetStatement } from "./statements/set-statement";
import { StatementFactory } from "./interfaces/statement-factory";
import { Frame } from "./interfaces/frame";
import { Switch } from "./statements/switch";
import { Parent } from "./interfaces/parent";
import { CommentStatement } from "./statements/comment-statement";
import { ReturnStatement } from "./statements/return-statement";
import { Else } from "./statements/else";
import { Default } from "./statements/default";
import { Catch } from "./statements/catch";
import { Case } from "./statements/case";
import { Assert } from "./statements/assert";

export class StatementFactoryImpl implements StatementFactory {

    private getNewStatement(frameType: string, parent: Parent): Frame{ 
        switch(frameType) {
            case "Assert": {
                return new Assert(parent);
            }
            case "Call": {
                return new Call(parent);
            }
            case "Case": {
                return new Case(parent);
            }
            case "Catch": {
                return new Catch(parent);
            }
            case "Default": {
                return new Default(parent);
            }
            case "Each": {
                return new Each(parent);
            }
            case "Else": {
                return new Else(parent);
            }
            case "For": {
                return new For(parent);
            }
            case "IfThen": {
                return new IfThen(parent);
            }
            case "Print": {
                return new Print(parent);
            }
            case "Repeat": {
                return new Repeat(parent);
            }
            case "ReturnStatement": {
                return new ReturnStatement(parent);
            }
            case "SetStatement": {
                return new SetStatement(parent);
            }
            case "Switch": {
                return new Switch(parent);
            }
            case "Throw": {
                return new Throw(parent);
            }
            case "TryCatch": {
                return new TryCatch(parent);
            }
            case "Variable": {
                return new Variable(parent);
            }
            case "While": {
                return new While(parent);
            }
            case "CommentStatement": {
                return new CommentStatement(parent);
            }
            default: {
                throw new Error(`Invalid frame type ${frameType}`);
            }
        }
    }

    addFrameBefore(frameType: string, selector: Frame): Frame {
        var parent = selector.getParent() as FrameWithStatements;
        var newS = this.getNewStatement(frameType, selector.getParent());
        parent.addStatementBefore(newS, selector);
        newS.select(true,   false);
        return newS;
    }
}