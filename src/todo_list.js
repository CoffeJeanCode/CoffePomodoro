import Sortable from "sortablejs";

const addTasks = document.querySelector(".add_task");
const tasksList = document.querySelector(".to_do_list");
const items = JSON.parse(localStorage.getItem("items")) || [];

new Sortable(tasksList, {
  group: items,
  animation: 150,
  draggable: ".item",
  ghostClass: "ghost",
});

function addItem(e) {
  e.preventDefault();

  const text = this.querySelector("[name=task]").value;

  const item = {
    text: text,
    done: false,
  };

  items.push(item);

  populateList(items, tasksList);

  localStorage.setItem("items", JSON.stringify(items));

  this.reset();
}

function populateList(tasks = [], itemTask) {
  const teplateTask = tasks
    .map((task, i) => {
      return `
    <div class="item custom-control custom-checkbox list-group-item aling-items-center d-flex justify-content-between p-3">
      <input 
        type="checkbox" 
        class="custom-control-input checkbox_item" 
        data-index=${i} 
        id="item${i}" 
        ${task.done ? "checked" : ""}>

      <label class="custom-control-label"  for="item${i}">${task.text}</label>
    </div>
`;
    })
    .join("");

  itemTask.innerHTML = teplateTask;
}

export function toggleDone(e) {
  if (!e.target.matches("input")) return; // Skip this and unless inputs

  const el = e.target;
  const index = el.dataset.index;

  items[index].done = !items[index].done;
  items.pop(items[index]);
  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, tasksList);
}

addTasks.addEventListener("submit", addItem);
tasksList.addEventListener("click", toggleDone);

populateList(items, tasksList);
