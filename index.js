const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const addButton = document.querySelector(".button");

const TODO = "red-color";
const IN_PROGRESS = "yellow-color";
const DONE = "green-color";
const STATUS = [`${TODO}`, `${IN_PROGRESS}`, `${DONE}`];

let data = localStorage.getItem("TODO");

let toDoList = [];
let id;
console.log(toDoList);
const loadList = (array) => {
  array.forEach((element) => {
    addToDo(element.name, element.ID, element.statusID, element.remove);
  });
};

if (data) {
  toDoList = JSON.parse(data);
  id = toDoList.length;
  loadList(toDoList);
  console.log(toDoList);
} else {
  toDoList = [];
  id = 0;
}

// Show todays date
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

clear.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});

function addToDo(toDo, id, statusID, remove) {
  if (remove) return;

  const text = `<li class="item">
    <i class="fas fa-circle ${STATUS[statusID]} co" job="complete" id="${id}"></i>
    <p class="text">${toDo}</p>
    <i class="de fa fa-trash" job="remove" id="${id}"></i>
  </li>`;

  const position = "beforeend";
  list.insertAdjacentHTML(position, text);
}

const get = () => {
  const toDo = input.value;
  if (toDo) {
    addToDo(toDo, id, 0, false);
    toDoList.push({
      name: toDo,
      ID: id,
      statusID: 0,
      remove: false,
    });
    id++;
    localStorage.setItem("TODO", JSON.stringify(toDoList));
  };
  input.value = "";
};


document.addEventListener("keyup", (e) => {
  if (e.keyCode == 13) {
      get();
    }
});

addButton.addEventListener("click", () => {
  if (input.value != "") 
    get();
})




const completeToDo = (element) => {
  let statusID = toDoList[element.id].statusID;

  if (statusID == 2)
    // DONE ALREADY
    return;

  element.classList.toggle(STATUS[statusID++]);
  element.classList.toggle(STATUS[statusID]);

  toDoList[element.id].statusID++;
};

const removeToDo = (element) => {
  element.parentNode.parentNode.removeChild(element.parentNode);

  toDoList[element.id].remove = true;
};

list.addEventListener("click", (e) => {
  const element = e.target;
  const elementJob = element.attributes.job.value;

  if (elementJob == "complete") {
    completeToDo(element);
  }

  if (elementJob == "remove") {
    removeToDo(element);
  }

  localStorage.setItem("TODO", JSON.stringify(toDoList));
});
