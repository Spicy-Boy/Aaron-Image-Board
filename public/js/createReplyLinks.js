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
        let referencedPost = arrPostReplies.find( otherPost => otherPost.id === postNo);
        
        if (post.innerHTML.includes("&gt;&gt;"+postNo))
        {
            //add a hyperlinklink replacing any valid >>postNo key in a user's post
            // NOTE: &gt;&gt; is ">>"
            post.innerHTML = post.innerHTML.replaceAll("&gt;&gt;"+postNo, `<a href="#${postNo}" class="referencing-${postNo} reply-link">${temporaryLinkIdentifier}${postNo}</a>`);

            //add a link to the reply back at the referenced post
            let replySpan = referencedPost.getElementsByClassName("replies")[0];

            let linkToReply = document.createElement('a');
            linkToReply.href = "#"+post.id;
            linkToReply.innerText = temporaryLinkIdentifier+post.id;

            //add event listeners to links

            replySpan.appendChild(linkToReply);
            replySpan.innerHTML += '&nbsp;';
            //tester vv
            // console.log(replySpan);

            //TODO: add a little window that pops up of the referenced post when hovering reply link :D
            //TODO: greentext! Or red text, or whatever I want :)


        }
        referencedPost.innerHTML = referencedPost.innerHTML.replaceAll(temporaryLinkIdentifier, "&gt;&gt;");
    }
    post.innerHTML = post.innerHTML.replaceAll(temporaryLinkIdentifier, "&gt;&gt;");
});

//add event listeners to each link with a reference back to the original post, add reply backlinks to referenced post
for (let postNo of postIDs)
{
    let links = document.getElementsByClassName("referencing-"+postNo);
    let referencedPost = arrPostReplies.find( otherPost => otherPost.id === postNo);
    if (links.length > 0)
    {

        // console.log('Detected',links.length+" links referencing",postNo);
        // console.log(links);
        Array.from(links).forEach((link) => {
            link.addEventListener("mouseenter", (event) => {
                //highlight referenced post vv
                referencedPost.classList.add("highlighted");


                //create a little pop up of the post vvv if reference is outside window
                if (!isElementVisibleInViewport(referencedPost))
                {
                    const popupPost = document.createElement('div');
                    
                    //clone method vvv doesnt copy style right
                    // clonedPost = referencedPost.cloneNode(true);
                    // popupPost.appendChild(clonedPost);
                    popupPost.innerHTML = referencedPost.innerHTML;

                    popupPost.classList.add("post-reply");
                    popupPost.classList.add("popup");

                    let linkRectangle = link.getBoundingClientRect();
                    popupPost.style.top = (linkRectangle.top+linkRectangle.height+window.scrollY)+'px';
                    // vv horizontally offset by hard coded 15 px
                    popupPost.style.left = linkRectangle.left+linkRectangle.width+15+'px';

                    // popupPost.style.top = (popupPost.style.top - popupPost.offsetHeight)+"px";
                    document.body.appendChild(popupPost);
                    // console.log(popupPost);

                    //vv position the pop up div halfway to the right of the link
                    let popupHeight = popupPost.offsetHeight;
                    console.log(popupHeight);
                    popupPost.style.top = (linkRectangle.top+linkRectangle.height+window.scrollY-(popupHeight/2))+'px';
                }

            });
            link.addEventListener("mouseleave", () => {
                referencedPost.classList.remove("highlighted");

                // remove existing popup
                const popupPost = document.querySelector('.popup');
                if (popupPost) {
                    popupPost.remove();
                }
            });
            link.addEventListener("click", () => {
                let highElements = document.querySelectorAll('.perma-highlighted');

                highElements.forEach( (element) => {
                    element.classList.remove('perma-highlighted');
                });

                referencedPost.classList.add("perma-highlighted");
            });
        });
    }
}

//elem short for element
function isElementVisibleInViewport (elem)
{
    let rect = elem.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}