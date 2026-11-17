
function preorder(tree, i, result) {
  if (i >= tree.length || tree[i] === null) return;
  result.push(tree[i]);
  preorder(tree, 2 * i + 1, result);
  preorder(tree, 2 * i + 2, result);
}
function inorder(tree, i, result) {
  if (i >= tree.length || tree[i] === null) return;
  inorder(tree, 2 * i + 1, result);
  result.push(tree[i]);
  inorder(tree, 2 * i + 2, result);
}
function postorder(tree, i, result) {
  if (i >= tree.length || tree[i] === null) return;
  postorder(tree, 2 * i + 1, result);
  postorder(tree, 2 * i + 2, result);
  result.push(tree[i]);
}
function drawTree(tree, i, indent, label, lines) {
  if (i >= tree.length || tree[i] === null) return;
  lines.push(indent + label + tree[i]);
  drawTree(tree, 2 * i + 1, indent + "    ", "Л: ", lines);
  drawTree(tree, 2 * i + 2, indent + "    ", "П: ", lines);
}
document.querySelector("#tree-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const result = document.querySelector("#result");
  const view = document.querySelector("#tree-view");
  view.textContent = "";
  try {
    const text = event.target.querySelector("input").value.trim();
    if (!text) throw new Error("Введите дерево.");
    const tree = text.split(/\s+/).map(value => {
      if (value.toLowerCase() === "null") return null;
      const number = Number(value);
      if (!Number.isFinite(number)) throw new Error("Используйте числа и null.");
      return number;
    });
    for (let i = 1; i < tree.length; i++) {
      if (tree[i] !== null && tree[Math.floor((i - 1) / 2)] === null) {
        throw new Error("У отсутствующего узла не может быть детей.");
      }
    }
    const direct = [], symmetric = [], reverse = [], lines = [];
    preorder(tree, 0, direct);
    inorder(tree, 0, symmetric);
    postorder(tree, 0, reverse);
    drawTree(tree, 0, "", "Корень: ", lines);
    view.textContent = lines.join("\n");
    result.textContent = tree[0] === null ? "Дерево пусто." :
      "Прямой: " + direct.join(", ") + "\nСимметричный: " + symmetric.join(", ") +
      "\nОбратный: " + reverse.join(", ");
  } catch (error) {
    result.textContent = error.message;
  }
});
