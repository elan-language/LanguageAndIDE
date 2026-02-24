/* import { StdLib } from "../src/compiler/standard-library/std-lib";
import { DefaultProfile } from "../src/ide/frames/default-profile";
import { FileImpl } from "../src/ide/frames/file-impl";
import { StubInputOutput } from "../src/ide/stub-input-output";
import { transforms } from "./compiler/compiler-test-helpers";
import { hash } from "../src/ide/util";
import { ParamDefNode } from "../src/ide/frames/parse-nodes/param-def-node";
import { ParseStatus } from "../src/ide/frames/status-enums";
import { testNodeParseElan } from "./testHelpers"; */

suite("Parsing Nodes", () => {
  /*     const f = new FileImpl(
      hash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),false,
      true,
    );

    test("ParamDefNode", () => {
        testNodeParsePython(
          new ParamDefNode(f),
          `x as String`,
          ParseStatus.valid,
          "x as String",
          "",
          "x as String",
          "<el-id>x</el-id> <el-kw>as</el-kw> <el-type>String</el-type>",
        );
        testNodeParseElan(new ParamDefNode(f), `z`, ParseStatus.incomplete, "z", "", "");
        testNodeParseElan(new ParamDefNode(f), `w as`, ParseStatus.incomplete, "w as", "", "");
        testNodeParseElan(new ParamDefNode(f), `A`, ParseStatus.invalid, "", "A", "");
        testNodeParseElan(new ParamDefNode(f), `v String`, ParseStatus.invalid, "", "v String", "");
      }); */
});
