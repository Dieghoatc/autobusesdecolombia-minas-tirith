export function formatString(text: string) {
  const capitalizeFirstLetter = text.replace(/\b\w/g, (letra) => letra.toUpperCase());
  const avoidAccents = capitalizeFirstLetter.replace(
    /([áéíóúÁÉÍÓÚñÑ])([A-Z])/g,
    (_, tilde, siguienteLetra) => {
      return tilde + siguienteLetra.toLowerCase();
    }
  );

  return avoidAccents
}



