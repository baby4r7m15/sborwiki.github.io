fetch("data/nav.json")
  .then(res => res.json())
  .then(data => {
    const header = document.getElementById("wiki-header");

    header.innerHTML = `
      <div class="wiki-header-inner">
        <div class="header-left">
          <img src="${data.logo}" class="site-logo" />
          <span class="site-title">${data.siteTitle}</span>
        </div>

        <nav class="header-nav">
          ${data.menus.map((menu, index) => `
            <div class="nav-item" data-index="${index}">
              <button class="nav-label">
                ${menu.label}
              </button>

              <div class="dropdown">
                ${menu.links.map(link => `
                  <a href="${link.url}">${link.name}</a>
                `).join("")}
              </div>
            </div>
          `).join("")}
        </nav>
      </div>
    `;

    setupDropdowns();
  });

function setupDropdowns() {
  const items = document.querySelectorAll(".nav-item");

  items.forEach(item => {
    const button = item.querySelector(".nav-label");

    button.addEventListener("click", (e) => {
      e.stopPropagation();

      // Close all others
      items.forEach(i => {
        if (i !== item) i.classList.remove("active");
      });

      // Toggle current
      item.classList.toggle("active");
    });
  });

  // Close when clicking outside
  document.addEventListener("click", () => {
    items.forEach(i => i.classList.remove("active"));
  });
}
