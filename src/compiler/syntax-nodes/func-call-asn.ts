import { AstIdNode } from "../../compiler/compiler-interfaces/ast-id-node";
import { AstNode } from "../../compiler/compiler-interfaces/ast-node";
import { ChainedAsn } from "../../compiler/compiler-interfaces/chained-asn";
import { ElanSymbol } from "../../compiler/compiler-interfaces/elan-symbol";
import { Scope } from "../../compiler/compiler-interfaces/scope";
import { SymbolType } from "../../compiler/compiler-interfaces/symbol-type";
import { FunctionType } from "../../compiler/symbols/function-type";
import { NullScope } from "../../compiler/symbols/null-scope";
import {
  getGlobalScope,
  isDefinitionScope,
  isMemberOnFieldsClass,
  scopePrefix,
} from "../../compiler/symbols/symbol-helpers";
import {
  checkForDeprecation,
  getQualifierId,
  mustBeCallable,
  mustBeKnownSymbol,
  mustBePublicMember,
  mustBePureFunctionSymbol,
  mustbeValidQualifier,
  mustCallExtensionViaQualifier,
  mustCallMemberViaQualifier,
  mustNotCallNonExtensionViaQualifier,
} from "../compile-rules";
import { AbstractAstNode } from "./abstract-ast-node";
import {
  containsGenericType,
  generateType,
  isEmptyNode,
  matchGenericTypes,
  matchParametersAndTypes,
} from "./ast-helpers";
import { EmptyAsn } from "./empty-asn";

export class FuncCallAsn extends AbstractAstNode implements AstIdNode, ChainedAsn {
  constructor(
    public readonly id: string,
    public readonly parameters: Array<AstNode>,
    public readonly fieldId: string,
    public scope: Scope,
  ) {
    super();
  }

  private precedingNode: AstNode = EmptyAsn.Instance;
  private updatedScope: Scope = NullScope.Instance;

  updateScopeAndChain(scope: Scope, ast: AstNode) {
    this.updatedScope = scope;
    this.precedingNode = ast;
  }

  get showPreviousNode() {
    return !this.isExtensionMethod;
  }

  isAsync: boolean = false;

  private isExtensionMethod: boolean = false;

  getSymbolAndType(): [ElanSymbol, SymbolType] {
    let currentScope = this.updatedScope === NullScope.Instance ? this.scope : this.updatedScope;

    if (isDefinitionScope(currentScope)) {
      currentScope = currentScope.getParentScope();
    }
    const funcSymbol = currentScope.resolveSymbol(this.id, true, this.scope);
    const funcSymbolType = funcSymbol.symbolType();
    return [funcSymbol, funcSymbolType];
  }

  compile(): string {
    this.compileErrors = [];

    let parameters = [...this.parameters];
    const [funcSymbol, funcSymbolType] = this.getSymbolAndType();

    mustBeKnownSymbol(
      funcSymbol,
      this.updatedScope,
      getQualifierId(this.precedingNode),
      this.precedingNode.symbolType(),
      this.compileErrors,
      this.fieldId,
      this.scope,
    );

    if (isMemberOnFieldsClass(funcSymbol, this.scope)) {
      mustbeValidQualifier(this.precedingNode, this.scope, this.compileErrors, this.fieldId);
    } else {
      mustBePublicMember(funcSymbol, this.compileErrors, this.fieldId);
    }

    if (funcSymbolType instanceof FunctionType) {
      mustBePureFunctionSymbol(funcSymbolType, this.scope, this.compileErrors, this.fieldId);

      mustCallExtensionViaQualifier(
        funcSymbolType,
        this.precedingNode,
        this.compileErrors,
        this.fieldId,
      );

      mustNotCallNonExtensionViaQualifier(
        funcSymbolType,
        funcSymbol.symbolId,
        this.precedingNode,
        this.updatedScope,
        this.compileErrors,
        this.fieldId,
        this.scope,
      );

      mustCallMemberViaQualifier(
        funcSymbol.symbolId,
        funcSymbolType,
        this.updatedScope,
        this.compileErrors,
        this.fieldId,
      );

      if (funcSymbolType.isExtension && !isEmptyNode(this.precedingNode)) {
        this.isExtensionMethod = true;
        parameters = [this.precedingNode].concat(parameters);
      }

      matchParametersAndTypes(
        funcSymbol.symbolId,
        funcSymbolType,
        parameters,
        this.compileErrors,
        this.fieldId,
        this.scope,
      );

      // do after parameters checked
      checkForDeprecation(funcSymbolType, this.scope, this.compileErrors, this.fieldId);

      this.isAsync = funcSymbolType.isAsync;
    } else {
      mustBeCallable(
        funcSymbol.symbolId,
        funcSymbolType,
        funcSymbol.symbolScope,
        this.compileErrors,
        this.fieldId,
      );
    }

    const showPreviousNode = !isEmptyNode(this.precedingNode) && this.showPreviousNode;
    const showAwait =
      this.isAsync &&
      (!showPreviousNode ||
        (this.updatedScope === NullScope.Instance && isEmptyNode(this.precedingNode)));
    const asyncStart = showAwait ? "(await " : "";

    const asyncEnd = showAwait ? ")" : "";
    const parms = parameters.map((p) => p.compile()).join(", ");
    const prefix = showPreviousNode
      ? ""
      : scopePrefix(funcSymbol, undefined, this.compileErrors, this.scope, this.fieldId);

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return `${asyncStart}${prefix}${this.id}(${parms})${asyncEnd}`;
  }

