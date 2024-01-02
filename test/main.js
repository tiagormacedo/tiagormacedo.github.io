// Function to process a tex file via a form
function displayLink() {
    var baseurl = "https://tmacedo.pythonanywhere.com/uploads/";
    var infilename = document.querySelector('input[type=file]').files[0].name;
    infilename = infilename.replace(/ /g, "_");

    var infilepath = baseurl + infilename;
    document.getElementById("raw_infile").innerHTML = "<a href=" + infilepath + " target='_blank'> unedited file </a>";

    var edited_filepath = baseurl + "not_the_commat.bib";
    document.getElementById("bib_outfile").innerHTML = "<a href="+edited_filepath+" download> bib file </a>";
    }
