export function countUp() {
  const counters = gsap.utils.toArray("[counter]");

  counters.forEach(elem => {
    const rawValue = elem.innerHTML.replace(/,/g, "").trim();
    const to_value = parseInt(rawValue, 10);

    elem.innerHTML = "0";
    elem.style.opacity = 1;

    let hasRun = false;  // דגל להפעלת ספירה פעם אחת

    ScrollTrigger.create({
      trigger: "[counter_up_trigger]",
      start: "top 90%",
      onEnter: () => {
        if (!hasRun) {
          runCountUp(elem, to_value);
          hasRun = true;
        }
      },
      // אם רוצים לאפס כשהגולש חוזר אחורה, אפשר להוסיף onLeaveBack:
      // onLeaveBack: () => { hasRun = false; elem.innerHTML = "0"; }
    });
  });

  function runCountUp(elem, to_value) {
    const duration = getDurationForValue(to_value);

    gsap.fromTo(elem,
      { textContent: 0 },
      {
        textContent: to_value,
        duration: duration,
        ease: "power1.out",
        snap: { textContent: 1 },
        onUpdate: function () {
          const val = Math.ceil(this.targets()[0].textContent);
          elem.innerHTML = numberWithCommas(val);
        }
      }
    );
  }

  function getDurationForValue(value) {
    const baseSpeed = 800; // מספרים לשנייה
    return Math.min(4, Math.max(1.2, value / baseSpeed));
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}
