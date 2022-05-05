import {
  addTask, deleteTask, getTasks, setTasks,
} from './methods.js';
import {
  uiAdd, uiRemoveTask,
} from './ui.js';

const html = `<section id="todo-list">
<h1 class="head-form">Today's To Do <span class="material-symbols-outlined">autorenew</span></h1>
<form class="add-items">
  <div class="placeholder">
    <input id="description" type="text" value="Add yo your list...">
    <span class="material-symbols-outlined">keyboard_return</span>
    
  </div>
  <ul class="check-list"></ul>
  <button class="btn" type="button"> Clear all completed </button>
</form>
</section>`;
document.body.innerHTML = html;

const liElement = `<li>
  <input id="ck-id" class="check-box" type="checkbox" name="checkBox">
  <label class="lb-task" id="lb-id" for="ta-id">description</label>
  <textarea id="ta-id" class="ta-task" name="edit-task">description</textarea>
  <span class="dots material-symbols-outlined">more_vert</span>
  <span class="trash material-symbols-outlined">delete</span>
</li>`;

describe('Add and delete function in localStorage', () => {
  test('Add item to localStorage', () => {
    addTask({
      description: 'wash dishes', completed: false, index: 1, id: 1,
    });
    expect(getTasks()).toEqual([
      {
        description: 'wash dishes',
        completed: false,
        index: 1,
        id: 1,
      },
    ]);
  });

  test('remove task from localStorage', () => {
    setTasks([{
      description: 'wash dishes',
      completed: false,
      index: 1,
      id: 1,
    }]);
    deleteTask('1');
    expect(getTasks()).toBeDefined();
    expect(getTasks()).toHaveLength(0);
  });
});

describe('Add and delete function in UI', () => {
  test('Add task in UI', () => {
    const ulElement = document.querySelector('.check-list');
    const event = {
      preventDefault: () => {},
    };
    uiAdd(event);
    expect(ulElement.childNodes).toBeDefined();
    expect(ulElement.childNodes).toHaveLength(1);
  });

  test('Remove task in UI', () => {
    const ulElement = document.querySelector('.check-list');
    ulElement.innerHTML = liElement;
    const btnElement = document.querySelector('.trash');
    const event = {
      target: btnElement,
    };
    uiRemoveTask(event);
    expect(ulElement.childNodes).toBeDefined();
    expect(ulElement.childNodes).toHaveLength(0);
  });
});