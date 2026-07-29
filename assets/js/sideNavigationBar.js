// This javascript contains the side navigation bar that a page could use, such as the Teaching knowledge page. It mimics a table of contents on the side of a Google Doc. When needing this feature for a page, make sure to provide id="" for a header or paragraph section in the html

class PageSidebar extends HTMLElement {
  connectedCallback() {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.render());
    } else {
      this.render();
    }
  }

  render() {
    const selector = this.getAttribute("selector") || ":is(h1, h2, h3, h4, h5, h6)[id]"; // the navigation bar only collects HTML tags that are header sections, not <p>'s or the like
    const title = this.getAttribute("title");

    const headings = [...document.querySelectorAll(selector)];

    this.innerHTML = `
      <link rel="stylesheet" href="/assets/css/styleForSideNavigationBar.css">
      <aside class="side-nav" aria-label="Page Navigation">
        ${title ? `<h2>${title}</h2>` : ""}
        <ul>
          ${headings
            .map((heading) => {
              const level = heading.tagName.charAt(1);
              return `<li data-level="${level}"><a href="#${heading.id}">${heading.textContent}</a></li>`;
            })
            .join("")}
        </ul>
      </aside>
    `;
    const links = [...this.querySelectorAll("a[href^='#']")];

    const setActiveLink = () => {
      const currentHash = window.location.hash || (headings[0] ? `#${headings[0].id}` : "");

      links.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === currentHash);
      });
    };

    setActiveLink();
    window.addEventListener("hashchange", setActiveLink);

    links.forEach((link) => {
      link.addEventListener("click", () => {
        links.forEach((item) => item.classList.remove("active")); // controls highlighting when clicking on a link on the navigation bar
        link.classList.add("active");
      });
    });
  }
}

customElements.define("page-sidebar", PageSidebar);