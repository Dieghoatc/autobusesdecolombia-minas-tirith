export function capitalizeWords(text: string) {
  if (!text || text === null) return "";
  return text.replace(/\b\w/g, (char) => char.toUpperCase());
}
