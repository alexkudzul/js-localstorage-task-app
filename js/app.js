document.getElementById('form-task').addEventListener('submit', saveTask);

function saveTask(e){
    e.preventDefault();

    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;

    const task = {
        title, // title : title
        description // description : description
    }

    // NOTA: 
    // JSON.stringify convierte el objeto a string, para que se pueda leer bien
    // JSON.parse convierte el string a un objeto, para que se pueda manipular los datos



    // Si el LS esta vacio, agregamos la tarea
    if(localStorage.getItem('tasks') === null){
        let tasks = [];
        tasks.push(task);
        
        
        localStorage.setItem('tasks' , JSON.stringify(tasks)); //recibe dos parametros
    } else{
        // Si el LS tiene un tasks, obtenemos la tarea
        let tasks = JSON.parse(localStorage.getItem('tasks')); // recibe un parametro
        // Actualizamos 
        tasks.push(task);
        // Agregamos de nuevo 
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    getTasks();
    document.getElementById('form-task').reset();
}

function getTasks(){
    let tasks = JSON.parse(localStorage.getItem('tasks'));

    let tasksView = document.getElementById('tasks');

    tasksView.innerHTML = '';

    for(let i = 0; i < tasks.length; i++){
        let title = tasks[i].title;
        let description = tasks[i].description;

        tasksView.innerHTML += `
        
        <div class="card mb-3">
            <div class="card-body">
                <p>${title} - ${description}</p>
                <a class="btn btn-danger" onclick="deleteTask('${title}')">
                    Delete
                </a>
            </div>
        </div>
        
        
        `;
    }
}

function deleteTask(title){
    console.log(title);

    let tasks = JSON.parse(localStorage.getItem('tasks'));

    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].title == title){
            tasks.splice(i, 1); // quita el item i y solo sera un elemento 1
        }
    }

    // Despues de quitar un item, agregamos de nuevo los anteriores
    localStorage.setItem('tasks', JSON.stringify(tasks));
    // Obtenemos los tasks
    getTasks();
}
getTasks();