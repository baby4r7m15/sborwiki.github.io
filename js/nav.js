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
          ${data.menus.map(menu => `
            <div class="nav-item">
              <span class="nav-label">${menu.label}</span>
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
  });
