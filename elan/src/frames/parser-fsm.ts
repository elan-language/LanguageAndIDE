export interface SourceOfCode {
    getRemainingCode(): string;
    matches(regEx: RegExp): boolean;
    removeMatch(regEx: RegExp): void;
}

export class SourceOfCodeImpl implements SourceOfCode {

    private remainingCode: string;

    constructor(code: string) {
        this.remainingCode = code;
    }

    getRemainingCode(): string {
        return this.remainingCode;
    }

    matches(regEx: RegExp): boolean {
        return regEx.test(this.remainingCode);
    }

    removeMatch(regEx: RegExp): void {
        this.remainingCode.replace(regEx,"");
    }
}

export class ParserFSMrule {
    readonly currentState: string;
    readonly match: RegExp; 
    readonly newState: string;
    readonly funcToCall?: (source: SourceOfCode) => void;

    constructor(currentState: string, match: RegExp, newState: string,funcToCall: (source: SourceOfCode) => void ) {
        this.currentState = currentState;
        this.match = match;
        this.newState = newState;
        this.funcToCall = funcToCall;
    }

    isMatch(currentState: string, source: SourceOfCode): boolean {
        return source.matches(this.match);
    }
}

//Strictly speaking this is a 'Mealy Machine' rather than a 'Finite State Machine' - since it generates output.
export class ParserFSM {

    //Each rule is [currentState, matchingInput, newState, localFunctionToCall ]
    //where matching input is a regEx that could match multiple chars, but always from the start onwards specified by start-anchor ^ 
    private rules: ParserFSMrule[];
    private currentState: string; 

    //The current state of the first rule in the array is set as the initial state for the machine
    constructor(rules: ParserFSMrule[]) {
        this.currentState = rules[0].currentState;
        this.rules = rules;
    }

    processCode(source: SourceOfCode): (source: SourceOfCode) => void {
        var rule = this.findMatchingRule(source);
        this.currentState = rule.newState;
        source.removeMatch(rule.match);
        return rule.funcToCall ? rule.funcToCall : this.processCode;
    }

    findMatchingRule(source: SourceOfCode): ParserFSMrule {
        var matches =  this.rules.filter(r => r.isMatch(this.currentState, source));
        if (matches.length === 1) {
            return matches[0];
        } else {
            throw new Error(`${matches.length} matching rules found.`)
        }
    }
}

