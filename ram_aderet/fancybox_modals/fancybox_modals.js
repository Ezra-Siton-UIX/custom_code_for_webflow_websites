export function fancybox_modals(lenis) {
  // EN version (Open projects in popups)

  // בוחר את כל האלמנטים עם הסלקטור 'project_card_fancybox'
  const project_card_fancyboxes = document.querySelectorAll(
    "[project_card_fancybox]",
  );

  project_card_fancyboxes.forEach((project_card_fancybox) => {
    // מוצא את התמונה שבתוך ה-element עם הסלקטור 'project_image'
    const project_image =
      project_card_fancybox.querySelector("[card_bg_image]");
    const project_name = project_card_fancybox
      .querySelector("[project_name]")
      .textContent.trim();
    const project_location = project_card_fancybox
      .querySelector("[project_location]")
      .textContent.trim();
    const project_logo = project_card_fancybox.querySelector("[project_logo]");

    const placeholderSrc =
      "https://cdn.prod.website-files.com/plugins/Basic/assets/placeholder.60f9b1840c.svg";

    let logoHTML = "";
    if (
      project_logo &&
      project_logo.src &&
      project_logo.src.trim() !== "" &&
      project_logo.src !== placeholderSrc
    ) {
      logoHTML = `<img style="
    width: 60px;
    height: 60px;
    padding: 2px;
    border-radius: 5px;
    object-fit: contain;
    background: white;
    "
    src="${project_logo.src}" alt="${project_name}" />`;
    }

    if (project_image) {
      // מוסיף ל-element את data-src עם הערך של src של התמונה
      project_card_fancybox.setAttribute("data-src", project_image.src);
      project_card_fancybox.setAttribute("data-thumb-src", project_image.src);
      project_card_fancybox.setAttribute("data-slug", project_name);
      project_card_fancybox.setAttribute(
        "data-caption",
        `

      <div style="display:flex; gap: 15px; align-items: center;">
        ${logoHTML}
      <div>
            <b style="text-align:center">${project_name}</b><br><small>${project_location}</small>
      </div>
      `,
      );
    }
  });

  Fancybox.bind("[data-fancybox='projects']", {
    // Your custom options
    hash: false,
    placeFocusBack: false,

    closeButton: false,
    autoFocus: false,
    groupAll: false,
    backdropClick: "close",
    contentClick: "next",
    compact: false,
    dragToClose: true,
    wheel: "slide",
    Images: {
      zoom: false,
      initialSize: "fit",
    },

    Toolbar: {
      display: {
        left: ["counter"],
        right: ["thumbs", "close"],
      },
    },
    Thumbs: {
      type: "classic",
    },
    on: {
      reveal: (fancybox, slide) => {
        // The content of this slide is loaded and ready to be revealed
        //lenis.stop()
        console.log(lenis);
        if (typeof lenis !== "undefined") {
          lenis.destroy();
        }
      },
      close: (fancybox, slide) => {
        // The content of this slide is loaded and ready to be revealed

        //lenis.start()
        if (typeof lenis !== "undefined") {
          lenis.start();
        }
      },
    },
  });

  // show_banner_always (Open projects in popups)

  const show_banner_always = false; // not related to session
  const time_until_modal_shows = 5000;

  Fancybox.defaults.autoFocus = false;
  Fancybox.defaults.Hash = false;

  // 1 of 2 - Modal On page Load //

  // Save data to sessionStorage
  const open_modal_auto_btn = document.querySelector("[open_modal_auto_btn]");
  const show_modal_node = document.querySelector("[show_modal]");
  const is_en = window.location.pathname.toLowerCase().includes("/en/");
  let show_modal_cms_value;

  if (show_modal_node == null || is_en) return;

  if (show_modal_node !== null) {
    show_modal_cms_value = show_modal_node.getAttribute("show_modal");

    show_modal_cms_value = show_modal_cms_value == "YES" ? true : false;
  }

  //console.log("show_modal_cms_value", show_modal_cms_value)

  // Get saved data from sessionStorage
  let banner_view = sessionStorage.getItem("banner_view");

  if (
    show_banner_always ||
    (banner_view == null &&
      window.location.pathname == "/" &&
      show_modal_cms_value)
  ) {
    //console.log("show_modal");
    setTimeout(show_modal, time_until_modal_shows);
  } else {
    //console.log("hide_modal");
  }

  const fancybox_options = {
    src: "#dialog",
    type: "inline",
    Hash: false,
    closeButton: false,
    autoFocus: false,
    dragToClose: true,
    groupAttr: false,
  };

  Fancybox.bind("[data-fancybox=fancybox_dialog]", fancybox_options);

  function show_modal() {
    Fancybox.show([fancybox_options], {
      /*## events ##*/
      on: {
        close: function () {
          sessionStorage.setItem("banner_view", "true");
          lenis.start();
        },
      },
    });

    //lenis.stop();
  } // end show_modal

  // FORM MODAL

  const fancybox_form_options = {
    src: "#form_ram_aderet",
    type: "inline",
    Hash: false,
    closeButton: false,
    autoFocus: false,
    dragToClose: true,
    groupAttr: false,
  };

  const cta_buttons = document.querySelectorAll("[navbar] [cta]"); // Select all elements with the class 'my-button'

  cta_buttons.forEach((cta_button) => {
    cta_button.addEventListener("click", () => {
      console.log("Button clicked:", cta_button.textContent);

      Fancybox.show([fancybox_form_options], {
        /*## events ##*/
        on: {
          close: function () {},
        },
      });
    });
  });
}
