
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

export function capitalizeFirstLetterWithoutAccents(str: string) {
    // Primero, capitalizamos la primera letra de cada palabra
    let resultado = str.replace(/\b\w/g, letra => letra.toUpperCase());

    // Ahora, evitamos que haya mayúsculas después de una letra con tilde
    resultado = resultado.replace(/([áéíóúÁÉÍÓÚ])([A-Z])/g, (_, tilde, siguienteLetra) => {
        return tilde + siguienteLetra.toLowerCase();
    });

    return resultado;
  }