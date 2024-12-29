import { Constructor } from "../src/frames/class-members/constructor";
import { FunctionMethod } from "../src/frames/class-members/function-method";
import { MemberSelector } from "../src/frames/class-members/member-selector";
import { Property } from "../src/frames/class-members/property";
import { DefaultProfile } from "../src/frames/default-profile";
import { FileImpl } from "../src/frames/file-impl";
import { ClassFrame } from "../src/frames/globals/class-frame";
import { Constant } from "../src/frames/globals/constant";
import { Enum } from "../src/frames/globals/enum";
import { GlobalComment } from "../src/frames/globals/global-comment";
import { GlobalFunction } from "../src/frames/globals/global-function";
import { GlobalProcedure } from "../src/frames/globals/global-procedure";
import { MainFrame } from "../src/frames/globals/main-frame";
import { TestFrame } from "../src/frames/globals/test-frame";
import { CallStatement } from "../src/frames/statements/call-statement";
import { CommentStatement } from "../src/frames/statements/comment-statement";
import { Each } from "../src/frames/statements/each";
import { Else } from "../src/frames/statements/else";
import { For } from "../src/frames/statements/for";
import { IfStatement } from "../src/frames/statements/if-statement";
import { Print } from "../src/frames/statements/print";
import { Repeat } from "../src/frames/statements/repeat";
import { SetStatement } from "../src/frames/statements/set-statement";
import { StatementSelector } from "../src/frames/statements/statement-selector";
import { Switch } from "../src/frames/statements/switch";
import { Throw } from "../src/frames/statements/throw";
import { TryStatement } from "../src/frames/statements/try";
import { VarStatement } from "../src/frames/statements/var-statement";
import { While } from "../src/frames/statements/while";
import { hash } from "../src/util";
import { transforms } from "./compiler/compiler-test-helpers";

export function T00_emptyFile() {
  const f = new FileImpl(hash, new DefaultProfile(), transforms());
  return f;
}

export function T01_helloWorld() {
  const f = new FileImpl(hash, new DefaultProfile(), transforms());
  const gs = f.getFirstSelectorAsDirectChild();
  const m = new MainFrame(f);
  f.addChildBefore(m, gs);
  const ss = m.getFirstSelectorAsDirectChild();
  const comment = new CommentStatement(m);
  comment.text.setFieldToKnownValidText(`My first program`);
  m.addChildBefore(comment, ss);
  const pr = new Print(m);
  pr.expr.setFieldToKnownValidText(`"Hello World!"`);
  m.addChildBefore(pr, ss);
  f.updateAllParseStatus();
  return f;
}

export function T02_comments() {
  const f = new FileImpl(hash, new DefaultProfile(), transforms());
  const gs = f.getFirstSelectorAsDirectChild();
  const gc = new GlobalComment(f);
  gc.text.setFieldToKnownValidText("Comment 1");
  f.addChildBefore(gc, gs);
  const m = new MainFrame(f);
  f.addChildBefore(m, gs);
  const ss = m.getFirstSelectorAsDirectChild();
  const sc2 = new CommentStatement(m);
  sc2.text.setFieldToKnownValidText("Comment 2");
  m.addChildBefore(sc2, ss);
  f.updateAllParseStatus();
  return f;
}

