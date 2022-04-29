import {
  getTasks, updateTask, deleteTask, loadTasks,
  addTask, checkStatus, getLastId, setLastId, clearAllBtn,
} from './methods.js';

// edit item
const uiClickLabel = (e) => {
  const labelElement = e.target.parentNode;
  labelElement.classList.add('editing', 'erasing');
  const taElement = e.target.nextElementSibling;
  taElement.focus();
};

const uiBlurTextArea = (e) => {
  const lblElement = e.target.previousElementSibling;
  lblElement.innerHTML = e.target.value;
  const taElement = e.target.parentNode;
  const { taskid } = e.target.parentNode.dataset;
  setTimeout(() => {
    taElement.classList.remove('editing', 'erasing');
  }, 2000);
  updateTask(taskid, e.target.value);
};

// remove item
const uiRemoveTask = (e) => {
  const { taskid } = e.target.parentNode.dataset;
  deleteTask(taskid);

  const liElement = e.target.parentNode;
  liElement.remove();

  const lis = document.querySelectorAll('.list-items');
  const tasks = getTasks();
  lis.forEach((e) => {
    e.dataset.taskindex = tasks.find((ee) => ee.id === Number(e.dataset.taskid)).index;
  });
};

// status
const uiCheckStatus = (e) => {
  const { taskid } = e.target.parentNode.dataset;
  checkStatus(taskid);

  const liElement = e.target.parentNode;
  liElement.classList.toggle('completed', !liElement.classList.contains('completed'));
};

// Clear completed
const uiClearCompleted = () => {
  const ulElement = document.querySelector('.check-list');
  const liElements = ulElement.childNodes;
  let i = 0;
  while (i < liElements.length) {
    const liElement = liElements[i];
    const cbElement = liElement.querySelector('.check-box');
    if (cbElement.checked) {
      liElement.remove();
    } else {
      i += 1;
      liElement.dataset.taskindex = i;
    }
  }
  clearAllBtn();
};

// create item
const uiCreateTask = (task) => {
  const tasks = getTasks();
  tasks.sort((a, b) => a.index - b.index);
  const ulList = document.querySelector('.check-list');
  const insideUl = `
  <input id="ck-${task.id}" class="check-box" type="checkbox" name="checkBox">
  <label class="lb-task" id="lb-${task.id}" for="ta-${task.id}">${task.description}</label>
  <textarea id="ta-${task.id}" class="ta-task" name="edit-task">${task.description}</textarea>
  <span class="dots material-symbols-outlined">more_vert</span>
  <span class="trash material-symbols-outlined">delete</span>
  `;

  const liToTasks = document.createElement('li');
  liToTasks.setAttribute('class', 'list-items');
  if (task.isCompleted) {
    liToTasks.setAttribute('class', 'completed');
  }
  liToTasks.setAttribute('data-taskid', `${task.id}`);
  liToTasks.setAttribute('data-taskindex', `${task.index}`);
  liToTasks.innerHTML = insideUl;
  liToTasks.querySelector('.lb-task').onclick = uiClickLabel;
  liToTasks.querySelector('.ta-task').onblur = uiBlurTextArea;
  liToTasks.querySelector('.trash').onclick = uiRemoveTask;
  const cbElement = liToTasks.querySelector('.check-box');
  cbElement.checked = task.isCompleted;
  cbElement.onclick = uiCheckStatus;
  ulList.appendChild(liToTasks);
};

// add item
const inputElement = document.querySelector('#description');
const todoForm = document.querySelector('.add-items');

const uiAdd = (e) => {
  e.preventDefault();
  const inputValue = inputElement.value;

  if (inputValue !== '') {
    const tasks = getTasks();
    const indexId = tasks.length + 1;
    const id = getLastId() + 1;
    setLastId(id);
    const task = {
      description: inputValue,
      isCompleted: false,
      index: indexId,
      id,
    };
    addTask(task);
    uiCreateTask(task);
    todoForm.reset();
  }
  inputElement.focus();
};

function displayTasks() {
  const tasks = getTasks();
  tasks.forEach((task) => uiCreateTask(task));
}

export default function setup() {
  loadTasks();
  displayTasks();
  todoForm.addEventListener('submit', uiAdd);
  document.querySelector('.btn').addEventListener('click', () => uiClearCompleted());
}
