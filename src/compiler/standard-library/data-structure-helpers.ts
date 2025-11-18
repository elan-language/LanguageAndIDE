import { System } from "../system";
import { ElanRuntimeError } from "./elan-runtime-error";

function checkIndex<T>(contents: T[], index: number) {
  const size = contents.length;
  if (index >= size || index < 0) {
    throw new ElanRuntimeError(`Out of range index: ${index} size: ${size}`);
  }
}

export function withAppendHelper<T>(contents: T[], value: T): T[] {
  const newList = [...contents];
  newList.push(value);
  return newList;
}

export function withAppendListHelper<T>(contents: T[], listB: T[]): T[] {
  const newList = [...contents];
  newList.push(...listB);
  return newList;
}

export function withPutHelper<T>(contents: T[], index: number, value: T): T[] {
  checkIndex(contents, index);
  const newList = [...contents];
  newList[index] = value;
  return newList;
}

export function withInsertHelper<T>(contents: T[], index: number, value: T): T[] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (contents as any).toSpliced(index, 0, value);
}

export function withRemoveAtHelper<T>(contents: T[], index: number): T[] {
  checkIndex(contents, index);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (contents as any).toSpliced(index, 1);
}

export function withRemoveFirstHelper<T>(contents: T[], value: T, system: System): T[] {
  let newList = [...contents];
  const index = system.elanIndexOf(newList, value);
  if (index > -1) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    newList = (newList as any).toSpliced(index, 1);
  }
  return newList;
}

export function withRemoveAllHelper<T>(contents: T[], value: T, system: System): T[] {
  let newList = [...contents];
  let index = system.elanIndexOf(newList, value);
  while (index > -1) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    newList = (newList as any).toSpliced(index, 1);
    index = system.elanIndexOf(newList, value);
  }
  return newList;
}

export async function filterHelper<T>(
  contents: T[],
  predicate: (value: T) => Promise<boolean>,
): Promise<T[]> {
  const list = [...contents];

  const asyncFilter = async (list: T[], predicate: (value: T) => Promise<boolean>) => {
    const results = await Promise.all(list.map(predicate));

    return list.filter((_v, index) => results[index]);
  };

  return await asyncFilter(list, predicate);
}

export async function mapHelper<T1, T2>(
  contents: T1[],
  predicate: (value: T1) => Promise<T2>,
): Promise<T2[]> {
  const list = [...contents];
  return await Promise.all(list.map(predicate));
}

export async function reduceHelper<T1, T2>(
  contents: T1[],
  initValue: T2,
  predicate: (s: T2, value: T1) => Promise<T2>,
): Promise<T2> {
  const list = [...contents];
  let acc = initValue;
  for (const i of list) {
    acc = await predicate(acc, i);
  }
  return acc;
}

export async function maxByHelper<T>(
  contents: T[],
  predicate: (value: T) => Promise<number>,
  system: System,
): Promise<T> {
  const mm = await mapHelper(contents, predicate);
  const max = Math.max(...mm);
  const i = system.elanIndexOf(mm, max);
  return contents[i];
}

export async function minByHelper<T>(
  contents: T[],
  predicate: (value: T) => Promise<number>,
  system: System,
): Promise<T> {
  const mm = await mapHelper(contents, predicate);
  const min = Math.min(...mm);
  const i = system.elanIndexOf(mm, min);
  return contents[i];
}

export async function sortByHelper<T>(
  contents: T[],
  predicate: (a: T, b: T) => Promise<number>,
  system: System,
): Promise<T[]> {
  const clone = [...contents];
  return await system.quickSort(clone, predicate);
}

export async function orderByHelper<T>(
  contents: T[],
  predicate: (a: T, b: T) => Promise<boolean>,
  system: System,
): Promise<T[]> {
  const clone = [...contents];
  const requiredPredicate: (a: T, b: T) => Promise<number> = async (a: T, b: T) =>
    a === b ? 0 : (await predicate(a, b)) ? 1 : -1;
  return await system.quickSort(clone, requiredPredicate);
}
