/**
 * Делает первую букву строки прописной
 *
 * @param {string} string
 * @returns {string}
 */
export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
