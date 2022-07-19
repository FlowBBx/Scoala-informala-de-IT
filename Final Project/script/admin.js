let state = {
  indexEdit: null,
  isInvalid: false,
};
let database = {};

function add_link(event) {
  if (event !== undefined && event !== null) {
    event.preventDefault();
  }
  let imageBut = document.querySelector(".img-label div");
  imageBut.insertAdjacentHTML(
    "afterend",
    `<div style="display: block;"><br><input type="text" id="imagine" placeholder="Imagine"></div>`
  );
}

async function getData() {
  document.querySelector("#animate").classList.remove("hidden");
  let data = await fetch(
    "https://final-project-3c0f6-default-rtdb.europe-west1.firebasedatabase.app/.json"
  );
  let response = await data.json();
  database = response;
  document.querySelector("#animate").classList.add("hidden");
  draw();
}

function images(arr) {
  for (const item of arr) {
    return `<a href="${item}">Image</a>`;
  }
}

function draw() {
  let tab = document.querySelector("#admin_table tbody");
  let theStringCode = "";
  for (let [i, p] of Object.entries(database)) {
    if (p === null) {
      continue;
    }
    if (p.image === undefined) {
    }
    theStringCode += `
            <tr>
                <td style="max-width:300px; border-spacing: 0;">
                  <p>${database[i].title}</p>
                </td>
                <td style="max-width:100px; border-spacing: 0;">
                  <p>${database[i].price} Lei.</p>
                </td>
                <td style="max-width:100px; border-spacing: 0;">
                  <p>${database[i].stoc} Buc.</p>
                 </td>
                <td style="max-width:400px; border-spacing: 0;">
                    ${
                      database[i].image
                        ? database[i].image.map(
                            (item) =>
                              `<a href="${item}" target="_blank">Image</a>`
                          )
                        : "Nicio imagine adaugata!"
                    }
                </td>
                <td style="max-width:100px; border-spacing: 0;">${
                  database[i].Category
                }</td>
                <td style="max-width:500px;" border-spacing: 0;>
                    <p> ${database[i].description} </p>
                </td>
                <td style="max-width:auto; border-spacing: 0;">
                    <button onclick="edit('${i}',event)" class="btn btn-primary edit-btn"><i class="fa-solid fa-pen"></i></button>
                    <button onclick="del('${i}',event)" class="btn btn-primary delete-btn"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        `;
    tab.innerHTML = theStringCode;
  }
}

async function add(event) {
  event.preventDefault();
  document.querySelector(".submit-button").innerHTML = "Adauga produs";
  let title = document.querySelector("#title").value;
  let pret = document.querySelector("#pret").value;
  let stoc = document.querySelector("#stoc").value;
  let imagine = document.querySelectorAll("#imagine");
  let input = [];
  for (let elements of imagine) {
    if (elements.value !== "") {
      input.push(elements.value);
    }
  }
  let categorie = document.querySelector("#categorie").value;
  let descriere = document.querySelector("#descriere").value;

  if (
    title === "" ||
    pret === "" ||
    descriere === "" ||
    categorie === "" ||
    input === "" ||
    stoc === ""
  ) {
    state.isInvalid = true;
    addError();
  } else {
    state.isInvalid = false;
    addError();
  }

  if (state.isInvalid === false) {
    if (state.isInvalid === false) {
      openCity(event, "Products");
    }
    if (state.indexEdit === null) {
      let url =
        "https://final-project-3c0f6-default-rtdb.europe-west1.firebasedatabase.app/.json";
      let response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          Category: categorie,
          description: descriere,
          image: input,
          price: pret,
          stoc: stoc,
          title: title,
        }),
      });
      resetThis();
    } else {
      let url =
        "https://final-project-3c0f6-default-rtdb.europe-west1.firebasedatabase.app/" +
        state.indexEdit +
        "/" +
        ".json";
      let response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify({
          Category: categorie,
          description: descriere,
          image: input,
          price: pret,
          stoc: stoc,
          title: title,
        }),
      });

      state.indexEdit = null;
      if (state.indexEdit === null) {
        let onedit = document.querySelector("#onedit");
        onedit.innerHTML = ``;
      }
      resetThis();
    }
  }
  await getData();
}

//reset
function resetThis() {
  document.querySelector("form").reset();
  let imageLabel = document.querySelector(".img-label");
  imageLabel.innerHTML = ``;
  imageLabel.innerHTML = `
    <label for="imagine">Link imagine:</label><br>
      <div id="tag">
        <input
        type="text"
        id="imagine"
        class="req-field"
        placeholder="Imagine"
        onchange=""
      />
      <button name="button" id="link_img" onclick="add_link(event)">+</button>
    
  </div>`;
}

