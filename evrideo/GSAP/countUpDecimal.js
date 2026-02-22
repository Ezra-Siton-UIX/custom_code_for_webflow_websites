export function countUpDecimal() {
  const counters = gsap.utils.toArray("[counter_decimal]");

  counters.forEach(elem => {
    elem.innerHTML = "0.00";
    elem.style.opacity = 1;

    let hasRun = false;

    ScrollTrigger.create({
      trigger: elem,
      start: "top bottom",
      onEnter: () => {
        if (!hasRun) {
          runCountUp(elem, 99.99);
          hasRun = true;
        }
      }
    });
  });

  function runCountUp(elem, to_value) {
    const obj = { val: 0 };
    const step = 0.2; // קפיצות קטנות בדרך

    gsap.to(obj, {
      val: to_value,
      duration: 2.5,
      ease: "sine.out", // הכי חלק

      onUpdate: () => {
        let rounded = Math.round(obj.val / step) * step;
        if (rounded > to_value) rounded = to_value;
        elem.innerHTML = formatNumber(rounded);
      },
      onComplete: () => {
        elem.innerHTML = formatNumber(to_value);
      }
    });
  }

  function formatNumber(x) {
    const parts = x.toFixed(2).split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }
}
