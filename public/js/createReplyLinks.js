// the id of every post-reply is its postNo
let arrPostReplies = [...document.getElementsByClassName("post-reply")];

// console.log(arrPostReplies);

const postIDs = arrPostReplies.map(post => post.id);

console.log(postIDs);

//iterate every single post
arrPostReplies.forEach( (post, i) => {
    // iterate every postNo, adding hyperlinks (>>) and reply functionality to every post in the thread
    for (postNo of postIDs)
    {
        // console.log(post.innerHTML);
        
        if (post.innerHTML.includes("&gt;&gt;"+postNo))
        {
            //add a hyperlinklink replacing any valid >>postNo key in a user's post
            post.innerHTML = post.innerHTML.replaceAll("&gt;&gt;"+postNo, `<a href="#${postNo}" class="referencing-${postNo} reply-link">&gt;&gt;${postNo}</a>`);

            const referencedPost = arrPostReplies.find( otherPost => otherPost.id === postNo);

            console.log(referencedPost);

            const modifiedLinks = document.querySelectorAll("a.referencing-"+postNo);

            //add event listener to cause referenced post to change bgc when corresponding reply links are hovered
            modifiedLinks.forEach( (link) => {
                link.addEventListener("mouseenter", () => {
                    referencedPost.classList.add("highlighted");
                });
                link.addEventListener("mouseleave", () => {
                    referencedPost.classList.remove("highlighted");
                })
            });


            console.log(modifiedLinks);



            //TODO: greentext! Or red text, or whatever I want :)
        }
    }
});