// Interface for the different language classes
// which provide the tables for the translations of the library function calls
// when exporting in each language
export interface LanguageExport {
  mathExceptions: { [propName: string]: string };
  mathPrefix: string;
  plainMethodTable: { [propName: string]: string };
  extensionTable: { [propName: string]: string };
  standaloneTable: { [propName: string]: string };
  polyfillTable: { [propName: string]: string };
  translateOddities(expr: string): string;
  getImportNeeded(funcname: string): string;
}
