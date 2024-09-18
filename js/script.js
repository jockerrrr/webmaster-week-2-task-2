const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const notification = document.getElementById("notification");

// Function to display notifications
function showNotification(message) {
    notification.innerHTML = message;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 2000);
}

// Add new task
document.getElementById("btn").addEventListener("click", () => {
    if (inputBox.value === "") {
        showNotification("You must enter a task!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        li.classList.add("task-item");  // Add class for transition

        // Add buttons for edit and delete
        let editBtn = document.createElement("button");
        editBtn.innerHTML = "Edit";
        editBtn.classList.add("edit-btn");

        let deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "\u00d7";
        deleteBtn.classList.add("delete-btn");

        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        listContainer.appendChild(li);

        inputBox.value = "";  // Clear input box

        saveData();
        showNotification("Task added successfully!");

        // Apply transition after adding the task
        setTimeout(() => {
            li.classList.add("visible");
        }, 10);
    }
});

// Delete or edit tasks
listContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
        let task = e.target.parentElement;
        task.classList.remove("visible");
        setTimeout(() => {
            task.remove();
            saveData();
            showNotification("Task deleted successfully!");
        }, 300);  // Delay to allow transition to complete
    }

    if (e.target.classList.contains("edit-btn")) {
        let task = e.target.parentElement;
        let newText = prompt("Edit your task", task.firstChild.textContent);
        if (newText) {
            task.firstChild.textContent = newText;
            saveData();
            showNotification("Task edited successfully!");
        }
    }

    // Mark tasks as completed
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    }
});

// Save tasks to localStorage
function saveData() {
    localStorage.setItem("tasks", listContainer.innerHTML);
}

// Load tasks from localStorage
function showTasks() {
    listContainer.innerHTML = localStorage.getItem("tasks") || "";
}

showTasks();
