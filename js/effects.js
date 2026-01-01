let effectsInitialized = false;

function initEffects() {
  if (effectsInitialized) return;
  effectsInitialized = true;

  // Enable mouse trail only on larger screens (desktop/tablet)
  if (window.innerWidth > 768) {
    document.addEventListener("mousemove", function (e) {
      const dot = document.createElement("div");
      dot.className = "trail-dot";
      dot.style.left = `${e.pageX}px`;
      dot.style.top = `${e.pageY}px`;

      const colors = [
        "rgb(140,181,222)", // base
        "#a29bfe",
        "#81ecec",
        "#fab1a0",
        "#fd79a8"
      ];
      dot.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

      document.body.appendChild(dot);
      setTimeout(() => {
        dot.remove();
      }, 1000);
    });
  }
}

window.initEffects = initEffects;
document.addEventListener('DOMContentLoaded', initEffects);

