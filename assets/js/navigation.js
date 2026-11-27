// This file builds the header (your name + menu) that every page uses.
// Put this at the top of <body> on every page:
//
//   <site-nav>
//     <script src="/assets/js/navigation.js"></script>
//   </site-nav>
class SiteNav extends HTMLElement {
  connectedCallback() {
    // To add a page, add a line here. The current page is highlighted automatically.
    // To make a dropdown, give an item a label and a "children" list instead of an href.
    const navItems = [
      { href: "/index.html", label: "Home" },
      { href: "/pages/about.html", label: "About/Contact" },
      // { href: "/pages/pubPres.html", label: "Publication/Presentation" },
      { href: "/pages/teaching.html", label: "Teaching" },
      { href: "/pages/historyResearch.html", label: "History Research" },
      { href: "/pages/digitalHumanities.html", label: "Digital Humanities Research" },
      { href: "/pages/cv.html", label: "CV" },
      {
        label: "Personal",
        children: [
          { href: "/pages/personals/photography.html", label: "Photography" },
          // { href: "/pages/photography.html", label: "Something" },
        ],
      },
    ];

    // build the HTML for one menu item: either a normal link or a dropdown
    const renderItem = (item) => {
      if (!item.children) {
        return `<a href="${item.href}">${item.label}</a>`;
      }

      const childLinks = item.children
        .map((child) => `<a href="${child.href}">${child.label}</a>`)
        .join("");

      return `
        <div class="dropdown">
          <button class="dropdown-toggle" aria-expanded="false">
            ${item.label} <span aria-hidden="true">▾</span>
          </button>
          <div class="dropdown-menu">${childLinks}</div>
        </div>
      `;
    };

    const navLinks = navItems.map(renderItem).join("");

    this.innerHTML = `
      <header class="site-header">
        <a class="site-name" href="/index.html">Zhihui Zou</a>
        <nav class="site-menu" aria-label="Primary navigation">
          ${navLinks}
        </nav>
      </header>
    `;

    // treat "/page.html", "/page" and "/page/" as the same page
    const normalizePath = (path) => {
      let p = path.replace(/\/+$/, "") || "/";
      p = p.replace(/\.html$/, "");
      p = p.replace(/\/index$/, "") || "/";
      return p;
    };
    const currentPath = normalizePath(window.location.pathname);

    // highlight the link for the current page
    this.querySelectorAll(".site-menu a").forEach((link) => {
      if (normalizePath(new URL(link.href).pathname) === currentPath) {
        link.classList.add("is-current");
        link.setAttribute("aria-current", "page");

        // if this link is inside a dropdown, highlight the dropdown's button too
        link.closest(".dropdown")?.querySelector(".dropdown-toggle").classList.add("is-current");
      }
    });

    // ---------- dropdown open/close ----------

    const dropdowns = this.querySelectorAll(".dropdown");

    const closeAll = () => {
      dropdowns.forEach((dropdown) => {
        dropdown.classList.remove("is-open");
        dropdown.querySelector(".dropdown-toggle").setAttribute("aria-expanded", "false");
      });
    };

    // clicking a dropdown's button opens it, or closes it if it was already open
    dropdowns.forEach((dropdown) => {
      const toggle = dropdown.querySelector(".dropdown-toggle");
      toggle.addEventListener("click", () => {
        const wasOpen = dropdown.classList.contains("is-open");
        closeAll();
        if (!wasOpen) {
          dropdown.classList.add("is-open");
          toggle.setAttribute("aria-expanded", "true");
        }
      });
    });

    // clicking anywhere outside a dropdown closes it
    document.addEventListener("click", (event) => {
      if (!event.target.closest(".dropdown")) closeAll();
    });

    // pressing Escape closes it
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeAll();
    });
  }
}

customElements.define("site-nav", SiteNav);