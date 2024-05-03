export class CompileError {
    constructor(public readonly message: string, public readonly locationId : string, public readonly unknownType : boolean) {
        console.warn(`Compile Error:  ${message} ${locationId}`);
    }
}