document.addEventListener('DOMContentLoaded', () => {
    const addTaskButton = document.getElementById('add-task');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    addTaskButton.addEventListener('click', () => {
        if (taskInput.value.trim() !== '') {
            const taskItem = document.createElement('li');
            taskItem.textContent = taskInput.value;
            taskItem.addEventListener('click', () => {
                taskItem.classList.toggle('completed');
            });
            taskList.appendChild(taskItem);
            taskInput.value = '';
        }
    });
});