async function del(idx, event) {
  event.preventDefault();
  if (confirm(`esti sigur ca vrei sa stergi linkul:${database[idx].title}`)) {
    let url = `https://final-project-3c0f6-default-rtdb.europe-west1.firebasedatabase.app/${idx}/.json`;
    let response = await fetch(url, {
      method: "DELETE",
    });
  }
  await getData();
}

async function edit(idx, event) {
  openCity(event, "Form");
  let note = document.querySelectorAll(".error");
  console.log(note);
  for (let val of note) {
    val.classList.remove("error");
  }
  document.querySelector("#h3").innerText = ``;
  document.querySelector(".submit-button").innerHTML = "Editeaza produs";
  state.indexEdit = idx;
  state.isInvalid = false;
  document.querySelector("form").reset();

  let onedit = document.querySelector("#onedit");
  onedit.innerHTML = `<button type="button" class="submit-button" onclick="cancelation()">Anulare</button>`;
  event.preventDefault();
  let element = database[idx];
  document.querySelector("#title").value = element.title;
  document.querySelector("#pret").value = Number(element.price);
  document.querySelector("#stoc").value = Number(element.stoc);
  document.querySelector("#categorie").value = element.Category;
  document.querySelector("#descriere").value = element.description;
  document.querySelectorAll("#imagine");
  let images = document.querySelectorAll("#imagine");
  for (let i = images.length; i < element.image.length; i++) {
    add_link();
  }
  images = document.querySelectorAll("#imagine");
  for (let i = 0; i < element.image.length; i++) {
    images[i].value = element.image[i];
  }
  state.indexEdit = idx;
  await getData();
}

function openCity(evt, cityName) {
  let i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace("active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

function addError() {
  valueOfInputs();
  let title = document.querySelector("#title");
  let price = document.querySelector("#pret");
  let stoc = document.querySelector("#stoc");
  let category = document.querySelector("#categorie");
  let description = document.querySelector("#descriere");

  if (state.isInvalid === true) {
    if (price.value === "" && Number(price.value) < 1) {
      price.classList.add("error");
    } else {
      price.classList.remove("error");
    }
    if (title.value === "") {
      title.classList.add("error");
    } else {
      title.classList.remove("error");
    }
    if (stoc.value === "" && Number(stoc.value) < 1) {
      stoc.classList.add("error");
    } else {
      stoc.classList.remove("error");
    }
    if (category.value === "") {
      category.classList.add("error");
    } else {
      category.classList.remove("error");
    }
    if (description.value === "") {
      description.classList.add("error");
    } else {
      description.classList.remove("error");
    }
    if (
      state.isInvalid === true ||
      (Number(stoc.value) < 1 && Number(price.value) < 1)
    ) {
      document.querySelector("#h3").innerText =
        "Va rugam completati CORECT toate campurile din formular !!! (Verificati ca la categoriile de pret si stoc, valorile sa pozitive)";
    }
  } else {
    price.classList.remove("error");
    title.classList.remove("error");
    stoc.classList.remove("error");
    category.classList.remove("error");
    description.classList.remove("error");
    document.querySelector("#h3").innerText = ``;
  }
}

function valueOfInputs() {
  let stoc = document.querySelector("#stoc");
  let price = document.querySelector("#pret");
  let text = document.querySelector("#h3");

  if (price.value < 1 || stoc.value < 1) {
    text.innerHTML = `Pretul sau stocul nu pot fi mai mici decat 1`;
    state.isInvalid = true;
  } else {
    text.innerHTML = ``;
    state.isInvalid = false;
  }

  if (price.value < 1) {
    price.classList.add("error");
    text.innerHTML = `Pretul sau stocul nu pot fi mai mici decat 1`;
  } else {
    price.classList.remove("error");
  }

  if (stoc.value < 1) {
    stoc.classList.add("error");
    text.innerHTML = `Pretul sau stocul nu pot fi mai mici decat 1`;
  } else {
    stoc.classList.remove("error");
  }
}

function cancelation() {
  resetThis();
  state.indexEdit = null;
  if (state.indexEdit === null) {
    let onedit = document.querySelector("#onedit");
    onedit.innerHTML = ``;
    document.querySelector(".submit-button").innerHTML = "Adauga produs";
  }
}
