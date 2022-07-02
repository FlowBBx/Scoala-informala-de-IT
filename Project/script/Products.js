let state = {
  boll: true,
  category: {
    0: "Audio",
    1: "Laptop",
    2: "TV",
    3: "Telefon",
  },
};

let database = {};
function openNav() {
  if (state.boll === true) {
    document.getElementById("mySidebar").style.width = "200px";
    document.getElementById("main").style.marginLeft = "200px";
    state.boll = false;
    let icon = document.querySelector(".openbtn");
    icon.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  } else {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    state.boll = true;
    let icon = document.querySelector(".openbtn");
    icon.innerHTML = '<i class="fa-solid fa-bars"></i>';
  }
}

async function getData() {
  document.querySelector("#animate").classList.remove("hidden");
  let response = await fetch(
    "https://final-project-3c0f6-default-rtdb.europe-west1.firebasedatabase.app/.json"
  );
  let transform = await response.json();
  database = transform;
  document.querySelector("#animate").classList.add("hidden");
  draw();
}
function add_cart(id) {
  let cart = localStorage.getItem("cart");
  if (cart === null) {
    cart = [];
  } else {
    cart = JSON.parse(cart);
  }
  let quantity = 1;
  let found = false;
  for (let c of cart) {
    if (c.id === id) {
      c.quantity += quantity;
      found = true;
    }
  }
  if (!found) {
    cart.push({
      ...database[id],
      quantity: quantity,
      id: id,
    });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Produsul a fost adaugat in cos!");
}

function draw() {
  let g = document.querySelectorAll(".button");
  for (let val of g) {
    val.classList.remove("active");
  }
  for (let [i, p] of Object.entries(database)) {
    let draw = document.querySelector("#onDraw");
    if (p === null) {
      continue;
    }
    draw.innerHTML += `
              <div class="divFromJS">
              <a href="Details.html?id=${i}" class="product-box">
                <img class="divFromJS_image" src=${p.image[1]}>
                <h3>${p.title}</h3>
                <div class="divFromJS_button">
                    <p>Disponibil: ${p.stoc} disponibil.</p>
                </div>
              </a>
                <div>
                  <p>Pret: ${p.price} Lei.</p>
                  <button type="button" onclick="add_cart('${i}')" class="add-to-cart-btn"><i class="fa-solid fa-cart-arrow-down"></i></button>
                </div>
              </div>
              `;
  }
}

function searchFilter(e) {
  let g = document.querySelectorAll(".button");
  for (let val of g) {
    val.classList.remove("active");
  }

  const container = document.querySelector("#onDraw");
  container.classList.add("products-container");
  container.innerHTML = "";
  for (let [i, p] of Object.entries(database)) {
    if (p && p.title.toLowerCase().includes(e.value.toLowerCase())) {
      container.innerHTML += `
        <div class="divFromJS">
          <a href="Details.html?id=${i}" class="product-box">
          <img class="divFromJS_image" src=${p.image[1]}>
          <h3>${p.title}</h3>
          <div class="divFromJS_button">
              <p>Disponibil: ${p.stoc} disponibil.</p>
          </div>
          </a>
          <div>
              <p>Pret: ${p.price} Lei.</p>
              <button type="button" onclick="add_cart('${i}')" class="add-to-cart-btn"><i class="fa-solid fa-cart-arrow-down"></i></button>
            </div>
        </div>
        `;
    }
  }
}

function hide(idx) {
  let g = document.querySelectorAll(".button");
  if (idx === 0) {
    tabCategory(0);
  } else if (idx === 1) {
    tabCategory(1);
  } else if (idx === 2) {
    tabCategory(2);
  } else if (idx === 3) {
    tabCategory(3);
  }
  for (let val of g) {
    val.classList.remove("active");
  }
  g[idx].classList.add("active");
}

function tabCategory(idx) {
  const container = document.querySelector("#onDraw");
  container.innerHTML = "";
  for (let [i, p] of Object.entries(database)) {
    if (p === null) {
      continue;
    }
    if (p.Category === state.category[idx]) {
      container.innerHTML += `
        <div class="divFromJS">
          <a href="Details.html?id=${i}" class="product-box">
          <img class="divFromJS_image" src=${p.image[1]}>
          <h3>${p.title}</h3>
          <div class="divFromJS_button">
              <p>Disponibil: ${p.stoc} disponibil.</p>
          </div>
          </a>
          <div>
              <p>Pret: ${p.price} Lei.</p>
              <button type="button" onclick="add_cart('${i}')" class="add-to-cart-btn"><i class="fa-solid fa-cart-arrow-down"></i></button>
            </div>
        </div>
        `;
    }
  }
}
