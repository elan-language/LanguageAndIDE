import { ClassSymbol } from "../frame-interfaces/class-symbol";
import { ElanSymbol } from "../frame-interfaces/elan-symbol";
import { SymbolType } from "../frame-interfaces/symbol-type";
import { Transforms } from "../frame-interfaces/transforms";
import { BooleanType } from "./boolean-type";
import { FuncName, TupleName } from "./elan-type-names";
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
  symbolId: TupleName,
  symbolType: function (_transforms?: Transforms): SymbolType {
    return new TupleType([new GenericParameterType("T1"), new GenericParameterType("T2")]);
  },
  symbolScope: SymbolScope.program,
  isClass: true,
  isAbstract: true,
  isNotInheritable: true,
  ofTypes: [new GenericParameterType("T1"), new GenericParameterType("T2")],
};

const funcSymbol: ClassSymbol = {
  symbolId: FuncName,
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
];
