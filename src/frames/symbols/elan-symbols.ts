import { ClassSymbol } from "../interfaces/class-symbol";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { SymbolType } from "../interfaces/symbol-type";
import { Transforms } from "../syntax-nodes/transforms";
import { ArrayType } from "./array-list-type";
import { BooleanType } from "./boolean-type";
import { DictionaryType } from "./dictionary-type";
import { FloatType } from "./float-type";
import { FunctionType } from "./function-type";
import { GenericParameterType } from "./generic-parameter-type";
import { IntType } from "./int-type";
import { IterableType } from "./iterable-type";
import { ListType } from "./list-type";
import { StringType } from "./string-type";
import { SymbolScope } from "./symbol-scope";

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

const iterableSymbol: ClassSymbol = {
  symbolId: "Iterable",
  symbolType: function (_transforms?: Transforms): SymbolType {
    return new IterableType(new GenericParameterType("T"));
  },
  symbolScope: SymbolScope.program,
  isClass: true,
  abstract: true,
  notInheritable: true,
  ofTypes: [new GenericParameterType("T")],
};

const arraySymbol: ClassSymbol = {
  symbolId: "Array",
  symbolType: function (_transforms?: Transforms): SymbolType {
    return new ArrayType(new GenericParameterType("T"));
  },
  symbolScope: SymbolScope.program,
  isClass: true,
  abstract: false,
  notInheritable: false,
  ofTypes: [new GenericParameterType("T")],
};

const listSymbol: ClassSymbol = {
  symbolId: "List",
  symbolType: function (_transforms?: Transforms): SymbolType {
    return new ListType(new GenericParameterType("T"));
  },
  symbolScope: SymbolScope.program,
  isClass: true,
  abstract: false,
  notInheritable: false,
  ofTypes: [new GenericParameterType("T")],
};

const dictionarySymbol: ClassSymbol = {
  symbolId: "Dictionary",
  symbolType: function (_transforms?: Transforms): SymbolType {
    return new DictionaryType(new GenericParameterType("T1"), new GenericParameterType("T2"));
  },
  symbolScope: SymbolScope.program,
  isClass: true,
  abstract: false,
  notInheritable: false,
  ofTypes: [new GenericParameterType("T1"), new GenericParameterType("T2")],
};

const dictionaryImmutableSymbol: ClassSymbol = {
  symbolId: "DictionaryImmutable",
  symbolType: function (_transforms?: Transforms): SymbolType {
    return new DictionaryType(new GenericParameterType("T1"), new GenericParameterType("T2"));
  },
  symbolScope: SymbolScope.program,
  isClass: true,
  abstract: false,
  notInheritable: false,
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
  abstract: true,
  notInheritable: true,
  ofTypes: [new GenericParameterType("T")],
};

export const elanSymbols = [
  intSymbol,
  floatSymbol,
  stringSymbol,
  booleanSymbol,
  iterableSymbol,
  arraySymbol,
  listSymbol,
  funcSymbol,
  dictionarySymbol,
  dictionaryImmutableSymbol,
];
