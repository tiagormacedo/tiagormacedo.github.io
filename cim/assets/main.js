function displayLink() {
    var baseurl = "https://tmacedo.pythonanywhere.com/uploads/";
    var infilename = document.querySelector('input[type=file]').files[0].name;
    infilename = infilename.replace(/ /g, "_");

    var infilepath = baseurl + infilename;
    document.getElementById("raw_outfile").innerHTML = "<a href=" + infilepath + " target='_blank'> raw file </a>";

    var edited_filepath = infilepath.slice(0, -4) + "-edited" + infilepath.slice(-4);
    document.getElementById("edited_outfile").innerHTML = "<a href="+edited_filepath+" download> edited file </a>";
    }