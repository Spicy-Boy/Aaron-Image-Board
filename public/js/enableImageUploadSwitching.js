// vv script for switching between img upload types

const imgCheckbox = document.getElementById('imgCheckbox');
const imgUrlInputGroup = document.getElementById('urlSubmission');
const imgFileInputGroup = document.getElementById('fileSubmission');
const fileInput = document.getElementById('file');
imgCheckbox.addEventListener("change", (event)=>{
    if (event.target.checked) 
    {
        console.log('Checkbox checked');
        fileInput.value = "";
        imgFileInputGroup.style.display = "none";
        imgUrlInputGroup.style.display = "inline";
    }
    else 
    {
        console.log('Checkbox unchecked');
        imgFileInputGroup.style.display = "inline";
        imgUrlInputGroup.style.display = "none";
    }
});
