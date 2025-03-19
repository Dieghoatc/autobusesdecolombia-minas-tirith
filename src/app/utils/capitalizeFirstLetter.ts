export function capitalizeFirstLetter(str: string) {

  function defaultResilt(str: string) {
    // Primero, capitalizamos la primera letra de cada palabra
    const resultado = str.replace(/\b\w/g, (letra) => letra.toUpperCase());
    
     // Ahora, evitamos que haya mayúsculas después de una letra con tilde
    return resultado.replace(
      /([áéíóúÁÉÍÓÚñÑ.])([A-Z])/g,
      (_, tilde, siguienteLetra) => {
        return tilde + siguienteLetra.toLowerCase();
      }
    );
   }

  switch (str) {
    case "bogotá dc":
      return "Bogotá DC";
    default:
      return defaultResilt(str);
  }
}
