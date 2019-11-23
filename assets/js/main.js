var cards = [];
var easingValue = 'M0,0 C0,0 0.02622,-0.04878 0.04666,-0.0684 0.06385,-0.0849 0.08454,-0.09768 0.10717,-0.10287 0.13569,-0.10941 0.16976,-0.11115 0.19491,-0.10241 0.21447,-0.09561 0.22941,-0.07504 0.2442,-0.05524 0.2629,-0.0302 0.27232,-0.00972 0.28636,0.02005 0.29926,0.04743 0.30648,0.06462 0.31465,0.09419 0.39138,0.37209 0.42942,0.5417 0.50584,0.81499 0.51321,0.84133 0.52026,0.85919 0.53464,0.88086 0.55434,0.91054 0.57253,0.92858 0.59902,0.95539 0.62477,0.98145 0.64255,1.00031 0.67083,1.01867 0.68903,1.0305 0.70718,1.03755 0.72875,1.03966 0.77065,1.04375 0.80403,1.04247 0.84834,1.03599 0.90606,1.02755 1,1 1,1';

document.addEventListener("DOMContentLoaded", function() {

  cards = document.getElementsByClassName('card');

  console.log(cards);

  for (var i = 0; i < cards.length; i++) {
    var current = cards[i];
    current.addEventListener('click', cardClickHandler, false);
  }
});

var cardClickHandler = function() {
  console.log('I was clicked ' + this.getAttribute('data-card-number'));
  gsap.to(this, {y: '-800px', duration: 1.2, ease:  CustomEase.create("custom", easingValue)});
}