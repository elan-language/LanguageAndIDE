import { ClassSymbol } from "../interfaces/class-symbol";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { SymbolType } from "../interfaces/symbol-type";
import { Transforms } from "../interfaces/transforms";
import { BooleanType } from "./boolean-type";
import { DictionaryImmutableType } from "./dictionary-immutable-type";
import { DictionaryType } from "./dictionary-type";
import { FloatType } from "./float-type";
import { FunctionType } from "./function-type";
import { GenericParameterType } from "./generic-parameter-type";
import { IntType } from "./int-type";
import { RegExpType } from "./regexp-type";
import { StringType } from "./string-type";
import { SymbolScope } from "./symbol-scope";
import { TupleType } from "./tuple-type";

const intSymbol: ElanSymbol = {
  symbolId: IntType.Instance.name,
  symbolType: function (_transforms?: Transforms): SymbolType {
    return IntType.Instance;
  },
  symbolScope: SymbolScope.program,
};

const floatSymbol: ElanSymbol = {
  symbolId: FloatType.Instance.name,
  symbolType: function (_transforms?: Transforms): SymbolType {
    return FloatType.Instance;
  },
  symbolScope: SymbolScope.program,
};

const stringSymbol: ElanSymbol = {
  symbolId: StringType.Instance.name,
  symbolType: function (_transforms?: Transforms): SymbolType {
    return StringType.Instance;
  },
  symbolScope: SymbolScope.program,
};

const booleanSymbol: ElanSymbol = {
  symbolId: BooleanType.Instance.name,
  symbolType: function (_transforms?: Transforms): SymbolType {
    return BooleanType.Instance;
  },
  symbolScope: SymbolScope.program,
};

const regExpSymbol: ElanSymbol = {
  symbolId: RegExpType.Instance.name,
  symbolType: function (_transforms?: Transforms): SymbolType {
    return RegExpType.Instance;
  },
  symbolScope: SymbolScope.program,
};

const tupleSymbol: ClassSymbol = {
  symbolId: "Tuple",
  symbolType: function (_transforms?: Transforms): SymbolType {
    return new TupleType([new GenericParameterType("T1"), new GenericParameterType("T2")]);
  },
  symbolScope: SymbolScope.program,
  isClass: true,
  isAbstract: true,
  isNotInheritable: true,
  ofTypes: [new GenericParameterType("T1"), new GenericParameterType("T2")],
};

const dictionarySymbol: ClassSymbol = {
  symbolId: "Dictionary",
  symbolType: function (_transforms?: Transforms): SymbolType {
    return new DictionaryType(new GenericParameterType("T1"), new GenericParameterType("T2"));
  },
  symbolScope: SymbolScope.program,
  isClass: true,
  isAbstract: false,
  isNotInheritable: false,
  ofTypes: [new GenericParameterType("T1"), new GenericParameterType("T2")],
};

const dictionaryImmutableSymbol: ClassSymbol = {
  symbolId: "DictionaryImmutable",
  symbolType: function (_transforms?: Transforms): SymbolType {
    return new DictionaryImmutableType(
      new GenericParameterType("T1"),
      new GenericParameterType("T2"),
    );
  },
  symbolScope: SymbolScope.program,
  isClass: true,
  isAbstract: false,
  isNotInheritable: false,
  ofTypes: [new GenericParameterType("T1"), new GenericParameterType("T2")],
};

const funcSymbol: ClassSymbol = {
  symbolId: "Func",
  symbolType: function (_transforms?: Transforms): SymbolType {
    return new FunctionType(
      ["T"],
      [new GenericParameterType("T")],
      new GenericParameterType("T1"),
      false,
      true,
      false,
    );
  },
  symbolScope: SymbolScope.program,
  isClass: true,
  isAbstract: true,
  isNotInheritable: true,
  ofTypes: [new GenericParameterType("T")],
};

export const elanSymbols = [
  intSymbol,
  floatSymbol,
  stringSymbol,
  booleanSymbol,
  regExpSymbol,
  tupleSymbol,
  funcSymbol,
  dictionarySymbol,
  dictionaryImmutableSymbol,
];
