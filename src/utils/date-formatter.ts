/**
 * Конвертирует объект Date в формат YYYY-MM-DD
 * из Fri Dec 15 2023 00:00:00 GMT+0300 (Москва, стандартное время) в 15.12.2023
 */
export function convertDateToYYMMDD(date: Date): string {
  const offset = date.getTimezoneOffset(); // получаем часовой пояс

  date = new Date(date.getTime() - offset * 60 * 1000);

  return date.toISOString().substring(0, 10);
}
