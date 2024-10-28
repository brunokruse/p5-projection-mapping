let corners1 = [];
let corners2 = [];
let selectedPoint = null;
let dragRadius = 10;

function setup() {
  createCanvas(800, 600);
  
  // Initialize corners for first rectangle
  corners1 = [
    { x: 100, y: 100 },  // Top-left
    { x: 300, y: 100 },  // Top-right
    { x: 300, y: 300 },  // Bottom-right
    { x: 100, y: 300 }   // Bottom-left
  ];
  
  // Initialize corners for second rectangle
  corners2 = [
    { x: 400, y: 200 },  // Top-left
    { x: 600, y: 200 },  // Top-right
    { x: 600, y: 400 },  // Bottom-right
    { x: 400, y: 400 }   // Bottom-left
  ];
}

function draw() {
  background(220);
  
  // Draw first rectangle
  fill(255, 0, 0, 100);
  beginShape();
  for (let corner of corners1) {
    vertex(corner.x, corner.y);
  }
  endShape(CLOSE);
  
  // Draw second rectangle
  fill(0, 0, 255, 100);
  beginShape();
  for (let corner of corners2) {
    vertex(corner.x, corner.y);
  }
  endShape(CLOSE);
  
  // Draw draggable points for first rectangle
  fill(255, 0, 0);
  for (let corner of corners1) {
    circle(corner.x, corner.y, dragRadius * 2);
  }
  
  // Draw draggable points for second rectangle
  fill(0, 0, 255);
  for (let corner of corners2) {
    circle(corner.x, corner.y, dragRadius * 2);
  }
}

function mousePressed() {
  // Check if we're clicking on any corner point
  for (let corner of corners1) {
    if (dist(mouseX, mouseY, corner.x, corner.y) < dragRadius) {
      selectedPoint = corner;
      return;
    }
  }
  
  for (let corner of corners2) {
    if (dist(mouseX, mouseY, corner.x, corner.y) < dragRadius) {
      selectedPoint = corner;
      return;
    }
  }
}

function mouseDragged() {
  if (selectedPoint) {
    selectedPoint.x = mouseX;
    selectedPoint.y = mouseY;
  }
}

function mouseReleased() {
  selectedPoint = null;
}