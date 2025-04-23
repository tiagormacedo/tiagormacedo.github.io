// Sidebar button: show sidebar when button is clicked
function showSidebar () {
    const botao = document.querySelector(".sidebarButton");
    const menu = document.querySelector("#sidebar");
    const core = document.querySelector("#main");
    
    const botaoDisplay = window.getComputedStyle(botao).display;
    const menuTransform = window.getComputedStyle(menu).transform;
    
    if (botaoDisplay == "block" && menuTransform != "") {
        botao.style.display = "none";
        menu.style.transform = "translateX(0)";
        core.style.transform = "translate(275px)";
    }
}

// Sidebar: show hamburger button when an item is clicked (and the screen is small)
function showButton () {
    let botao = document.querySelector(".sidebarButton");
    let menu = document.querySelector("#sidebar");
    let core = document.querySelector("#main");
    
    const botaoDisplay = window.getComputedStyle(botao).display;
    const menuTransform = window.getComputedStyle(menu).transform;
    
    if (botaoDisplay === "none" && menuTransform !== "") {
        botao.style.display = "block";
        menu.style.transform = "translateX(-275px)";
        core.style.transform = "translate(0)";
    }
}

// Sidebar: swap active (darker) item
function swapActiveIndicator(item) {
    const indicators = document.querySelectorAll(".indicator");

    indicators.forEach((indicator) => {
        indicator.classList.remove("active");
    });

    if (item) {
        item.classList.add("active");
    }
}

// Sidebar: function that highlights the item corresponding to active section
function highlightItem(section) {
    // Create observer callback
    function observerCallBack (entries) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const targetId = entry.target.id;
                const indicator = document.querySelector(`[href*="#${targetId}"]`);
                swapActiveIndicator(indicator);
            }
        });
    }
    // Set observer options
    const observerOptions = {root: null, rootMargin: "0px", threshold: 0.25};
    // Create observer
    const ioObserver = new IntersectionObserver(observerCallBack, observerOptions);
    // Apply observer to section
    ioObserver.observe(section);
}

// Tabs: show and hide tabs within the same section
function openTab() {
    // Set all buttons as in-active by default
    const tabbuttons = document.querySelectorAll("div > button.tablink");
    for (let btn of tabbuttons) {
        if (btn.parentNode == this.parentNode) {
            btn.classList.remove("active");
        }
    }

    // Hide all elements with class="tabcontent" by default
    const tabs = document.querySelectorAll("div.tabcontent");
    for (let tab of tabs) {
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
    // Show sidebar (i.e. slide right)
    const sidebar = document.querySelector('#sidebar');
    if (sidebar) {
        sidebar.style.left = "0";
    }

    // Sidebar button: add an event listener to the button
    const btn = document.querySelector(".sidebarButton");
    if (btn) {
        btn.addEventListener("click", showSidebar);
    }

    // Sidebar: add event listeners to each item
    const indicators = document.querySelectorAll(".indicator");
    indicators.forEach((item) => {
        item.addEventListener("click", showButton);
    });
    
    // Sidebar: highlight item corresponding to the section I am reading
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => highlightItem(section));

    // Tab buttons: assign openTab to all tab link buttons
    const tablinkButtons = document.querySelectorAll("button.tablink");
    tablinkButtons.forEach((btn) => btn.addEventListener("click", openTab));
};
