let form = document.getElementById("form-todo");
let todo = document.querySelector(".todo-list");

let barchaTodo = [];
let editingId = null;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let text = form.text.value;

  console.log(text);
  if (text.trim() == "") {
    return;
  }
  let newData = {
    message: text,
    data: Date.now(),
    check: false,
  };

  if (editingId !== null) {
    updateData(editingId, newData);
  } else {
    addData(newData);
  }

  form.reset();
  editingId = null;
});

function addData(data) {
  fetch("https://67dbc1c61fd9e43fe475c093.mockapi.io/todo-list", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then(() => {
      getTodo();
    })
    .catch((error) => console.log(error));
}

function showTodo(data) {
  todo.innerHTML = "";
  data.forEach((value) => {
    todo.innerHTML += `
     <div class="bg-[#3d4a5e] my-3 flex items-center justify-between p-[4px_15px] mx-5 rounded-xl">
 
     <div class='flex items-center gap-[30px]'>
     <input type="checkbox"  ${
       value.check ? "checked" : ""
     } onchange="editCheck(this)" data-id="${value.id}" />
        <h2 class='text-[yellow] text-[20px] ${
          value.check ? "line-through" : ""
        }'>${value.message}</h2>
     </div>


    <div class='flex items-center gap-[20px] text-[24px] text-white'> 
    <button onclick="editTodo(${value.id}, '${
      value.message
    }')"><i class="fa-solid fa-pen-to-square"></i></button>  
    <button class="text-[red] text-[24px]" onclick="delTodo(${
      value.id
    })"><i class="fa-solid fa-trash"></i></button>
    </div>

    </div>
    `;
  });
}

function getTodo(data) {
  fetch("https://67dbc1c61fd9e43fe475c093.mockapi.io/todo-list")
    .then((res) => res.json())
    .then((data) => {
      barchaTodo = data || [];
      showTodo(barchaTodo);
    })

    .catch((error) => console.log(error));
}

function delTodo(id) {
  fetch(`https://67dbc1c61fd9e43fe475c093.mockapi.io/todo-list/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then(() => {
      getTodo();
    })
    .catch((error) => console.log(error));
}

function editTodo(id, message) {
  editingId = id;
  form.text.value = message;
}

function updateData(id, data) {
  fetch(`https://67dbc1c61fd9e43fe475c093.mockapi.io/todo-list/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then(() => {
      getTodo();
    })
    .catch((error) => console.log(error));
}
getTodo();

function editCheck(checkbox) {
  let id = checkbox.getAttribute("data-id");
  let status = checkbox.checked;
  fetch(`https://67dbc1c61fd9e43fe475c093.mockapi.io/todo-list/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ check: status }),
  })
    .then((data) => {
      getTodo();
    })
    .catch((error) => console.log(error));
}
