class Flocking {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(random(2, 4));
    this.acceleration = createVector();
    this.maxForce = 1;
    this.maxSpeed = 4;
  }

  edges() {
    if(this.position.x > width) {
      this.position.x = 0;
    }else if(this.position.x < 0) {
      this.position.x = width;
    }

    if(this.position.y > height) {
      this.position.y = 0;
    }else if(this.position.y < 0) {
      this.position.y = height;
    }
  }

  // Alignment
  align(flocks) {
    let perceptionRadius = 50;
    let steering = createVector();
    let total = 0;

    for(let other of flocks) {
      let distance = dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      );

      if(other != this && distance < perceptionRadius) {
        steering.add(other.velocity);
        total++;
      }
    }

    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }

    return steering;
  }

  // Cohesion
  cohesion(flocks) {
    let perceptionRadius = 100;
    let steering = createVector();
    let total = 0;

    for(let other of flocks) {
      let distance = dist(
        this.position.x, 
        this.position.y, 
        other.position.x,
        other.position.y
      );

      if(other != this && distance < perceptionRadius) {
        steering.add(other.position);
        total++;
      }
    }

    if(total > 0) {
      steering.div(total);
      steering.sub(this.position);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }

    return steering;
  }

  // Separation
  separation(flocks) {
    let perceptionRadius = 50;
    let steering = createVector();
    let total = 0;

    for(let other of flocks) {
      let distance = dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      );

      if(other != this && distance < perceptionRadius) {
        let diff = p5.Vector.sub(this.position, other.position);

        diff.div(distance * distance);
        steering.add(diff);
        total++;
      }
    }

    if(total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }

    return steering;
  }

  flock(flocks) {
    let alignment = this.align(flocks);
    let cohesion = this.cohesion(flocks);
    let separation = this.separation(flocks);

    alignment.mult(alignSlider.value());
    cohesion.mult(cohesionSlider.value());
    separation.mult(separationSlider.value());
    
    this.acceleration.add(alignment);
    this.acceleration.add(cohesion);
    this.acceleration.add(separation);
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.acceleration.mult(0);
  }

  show() {
    strokeWeight(8);
    stroke(128, 0, 0);
    point(this.position.x, this.position.y);
  }
  
  show1() {
    strokeWeight(10);
    stroke(120, 230, 170);
    point(this.position.x, this.position.y);
  }

  show2() {
    strokeWeight(12);
    stroke(100, 40, 110);
    point(this.position.x, this.position.y);
  }

  /*showPredator() {
    strokeWeight(18);
    stroke(10);
    point(this.position.x, this.position.y);
  }*/
}