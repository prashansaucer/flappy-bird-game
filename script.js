const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 600;

// 🐦 Bigger Bird (Black & White)
let bird = {
  x: 50,
  y: 150,
  width: 30,
  height: 30,
  gravity: 0.6,
  lift: -12,
  velocity: 0
};

let pipes = [];
let frame = 0;
let score = 0;

// Controls
document.addEventListener("keydown", () => {
  bird.velocity = bird.lift;
});

// Game Loop
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Bird physics
  bird.velocity += bird.gravity;
  bird.y += bird.velocity;

  // 🐦 Draw Bird (Black & White)
  ctx.fillStyle = "black";
  ctx.fillRect(bird.x, bird.y, bird.width, bird.height);

  ctx.fillStyle = "green";
  ctx.fillRect(bird.x + 10, bird.y + 10, 15, 15); // eye

  // Pipes (smaller width)
  if (frame % 90 === 0) {
    let gap = 140;
    let top = Math.random() * 250;

    pipes.push({
      x: canvas.width,
      top: top,
      bottom: top + gap,
      width: 30, // smaller pipes
      passed: false
    });
  }

  pipes.forEach((pipe, index) => {
    pipe.x -= 2;

    ctx.fillStyle = "green";
    ctx.fillRect(pipe.x, 0, pipe.width, pipe.top);
    ctx.fillRect(pipe.x, pipe.bottom, pipe.width, canvas.height);

    // Collision
    if (
      bird.x < pipe.x + pipe.width &&
      bird.x + bird.width > pipe.x &&
      (bird.y < pipe.top || bird.y + bird.height > pipe.bottom)
    ) {
      alert("Game Over! Score: " + score);
      document.location.reload();
    }

    // 🎯 Score Increase
    if (!pipe.passed && pipe.x + pipe.width < bird.x) {
      score++;
      pipe.passed = true;
    }

    // Remove pipe
    if (pipe.x < -50) {
      pipes.splice(index, 1);
    }
  });

  // 🧮 Draw Score
  ctx.fillStyle = "black";
  ctx.font = "30px Arial";
  ctx.fillText("Score: " + score, 10, 40);

  frame++;
  requestAnimationFrame(draw);
}

draw();
