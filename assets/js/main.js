// Sidebar button: show sidebar when button is clicked
function showSidebar () {
    var state = [];
    var botao = document.querySelector(".sidebarButton");
    var menu = document.querySelector("#sidebar");
    var core = document.querySelector("#main");

    state[0] = window.getComputedStyle(botao, null).display;
    state[1] = window.getComputedStyle(menu, null).transform;

    if (state[0] == "block" && state[1] != "") {
        botao.style.display = "none";
        menu.style.transform = "translateX(0)";
        core.style.transform = "translate(275px)";
    }
}

// Sidebar: show hamburger button when an item is clicked (and the screen is small)
function showButton () {
    var state = [];
    var botao = document.querySelector(".sidebarButton");
    var menu = document.querySelector("#sidebar");
    var core = document.querySelector("#main");

    state[0] = window.getComputedStyle(botao, null).display;
    state[1] = window.getComputedStyle(menu, null).transform;

    if (state[0] == "none" && state[1] != "") {
        botao.style.display = "block";
        menu.style.transform = "translateX(-275px)";
        core.style.transform = "translate(0)";
    }
}

// Sidebar: swap active (darker) item
function swapActiveIndicator(item) {
    var indicators = document.getElementsByClassName("indicator");
    for (ind of indicators) {
        ind.classList.remove("active");
    }
    item.classList.add("active");
}

// Sidebar: function that highlights the item corresponding to active section
function highlightItem(section) {
    // Create observer callback
    function ioCallBack (entries) {
        for (entry of entries) {
            if (entry.isIntersecting) {
                var link = "#" + entry.target.id;
                var indicator = document.querySelector('[href*="' + link + '"]');
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
function openTab(tabId, tabParent) {
    // Hide all elements with class="tabcontent" by default
    var tabcontent = document.getElementsByClassName("tabcontent");
    for (let tab of tabcontent) {
        if (tab.parentNode == tabParent) {
            tab.style.display = "none";
        }
    }

    // Set all buttons as in-active by default
    var tabbuttons = document.getElementsByClassName("tablink");
    for (button of tabbuttons) {
        if (button.parentNode == tabParent) {
            button.classList.remove("active");
        }
    }

    // Show a specific tab content
    var element = document.getElementById(tabId);
    if (element.parentNode == tabParent) {
        element.style.display = "block";
    }

    // Set a specific button as active
    var tabButton = tabId + 'Button';
    document.getElementById(tabButton).classList.add("active");
}


// When the page is done loading, do:
window.onload = function() {
    // Sidebar: show, i.e. slide right
    var sidebar = document.getElementById('sidebar');
    sidebar.style.left = "0";

    // Sidebar button: add an event listener to the button
    var botao = document.querySelector(".sidebarButton");
    botao.addEventListener("click", showSidebar);

    // Sidebar: add event listeners to each item
    var indicators = document.querySelectorAll(".indicator");
    for (item of indicators) {
        item.addEventListener("click", function () {
            showButton();
        });
    }

    // Sidebar: highlight item corresponding to the section I am reading
    let sections = document.querySelectorAll("section");
    for (section of sections) {
        highlightItem(section);
    }
};