  symbolType() {
    const [, funcSymbolType] = this.getSymbolAndType();

    if (funcSymbolType instanceof FunctionType) {
      const returnType = funcSymbolType.returnType;

      if (containsGenericType(returnType)) {
        let callParameters = this.parameters;

        if (funcSymbolType.isExtension && !isEmptyNode(this.precedingNode)) {
          callParameters = [this.precedingNode].concat(callParameters);
        }
        const matches = matchGenericTypes(funcSymbolType, callParameters);
        return generateType(returnType, matches);
      }
      return returnType;
    }

    return funcSymbolType;
  }

  toString() {
    const pp = this.parameters.map((p) => p.toString()).join(", ");
    return `${this.id}(${pp})`;
  }
}

Python with Elan 2.0.0-alpha5
08/06/2026, 16:50:52

        <a href="documentation/index.html" style="display:none">Documentation</a> <!-- Direct link for search engines -->
        <div id="lhs">
            <div id="code-controls">
                <div class="dropdown">
                    <button id="demos" class="plain" tabindex="0" aria-haspopup="true" aria-expanded="false" aria-controls="demos-menu" title="Load a demonstration program">demo</button>
                    <div id="demos-menu" class="dropdown-content" hidden="">
                        <div class="demo-file menu-item functional" tabindex="-1" id="demo/best-fit.elan">Best Fit (linear regression)</div>
                        <!-- <div class="demo-file menu-item function" tabindex="-1" id="demo/binary-search.elan">Binary Search</div> -->
                        <div class="demo-file menu-item procedural" tabindex="-1" id="demo/bubbles.elan">Bubbles</div>
                        <div class="demo-file menu-item procedural" tabindex="-1" id="demo/burrow.elan">Burrow</div>
                        <div class="demo-file menu-item oop" tabindex="-1" id="demo/blackjack.elan">Blackjack</div>
                        <div class="demo-file menu-item procedural" tabindex="-1" id="demo/collatz.elan">Collatz</div>
                        <div class="demo-file menu-item functional" tabindex="-1" id="demo/fern.elan">Fern</div>
                        <div class="demo-file menu-item procedural" tabindex="-1" id="demo/in-place-ripple-sort.elan">Ripple Sort</div>
                        <div class="demo-file menu-item oop" tabindex="-1" id="demo/julia-set.elan">Julia set</div>
                        <div class="demo-file menu-item procedural functional" tabindex="-1" id="demo/life.elan">Life - procedural</div>
                        <div class="demo-file menu-item functional" tabindex="-1" id="demo/life_FP.elan">Life - functional</div>
                        <div class="demo-file menu-item functional" tabindex="-1" id="demo/map-filter-reduce.elan">Map, Filter, Reduce</div>
                        <div class="demo-file menu-item oop" tabindex="-1" id="demo/maze-generator.elan">Maze generator</div>
                        <div class="demo-file menu-item functional" tabindex="-1" id="demo/merge-sort.elan">Merge Sort</div>
                        <div class="demo-file menu-item oop" tabindex="-1" id="demo/pathfinder.elan">Pathfinder</div>
                        <div class="demo-file menu-item functional" tabindex="-1" id="demo/recursive-functions.elan">Recursive Functions</div>
                        <div class="demo-file menu-item oop" tabindex="-1" id="demo/roman-numerals-turing-machine.elan">Roman Numerals Turing Machine</div>
                        <div class="demo-file menu-item procedural oop functional" tabindex="-1" id="demo/snake_PP.elan">Snake - procedural</div>
                        <div class="demo-file menu-item oop" tabindex="-1" id="demo/snake_OOP.elan">Snake - object-oriented</div>
                        <div class="demo-file menu-item functional" tabindex="-1" id="demo/snake_FP.elan">Snake - functional</div>
                        <div class="demo-file menu-item procedural" tabindex="-1" id="demo/tower-of-hanoi.elan">Tower of Hanoi</div>
                        <div class="demo-file menu-item procedural" tabindex="-1" id="demo/tower-of-hanoi-recursive.elan">Tower of Hanoi - recursive</div>
                        <div class="demo-file menu-item procedural" tabindex="-1" id="demo/turtle-spiral.elan">Turtle Spiral</div>
                        <div class="demo-file menu-item procedural" tabindex="-1" id="demo/turtle-snowflake.elan">Turtle Snowflake</div>
                        <div class="demo-file menu-item procedural" tabindex="-1" id="demo/turtle_dragon.elan">Turtle Dragon</div>
                        <div class="demo-file menu-item procedural" tabindex="-1" id="demo/hodgepodge.elan">Hodgepodge</div>
                        <div class="demo-file menu-item procedural" tabindex="-1" id="demo/date-time.elan">Date Time</div>
                        <div class="demo-file menu-item functional" tabindex="-1" id="demo/wordle-solver.elan">Wordle Solver</div>
                    </div>
                </div>
                <div class="dropdown">
                     <button id="file" class="plain" tabindex="0" aria-haspopup="true" aria-expanded="false" aria-controls="file-menu" title="File actions">file</button>
                    <div id="file-menu" class="dropdown-content" hidden="">
                        <div class="plain menu-item" tabindex="-1" id="new" title="Clear the current code and start afresh">new</div>
                        <div class="plain menu-item" tabindex="-1" id="load" title="Load code from a file">load</div>
                        <div class="plain menu-item" tabindex="-1" id="append" title="Append code from a file onto the end of the existing code">append</div>
                        <div class="plain menu-item" tabindex="-1" id="auto-save" title="Save to file now and then auto-save to same file whenever code is changed and is not invalid">auto save</div>
                        <div class="plain menu-item" tabindex="-1" id="save" title="Save the code into a file">manual save</div>
                        <div class="plain menu-item" tabindex="-1" id="save-as-standalone" title="Save the program as a standalone webpage">save as standalone</div>
                        <div class="plain menu-item" tabindex="-1" id="export" title="Export the code into a file">export as .py file</div>
                        <div class="plain menu-item" tabindex="-1" id="copy-as-url" title="Copy the code into a url">copy Url for this code</div>
                        <div class="plain menu-item" tabindex="-1" id="preferences" title="Set preferences">preferences</div>
                        <div class="plain menu-item" tabindex="-1" id="toggle-quad-editor">toggle quad editor</div>
                    </div>
                </div>

                <button id="trim" class="plain" tabindex="0" title="Remove all 'new code' prompts that can be removed (shortcut: Alt+t)">trim</button>
                <button id="expand-collapse" class="plain" tabindex="0" title="Expand / Collapse all code regions">outline</button>
                <button id="undo" class="plain" tabindex="0" title="Undo last change (Ctrl+z)">undo</button>
                <button id="redo" class="plain" tabindex="0" disabled="" title="Nothing to redo">redo</button>
                <div class="dropdown">
                    <button id="profile" class="plain" tabindex="0" aria-haspopup="true" aria-expanded="false" aria-controls="profile-menu" title="Profile">procedural</button>
                    <div id="profile-menu" class="dropdown-content" hidden="">
                        <div class="plain menu-item" tabindex="-1" id="profile-procedural">procedural</div>
                        <div class="plain menu-item" tabindex="-1" id="profile-oop">object-oriented</div>
                        <div class="plain menu-item" tabindex="-1" id="profile-functional">functional</div>
                    </div>
                </div>
                <button id="languages" class="plain" tabindex="0" title="Set languages">languages</button>

                <dialog id="preferences-dialog">
                    <form>
                        <div>
                            <label for="use-cvd">CVD colour scheme:</label>
                            <input type="checkbox" id="use-cvd" name="cvd" value="use-cvd">
                        </div>
                        <div>
                            <button id="confirmPreferencesBtn" type="button">confirm</button>
                        </div>
                    </form>
                </dialog>
                <dialog id="languages-dialog">
                   
                        <div>
                            <div class="dropdown">
                                <button id="language0" class="plain" tabindex="0" aria-haspopup="true" aria-expanded="false" aria-controls="language0-menu" title="Primary Language">primary language</button>
                                <div id="language0-menu" class="dropdown-content" hidden="">
                                    <div class="plain menu-item python-language" tabindex="-1" id="python-language0">Python</div>
                                    <div class="plain menu-item vb-language" tabindex="-1" id="vb-language0">VB.NET</div>
                                    <div class="plain menu-item cs-language" tabindex="-1" id="cs-language0">C#</div>
                                    <div class="plain menu-item java-language" tabindex="-1" id="java-language0">Java</div>
                                    <div class="plain menu-item elan-language" tabindex="-1" id="elan-language0">Reference Language</div>
                                </div>
                            </div>
                            <div>
                            <label for="quad-view">Quad View:</label>
                            <input type="checkbox" id="quad-view" name="quad-view" value="quad-view">
                            </div>
                            <div class="dropdown other-pane show">
                                <button id="language1" class="plain" tabindex="0" aria-haspopup="true" aria-expanded="false" aria-controls="language1-menu" title="Pane 3 Language">second language</button>
                                <div id="language1-menu" class="dropdown-content" hidden="">
                                    <div class="plain menu-item python-language" tabindex="-1" id="python-language1">Python</div>
                                    <div class="plain menu-item vb-language" tabindex="-1" id="vb-language1">VB.NET</div>
                                    <div class="plain menu-item cs-language" tabindex="-1" id="cs-language1">C#</div>
                                    <div class="plain menu-item java-language" tabindex="-1" id="java-language1">Java</div>
                                    <div class="plain menu-item elan-language" tabindex="-1" id="elan-language1">Reference Language</div>
                                </div>
                            </div>
                            <div class="dropdown other-pane show">
                                <button id="language2" class="plain" tabindex="0" aria-haspopup="true" aria-expanded="false" aria-controls="language2-menu">third language</button>
                                <div id="language2-menu" class="dropdown-content" hidden="">
                                    <div class="plain menu-item python-language" tabindex="-1" id="python-language2">Python</div>
                                    <div class="plain menu-item vb-language" tabindex="-1" id="vb-language2">VB.NET</div>
                                    <div class="plain menu-item cs-language" tabindex="-1" id="cs-language2">C#</div>
                                    <div class="plain menu-item java-language" tabindex="-1" id="java-language2">Java</div>
                                    <div class="plain menu-item elan-language" tabindex="-1" id="elan-language2">Reference Language</div>
                                </div>
                            </div>
                            <div class="dropdown other-pane show">
                                <button id="language3" class="plain" tabindex="0" aria-haspopup="true" aria-expanded="false" aria-controls="language3-menu">fourth language</button>
                                <div id="language3-menu" class="dropdown-content" hidden="">
                                    <div class="plain menu-item python-language" tabindex="-1" id="python-language3">Python</div>
                                    <div class="plain menu-item vb-language" tabindex="-1" id="vb-language3">VB.NET</div>
                                    <div class="plain menu-item cs-language" tabindex="-1" id="cs-language3">C#</div>
                                    <div class="plain menu-item java-language" tabindex="-1" id="java-language3">Java</div>
                                    <div class="plain menu-item elan-language" tabindex="-1" id="elan-language3">Reference Language</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button id="confirmLanguagesBtn" type="button">close</button>
                        </div>
                    
                </dialog>
                <button id="logout" class="plain" tabindex="0" hidden="hidden">logout</button>
                <div id="code-title">file: code.elan UNSAVED</div>
            </div>
            <div class="quad">
                <div class="editor-label" tabindex="-1" id="ed-lab-1">Python</div>
                <div class="editor-label" tabindex="-1" id="ed-lab-2">VB.NET</div>
                <div class="code python" data-code="" tabindex="-1" id="ed-1"><el-header># <el-hash>ff4081ee6b959783b1ea1a820c88eb7c032d415e6d1ecb4d35b2bf0968f80353</el-hash> <el-version>Python with Elan 2.0.0-alpha5</el-version></el-header>
