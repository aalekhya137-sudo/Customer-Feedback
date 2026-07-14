// ===============================
// Scratch Card - JAI KAPEES INFRACON
// ===============================

const canvas = document.getElementById("scratchCanvas");
const ctx = canvas.getContext("2d");

const rewardText = document.getElementById("prize");
const claimBtn = document.getElementById("claimBtn");

// Random Rewards
const rewards = [
    "₹100 Discount",
    "₹250 Discount",
    "10% Discount",
    "Free Gift",
    "Better Luck Next Time",
    "Free Delivery"
];

// Select Random Reward
rewardText.innerText = rewards[Math.floor(Math.random() * rewards.length)];

// Canvas Size
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

// Silver Scratch Layer
ctx.fillStyle = "#B0B0B0";
ctx.fillRect(0,0,canvas.width,canvas.height);

// Add Text
ctx.fillStyle = "#ffffff";
ctx.font = "bold 28px Arial";
ctx.textAlign = "center";
ctx.fillText("SCRATCH HERE",canvas.width/2,canvas.height/2);

// Scratch Effect
ctx.globalCompositeOperation = "destination-out";

let isDrawing = false;

// Mouse
canvas.addEventListener("mousedown",()=>{
    isDrawing=true;
});

canvas.addEventListener("mouseup",()=>{
    isDrawing=false;
});

canvas.addEventListener("mousemove",scratch);

// Touch
canvas.addEventListener("touchstart",()=>{
    isDrawing=true;
});

canvas.addEventListener("touchend",()=>{
    isDrawing=false;
});

canvas.addEventListener("touchmove",scratchTouch);

function scratch(e){

    if(!isDrawing) return;

    const rect=canvas.getBoundingClientRect();

    const x=e.clientX-rect.left;

    const y=e.clientY-rect.top;

    ctx.beginPath();

    ctx.arc(x,y,22,0,Math.PI*2);

    ctx.fill();

    checkScratch();
}

function scratchTouch(e){

    if(!isDrawing) return;

    e.preventDefault();

    const rect=canvas.getBoundingClientRect();

    const touch=e.touches[0];

    const x=touch.clientX-rect.left;

    const y=touch.clientY-rect.top;

    ctx.beginPath();

    ctx.arc(x,y,22,0,Math.PI*2);

    ctx.fill();

    checkScratch();
}

// Check how much scratched
function checkScratch(){

    const pixels=ctx.getImageData(0,0,canvas.width,canvas.height);

    let transparent=0;

    for(let i=3;i<pixels.data.length;i+=4){

        if(pixels.data[i]===0){

            transparent++;

        }

    }

    const percent=(transparent/(canvas.width*canvas.height))*100;

    if(percent>45){

        canvas.style.display="none";

        claimBtn.style.display="inline-block";

    }

}

// Button
claimBtn.addEventListener("click",function(){

    alert("🎉 Congratulations!\n\nPlease show this reward during your next order.\n\nThank you for choosing JAI KAPEES INFRACON.");

    window.location.href="index.html";

});
