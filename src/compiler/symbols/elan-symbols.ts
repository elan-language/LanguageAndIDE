import { Language } from "../../ide/frames/frame-interfaces/language";
import { ClassSymbol } from "../compiler-interfaces/class-symbol";
import { ElanSymbol, ElanSymbolByLanguage } from "../compiler-interfaces/elan-symbol";
import { SymbolType } from "../compiler-interfaces/symbol-type";
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

const intSymbol: ElanSymbolByLanguage = {
  symbolId: IntType.Instance.name,
  symbolType: function (): SymbolType {
    return IntType.Instance;
  },
  symbolScope: SymbolScope.program,
  symbolIsType: true,
  toLanguage: function (l: Language): ElanSymbol {
    return {
      symbolId: l.INT_NAME,
      symbolType: function (): SymbolType {
        return IntType.Instance;
      },
      symbolScope: SymbolScope.program,
      symbolIsType: true,
    };
  },
};

const floatSymbol: ElanSymbolByLanguage = {
  symbolId: FloatType.Instance.name,
  symbolType: function (): SymbolType {
    return FloatType.Instance;
  },
  symbolScope: SymbolScope.program,
  symbolIsType: true,
  toLanguage: function (l: Language): ElanSymbol {
    return {
      symbolId: l.FLOAT_NAME,
      symbolType: function (): SymbolType {
        return FloatType.Instance;
      },
      symbolScope: SymbolScope.program,
      symbolIsType: true,
    };
  },
};

const stringSymbol: ElanSymbolByLanguage = {
  symbolId: StringType.Instance.name,
  symbolType: function (): SymbolType {
    return StringType.Instance;
  },
  symbolScope: SymbolScope.program,
  symbolIsType: true,
  toLanguage: function (l: Language): ElanSymbol {
    return {
      symbolId: l.STRING_NAME,
      symbolType: function (): SymbolType {
        return StringType.Instance;
      },
      symbolScope: SymbolScope.program,
      symbolIsType: true,
    };
  },
};

const booleanSymbol: ElanSymbolByLanguage = {
  symbolId: BooleanType.Instance.name,
  symbolType: function (): SymbolType {
    return BooleanType.Instance;
  },
  symbolScope: SymbolScope.program,
  symbolIsType: true,
  toLanguage: function (l: Language): ElanSymbol {
    return {
      symbolId: l.BOOL_NAME,
      symbolType: function (): SymbolType {
        return BooleanType.Instance;
      },
      symbolScope: SymbolScope.program,
      symbolIsType: true,
    };
  },
};

const regExpSymbol: ElanSymbol = {
  symbolId: RegExpType.Instance.name,
  symbolType: function (): SymbolType {
    return RegExpType.Instance;
  },
  symbolScope: SymbolScope.program,
  symbolIsType: true,
};

const tupleSymbol: ClassSymbol = {
  symbolId: TupleName,
  symbolType: function (): SymbolType {
    return new TupleType([new GenericParameterType("T1"), new GenericParameterType("T2")]);
  },
  symbolScope: SymbolScope.program,
  isClass: true,
  isAbstract: true,
  isNotInheritable: true,
  ofTypes: [new GenericParameterType("T1"), new GenericParameterType("T2")],
  symbolIsType: true,
};

const funcSymbol: ClassSymbol = {
  symbolId: FuncName,
  symbolType: function (): SymbolType {
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
  symbolIsType: true,
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
