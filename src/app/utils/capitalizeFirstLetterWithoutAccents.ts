export function capitalizeFirstLetterWithoutAccents(str: string) {
  // Primero, capitalizamos la primera letra de cada palabra
  let resultado = str.replace(/\b\w/g, (letra) => letra.toUpperCase());

  // Ahora, evitamos que haya mayúsculas después de una letra con tilde
  resultado = resultado.replace(
    /([áéíóúÁÉÍÓÚ])([A-Z])/g,
    (_, tilde, siguienteLetra) => {
      return tilde + siguienteLetra.toLowerCase();
    }
  );

  return resultado;
}
