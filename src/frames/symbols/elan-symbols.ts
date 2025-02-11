import { ClassSymbol } from "../interfaces/class-symbol";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { SymbolType } from "../interfaces/symbol-type";
import { Transforms } from "../syntax-nodes/transforms";
import { ArrayType } from "./array-type";
import { BooleanType } from "./boolean-type";
import { DictionaryImmutableType } from "./dictionary-immutable-type";
import { DictionaryType } from "./dictionary-type";
import { FloatType } from "./float-type";
import { FunctionType } from "./function-type";
import { GenericParameterType } from "./generic-parameter-type";
import { IntType } from "./int-type";
import { ListType } from "./list-type";
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

const arraySymbol: ClassSymbol = {
  symbolId: "Array",
  symbolType: function (_transforms?: Transforms): SymbolType {
    return new ArrayType(new GenericParameterType("T"));
  },
  symbolScope: SymbolScope.program,
  isClass: true,
  isAbstract: false,
  isNotInheritable: false,
  ofTypes: [new GenericParameterType("T")],
};

const array2DSymbol: ClassSymbol = {
  symbolId: "Array2D",
  symbolType: function (_transforms?: Transforms): SymbolType {
    return new ArrayType(new ArrayType(new GenericParameterType("T")));
  },
  symbolScope: SymbolScope.program,
  isClass: true,
  isAbstract: false,
  isNotInheritable: false,
  ofTypes: [new GenericParameterType("T")],
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

const listSymbol: ClassSymbol = {
  symbolId: "List",
  symbolType: function (_transforms?: Transforms): SymbolType {
    return new ListType(new GenericParameterType("T"));
  },
  symbolScope: SymbolScope.program,
  isClass: true,
  isAbstract: false,
  isNotInheritable: false,
  ofTypes: [new GenericParameterType("T")],
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
  arraySymbol,
  array2DSymbol,
  listSymbol,
  funcSymbol,
  dictionarySymbol,
  dictionaryImmutableSymbol,
];
