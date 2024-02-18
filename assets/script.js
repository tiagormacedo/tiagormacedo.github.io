// Sidebar button: show sidebar when button is clicked
function showSidebar () {
    let state = [];
    state[0] = window.getComputedStyle(botao, null).display;
    state[1] = window.getComputedStyle(menu, null).transform;

    const botao = document.querySelector(".sidebarButton");
    const menu = document.querySelector("#sidebar");
    const core = document.querySelector("#main");

    if (state[0] == "block" && state[1] != "") {
        botao.style.display = "none";
        menu.style.transform = "translateX(0)";
        core.style.transform = "translate(275px)";
    }
}

// Sidebar: show hamburger button when an item is clicked (and the screen is small)
function showButton () {
    const state = [];
    state[0] = window.getComputedStyle(botao, null).display;
    state[1] = window.getComputedStyle(menu, null).transform;

    let botao = document.querySelector(".sidebarButton");
    let menu = document.querySelector("#sidebar");
    let core = document.querySelector("#main");

    if (state[0] == "none" && state[1] != "") {
        botao.style.display = "block";
        menu.style.transform = "translateX(-275px)";
        core.style.transform = "translate(0)";
    }
}

// Sidebar: swap active (darker) item
function swapActiveIndicator(item) {
    const indicators = document.querySelectorAll(".indicator");
    for (indicator of indicators) {
        indicator.classList.remove("active");
    }
    item.classList.add("active");
}

// Sidebar: function that highlights the item corresponding to active section
function highlightItem(section) {
    // Create observer callback
    function ioCallBack (entries) {
        for (entry of entries) {
            if (entry.isIntersecting) {
                const link = "#" + entry.target.id;
                const indicator = document.querySelector(`[href*= "${link}"]`);
                swapActiveIndicator(indicator);
            }
        }
    }
    // Set observer options
    let ioOptions = {root: null, rootMargin: "0px", threshold: 0.25};
    // Create observer
    let ioObserver = new IntersectionObserver(ioCallBack, ioOptions);
    // Apply observer to section
    ioObserver.observe(section);
}

// Tabs: show and hide tabs within the same section
function openTab() {
    // Set all buttons as in-active by default
    const tabbuttons = document.querySelectorAll("div > button.tablink");
    for (btn of tabbuttons) {
        if (btn.parentNode == this.parentNode) {
            btn.classList.remove("active");
        }
    }

    // Hide all elements with class="tabcontent" by default
    const tabs = document.querySelectorAll("div.tabcontent");
    for (tab of tabs) {
        if (tab.parentNode == this.parentNode.parentNode) {
            tab.classList.remove("active");
        }
    }

    // Set a specific tab button as active
    const thisTabButton = document.querySelector("div > button#" + this.id);
    thisTabButton.classList.add("active");

    // Show a specific tab content
    const thisTab = document.querySelector("div#" + this.id.slice(0, -6));
    thisTab.classList.add("active");
}


// When the page is done loading, do:
window.onload = function() {
    // Sidebar: show (i.e. slide right)
    const sidebar = document.querySelector('#sidebar');
    sidebar.style.left = "0";

    // Sidebar button: add an event listener to the button
    let btn = document.querySelector(".sidebarButton");
    btn.addEventListener("click", showSidebar);

    // Sidebar: add event listeners to each item
    const indicators = document.querySelectorAll(".indicator");
    for (item of indicators) {
        item.addEventListener("click", function () {
            showButton();
        });
    }

    // Sidebar: highlight item corresponding to the section I am reading
    const sections = document.querySelectorAll("section");
    for (section of sections) {
        highlightItem(section);
    }
    
    const tablinkButtons = document.querySelectorAll("button.tablink");
    tablinkButtons.forEach((btn) => { btn.addEventListener("click", openTab); });
};