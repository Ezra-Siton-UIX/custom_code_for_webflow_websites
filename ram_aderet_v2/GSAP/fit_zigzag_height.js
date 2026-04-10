export function fit_zigzag_height(){
  /*######### ZIGZAG set max height and disbale sticky if the card is taller than screen height */


  // You can also apply this height to another element, e.g.:
  // document.getElementById('result').style.height = maxDivHeight + 'px';

  function findMaxDivHeight() {
    const divs = document.querySelectorAll('[sticky_card]');
    let maxHeight = 0;

    for (let i = 0; i < divs.length; i++) {
      const divHeight = divs[i].offsetHeight;
      if (divHeight > maxHeight) {
        maxHeight = divHeight;
      }
    }

    return maxHeight;
  }

  // Example usage:
  const maxDivHeight = findMaxDivHeight();
  const sticky_card_zigzags = document.querySelectorAll("[sticky_card_zigzag]");
  const sticky_cards = document.querySelectorAll("[sticky_card]");

  if(window.innerHeight < maxDivHeight){
    sticky_card_zigzags.forEach((sticky_card_zigzag) => {
      sticky_card_zigzag.style.position = "static";
      sticky_card_zigzag.style.marginBottom = "16px";
      sticky_card_zigzag.style.minHeight = "initial";
    });

  }else{
    sticky_cards.forEach((sticky_card) => {
      sticky_card.style.minHeight = maxDivHeight+"px";
    });
  }


}