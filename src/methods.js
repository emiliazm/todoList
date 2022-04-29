let tasks = [];
let lastId = localStorage.getItem('lastId') || 0;

export const getLastId = () => lastId;

export const setLastId = (id) => {
  lastId = id;
  localStorage.setItem('lastId', lastId);
};

export const loadTasks = () => {
  tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const sTasks = [...tasks];
  const uTaskId = sTasks.sort((a, b) => b.id - a.id)[0]?.id || 0;
  if (uTaskId > lastId) {
    setLastId(uTaskId);
  }
};

export const getTasks = () => tasks;

export const setTasks = (pTasks) => {
  tasks = pTasks;
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

export const addTask = (task) => {
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

export const updateTask = (taskId, newValue) => {
  const task = tasks.find((e) => e.id === Number(taskId));
  task.description = newValue;
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

export const deleteTask = (taskId) => {
  tasks = tasks.filter((task) => task.id !== parseInt(taskId, 10));
  tasks.forEach((e, i) => {
    tasks[i].index = i + 1;
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

export const checkStatus = (taskId) => {
  const task = tasks.find((e) => e.id === Number(taskId));
  task.isCompleted = !task.isCompleted;
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

export const clearAllBtn = () => {
  const cleared = tasks.filter((task) => !task.isCompleted);
  tasks = cleared.map((task, i) => ({ ...task, index: i + 1 }));
  localStorage.setItem('tasks', JSON.stringify(tasks));
};