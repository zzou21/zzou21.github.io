// This javascript contains the side navigation bar that a page could use, such as the Teaching knowledge page. It mimics a table of contents on the side of a Google Doc. When needing this feature for a page, make sure to provide id="" for a header or paragraph section in the html

// <page-sidebar>
//  <script src="/assets/js/sideNavigationBar.js"></script>
// </page-sidebar>


class PageSidebar extends HTMLElement {
  connectedCallback() {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.render());
    } else {
      this.render();
    }
  }

  render() {
    // only headings with an id are collected, not <p>'s or the like
    const selector = this.getAttribute("selector") || ":is(h1, h2, h3, h4, h5, h6)[id]";
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
    if (headings.length === 0) return;

    // ---------- highlighting ----------

    let currentId = null;

    // highlight the link that points to the heading with this id
    const setActive = (id) => {
      if (id === currentId) return; // already highlighted, nothing to do
      currentId = id;
      links.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
      });
    };

    // How far from the top of the window (in px) a heading must reach before its
    // section counts as "the one being read". Raise it to switch sections sooner.
    const OFFSET = 120;

    // after a click, ignore scrolling briefly so the clicked item stays highlighted
    let ignoreScrollUntil = 0;

    // work out which section the reader is in, based on scroll position
    const updateFromScroll = () => {
      if (performance.now() < ignoreScrollUntil) return;

      // at the very bottom of the page, highlight the last heading, because a short
      // final section can never scroll far enough up to reach OFFSET
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) {
        setActive(headings[headings.length - 1].id);
        return;
      }

      // otherwise, the active section is the last heading that has scrolled past OFFSET
      let active = headings[0];
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top <= OFFSET) {
          active = heading;
        } else {
          break; // headings are in page order, so the rest are further down
        }
      }
      setActive(active.id);
    };

    // run at most once per screen refresh while scrolling, to keep scrolling smooth
    let waiting = false;
    const onScroll = () => {
      if (waiting) return;
      waiting = true;
      requestAnimationFrame(() => {
        updateFromScroll();
        waiting = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // clicking a link highlights it right away
    links.forEach((link) => {
      link.addEventListener("click", () => {
        setActive(link.getAttribute("href").slice(1));
        ignoreScrollUntil = performance.now() + 800;
      });
    });

    // starting state: the heading in the URL (e.g. page.html#archive), or wherever the page is scrolled
    const hashId = decodeURIComponent(window.location.hash.slice(1));
    if (hashId && headings.some((h) => h.id === hashId)) {
      setActive(hashId);
    } else {
      updateFromScroll();
    }
  }
}

customElements.define("page-sidebar", PageSidebar);