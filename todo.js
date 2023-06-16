const taskInput = document.querySelector(".task-input input");
filters = document.querySelectorAll(".filter span")
taskBox = document.querySelector(".task-box");
clearAll = document.querySelector(".controls .clear-btn");

console.log(clearAll)

let editId;
let isEditTask = false;
       //getting local storage input
let todos = JSON.parse(localStorage.getItem("todo-list"));

filters.forEach(btn =>{
    btn.addEventListener("click",()=>{
        document.querySelector(".filter span.active").classList.remove("active")
        btn.classList.add("active")
        showtodo(btn.id)
    })
})

function showtodo(filter){
    let li = "";
    if(todos){
    todos.forEach((todo,id)=>{
        
        let isCompleted = todo.status == "completed" ? "checked" : "";

        if(filter == todo.status || filter == "all"){
            li += `<li class="task">
            <label for="${id}">
                <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
                <p class=${isCompleted}>${todo.name}</p>
            </label>
            <div class="setting">
                <i onclick="showMenu(this)" class="fa-solid fa-ellipsis" style="color: #101111;"></i>
                <ul class="task-menu">
                    <li onclick="editTask(${id},'${todo.name}')"><i class="fa-solid fa-pen-to-square" style="color: #29292b;"></i>Edit</li>
                    <li onclick="deleteTask(${id})"><i class="fa-solid fa-trash" style="color: #2d2e30;"></i>Delete</li>
                </ul>
            </div>
       </li>`;

        }
            });
        }

    taskBox.innerHTML = li || `<span>You don't have an any task here<span>`;
}
showtodo("all")

clearAll.addEventListener("click",()=>{
    todos.splice(0,todos.length);
    localStorage.setItem("todo-list",JSON.stringify(todos));
    showtodo("all");
})

function updateStatus(selectedTask){
     let taskName = selectedTask.parentElement.lastElementChild;

     if(selectedTask.checked){
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "completed";
     }
     else{
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "pending";
     }
     localStorage.setItem("todo-list",JSON.stringify(todos));
}

function showMenu(selectedTask){
    let taskMenu = selectedTask.parentElement.lastElementChild;
    taskMenu.classList.add("show");
    document.addEventListener("click",(e) =>{
        if(e.target.tagName != "I" || e.target != selectedTask){
            taskMenu.classList.remove("show");
        }
    })
}

function deleteTask(deleteId){
    todos.splice(deleteId,1);
    localStorage.setItem("todo-list",JSON.stringify(todos));
    showtodo("all")
}

function editTask(taskId,taskName){
    editId = taskId
    isEditTask = true;
    taskInput.value = taskName
}

taskInput.addEventListener("keyup",e =>{
    let userTask = taskInput.value.trim();
    if(e.key == "Enter" && userTask){
        if(!isEditTask){
            if(!todos){
                todos = [];
             }
             let taskInfo = {name:userTask,status:"pending"};
             todos.push(taskInfo);
             console.log(isEditTask)
        }else{
            isEditTask = false;
            todos[editId].name = userTask;
            console.log(isEditTask)
        }
       taskInput.value = "";
       localStorage.setItem("todo-list",JSON.stringify(todos));
       showtodo("all");
    }
});

/*
   
    } */