import { Regexes } from "./regexes";

export enum Status {
    Invalid, Incomplete, Valid, NotParsed
}

function isMatchRegEx(code: string, regEx: RegExp): boolean {
    var matches = code.match(regEx);
    return matches !== null && matches.length > 0;
}

function removeRegEx(code: string, regx: RegExp): string {
    if (!isMatchRegEx(code, regx)) {
        throw new Error(`Code does not match ${regx}`);
    } else {
        return code.replace(code.match(regx)![0], "");
    }
}

export function genericString(input: [Status, string], match: string): [Status, string] {
    var result = input;
    if (match.length === 0) {
        throw new Error("Cannot specify empty string as the match");
    }
    if (input[0] >= Status.Valid) {
        var [_, code] = input;
        if (code.length ===0) {
            result = [Status.Invalid, code];
        } else if (code.startsWith(match)) {
            result = [Status.Valid, code.substring(match.length)];
        } else if (match.startsWith(code)) {
            result = [Status.Incomplete, ""];
        } else {
            result = [Status.Invalid, code];
        }
    }
    return result;
}

export function singleChar(input: [Status, string], char: string ): [Status, string] {
  var result = input
  if (input[0] >= Status.Valid) {
    if (input[1].startsWith(char)){
        result = [Status.Valid, input[1].substring(1)];
    } else {
        result =  [Status.Invalid, input[1]];
    }
  } 
  return result;
}

export function identifier(input: [Status, string]): [Status, string] {
    return genericRegEx(input, `^${Regexes.identifier}`);
}

function genericRegEx(input: [Status, string], regxString: string): [Status, string] {
    var result = input;
    if (input[0] >= Status.Valid) {
        var [_, code] = input;
        var regx = new RegExp(regxString);
        if (isMatchRegEx(code, regx)) {
            result = [Status.Valid, removeRegEx(code, regx)];
        } else {
            result = [Status.Invalid, code];
        }
    }
    return result;
}

export function type(input: [Status, string]): [Status, string] {
    return genericRegEx(input, `^${Regexes.type}`);
}

export function sp(input: [Status, string]): [Status, string] {
    return genericRegEx(input, `^\\s+`);
}

export function optSp(input: [Status, string]): [Status, string] {
    return genericRegEx(input, `^\\s*`);
}

export function comma(input: [Status, string]): [Status, string] {
    return genericRegEx(input, `^\\s*,\\s*`);
}

export function SEQ(input: [Status, string], funcs: Array<(input: [Status, string]) => [Status, string]>): [Status, string]
{
    var i = 0; //Index
    var result = input;
    while (i < funcs.length && result[0] >= Status.Valid) {  
        result = funcs[i](result);     
        if (i > 0 && result[0] === Status.Invalid) {
            result = [Status.Incomplete, result[1]];
        } else {
            i++;
        }
    }
    return result;
}

export function paramDef(input: [Status, string]): [Status, string] {
    return SEQ(input, [identifier, sp, type]);
}

export function optional(input: [Status, string], func: (input: [Status, string]) => [Status, string]) {
    var result = input;
    if (input[0] >= Status.Valid) {
        var result = func(input);
        if (result[0] === Status.Invalid) {
            result = [Status.Valid, result[1]];
        }
    }
    return result;
}

// 'Zero or more'
export function STAR(input: [Status, string], func: (input: [Status, string]) => [Status, string]) {
    var result = input;
    while (result[0] > Status.Incomplete && result[1].length > 0) {  
        result = func(result);     
    }
    return result[0] === Status.NotParsed ? [Status.Valid, result[1]] : result;
}

// 'one or more'
export function PLUS(input: [Status, string], func: (input: [Status, string]) => [Status, string]) {
    var result = input;
    var count = 0;
    while (result[0] > Status.Incomplete && result[1].length > 0) {  
        result = func(result); 
        if (result[0] > Status.Invalid) {
            count ++;
        }   
    }
    return count > 0 ? result : [Status.Invalid, result[1]];
}

export function CSV_1(input: [Status, string],  func: (input: [Status, string]) => [Status, string]): [Status, string] {
   var result = func(input);
   var cont = true;
   while (result[0] === Status.Valid && result[1].length > 0 && cont) {
        var result2 = SEQ(result, [comma, func]);
        if (result2[0] >Status.Invalid) {
            result = result2;
        } else {
            cont = false;
        }
   }
   return result;
}