<el-main class="ok multiline" id="python_main0" tabindex="-1">
<el-top><el-expand>+</el-expand><el-kw>def </el-kw><el-method>main</el-method>() -&gt; <el-kw>None</el-kw>:
<el-msg></el-msg><el-fr>1</el-fr></el-top>
<el-statement contenteditable="" spellcheck="false" class="selected focused ok empty" id="python_select1" tabindex="-1"><el-top class="newcode">press Enter, or <i>right</i>-click here, to view options</el-top></el-statement>

</el-main>
<el-global contenteditable="" spellcheck="false" class="ok empty" id="python_select2" tabindex="-1"><el-top class="newcode">new code</el-top></el-global>

<el-method>main</el-method>()</div>
                <div class="code vb" data-code="" tabindex="-1" id="ed-2"><el-header># <el-hash>d0ce1922c076d8ed2e034e79611d2466c2b0bd3dc8a3c32bb11294d890fa9a1e</el-hash> <el-version>Elan 2.0.0-alpha5</el-version></el-header>
<el-main class="ok multiline" id="elan_main0" tabindex="-1">
<el-top><el-expand>+</el-expand><el-kw>main</el-kw>
<el-msg></el-msg><el-fr>1</el-fr></el-top>
<el-statement contenteditable="" spellcheck="false" class="selected focused ok empty" id="elan_select1" tabindex="-1"><el-top class="newcode">press Enter, or <i>right</i>-click here, to view options</el-top></el-statement>
<el-kw>end main</el-kw>
</el-main>
<el-global contenteditable="" spellcheck="false" class="ok empty" id="elan_select2" tabindex="-1"><el-top class="newcode">new code</el-top></el-global></div>
                <div class="editor-label" tabindex="-1" id="ed-lab-4">Java</div> <!-- The order of the ids is deliberate - to assist in 'rotation'-->
                <div class="editor-label" tabindex="-1" id="ed-lab-3">C#</div>
                <div class="code java" data-code="" tabindex="-1" id="ed-4"><el-header># <el-hash>d0ce1922c076d8ed2e034e79611d2466c2b0bd3dc8a3c32bb11294d890fa9a1e</el-hash> <el-version>Elan 2.0.0-alpha5</el-version></el-header>
