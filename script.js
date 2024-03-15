const canvas = document.getElementById("canvas");
const body= document.querySelector("body");
canvas.height=window.innerHeight;
canvas.width=window.innerWidth;

var theColor = '';
var lineW =5;
let prevX = null;
let prevY = null;
let draw = false;

body.style.backgroundColor="#FFFFFF";
var theInput = document.getElementById("favcolor");

theInput.addEventListener("input", function(){
    theColor = theInput.value;
    body.style.backgroundColor = theColor;
},false);

const ctx = canvas.getContext("2d");
ctx.lineWidth=lineW;

document.getElementById("ageInputId").oninput = function(){
    draw = null;
    lineW = document.getElementById("ageInputId").value;
    document.getElementById("ageOutputId").innerHTML = lineW;
    ctx.lineWidth = lineW;
};

let clrs = document.querySelectorAll(".clr");
clrs = Array.from(clrs);
clrs.forEach(clr => {
    clr.addEventListener("click",() => {
        ctx.strokeStyle = clr.dataset.clr;
    })
})

let clearBtn = document.querySelector(".clear");
clearBtn.addEventListener("click",() => {
    ctx.clearRect(0,0,canvas.width,canvas.height)
});

let saveBtn = document.querySelector(".save");
saveBtn.addEventListener("click", () => {
    let data = canvas.toDataURL("image/png");
    let a = document.createElement("a");
    a.href = data;
    a.download = "zphotogallery/sketch.png"; 
    a.click();
});
let eraserBtn = document.querySelector(".eraser");
eraserBtn.addEventListener("click", () => {
    ctx.strokeStyle = "#FFFFFF"; 
});

window.addEventListener("mousedown",(e => draw =true));
window.addEventListener("mouseup",(e => draw =false));

window.addEventListener("mousemove", (e) =>{
    if(prevX == null || prevY == null || !draw){
        prevX = e.clientX;
        prevY = e.clientY;
        return
    }

    let currentX = e.clientX;
    let currentY = e.clientY;

    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currentX, currentY)
    ctx.stroke();

    prevX = currentX;
    prevY =currentY;
})
let selectedShape = '';
let selectedSize = 50; 

document.querySelectorAll('.shape').forEach(button => {
    button.addEventListener('click', () => {
        selectedShape = button.getAttribute('data-shape');
    });
});


document.getElementById('circleSize').addEventListener('change', (event) => {
    selectedSize = parseInt(event.target.value);
});

document.getElementById('rectangleWidth').addEventListener('change', (event) => {
    selectedSize = parseInt(event.target.value);
});

document.getElementById('rectangleHeight').addEventListener('change', (event) => {
    selectedSize = parseInt(event.target.value);
});

document.getElementById('triangleSize').addEventListener('change', (event) => {
    selectedSize = parseInt(event.target.value);
});

document.getElementById('squareSize').addEventListener('change', (event) => {
    selectedSize = parseInt(event.target.value);
});

canvas.addEventListener('click', (event) => {
    const x = event.offsetX;
    const y = event.offsetY;

    if (selectedShape === 'circle') {
        ctx.beginPath();
        ctx.arc(x, y, selectedSize, 0, Math.PI * 2);
        ctx.fillStyle = 'blue'; 
        ctx.fill();
        ctx.closePath();
    } else if (selectedShape === 'rectangle') {
        ctx.fillStyle = 'red'; 
        ctx.fillRect(x - selectedSize / 2, y - selectedSize / 4, selectedSize, selectedSize / 2);
    } else if (selectedShape === 'triangle') {
        ctx.beginPath();
        ctx.moveTo(x, y - selectedSize / 2);
        ctx.lineTo(x - selectedSize / 2, y + selectedSize / 2);
        ctx.lineTo(x + selectedSize / 2, y + selectedSize / 2);
        ctx.closePath();
        ctx.fillStyle = 'green'; 
        ctx.fill();
    } else if (selectedShape === 'square') {
        ctx.fillStyle = 'purple'; 
        ctx.fillRect(x - selectedSize / 2, y - selectedSize / 2, selectedSize, selectedSize);
    }
})

let actionHistory = [];
let currentIndex = -1;


function performAction(action) {
  const square = document.createElement("div");
  square.classList.add("square");
  
}
var selectElement = document.getElementById("brushType");
    var customSelect = document.querySelector(".custom-select");

    // Create a custom select box with icons
    var customSelectTrigger = document.querySelector(".custom-select-trigger");
    customSelectTrigger.innerHTML = '<i class="' + selectElement.options[selectElement.selectedIndex].getAttribute("data-icon") + '"></i>';
    
    // Event listener for change event (when the user selects a different option)
    selectElement.addEventListener("change", function() {
        var selectedOption = selectElement.options[selectElement.selectedIndex];
        customSelectTrigger.innerHTML = '<i class="' + selectedOption.getAttribute("data-icon") + '"></i>';
        console.log("Selected value changed to: " + selectElement.value);
    });