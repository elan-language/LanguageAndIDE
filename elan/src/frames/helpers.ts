
var id = 0;
export function nextId() {
    return id++;
}

export function resetId() {
    id = 0;
}