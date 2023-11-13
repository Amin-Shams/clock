const input = document.querySelector("input");
const taskList = document.querySelector("ul");
const addBtn = document.querySelector("button");
let tasks;

if (localStorage.getItem('tasks') != null) {
    tasks = localStorage.getItem("tasks").split(',')
    window.addEventListener('load', ()=> {
        for (const value of tasks) {
            const li = document.createElement("li");
            li.textContent = value;
            li.innerHTML += `<span><i class="trash fa-solid fa-trash-can"></i></span>`
            taskList.appendChild(li);    
        }
    })
} else {
    tasks = [];
}

addBtn.addEventListener("click", addHanler);
function addHanler() {
        if (input.value != "")
            createLi(); 
}

function createLi(){
    const li = document.createElement("li");
    li.textContent = input.value;
    saveTask(input.value)
    li.innerHTML += `<span><i class="trash fa-solid fa-trash-can"></i></span>`
    taskList.appendChild(li);
    input.value = "";

}

input.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        addHanler()
    }
})

taskList.addEventListener('click', (event) => {
    const goal = event.target
    if (goal.nodeName === 'I') {
        let work = event.target.parentElement.parentElement
        work.remove();
        tasks = localStorage.getItem('tasks').split(',')
        for (let i = 0; i < tasks.length; i++) {
            if (work.textContent === tasks[i]) {
                tasks.splice(i,1);
                if (tasks.length > 0) {
                    localStorage.setItem('tasks', tasks);            
                }else{
                    localStorage.removeItem('tasks')
                }
                break;
            }
            
        }
    }
    else if(goal.nodeName === 'LI' && goal.firstElementChild.classList.contains('check') == false){
        goal.style.textDecoration = 'line-through';
        goal.innerHTML = '<i class="check fa-solid fa-check fa-beat-fade" style="color: #033300;"></i>' + goal.innerHTML
    } else if(goal.nodeName === 'LI' && goal.firstElementChild.classList.contains('check') == true){
        goal.firstElementChild.remove();
        goal.style.textDecoration = 'none';
    }
})

function saveTask(text){
    tasks.push(text)
    localStorage.setItem('tasks', tasks)
}

