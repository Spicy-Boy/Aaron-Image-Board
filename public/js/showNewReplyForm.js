let replyFormLink = document.getElementById('new-reply-link');

//placeholder is the link that reads "Post a Reply"
let newReplyPlaceholder = document.getElementById('new-reply-placeholder');
let newReplyForm = document.getElementById('new-reply-form');

replyFormLink.addEventListener("click", (e)=>{
    newReplyPlaceholder.style.display = "none";
    newReplyForm.style.display = "flex";
    e.preventDefault();
});