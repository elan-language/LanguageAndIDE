import { ParseStatus } from "../parse-status";

export interface ParseByFunction {
    isParseByFunction: boolean;
    parseFunction(input: [ParseStatus, string]): [ParseStatus, string];
}