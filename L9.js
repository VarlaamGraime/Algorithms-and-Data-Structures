
function readArray(text) {
  if (!text.trim()) throw new Error("Введите числа.");
  const numbers = text.trim().split(/\s+/).map(Number);
  if (!numbers.every(Number.isFinite)) throw new Error("Введите числа через пробел.");
  return numbers;
}


function showStep(container, numbers, message, active = []) {
  const row = document.createElement("div");
  row.className = "sort-step";
  const caption = document.createElement("p");
  caption.textContent = message;
  row.append(caption);
  for (let i = 0; i < numbers.length; i++) {
    const cell = document.createElement("span");
    cell.className = active.includes(i) ? "array-cell active" : "array-cell";
    cell.textContent = numbers[i];
    row.append(cell);
  }
  container.append(row);
}

function sort(numbers, steps) {
  for (let i = 0; i < numbers.length - 1; i++) {
    let min = i;
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[j] < numbers[min]) min = j;
      showStep(steps, numbers, "Ищем минимум от позиции " + (i + 1), [min, j]);
    }
    [numbers[i], numbers[min]] = [numbers[min], numbers[i]];
    showStep(steps, numbers, "Минимум установлен на позицию " + (i + 1), [i, min]);
  }
}

document.querySelector("#algorithm").addEventListener("submit", (event) => {
  event.preventDefault();
  const result = document.querySelector("#result");
  const steps = document.querySelector("#steps");
  steps.replaceChildren();
  try {
    const numbers = readArray(event.target.querySelector("input").value);
    showStep(steps, numbers, "Исходный массив");
    sort(numbers, steps);
    result.textContent = "Результат — " + numbers.join(", ");
  } catch (error) {
    result.textContent = error.message;
  }
});
