export function dataURLToBlob(dataURL: string): Blob | undefined {
    if (!dataURL) return undefined;
    const arr = dataURL.split(",");
    const mimeMatch = arr[0].match(/:(.*?);/);
    if (!mimeMatch) return undefined;
    const mime = mimeMatch[1]; // Now TypeScript knows this is safe
    const bstr = atob(arr[1]); // Decodifica Base64
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
  
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
  
    return new Blob([u8arr], { type: mime });
  }