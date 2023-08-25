var to_do_List = []
var com_do_List = [];
var rem_List = [];
var add_Button = document.getElementById("add-button")
var todo_Input = document.getElementById("todo-input")
var delete_All_Button = document.getElementById("delete-all")
var all_To_dos = document.getElementById("all-todos");
var delete_Selected_Button = document.getElementById("delete-selected")


//event listners for add and delete
add_Button.addEventListener("click", add_in_List)
delete_All_Button.addEventListener("click", delete_All_List)
delete_Selected_Button.addEventListener("click", delete_Selected)


//event listeners for filtersk
document.addEventListener('click', (e) => {
    if (e.target.className.split(' ')[0] == 'complete' || e.target.className.split(' ')[0] == 'ci') {
        complete_To_do(e);
    }
    if (e.target.className.split(' ')[0] == 'delete' || e.target.className.split(' ')[0] == 'di') {
        delete_To_do(e)
    }

    if (e.target.id == "all") {
        view_All();
    }
    if (e.target.id == "rem") {
        view_Remaining();
    }
    if (e.target.id == "com") {
        view_Completed();
    }

})
//event listner for enter key
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        add_in_List();
    }
});


//updates the all the remaining, completed and main list
function update() {
    com_do_List = to_do_List.filter((ele) => {
        return ele.complete

    })
    rem_List = to_do_List.filter((ele) => {
        return !ele.complete
    })
    document.getElementById("r-count").innerText = to_do_List.length.toString();
    document.getElementById("c-count").innerText = com_do_List.length.toString();

}

//adds the task in main list

function add_in_List() {
    var value = todo_Input.value;
    if (value === '') {
        alert("Task cannot be empty")
        return;
    }
    to_do_List.push({
        task: value,
        id: Date.now().toString(),
        complete: false,
    });

    todo_Input.value = ""


    update();
    add_in_main(to_do_List);
}


//renders the main list and views on the main content

function add_in_main(to_do_List) {
    all_To_dos.innerHTML = ""
    to_do_List.forEach(element => {
        var x = `<li id=${element.id} class="todo-item">
    <p id="task"> ${element.complete ? `<strike>${element.task}</strike>` : element.task} </p>
    <div class="todo-actions">
                <button class="complete btn btn-success">
                    <i class=" ci bx bx-check bx-sm"></i>
                </button>

                <button class="delete btn btn-error" >
                    <i class="di bx bx-trash bx-sm"></i>
                </button>
            </div>
        </li>`
        all_To_dos.innerHTML += x
    });
}


//delete_Selected and indiviual task and update all the list
function delete_To_do(e) {
    var deleted = e.target.parentElement.parentElement.getAttribute('id');
    to_do_List = to_do_List.filter((ele) => {
        return ele.id != deleted
    })

    update();
    add_in_main(to_do_List);

}

//completes indiviaula task and updates all the list
function complete_To_do(e) {
    var completed = e.target.parentElement.parentElement.getAttribute('id');
    to_do_List.forEach((obj) => {
        if (obj.id == completed) {
            if (obj.complete == false) {
                obj.complete = true
                console.log(e.target.parentElement.parentElement)

                e.target.parentElement.parentElement.querySelector("#task").classList.add("line");
            } else {
                obj.complete = false

                e.target.parentElement.parentElement.querySelector("#task").classList.remove("line");
            }

        }
    })

    update();
    add_in_main(to_do_List);
}


//delete all the tasks
function delete_All_List(todo) {

    to_do_List = []

    update();
    add_in_main(to_do_List);

}

//deletes only completed task
function delete_Selected(todo) {

    to_do_List = to_do_List.filter((ele) => {
        return !ele.complete;
    })


    update();
    add_in_main(to_do_List);

}


// functions for filters
function view_Completed() {
    add_in_main(com_do_List);
}

function view_Remaining() {

    add_in_main(rem_List);
}
function view_All() {
    add_in_main(to_do_List);
}