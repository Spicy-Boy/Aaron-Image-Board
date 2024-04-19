let threads = document.getElementsByClassName("thread-post");

// data variables in each thread-post
/**
 * data-threadNo
 * data-dateOfMostRecentPost
 * data-numberOfPosts
 */

let sortByDropdown = document.getElementById('sortByDropdown');

sortByDropdown.addEventListener('change', sortHtmlCollection);

//example of accessing a data-variable
// threads.div.dataset.threadNo

console.log(threads);

function sortHtmlCollection () {
    
}