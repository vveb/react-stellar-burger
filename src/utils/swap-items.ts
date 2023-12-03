import { Ingredient } from "../services/types";

const swapItems = (arr: Ingredient[], from: number, to: number): Ingredient[] => {
  if (from === to) {
    return arr;
  };
  if (to === arr.length - 1) {
    return [...arr.slice(0, from), ...arr.slice(from + 1, to + 1), arr[from]];
  }
  if (to - from === 1) {
    return [...arr.slice(0, from), arr[to], arr[from], ...arr.slice(to + 1)];
  }
  if (from > to) {
    return [...arr.slice(0, to), arr[from], ...arr.slice(to, from), ...arr.slice(from + 1)];
  }
  if (from < to) {
    return [...arr.slice(0, from), ...arr.slice(from + 1, to + 1), arr[from], ...arr.slice(to + 1)];
  }
  throw new Error('Невозможно изменить порядок ингредиентов (неверные индексы)');
};

export default swapItems;