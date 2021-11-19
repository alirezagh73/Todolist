"use strict"
const taskGroup = document.querySelectorAll(".taskGroup")
const url = "https://6180cdd88bfae60017adfc0d.mockapi.io/todos"
const deleteBtn = document.getElementById("saveDeleteIndex");
const btnPaginationList = document.querySelectorAll(".paginationBtn")
const spinner = document.getElementById("spinner");



async function showTask(page, size = 10) {
    spinner.classList.add("d-none");
    let taskObj;
    let response = await fetch(url);
    if (response.ok) {
        taskObj = await response.json();
    } else {
        console.log("We Have an Error");
    }

    taskObj.reverse();

    let arrayList = [];
    arrayList = taskObj.slice().splice(page * size, size);


    let queryParams = new URLSearchParams(window.location.search);

    queryParams.set("page", `${+page + 1}`);

    history.pushState(null, null, "?" + queryParams.toString());


    taskGroup.forEach((item, index) => {
        let html = ``;


        // console.log(arrayList)
        // console.log(item,index);

        for (let i = 0; i < arrayList.length; i++) {
            // console.log(arrayList[i])
            // console.log(taskObj)
            if (arrayList[i].isChecked) {
                // console.log(item.description);
                // console.log(arrayList[i].title)
                html += `<div class="row task-item">
            <li class="col-8 col-md -10 list-group-item border-0 bg-transparent my-1 ">
                <input class="form-check-input me-3" type="checkbox" id="check${(page * 10) + i}" checked onclick="saveCheckbox(${(page * 10) + i})"  value="">
           <label for="check${(page * 10) + i}">${arrayList[i].title}</label> 
           <p class="text-gray mt-1 fs-5"> <small class="text-black fs-5">Desc :</small> ${arrayList[i].description}</p>
           <p class="text-gray mt-1 fs-5"> <small class="text-black fs-5">DueDate :</small> ${arrayList[i].dueDate}</p>
            </li>
            <div class="col-4 col-md-2 edit text-end">
                <i class="fas fa-pencil-alt text-end mx-3 pt-3 text-primary " role='button' onclick=editTask(${(page * 10) + i})></i>
                <i class="far fa-trash-alt  text-danger" role='button' data-bs-toggle="modal" onclick="showModal(${(page * 10) + i})" data-bs-target="#exampleModal${(page * 10) + i}"></i>
                <div class="modal fade" id="exampleModal${(page * 10) + i}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content text-start">
            <div class="modal-header">
                <h5 class="modal-title text-danger  " id="exampleModalLabel">DELETE Modal </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                  <p>Do You want to  <span class="text-danger">delete</span> <span class="text-primary fs-3">${arrayList[i].title}</span> item?</p>
                  <p class="text-dark">Description: <span class="text-primary">${arrayList[i].description}</span></p>
                  <span class="fs-6">Due Date: <span class="text-primary">${arrayList[i].dueDate}</span></span>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal"  onclick="deleteTask()">Delete item</button>
            </div>
        </div>
    </div>
</div>
            </div>
        </div>`
            } else {
                // console.log(arrayList[i].title)
                html += `<div class="row task-item">
            <li class="col-8 col-md-10 list-group-item border-0 bg-transparent my-1 ">
                <input class="form-check-input me-3" type="checkbox" id="check${(page * 10) + i}" onclick="saveCheckbox(${(page * 10) + i})"  value="">
           <label for="check${(page * 10) + i}">${arrayList[i].title}</label>  
           <p class="text-gray mt-1 fs-5"> <small class="text-black fs-5">Desc :</small> ${arrayList[i].description}</p>
           <p class="text-gray mt-1 fs-5"> <small class="text-black fs-5">DueDate :</small> ${arrayList[i].dueDate}</p>
            </li>
            <div class="col-4 col-md-2 edit text-end">
                <i class="fas fa-pencil-alt text-end mx-3 pt-3 text-primary" role='button' onclick=editTask(${(page * 10) + i})></i>
                <i class="far fa-trash-alt text-danger" role='button' data-bs-toggle="modal" onclick="showModal(${(page * 10) + i})" data-bs-target="#exampleModal${(page * 10) + i}" ></i>
            <div class="modal fade" id="exampleModal${(page * 10) + i}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content text-start">
            <div class="modal-header">
                <h5 class="modal-title text-danger" id="exampleModalLabel">DELETE Modal</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                  <p>Do You want to  <span class="text-danger">delete</span> <span class="text-primary fs-3">${arrayList[i].title}</span> item?</p>
                  <p class="text-dark">Description: <span class="text-primary">${arrayList[i].description}</span></p>
                  <span class="fs-6">Due Date: <span class="text-primary">${arrayList[i].dueDate}</span></span>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-danger"  data-bs-dismiss="modal"  onclick="deleteTask()">Delete item</button>
            </div>
            
        </div>
    </div>
</div>
               </div>
           </div>`
                // console.log(item.description)
            }

        }
        item.innerHTML = html;

    })
    const btnPag = document.querySelectorAll('.pagination__btn');

    btnPag.forEach((elem, i) => {
        elem.addEventListener('click', () => {
            showTask(i);
            addClass(elem, btnPag);
        });
    });

}

