function factorial(n) {
  if (n === 0) return 1;
  return n * factorial(n - 1);
}

function fibonacci(n, current = 0, next = 1) {
  if (n === 0) return current;
  return fibonacci(n - 1, next, current + next);
}

function power(x, n) {
  if (n === 0) return 1;
  if (n < 0) {
    if (x === 0) throw new RangeError("Ноль нельзя возвести в отрицательную степень.");
    return power(1 / x, -n);
  }
  const half = power(x, Math.floor(n / 2));
  const square = half * half;
  return n % 2 === 0 ? square : square * x;
}

function palindrome(characters, left = 0, right = characters.length - 1) {
  if (left >= right) return true;
  if (characters[left] !== characters[right]) return false;
  return palindrome(characters, left + 1, right - 1);
}

function readSortedArray(text) {
  const numbers = text.split(/[\s,]+/).map((part) => {
    const number = Number(part);
    if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(part) ||
        !Number.isFinite(number)) {
      throw new RangeError("Введите массив чисел, разделённых пробелами или запятыми.");
    }
    return number;
  });
  if (numbers.some((number, index) => index > 0 && number < numbers[index - 1])) {
    throw new RangeError("Массив должен быть отсортирован по неубыванию.");
  }
  return numbers;
}

function binarySearch(numbers, target, left = 0, right = numbers.length - 1) {
  if (left > right) return -1;
  const middle = Math.floor((left + right) / 2);
  if (numbers[middle] === target) return middle;
  if (numbers[middle] > target) return binarySearch(numbers, target, left, middle - 1);
  return binarySearch(numbers, target, middle + 1, right);
}

function reverseWords(words) {
  if (words.length === 1) return words[0];
  return reverseWords(words.slice(1)) + " " + words[0];
}

function primeSum(n, terms = []) {
  if (n === 2 || n === 3) {
    terms.push(n);
  } else {
    // Обе части числа от четырёх содержат хотя бы по две единицы.
    const half = Math.floor(n / 2);
    primeSum(half, terms);
    primeSum(n - half, terms);
  }
  return terms;
}

function digitCount(n) {
  if (n < 10) return 1;
  return 1 + digitCount(Math.floor(n / 10));
}

function hanoi(n, from, to, spare, moves) {
  if (n === 0) return;
  hanoi(n - 1, from, spare, to, moves);
  moves.push(`${moves.length + 1}. Диск ${n} — ${from} → ${to}`);
  hanoi(n - 1, spare, to, from, moves);
}

const calculations = {
  1(n) {
    return `${n}! = ${factorial(n)}`;
  },

  2(n) {
    return `F(${n}) = ${fibonacci(n)}`;
  },

  3(x, n) {
    const result = power(x, n);
    if (!Number.isFinite(result)) {
      throw new RangeError("Результат вне допустимого числового диапазона.");
    }
    return `Результат = ${result}`;
  },

  4(text) {
    const characters = text.toLowerCase().normalize("NFC").match(/[\p{L}\p{N}]/gu);
    if (!characters) throw new RangeError("Введите хотя бы одну букву или цифру.");
    return palindrome(characters)
      ? "Строка является палиндромом."
      : "Строка не является палиндромом.";
  },

  5(text, target) {
    const index = binarySearch(readSortedArray(text), target);
    return index === -1 ? "Элемент не найден." : `Индекс элемента = ${index}`;
  },

  6(text) {
    return reverseWords(text.split(/\s+/));
  },

  7(n) {
    return `${n} = ${primeSum(n).join(" + ")}`;
  },

  8(n) {
    return `Количество цифр = ${digitCount(Math.abs(n))}`;
  },

  9(n) {
    const moves = [];
    hanoi(n, "A", "C", "B", moves);
    return [`Ходов = ${moves.length}`, ...moves].join("\n");
  },
};

const taskList = document.querySelector(".lab-tasks");

taskList.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.target;
  const output = form.querySelector("output");

  try {
    const values = Array.from(form.querySelectorAll("input"), (input) => {
      if (input.type === "text") {
        const text = input.value.trim();
        if (!text) throw new RangeError("Заполните текстовое поле.");
        return text;
      }

      const number = input.valueAsNumber;
      if (input.step === "1" && !Number.isSafeInteger(number)) {
        throw new RangeError("Введите целое число в допустимом диапазоне.");
      }
      return number;
    });
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