<el-main class="ok multiline" id="elan_main0" tabindex="-1">
<el-top><el-expand>+</el-expand><el-kw>main</el-kw>
<el-msg></el-msg><el-fr>1</el-fr></el-top>
<el-statement contenteditable="" spellcheck="false" class="selected focused ok empty" id="elan_select1" tabindex="-1"><el-top class="newcode">press Enter, or <i>right</i>-click here, to view options</el-top></el-statement>
<el-kw>end main</el-kw>
</el-main>
<el-global contenteditable="" spellcheck="false" class="ok empty" id="elan_select2" tabindex="-1"><el-top class="newcode">new code</el-top></el-global></div>
                <div class="code cs" data-code="" tabindex="-1" id="ed-3"><el-header># <el-hash>d0ce1922c076d8ed2e034e79611d2466c2b0bd3dc8a3c32bb11294d890fa9a1e</el-hash> <el-version>Elan 2.0.0-alpha5</el-version></el-header>
<el-main class="ok multiline" id="elan_main0" tabindex="-1">
<el-top><el-expand>+</el-expand><el-kw>main</el-kw>
<el-msg></el-msg><el-fr>1</el-fr></el-top>
<el-statement contenteditable="" spellcheck="false" class="selected focused ok empty" id="elan_select1" tabindex="-1"><el-top class="newcode">press Enter, or <i>right</i>-click here, to view options</el-top></el-statement>
<el-kw>end main</el-kw>
</el-main>
<el-global contenteditable="" spellcheck="false" class="ok empty" id="elan_select2" tabindex="-1"><el-top class="newcode">new code</el-top></el-global></div>
            </div>
        </div>
        <div id="rhs">
            <div id="rh-header">
                <div id="status">
                    <div id="status-names">
                        <div>parse</div>
                        <div>compile</div>
                        <div>test</div>
                        <div>run</div>
                    </div>
                    <div id="status-values">
                        <div id="parse" class="ok" tabindex="-1" title="">valid</div>
                        <div id="compile" class="ok" tabindex="-1" title="">ok</div>
                        <div id="test" class="none" tabindex="-1" title=""></div>
                        <div id="run-status" class="default" tabindex="-1" title=""></div>
                    </div>
                </div>
                <div id="rh-header-r">
                    <div id="run-controls">
                        <button id="run-button" class="icon" tabindex="0" title="Run the program">
                            <img src="images/Run.png">
                            <label for="run-button"><b><u>r</u></b>un</label>
                        </button>
                        <button id="stop" class="icon" disabled="" tabindex="0" title="Program is not running">
                            <img src="images/Stop.png">
                            <label for="stop"><b><u>s</u></b>top</label>
                        </button>
                        <button id="run-debug-button" class="icon" tabindex="0" title="Debug the program">
                            <img src="images/Debug.png">
                            <label for="run-debug-button">debu<b><u>g</u></b></label>
                        </button>
                        <button id="pause" class="icon" disabled="" title="Program is not running" tabindex="0">
                            <img src="images/Pause.png">
                            <label for="pause">pa<b><u>u</u></b>se</label>
                        </button>
                        <button id="step" class="icon" disabled="" title="Program is not running" tabindex="0">
                            <img src="images/Step.png">
                            <label for="step">ste<b><u>p</u></b></label>
                        </button>
                    </div>
                    <div id="tab-labels">
                        <div id="display-tab-label" class="tab-label tab-element display-tab" tabindex="-1"><b><u>d</u></b>isplay</div>
                        <div id="info-tab-label" class="tab-label tab-element info-tab selected focussed" tabindex="-1"><b><u>i</u></b>nfo</div>
                        <div id="help-tab-label" class="tab-label tab-element help-tab" tabindex="-1"><b><u>h</u></b>elp</div>
                        <div id="worksheet-tab-label" class="tab-label tab-element worksheet-tab" tabindex="-1">wor<b><u>k</u></b>sheet</div>
                    </div>
                </div>
            </div>
            <div id="display-tab" class="main-tab tab-element display-tab" tabindex="-1">
                <div class="tab-controls tab-element display-tab">
                    <button id="clear-display" class="plain" tabindex="0" alt="clear display" title="Clear display">clear</button>
                </div>
                <div id="display" class="tab-content element display-tab" tabindex="-1">
                    <div id="print"><span id="printed-text"></span></div>
                    <div id="display-html"></div>
                    <div id="block-graphics"></div>
                    <div id="vector-graphics"></div>
                </div>
            </div>
            <div id="info-tab" class="main-tab tab-element info-tab selected focussed" tabindex="-1">
                <div class="tab-controls tab-element info-tab selected focussed">
                    <button id="clear-info" class="plain" tabindex="0" alt="clear info">clear</button>
                    This tab shows system information when debugging, or after a runtime error
                </div>
                <div id="system-info" class="tab-content tab-element info-tab selected focussed" tabindex="0">Sorry, an internal error has occurred. Please help us by reporting the bug, following these steps:
