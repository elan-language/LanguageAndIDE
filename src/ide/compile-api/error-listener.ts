import {
  ANTLRErrorListener,
  Token,
  ATNSimulator,
  Recognizer,
  RecognitionException,
  Parser,
  DFA,
  BitSet,
  ATNConfigSet,
} from "antlr4ng";
import { FieldImpl } from "../frames/fields/field-impl";
import { File } from "../frames/frame-interfaces/file";

export class ErrorListener implements ANTLRErrorListener {
  constructor(private readonly field: FieldImpl | File) {}

  syntaxError<S extends Token, T extends ATNSimulator>(
    _recognizer: Recognizer<T>,
    _offendingSymbol: S | null,
    _line: number,
    _charPositionInLine: number,
    msg: string,
    _e: RecognitionException | null,
  ): void {
    this.field.addParseError(msg);
  }
  reportAmbiguity(
    _recognizer: Parser,
    _dfa: DFA,
    _startIndex: number,
    _stopIndex: number,
    _exact: boolean,
    _ambigAlts: BitSet | undefined,
    _configs: ATNConfigSet,
  ): void {}
  reportAttemptingFullContext(
    _recognizer: Parser,
    _dfa: DFA,
    _startIndex: number,
    _stopIndex: number,
    _conflictingAlts: BitSet | undefined,
    _configs: ATNConfigSet,
  ): void {}
  reportContextSensitivity(
    _recognizer: Parser,
    _dfa: DFA,
    _startIndex: number,
    _stopIndex: number,
    _prediction: number,
    _configs: ATNConfigSet,
  ): void {}
}
