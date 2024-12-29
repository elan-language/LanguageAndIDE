import { Frame } from "./interfaces/frame";
import { Parent } from "./interfaces/parent";
import { StatementFactory } from "./interfaces/statement-factory";
import { AssertStatement } from "./statements/assert-statement";
import { CallStatement } from "./statements/call-statement";
import { CommentStatement } from "./statements/comment-statement";
import { Each } from "./statements/each";
import { Else } from "./statements/else";
import { For } from "./statements/for";
import { IfStatement } from "./statements/if-statement";
import { LetStatement } from "./statements/let-statement";
import { MatchStatement } from "./statements/match-statement";
import { OtherwiseStatement } from "./statements/otherwise-statement";
import { Print } from "./statements/print";
import { Repeat } from "./statements/repeat";
import { SetStatement } from "./statements/set-statement";
import { Switch } from "./statements/switch";
import { Throw } from "./statements/throw";
import { TryCatch } from "./statements/try-catch";
import { VarStatement } from "./statements/var-statement";
import { While } from "./statements/while";

export class StatementFactoryImpl implements StatementFactory {
  public newAssert(parent: Parent): Frame {
    return new AssertStatement(parent);
  }
  public newCall(parent: Parent): Frame {
    return new CallStatement(parent);
  }
  public newMatch(parent: Parent): Frame {
    return new MatchStatement(parent);
  }
  public newOtherwise(parent: Parent): Frame {
    return new OtherwiseStatement(parent);
  }
  public newEach(parent: Parent): Frame {
    return new Each(parent);
  }
  public newElse(parent: Parent): Frame {
    return new Else(parent);
  }
  public newFor(parent: Parent): Frame {
    return new For(parent);
  }
  public newIf(parent: Parent): Frame {
    return new IfStatement(parent);
  }
  public newLet(parent: Parent): Frame {
    return new LetStatement(parent);
  }
  public newPrint(parent: Parent): Frame {
    return new Print(parent);
  }
  public newRepeat(parent: Parent): Frame {
    return new Repeat(parent);
  }
  public newSet(parent: Parent): Frame {
    return new SetStatement(parent);
  }
  public newSwitch(parent: Parent): Frame {
    return new Switch(parent);
  }
  public newThrow(parent: Parent): Frame {
    return new Throw(parent);
  }
  public newTryCatch(parent: Parent): Frame {
    return new TryCatch(parent);
  }
  public newVar(parent: Parent): Frame {
    return new VarStatement(parent);
  }
  public newWhile(parent: Parent): Frame {
    return new While(parent);
  }
  public newComment(parent: Parent): Frame {
    return new CommentStatement(parent);
  }
}
