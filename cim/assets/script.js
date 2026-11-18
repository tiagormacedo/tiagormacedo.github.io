"use strict";

// Swap the active (darker) side bar item
function swapActiveIndicator(item) {
    if (!(item instanceof Element)) return;
    for (const ind of document.querySelectorAll(".indicator")) {
        ind.classList.remove("active");
    }
    item.classList.add("active");
}

// Highlight the sidemenu entry of the section currently being read.
function sidemenuHighlight() {
    const links = new Map();
    for (const a of document.querySelectorAll(".indicator")) {
        links.set(a.hash, a);
    }

    const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                const link = links.get("#" + entry.target.id);
                if (link) swapActiveIndicator(link);
            }
        }
    }, { root: null, rootMargin: "-40% 0px -55% 0px", threshold: 0 }); //{ root: null, rootMargin: "0px", threshold: 0.33 }

    for (const section of document.querySelectorAll("section")) {
        observer.observe(section);
    }
}

// Add event listeners to menu items when the page loads
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".sidemenu ul")?.addEventListener("click", (event) => {
        const link = event.target.closest("a.indicator");
        if (link) swapActiveIndicator(link);
    });

    sidemenuHighlight();
});
