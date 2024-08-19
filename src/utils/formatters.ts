/**
 * Делает первую букву строки прописной
 *
 * @param {string} string
 * @returns {string}
 */
export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Склонение слова при использовании с числами
 */
export const pluralize = (count: number, noun: string, suffix = 's') =>
  `${count} ${noun}${count !== 1 ? suffix : ''}`;
