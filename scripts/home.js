const myForm = document.forms.myform;
const formInp = document.getElementById("form-inp");
const descInp = document.getElementById("description");
const deuDateInp = document.getElementById("dueDate");
const url = "https://6180cdd88bfae60017adfc0d.mockapi.io/todos";
const addTaskBtn = document.getElementById("addtaskbtn");
const saveTaskBtn = document.getElementById("savetaskbtn");
myForm.addEventListener("submit", postTask);
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const spinner = document.getElementById("spinner");



async function checkId() {
    const urlSearchParamsEdit = new URLSearchParams(window.location.search);
    const paramsedit = Object.fromEntries(urlSearchParamsEdit.entries());

    console.log(paramsedit)
    //if parametere has id  its go on...

    if (paramsedit.id) {
        let taskObj;
        let checkArr = [];

        let response = await fetch(url);
        if (response.ok) {
            taskObj = await response.json();
        } else {
            console.log("We Have an Error");
        }
        taskObj.reverse();
        taskObj.forEach((item) => {
            checkArr.push(item.id);
        });
        if (!checkArr.includes(paramsedit.id)) {
           let queries = new URLSearchParams(window.location.search);
            queries.delete("id");
            history.replaceState(null, null, "error.html?" + queries.toString());
            location.assign(window.location.search);
        }

    }
}
checkId()




async function postTask(e) {
    e.preventDefault();
    spinner.classList.remove("d-none");
    let date = new Date();
    const addTaskInpValue = formInp.value;
    const descInpValue = descInp.value;
    const dueDateValue = deuDateInp.value;
    if (addTaskInpValue.trim() === "" || descInpValue.trim() === "" || dueDateValue === "") {
        toastThirdInit();
        spinner.classList.add("d-none");
    } else {
        let taskObj = {
            title: addTaskInpValue,
            description: descInpValue,
            createdAt: date,
            updatedAt: date,
            checked: false,
            dueDate: dueDateValue
        }

        let postingTask = await fetch(url, {
            method: "POST",
            body: JSON.stringify(taskObj),
            headers: {
                "content-type": "application/json"
            },
        });
        if (!postingTask.ok) {
            spinner.classList.add("d-none");
            toastSecondInit();
        } else {
            spinner.classList.add("d-none");
            toastFirstInit();
        }
        formInp.value = "";
        descInp.value = "";
        deuDateInp.value = "";
    }
}

if (params.id) {
    async function editTask() {
        let checkId = params.id;
        let myIndex;
        // console.log(id,index);
        let taskObj;
        let response = await fetch(url);
        if (response.ok) {
            taskObj = await response.json();
        } else {
            console.log("We Have an Error");
        }
        taskObj.reverse();

        taskObj.forEach((item, index) => {
            if (item.id == checkId) {
                return myIndex = index;
            }
        })

        formInp.value = taskObj[myIndex].title;
        descInp.value = taskObj[myIndex].description;
        deuDateInp.value = taskObj[myIndex].dueDate;
        formInp.focus();
        addTaskBtn.style.display = "none";
        saveTaskBtn.style.display = "inline-block"

    }

    editTask();
}


async function saveTask() {

    let taskObj;
    let saveindexval;
    const checkId = params.id;
    let response = await fetch(url);
    if (response.ok) {
        taskObj = await response.json();
    } else {
        console.log("We Have an Error");
    }
    taskObj.reverse();
    taskObj.forEach((item, index) => {
        if (item.id == checkId) {
            return saveindexval = index;
        }
    })


    spinner.classList.remove("d-none");
    taskObj[saveindexval].title = formInp.value;
    taskObj[saveindexval].description = descInp.value;
    taskObj[saveindexval].dueDate = deuDateInp.value;
    taskObj[saveindexval].updatedAt = new Date();
    let myUrl = `https://6180cdd88bfae60017adfc0d.mockapi.io/todos/${taskObj[saveindexval].id}`
    let putTask = await fetch(myUrl, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(taskObj[saveindexval]),
    });

    if (putTask.status === 200) {
        setTimeout(() => {

            let queryParams = new URLSearchParams(window.location.search);
            queryParams.delete("id");
            history.replaceState(null, null, "index.html?" + queryParams.toString());
        }, 500);
        spinner.classList.add("d-none");
        formInp.value = "";
        descInp.value = "";
        deuDateInp.value = "";
        addTaskBtn.style.display = "inline-block";
        saveTaskBtn.style.display = "none";
        toastFourthInit();
    } else {
        spinner.classList.add("d-none");
        queries = new URLSearchParams(window.location.search);
        queries.delete("id");
        history.replaceState(null, null, "error.html?" + queries.toString())
        location.assign(window.location.search)
    }

}

function toastFirstInit() {
    let myToast = document.querySelector(".toast.toast-first");
    let toastAlert = new bootstrap.Toast(myToast);
    toastAlert.show();
}

function toastSecondInit() {
    let myToast = document.querySelector(".toast.toast-second");
    let toastAlert = new bootstrap.Toast(myToast);
    toastAlert.show();
}

function toastThirdInit() {
    let myToast = document.querySelector(".toast.toast-third");
    let toastAlert = new bootstrap.Toast(myToast);
    toastAlert.show();
}

function toastFourthInit() {
    let myToast = document.querySelector(".toast.toast-fourth");
    let toastAlert = new bootstrap.Toast(myToast);
    toastAlert.show();
}