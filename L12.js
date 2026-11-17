
const queue = [];
const result = document.querySelector("#result");
function showQueue() {
  document.querySelector("#queue-view").textContent = queue.length
    ? "Начало → " + queue.join(" → ") + " ← Конец"
    : "Очередь пуста.";
}
document.querySelector("#queue-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const input = event.target.querySelector("input");
  const value = input.value.trim();
  if (!value) { result.textContent = "Введите элемент."; return; }
  queue.push(value);
  result.textContent = "Добавлен элемент — " + value;
  input.value = "";
  showQueue();
});
document.querySelector("#dequeue").addEventListener("click", () => {
  result.textContent = queue.length ? "Извлечён элемент — " + queue.shift() : "Очередь пуста.";
  showQueue();
});
document.querySelector("#peek").addEventListener("click", () => {
  result.textContent = queue.length ? "Первый элемент — " + queue[0] : "Очередь пуста.";
});
document.querySelector("#clear").addEventListener("click", () => {
  queue.length = 0;
  result.textContent = "Очередь очищена.";
  showQueue();
});
