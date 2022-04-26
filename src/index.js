import './style.css';

const tasks = [
  {
    description: 'Skype with James',
    completed: true,
    index: 3,
  },

  {
    description: 'Go to supermarket',
    completed: true,
    index: 2,
  },

  {
    description: 'Finish homework',
    completed: false,
    index: 1,
  },

  {
    description: 'Go to cinema',
    completed: false,
    index: 5,
  },

  {
    description: 'Yoga class',
    completed: true,
    index: 4,
  },
];

tasks.sort((a, b) => a.index - b.index);
const ulList = document.querySelector('.check-list');
let insideUl = '';

tasks.forEach((task) => {
  insideUl += `<li>
  <input id="${task.index}" type="checkbox" name="checkBox">
  <label class="task" for="${task.index}">${task.description}</label>
  <span class="material-symbols-outlined">more_vert</span>
  </li>`;
});

const liToTasks = document.createElement('ul');
liToTasks.setAttribute('class', 'list-items');
liToTasks.innerHTML = insideUl;
ulList.appendChild(liToTasks);