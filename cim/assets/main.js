// Swap the active (darker) side bar item
function swapActiveIndicator(item) {
    var indicators = document.getElementsByClassName("indicator");
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
                var link = "#" + entry.target.id;
                var indicator = document.querySelector('[href*="' + link + '"]');
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
    var baseurl = "https://tmacedo.pythonanywhere.com/uploads/";
    var infilename = document.querySelector('input[type=file]').files[0].name;
    infilename = infilename.replace(/ /g, "_");

    document.getElementById("raw_outfile").innerHTML("raw file");
    var infilepath = baseurl + infilename;
    document.getElementById("raw_outfile").setAttribute("href", infilepath);

    document.getElementById("edited_outfile").innerHTML("edited file");
    var edited_filepath = infilepath.slice(0, -4) + "-edited" + infilepath.slice(-4);
    document.getElementById("edited_outfile").setAttribute("href", edited_filepath);
    }