const yesBtn = document.getElementById("yes");
const noBtn  = document.getElementById("no");
const buttonsWrap = document.getElementById("buttons");

let yesScale = 1;
let refusals = 0;

const noTexts = [
  "T'es sûre ? 😏",
  "Vraiment vraiment ? 🥺",
  "Réfléchis encore 😳",
  "Dernière chance 😭",
  "Bon… clique oui 😌"
];
let noIndex = 0;

function enableOverlayMode(){
  // Place les deux boutons au même endroit, mais "Oui" au-dessus
  buttonsWrap.style.justifyContent = "center";

  [yesBtn, noBtn].forEach(btn => {
    btn.style.position = "absolute";
    btn.style.left = "50%";
    btn.style.top = "50%";
    btn.style.transform = "translate(-50%, -50%)";
  });

  yesBtn.style.zIndex = "10";
  noBtn.style.zIndex = "1";
}

function makeYesFullscreen(){
  yesBtn.classList.add("fullscreen");
  // On "désactive" le bouton Non visuellement et au clic
  noBtn.style.opacity = "0";
  noBtn.style.pointerEvents = "none";
}

noBtn.addEventListener("click", () => {
  refusals++;

  // Augmente plus vite (objectif: finir plein écran)
  // Progression agressive : +0.6 puis +0.75 après 6 refus
  yesScale += (refusals >= 6 ? 0.75 : 0.6);

  // A 10 refus: superposition
  if (refusals >= 10) {
    enableOverlayMode();
    yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;
    noBtn.style.transform  = `translate(-50%, -50%)`;
  } else {
    yesBtn.style.transform = `scale(${yesScale})`;

    noBtn.textContent = noTexts[noIndex % noTexts.length];
    noIndex++;

    const x = Math.random() * 280 - 140;
    const y = Math.random() * 200 - 100;
    noBtn.style.transform = `translate(${x}px, ${y}px)`;
  }

  // Seuil plein écran: soit beaucoup de refus, soit bouton très grand
  if (refusals >= 13 || yesScale >= 6.0) {
    makeYesFullscreen();
  }
});

yesBtn.addEventListener("click", () => {
  window.location.href = "success.html";
});
