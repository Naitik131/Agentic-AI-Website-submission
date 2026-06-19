const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const message = document.getElementById("message");

function showMessage(text, type) {
    message.textContent = text;
    message.className = type;

    setTimeout(() => {
        message.textContent = "";
    }, 2000);
}

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        showMessage("Task cannot be empty!", "error");
        return;
    }

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = taskText;

    const btnDiv = document.createElement("div");
    btnDiv.classList.add("task-buttons");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";

    editBtn.onclick = function () {
        const updatedTask = prompt("Edit task:", span.textContent);

        if (updatedTask && updatedTask.trim() !== "") {
            span.textContent = updatedTask.trim();
            showMessage("Task updated successfully!", "success");
        }
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.onclick = function () {
        li.remove();
        showMessage("Task deleted successfully!", "success");
    };

    btnDiv.appendChild(editBtn);
    btnDiv.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(btnDiv);

    taskList.appendChild(li);

    taskInput.value = "";
    showMessage("Task added successfully!", "success");
}
