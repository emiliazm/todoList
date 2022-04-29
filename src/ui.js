import {
  getTasks, updateTask, deleteTask, loadTasks, addTask,
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

// create item
const uiCreateTask = (task) => {
  const tasks = getTasks();
  tasks.sort((a, b) => a.index - b.index);
  const ulList = document.querySelector('.check-list');
  const insideUl = `
  <input id="ck-${task.id}" type="checkbox" name="checkBox">
  <label class="lb-task" id="lb-${task.id}" for="ta-${task.id}">${task.description}</label>
  <textarea id="ta-${task.id}" class="ta-task" name="edit-task">${task.description}</textarea>
  <span class="dots material-symbols-outlined">more_vert</span>
  <span class="trash material-symbols-outlined">delete</span>
  `;

  const liToTasks = document.createElement('li');
  liToTasks.setAttribute('class', 'list-items');
  liToTasks.setAttribute('data-taskid', `${task.id}`);
  liToTasks.setAttribute('data-taskindex', `${task.index}`);
  liToTasks.innerHTML = insideUl;
  liToTasks.querySelector('.lb-task').onclick = uiClickLabel;
  liToTasks.querySelector('.ta-task').onblur = uiBlurTextArea;
  liToTasks.querySelector('.trash').onclick = uiRemoveTask;
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
    const id = tasks.length + 1;
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
}
