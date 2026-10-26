const openButton = document.querySelector("#open-card");
const envelope = document.querySelector("#envelope");
const surpriseButton = document.querySelector("#surprise-button");
const surprise = document.querySelector("#surprise");
const confetti = document.querySelector("#confetti");
const status = document.querySelector("#status");

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function celebrate() {
    if (prefersReducedMotion.matches) return;

    const colors = ["#c69b59", "#8d3e50", "#541c2b", "#e5cda6", "#d98b91"];
    const fragment = document.createDocumentFragment();

    for (let index = 0; index < 42; index += 1) {
        const piece = document.createElement("span");
        piece.className = "confetti__piece";
        piece.style.left = `${Math.random() * 100}%`;
        piece.style.setProperty("--piece-color", colors[index % colors.length]);
        piece.style.setProperty("--duration", `${1.6 + Math.random() * 1.8}s`);
        piece.style.setProperty("--drift", `${Math.round(Math.random() * 150 - 75)}px`);
        piece.style.animationDelay = `${Math.random() * 0.45}s`;
        fragment.append(piece);
    }

    confetti.replaceChildren(fragment);
    window.setTimeout(() => confetti.replaceChildren(), 4200);
}

openButton.addEventListener("click", () => {
    const isOpen = envelope.classList.toggle("is-open");
    openButton.setAttribute("aria-expanded", String(isOpen));
    openButton.querySelector(".envelope__button-text").textContent = isOpen
        ? "Поздравление открыто"
        : "Открыть поздравление";
    surpriseButton.disabled = !isOpen;
    status.textContent = isOpen ? "Поздравление открыто." : "Поздравление закрыто.";

    if (isOpen) {
        celebrate();
        envelope.scrollIntoView({ behavior: prefersReducedMotion.matches ? "auto" : "smooth", block: "start" });
    } else {
        surprise.hidden = true;
        surpriseButton.setAttribute("aria-expanded", "false");
        surpriseButton.innerHTML = 'А теперь маленький сюрприз <span aria-hidden="true">↗</span>';
    }
});

surpriseButton.addEventListener("click", () => {
    if (surpriseButton.disabled) return;
    surprise.hidden = !surprise.hidden;
    surpriseButton.setAttribute("aria-expanded", String(!surprise.hidden));
    surpriseButton.innerHTML = surprise.hidden
        ? 'А теперь маленький сюрприз <span aria-hidden="true">↗</span>'
        : 'Спрятать сюрприз <span aria-hidden="true">↗</span>';
    status.textContent = surprise.hidden ? "Сюрприз скрыт." : "Сюрприз открыт.";
});
