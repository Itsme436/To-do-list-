const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage
document.addEventListener("DOMContentLoaded", loadTasks);

addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;
    
    addTask(taskText);
    saveTask(taskText);
    taskInput.value = "";
});

function addTask(taskText, completed = false) {
    const li = document.createElement('li');
    li.textContent = taskText;

    if (completed) li.classList.add("completed");

    li.addEventListener('click', () => {
        li.classList.toggle("completed");
        updateLocalStorage();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "❌";
    deleteBtn.style.background = "transparent";
    deleteBtn.style.border = "none";
    deleteBtn.style.cursor = "pointer";
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        li.remove();
        updateLocalStorage();
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

function saveTask(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTask(task.text, task.completed));
}

function updateLocalStorage() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(li => {
        tasks.push({ text: li.firstChild.textContent, completed: li.classList.contains("completed") });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
