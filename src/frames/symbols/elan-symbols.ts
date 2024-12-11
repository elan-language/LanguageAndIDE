import { ClassSymbol } from "../interfaces/class-symbol";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { SymbolType } from "../interfaces/symbol-type";
import { Transforms } from "../syntax-nodes/transforms";
import { BooleanType } from "./boolean-type";
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
  symbolType: function (transforms?: Transforms): SymbolType {
    return IntType.Instance;
  },
  symbolScope: SymbolScope.program,
};

const floatSymbol: ElanSymbol = {
  symbolId: FloatType.Instance.name,
  symbolType: function (transforms?: Transforms): SymbolType {
    return FloatType.Instance;
  },
  symbolScope: SymbolScope.program,
};

const stringSymbol: ElanSymbol = {
  symbolId: StringType.Instance.name,
  symbolType: function (transforms?: Transforms): SymbolType {
    return StringType.Instance;
  },
  symbolScope: SymbolScope.program,
};

const booleanSymbol: ElanSymbol = {
  symbolId: BooleanType.Instance.name,
  symbolType: function (transforms?: Transforms): SymbolType {
    return BooleanType.Instance;
  },
  symbolScope: SymbolScope.program,
};

const iterableSymbol: ClassSymbol = {
  symbolId: "Iterable",
  symbolType: function (transforms?: Transforms): SymbolType {
    return new IterableType(new GenericParameterType("T"));
  },
  symbolScope: SymbolScope.program,
  isClass: true,
  abstract: true,
  ofTypes: [new GenericParameterType("T")],
};

const funcSymbol: ClassSymbol = {
  symbolId: "Func",
  symbolType: function (transforms?: Transforms): SymbolType {
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
  ofTypes: [new GenericParameterType("T")],
};

export const elanSymbols = [
  intSymbol,
  floatSymbol,
  stringSymbol,
  booleanSymbol,
  iterableSymbol,
  funcSymbol,
];
