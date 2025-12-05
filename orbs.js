const gradients = document.querySelectorAll(".gradients-container div");

// Randomize positions of gradient elements on load
function randomizePositions() {
    gradients.forEach((gradient) => {
        const randomX = Math.random() * (window.innerWidth - gradient.offsetWidth);
        const randomY = Math.random() * (window.innerHeight - gradient.offsetHeight);
        gradient.style.left = `${randomX}px`;
        gradient.style.top = `${randomY}px`;
    });
}

// Prevent gradients from leaving the screen
function constrainPositions() {
    gradients.forEach((gradient) => {
        const rect = gradient.getBoundingClientRect();
        const parentRect = gradient.parentElement.getBoundingClientRect(); // Constrain within parent
        if (rect.left < parentRect.left) gradient.style.left = `0px`;
        if (rect.top < parentRect.top) gradient.style.top = `0px`;
        if (rect.right > parentRect.right) gradient.style.left = `${parentRect.width - rect.width}px`;
        if (rect.bottom > parentRect.bottom) gradient.style.top = `${parentRect.height - rect.height}px`;
    });
}

// Add animation to gradients
function animateGradients() {
    gradients.forEach((gradient) => {
        gradient.style.transition = "transform 2s ease-in-out";
        const randomScale = 0.8 + Math.random() * 0.4; // Scale between 0.8 and 1.2
        gradient.style.transform = `scale(${randomScale})`;
    });
}

// Initialize positions, constrain them, and animate
window.addEventListener("load", () => {
    randomizePositions();
    constrainPositions();
    animateGradients();
});

// Re-constrain positions on window resize
window.addEventListener("resize", constrainPositions);