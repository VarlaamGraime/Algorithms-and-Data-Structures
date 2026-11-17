
function readArray(text) {
  if (!text.trim()) throw new Error("Введите числа.");
  const numbers = text.trim().split(/\s+/).map(Number);
  if (!numbers.every(Number.isFinite)) throw new Error("Введите числа через пробел.");
  return numbers;
}

function readMatrix(text) {
  const matrix = text.split(/\r?\n/).map(readArray);
  if (!matrix.every(row => row.length === matrix[0].length)) {
    throw new Error("В строках должно быть одинаковое число элементов.");
  }
  return matrix;
}
function showMatrix(matrix) {
  return matrix.map(row => row.join(" ")).join("\n");
}
const calculations = {
  1(text) {
    const a = readMatrix(text);
    if (a.length !== a[0].length || a.length % 2 === 0) throw new Error("Нужна квадратная матрица нечётного порядка.");
    const result = [];
    let top = 0, bottom = a.length - 1, left = 0, right = bottom;
    while (left <= right && top <= bottom) {
      for (let i = top; i <= bottom; i++) result.push(a[i][left]);
      left++;
      for (let j = left; j <= right; j++) result.push(a[bottom][j]);
      bottom--;
      if (left <= right) {
        for (let i = bottom; i >= top; i--) result.push(a[i][right]);
        right--;
      }
      if (top <= bottom) {
        for (let j = right; j >= left; j--) result.push(a[top][j]);
        top++;
      }
    }
    return result.join(", ");
  },
  2(text, k) {
    const a = readMatrix(text);
    if (k > a.length) throw new Error("Номер строки превышает M.");
    let sum = 0, product = 1;
    for (const value of a[k - 1]) { sum += value; product *= value; }
    return "Сумма = " + sum + " · Произведение = " + product;
  },
  3(text) {
    const a = readMatrix(text);
    let min = Infinity, column = 0;
    for (let j = 0; j < a[0].length; j++) {
      let product = 1;
      for (let i = 0; i < a.length; i++) product *= a[i][j];
      if (product < min) { min = product; column = j + 1; }
    }
    return "Столбец = " + column + " · Произведение = " + min;
  },
  4(text) {
    const a = readMatrix(text), result = [];
    for (let j = 0; j < a[0].length; j++) {
      let sum = 0, count = 0;
      for (let i = 0; i < a.length; i++) sum += a[i][j];
      const average = sum / a.length;
      for (let i = 0; i < a.length; i++) if (a[i][j] > average) count++;
      result.push("Столбец " + (j + 1) + " — " + count);
    }
    return result.join("\n");
  },
  5(text) {
    const a = readMatrix(text);
    if (!a.every(row => row.every(Number.isInteger))) throw new Error("Введите целые числа.");
    for (let j = 0; j < a[0].length; j++) {
      if (a.every(row => row[j] % 2 !== 0)) return "Столбец = " + (j + 1);
    }
    return "0";
  },
  6(text) {
    const a = readMatrix(text);
    for (const row of a) {
      let min = 0, max = 0;
      for (let j = 1; j < row.length; j++) {
        if (row[j] < row[min]) min = j;
        if (row[j] > row[max]) max = j;
      }
      [row[min], row[max]] = [row[max], row[min]];
    }
    return showMatrix(a);
  },
  7(text) {
    const a = readMatrix(text);
    let min = a[0][0], max = min, minColumn = 0, maxColumn = 0;
    for (const row of a) {
      for (let j = 0; j < row.length; j++) {
        if (row[j] < min) { min = row[j]; minColumn = j; }
        if (row[j] > max) { max = row[j]; maxColumn = j; }
      }
    }
    for (const row of a) [row[minColumn], row[maxColumn]] = [row[maxColumn], row[minColumn]];
    return showMatrix(a);
  },
  8(text) {
    const a = readMatrix(text), m = a.length, n = a[0].length;
    if (m % 2 || n % 2) throw new Error("Число строк и столбцов должно быть чётным.");
    for (let i = 0; i < m / 2; i++) {
      for (let j = 0; j < n / 2; j++) {
        [a[i][j], a[i + m / 2][j + n / 2]] = [a[i + m / 2][j + n / 2], a[i][j]];
      }
    }
    return showMatrix(a);
  },
  9(text) {
    const a = readMatrix(text);
    a.sort((first, second) => first[0] - second[0]);
    return showMatrix(a);
  },
  10(text) {
    const a = readMatrix(text), m = a.length, sums = [];
    if (m !== a[0].length) throw new Error("Нужна квадратная матрица.");
    for (let offset = m - 1; offset >= 1 - m; offset--) {
      let sum = 0;
      for (let i = 0; i < m; i++) {
        const j = i + offset;
        if (j >= 0 && j < m) sum += a[i][j];
      }
      sums.push("Диагональ " + (sums.length + 1) + " — " + sum);
    }
    return sums.join("\n");
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
