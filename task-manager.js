let tasks = [];

function addTask() {
    const taskName = document.getElementById('new-task-input').value;
    const priority = document.getElementById('priority-select').value;

    if (taskName.trim()) {
        tasks.push({ name: taskName, status: 'Not Started', priority });
        displayTasks();
        updateCompletionRing();
    }
    document.getElementById('new-task-input').value = '';
}

function deleteTask(index) {
    tasks.splice(index, 1);
    displayTasks();
    updateCompletionRing();
}

function toggleTaskCompletion(index) {
    tasks[index].status = tasks[index].status === 'Complete' ? 'Not Started' : 'Complete';
    displayTasks();
    updateCompletionRing();
}

function displayTasks() {
    const taskContainer = document.querySelector('.tasks');
    taskContainer.innerHTML = ''; // Clear existing tasks

    const filterValue = document.getElementById('filter-select').value;

    tasks.forEach((task, index) => {
        if (filterValue === 'completed' && task.status !== 'Complete') return;

        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');
        taskItem.innerHTML = `
            <input type="checkbox" ${task.status === 'Complete' ? 'checked' : ''} onchange="toggleTaskCompletion(${index})">
            <span class="task-name ${task.status === 'Complete' ? 'completed' : ''}">${task.name}</span>
            <span class="status">${task.status}</span>
            <span class="priority">${task.priority}</span>
            <button class="delete-task" onclick="deleteTask(${index})">🗑️ Delete</button>
        `;
        taskContainer.appendChild(taskItem);
    });
}

function updateCompletionRing() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.status === 'Complete').length;
    const completionPercentage = totalTasks > 0 ? Math.floor((completedTasks / totalTasks) * 100) : 0;

    const circle = document.querySelector('.ring-progress');
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (completionPercentage / 100) * circumference;

    circle.style.strokeDashoffset = offset;
    document.querySelector('.completion-text').textContent = `${completionPercentage}%`;
}

function filterTasks() {
    displayTasks();
}

document.getElementById('add-task-button').addEventListener('click', addTask);
