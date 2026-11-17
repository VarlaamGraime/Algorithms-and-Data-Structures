const calculations = {
  1(price) {
    const costs = [];
    for (let i = 1; i <= 10; i++) {
      const weight = i / 10;
      const cost = price * weight;
      costs.push(`${weight} кг = ${cost.toFixed(2)} руб.`);
    }
    return costs.join(" · ");
  },

  2(n) {
    let product = 1;
    for (let i = 1; i <= n; i++) {
      product *= 1 + i / 10;
    }
    return `Произведение = ${product}`;
  },

  3(n) {
    const sums = [];
    let sum = 0;
    for (let i = 1; i <= n; i++) {
      sum += 2 * i - 1;
      sums.push(sum);
    }
    return `Промежуточные суммы — ${sums.join(", ")}. N² = ${sum}`;
  },

  4(a, n) {
    let term = 1;
    let sum = 1;
    for (let i = 1; i <= n; i++) {
      term *= a;
      sum += term;
    }
    return `Сумма = ${sum}`;
  },

  5(a, n) {
    let term = 1;
    let sum = 1;
    for (let i = 1; i <= n; i++) {
      term *= -a;
      sum += term;
    }
    return `Сумма = ${sum}`;
  },

  6(a, b) {
    if (a >= b) throw new RangeError("Число A должно быть меньше B.");

    const numbers = [];
    for (let number = a; number <= b; number++) {
      for (let i = 0; i < number; i++) {
        numbers.push(number);
      }
    }
    return numbers.join(", ");
  },

  7(a, b) {
    if (b <= 0 || a <= b) {
      throw new RangeError("Длины должны удовлетворять условию A > B > 0.");
    }
    let remainder = a;
    while (remainder >= b) {
      // Округление уменьшает погрешность вычитания десятичных дробей.
      remainder = Number((remainder - b).toPrecision(15));
    }
    return `Остаток = ${remainder}`;
  },

  8(n) {
    let k = 0;
    let sum = 0;
    while (sum < n) {
      k++;
      sum += k;
    }
    return `K = ${k} · Сумма = ${sum}`;
  },

  9(p) {
    if (p <= 0 || p >= 25) {
      throw new RangeError("Процент должен быть больше 0 и меньше 25.");
    }
    let months = 0;
    let balance = 1000;
    while (balance <= 1100) {
      balance += balance * p / 100;
      months++;
    }
    return `Месяцев K = ${months} · Сумма S = ${balance.toFixed(2)} руб.`;
  },

  10(a, b) {
    while (b !== 0) {
      const remainder = a % b;
      a = b;
      b = remainder;
    }
    return `НОД = ${a}`;
  },
};

const taskList = document.querySelector(".lab-tasks");

taskList.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.target;
  const output = form.querySelector("output");
  const values = Array.from(form.querySelectorAll("input"), (input) => input.valueAsNumber);

  try {
    output.value = calculations[form.dataset.task](...values);
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
