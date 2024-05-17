const draggableDiv = document.getElementById('quick-reply-div');
const grabButton = document.getElementById('grab-button');

let isDragging = false;

let startX, startY, initialX, initialY;

grabButton.addEventListener('mousedown', (event) => {
    isDragging = true;
    startX = event.clientX;
    startY = event.clientY;
    initialX = draggableDiv.offsetLeft;
    initialY = draggableDiv.offsetTop;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
});

let replyButtons = document.getElementsByClassName("button-reply");
for (let i = 0; i < replyButtons.length; i++)
{
    replyButtons[i].addEventListener("click", (event) => {
        
        const textBox = document.getElementById("quick-content");
        textBox.value += ">>"+replyButtons[i].dataset.postno+"\n";

        linkRectangle = replyButtons[i].getBoundingClientRect();

        console.log(linkRectangle.top+" "+linkRectangle.left);

        draggableDiv.style.top = linkRectangle.top+linkRectangle.height+"px";
        draggableDiv.style.display = "flex";

        //places user's curser inside the text area
        textBox.focus();

        event.preventDefault();
    });
}

let closeButton = document.getElementById("button-close-reply");
closeButton.addEventListener("click", (event) => {
    draggableDiv.style.display = "none";
});

//TY gpt... it is 1:30 am and I am so so sleepy
function onMouseMove(event) {
if (isDragging) 
{
    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;
    draggableDiv.style.left = `${initialX + deltaX}px`;
    draggableDiv.style.top = `${initialY + deltaY}px`;
}
}

function onMouseUp() 
{
    isDragging = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
}

