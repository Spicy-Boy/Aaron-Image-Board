let threadFormLink = document.getElementById('new-thread-link');

//placeholder is the link that reads "Create a New Thread"
let newThreadPlaceholder = document.getElementById('new-thread-placeholder');
let newThreadForm = document.getElementById('new-thread-form');

threadFormLink.addEventListener("click", (e)=>{
    newThreadPlaceholder.style.display = "none";
    newThreadForm.style.display = "flex";
    e.preventDefault();
});