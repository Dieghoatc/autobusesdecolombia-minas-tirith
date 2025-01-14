
export function generateArray(items: number) {
    const array = Array.from({ length: items }, (_, i) => i + 1);
    return array;
}

export function capitalizeFirstLetter(text: string) {
    if (!text || text === null) return "";
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export function capitalizeWords(text: string) {
    if (!text || text === null) return "";
    return text.replace(/\b\w/g, char => char.toUpperCase());

}