<ol>
<li>Click on this button:  <button id="bug-report">Copy bug report to your clipboard</button></li>
<li>In your own email system create an email to bugs@elan-lang.org, with anything in the Subject line.</li>
<li>Paste the copied bug report (it is plain text) from your clipboard into the body of the email.</li>
<li><b>Above</b> the pasted-in report, please describe your action immediately prior to the error message appearing</li>
</ol>
Please note that the report includes your Elan code. We will use this <i<>only to try to reproduce and fix the bug,
and <i>won't</i> make it public.
</i<></div>
            </div>
            <div id="help-tab" class="main-tab tab-element help-tab" tabindex="-1"> <!-- now 'Help` tab-->
                <div class="tab-controls tab-element help-tab">
                    <button id="help-home" class="icon" tabindex="0"><img src="images/Home.png"></button>
                    <button id="help-back" class="icon" tabindex="0"><img src="images/Back.png"></button>
                    <button id="help-forward" class="icon" tabindex="0"><img src="images/Forward.png"></button>
                </div>
                <iframe name="help-iframe" id="help-iframe" class="tab-content tab-element help-tab" src="documentation/index.html"></iframe>
            </div>              
            <div id="worksheet-tab" class="main-tab tab-element worksheet-tab" tabindex="-1">
                <div class="tab-controls tab-element worksheet-tab">
                    <div class="dropdown">
                        <button id="standard-worksheets" class="plain" tabindex="0" aria-haspopup="true" aria-expanded="false" aria-controls="worksheet-menu">standard worksheets</button>
                        <div id="worksheet-menu" class="dropdown-content" hidden="">
                            <a class="menu-item help-file" tabindex="-1" href="documentation/worksheets/guide.html" target="worksheet-iframe">Guide to the worksheets</a>
                            <a class="menu-item help-file" tabindex="-1" href="documentation/worksheets/blackjack/blackjack_1.html" target="worksheet-iframe">Blackjack 1</a>
                            <a class="menu-item help-file" tabindex="-1" href="documentation/worksheets/blackjack/blackjack_2.html" target="worksheet-iframe">Blackjack 2</a>
                            <a class="menu-item help-file" tabindex="-1" href="documentation/worksheets/random-walk/random-walk.html" target="worksheet-iframe">Random Walk</a>              
                            <!-- <a class="menu-item help-file" tabindex="-1" href="documentation/worksheets/whack-a-mole/whack-a-mole.html" target="worksheet-iframe">Whack-a-mole</a> -->
                        <a class="menu-item help-file" href="documentation/worksheets/worksheet-test-only.html" target="worksheet-iframe">Test Worksheet</a></div>
                    </div>
                    <button id="load-worksheet" class="plain" tabindex="0">load external worksheet</button>
                </div>
                <iframe name="worksheet-iframe" id="worksheet-iframe" class="tab-content tab-element worksheet-tab"></iframe>
            </div>
        </div>
        <script src="elan-api.js" type="module"></script>
        <script src="web-scripts.js"></script>
    <!-- Code injected by live-server -->
