const unitsAndTeens = [
  "", "один", "два", "три", "четыре", "пять", "шесть", "семь", "восемь", "девять",
  "десять", "одиннадцать", "двенадцать", "тринадцать", "четырнадцать",
  "пятнадцать", "шестнадцать", "семнадцать", "восемнадцать", "девятнадцать",
];

const tens = [
  "", "", "двадцать", "тридцать", "сорок", "пятьдесят", "шестьдесят",
  "семьдесят", "восемьдесят", "девяносто",
];

const hundreds = [
  "", "сто", "двести", "триста", "четыреста", "пятьсот", "шестьсот",
  "семьсот", "восемьсот", "девятьсот",
];

function numberInWords(number) {
  const remainder = number % 100;
  const start = hundreds[Math.floor(number / 100)];
  const end = remainder < 20
    ? [unitsAndTeens[remainder]]
    : [tens[Math.floor(remainder / 10)], unitsAndTeens[remainder % 10]];
  return [start, ...end].filter(Boolean).join(" ");
}

const dayNames = [
  "", "первое", "второе", "третье", "четвёртое", "пятое", "шестое", "седьмое",
  "восьмое", "девятое", "десятое", "одиннадцатое", "двенадцатое", "тринадцатое",
  "четырнадцатое", "пятнадцатое", "шестнадцатое", "семнадцатое", "восемнадцатое",
  "девятнадцатое", "двадцатое",
];

const months = [
  "января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сентября", "октября", "ноября", "декабря",
];
const daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const animals = [
  "крысы", "коровы", "тигра", "зайца", "дракона", "змеи",
  "лошади", "овцы", "обезьяны", "курицы", "собаки", "свиньи",
];
const colorStems = ["зелён", "красн", "жёлт", "бел", "чёрн"];

function parity(number) {
  return number % 2 === 0 ? "чётное" : "нечётное";
}

const calculations = {
  1(a, b) {
    const value = a === b ? 0 : Math.max(a, b);
    return { A: value, B: value };
  },

  2(a, b, c) {
    const [first, second] = [a, b, c].sort((left, right) => right - left);
    return { Сумма: first + second };
  },

  3(ax, ay, bx, by, cx, cy) {
    const ab = Math.hypot(bx - ax, by - ay);
    const ac = Math.hypot(cx - ax, cy - ay);
    const pointB = `B (${bx}, ${by})`;
    const pointC = `C (${cx}, ${cy})`;

    if (ab === ac) {
      return { "Равноудалённые точки": `${pointB} и ${pointC}`, Расстояние: ab };
    }
    return ab < ac
      ? { Точка: pointB, Расстояние: ab }
      : { Точка: pointC, Расстояние: ac };
  },

  4(x, y) {
    if (x === 0 || y === 0) {
      throw new RangeError("Точка на координатной оси не принадлежит четверти.");
    }
    if (x > 0) return { Четверть: y > 0 ? 1 : 4 };
    return { Четверть: y > 0 ? 2 : 3 };
  },

  5(number) {
    if (number === 0) return "нулевое число";
    const sign = number > 0 ? "положительное" : "отрицательное";
    return `${sign} ${parity(number)} число`;
  },

  6(number) {
    const digitNames = ["однозначное", "двузначное", "трёхзначное"];
    const digits = String(number).length;
    return `${parity(number)} ${digitNames[digits - 1]} число`;
  },

  7(day, month) {
    if (day > daysInMonth[month - 1]) {
      throw new RangeError("В выбранном месяце нет такого дня.");
    }
    let dayName = dayNames[day];
    if (day === 30) dayName = "тридцатое";
    if (day > 20 && day % 10 !== 0) {
      dayName = `${tens[Math.floor(day / 10)]} ${dayNames[day % 10]}`;
    }
    return `${dayName} ${months[month - 1]}`;
  },

  8(count) {
    const units = count % 10;
    if (count >= 20 && units === 1) {
      return `${numberInWords(count - 1)} одно учебное задание`;
    }
    const noun = count >= 20 && units >= 2 && units <= 4
      ? "учебных задания"
      : "учебных заданий";
    return `${numberInWords(count)} ${noun}`;
  },

  9: numberInWords,

  10(year) {
    const position = (((year - 1984) % 60) + 60) % 60;
    const animalIndex = position % 12;
    const color = colorStems[Math.floor(position / 12)];
    const ending = [2, 3, 4].includes(animalIndex) ? "ого" : "ой";
    return `год ${color}${ending} ${animals[animalIndex]}`;
  },
};

function formatValue(value) {
  if (typeof value === "number" && !Number.isFinite(value)) {
    throw new RangeError("Результат вне допустимого числового диапазона.");
  }
  return String(value);
}

const taskList = document.querySelector(".lab-tasks");

taskList.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.target;
  const output = form.querySelector("output");

  try {
    const values = Array.from(form.querySelectorAll("input"), (input) => {
      const value = input.valueAsNumber;
      if (input.step === "1" && !Number.isSafeInteger(value)) {
        throw new RangeError("Введите целое число в допустимом диапазоне.");
      }
      return value;
    });
    const result = calculations[form.dataset.task](...values);
    output.value = typeof result === "string"
      ? result
      : Object.entries(result)
        .map(([label, value]) => `${label} = ${formatValue(value)}`)
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