async function editTask(index) {
    let taskObj
    let response = await fetch(url);
    if (response.ok) {
        taskObj = await response.json();
    } else {
        console.log("We Have an Error");
    }
    taskObj.reverse();


    let queryParams = new URLSearchParams(window.location.search);
    // console.log(window.location)
    queryParams.delete("page");
    queryParams.set("id", `${taskObj[index].id}`);
    console.log(window.location.href);

    history.replaceState(null, null, "index.html?" + queryParams.toString());
    location.assign(window.location.href);
}

async function saveCheckbox(index) {

    let taskObj;

    let response = await fetch(url);
    if (response.ok) {
        taskObj = await response.json();
    } else {
        console.log("We have an Error");
    }
    taskObj.reverse();
    if (taskObj[index].isChecked) {
        taskObj[index].isChecked = false;
    } else {
        taskObj[index].isChecked = true;
    }
    let myUrl = `https://6180cdd88bfae60017adfc0d.mockapi.io/todos/${taskObj[index].id}`;

    let putTask = await fetch(myUrl, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(taskObj[index]),
    });
    if (!putTask.ok) {
        console.log("We Have an Error");
    }
}

//for saving index of  selected item for deleted after show modal
function showModal(index) {
    deleteBtn.value = index;
}


async function deleteTask() {
    let taskObj;
    spinner.classList.remove("d-none");
    let deleteIndex = deleteBtn.value;
    let response = await fetch(url);
    if (response.ok) {
        taskObj = await response.json();
    } else {
        console.log("We have an Error");
    }
    taskObj.reverse();

    let myUrl = `https://6180cdd88bfae60017adfc0d.mockapi.io/todos/${taskObj[deleteIndex].id}`
    let deleteTask = await fetch(myUrl, {
        method: "DELETE",
    });
    if (!deleteTask.ok) {
        spinner.classList.add("d-none");
        console.log("We Have an Error");
    } else {
        let queryParams = new URLSearchParams(window.location.search);
        let newUrl = queryParams.get("page");
        console.log(newUrl);
        showTask(newUrl - 1);
    }

}

function paginationBtn(size = 10) {
    let btn = '';
    fetch(url)
        .then((data) => {
            return data.json();
        })
        .then((data) => {
            btnPaginationList.forEach((elem, i) => {
                for (let i = 0; i < data.length / size; i++) {
                    btn += `<button class='pagination__btn'>${i + 1}</button>`
                }
                let queries = new URLSearchParams(window.location.search);
                if (queries.get("page") > elem.childNodes.length + 1) {
                    queries.delete("page");
                    history.replaceState(null, null, "error.html?" + queries.toString());
                    location.assign(window.location.search);
                }
                elem.innerHTML = btn;
            });
        })
}

paginationBtn()


function addClass(btnElem, prevBtn) {
    prevBtn.forEach(elem => elem.classList.remove('pagination__btn-active'));
    btnElem.classList.add('pagination__btn-active');
}


showTask(0)