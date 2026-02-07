document.addEventListener("DOMContentLoaded", async () => {
  const header = document.getElementById("wiki-header");

  if (!header) {
    console.error("wiki-header not found");
    return;
  }

  try {
    const response = await fetch("js/nav.json");
    const data = await response.json();

    let navHTML = `
      <div class="wiki-header-inner">
        <div class="header-left">
          <img src="${data.logo}" class="site-logo" alt="Site Logo">
          <span class="site-title">${data.siteTitle}</span>
        </div>
        <nav class="header-nav">
    `;

    data.menus.forEach(menu => {
      navHTML += `
        <div class="nav-item">
          <button class="nav-label">${menu.label}</button>
          <div class="dropdown">
      `;

      menu.links.forEach(link => {
        navHTML += `
          <a href="${link.url}">${link.name}</a>
        `;
      });

      navHTML += `
          </div>
        </div>
      `;
    });

    navHTML += `
        </nav>
      </div>
    `;

    header.innerHTML = navHTML;

    // Dropdown toggle behavior
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

  } catch (error) {
    console.error("Failed to load nav.json:", error);
  }
});
