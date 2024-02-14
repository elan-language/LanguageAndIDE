export class Regexes {


    static readonly type = `[A-Z]\\w*`; 
    static readonly identifier = `[a-z]\\w*`; 
    static readonly literalString = `"[^"]*"`;
    static readonly literalInt = `[0-9][0-9]*`;
    static readonly literalFloat = `[0-9][0-9]*\\.[0-9][0-9]*`;
    static readonly literalChar = `'[^']'`;
    static readonly literalBool = `(true|false)`;
    static readonly literalValue = `${Regexes.literalString}|${Regexes.literalInt}|${Regexes.literalFloat}|${Regexes.literalChar}|${Regexes.literalBool}`;
    static readonly variable = `${Regexes.identifier}(\\[.*\\])?`; //TODO '.*' is too open
    static readonly value = `${Regexes.literalValue}|${Regexes.variable}`;
    static readonly argList = `(${Regexes.value})(,\\s(${Regexes.value}))*`; //For time being does not allow expressions
    static readonly paramDef = `${Regexes.identifier} ${Regexes.type}`;
    static readonly paramList = `${Regexes.paramDef}(, ${Regexes.paramDef})*`;
    static readonly typeList = `${Regexes.type}(, ${Regexes.type})*`;
    static readonly identifierList = `${Regexes.identifier}(, ${Regexes.identifier})*`;
    static readonly newLine = `(\\r)?\\n`;
    static readonly anythingToNewLine = `[^${Regexes.newLine}]*`;
    static readonly expression = Regexes.anythingToNewLine; //TODO temporary kludge only - expression must go to end of line
    static readonly comment = `# ${Regexes.anythingToNewLine}`;
}