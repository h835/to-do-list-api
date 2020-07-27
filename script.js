let countId = 1;

function init() {
  const addButton = document.getElementById("add-button");
  addButton.addEventListener("click", addItemHandler);
}

function addItemHandler() {
  const todoInput = document.getElementById("todo-input");
  addTodoToDom(todoInput.value);
}

function addTodoToDom(value) {

  const list = document.getElementById("list");

  const container = document.createElement("div");
  container.classList.add("item");
  container.id = countId;

  const itemCheckbox = document.createElement("input");
  itemCheckbox.type = "checkbox";
  itemCheckbox.addEventListener('click', itemCompleted)

  const itemLabel = document.createElement("label");
  const labelText = document.createTextNode(value);
  itemLabel.appendChild(labelText);

  const itemDeleteBtn = document.createElement("button");
  const deleteText = document.createTextNode("X");
  itemDeleteBtn.append(deleteText);
  itemDeleteBtn.addEventListener('click', removeItem);
  itemDeleteBtn.id = countId;

  container.append(itemCheckbox);
  container.append(itemLabel);
  container.append(itemDeleteBtn);

  list.prepend(container);

  countId++;
}

function removeItem(event) {
  const items = document.querySelectorAll(".item");

  items.forEach(item => {
    if (event.target.id === item.id) {
      item.parentElement.removeChild(item);
    }
  })
}

function itemCompleted(event) {
  const isChecked = event.target.checked;

  const container = event.target.parentElement;
  const label = container.childNodes[1];
  console.log(label)

/*
Added moving functionality of list
*/
  if (isChecked)
  {
    container.childNodes[1].style.textDecoration = "line-through";
	container.parentNode.appendChild(container);
  }
    else 
	{
    container.childNodes[1].style.textDecoration = "none";
	container.parentNode.prepend(container);
	}
}

init();


/*
Device Battery Showing
using web api
*/
navigator.getBattery().then(function(battery) {
    updateChargeInfo();
    updateLevelInfo();

  battery.addEventListener('chargingchange', function(){
    updateChargeInfo();
  });
  function updateChargeInfo(){
    document.getElementById("ChargeInfo").textContent = "Battery on charging : " + (battery.charging ? "Yes" : "No");
  }

  battery.addEventListener('levelchange', function(){
    updateLevelInfo();
  });
  function updateLevelInfo(){
    document.getElementById("LevelInfo").textContent = "Battery Charge level: " + battery.level * 100 + "%";
  }

  battery.addEventListener('chargingtimechange', function(){
    updateChargingInfo();
  });

});

/*
Initializing third party api google map at toronto co-ordinates
*/
function initMap()
{
	var loc = {lat: 43.6532, lng: -79.3832};
	var map = new google.maps.Map(
      document.getElementById('googlemap'), {zoom: 4, center: loc})
}
