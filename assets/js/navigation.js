// This file builds the header (your name + menu) that every page uses.
// Put this at the top of <body> on every page:
//
//   <site-nav>
//     <script src="/assets/js/navigation.js"></script>
//   </site-nav>

class SiteNav extends HTMLElement {
  connectedCallback() {
    // To add a page, add a line here. The current page is highlighted automatically.
    const navItems = [
      { href: "/index.html", label: "Home" },
      { href: "/pages/about.html", label: "About/Contact" },
      // { href: "/pages/pubPres.html", label: "Publication/Presentation" },
      { href: "/pages/teaching.html", label: "Teaching" },
      { href: "/pages/digitalHumanities.html", label: "Digital Humanities Research" },
      { href: "/pages/cv.html", label: "CV" },
    ];

    const navLinks = navItems
      .map((item) => `<a href="${item.href}">${item.label}</a>`)
      .join("");

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

    this.querySelectorAll(".site-menu a").forEach((link) => {
      if (normalizePath(new URL(link.href).pathname) === currentPath) {
        link.classList.add("is-current");
        link.setAttribute("aria-current", "page");
      }
    });
  }
}

customElements.define("site-nav", SiteNav);
