// get the flip button bind to call the updateColor function when clicked
const flipBtn = document.getElementById("flipBtn");
flipBtn.addEventListener('click', () => {
  updateColorDisplay();

  const colorFlipper = document.querySelector('.color-flipper');

  if (!colorFlipper.querySelector('h4')) {
  const h4 = document.createElement('h4');
h4.textContent = 'Click on a color to use it!';
colorFlipper.appendChild(h4);
  }
})

// get the copy button and bind it to copy the current color code to the clipboard when clicked
const copyBtn = document.getElementById('copyBtn');

copyBtn.addEventListener('click', () => {
const colorCode = document.getElementById('colorCode').textContent;
navigator.clipboard.writeText(colorCode).then(() => {
  showToast('Color copied to clipboard!');
}).catch(err => {
  console.error('Could not copy text: ', err);
});
})

// function to show a toast message when the copy button is clicked
function  showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);

}

// function to update the color display and color code when the flip button is clicked
function updateColorDisplay() {
  // call the generateRandomColor function to get a new color

  // update the color code element with the new color
  const hexColor = getHexColor();
  const colorDisplay = document.getElementById("colorDisplay");
  colorDisplay.style.backgroundColor = hexColor;
  const colorCode = document.getElementById("colorCode");
  colorCode.textContent = hexColor;
  // add the new color to the color history
  addToColorHistory(hexColor);
}

function addToColorHistory(color) {
  const li = document.createElement('li');
  li.style.background = color;
  li.title = color;

  const historyList = document.getElementById('colorHistory');
  const colorDisplay = document.getElementById("colorDisplay");
  const colorCode = document.getElementById("colorCode");

  li.addEventListener('click', () => {
    colorDisplay.style.backgroundColor = color;
    colorCode.textContent = color;
  });

  // max 6 color history items
  if (historyList.children.length >= 6) {
    historyList.removeChild(historyList.firstChild);
  }

  historyList.appendChild(li);

  // save the color history to local storage
  let history = JSON.parse(localStorage.getItem('colorHistory')) || [];

  if (!history.includes(color)) {
    history.push(color);
  } 

  if (history.length > 6) {
    history.shift();
  }

  if (history.length > 6) {
    history = history.slice(-6);
  }

  localStorage.setItem('colorHistory', JSON.stringify(history));
  renderColorHistory();
}

// function to create an array of hex characters (0-9 and A-F)
function getHexArr() {
  let clrAarr = [];
  for (let i=0; i<10; i++){
    clrAarr.push(i);
  }
  
  return [...clrAarr, 'A','B', 'C', 'D', 'E', 'F'];
}

// function to generate a random hex color code
function getHexColor() {
  const hexArr = getHexArr();
  let myHeXclr = "#";
  for (let i=0; i<6; i++) {
    let rndNum = Math.floor(Math.random() * 16);
    let hexchar = hexArr[rndNum];
    myHeXclr += hexchar;
  }
  return myHeXclr;
 
}

function renderColorHistory() {
  const historyList = document.getElementById('colorHistory');
  historyList.innerHTML = '';

  let history = JSON.parse(localStorage.getItem('colorHistory')) || [];

  history.forEach(color => {
    const li = document.createElement('li');
    li.style.background = color;
    li.title = color;
   
    li.addEventListener('click', () => {
      const colorDisplay = document.getElementById("colorDisplay");
      const colorCode = document.getElementById("colorCode");
      colorDisplay.style.backgroundColor = color;
      colorCode.textContent = color;
    });
    historyList.appendChild(li);
  });
}

// on page load, check local storage for color history and populate the history list
window.addEventListener("DOMContentLoaded", () => {
  let history = [];

  try {
    history = JSON.parse(localStorage.getItem('colorHistory')) || [];
  } catch (err) {
    history = [];
  }

  history.forEach(color => {
    addToColorHistory(color);
  });

});
