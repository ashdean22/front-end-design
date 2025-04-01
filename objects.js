// Task constructor
function Task(name, status = "incomplete") {
  this.name = name; // Name of the task
  this.status = status; // Completion status: "completed" or "incomplete"
}

// This marks a task as completed
Task.prototype.markAsCompleted = function () {
  this.status = "completed";
  console.log(`Task "${this.name}" marked as completed.`);
};

// This method updates task details
Task.prototype.updateTask = function (newName, newStatus) {
  this.name = newName || this.name; // Updates the name if its provided
  this.status = newStatus || this.status; // Updates status if provided
  console.log(`Task updated: Name - "${this.name}", Status - "${this.status}".`);
};

// This method displays task information
Task.prototype.displayTask = function () {
  console.log(`Task: "${this.name}", Status: "${this.status}".`);
};

// This function renders tasks in the task list
function renderTasks(tasks) {
  const taskList = document.getElementById("task_list");
  taskList.innerHTML = ""; // Clears the list before rendering

  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");

    // Creates a span for the task name
    const taskName = document.createElement("span");
    taskName.textContent = `Task: ${task.name}`;
    taskName.style.display = "block"; // Display on a new line

    // Creates a span for the task status
    const taskStatus = document.createElement("span");
    taskStatus.textContent = `Status: ${task.status}`;
    taskStatus.style.display = "block"; // Display on a new line

    // Creates a button to toggle task completion
    const toggleButton = document.createElement("button");
    toggleButton.textContent = task.status === "completed" ? "Mark Incomplete" : "Mark Complete";
    toggleButton.style.marginTop = "5px";

    // Adding an event listener to toggle the task's status
    toggleButton.addEventListener("click", () => {
      task.status = task.status === "completed" ? "incomplete" : "completed";
      renderTasks(tasks); // Re-render the task list to reflect changes made
    });

    // Append the task name, status, and button to the list item
    listItem.appendChild(taskName);
    listItem.appendChild(taskStatus);
    listItem.appendChild(toggleButton);

    // Append the list item to the task list
    taskList.appendChild(listItem);
  });
}

// Example usage
document.addEventListener("DOMContentLoaded", () => {
  const tasks = [
    new Task("Practice serving"),
    new Task("Stretch", "completed"),
    new Task("Play a set"),
  ];

  // Rendering the tasks in the task list
  renderTasks(tasks);

  // Creating multiple tasks
  const task1 = new Task("Practice serving");
  const task2 = new Task("Stretch", "completed");

  // Mark task1 as completed
  task1.markAsCompleted(); // Output: Task "Practice serving" marked as completed.

  // Update task2 details
  task2.updateTask("Stretch and warm up", "incomplete"); // Output: Task updated: Name - "Stretch and warm up", Status - "incomplete".

  // Display task information
  task1.displayTask(); // Output: Task: "Practice serving", Status: "completed".
  task2.displayTask(); // Output: Task: "Stretch and warm up", Status: "incomplete".
});