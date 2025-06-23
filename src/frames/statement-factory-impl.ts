import { Frame } from "./frame-interfaces/frame";
import { Parent } from "./frame-interfaces/parent";
import { StatementFactory } from "./frame-interfaces/statement-factory";
import { AssertStatement } from "./statements/assert-statement";
import { CallStatement } from "./statements/call-statement";
import { CatchStatement } from "./statements/catch-statement";
import { CommentStatement } from "./statements/comment-statement";
import { Each } from "./statements/each";
import { Else } from "./statements/else";
import { For } from "./statements/for";
import { IfStatement } from "./statements/if-statement";
import { LetStatement } from "./statements/let-statement";
import { Print } from "./statements/print";
import { Repeat } from "./statements/repeat";
import { SetStatement } from "./statements/set-statement";
import { Throw } from "./statements/throw";
import { TryStatement } from "./statements/try";
import { VariableStatement } from "./statements/variable-statement";
import { While } from "./statements/while";

export class StatementFactoryImpl implements StatementFactory {
  public newAssert(parent: Parent): Frame {
    return new AssertStatement(parent);
  }
  public newCall(parent: Parent): Frame {
    return new CallStatement(parent);
  }
  public newCatch(parent: Parent): Frame {
    return new CatchStatement(parent);
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
  public newThrow(parent: Parent): Frame {
    return new Throw(parent);
  }
  public newTryCatch(parent: Parent): Frame {
    return new TryStatement(parent);
  }
  public newVar(parent: Parent): Frame {
    return new VariableStatement(parent);
  }
  public newWhile(parent: Parent): Frame {
    return new While(parent);
  }
  public newComment(parent: Parent): Frame {
    return new CommentStatement(parent);
  }
}
