let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const counter = document.getElementById("counter");

let currentFilter = "all";

/* SAVE */
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* COUNTER */
function updateCounter() {
  const total = tasks.length;
  const done = tasks.filter(t => t.done).length;

  counter.textContent = `${done} / ${total} tasks completed`;
}

/* RENDER */
function renderTasks() {
  taskList.innerHTML = "";

  const filtered = tasks.filter(task => {
    if (currentFilter === "done") return task.done;
    if (currentFilter === "pending") return !task.done;
    return true;
  });

  filtered.forEach((task, index) => {
    const li = document.createElement("li");

    li.className = "flex justify-between items-center bg-gray-800 px-4 py-2 rounded fade-in";

    li.innerHTML = `
      <span onclick="editTask(${index})"
        class="cursor-pointer ${task.done ? "line-through text-gray-400" : ""}">
        ${task.text}
      </span>

      <div class="flex gap-2">
        <button onclick="toggleTask(${index})">✔</button>
        <button onclick="deleteTask(${index})">❌</button>
      </div>
    `;

    taskList.appendChild(li);
  });

  updateCounter();
}

/* ADD */
document.getElementById("addBtn").onclick = () => {
  const text = taskInput.value.trim();
  if (!text) return;

  tasks.push({ text, done: false });

  taskInput.value = "";
  saveTasks();
  renderTasks();
};

/* DELETE */
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

/* TOGGLE */
function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks();
}

/* EDIT */
function editTask(index) {
  const newText = prompt("Edit task:", tasks[index].text);
  if (newText) {
    tasks[index].text = newText;
    saveTasks();
    renderTasks();
  }
}

/* FILTER */
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.onclick = () => {
    currentFilter = btn.dataset.filter;
    renderTasks();
  };
});

/* ENTER KEY */
taskInput.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    document.getElementById("addBtn").click();
  }
});

/* INIT */
renderTasks();