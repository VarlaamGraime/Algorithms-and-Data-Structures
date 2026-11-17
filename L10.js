
function readArray(text) {
  if (!text.trim()) throw new Error("Введите числа.");
  const numbers = text.trim().split(/\s+/).map(Number);
  if (!numbers.every(Number.isFinite)) throw new Error("Введите числа через пробел.");
  return numbers;
}


document.querySelector("#algorithm").addEventListener("submit", (event) => {
  event.preventDefault();
  const result = document.querySelector("#result");
  const steps = document.querySelector("#steps");
  steps.replaceChildren();
  try {
    const inputs = event.target.querySelectorAll("input");
    const numbers = readArray(inputs[0].value);
    const target = inputs[1].valueAsNumber;
    if (numbers.some((value, i) => i > 0 && value < numbers[i - 1])) {
      throw new Error("Введите отсортированный по возрастанию массив.");
    }
    let left = 0, right = numbers.length - 1, found = -1;
    while (left <= right) {
      const middle = Math.floor((left + right) / 2);
      const line = document.createElement("p");
      line.textContent = "Диапазон [" + left + ", " + right + "], середина " + middle +
        ", значение " + numbers[middle];
      steps.append(line);
      if (numbers[middle] === target) { found = middle; break; }
      if (numbers[middle] < target) left = middle + 1;
      else right = middle - 1;
    }
    result.textContent = found === -1 ? "Элемент не найден." : "Индекс = " + found;
  } catch (error) {
    result.textContent = error.message;
  }
});
