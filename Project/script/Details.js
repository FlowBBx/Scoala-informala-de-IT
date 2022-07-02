var swiper = new Swiper(".mySwiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

let state = {};
let database = {};
let url = window.location.search.substring(4);

async function getData() {
  document.querySelector("#animate").classList.remove("hidden");
  let data =
    "https://final-project-3c0f6-default-rtdb.europe-west1.firebasedatabase.app/" +
    url +
    ".json";
  let response = await fetch(data);
  database = await response.json();
  add_images();
  add_details();
  document.querySelector("#animate").classList.add("hidden");
}

async function add_images() {
  let test = "";
  let div = document.querySelector(".swiper-wrapper");

  if (database.image.length) {
    div.innerHTML = "";
  }

  for (i = 0; i < database.image.length; i++) {
    swiper.appendSlide(
      `<div class="swiper-slide"  role="group" aria-label="${i} / ${database.image.length}">
          <img style="object-fit: contain;" src="${database.image[i]}" />
        </div>`
    );
  }
}

function add_cart() {
  let cart = localStorage.getItem("cart");
  if (cart === null) {
    cart = [];
  } else {
    cart = JSON.parse(cart);
  }
  let quantity = document.querySelector("#quantity").value * 1;
  if (quantity <= database.stoc && quantity >= 1) {
    let found = false;
    for (let c of cart) {
      if (c.id === url) {
        c.quantity += quantity;
        found = true;
      }
    }
    if (!found) {
      cart.push({
        ...database,
        quantity: quantity,
        id: url,
      });
    }
    database.stoc -= quantity;
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Produsul a fost adaugat in cos!");
  } else {
    let q = document.querySelector("#quantity");
    console.log(q);
    if (q.value < 1) {
      alert("Valorile trebuie sa fie pozitive!");
    } else {
      alert("Nu sunt suficiente produse in stoc!");
    }
  }
}
async function add_details() {
  let div = document.querySelector("#data-container");
  div.innerHTML = `
        <div><h2>${database.title}</h2></div>
        <div class="product-bottom">
          <div class="description"><p>Descriere</p><p>${database.description}</p></div>
          <div class="product-details">
            <div>
              <div class="price"><h3>${database.price} <span>Lei</span></h3></div>
              <div class="stoc"><h5>${database.stoc} <span>Buc.</span></h5><p>In Stoc</p></div>
            </div>
            <div class="cart-box">
              <label for="quantity">Cantitate:</label>
              <div>
                <input id="quantity" type="number" value="1">
                <button type="button" onclick="add_cart()" class="add-btn"><i class="fa-solid fa-cart-arrow-down"></i>Adauga in cos</button>
              </div>
            </div>
          </div>
        </div>
    `;
}
