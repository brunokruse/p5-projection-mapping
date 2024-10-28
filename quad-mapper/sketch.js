let corners1 = [];
let corners2 = [];
let selectedPoint = null;
let selectedShape = null;
let dragRadius = 10;
let lastMouseX = 0;
let lastMouseY = 0;
let img;
let vid;

function preload() {
  img = loadImage('assets/image.png');
  vid = createVideo(['assets/2021_09.mp4'], videoLoaded);
  vid.hide();
}

function videoLoaded() {
  vid.loop();
  vid.volume(0);
}

function setup() {
  createCanvas(800, 600, WEBGL);
  
  corners1 = [
    { x: -200, y: -150 },
    { x: 0, y: -150 },
    { x: 0, y: 50 },
    { x: -200, y: 50 }
  ];
  
  corners2 = [
    { x: 50, y: -100 },
    { x: 250, y: -100 },
    { x: 250, y: 100 },
    { x: 50, y: 100 }
  ];
}

function draw() {
  background(0);
  
  // Draw image quad
  texture(img);
  textureMode(NORMAL);
  beginShape();
  vertex(corners1[0].x, corners1[0].y, 0, 0, 0);
  vertex(corners1[1].x, corners1[1].y, 0, 1, 0);
  vertex(corners1[2].x, corners1[2].y, 0, 1, 1);
  vertex(corners1[3].x, corners1[3].y, 0, 0, 1);
  endShape(CLOSE);
  
  // Draw video quad
  texture(vid);
  beginShape();
  vertex(corners2[0].x, corners2[0].y, 0, 0, 0);
  vertex(corners2[1].x, corners2[1].y, 0, 1, 0);
  vertex(corners2[2].x, corners2[2].y, 0, 1, 1);
  vertex(corners2[3].x, corners2[3].y, 0, 0, 1);
  endShape(CLOSE);
  
  // Draw corner points
  push();
  noStroke();
  
  fill(255, 0, 0);
  for (let corner of corners1) {
    circle(corner.x, corner.y, dragRadius * 2);
  }
  
  fill(0, 0, 255);
  for (let corner of corners2) {
    circle(corner.x, corner.y, dragRadius * 2);
  }
  pop();
}

function mousePressed() {
  let mx = mouseX - width/2;
  let my = mouseY - height/2;
  lastMouseX = mx;
  lastMouseY = my;
  
  // First check for corner points
  for (let corner of corners1) {
    if (dist(mx, my, corner.x, corner.y) < dragRadius) {
      selectedPoint = corner;
      return;
    }
  }
  
  for (let corner of corners2) {
    if (dist(mx, my, corner.x, corner.y) < dragRadius) {
      selectedPoint = corner;
      return;
    }
  }
  
  // If no corner was clicked, check if inside either shape
  if (isPointInPoly(mx, my, corners1)) {
    selectedShape = corners1;
  } else if (isPointInPoly(mx, my, corners2)) {
    selectedShape = corners2;
  }
}

function mouseDragged() {
  let mx = mouseX - width/2;
  let my = mouseY - height/2;
  let dx = mx - lastMouseX;
  let dy = my - lastMouseY;
  
  if (selectedPoint) {
    selectedPoint.x = mx;
    selectedPoint.y = my;
  } else if (selectedShape) {
    // Move all points of the selected shape
    for (let point of selectedShape) {
      point.x += dx;
      point.y += dy;
    }
  }
  
  lastMouseX = mx;
  lastMouseY = my;
}

function mouseReleased() {
  selectedPoint = null;
  selectedShape = null;
}

// Helper function to check if a point is inside a polygon
function isPointInPoly(x, y, vertices) {
  let inside = false;
  for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
    let xi = vertices[i].x;
    let yi = vertices[i].y;
    let xj = vertices[j].x;
    let yj = vertices[j].y;
    
    let intersect = ((yi > y) != (yj > y))
        && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}