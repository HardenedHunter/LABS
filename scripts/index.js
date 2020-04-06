'use strict';

const tryParse = (str, min, max = Number.MAX_SAFE_INTEGER) => {
  let result = parseInt(str);
  if (!result) return false;
  return result >= min && result <= max;
};

const validateDate = (date) => {
  date = date.trim();
  if (date === '') return true;

  const values = date.split('.');
  if (values.length != 3) return false;

  const [day, month, year] = values;
  return tryParse(day, 1, 31) && tryParse(month, 1, 12) && tryParse(year, 1970);
};

const inputDate = (message) => {
  let input = prompt(message);

  while (input == null || !validateDate(input)) {
    alert('Дата введена некорректно');
    input = prompt(message);
  }

  if (input === '') return new Date();
  const [day, month, year] = input.split('.');
  return new Date(year, +month - 1, day);
};

const inputFormat = (message) => {
  const formats = ['годы', 'месяцы', 'недели', 'дни'];
  let format = prompt(message);

  while (!format || formats.indexOf(format.toLowerCase()) === -1) {
    alert('Формат введён некорректно');
    format = prompt(message);
  }

  return format;
};

const solution = () => {
  const first = inputDate('Введите первую дату в формате DD.MM.YYYY:');
  const second = inputDate('Введите вторую дату в формате DD.MM.YYYY:');

  const totalDays = Math.floor(Math.abs(second - first) / (1000 * 3600 * 24));
  let format = inputFormat('Введите формат (годы, месяцы, недели, дни):');

  switch (format) {
    case 'дни':
      alert(`Прошло ${totalDays} дней`);
      break;

    case 'недели':
      alert(`Прошло ${Math.floor(totalDays / 7)} недель ${totalDays % 7} дней`);
      break;

    case 'месяцы':
      alert(`Прошло\
        ${Math.floor(totalDays / 30)} месяцев\
        ${Math.floor((totalDays % 30) / 7)} недель\
        ${(totalDays % 30) % 7} дней`);
      break;

    case 'годы':
      alert(`Прошло\
        ${Math.floor(totalDays / 365)} лет\
        ${Math.floor((totalDays % 365) / 30)} месяцев\
        ${Math.floor(((totalDays % 365) % 30) / 7)} недель\
        ${((totalDays % 365) % 30) % 7} дней`);
      break;
  }
};

solution();
