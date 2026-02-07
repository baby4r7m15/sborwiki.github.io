document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("wiki-header");

  if (!header) {
    console.error("wiki-header not found");
    return;
  }

  header.innerHTML = `
    <div class="wiki-header-inner">
      <div class="header-left">
        <img src="logo.png" class="site-logo">
        <span class="site-title">Sword Blox Online Rebirth Wiki</span>
      </div>

      <nav class="header-nav">

        <div class="nav-item">
          <button class="nav-label">GAME</button>
          <div class="dropdown">
            <a href="#">Items</a>
            <a href="#">Bosses</a>
          </div>
        </div>

        <div class="nav-item">
          <button class="nav-label">COMMUNITY</button>
          <div class="dropdown">
            <a href="#">Discord</a>
          </div>
        </div>

      </nav>
    </div>
  `;

  const navItems = document.querySelectorAll(".nav-item");

  navItems.forEach(item => {
    const button = item.querySelector(".nav-label");

    button.addEventListener("click", (e) => {
      e.stopPropagation();

      navItems.forEach(i => {
        if (i !== item) i.classList.remove("active");
      });

      item.classList.toggle("active");
    });
  });

  document.addEventListener("click", () => {
    navItems.forEach(i => i.classList.remove("active"));
  });
});
