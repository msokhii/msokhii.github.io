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

/* =========================================
   COMMAND PALETTE
   ========================================= */

   const commandPalette = document.getElementById("commandPalette");
   const commandBackdrop = document.getElementById("commandBackdrop");
   const commandInput = document.getElementById("commandInput");
   
   const commandItems = Array.from(
     document.querySelectorAll(".command-item")
   );
   
   let selectedCommandIndex = 0;
   
   
   /* Open palette */
   
   function openCommandPalette() {
     if (!commandPalette) return;
   
     commandPalette.classList.add("active");
     commandPalette.setAttribute("aria-hidden", "false");
   
     document.body.style.overflow = "hidden";
   
     commandInput.value = "";
   
     filterCommands();
   
     selectedCommandIndex = 0;
     updateCommandSelection();
   
     setTimeout(() => {
       commandInput.focus();
     }, 50);
   }
   
   
   /* Close palette */
   
   function closeCommandPalette() {
     if (!commandPalette) return;
   
     commandPalette.classList.remove("active");
     commandPalette.setAttribute("aria-hidden", "true");
   
     document.body.style.overflow = "";
   }
   
   
   /* Get visible results */
   
   function getVisibleCommands() {
     return commandItems.filter(
       (item) => !item.classList.contains("command-hidden")
     );
   }
   
   
   /* Update selected command */
   
   function updateCommandSelection() {
     const visibleCommands = getVisibleCommands();
   
     commandItems.forEach((item) => {
       item.classList.remove("selected");
     });
   
     if (visibleCommands.length === 0) return;
   
     if (selectedCommandIndex >= visibleCommands.length) {
       selectedCommandIndex = 0;
     }
   
     if (selectedCommandIndex < 0) {
       selectedCommandIndex = visibleCommands.length - 1;
     }
   
     const selected = visibleCommands[selectedCommandIndex];
   
     selected.classList.add("selected");
   
     selected.scrollIntoView({
       block: "nearest"
     });
   }
   
   
   /* Search/filter */
   
   function filterCommands() {
     const searchValue = commandInput.value
       .trim()
       .toLowerCase();
   
     commandItems.forEach((item) => {
       const title =
         item.querySelector(".command-title")
           ?.textContent
           .toLowerCase() || "";
   
       const keywords =
         item.dataset.command?.toLowerCase() || "";
   
       const matches =
         title.includes(searchValue) ||
         keywords.includes(searchValue);
   
       item.classList.toggle(
         "command-hidden",
         !matches
       );
     });
   
     selectedCommandIndex = 0;
   
     updateCommandSelection();
   }
   
   
   /* ⌘K / Ctrl+K */
   
   document.addEventListener("keydown", (event) => {
   
     if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
       event.preventDefault();
   
       if (commandPalette.classList.contains("active")) {
         closeCommandPalette();
       } else {
         openCommandPalette();
       }
   
       return;
     }
   
   
     if (!commandPalette.classList.contains("active")) {
       return;
     }
   
   
     /* Escape */
   
     if (event.key === "Escape") {
       event.preventDefault();
   
       closeCommandPalette();
   
       return;
     }
   
   
     /* Arrow down */
   
     if (event.key === "ArrowDown") {
       event.preventDefault();
   
       selectedCommandIndex++;
   
       updateCommandSelection();
   
       return;
     }
   
   
     /* Arrow up */
   
     if (event.key === "ArrowUp") {
       event.preventDefault();
   
       selectedCommandIndex--;
   
       updateCommandSelection();
   
       return;
     }
   
   
     /* Enter */
   
     if (event.key === "Enter") {
       event.preventDefault();
   
       const visibleCommands = getVisibleCommands();
   
       const selected =
         visibleCommands[selectedCommandIndex];
   
       if (selected) {
         selected.click();
       }
     }
   
   });
   
   
   /* Search input */
   
   commandInput.addEventListener(
     "input",
     filterCommands
   );
   
   
   /* Click outside to close */
   
   commandBackdrop.addEventListener(
     "click",
     closeCommandPalette
   );
   
   
   /* Close after internal navigation */
   
   commandItems.forEach((item) => {
     item.addEventListener("click", () => {
       closeCommandPalette();
     });
   });

   const commandTrigger =
  document.getElementById("commandTrigger");

if (commandTrigger) {
  commandTrigger.addEventListener(
    "click",
    openCommandPalette
  );
}

/* =========================================
   CURSOR GLOW
   ========================================= */

   const cursorGlow = document.getElementById("cursorGlow");

   if (cursorGlow) {
   
     let mouseX = 0;
     let mouseY = 0;
   
     let glowX = 0;
     let glowY = 0;
   
     let animationFrame;
   
   
     function animateGlow() {
   
       /*
         The glow slightly trails behind the cursor.
         Increase 0.15 for faster movement.
         Decrease it for more delay.
       */
   
       glowX += (mouseX - glowX) * 0.15;
       glowY += (mouseY - glowY) * 0.15;
   
       cursorGlow.style.left = `${glowX}px`;
       cursorGlow.style.top = `${glowY}px`;
   
       animationFrame = requestAnimationFrame(animateGlow);
     }
   
   
     document.addEventListener("mousemove", (event) => {
   
       mouseX = event.clientX;
       mouseY = event.clientY;
   
       cursorGlow.style.opacity = "1";
   
     });
   
   
     document.addEventListener("mouseleave", () => {
   
       cursorGlow.style.opacity = "0";
   
     });
   
   
     document.addEventListener("mouseenter", () => {
   
       cursorGlow.style.opacity = "1";
   
     });
   
   
     animateGlow();
   
   }
