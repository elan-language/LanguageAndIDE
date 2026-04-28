import { Frame } from "./frame-interfaces/frame";
import { Parent } from "./frame-interfaces/parent";
import { StatementFactory } from "./frame-interfaces/statement-factory";
import { AssertStatement } from "./statements/assert-statement";
import { CallStatement } from "./statements/call-statement";
import { CatchStatement } from "./statements/catch-statement";
import { CommentStatement } from "./statements/comment-statement";
import { Elif } from "./statements/elif";
import { Else } from "./statements/else";
import { For } from "./statements/for";
import { IfStatement } from "./statements/if-statement";
import { LetStatement } from "./statements/let-statement";
import { SetStatement } from "./statements/set-statement";
import { Throw } from "./statements/throw";
import { TryStatement } from "./statements/try";
import { VariableStatement } from "./statements/variable-statement";
import { While } from "./statements/while";
import { WithPropertyUpdate } from "./statements/with-property-update";

export class StatementFactoryImpl implements StatementFactory {
  public newAssert(parent: Parent): Frame {
    return new AssertStatement(parent);
  }
  public newCall(parent: Parent, procName = ""): Frame {
    const call = new CallStatement(parent);
    if (procName !== "") {
      call.proc.setFieldToKnownValidText(procName);
    }
    return call;
  }
  public newCatch(parent: Parent): Frame {
    return new CatchStatement(parent);
  }
  public newElif(parent: Parent): Frame {
    return new Elif(parent);
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
  public newLetStatement(parent: Parent): Frame {
    return new LetStatement(parent);
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
  public newWithPropertyUpdate(parent: Parent): Frame {
    return new WithPropertyUpdate(parent);
  }
  public newComment(parent: Parent): Frame {
    return new CommentStatement(parent);
  }
}
