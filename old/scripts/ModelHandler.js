var clock, container, camera, scene, renderer, controls, listener;

var ground, character;
var light;
var textureLoader = new THREE.TextureLoader();
var loader = new THREE.JSONLoader();
var isLoaded = false;
var action = {}, mixer;
var activeActionName = 'Idle';

var arrAnimations = [
  'Idle',
  'idle_2',
  'shrug',
  'Wave',
  'mathAnimation',
  'NewsFeedAnimation',
  'todoAnimation',
  'Dance',
  'Weather',
  'Weather_2'
  // 'walk',
  // 'run',
  // 'pose',
  // 'hello',
  // 'idle'
];
var actualAnimation = 0;

initCrystal()

function initCrystal () {
  clock = new THREE.Clock();

  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);

  container = document.querySelector('c-content').shadowRoot.getElementById('crystal-ctn');
  renderer.setSize(container.offsetWidth, (container.offsetWidth/16)*10);
  console.log("Init")
  container.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(60, 16/9, 0.1, 1000);
  camera.position.set(1.8, 1, 0);
  listener = new THREE.AudioListener();
  camera.add(listener);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.target = new THREE.Vector3(0, 0.6, 0);
  // Lights
  light = new THREE.AmbientLight(0xffffff, 1);
  scene.add(light);

  textureLoader.load('textures/ground.png', function (texture) {
    var geometry = new THREE.PlaneBufferGeometry(2, 2);
    geometry.rotateX(-Math.PI / 2);
    var material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
    ground = new THREE.Mesh(geometry, material);
    scene.add(ground);
  });

  // loader.load('./models/eva-animated.json', function (geometry, materials) {
  loader.load('./models/CrystalChanv10.json', function (geometry, materials) {
    materials.forEach(function (material) {
      material.skinning = true;
    });
    character = new THREE.SkinnedMesh(
      geometry,
      new THREE.MeshFaceMaterial(materials)
    );

    mixer = new THREE.AnimationMixer(character);

    // action.hello = mixer.clipAction(geometry.animations[ 0 ]);
    // action.idle = mixer.clipAction(geometry.animations[ 1 ]);
    // action.run = mixer.clipAction(geometry.animations[ 3 ]);
    // action.walk = mixer.clipAction(geometry.animations[ 4 ]);
    // action.walk = mixer.clipAction(geometry.animations[ 4 ]);
    action.Idle = mixer.clipAction(geometry.animations[0]);
    action.idle_2 = mixer.clipAction(geometry.animations[1]);
    action.shrug = mixer.clipAction(geometry.animations[2]);
    action.Wave = mixer.clipAction(geometry.animations[3]);
    action.mathAnimation = mixer.clipAction(geometry.animations[4]);
    action.NewsFeedAnimation = mixer.clipAction(geometry.animations[5]);
    action.todoAnimation = mixer.clipAction(geometry.animations[6]);
    action.Dance = mixer.clipAction(geometry.animations[7]);
    action.Weather = mixer.clipAction(geometry.animations[8]);
    action.Weather_2 = mixer.clipAction(geometry.animations[9]);

    // action.hello.setEffectiveWeight(1);
    // action.idle.setEffectiveWeight(1);
    // action.run.setEffectiveWeight(1);
    // action.walk.setEffectiveWeight(1);
    action.Idle.setEffectiveWeight(1);
    action.idle_2.setEffectiveWeight(1);
    action.shrug.setEffectiveWeight(1);
    action.Wave.setEffectiveWeight(1);
    action.mathAnimation.setEffectiveWeight(1);
    action.NewsFeedAnimation.setEffectiveWeight(1);
    action.todoAnimation.setEffectiveWeight(1);
    action.Dance.setEffectiveWeight(1);
    action.Weather.setEffectiveWeight(1);
    action.Weather_2.setEffectiveWeight(1);

    // action.hello.setLoop(THREE.LoopOnce, 0);
    // action.hello.clampWhenFinished = true;
    action.Wave.setLoop(THREE.LoopOnce, 0);
    action.Wave.clampWhenFinished = true;


    // action.hello.enabled = true;
    // action.idle.enabled = true;
    // action.run.enabled = true;
    // action.walk.enabled = true;
    action.Idle.enabled = true;
    action.idle_2.enabled = true;
    action.shrug.enabled = true;
    action.Wave.enabled = true;
    action.mathAnimation.enabled = true;
    action.NewsFeedAnimation.enabled = true;
    action.todoAnimation.enabled = true;
    action.Dance.enabled = true;
    action.Weather.enabled = true;
    action.Weather_2.enabled = true;

    scene.add(character);

    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('click', onDoubleClick, false);
    console.log('Double click to change animation');
    animate();

    isLoaded = true;

    action.Wave.play();
  });
}

function fadeAction (name) {
  var from = action[ activeActionName ].play();
  var to = action[ name ].play();

  from.enabled = true;
  to.enabled = true;

  if (to.loop === THREE.LoopOnce) {
    to.reset();
  }

  from.crossFadeTo(to, 0.3);
  activeActionName = name;
}

function onWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

var mylatesttap;
function onDoubleClick () {
  var now = new Date().getTime();
  var timesince = now - mylatesttap;
  if ((timesince < 600) && (timesince > 0)) {
    if (actualAnimation == arrAnimations.length - 1) {
      actualAnimation = 0;
    } else {
      actualAnimation++;
    }
    fadeAction(arrAnimations[actualAnimation]);

  } else {
    // too much time to be a doubletap
  }

  mylatesttap = new Date().getTime();
}

function animate () {
  requestAnimationFrame(animate);
  controls.update();
  render();
}

function render () {
  var delta = clock.getDelta();
  mixer.update(delta);
  renderer.render(scene, camera);
}
