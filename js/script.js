let isLoggedIn = false;
let storedAdmins = [];
let storedEmployees = [];
let tasks = JSON.parse(localStorage.getItem('taskData')) || []; // Array to hold tasks

// Function to initialize data from local storage
function initializeData() {
   storedAdmins = JSON.parse(localStorage.getItem('adminData')) || [];
   storedEmployees = JSON.parse(localStorage.getItem('employeesData')) || [];
}

// Function to handle admin login
function handleAdminLogin(event) {
   event.preventDefault();
   const email = document.getElementById('email').value.trim().toLowerCase();
   const password = document.getElementById('password').value.trim();
   const foundAdmin = storedAdmins.find(admin => admin.email === email && admin.password === password);

   if (foundAdmin) {
      window.location.assign('Admin.html');
      localStorage.setItem('adminname', JSON.stringify(foundAdmin.name));
      isLoggedIn = true;
   } else {
      alert("The email or password you entered is incorrect. Please try again.");
   }
}

const adminLoginButton = document.querySelector('.login-btn');
if (adminLoginButton) {
   adminLoginButton.addEventListener('click', handleAdminLogin);
}

// Function to handle employee login
function handleEmployeeLogin(event) {
   event.preventDefault();
   const email = document.getElementById('email').value.trim().toLowerCase();
   const password = document.getElementById('password').value.trim();
   const foundEmployee = storedEmployees.find(employee => employee.email === email && employee.password === password);

   if (foundEmployee) {
      window.location.assign('employees.html');
      localStorage.setItem('employeeName', JSON.stringify(foundEmployee.name));
      isLoggedIn = true;
   } else {
      alert("The email or password you entered is incorrect. Please try again.");
   }
}

const employeeLoginButton = document.querySelector('.login-btn');
if (employeeLoginButton) {
   employeeLoginButton.addEventListener('click', handleEmployeeLogin);
}

// Function to handle logout
function handleLogout() {
   window.location.href = 'index.html';
   isLoggedIn = false;
}

// Function to retrieve task input data from the form
function getTaskInput() {
   const taskTitle = document.getElementById('title').value.trim();
   const taskDate = document.getElementById('date').value.trim();
   const assignTo = document.getElementById('assignTo').value.trim();
   const taskCategory = document.getElementById('category').value.trim();
   const taskDescription = document.getElementById('description').value.trim();

   if (!taskTitle || !taskDate || !assignTo || !taskCategory || !taskDescription) {
      alert("Please fill in all the required fields to proceed.");
      return;
   }

   const foundEmployee = storedEmployees.find(employee =>
      employee.name === assignTo && employee.team === taskCategory
   );

   if (foundEmployee) {
      const taskData = {
         title: taskTitle,
         date: taskDate,
         assignedTo: assignTo,
         category: taskCategory,
         description: taskDescription,
         id: foundEmployee.id, // Ensure this is correctly assigned
         status: "new"
      };

      console.log('Task Data:', taskData); // Log the task data
      tasks.push(taskData); // Add new task to array
      localStorage.setItem('taskData', JSON.stringify(tasks));

      updateAdminListItem(foundEmployee.id, assignTo);
   } else {
      console.error("Employee not found.");
   }

   return foundEmployee;
}

// Function to update or create admin list item
function updateAdminListItem(id, assignTo) {
   let listContainer = document.querySelector('.candidate-list');
   if (!listContainer) return;

   let listItem = document.getElementById(id);
   if (!listItem) {
      listItem = document.createElement('li');
      listItem.classList.add('candidate-item');
      listItem.id = id;
      listItem.innerHTML = `
         <span class="candidate-name">${assignTo}</span>
         <span class="new-task">1</span>
         <span class="active-task">0</span>
         <span class="completed">0</span>
         <span class="notCompleted">0</span>`;
      listContainer.appendChild(listItem);
   } else {
      const newTaskSpan = listItem.querySelector('.new-task');
      newTaskSpan.textContent = parseInt(newTaskSpan.textContent) + 1;
   }
   localStorage.setItem('listItemData', listContainer.innerHTML);
}

// Function to display tasks for employees
function fetchAndDisplayTaskData() {
   const EmployeeNameData = JSON.parse(localStorage.getItem('employeeName'));
   const taskCards = tasks.filter(task => task.assignedTo === EmployeeNameData);

   console.log('All tasks:', tasks); // Log all tasks
   console.log('Employee Name:', EmployeeNameData); // Log employee name

   if (taskCards.length === 0) {
      document.querySelector('.none').style.display = 'block';
      return;
   }

   const taskCardContainer = document.querySelector('.taskCardContainer');
   taskCards.forEach(taskData => {
      const taskCard = document.createElement('div');
      taskCard.classList.add('task-card');
      taskCard.innerHTML = `
         <div class="date-category">
            <div class="date">${taskData.date}</div>
            <div class="category">${taskData.category}</div>
         </div>
         <h1>${taskData.title}</h1>
         <p class="description">${taskData.description}</p>
         <div class="actions">
            <button class="btn accepted" onclick="acceptTask('${taskData.id}')">Task Accepted</button>
            <button class="btn completed" style="display: none;" onclick="completeTask('${taskData.id}')">Task Completed</button>
            <button class="btn not-completedBtn" onclick="notCompleteTask('${taskData.id}')">Not Accepted</button>
         </div>`;
      taskCardContainer.append(taskCard);
   });
}

// Accept task function
function acceptTask(taskId) {
   console.log('All tasks:', tasks); // Log all tasks
   console.log('Looking for task ID:', taskId); // Log the task ID being searched
   const task = tasks.find(t => t.id === taskId);
   console.log('Found task:', tasks.id); // Log the found task or undefined
   if (task) {
      task.status = "accepted";
      localStorage.setItem('taskData', JSON.stringify(tasks));
      document.querySelector('.accepted').style.display = 'none';
      document.querySelector('.completed').style.display = 'block';
   } else {
      console.error(`Task with ID ${taskId} not found.`);
   }
}

// Complete task function
function completeTask(taskId) {
   console.log('All tasks:', tasks); // Log all tasks
   console.log('Looking for task ID:', taskId); // Log the task ID being searched
   const task = tasks.find(t => t.id === taskId);
   console.log('Found task:', task); // Log the found task or undefined
   if (task) {
      task.status = "completed";
      localStorage.setItem('taskData', JSON.stringify(tasks));
      document.querySelector('.not-completedBtn').style.display = 'none';
   } else {
      console.error(`Task with ID ${taskId} not found.`);
   }
}

// Not Complete task function
function notCompleteTask(taskId) {
   console.log('All tasks:', tasks); // Log all tasks
   console.log('Looking for task ID:', taskId); // Log the task ID being searched
   const task = tasks.find(t => t.id === taskId);
   console.log('Found task:', task); // Log the found task or undefined
   if (task) {
      task.status = "notCompleted";
      localStorage.setItem('taskData', JSON.stringify(tasks));
      document.querySelector('.accepted').style.display = 'none';
   } else {
      console.error(`Task with ID ${taskId} not found.`);
   }
}

// Load admin list on page refresh
document.addEventListener("DOMContentLoaded", () => {
   const listContainer = document.querySelector('.candidate-list');
   if (listContainer) {
      listContainer.innerHTML = localStorage.getItem('listItemData') || "";
   }
});

// Initialize the data when the script loads
initializeData();
fetchAndDisplayTaskData();

