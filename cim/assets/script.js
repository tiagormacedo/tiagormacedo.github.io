// Swap the active (darker) side bar item
function swapActiveIndicator(item=this) {
    const indicators = document.querySelectorAll(".indicator");
    for (ind of indicators) {
        ind.classList.remove("active");
    }
    item.classList.add("active");
}

// Highlight the sidemenu item corresponding to the section that I'm reading
function sidemenuHighlight() {
    // Function that detects which section I am reading
    function ioCallBack (entries) {
        for (entry of entries) {
            if (entry.isIntersecting) {
                let link = "#" + entry.target.id;
                let indicator = document.querySelector(`[href*= "${link}"]`);
                swapActiveIndicator(indicator);
            }
        }
    }
    let ioOptions = {root: null, rootMargin: "0px", threshold: 0.33};
    let observer = new IntersectionObserver(ioCallBack, ioOptions);

    // Apply the function above to each section
    let sections = document.querySelectorAll("section");
    for (section of sections) {
        observer.observe(section);
    }
}

// Function to process a tex file via a form
function displayLinks() {
    const baseurl = "https://tmacedo.pythonanywhere.com/uploads/";
    let infilename = document.querySelector('input[type=file]').files[0].name;
    infilename = infilename.replace(/ /g, "_");

    const infilepath = baseurl + infilename;
    document.querySelector("#raw_outfile").classList.remove("invisible");
    document.querySelector("#raw_outfile").setAttribute("href", infilepath);

    const edited_filepath = infilepath.slice(0, -4) + "-edited" + infilepath.slice(-4);
    document.querySelector("#edited_outfile").classList.remove("invisible");
    document.querySelector("#edited_outfile").setAttribute("href", edited_filepath);
}

// Add several event listeners when the page loads //
const sideBarItems = document.querySelectorAll(".indicator");
for (item of sideBarItems) {
    item.addEventListener("click", swapActiveIndicator);
}

const btn = document.querySelector("#display-links");
btn.addEventListener("click", displayLinks);
