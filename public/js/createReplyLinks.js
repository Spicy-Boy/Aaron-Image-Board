// the id of every post-reply is its postNo
let arrPostReplies = [...document.getElementsByClassName("post-reply")];

// console.log(arrPostReplies);

const postIDs = arrPostReplies.map(post => post.id);
postIDs.reverse();

//TESTER all postIDs vvv
// console.log(postIDs);

//temporary code to replace ">>" in links while iterating a post
let temporaryLinkIdentifier = "mOoMinDUmPy";

//iterate every single post
arrPostReplies.forEach( (post, i) => {
    //TESTER vv
    // console.log(post);

    // iterate every postNo, adding hyperlinks (>>) and reply functionality to every post in the thread
    for (let postNo of postIDs)
    {
        //TESTER vv
        // console.log('ITERATING OVER',postNo);
        
        if (post.innerHTML.includes("&gt;&gt;"+postNo))
        {
            //add a hyperlinklink replacing any valid >>postNo key in a user's post
            // NOTE: &gt;&gt; is ">>"

            post.innerHTML = post.innerHTML.replaceAll("&gt;&gt;"+postNo, `<a href="#${postNo}" class="referencing-${postNo} reply-link">${temporaryLinkIdentifier}${postNo}</a>`);

            //TODO: add a little window that pops up of the referenced post when hovering reply link :D
            //TODO: greentext! Or red text, or whatever I want :)
        }
    }

    post.innerHTML = post.innerHTML.replaceAll(temporaryLinkIdentifier, "&gt;&gt;");
});

// DOESNT WORK vvv
            // //the post that the link is referencing
            // const referencedPost = arrPostReplies.find( otherPost => otherPost.id === postNo);
            // //TESTER vv
            // console.log(post.id+" references "+referencedPost.id);

            // modifiedLinks = post.querySelectorAll(".referencing-"+postNo);
            // console.log("modded links:",modifiedLinks);
            // modifiedLinks.forEach( (link) => {
            //     console.log(link);
            //     link.addEventListener("mouseenter", () => {
            //         console.log('MOUSE OVER!!');
            //         // referencedPost.classList.add("highlighted");
            //     });
            //     link.addEventListener("mouseleave", () => {
            //         console.log('MOUSE LEAVE!!');
            //         // referencedPost.classList.remove("highlighted");
            //     });
            // });