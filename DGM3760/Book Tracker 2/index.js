let todos = [{
  id: 1,
  taskName: "Harry Potter and the Sorcerer’s Stone",
  completed: false,
  category: "Good"
},
{
  id: 2,
  taskName: "Dune",
  completed: true,
  category: "Bad"
},
{
  id: 3,
  taskName: "IQ84",
  completed: false,
  category: "So so..."
},
]
let categories = []

const updateTodos = (list) => {
let taskList = document.querySelector('#taskList')
taskList.innerHTML = `<ul>`

list.map((list) => {
  taskList.innerHTML +=
    `<li class="card">
              <div class="card-body">
                  <div>
                  <button type="button" id="task${list.id}Close" class="btn-close float-end ms-2 mt-1" aria-label="Close" todoID="${list.id}" buttonFunc="close"></button>
                      <button type="button" id="task${list.id}Edit" class="btn btn-success btn-sm float-end" todoID="${list.id}" buttonFunc="edit" taskName="${list.taskName}" categoryName="${list.category}">Edit</button>
                  </div>
                  <input type="checkbox" id="task${list.id}Completed" name="task${list.id}" ${list.completed == true ? 'checked' : ''} todoId="${list.id}" buttonFunc="complete">
                  <label for="task${list.id}"> ${list.taskName}</label><br>
                  <label for="task${list.id}"> ${list.category}</label><br>
              </div>
          </li>`;
})
taskList.innerHTML += `</ul>`;

taskList.addEventListener('click', eventClickHandler)
}


function searchBooks() {
  document.getElementById('output').innerHTML = ""; //clears output div before getting filled in
  
  // makes request to endpoint with a query of input
  fetch("https://openlibrary.org/search.json?q="+document.getElementById('input').value) 

  // convert response from string to object
  .then(a => a.json())

  //  if want all the results response.docs.length
  .then(response => {
      for (let i = 0; i < 10; i++) {
          document.getElementById('output').innerHTML += "<h2>" + response.docs[i].title + "</h2>" 
          + response.docs[i].author_name[0] + "<br><img src='https://covers.openlibrary.org/b/isbn/" 
          + response.docs[i].isbn[0] + "-M.jpg'></img></br>";
          
      }
  });

}

function eventClickHandler(event) {
// console.log(event)
// console.log(event.target.id)
// console.log(event.target.attributes.buttonFunc.value)
// console.log(event.target.attributes.todoId)

if (event.target.attributes.buttonFunc.value == "complete") {
  completeTodo(event.target.attributes.todoId.value)
} else if (event.target.attributes.buttonFunc.value == "close") {
  deleteTodo(event.target.attributes.todoId.value)
} else if (event.target.attributes.buttonFunc.value == "edit") {
  editTodo(event.target.attributes)
}
}

// event listener for add task btn
document.querySelector("#addTaskButton").addEventListener('click', () => {

let inputBox = document.querySelector('#newTaskName');
let newTaskName = inputBox.value
if (newTaskName !== '') {
  let newId = Math.floor(Math.random() * 1000000);
  let newCategory = document.querySelector('#addSelectCategory').value // new todo select will always be first
  if (newCategory === 'Select Category') {
    newCategory = 'Uncategorized'
  }

  inputBox.value = "";

  todos.push({
    id: newId,
    taskName: newTaskName,
    completed: false,
    category: newCategory
  })
  updateTodos(todos);
  console.log(todos)
}
})

