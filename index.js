/* <-------------------Variables------------------->*/

//Class names for coherency
var CHECK_CIRCLE = "fa-check-circle";
var UNCHECK_CIRCLE = "fa-circle-thin";
var LINE_THROUGH = "lineThrough";

//Select the Elements
var clear = document.querySelector(".clear");
var dateElement = document.getElementById("date");
var list = document.getElementById("list");
var input = document.getElementById("input");

//Variables 
let LIST, id;

/* <-------------------Local Data Storage (No progress lost after exiting app)------------------->*/

//Get item from local storage 
let data = localStorage.getItem("TODO");

//Check if data is not empty
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length; // sets id to the last one in the list
    loadList(LIST); // load the tasks to the user's interface
}
else { //if data isn't empty
    LIST = [];
    id = 0;
}

/* <-------------------Date Display Section------------------->*/

//Display today's date
var options = { weekday: "long", month: "short", day: "numeric" };
var today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

/* <-------------------To Do Functions------------------->*/

//Load tasks to the interface function
function loadList(array) {
    array.forEach(function (item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

//Add task function
function addToDo(toDo, id, done, trash) {
    if (trash) { return; }

    var DONE = done ? CHECK_CIRCLE : UNCHECK_CIRCLE;
    var LINE = done ? LINE_THROUGH : "";
    var item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i> 
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                </li>
                `;

    var position = "beforeend";
    list.insertAdjacentHTML(position, item);
}

//Completed task function
function completeToDo(element) {
    element.classList.toggle(CHECK_CIRCLE);
    element.classList.toggle(UNCHECK_CIRCLE);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

//Remove task function
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}

/* <-------------------To Do Add Event Listeners------------------->*/

//Clear the local storage with refresh button
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
})

//Add a task to list with enter key
document.addEventListener("keyup", function (even) {
    if (event.keyCode == 13) { //enter key has an ASCII code of 13
        var toDo = input.value;

        if (toDo) { //If the input isn't empty
            addToDo(toDo);

            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });

            localStorage.setItem("TODO", JSON.stringify(LIST)); //Get item from local storage 
            id++;
        }
        input.value = "";
    }
});

//Manipulate the tasks that were created
list.addEventListener("click", function (event) {
    var element = event.target; //return the clicked element inside list
    var elementJob = element.attributes.job.value; //complete or delete

    if (elementJob == "complete") {
        completeToDo(element);
    }
    else if (elementJob == "delete") {
        removeToDo(element);
    }

    localStorage.setItem("TODO", JSON.stringify(LIST)); //Retrieve task from local storage 
})