export function T03_mainWithAllStatements(): FileImpl {
  const f = new FileImpl(hash, new DefaultProfile(), transforms());
  const gs = f.getFirstSelectorAsDirectChild();
  const m = new MainFrame(f);
  f.addChildBefore(m, gs);
  const ssm = m.getFirstSelectorAsDirectChild();
  const v = new VarStatement(m);
  m.addChildBefore(v, ssm);
  const s = new SetStatement(m);
  s.assignable.setFieldToKnownValidText("a");
  s.expr.setFieldToKnownValidText("3 + 4");
  m.addChildBefore(s, ssm);
  const t = new Throw(m);
  m.addChildBefore(t, ssm);
  const ca = new CallStatement(m);
  ca.proc.setFieldToKnownValidText("signIn");
  ca.args.setFieldToKnownValidText(`rwp, password`);
  m.addChildBefore(ca, ssm);
  const pr = new Print(m);
  pr.expr.setFieldToKnownValidText(`"Hello World!"`);
  m.addChildBefore(pr, ssm);
  const w = new While(m);
  w.condition.setFieldToKnownValidText("newGame");
  m.addChildBefore(w, ssm);
  const r = new Repeat(m);
  r.condition.setFieldToKnownValidText("score > 20");
  m.addChildBefore(r, ssm);
  const for1 = new For(m);
  m.addChildBefore(for1, ssm);
  for1.variable.setFieldToKnownValidText("i");
  for1.from.setFieldToKnownValidText("1");
  for1.to.setFieldToKnownValidText("10");

  const ea = new Each(m);
  ea.variable.setFieldToKnownValidText("letter");
  ea.iter.setFieldToKnownValidText(`"Charlie Duke"`);
  m.addChildBefore(ea, ssm);
  const if1 = new IfStatement(m);
  if1.condition.setFieldToKnownValidText("y > 4");
  m.addChildBefore(if1, ssm);
  const if2 = new IfStatement(m);
  m.addChildBefore(if2, ssm);
  if2.condition.setFieldToKnownValidText("y > 4");
  const ss2 = if2.getFirstSelectorAsDirectChild();
  const el1 = new Else(if2);
  if2.addChildBefore(el1, ss2);
  if2.addChildBefore(new StatementSelector(if2), el1);
  const if3 = new IfStatement(m);
  m.addChildBefore(if3, ssm);
  const ss_if3 = if3.getFirstSelectorAsDirectChild();
  if3.condition.setFieldToKnownValidText("y > 4");
  const el2 = new Else(if3);
  el2.hasIf = true;
  el2.condition.setFieldToKnownValidText("y > 10");
  if3.addChildBefore(el2, ss_if3);
  if3.addChildBefore(new Else(if3), ss_if3);
  const tr = new TryStatement(m);
  m.addChildBefore(tr, ssm);
  const sw = new Switch(m);
  m.addChildBefore(sw, ssm);
  f.updateAllParseStatus();
  return f;
}

export function SelectMainById(f: FileImpl) {
  f.getById("main1").select(true, false);
}

export function SelectStatementById(f: FileImpl) {
  f.getById("for22").select(true, false);
}

export function ExpandAll(f: FileImpl) {
  f.expandCollapseAll();
}

export function CollapseAll(f: FileImpl) {
  f.expandCollapseAll();
}

export function T04_allGlobalsExceptClass(): FileImpl {
  const f = new FileImpl(hash, new DefaultProfile(), transforms());
  const gs = f.getFirstSelectorAsDirectChild();
  const con = new Constant(f);
  con.name.setFieldToKnownValidText("phi");
  con.value.setFieldToKnownValidText("1.618");
  f.addChildBefore(con, gs);
  const main = new MainFrame(f);
  f.addChildBefore(main, gs);
  const proc = new GlobalProcedure(f);
  proc.name.setFieldToKnownValidText("signIn");
  f.addChildBefore(proc, gs);
  const func = new GlobalFunction(f);
  func.name.setFieldToKnownValidText("hypotenuse");
  func.params.setFieldToKnownValidText("sideB as Float, sideC as Float");
  func.returnType.setFieldToKnownValidText("Float");
  f.addChildBefore(func, gs);
  const enu = new Enum(f);
  enu.name.setFieldToKnownValidText("Fruit");
  enu.values.setFieldToKnownValidText("apple, orange, pear");
  f.addChildBefore(enu, gs);
  const test = new TestFrame(f);
  test.testDescription.setFieldToKnownValidText("test1");
  f.addChildBefore(test, gs);
  f.updateAllParseStatus();
  return f;
}