// event listener for add category btn
document.querySelector("#addCategoryButton").addEventListener('click', () => {
let createCategoryButton = document.querySelector("#addCategoryButton")
let inputBox = document.querySelector('#newCategoryName')
let selectedCategory = document.querySelector('#filterCategory')

let newCategory = inputBox.value

if (createCategoryButton.innerText === "Save") {

  let dropdownOptions = document.querySelectorAll('.filterOption')

  todos.forEach((todo) => {
    if (todo.category === selectedCategory.value) {
      todo.category = newCategory;
    }
  })

  for (dropdown of dropdownOptions) {
    if (dropdown.value === selectedCategory.value) {
      dropdown.value = newCategory
      dropdown.innerText = newCategory
    }
  }


  document.querySelector('#addCategoryButton').innerText = 'Create Category';

} else if (!categories.includes(newCategory) && newCategory != "") {

  categories.push(newCategory)

  let dropdowns = document.querySelectorAll('.categoryPicker')
  dropdowns.forEach((dropdown) => {
    const newElement = document.createElement('option');
    newElement.className = "filterOption"
    newElement.value = newCategory
    newElement.innerHTML = newCategory
    dropdown.appendChild(newElement)
  })
}

selectedCategory.selectedIndex = 0;
inputBox.value = "";

updateTodos(todos);
})

document.querySelector("#editCategoryButton").addEventListener('click', (event) => {
let selectedItem = document.querySelector("#filterCategory").value;

if (selectedItem !== "Filter By Category" && selectedItem !== "Uncategorized") {
  editCategory(selectedItem)
}
})

function deleteTodo(id) {
todos = todos.filter(element => {
  if (element.id != id) {
    return element;
  }

})

updateTodos(todos)
}

function editCategory(categoryName) {
document.querySelector('#newCategoryName').value = categoryName;
document.querySelector('#addCategoryButton').innerText = 'Save';
}

function completeTodo(id) {
todos = todos.filter(element => {
  if (element.id == id) {
    element.completed = !element.completed;
  }
  return element;
})
}

function deleteCompleted() {
todos = todos.filter(element => {
  if (element.completed === false) {
    return element
  }
})
updateTodos(todos)
}


let todoIdToBeEdited = -1;
//edit 
function editTodo(task) {
todoIdToBeEdited = parseInt(task.todoId.value);
document.querySelector('#newTaskName').value = task.taskName.value;
document.querySelector('#addSelectCategory').value = task.categoryName.value;
document.querySelector('#saveTaskButton').style.display = 'block';
document.querySelector('#addTaskButton').style.display = 'none';
}

//save 
const saveTodo = () => {
let newTaskName = document.querySelector('#newTaskName').value;
let selectedCategory = document.querySelector('#addSelectCategory');

if (selectedCategory.selectedIndex == 0) {
  selectedCategory.value = "Uncategorized";
}

todos.forEach(element => {
  if (element.id === todoIdToBeEdited) {
    element.category = selectedCategory.value;
    element.taskName = newTaskName;
  }

});

document.querySelector('#newTaskName').value = '';
document.querySelector('#saveTaskButton').style.display = 'none';
document.querySelector('#addTaskButton').style.display = 'block';
selectedCategory.selectedIndex = 0;
todoIdToBeEdited = -1;
updateTodos(todos);
}

document.querySelector('#saveTaskButton').addEventListener('click', () => {
saveTodo();
})

// grab unique categories and display them in drop down
function getAllCategories() {

categories = todos.map((todo) => {
  if (!categories.includes(todo.category) && todo.category != '') {

    let dropdowns = document.querySelectorAll(".categoryPicker");
    dropdowns.forEach((dropdown) => {
      const newElement = document.createElement('option');
      newElement.className = "filterOption"
      newElement.value = `${todo.category}`
      newElement.innerHTML = `${todo.category}`
      dropdown.appendChild(newElement)
    })
    return todo.category
  }
})
}

//view by Categories
const filterList = (event) => {
let selectElement = event.target;
let value = selectElement.value;
let filteredList = todos.filter(e => e.category == value);
filteredList.length > 0 ? updateTodos(filteredList) : updateTodos([]);

}
const categoryDropDown = document.getElementById('filterCategory');
categoryDropDown.addEventListener('change', filterList);

getAllCategories();
updateTodos(todos);
