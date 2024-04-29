//this script adds the ability to click to enlarge images in the DOM
//images have the class "image-enlargement"

let clickableImages = document.querySelectorAll(".image-enlargement");

clickableImages.forEach((link) => {
    link.addEventListener("click", (e)=>{
        //TESTER vvv
        // console.log('Clicked image :)');
        let img = link.querySelector("img");

        //used to ensure image doesn't exceed viewport
        let viewportWidth = window.innerWidth;
        let linkPosLeft = link.getBoundingClientRect().left;
        let maxWidth = viewportWidth - linkPosLeft;

        img.style.maxWidth = Math.min(maxWidth, parseInt(link.dataset.imgWidth)) + "px";
        img.style.maxHeight = link.dataset.imgHeight +"px";

        e.preventDefault();
    });
})