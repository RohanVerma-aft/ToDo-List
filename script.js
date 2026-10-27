const add = document.getElementById("addTaskButton");
const taskInput = document.getElementById("taskInput");

function updateListVisibility() {
    const listContainer = document.querySelector(".listContainer");
    const taskList = document.getElementById("TaskList");

    if (taskList.children.length === 0) {
        listContainer.style.display = "none";
    } else {
        listContainer.style.display = "flex";
    }
}


function addTask() {
    const Input=taskInput.value.trim();
    if(Input !== ""){
        const taskList = document.getElementById("TaskList");
        const newTask = document.createElement("li");
        const check = document.createElement("input");
        check.type = "checkbox";                       //checkbox for task completion
        check.classList.add("task-checkbox");
        newTask.appendChild(check);
        check.addEventListener("change", function(){
            if(check.checked){
                newTask.classList.add("done");
                taskList.appendChild(newTask);
            }
            else{
                newTask.classList.remove("done");
                taskList.prepend(newTask);
            }
        })

        const taskText = document.createElement("span");        //text of task
        taskText.textContent = Input;
        newTask.appendChild(taskText);


        const edit = document.createElement("button");      //edit button
        edit.textContent = "Edit";
        edit.classList.add("edit-btn");
        edit.addEventListener("click", function(){
            edit.style.display = "none";

            const saveButton = document.createElement("button");
            saveButton.textContent = "Save";
            newTask.insertBefore(saveButton, deleteButton);

            const newText = document.createElement("input");
            newText.type = "text";
            newText.value = taskText.textContent;
            newTask.replaceChild(newText, taskText);

            function savetxt(){
                const updatedText = newText.value.trim();
                if(updatedText !== ""){
                    taskText.textContent = updatedText;
                    newTask.replaceChild(taskText, newText);
                    newTask.removeChild(saveButton);
                    edit.style.display = "inline-block";
                }
            }

            saveButton.addEventListener("click", savetxt);
            newText.addEventListener("keydown", function(e){
                if(e.key === "Enter"){
                    savetxt();
                }
            });

//         edit.addEventListener("click", function() {
//     const updatedText = prompt("Edit task:", taskText.textContent);

//     if (updatedText !== null && updatedText.trim() !== "") {
//         taskText.textContent = updatedText.trim();
//     }
            });
newTask.appendChild(edit);
        

        const deleteButton = document.createElement("button");      //delete button
        deleteButton.textContent = "X";
        deleteButton.addEventListener("click", function(){
            taskList.removeChild(newTask);
            updateListVisibility();
        })
        deleteButton.classList.add("delete-btn");
        newTask.appendChild(deleteButton);




        newTask.classList.add('task-item');
        taskList.appendChild(newTask);
        taskInput.value = "";
    }
}

updateListVisibility();

add.addEventListener("click", function(){
    addTask();
    updateListVisibility()});
taskInput.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        addTask();
        updateListVisibility();
    }
});