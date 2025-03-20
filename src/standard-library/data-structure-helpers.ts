import { System } from "../system";

export function withAppendHelper(contents: never[], value: never): never[] {
  const newList = [...contents];
  newList.push(value);
  return newList;
}

export function withAppendListHelper(contents: never[], listB: never[]): never[] {
  const newList = [...contents];
  newList.push(...listB);
  return newList;
}

export function withPutHelper(contents: never[], index: number, value: never): never[] {
  const newList = [...contents];
  newList[index] = value;
  return newList;
}

export function withInsertHelper(contents: never[], index: number, value: never): never[] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (contents as any).toSpliced(index, 0, value);
}

export function withRemoveAtHelper(contents: never[], index: number): never[] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (contents as any).toSpliced(index, 1);
}

export function withRemoveFirstHelper(contents: never[], value: never, system: System): never[] {
  let newList = [...contents];
  const index = system.elanIndexOf(newList, value);
  if (index > -1) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    newList = (newList as any).toSpliced(index, 1);
  }
  return newList;
}

export function withRemoveAllHelper(contents: never[], value: never, system: System): never[] {
  let newList = [...contents];
  let index = system.elanIndexOf(newList, value);
  while (index > -1) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    newList = (newList as any).toSpliced(index, 1);
    index = system.elanIndexOf(newList, value);
  }
  return newList;
}

export async function filterHelper(
  contents: never[],
  predicate: (value: never) => Promise<boolean>,
): Promise<never[]> {
  const list = [...contents];

  const asyncFilter = async (list: never[], predicate: (value: never) => Promise<boolean>) => {
    const results = await Promise.all(list.map(predicate));

    return list.filter((_v, index) => results[index]);
  };

  return await asyncFilter(list, predicate);
}

export async function mapHelper(
  contents: never[],
  predicate: (value: never) => Promise<never>,
): Promise<never[]> {
  const list = [...contents];
  return await Promise.all(list.map(predicate));
}

export async function reduceHelper(
  contents: never[],
  initValue: never,
  predicate: (s: never, value: never) => Promise<never>,
): Promise<never> {
  const list = [...contents];
  let acc: never = initValue;
  for (const i of list) {
    acc = await predicate(acc, i);
  }
  return acc;
}

export async function maxByHelper(
  contents: never[],
  predicate: (value: never) => Promise<never>,
  system: System,
): Promise<never> {
  const mm = await mapHelper(contents, predicate);
  const max = Math.max(...mm);
  const i = system.elanIndexOf(mm, max);
  return contents[i];
}

export async function minByHelper(
  contents: never[],
  predicate: (value: never) => Promise<never>,
  system: System,
): Promise<never> {
  const mm = await mapHelper(contents, predicate);
  const min = Math.min(...mm);
  const i = system.elanIndexOf(mm, min);
  return contents[i];
}

export async function sortByHelper(
  contents: never[],
  predicate: (a: never, b: never) => Promise<number>,
  system: System,
): Promise<never[]> {
  const clone = [...contents];
  return await system.quickSort(clone, predicate);
}
