import { Frame } from "./frame";
import { Statement } from "./statements/statement";
import { Global } from "./globals/global";
import { Member } from "./class-members/member";

var id = 0;
export function nextId() {
    return id++;
}

export function resetId() {
    id = 0;
}

export function isGlobal(f?: Frame): f is Global {
    return !!f && 'isGlobal' in f;
}

export function isStatement(f?: Frame): f is Statement {
    return !!f && 'isStatement' in f;
} 

export function isMember(f?: Frame): f is Member {
    return !!f && 'isMember' in f;
} 