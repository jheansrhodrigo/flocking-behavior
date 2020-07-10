const flock = [];
const flock1 = [];
const flock2 = [];
const predator = [];

let alignSlider, cohesionSlider, separationSlider;

function setup() {
  createCanvas(640, 360);
  createP("");
  alignSlider = createSlider(0, 2, 1, 0.1);
  cohesionSlider = createSlider(0, 2, 1, 0.1);
  separationSlider = createSlider(0, 2, 1, 0.1);
  createP("Alinhamento --------------- Coesão---------------Separação");

  for(let i=0; i<150; i++) {
    flock.push(new Flocking());
  }

  for(let i=0; i<150; i++) {
    flock1.push(new Flocking());
  }

  for(let i=0; i<150; i++) {
    flock2.push(new Flocking());
  }

  for(let i=0; i<5; i++) {
    predator.push(new Flocking());
  }
}

function draw() {
  background(224, 255, 255);

  for(let fk of flock) {
    fk.edges();
    fk.flock(flock);
    fk.update();
    fk.show();
  }

  for(let fk of flock1) {
    fk.edges();
    fk.flock(flock1);
    fk.update();
    fk.show1();
  }

  for(let fk of flock2) {
    fk.edges();
    fk.flock(flock2);
    fk.update();
    fk.show2();
  }

  /*for(let pr of predator) {
    pr.edges();
    pr.flock(predator);
    pr.update();
    pr.showPredator();
  }*/
}