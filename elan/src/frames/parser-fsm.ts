export interface SourceOfCode {
    getRemainingCode(): string;
    matches(regEx: RegExp): boolean;
    removeMatch(regEx: RegExp): void;
    hasMoreCode(): boolean;
}

export interface Parser {
    processCode(source: SourceOfCode): Parser
}

export class SourceOfCodeImpl implements SourceOfCode {
    private remainingCode: string;

    constructor(code: string) {
        this.remainingCode = code;
    }
    hasMoreCode(): boolean {
        return this.remainingCode.length > 0;
    }

    getRemainingCode(): string {
        return this.remainingCode;
    }

    matches(regEx: RegExp): boolean {
        return regEx.test(this.remainingCode);
    }

    removeMatch(regEx: RegExp): void {
        this.remainingCode = this.remainingCode.replace(regEx,"");
    }
}

export class ParserRule {
    readonly currentState: string;
    readonly match: RegExp; 
    readonly newState: string;
    readonly nextFrame?: Parser;

    constructor(currentState: string, match: RegExp, newState: string, nextFrame?: Parser) {
        this.currentState = currentState;
        this.match = match;
        this.newState = newState;
        this.nextFrame = nextFrame;
    }

    isMatch(currentState: string, source: SourceOfCode): boolean {
        return currentState === this.currentState && source.matches(this.match);
    }
}

//Strictly speaking this is a 'Mealy Machine' rather than a 'Finite State Machine' - since it generates output.
export class ParserFSM implements Parser {

    //Each rule is [currentState, matchingInput, newState, localFunctionToCall ]
    //where matching input is a regEx that could match multiple chars, but always from the start onwards specified by start-anchor ^ 
    private rules: ParserRule[];
    private currentState: string; 

    //The current state of the first rule in the array is set as the initial state for the machine
    constructor(rules: ParserRule[]) {
        this.currentState = rules[0].currentState;
        this.rules = rules;
    }

    processCode(source: SourceOfCode): Parser {
        var rule = this.findMatchingRule(source);
        this.currentState = rule.newState;
        source.removeMatch(rule.match);
        return rule.nextFrame ? rule.nextFrame : this;
    }

    findMatchingRule(source: SourceOfCode): ParserRule {
        var matches =  this.rules.filter(r => r.isMatch(this.currentState, source));
        if (matches.length === 1) {
            return matches[0];
        } else {
            throw new Error(`${matches.length} matching rules found.`)
        }
    }
}

