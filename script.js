const phrases = [
  "Mathematics · Software · Research",
  "Algorithms · Systems · Computing",
  "Theory → Implementation"
];

const typedText = document.getElementById("typed-text");

if (typedText) {
  let phraseIndex = 0;
  let charIndex = phrases[0].length;
  let deleting = true;

  function typeLoop() {
    const phrase = phrases[phraseIndex];

    if (deleting) {
      charIndex--;
      typedText.textContent = phrase.slice(0, charIndex);

      if (charIndex <= 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeLoop, 500);
        return;
      }
    } else {
      const nextPhrase = phrases[phraseIndex];
      charIndex++;
      typedText.textContent = nextPhrase.slice(0, charIndex);

      if (charIndex >= nextPhrase.length) {
        deleting = true;
        setTimeout(typeLoop, 1600);
        return;
      }
    }

    setTimeout(typeLoop, deleting ? 35 : 60);
  }

  setTimeout(typeLoop, 1200);
}

document.querySelectorAll(".glow-card").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);
  });
});

const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}
