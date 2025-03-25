document.addEventListener("DOMContentLoaded", function() {
    loadTasks();
    loadBooks();
    checkNotifications();
});

// ==== TASK MANAGER (Assignments & Projects) ====
const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");

taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const taskName = document.getElementById("task-name").value;
    const dueDate = document.getElementById("task-due-date").value;
    const taskType = document.getElementById("task-type").value;

    if (taskName && dueDate) {
        const task = { name: taskName, due: dueDate, type: taskType };
        saveTask(task);
        displayTask(task);
        taskForm.reset();
    }
});

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(displayTask);
}

function displayTask(task) {
    const li = document.createElement("li");
    li.innerHTML = `<b>${task.type}:</b> ${task.name} - Due: ${task.due} 
        <button class="delete-btn">Delete</button>`;
    li.classList.add("show");

    li.querySelector(".delete-btn").addEventListener("click", function() {
        deleteTask(task.name);
        li.remove();
    });

    taskList.appendChild(li);
}

function deleteTask(taskName) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.name !== taskName);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ==== LIBRARY BOOK TRACKER ====
const bookForm = document.getElementById("book-form");
const bookList = document.getElementById("book-list");

bookForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const bookTitle = document.getElementById("book-title").value;
    const bookAuthor = document.getElementById("book-author").value;
    const bookDueDate = document.getElementById("book-due-date").value;

    if (bookTitle && bookAuthor && bookDueDate) {
        const book = { title: bookTitle, author: bookAuthor, due: bookDueDate };
        saveBook(book);
        displayBook(book);
        bookForm.reset();
    }
});

function saveBook(book) {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
}

function loadBooks() {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    books.forEach(displayBook);
}

function displayBook(book) {
    const li = document.createElement("li");
    li.innerHTML = `<b>${book.title}</b> by ${book.author} - Due: ${book.due} 
        <button class="delete-btn">Delete</button>`;
    li.classList.add("show");

    li.querySelector(".delete-btn").addEventListener("click", function() {
        deleteBook(book.title);
        li.remove();
    });

    bookList.appendChild(li);
}

function deleteBook(bookTitle) {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    books = books.filter(book => book.title !== bookTitle);
    localStorage.setItem("books", JSON.stringify(books));
}

// Notifications for due dates
function checkNotifications() {
    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }
}
