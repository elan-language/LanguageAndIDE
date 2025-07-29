export interface TypeDict {
  Type: string;
  [index: string]: TypeDict | string | TypeDict[];
}