<script>
	// <![CDATA[  <-- For SVG support
	if ('WebSocket' in window) {
		(function () {
			function refreshCSS() {
				var sheets = [].slice.call(document.getElementsByTagName("link"));
				var head = document.getElementsByTagName("head")[0];
				for (var i = 0; i < sheets.length; ++i) {
					var elem = sheets[i];
					var parent = elem.parentElement || head;
					parent.removeChild(elem);
					var rel = elem.rel;
					if (elem.href && typeof rel != "string" || rel.length == 0 || rel.toLowerCase() == "stylesheet") {
						var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
						elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
					}
					parent.appendChild(elem);
				}
			}
			var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
			var address = protocol + window.location.host + window.location.pathname + '/ws';
			var socket = new WebSocket(address);
			socket.onmessage = function (msg) {
				if (msg.data == 'reload') window.location.reload();
				else if (msg.data == 'refreshcss') refreshCSS();
			};
			if (sessionStorage && !sessionStorage.getItem('IsThisFirstTime_Log_From_LiveServer')) {
				console.log('Live reload enabled.');
				sessionStorage.setItem('IsThisFirstTime_Log_From_LiveServer', true);
			}
		})();
	}
	else {
		console.error('Upgrade your browser. This Browser is NOT supported WebSocket for Live-Reloading.');
	}
	// ]]>
</script>