const form = document.getElementById("input-form");
const input = document.getElementById("input-value");

const container = document.querySelector(".list-container");
const listItems = document.querySelector(".list-items");

const clearBtn = document.querySelector(".clearBtn");

alertDiv = document.querySelector(".feedback");

const addNewItem = (e) => {
  e.preventDefault();
  console.log("click");

  const newItem = input.value;
  console.log("New Item:", newItem);

  //create Id
  const id = new Date().getTime().toString();
  console.log("Id:", id);

  if (newItem !== "") {
    const newDivEl = document.createElement("div");
    console.log("New div:", newDivEl);

    newDivEl.classList.add(
      "item",
      "my-3",
      "d-flex",
      "justify-content-between",
      "p-2"
    );

    //add id
    const attr = document.createAttribute("data-id");
    attr.value = id;
    newDivEl.setAttributeNode(attr);

    newDivEl.innerHTML = ` <h5 class="item-title text-capitalize">${newItem}</h5>
        <span class="remove-icon text-danger"><i class="fas fa-trash"></i></span>`;

    const trashButton = newDivEl.querySelector(".remove-icon");
    console.log(trashButton);

    //Add event Listener
    trashButton.addEventListener("click", removeItem);

    //AppendChild
    listItems.appendChild(newDivEl);

    //Alert

    displayAlert("Item added to the list", "success");

    //Add to local Storage
    // addToLocalStorage(id,newItem);

    //set back to default
    setBackToDefault();
  } else {
    displayAlert("Please enter value", "danger");
  }

  //   *******************************************

  function removeItem(e) {
    console.log("click");

    const element = e.currentTarget.parentElement; //I use currentTarget because I want access the parent Element not the icon.
    console.log(element);
    const id = element.dataset.id;
    listItems.removeChild(element);

    if (listItems.children.length === 0) {
      container.remove("clearBtn");
    }
    displayAlert("Item removed", "danger");
    setBackToDefault();
    //remove from Local Storage
    // removeFromLocalStorage(id)
  }
};

function clearList(e) {
  console.log("click");
  //   listItems.textContent = "";

  //Another way
  items = document.querySelectorAll(".item");
  console.log(items);

  if (items.length > 0) {
    items.forEach((item) => {
      listItems.removeChild(item);
    });
  }
  container.remove("clearBtn");
  displayAlert("empty list", "danger");
  localStorage.removeItem("list");
  setBackToDefault();
}

//set back to default
function setBackToDefault() {
  console.log("set back to default");
  input.value = "";
}

//display alert
function displayAlert(text, action) {
  alertDiv.textContent = text;
  alertDiv.classList.add(`alert-${action}`, "showItem");
  //remove Alert
  setTimeout(function () {
    alertDiv.classList.remove(`alert-${action}`, "showItem");
  }, 3000);
}

// ******** LOCAL STORAGE *****************

function addToLocacStorage(id, value) {
  console.log("added to local Storage");
}

function removeFromLocalStorage(id) {
  console.log("removed from local Storage");
}

// ******** EVENT LISTENERS ***************

form.addEventListener("submit", addNewItem);

clearBtn.addEventListener("click", clearList);
