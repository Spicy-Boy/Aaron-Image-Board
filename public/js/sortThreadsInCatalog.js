// !! this script is primarily called in views/partials/options-nav.ejs 
const threads = document.getElementsByClassName("thread-post");
const catalog = document.querySelector('.catalog');

console.log(threads);


// data variables in each thread-post
/**
 * data-threadNo
 * data-dateOfMostRecentPost
 * data-numberOfPosts
**/

let sortByDropdown = document.getElementById('sortByDropdown');
sortByDropdown.value = "mostRecent";

sortByDropdown.addEventListener('change', sortHtmlCollection);

//example of accessing a data-variable
// threads.div.dataset.threadNo


function sortHtmlCollection () {
    let threadsArray = [...threads];

    if (this.value == "mostRecent")
    {
        // console.log('sorting by most recent activity');

        threadsArray.sort( (a,b) => {
            return parseInt(b.dataset.dateofmostrecentpost) - parseInt(a.dataset.dateofmostrecentpost);
        });
    }
    else if (this.value == "mostReplies")
    {
        // console.log('sorting by most replies');

        threadsArray.sort( (a,b) => {
            return parseInt(b.dataset.numberofposts) - parseInt(a.dataset.numberofposts);
        });
    }
    else if (this.value == "newest")
    {
        // console.log('sorting by newest');

        threadsArray.sort( (a,b) => {
            return parseInt(b.dataset.threadno) - parseInt(a.dataset.threadno);
        });
    }
    else if (this.value == "oldest")
    {
        // console.log('sorting by newest');

        threadsArray.sort( (a,b) => {
            return parseInt(a.dataset.threadno) - parseInt(b.dataset.threadno);
        });
    }

    //replace dom elements in catalog vvv to re-order 
    threadsArray.forEach(thread => {
        catalog.appendChild(thread);
    });

    console.log(threadsArray);
}