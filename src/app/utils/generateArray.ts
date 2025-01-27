export function generateArray(items: number) {
    const array = Array.from({ length: items }, (_, i) => i + 1);
    return array;
}