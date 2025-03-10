export function counter_up(){
  /* numbers */
  let counters = gsap.utils.toArray("[counter]");

  counters.forEach(function (elem) {
    let to_value = elem.innerHTML;
    ScrollTrigger.create({
      trigger: elem,
      once: true,
      start: "top bottom",
      onEnter: function () {
        console.log("on enter to countup");
        countup(elem, to_value);
      },
      //onEnterBack: function() { animateFrom(elem, -1) },
      onLeave: function () {
        console.log("onLeave to countup");
        console.log("leave");
      } // assure that the element is hidden when scrolled into view
    });
  });

  function countup(elem, to_value) {
    gsap.from(elem, { autoAlpha: 0, textContent: 0 });
    gsap.to(elem, {
      textContent: to_value,
      duration: 2.5,
      onUpdate: function () {
        this.targets()[0].innerHTML = numberWithCommas(
          Math.ceil(this.targets()[0].textContent)
        );
      },
      ease: "expo"
    });
  }

  function numberWithCommas(x) {
    return x.toString();
  }
}