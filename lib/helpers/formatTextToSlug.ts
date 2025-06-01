export function toSlug(text: string) {
    return text
      .normalize("NFD")                         // Descompone acentos (e.g., á -> a + ́)
      .replace(/[\u0300-\u036f]/g, "")         // Elimina los signos diacríticos
      .toLowerCase()                           // Convierte a minúsculas
      .replace(/\s+/g, "_")                    // Reemplaza espacios por guiones bajos
      .replace(/[^\w_]+/g, "")                 // Elimina caracteres no alfanuméricos (excepto guión bajo)
      .replace(/__+/g, "_")                    // Reemplaza múltiples guiones bajos por uno solo
      .replace(/^_+|_+$/g, "");                // Elimina guiones bajos al inicio y al final
  }