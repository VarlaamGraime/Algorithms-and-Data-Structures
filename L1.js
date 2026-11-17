function rectangleMetrics(a, b) {
  if (a <= 0 || b <= 0) {
    throw new RangeError("Длины сторон прямоугольника должны быть больше нуля.");
  }
  return { "Площадь S": a * b, "Периметр P": 2 * (a + b) };
}

function arithmeticResults(a, b) {
  return {
    Сумма: a + b,
    Разность: a - b,
    Произведение: a * b,
    Частное: a / b,
  };
}

function requireNonzero(a, b) {
  if (a === 0 || b === 0) {
    throw new RangeError("Введите два ненулевых числа.");
  }
}

const calculations = {
  1: rectangleMetrics,

  2(d) {
    if (d <= 0) {
      throw new RangeError("Диаметр должен быть больше нуля.");
    }
    return { "Длина L": 3.14 * d };
  },

  3(a, b) {
    const sum = a + b;
    return { Среднее: Number.isFinite(sum) ? sum / 2 : a / 2 + b / 2 };
  },

  4(a, b) {
    requireNonzero(a, b);
    return arithmeticResults(a ** 2, b ** 2);
  },

  5(a, b) {
    requireNonzero(a, b);
    return arithmeticResults(Math.abs(a), Math.abs(b));
  },

  6(x1, y1, x2, y2) {
    return { Расстояние: Math.hypot(x2 - x1, y2 - y1) };
  },

  7(a, b, c) {
    const ac = Math.abs(a - c);
    const bc = Math.abs(b - c);
    return { AC: ac, BC: bc, Сумма: ac + bc };
  },

  8(a, b, c) {
    if (c <= Math.min(a, b) || c >= Math.max(a, b)) {
      throw new RangeError("Координата C должна лежать строго между A и B.");
    }
    return { "AC · BC": Math.abs(a - c) * Math.abs(b - c) };
  },

  9(x1, y1, x2, y2) {
    return rectangleMetrics(Math.abs(x2 - x1), Math.abs(y2 - y1));
  },

  10(x1, y1, x2, y2, x3, y3) {
    const abX = x2 - x1;
    const abY = y2 - y1;
    const acX = x3 - x1;
    const acY = y3 - y1;
    const area = Math.abs(abX * acY - abY * acX) / 2;

    if (area === 0) {
      throw new RangeError("Три вершины должны образовывать треугольник");
    }

    const perimeter = Math.hypot(abX, abY)
      + Math.hypot(acX, acY)
      + Math.hypot(x3 - x2, y3 - y2);
    return { "Периметр P": perimeter, "Площадь S": area };
  },

  11(x) {
    return { y: 3 * x ** 6 - 6 * x ** 2 - 7 };
  },

  12(x) {
    const shifted = x - 3;
    return { y: 4 * shifted ** 6 - 7 * shifted ** 3 + 2 };
  },
};

function formatNumber(value) {
  if (!Number.isFinite(value)) {
    throw new RangeError("Результат вне допустимого числового диапазона.");
  }

  return String(value);
}

const taskList = document.querySelector(".lab-tasks");

taskList.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.target;
  const output = form.querySelector("output");
  const values = Array.from(form.querySelectorAll("input"), (input) => input.valueAsNumber);

  try {
    const result = calculations[form.dataset.task](...values);
    output.value = Object.entries(result)
      .map(([label, value]) => `${label} = ${formatNumber(value)}`)
      .join(" · ");
    output.classList.remove("lab-error");
  } catch (error) {
    if (!(error instanceof RangeError)) throw error;
    output.value = error.message;
    output.classList.add("lab-error");
  }
});

taskList.addEventListener("input", (event) => {
  const output = event.target.form.querySelector("output");
  output.value = "";
  output.classList.remove("lab-error");
});
