// fetch("./products.json")
//   .then(response => response.json())
//   .then(data => createTable(data.products));

// function createTable(records) {
//   var table = document.createElement("table");
//   table.setAttribute("border", 1);
//   table.appendChild(createHeading(records[0]));
//   for (let record of records) {
//     table.appendChild(createRow(record));
//   }
//   document.getElementById("container").appendChild(table);
// }

// function createHeading(record) {
//   var row = document.createElement("tr");
//   for (let prop in record) {
//     var heading = document.createElement("th");
//     heading.innerHTML = prop.toUpperCase();
//     row.appendChild(heading);
//   }
//   return row;
// }

// function createRow(record) {
//   var row = document.createElement("tr");
//   for (let prop in record) {
//     var column = document.createElement("td");
//     column.innerHTML = record[prop];
//     row.appendChild(column);
//   }
//   return row;
// }

// Fetch data
var prodData;
var promise = fetch("./products.json");
promise
  .then(response => {
    return response.json();
  })
  .then(data => {
    prodData = data;
    createProducts(data);
  });

function fillterdProducts() {
  var search_input = document.getElementById("searchBarInput").value;
  document.getElementById("flex-item-middle-panel").innerHTML = " ";
  createProducts(
    prodData.filter(value => {
      var lowerCaseProduct = value.description.toLowerCase();
      return lowerCaseProduct.includes(search_input);
    })
  );
}

function createProducts(test) {
  document.getElementById("userName").value = localStorage.getItem("username");
  document.getElementById("userName").innerHTML = localStorage.getItem(
    "username"
  );
  document.getElementById("shopingcart").value = localStorage.getItem(
    document.getElementById("userName").value
  );
  document.getElementById("shopingcart").innerHTML = localStorage.getItem(
    document.getElementById("userName").value
  );

  // we will get the id of the middle panel here
  var middlePanel = document.getElementById("flex-item-middle-panel");
  middlePanel.className = "flex-item-middle-panel";
  for (let obj of test) {
    // div gallery has img tag only
    var gallery = document.createElement("div");
    gallery.className = "gallery";

    //create tag img and assign each URL to it
    var img = document.createElement("img");
    img.src = obj.imagesrc;
    // append this img to the parent div gallery
    gallery.appendChild(img);

    //div description has description only
    var description = document.createElement("div");
    description.className = "desc";
    description.innerHTML = getDescription(obj);
    gallery.appendChild(description);

    var btn = document.createElement("BUTTON");
    btn.className = "btn1 success";
    btn.onclick = incrementCartAmount;
    //set arrtribute for button
    btn.setAttribute("type", "button");
    btn.innerHTML = "Take me";
    description.appendChild(btn);

    middlePanel.appendChild(gallery);
  }
}
// get description
function getDescription(element) {
  return (
    `<b> ${element.name}</b>` +
    "<br>" +
    " Color: " +
    element.color +
    "<br>" +
    " Price: " +
    element.price +
    "<br>" +
    "<br>"
  );
}

function incrementCartAmount() {
  var currentUser = document.getElementById("userName").value;
  var currentCount = document.getElementById("shopingcart");
  var currentCountParsed = parseInt(currentCount.textContent);
  var nextCount = counter(currentCountParsed);
  // console.log(currentCount);
  currentCount.innerHTML = nextCount;
  console.log("next count ", nextCount);
  console.log("next user ", currentUser);
  localStorage.setItem(currentUser, nextCount);
}
function counter(currentCountParsed) {
  // var cartCount = cartCount.value;
  return currentCountParsed + 1;
}

function logout() {
  location.replace("index.html");
}
