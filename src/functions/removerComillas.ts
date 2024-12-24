export function removerComillas(texto: string): string {
  // Expresión regular para buscar texto entre comillas simples o dobles
  return texto.replace(/['"]/g, "");
}
