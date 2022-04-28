let tasks = [];
export const getTasks = () => tasks;
export const setTasks = (pTasks) => {
  tasks = pTasks;
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