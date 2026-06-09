export function event_when_wb_menu_is_open(lenis) {
  let scrollPosition = 0;

  function lockScroll() {
    document.body.style.overflow = "hidden";
  }

  function unlockScroll() {
    document.body.style.removeProperty("overflow");
  }

  const menuBtn = document.querySelector("[tnufa] .w-nav-button");
  const navbar_desktop_flexbox = document.querySelector(
    "[tnufa] [navbar_desktop_flexbox]"
  );
  const navbar_desktop_cta_group = document.querySelector(
    "[tnufa] [navbar_desktop_cta_group]"
  );

  if (!menuBtn) return;

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((record) => {
      if (record.attributeName !== "class") return;

      const isExpanded = record.target.getAttribute("aria-expanded") === "true";

      if (isExpanded) {
        console.log("menu is open");
        lockScroll();
        onMenuOpen();

        if (typeof lenis !== "undefined") {
          lenis.destroy();
        }
      } else {
        console.log("menu is close");
        unlockScroll();
        onMenuClose();

        //lenis.start()
        if (typeof lenis !== "undefined") {
          lenis.start();
        }
      }
    });
  });

  observer.observe(menuBtn, { attributes: true, attributeFilter: ["class"] });

  const links = gsap.utils.toArray("[offcanvas_link]").reverse();

  function onMenuOpen() {
    hideElement(navbar_desktop_flexbox);
    hideElement(navbar_desktop_cta_group);
    //document.querySelector('[navbar]')?.classList.add('active');

    const navbar = document.querySelector("[data-navbar]");

    if (navbar && !navbar.classList.contains("active")) {
      document
        .querySelector("[navbar_logo_dark]")
        ?.style.setProperty("opacity", "1");
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      gsap.set(links, { opacity: 1, y: 0 }); // מצב סופי בלי אנימציה
      return;
    }

    gsap.fromTo(
      links,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: { each: 0.15, from: "end" },
        ease: "power3.out"
      }
    );
  }

  function onMenuClose() {
    showElement(navbar_desktop_flexbox);
    showElement(navbar_desktop_cta_group);
    gsap.set(links, { opacity: 0, y: 30 });

    const navbar = document.querySelector("[data-navbar]");

    if (navbar && !navbar.classList.contains("active")) {
      document
        .querySelector("[navbar_logo_dark]")
        ?.style.removeProperty("opacity");
    }
  }

  function hideElement(element) {
    if (!element) return;
    element.style.visibility = "hidden";
    element.style.opacity = "0";
  }

  function showElement(element) {
    if (!element) return;

    element.style.visibility = "visible";
    element.style.opacity = "1";
  }
}
