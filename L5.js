
function readArray(text) {
  if (!text.trim()) throw new Error("Введите числа.");
  const numbers = text.trim().split(/\s+/).map(Number);
  if (!numbers.every(Number.isFinite)) throw new Error("Введите числа через пробел.");
  return numbers;
}

const calculations = {
  1(n) {
    const a = [];
    for (let i = 0; i < n; i++) a.push(2 * i + 1);
    return a.join(", ");
  },
  2(n, first, d) {
    const a = [];
    let value = first;
    for (let i = 0; i < n; i++) {
      a.push(value);
      value *= d;
    }
    return a.join(", ");
  },
  3(n, first, second) {
    const a = [first, second];
    let sum = first + second;
    for (let i = 2; i < n; i++) {
      a.push(sum);
      sum += a[i];
    }
    return a.join(", ");
  },
  4(text) {
    const a = readArray(text);
    const result = [];
    for (let left = 0, right = a.length - 1; left <= right; left++, right--) {
      result.push(a[left]);
      if (left !== right) result.push(a[right]);
    }
    return result.join(", ");
  },
  5(text) {
    const a = readArray(text);
    const result = [];
    for (let i = 0; i < a.length; i += 2) result.push(a[i]);
    for (let i = a.length - 1; i >= 0; i--) {
      if (i % 2 === 1) result.push(a[i]);
    }
    return result.join(", ");
  },
  6(text, k, l) {
    const a = readArray(text);
    if (k > l || l > a.length) throw new Error("Требуется 1 ≤ K ≤ L ≤ N.");
    let sum = 0;
    for (let i = k - 1; i < l; i++) sum += a[i];
    return "Среднее = " + sum / (l - k + 1);
  },
  7(text) {
    const a = readArray(text);
    if (a.length < 2 || !a.every(Number.isInteger) || new Set(a).size !== a.length) {
      throw new Error("Введите хотя бы два различных целых числа.");
    }
    const d = a[1] - a[0];
    for (let i = 2; i < a.length; i++) {
      if (a[i] - a[i - 1] !== d) return "0";
    }
    return "Разность = " + d;
  },
  8(text) {
    const a = readArray(text);
    if (a.length < 2) throw new Error("Введите хотя бы два элемента.");
    let min = a[1];
    for (let i = 3; i < a.length; i += 2) min = Math.min(min, a[i]);
    return "Минимум = " + min;
  },
  9(text) {
    const a = readArray(text);
    for (let i = a.length - 1; i >= 0; i--) {
      if (a.length > 1 && (i === 0 || a[i] > a[i - 1]) &&
          (i === a.length - 1 || a[i] > a[i + 1])) return "Номер = " + (i + 1);
    }
    return "Локального максимума нет.";
  },
  10(text) {
    const a = readArray(text);
    if (!a.every(Number.isInteger)) throw new Error("Введите целые числа.");
    const pairs = [];
    for (let i = 0; i < a.length; i++) {
      for (let j = i + 1; j < a.length; j++) {
        if (a[i] === a[j]) pairs.push([i + 1, j + 1]);
      }
    }
    if (pairs.length !== 1) throw new Error("Массив должен содержать ровно одну пару одинаковых элементов.");
    return "Номера = " + pairs[0].join(", ");
  },
};

const taskList = document.querySelector(".lab-tasks");
taskList.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.target;
  const output = form.querySelector("output");
  try {
    const values = Array.from(form.querySelectorAll("input, textarea"), (input) =>
      input.type === "number" ? input.valueAsNumber : input.value.trim());
    output.value = calculations[form.dataset.task](...values);
    output.classList.remove("lab-error");
  } catch (error) {
    output.value = error.message;
    output.classList.add("lab-error");
  }
});
taskList.addEventListener("input", (event) => {
  const output = event.target.form.querySelector("output");
  output.value = "";
  output.classList.remove("lab-error");
});