export function CSV_0(input: [Status, string],  func: (input: [Status, string]) => [Status, string]): [Status, string] {
    var result = func(input);
    if (result[0] === Status.Valid) {
        var cont = true;
        while (result[0] >= Status.Valid && result[1].length > 0 && cont) {
            var result2 = SEQ(result, [comma, func]);
            if (result2[0] >Status.Invalid) {
                result = result2;
            } else {
                cont = false;
            }
        }
    } else if (result[0] === Status.Invalid){
        result = [Status.Valid, result[1]];
    }
    return result;
 }

export function paramsList(input: [Status, string]): [Status, string] {
    return CSV_0(input, paramDef);
}

//TODO: consider case for adding a 'firstMatchFrom'
export function LongestMatchFrom(input: [Status, string], funcs: Array<(input: [Status, string]) => [Status, string]>): [Status, string]
{   var result = input;
    if (input[0] ! > Status.Incomplete && input[1].length > 0) {
        var bestStatus = Status.Invalid;
        var bestRemainingCode = input[1];
        funcs.forEach(f => {
           var [st, code] = f(input);
           if (st > bestStatus)
           {
               bestStatus = st;
               bestRemainingCode = code;
           }
        });
        result = [bestStatus, bestRemainingCode];
    }
    return result;
}

export function literalBoolean(input: [Status, string]): [Status, string] {
    var t = (input: [Status, string]) => genericString(input, "true");
    var f = (input: [Status, string]) => genericString(input, "false");
    return LongestMatchFrom(input, [t,f]);
}

export function literalInt(input: [Status, string]): [Status, string] {
    return genericRegEx(input, `^${Regexes.literalInt}`);
}

const dot = (input: [Status, string]) => singleChar(input, ".");

//TODO: Exponent
export function literalFloat(input: [Status, string]): [Status, string] {
    return SEQ(input, [literalInt, dot, literalInt]);
}
//TODO: Unicode def?
export function literalChar(input: [Status, string]): [Status, string] {
    var quote = (input: [Status, string]) => genericString(input, `'`); //defines all printable ascii chars
    var ch = (input: [Status, string]) => genericRegEx(input, `^[ -~]`);
    return SEQ(input, [quote, ch, quote]);
}

export function enumValue(input: [Status, string]): [Status, string] {
    return SEQ(input, [type, dot, identifier]);
}

export function literalValue(input: [Status, string]): [Status, string] {
    return LongestMatchFrom(input, [literalBoolean, literalInt, literalFloat, literalChar, enumValue]);
}

export function literal(input: [Status, string]): [Status, string] {
    //TODO: maybe shortcut this based on starting characters
    return LongestMatchFrom(input, [literalValue]); //TODO literalDataStructure
}

//TODO: scopeQualifier: (PROPERTY | GLOBAL | LIBRARY | (PACKAGE DOT namespace)) DOT; 
//Note: always optional here
export function scopeQualifier_opt(input: [Status, string]): [Status, string] {
    var prop = (input: [Status, string]) => genericString(input, "property");
    var glob = (input: [Status, string]) => genericString(input, "global");
    var lib = (input: [Status, string]) => genericString(input, "library");
    //TODO package
    var keywords = (input: [Status, string]) =>LongestMatchFrom(input, [prop,glob,lib]);
    var qual= (input: [Status, string]) => SEQ(input, [keywords, dot]);
    return optional(input, qual);  
}

//TODO literal | scopeQualifier? IDENTIFIER  |dataStructureDefinition | THIS | DEFAULT type;
export function value(input: [Status, string]): [Status, string] {
    var sqId = (input: [Status, string]) => SEQ(input, [scopeQualifier_opt, identifier]);
    return LongestMatchFrom(input, [literal, sqId]);  //TODO others
}

export function literalString(input: [Status, string]): [Status, string] {
  throw new Error("Not implemented")
}

export function literalList(input: [Status, string]): [Status, string] {
    throw new Error("Not implemented");
    //short circuit for starting with open brace
    //Test first for specific types of list i.e. litListString, litListInt etc
    //Maybe we should disallow literal lists except of literal values. i.e. if
    // you want to build list from expressions, need to define list and add to it.
    // Similarly for dictionaries

}

export function literalTuple(input: [Status, string]): [Status, string] {
  throw new Error("Not implemented")
}

export function literalDictionary(input: [Status, string]): [Status, string] {
    throw new Error("Not implemented")
}

export function literalDataStructure(input: [Status, string]): [Status, string] {
    return LongestMatchFrom(input, [literalString, literalList, literalTuple, literalDictionary]);
}

