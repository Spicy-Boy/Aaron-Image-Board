// the id of every post-reply is its postNo
let arrPostReplies = [...document.getElementsByClassName("post-reply")];

// console.log(arrPostReplies);

const postIDs = arrPostReplies.map(post => post.id);
postIDs.reverse();

console.log(postIDs);

//temporary code to replace ">>" in links while iterating a post
let temporaryLinkIdentifier = "mOoMinDUmPy";

//iterate every single post
arrPostReplies.forEach( (post, i) => {
    // iterate every postNo, adding hyperlinks (>>) and reply functionality to every post in the thread
    for (postNo of postIDs)
    {
        // console.log(post.innerHTML);
        
        if (post.innerHTML.includes("&gt;&gt;"+postNo))
        {
            //add a hyperlinklink replacing any valid >>postNo key in a user's post
            // NOTE: &gt;&gt; is ">>"

            post.innerHTML = post.innerHTML.replaceAll("&gt;&gt;"+postNo, `<a href="#${postNo}" class="referencing-${postNo} reply-link">${temporaryLinkIdentifier}${postNo}</a>`);

            const referencedPost = arrPostReplies.find( otherPost => otherPost.id === postNo);

            // console.log("referenced: ",referencedPost);

            const modifiedLinks = document.querySelectorAll("a.referencing-"+postNo);

            //add event listener to cause referenced post to change bgc when corresponding reply links are hovered
            modifiedLinks.forEach( (link) => {
                link.addEventListener("mouseenter", () => {
                    console.log('MOUSE OVER!!');
                    referencedPost.classList.add("highlighted");
                });
                link.addEventListener("mouseleave", () => {
                    referencedPost.classList.remove("highlighted");
                });
                link.addEventListener("click", () => {
                    let highElements = document.querySelectorAll('.perma-highlighted');

                    console.log("high:",highElements);

                    highElements.forEach( (element) => {
                        element.classList.remove('perma-highlighted');
                    });

                    referencedPost.classList.add("perma-highlighted");
                });
            });
            console.log("modified links for "+postNo+":,",modifiedLinks);

            // BUGFIX NEEDED: start iterating postnos at the end since >>1 overrides >>12

            // add a little window that pops up of the referenced post when hovering reply link :D

            //TODO: greentext! Or red text, or whatever I want :)
        }
    }

    post.innerHTML = post.innerHTML.replaceAll(temporaryLinkIdentifier, "&gt;&gt;");
});