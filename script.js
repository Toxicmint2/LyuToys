
document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("gallery-container");
    for (let i = 1; i <= 20; i++) {
        const img = document.createElement("img");
        img.src = `images/${i}.jpg`;
        img.onerror = () => img.remove(); // remove if not found
        container.appendChild(img);
    }
});
