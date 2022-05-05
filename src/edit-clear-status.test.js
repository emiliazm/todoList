
import {
  checkStatus,
  getTasks,
  setTasks,
  clearAllBtn,
  updateTask,
} from './methods.js';
import {
  uiCheckStatus,
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

/* check Status, Clear All*/

describe('Edit, Clear All, Check Status in local Storage', () => {
  test('Check Status in local Storage', () => {
    setTasks([{
      description: 'wash dishes',
      isCompleted: false,
      index: 1,
      id: 1,
    }]);
    checkStatus('1');
    expect(getTasks()).toBeDefined();
    expect(getTasks()[0].isCompleted).toBe(true);
  });

  test('Clear All in local Storage', () => {
    setTasks([{
        description: 'wash dishes',
        isCompleted: true,
        index: 1,
        id: 1,
      },
      {
        description: 'wash dishes',
        isCompleted: false,
        index: 2,
        id: 2,
      },
      {
        description: 'wash dishes',
        isCompleted: true,
        index: 3,
        id: 3,
      }
    ]);

    clearAllBtn();
    const items = getTasks();
    expect(items).toBeDefined();
    expect(items).toHaveLength(1);
    expect(items[0].isCompleted).toBe(false);
    expect(items[0].index).toEqual(1);
  });

  test ('Edit in local Storage', () => {
    setTasks([{
      description: 'wash the car',
      isCompleted: false,
      index: 1,
      id: 1,
    }]);
    const newValue = 'go out for dinner'
    updateTask('1', newValue);
    const items = getTasks();
    expect(items).toBeDefined();
    expect(items).toHaveLength(1);
    expect(items[0].description).toBe(newValue);
  })
});