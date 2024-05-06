export enum ParseStatus {
    invalid,
    empty,
    incomplete, 
    valid,    
    notParsed
}

export enum CompileStatus {
    error, 
    unknownSymbol, 
    ok
}

export enum OverallStatus {
    ok, 
    warning, 
    error
}

