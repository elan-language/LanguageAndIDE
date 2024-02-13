
export interface Parser {
    parseAsMuchAsPoss(source: SourceOfCode): void;
}

export interface SourceOfCode {
    getRemainingCode(): string;
    isMatchRegEx(regEx: RegExp): boolean;
    isMatchString(match: string): boolean;
    matchRegEx(regEx: RegExp): string;
    removeRegEx(regEx: RegExp): void;
    removeString(s: string): void;
    hasMoreCode(): boolean;
}

export class SourceOfCodeImpl implements SourceOfCode {
    private remainingCode: string;

    constructor(code: string) {
        this.remainingCode = code;
    }
    isMatchString(match: string): boolean {
        return this.remainingCode.startsWith(match);
    }
    removeString(s: string): void {
        this.remainingCode = this.remainingCode.substring(s.length);
    }
    hasMoreCode(): boolean {
        return this.remainingCode.length > 0;
    }

    getRemainingCode(): string {
        return this.remainingCode;
    }

    isMatchRegEx(regEx: RegExp): boolean {
        return regEx.test(this.remainingCode);
    }

    matchRegEx(regEx: RegExp): string {
        var matches = this.remainingCode.match(regEx);
        if (matches === null || matches.length > 1 ) {
            throw new Error(`${matches?.length} matches found for ${regEx}`)
        } else {
            return matches[0];
        }
    }

    removeRegEx(regEx: RegExp): void {
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
        return currentState === this.currentState && source.isMatchRegEx(this.match);
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
            source.removeRegEx(rule.match);
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

