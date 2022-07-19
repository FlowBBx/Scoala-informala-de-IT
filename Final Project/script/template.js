class Header extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <header>
    <div class="container">
      <div class="h-section">
        <a href="homepage.html" class="logo-container">
          <img src="images/Logo.png" class="nav_image" alt="img">
        </a>
        <button class="mobile-btn" onclick="showMobileNav()"><i class="fa-solid fa-bars"></i></button>
        <nav>
          <button class="nav-close-btn" onclick="closeNav()"><i class="fa-solid fa-xmark"></i></button>
          <a href="Products.html" class="header-btn" type="button"><i class="fa-brands fa-shopify"></i> Produse</a>
          <a href="Admin.html" class="header-btn" type="button"><i class="fa-solid fa-wrench"></i> Admin</a>
          <a href="Cart.html" class="header-btn" type="button"><i class="fa-solid fa-bucket"></i> Cos</a>
        </nav>
      </div>
      <div class="search-bar">
        <input type="text" id="lab" onkeyup="searchFilter(this)" class="nav_input" placeholder="Type your product">
        <i id="lab" class="fa-solid fa-magnifying-glass nav_search search_icon"></i>
      </div>
    </div>
  </header>
        `;
  }
}
customElements.define("header-component", Header);

window.addEventListener('resize', () => {
  const width = screen.width;
  const nav = document.querySelector('nav');
  if(width < 1024) {
    nav.classList.add('mobile-nav');
    nav.setAttribute('id', 'mobile-nav');
  } else if(width > 1024) {
    nav.classList.remove('mobile-nav');
  }
})

function showMobileNav() {
  const nav = document.getElementById('mobile-nav');
  nav.style.left = "0";
}

function closeNav() {
  const nav = document.getElementById('mobile-nav');
  nav.style.left = "-100%";
}