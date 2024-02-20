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
        throw new Error("Cannot specifify empty string as the match");
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

export function sequence(input: [Status, string], funcs: Array<(input: [Status, string]) => [Status, string]>): [Status, string]
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
    return sequence(input, [identifier, sp, type]);
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

export function zeroOrMore(input: [Status, string], func: (input: [Status, string]) => [Status, string]) {
    var result = input;
    while (result[0] > Status.Incomplete && result[1].length > 0) {  
        result = func(result);     
    }
    return result[0] === Status.NotParsed ? [Status.Valid, result[1]] : result;
}

export function oneOrMore(input: [Status, string], func: (input: [Status, string]) => [Status, string]) {
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

export function commaSeparatedOneOrMore(input: [Status, string],  func: (input: [Status, string]) => [Status, string]): [Status, string] {
   var result = func(input);
   var cont = true;
   while (result[0] === Status.Valid && result[1].length > 0 && cont) {
        var result2 = sequence(result, [comma, func]);
        if (result2[0] >Status.Invalid) {
            result = result2;
        } else {
            cont = false;
        }
   }
   return result;
}

export function commaSeparatedZeroOrMore(input: [Status, string],  func: (input: [Status, string]) => [Status, string]): [Status, string] {
    var result = func(input);
    if (result[0] === Status.Valid) {
        var cont = true;
        while (result[0] >= Status.Valid && result[1].length > 0 && cont) {
            var result2 = sequence(result, [comma, func]);
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
    return commaSeparatedZeroOrMore(input, paramDef);
}

export function OR(input: [Status, string], funcs: Array<(input: [Status, string]) => [Status, string]>): [Status, string]
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
    return OR(input, [t,f]);
}

export function literalInt(input: [Status, string]): [Status, string] {
    return genericRegEx(input, `^${Regexes.literalInt}`);
}

const dot = (input: [Status, string]) => genericString(input, ".");

export function literalFloat(input: [Status, string]): [Status, string] {
    return sequence(input, [literalInt, dot, literalInt]);
}
export function literalChar(input: [Status, string]): [Status, string] {
    var quote = (input: [Status, string]) => genericString(input, `'`); //defines all printable ascii chars
    var ch = (input: [Status, string]) => genericRegEx(input, `^[ -~]`);
    return sequence(input, [quote, ch, quote]);
}

export function enumValue(input: [Status, string]): [Status, string] {
    return sequence(input, [type, dot, identifier]);
}

export function literalValue(input: [Status, string]): [Status, string] {
    return OR(input, [literalBoolean, literalInt, literalFloat, literalChar, enumValue]);
}