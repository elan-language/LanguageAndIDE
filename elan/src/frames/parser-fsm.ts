
export interface Parser {
    parseAsMuchAsPoss(source: SourceOfCode): void;
}

export interface SourceOfCode {
    getRemainingCode(): string;
    isMatch(regEx: RegExp): boolean;
    match(regEx: RegExp): string;
    removeMatch(regEx: RegExp): void;
    hasMoreCode(): boolean;
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

    isMatch(regEx: RegExp): boolean {
        return regEx.test(this.remainingCode);
    }

    match(regEx: RegExp): string {
        var matches = this.remainingCode.match(regEx);
        if (matches === null || matches.length > 1 ) {
            throw new Error(`${matches?.length} matches found for ${regEx}`)
        } else {
            return matches[0];
        }
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
        return currentState === this.currentState && source.isMatch(this.match);
    }
}

//Strictly speaking this is a 'Mealy Machine' rather than a 'Finite State Machine' - since it generates output.
export class ParserFSM implements Parser {

    //Each rule is [currentState, matchingInput, newState, localFunctionToCall ]
    //where matching input is a regEx that could match multiple chars, but always from the start onwards specified by start-anchor ^ 
    private rules: ParserRule[];
    private currentState: string; 
    public static readonly finished: string = "finished";

    //The current state of the first rule in the array is set as the initial state for the machine
    constructor(rules: ParserRule[]) {
        this.currentState = rules[0].currentState;
        this.rules = rules;
    }

    parseAsMuchAsPoss(source: SourceOfCode) {
        while (this.currentState !== ParserFSM.finished ) {
            var rule = this.findMatchingRule(source);
            this.currentState = rule.newState;
            source.removeMatch(rule.match);
            if (rule.nextFrame) {
                rule.nextFrame.parseAsMuchAsPoss(source);
            }
        }
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

