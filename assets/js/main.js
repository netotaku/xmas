var grid_item_height, grid_item_width, grid_item_top, grid_item_left, bounding_rect, end_form, inverted_values;
var fauxBox = document.getElementById('faux-box');
var gridItems = document.getElementsByClassName('card__inner');
var closeButton = document.getElementById('js-close');
CustomEase.create("xmas", "0.445, 0.05, 0.55, 0.95");

for (var i = 0; i < gridItems.length; i++) {
  gridItems[i].addEventListener('click', function(e) {
    e.preventDefault();
    start_form = this.getBoundingClientRect();
    setStartingRect(start_form);
    setFinalRect(fauxBox);
    animateFauxBox();
  });
}

closeButton.addEventListener('click', function(e) {
  e.preventDefault();
  closeFauxBox();
})

function setStartingRect(start_form) {
  fauxBox.style.width = start_form.width + 'px';
  fauxBox.style.height = start_form.height + 'px';
  fauxBox.style.left = start_form.left + 'px';
  fauxBox.style.top = start_form.top + 'px';
}

function setFinalRect(fauxBox) {
  //Clear Styling;
  fauxBox.style.cssText = '';
  fauxBox.classList.add('is-final-form');

  end_form = fauxBox.getBoundingClientRect();
  fauxBox.classList.remove('is-final-form');
}

function animateFauxBox() {
  document.body.classList.add('is-open');
  gsap.fromTo(
    fauxBox,
    {
      height: start_form.height + 'px',
      width: start_form.width + 'px',
      top: start_form.top + 'px',
      left: start_form.left + 'px',
    },
    {
      height: end_form.height + 'px',
      width: end_form.width + 'px',
      top: end_form.top + 'px',
      left: end_form.left + 'px',
      duration: 1,
      ease: 'xmas',
      onComplete: bringInContent
    }
  );
}

function closeFauxBox() {

  fauxBox.classList.add('is-animating');
  gsap.fromTo(
    fauxBox,
    {
      height: end_form.height + 'px',
      width: end_form.width + 'px',
      top: end_form.top + 'px',
      left: end_form.left + 'px',
    },
    {
      height: start_form.height + 'px',
      width: start_form.width + 'px',
      top: start_form.top + 'px',
      left: start_form.left + 'px',
      duration: 1,
      ease: "xmas",
      onComplete: exitContent
    }
  );
}

function bringInContent() {
  fauxBox.classList.add('is-final-form');
}

function exitContent() {
  //Do Cleanup
  console.log('Exiting Content');
  fauxBox.classList.remove('is-final-form', 'is-animating');
  fauxBox.style.cssText = '';
  document.body.classList.remove('is-open');
}

(function () {

  var COUNT = 300;
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  var width = window.innerWidth;
  var height = window.innerHeight;
  var i = 0;
  var active = false;

  function onResize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    ctx.fillStyle = '#FFF';

    var wasActive = active;
    active = width > 600;

    if (!wasActive && active)
      requestAnimFrame(update);
  }

  var Snowflake = function () {
    this.x = 0;
    this.y = 0;
    this.vy = 0;
    this.vx = 0;
    this.r = 0;

    this.reset();
  }

  Snowflake.prototype.reset = function() {
    this.x = Math.random() * width;
    this.y = Math.random() * -height;
    this.vy = 1 + Math.random() * 3;
    this.vx = 0.5 - Math.random();
    this.r = 1 + Math.random() * 2;
    this.o = 0.5 + Math.random() * 0.5;
  }

  var snowflakes = [], snowflake;
  for (i = 0; i < COUNT; i++) {
    snowflake = new Snowflake();
    snowflakes.push(snowflake);
  }

  function update() {

    ctx.clearRect(0, 0, width, height);

    if (!active)
      return;

    for (i = 0; i < COUNT; i++) {
      snowflake = snowflakes[i];
      snowflake.y += snowflake.vy;
      snowflake.x += snowflake.vx;

      ctx.globalAlpha = snowflake.o;
      ctx.beginPath();
      ctx.arc(snowflake.x, snowflake.y, snowflake.r, 0, Math.PI * 2, false);
      ctx.closePath();
      ctx.fill();

      if (snowflake.y > height) {
        snowflake.reset();
      }
    }

    requestAnimFrame(update);
  }

  // shim layer with setTimeout fallback
  window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function( callback ){
              window.setTimeout(callback, 1000 / 60);
            };
  })();

  onResize();
  window.addEventListener('resize', onResize, false);

  document.body.appendChild(canvas);
})();