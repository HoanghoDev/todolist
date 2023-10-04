let btnAdd = document.getElementById('btnAdd');
let list = document.querySelector('ul.list');
let listTask = [];
if(localStorage.getItem('listTask') != null){
    listTask = JSON.parse(localStorage.getItem('listTask'));
}

function addTaskToHTML(){
    list.innerHTML = '';
    listTask.forEach((task, index) => {
        let newTask = document.createElement('li');
        newTask.classList.add(task.status);
        newTask.innerHTML = `
        <div class="complete-icon" oncLick="completeTask(${index})">
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 10 2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
            </svg>
        </div>
        <div class="content">
            ${task.content}
        </div>
        <div class="close-icon" oncLick="deleteTask(${index})">
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
        </div>
        `;
        list.appendChild(newTask);

        
    })
}
function completeTask(index){
    listTask[index].status = 'complete';
    addTaskToHTML();
    saveLocalStorage();
}
function deleteTask(index){
    listTask =  listTask.filter((task, key) =>{return  key != index} );
    addTaskToHTML();
    saveLocalStorage();
}
addTaskToHTML();

btnAdd.onclick = function(event){
    event.preventDefault();
    let content = document.getElementById('task').value;
    if(content != ''){
        listTask.unshift({
            content: content,
            status: 'doing'
        })
    }
    document.getElementById('task').value = '';
    addTaskToHTML();
    saveLocalStorage();
}
function saveLocalStorage(){
    localStorage.setItem('listTask', JSON.stringify(listTask));
}