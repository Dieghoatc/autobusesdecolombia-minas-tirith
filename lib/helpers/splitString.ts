export function splitString(texto: string) {
    const palabras = texto.split(" ");
    const mitad = Math.floor(palabras.length / 3);

    let indiceDivision = mitad;

    for (let i = mitad; i > 0; i--) {
      if (palabras[i].endsWith(".")) {
        indiceDivision = i + 1;
        break;
      }
    }

    const parrafo1 = palabras.slice(0, indiceDivision).join(" ");
    const parrafo2 = palabras.slice(indiceDivision).join(" ");

    return [parrafo1, parrafo2];
  }