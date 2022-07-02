let state = {};
let url = window.location.search.substring(4);
let database = [];

async function getData() {
  let data =
    "https://final-project-3c0f6-default-rtdb.europe-west1.firebasedatabase.app/" +
    url +
    ".json";
  let response = await fetch(data);
  database = await response.json();
}

function draw() {
  let cartTable = document.querySelector("#cart-container");
  let cart = localStorage.getItem("cart");
  if (cart === null) {
    cart = [];
  } else {
    cart = JSON.parse(cart);
  }
  
  let str = "";
  for (let i = 0; i < cart.length; i++) {
    str += `
        <div class="product-card">
          <h2><a href="Details.html?id=${cart[i].id}">${cart[i].title}</a></h2>
          <div>
            <h3>${cart[i].price} <span>Lei</span></h3>
            <div class="quantity">
              <button onclick="increaseValue(${cart[i].id})"><i class="fa-solid fa-plus"></i></button>
                <p>${cart[i].quantity} <span>Buc.</span></p>
              <button onclick="decreaseValue(${cart[i].id})"><i class="fa-solid fa-minus"></i></button>
            </div>
            <button type="button" onclick="localdelete(${i})" class="delete-button"><i class="fa-solid fa-trash"></i> Remove</button>
          </div>
        </div>
      `;
  }
  cartTable.innerHTML = str;
  getTotalPrice();
}

function localdelete(idx) {
  let cart = localStorage.getItem("cart");
  cart = JSON.parse(cart);
  cart.splice(idx, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  draw();
}

function getTotalPrice() {
  let total = 0;
  const totalPriceContainer = document.querySelector(".total-price");
  const cart = JSON.parse(localStorage.getItem("cart"));
  for (const item of cart) {
    total = total + item.price * item.quantity;
  }

  totalPriceContainer.innerHTML = total.toFixed(2) + " Lei";
}

function increaseValue(e) {
  const cart = JSON.parse(localStorage.getItem("cart"));
  for (const item of cart) {
    if (item.id == e) {
      if (item.quantity < Number(item.stoc)) {
        item.quantity += 1;
      } else {
        alert("Nu sunt suficiente produse in stoc!");
      }
    }
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  draw();
}

function decreaseValue(e) {
  const cart = JSON.parse(localStorage.getItem("cart"));
  for (const item of cart) {
    if (item.id == e) {
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        alert("Nu poti introduce cantitati mai mici de 1!");
      }
    }
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  draw();
}

async function order() {
  let data = await fetch(
    "https://final-project-3c0f6-default-rtdb.europe-west1.firebasedatabase.app/.json"
  );
  let response = await data.json();
  database = response;
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (cart !== []) {
    for (const item of cart) {
      for (const [i, p] of Object.entries(database)) {
        if (p && p.title === item.title && item.quantity <= Number(item.stoc)) {
          p.stoc -= item.quantity;
  
          let url =
            "https://final-project-3c0f6-default-rtdb.europe-west1.firebasedatabase.app/" +
            i +
            "/" +
            ".json";
          let response = await fetch(url, {
            method: "PATCH",
            body: JSON.stringify({
              stoc: p.stoc,
            }),
          });
        }
      }
    }
  } else {
    alert ("Cosul este gol!")
  }
  
  document.getElementById("shop-container").style.display = "none";
  document.querySelector(".place-order").classList.remove("hidden");
  localStorage.removeItem("cart");

  setTimeout(() => {
    window.location.replace("Products.html");
  }, 2000);
}
