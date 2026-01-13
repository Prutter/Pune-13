let url = "https://jsonplaceholder.typicode.com/todos";

let arr = []
let getTodos = async () => {
    let tempData = await fetch(url);
    arr = await tempData.json();
    createAllTodos(arr);
}
let tbody = document.getElementsByTagName("tbody")[0];
let btn = document.getElementById("gettodos");
btn.addEventListener("click", getTodos);

function createAllTodos(arr) {
    tbody.innerHTML = null;
    for(let i=0;i<arr.length;i++) {
        createRow(arr[i], i);
    }
}

function createRow(todo, i) {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    td1.innerText = i+1;
    let td2 = document.createElement("td");
    td2.innerText = todo.title;
    let td3 = document.createElement("td");
    td3.innerText = todo.completed;
    if(todo.completed == true)
        tr.style.backgroundColor = "green"
    else 
        tr.style.backgroundColor = "red"

    let td4 = document.createElement("td");
    let button = document.createElement("button");
    button.innerText = "Change Status"
    button.addEventListener("click", function() {
        changeStatus(todo);
    });
    td4.append(button);

    let td5 = document.createElement("td");
    let td5b = document.createElement("button");
    td5b.innerText = "Delete Task"
    td5b.addEventListener("click", function(){
        deleteRow(i);
    });
    td5.append(td5b);
    tr.append(td1,td2,td3,td4, td5);
    tbody.append(tr);
}

function changeStatus(event) {
    console.log(event)
    event.completed = !event.completed;
    createAllTodos(arr)
}

function deleteRow(i) {
    let target = event.target.parentNode.parentNode;
    let ans = confirm("Do you want to delete the row?");
    if(ans == true) {
        target.remove();
        arr.splice(i,1);
    }else {
        alert("Okay understood");
    }
    createAllTodos(arr)
}

let com = document.getElementById("com");
let uncom = document.getElementById("uncom");
com.addEventListener("click", getAllCompletedtask);

function getAllCompletedtask() {
    let brr = arr.filter(e => e.completed == true);
    createAllTodos(brr);
}
uncom.addEventListener("click", getAllUncompletedtask);

function getAllUncompletedtask() {
    let brr = arr.filter(e => e.completed == false);
    createAllTodos(brr);
}