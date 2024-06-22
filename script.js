const taskInput = document.querySelector('#task-input');
const addButton = document.querySelector('#add-button');
const taskList = document.querySelector('#task-list');
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function addTaskToDOM(task, index) {
    const listItem = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', toggleTaskCompletion);
    checkbox.dataset.index = index;

    const span = document.createElement('span');
    span.textContent = task.text;
    if (task.completed) {
        span.classList.add('completed');
    }

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', deleteTask);
    deleteButton.dataset.index = index;

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', editTask);
    editButton.dataset.index = index;

    listItem.appendChild(checkbox);
    listItem.appendChild(span);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);
}


function toggleTaskCompletion(event) {
    const checkbox = event.target;
    const index = checkbox.dataset.index;
    tasks[index].completed = checkbox.checked;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}


function addTask(taskText) {
    const task = { text: taskText, completed: false };
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}


function deleteTask(event) {
    const index = event.target.dataset.index;
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}


function editTask(event) {
    const index = event.target.dataset.index;
    const newTaskText = prompt("Edit your task:", tasks[index].text);
    if (newTaskText !== null) {
        tasks[index].text = newTaskText;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }
}


function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => addTaskToDOM(task, index));
}


renderTasks();


addButton.addEventListener('click', () => {
    const taskText = taskInput.value;
    if (taskText) {
        addTask(taskText);
        taskInput.value = ''; 
    }
});