export function T05_classes() {
  const f = new FileImpl(hash, new DefaultProfile(), transforms());
  const gs = f.getFirstSelectorAsDirectChild();
  const cl1 = new ClassFrame(f);
  const ms = cl1.getFirstSelectorAsDirectChild();
  f.addChildBefore(cl1, gs);
  cl1.name.setFieldToKnownValidText("Player");
  const p1 = new Property(cl1);
  cl1.addChildBefore(p1, ms);
  p1.name.setFieldToKnownValidText("score");
  p1.type.setFieldToKnownValidText("Int");

  const cl2 = new ClassFrame(f);
  const ms2 = cl2.getFirstSelectorAsDirectChild();
  cl2.inheritance.setFieldToKnownValidText("inherits Foo, Bar");
  f.addChildBefore(cl2, gs);
  cl2.name.setFieldToKnownValidText("Card");
  const p2 = new Property(cl2);
  cl2.addChildBefore(p2, ms2);
  p2.name.setFieldToKnownValidText("value");
  p2.type.setFieldToKnownValidText("Int");
  p2.private = true;
  const m1 = new FunctionMethod(cl2);
  cl2.addChildBefore(m1, ms2);
  m1.name.setFieldToKnownValidText("reset");
  m1.params.setFieldToKnownValidText("");
  m1.returnType.setFieldToKnownValidText("Player");
  f.updateAllParseStatus();
  return f;
}

export function T09_emptyMainAndClassWithGlobalSelector() {
  const f = new FileImpl(hash, new DefaultProfile(), transforms());
  const gs = f.getFirstSelectorAsDirectChild();
  f.addChildBefore(new MainFrame(f), gs);
  f.addChildBefore(new ClassFrame(f), gs);
  f.updateAllParseStatus();
  return f;
}

export function getTestFrame(fn: string): FileImpl {
  try {
    return eval(`${fn}()`);
  } catch (e) {
    return new FileImpl(hash, new DefaultProfile(), transforms());
  }
}

export function oneConstant(): FileImpl {
  const file = new FileImpl(hash, new DefaultProfile(), transforms());
  const globSel = file.getFirstChild();
  const con = new Constant(file);
  file.addChildBefore(con, globSel);
  con.name.setFieldToKnownValidText("phi");
  con.value.setFieldToKnownValidText("1.618");
  file.updateAllParseStatus();
  return file;
}

export function emptyMainOnly(): FileImpl {
  const file = new FileImpl(hash, new DefaultProfile(), transforms());
  const globSel = file.getFirstChild();
  const main = new MainFrame(file);
  file.addChildBefore(main, globSel);
  file.updateAllParseStatus();
  return file;
}

export function emptyFunctionOnly(): FileImpl {
  const file = new FileImpl(hash, new DefaultProfile(), transforms());
  const globSel = file.getFirstChild();
  const fun = new GlobalFunction(file);
  file.addChildBefore(fun, globSel);
  file.updateAllParseStatus();
  return file;
}

export function twoConstants(): FileImpl {
  const file = new FileImpl(hash, new DefaultProfile(), transforms());
  const globSel = file.getFirstChild();
  const con1 = new Constant(file);
  file.addChildBefore(con1, globSel);
  con1.name.setFieldToKnownValidText("phi");
  con1.value.setFieldToKnownValidText("1.618");
  const con2 = new Constant(file);
  file.addChildAfter(con2, con1);
  con2.name.setFieldToKnownValidText("c");
  con2.value.setFieldToKnownValidText("299792458");
  file.updateAllParseStatus();
  return file;
}

export function classWithConstructor(): FileImpl {
  const file = new FileImpl(hash, new DefaultProfile(), transforms());
  const globSel = file.getFirstChild();
  const cls = new ClassFrame(file);
  file.addChildBefore(cls, globSel);
  const memberSel = cls.getFirstChild() as MemberSelector;
  const con = new Constructor(cls);
  cls.addChildBefore(con, memberSel);
  file.updateAllParseStatus();
  return file;
}
