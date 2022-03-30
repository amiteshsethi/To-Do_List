let tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

console.log('Working');

// API using fetch - [GET]
function fetchToDos() {
    fetch('https://jsonplaceholder.typicode.com/todos')
        .then(function(response ){
            return response.json()
        }).then(function(data){
            tasks = data.slice(0,10)
            renderList()
        })
        .catch(function(error){
            console.log('error => ',error)
        })
}

// // API using async - try & catch 


function addTaskToDOM(task) {

    const li = document.createElement('li');

    li.innerHTML = `
        <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''} class="custom-checkbox" >
        <label for="${task.id}">${task.title}</label>
        <img src="https://cdn-icons-png.flaticon.com/512/1828/1828843.png" class="delete" data-id="${task.id}"/>
        `;
    taskList.append(li);
}


function renderList() {
    taskList.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {
        addTaskToDOM(tasks[i])
    }

    tasksCounter.innerHTML = tasks.length;
}

function ToggleTask(taskId) {
    const task = tasks.filter(function (task) {
        return task.id === Number(taskId)
    })

    if (task.length > 0) {
        const currentTask = task[0]
        currentTask.completed = !currentTask.completed
        renderList()
        return
    }
    showNotification('Couldnt Toggle the task')
}

function deleteTask(taskId) {

    const newTasks = tasks.filter(function (task) {
        return task.id !== Number(taskId)
    });

    tasks = newTasks;
    renderList();
    // showNotification('Tasks deleted Successfully!!');
}

function addTask(task) {
    if (task) {
        tasks.push(task)
        renderList()
        // showNotification('Task Added.')
        // console.log(tasks)
        return
    }
    showNotification('task cannot be added !!')
}

function showNotification(text) {
    window.alert(text);
}

function handleInputKeypress(e) {
    if (e.key === 'Enter') {
        const text = e.target.value;
        // console.log('text-is =>', text);

        if (!text) {
            showNotification('Text Cannot be Empty!!');
            return;
        }

        const task = {
            title: text,
            id: Date.now(),
            completed: false
        }

        e.target.value = "";
        addTask(task);

    }
}

function handleClickListener(e) {
    const target = e.target
    // console.log(target)

    if (target.className === 'delete'){
        const taskId = target.dataset.id
        deleteTask(taskId)
        return
    }
    else if (target.className === 'custom-checkbox') {
        const taskId = target.id
        ToggleTask(taskId)
        return
    }
}


fetchToDos()
addTaskInput.addEventListener('keyup', handleInputKeypress);
document.addEventListener('click',handleClickListener);
