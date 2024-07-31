const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const todosList = document.querySelector('.todos');
const maxCountMessage = document.getElementById('maxCountMsg');

let taskCount = 0;

function updateTodosDisplay() {
  if (taskCount === 0) {
    todosList.style.display = 'none';
  } else {
    todosList.style.display = 'block';
  }
}

// save tasks in localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll('.todos__task').forEach(task => {
    const text = task.querySelector('p').textContent;
    const time = task.querySelector('.todos__time-text').textContent;
    tasks.push({ text, time });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  if (tasks) {
    tasks.forEach(task => {
      addTask(task.text, task.time);
    });
  }
}

// add new task
function addTask(task, time) {
  const newTask = document.createElement('div');
  newTask.className = 'todos__task';

  const taskText = document.createElement('p');
  taskText.textContent = task;

  const timeText = document.createElement('p');
  timeText.className = 'todos__time-text';
  timeText.textContent = time;

  const deleteBtn = document.createElement('button');
  deleteBtn.addEventListener('click', () => {
    newTask.remove();
    taskCount--;
    maxCountMessage.style.display = 'none';
    updateTodosDisplay(); 
    saveTasks(); // save new tasks list
  });

  newTask.appendChild(taskText);
  newTask.appendChild(timeText); 
  newTask.appendChild(deleteBtn);
  todosList.appendChild(newTask);

  taskCount++;
  maxCountMessage.style.display = 'none';
  updateTodosDisplay(); 
  saveTasks(); // save new tasks list
}

//init - loading tasks from localStorage
loadTasks();
updateTodosDisplay();

addTaskBtn.addEventListener('click', () => {
  const task = taskInput.value.trim();
  const currentTime = new Date().toLocaleString();

  if (task !== '' && taskCount < 20) {
    addTask(task, currentTime); // use new function for adding new tasks
    taskInput.value = '';
  } else if (taskCount >= 20) {
    maxCountMessage.style.display = 'block';
  }
});
