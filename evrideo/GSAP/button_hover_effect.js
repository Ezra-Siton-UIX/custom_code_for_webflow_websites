
export function button_hover_effect() {

  document.addEventListener("DOMContentLoaded", function () {
    let active = false;

    function initHoverButtons() {
      const buttons = document.querySelectorAll("[move_up_text_button]");

      buttons.forEach(button => {
        const hoverText = button.querySelector("[level_a_nav_hover_text]");
        if (!hoverText) return;

        const wrap = hoverText.querySelector("[level_b_nav_hover_wrap]");
        const firstLine = hoverText.querySelector("[level_c_nav_hover_span]");
        if (!wrap || !firstLine) return;

        // למנוע שכפול חוזר
        if (wrap.children.length < 2) {
          const clone = firstLine.cloneNode(true);
          wrap.appendChild(clone);
        }

        // חישוב גובה + תיקון נגד חיתוך
        const height = firstLine.offsetHeight + 2;
        hoverText.style.height = height + "px";
        wrap.style.transition = "transform 0.6s ease";

        // רישום events רק פעם אחת
        if (!button._hoverEventsAdded) {
          button.addEventListener("mouseenter", () => {
            wrap.style.transform = `translateY(-${height}px)`;
          });
          button.addEventListener("mouseleave", () => {
            wrap.style.transform = "translateY(0px)";
          });
          button._hoverEventsAdded = true;
        }
      });
    }

    function cleanupHoverButtons() {
      const buttons = document.querySelectorAll("[move_up_text_button]");

      buttons.forEach(button => {
        const hoverText = button.querySelector("[level_a_nav_hover_text]");
        const wrap = hoverText?.querySelector("[level_b_nav_hover_wrap]");

        if (wrap) {
          wrap.style.transform = "translateY(0px)";
          // הסר את השכפול אם נוצר
          while (wrap.children.length > 1) {
            wrap.removeChild(wrap.lastChild);
          }
        }

        if (hoverText) {
          hoverText.style.height = "auto";
        }

        // אפשר גם לבטל את ה־event listeners אם צריך (נשאיר אותם לפשטות)
      });
    }

    function handleResize() {
      const shouldBeActive = window.innerWidth >= 991;

      if (shouldBeActive && !active) {
        initHoverButtons();
        active = true;
      } else if (!shouldBeActive && active) {
        cleanupHoverButtons();
        active = false;
      }
    }

    // הפעלה ראשונית
    setTimeout(() => {
      handleResize();
    }, 0);

    // מאזין לשינויים בגודל המסך
    window.addEventListener("resize", handleResize);
  });
}

