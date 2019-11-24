var cards = [];
var easingValue = 'M0,0 C0,0 0.02622,-0.04878 0.04666,-0.0684 0.06385,-0.0849 0.08454,-0.09768 0.10717,-0.10287 0.13569,-0.10941 0.16976,-0.11115 0.19491,-0.10241 0.21447,-0.09561 0.22941,-0.07504 0.2442,-0.05524 0.2629,-0.0302 0.27232,-0.00972 0.28636,0.02005 0.29926,0.04743 0.30648,0.06462 0.31465,0.09419 0.39138,0.37209 0.42942,0.5417 0.50584,0.81499 0.51321,0.84133 0.52026,0.85919 0.53464,0.88086 0.55434,0.91054 0.57253,0.92858 0.59902,0.95539 0.62477,0.98145 0.64255,1.00031 0.67083,1.01867 0.68903,1.0305 0.70718,1.03755 0.72875,1.03966 0.77065,1.04375 0.80403,1.04247 0.84834,1.03599 0.90606,1.02755 1,1 1,1';
var isAnimating = false;
var workScene = document.getElementById('js-scene');

document.addEventListener("DOMContentLoaded", function() {

  setUpCards();
  transitionCode();

});

var setUpCards = function() {
  cards = document.getElementsByClassName('card');

  for (var i = 0; i < cards.length; i++) {
    var current = cards[i];
    current.addEventListener('click', cardClickHandler, false);
  }
}

var cardClickHandler = function() {
  console.log('I was clicked ' + this.getAttribute('data-card-number'));

  if(!isAnimating) {
    isAnimating = true;
    gsap.to(this, {y: '-800px', duration: 1.2, ease:  CustomEase.create("custom", easingValue), onComplete: bringMainCard});
  }
}

var bringMainCard = function() {
  isAnimating = false;
  gsap.to(workScene, {y: '-87.5vh', duration: 1.2, ease:  CustomEase.create("custom", easingValue), onComplete: openCard});
}

var openCard = function() {
  workScene.classList.add('is-open');
}

