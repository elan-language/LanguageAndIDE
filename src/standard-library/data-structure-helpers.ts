import { System } from "../system";

export function withAppendHelper(contents: never[], value: never): never[] {
  const newList = [...contents];
  newList.push(value);
  return newList;
}

export function withPutAtHelper(contents: never[], index: number, value: never): never[] {
  const newList = [...contents];
  newList[index] = value;
  return newList;
}

export function withInsertAtHelper(contents: never[], index: number, value: never): never[] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const newList = (contents as any).toSpliced(index, 0, value);
  return newList;
}

export function withRemoveAtHelper(contents: never[], index: number): never[] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const newList = (contents as any).toSpliced(index, 1);
  return newList;
}

export function withRemoveFirstHelper(
  contents: never[],
  value: never,
  system: System
): never[] {
  let newList = [...contents];
  const index = system.elanIndexOf(newList, value);
  if (index > -1) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    newList = (newList as any).toSpliced(index, 1);
  }
  return newList;
}

export function withRemoveAllHelper(
  contents: never[],
  value: never,
  system: System
): never[] {
  let newList = [...contents];
  let index = system.elanIndexOf(newList, value);
  while (index > -1) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    newList = (newList as any).toSpliced(index, 1);
    index = system.elanIndexOf(newList, value);
  }
  return newList;
}
