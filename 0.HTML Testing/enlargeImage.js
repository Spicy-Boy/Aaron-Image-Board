//this script adds the ability to click to enlarge images in the DOM
//images have the class "image-enlargement"

let clickableImages = document.querySelectorAll(".image-enlargement");

clickableImages.forEach((link) => {
    let isDefaultSize = true;

    link.addEventListener("click", (e)=>{
        //TESTER vvv
        // console.log('Clicked image :)');
        let img = link.querySelector("img");

        if (isDefaultSize)
        {
            //ensure image doesn't exceed viewport
            let leftPosition = img.getBoundingClientRect().left;
            let scrollbarWidth = window.innerWidth - document.body.clientWidth;
            let maxWidth = window.innerWidth - leftPosition - scrollbarWidth;

            //chooses the maxWidth set by screen limitation or max width of image, whichever is smaller!
            img.style.maxWidth = Math.min(maxWidth, parseInt(link.dataset.imgWidth)) + "px";

            img.style.maxHeight = link.dataset.imgHeight +"px";

            img.style.marginBottom = "15px";
            
            isDefaultSize = false;
        }
        else 
        {
            img.style.maxWidth = "";

            img.style.maxHeight = "";

            img.style.marginBottom = "";

            isDefaultSize = true;
        }



        e.preventDefault();
    });
})