var transitionCode = function() {
  function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }
    
  function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
  
  function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }
  
  function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
  
  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
  
  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }
  
  var GridToFullscreenEffect =
  /*#__PURE__*/
  function () {
    function GridToFullscreenEffect(container, items) {
      _classCallCheck(this, GridToFullscreenEffect);
  
      this.container = container;
      this.items = items;
      this.camera = null;
      this.scene = null;
      this.renderer = null;
      this.uniforms = {
        uProgress: new THREE.Uniform(0),
        uMeshScale: new THREE.Uniform(new THREE.Vector2(1, 1)),
        uMeshPosition: new THREE.Uniform(new THREE.Vector2(0, 0)),
        uViewSize: new THREE.Uniform(new THREE.Vector2(1, 1)),
        uColor: new THREE.Uniform(new THREE.Vector3(20, 20, 20))
      };
      this.animating = false;
      this.state = "grid";
      this.itemIndex = -1;
    }
  
    _createClass(GridToFullscreenEffect, [{
      key: "toGrid",
      value: function toGrid() {
        var _this = this;
  
        if (this.state === "grid" || this.isAnimating) return;
        this.animating = true;
        this.tween = gsap.to(this.uniforms.uProgress, 1, {
          value: 0,
          onUpdate: this.render.bind(this),
          onComplete: function onComplete() {
            _this.isAnimating = false;
            _this.state = "grid";
            _this.container.style.zIndex = -1;
            _this.items[_this.itemIndex].style.opacity = 1;
          }
        });
      }
    }, {
      key: "toFullscreen",
      value: function toFullscreen() {
        var _this2 = this;
  
        if (this.state === "fullscreen" || this.isAnimating) return;
        this.animating = true;
        this.container.style.zIndex = 10;
        this.items[this.itemIndex].style.opacity = 0;
        this.tween = gsap.to(this.uniforms.uProgress, 1, {
          value: 1,
          onUpdate: this.render.bind(this),
          onComplete: function onComplete() {
            _this2.isAnimating = false;
            _this2.state = "fullscreen";
  
            // _this2.toGrid();
          }
        });
      }
    }, {
      key: "init",
      value: function init() {
        var _this3 = this;
  
        this.renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.container.appendChild(this.renderer.domElement);
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
        this.camera.position.z = 50;
        this.camera.lookAt = this.scene.position;
        var viewSize = this.getViewSize();
        this.uniforms.uViewSize.value.x = viewSize.width;
        this.uniforms.uViewSize.value.y = viewSize.height;
        var segments = 128;
        var geometry = new THREE.PlaneBufferGeometry(1, 1, segments, segments); // We'll be using the shader material later on ;)
  
        var material = new THREE.ShaderMaterial({
          uniforms: this.uniforms,
          vertexShader: vertexShader,
          fragmentShader: fragmentShader,
          side: THREE.DoubleSide
        });
        this.mesh = new THREE.Mesh(geometry, material);
        this.scene.add(this.mesh);
        window.addEventListener("resize", this.onResize.bind(this));
  
        var _loop = function _loop(i) {
          var element = _this3.items[i];
          element.addEventListener("mousedown", function (ev) {
            return _this3.onGridImageClick(ev, i);
          });
        };
  
        for (var i = 0; i < this.items.length; i++) {
          _loop(i);
        }
      }
    }, {
      key: "updateMesh",
      value: function updateMesh() {
        if (this.itemIndex === -1) return;
        var item = this.items[this.itemIndex];
        var rect = item.getBoundingClientRect();
        var viewSize = this.getViewSize(); // 1. Transform pixel units to camera's view units
  
        var widthViewUnit = rect.width * viewSize.width / window.innerWidth;
        var heightViewUnit = rect.height * viewSize.height / window.innerHeight;
        var xViewUnit = rect.left * viewSize.width / window.innerWidth;
        var yViewUnit = rect.top * viewSize.height / window.innerHeight; // 2. Make units relative to center instead of the top left.
  
        xViewUnit = xViewUnit - viewSize.width / 2;
        yViewUnit = yViewUnit - viewSize.height / 2; // 3. Make the origin of the plane's position to be the center instead of top Left.
  
        var x = xViewUnit + widthViewUnit / 2;
        var y = -yViewUnit - heightViewUnit / 2; // 4. Scale and position mesh
  
        var mesh = this.mesh; // Since the geometry's size is 1. The scale is equivalent to the size.
  
        mesh.scale.x = widthViewUnit;
        mesh.scale.y = heightViewUnit;
        mesh.position.x = x;
        mesh.position.y = y;
        this.uniforms.uMeshPosition.value.x = x / widthViewUnit;
        this.uniforms.uMeshPosition.value.y = y / heightViewUnit;
        this.uniforms.uMeshScale.value.x = widthViewUnit;
        this.uniforms.uMeshScale.value.y = heightViewUnit;
        var styles = window.getComputedStyle(item);
        var color = styles.getPropertyValue("background-color");
        color = color.substring(color.indexOf("(") + 1, color.indexOf(")"));
        var rgbColors = color.split(",", 3).map(function (c) {
          return parseInt(c);
        });
        this.uniforms.uColor.value.x = rgbColors[0];
        this.uniforms.uColor.value.y = rgbColors[1];
        this.uniforms.uColor.value.z = rgbColors[2];
      }
    }, {
      key: "onGridImageClick",
      value: function onGridImageClick(ev, itemIndex) {
        // getBoundingClientRect gives pixel units relative to the top left of the pge
        this.itemIndex = itemIndex;
        this.updateMesh(); // this.render();
  
        this.toFullscreen();
      }
    }, {
      key: "setVertex",
      value: function setVertex(newVertex) {
        this.mesh.material.vertexShader = newVertex;
        this.mesh.material.needsUpdate = true;
      }
    }, {
      key: "render",
      value: function render() {
        this.renderer.render(this.scene, this.camera);
      }
    }, {
      key: "getViewSize",
      value: function getViewSize() {
        var fovInRadians = this.camera.fov * Math.PI / 180;
        var height = Math.abs(this.camera.position.z * Math.tan(fovInRadians / 2) * 2);
        return {
          width: height * this.camera.aspect,
          height: height
        };
      }
    }, {
      key: "onResize",
      value: function onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.updateMesh();
        this.render();
      }
    }]);
  
    return GridToFullscreenEffect;
  }();
  
  var leftActivation = "\n\t\tfloat activation = uv.x;\n";
  var topActivation = "\n\t\tfloat activation = 1.- uv.y;\n";
  var topLeftActivation = "\n\t\tfloat activation = (+uv.x-uv.y+1.)/2.;\n";
  var centerActivation = "\n        float maxDistance = distance(vec2(0.),vec2(0.5));\n        float dist = distance(vec2(0.), uv-0.5);\n        float activation = smoothstep(0.,maxDistance,dist);\n        \n        ";
  
  var createVertex = function createVertex(activation) {
    return "\n\tuniform float uProgress;\n\tuniform vec2 uMeshScale;\n\tuniform vec2 uMeshPosition;\n\tuniform vec2 uViewSize;\nvarying vec2 vUv;\n\n\tvoid main(){\n\t    vec3 pos = position.xyz;\n\t\t\n\t\t".concat(activation, "\n\t\t\n\t    float latestStart = 0.5;\n      \tfloat startAt = activation * latestStart;\n       float vertexProgress = smoothstep(startAt,1.,uProgress);\n       \n\t\t// Scale to page view size/page size\n\n\t    vec2 scaleToViewSize = uViewSize / uMeshScale - 1.;\n        vec2 scale = vec2(\n          1. + scaleToViewSize * vertexProgress\n        );\n        pos.xy *= scale;\n        \n        // Move towards center \n        pos.y += -uMeshPosition.y * vertexProgress;\n        pos.x += -uMeshPosition.x * vertexProgress;\n        \n         gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.);\n         vUv = uv;\n\t}\n");
  };
  
  var vertexShader = createVertex(centerActivation);
  var fragmentShader = "\nuniform vec3 uColor;\nvarying vec2 vUv;\n\tvoid main(){\n    vec3 color = uColor /255.;\n    color = mix(color, vec3(0.9,0.5,0.5), vUv.x);\n         gl_FragColor = vec4(color,1.);\n\t}\n";
  var effect = new GridToFullscreenEffect(document.getElementById("app"), Array.from(document.getElementsByClassName("item")));
  effect.init();
  var activationEles = Array.from(document.getElementsByClassName("activation-box"));
  activationEles.forEach(function (ele, i) {
    ele.addEventListener("click", function () {
      console.log("click", i);
      activationEles.forEach(function (ele, index) {
        if (index === i) {
          ele.classList.add("active");
        } else {
          ele.classList.remove("active");
        }
      });
  
      switch (3) {
        case 0:
          effect.setVertex(createVertex(leftActivation));
          break;
  
        case 1:
          effect.setVertex(createVertex(topActivation));
          break;
  
        case 2:
          effect.setVertex(createVertex(topLeftActivation));
          break;
  
        case 3:
          effect.setVertex(createVertex(centerActivation));
          break;
  
        default:
          break;
      }
    });
  });
}