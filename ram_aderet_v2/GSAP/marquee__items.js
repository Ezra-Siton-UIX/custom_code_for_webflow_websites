export function marquee__items(){
  // marquee__group duplicate with code
  // marquee__group duplicate with code

  // marquee__group duplicate with code
  const marquee__items = document.querySelectorAll("[marquee]");

  marquee__items.forEach((marquee__item) => {
    // select this group
    let marquee__group = marquee__item.querySelector("[marquee__group]");
    // clone
    let marquee__group_copy = marquee__group.cloneNode(true);
    // set aria
    marquee__group_copy.setAttribute("aria-hidden", "true");
    // appendChild
    marquee__item.appendChild(marquee__group_copy);
    // play the animation
    marquee__group.setAttribute("play", "true");
    marquee__group_copy.setAttribute("play", "true");
  });

  const toogle_animation_button = document.querySelector(
    "[toogle_animation_btn]"
  );

  let isPressed = true;

  if (toogle_animation_button !== null) {
  }

  toogle_animation_button?.addEventListener("click", (event) => {
    event.currentTarget.toggleAttribute("pause");
    event.currentTarget.setAttribute("aria-pressed", isPressed);

    const button_label = isPressed ? "Play" : "Pause";
    event.currentTarget.setAttribute("title", button_label);

    toogle_marquee_animation();

    isPressed = !isPressed;
  });

  function toogle_marquee_animation() {
    const marquee__groups = document.querySelectorAll("[marquee__group]");
    marquee__groups.forEach((marquee__group) => {
      marquee__group.toggleAttribute("play");
    });
  }

  const marquee__images = document.querySelectorAll("[about_hero_gallery_image]");

  marquee__images.forEach((marquee__image) => {
    marquee__image.style.opacity = 1;
  });

}