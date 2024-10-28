document.addEventListener('DOMContentLoaded', loadTasks);

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task.text, task.completed));
}

function addTask() {
    const taskInput = document.getElementById("task-input");
    const taskText = taskInput.value.trim();

    if (taskText) {
        addTaskToDOM(taskText, false);
        saveTask(taskText, false);
        taskInput.value = "";
    } else {
        alert("Please enter a task!");
    }
}

function addTaskToDOM(taskText, completed) {
    const taskList = document.getElementById("task-list");
    const listItem = document.createElement("li");
    listItem.className = "task-item";
    if (completed) {
        listItem.classList.add('completed');
    }

    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;

    const actionsDiv = document.createElement("div");
    actionsDiv.className = "task-actions";

    const completeBtn = document.createElement("span");
    completeBtn.textContent = "✓";
    completeBtn.className = "complete-btn";
    completeBtn.onclick = function() {
        listItem.classList.toggle('completed');
        updateTask(taskText, listItem.classList.contains('completed'));
    };

    const deleteBtn = document.createElement("span");
    deleteBtn.textContent = "✖";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = function() {
        taskList.removeChild(listItem);
        removeTask(taskText);
    };

    actionsDiv.appendChild(completeBtn);
    actionsDiv.appendChild(deleteBtn);

    listItem.appendChild(taskSpan);
    listItem.appendChild(actionsDiv);
    taskList.appendChild(listItem);
}

function saveTask(taskText, completed) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: taskText, completed: completed });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTask(taskText, completed) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskIndex = tasks.findIndex(task => task.text === taskText);
    if (taskIndex > -1) {
        tasks[taskIndex].completed = completed;
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
