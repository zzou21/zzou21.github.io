// this javascript contains the top menu bar that each page uses. When creating a new page, make sure to include:
	// <site-nav>
	// 	<script src="js/header.js"></script>
	// </site-nav>
// at the top of the body. see index.html for an example.

class SiteNav extends HTMLElement {
  connectedCallback() {
    // when adding a new page, add it to the navItems array below.
    // the numeral, active-page highlighting, and mobile menu toggle are all handled automatically.
    const navItems = [
      { href: "/index.html", num: "I.", label: "Home" },
      { href: "/pages/about.html", num: "II.", label: "About" },
      { href: "/pages/research.html", num: "III.", label: "Research" },
      { href: "/pages/writing.html", num: "IV.", label: "Writing" },
      { href: "/pages/cv.html", num: "V.", label: "C.V." },
      { href: "/pages/contact.html", num: "VI.", label: "Contact" },
    ];

    const navLinks = navItems
      .map(
        (item) =>
          `<a href="${item.href}"><span class="num">${item.num}</span> ${item.label}</a>`
      )
      .join("");

    this.innerHTML = `
    <header class="site-header">
        <nav class="legend" aria-label="Primary navigation">
            ${navLinks}
        </nav>
        <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
            <span></span><span></span><span></span>
        </button>
    </header>
    `;

    // treat "/page.html", "/page", and "/page/" as the same path, so the
    // active link still highlights correctly regardless of how it's linked to.
    const normalizePath = (path) => {
      let p = path.replace(/\/+$/, "") || "/";
      p = p.replace(/\.html$/, "");
      p = p.replace(/\/index$/, "") || "/";
      return p;
    };
    const currentPath = normalizePath(window.location.pathname);

    const links = this.querySelectorAll("a[href]");
    links.forEach((link) => {
      const linkPath = normalizePath(new URL(link.href, window.location.origin).pathname);
      if (currentPath === linkPath) {
        link.classList.add("is-current");
        link.setAttribute("aria-current", "page");
      }
    });

    // mobile menu toggle — lives here now since the nav owns its own markup
    const toggle = this.querySelector(".nav-toggle");
    const legend = this.querySelector(".legend");
    if (toggle && legend) {
      toggle.addEventListener("click", () => {
        const open = legend.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }
  }
}
customElements.define("site-nav", SiteNav);