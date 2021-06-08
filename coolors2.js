var palette = document.getElementById('palette');
var shade = document.getElementsByClassName('shade');
var alert = document.getElementById('alert');
var drag = document.querySelectorAll('.drag');
var currentShadeIndex;
let pos1 = 0;
let pos2 = 0;

var paletteArray = [];
var lockedPalettes = []

const toggleNavItems = () => {
  if (hidden.style.display === "block") {
    hidden.style.display = "none";
  } else {
    hidden.style.display = "block";
  }
}

const navSlide = () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.navlinks');
  const navLinks = document.querySelectorAll('.navlinks li');

  burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');


    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = ''
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`;
      }
    });
    burger.classList.toggle('toggle');

  });
}

navSlide();

const initializePageLoad = (val) => {
  let slot = "";
  paletteArray = [];

  if (!val) {

    for (let i = 0; i < 5; i++) {
      slot += createHex();
      paletteArray.push(slot);
      slot = ""
    };
  } else {
    paletteArray = val;
  }

  localStorage.setItem("colors", JSON.stringify(paletteArray));

  populateSlots();
}

document.body.onkeyup = (e) => {
  if (e.keyCode == 32) {
    initializePageLoad();
  }
}

window.onload = () => {
  let existingValue = JSON.parse(localStorage.getItem("colors"));
  initializePageLoad(existingValue)
};

const removeColorFromPalette = (index) => {
  if (paletteArray.length > 2) {
    paletteArray.splice(index, 1);
    populateSlots();
  }
}


const viewShade = (index) => {
  removeShade()
  currentShadeIndex = index;
  let colorCode = paletteArray[index]
  let exactDiv = document.getElementsByClassName('color')[index]
  exactDiv.style.backgroundImage = `linear-gradient(to top, #${colorCode}, white)`
}

const removeShade = (e) => {
  let otherDivs = e;
  let currentColorCode = paletteArray[currentShadeIndex]
  let currentDivWithShade = document.getElementsByClassName('color')[currentShadeIndex]
  if ((currentDivWithShade != otherDivs) && (currentDivWithShade != undefined)) {
    currentDivWithShade.style.backgroundImage = ''
    currentDivWithShade.style.background = ''
    currentDivWithShade.style.backgroundColor = `#${currentColorCode}`
  }
}

// const dragStart = (index) => {
  // let selectedPalette = document.getElementsByClassName('color')[index]
  // selectedPalette.classList.add('fadeOut')

  // let pickedPalette = [...document.getElementsByClassName('color')]
  // pickedPalette.forEach((container) => {
  //   container.addEventListener('dragover', (e) => {
  //     e.preventDefault()
  //     var draggable = document.querySelector('.fadeOut')
  //     container.appendChild(draggable)
  //     // container.removeEventListener('click', removeShade())
  //     console.log(container)
  // })
  // })

  // currentPalette.addEventListener('dragstart', () => {
    //   currentPalette.classList.add('fadeOut')
    //   console.log(currentPalette)
    
    // })
    
    // currentPalette.addEventListener('dragend', () => {
      //   currentPalette.classList.remove('fadeOut')
      //   console.log(currentPalette)
      // })
      
      const dragStart = (index) => {
        let selectedPalette = document.getElementsByClassName('color')[index]
        selectedPalette.classList.add('fadeOut')
      };
      
      const dragEnd = (index) => {
        let selectedPalette = document.getElementsByClassName('color')[index]
        selectedPalette.classList.remove('fadeOut')
      };
      
  const dragOver = (e) => {
    // e.preventDefault()
    let currentPalette = document.querySelector('.fadeOut');
    // console.log(currentPalette)
    // const afterPalette = getSiblingElements(e.clientX);
    // console.log(afterPalette)
    // if (afterPalette == null) {
      palette.appendChild(currentPalette)
      currentPalette.classList.remove('fadeOut')
    // } else {
    //   return afterPalette
    // }
  }

const getSiblingElements = (x) => { 
  const siblingPalettes = [...document.querySelectorAll(".color:not(.fadeOut)")];
  console.log(siblingPalettes)

  return siblingPalettes.reduce((closest, child) => {
    let box = child.getBoundingClientRect();
    let offset = x - box.width - box.right / 2;
    console.log(offset)
    // if (offset < 0 && offset > closest.offset) {
      // return { offset: offset, element: child }
    // } else {
    //   return palette
    // }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}

const copy = (index) => {
  let selectedDiv = paletteArray[index]
  if (selectedDiv) {
    let copyHex = selectedDiv;
    localStorage.setItem("hexList", JSON.stringify(copyHex));
    alert.classList.add('showAlert');
    setTimeout(clear, 1000);
  }
}

const clear = () => {
  alert.classList.remove('showAlert');
}

const toggleLockKey = (element, index) => {
  currentLockKey = element.querySelectorAll(".fa")[0]
  exactCurrentLockKey = currentLockKey.classList.value
  if (exactCurrentLockKey == "fa fa-unlock") {
    currentLockKey.className = 'fa fa-lock'
    lockedPalettes.push(index)
  } else {
    currentLockKey.className = 'fa fa-unlock'
  }
  console.log(index)
}

const createHex = () => {
  var randomize = Math.random().toString(16).substring(2, 8);
  return randomize;
}

const populateSlots = () => {
  palette.innerHTML = '';
  let populate = paletteArray.map((item, index) => {
    palette.insertAdjacentHTML('beforeend', `  
      <div class="color" id="color" style='background:#${item}' onclick='removeShade(this)'> 
      <div class="shade1" id="shade1">
    <div class="firstList">
        <ul class="paletteClass">
            <a href="#" data-tool-tip="Remove Color" class="remove" onclick='removeColorFromPalette(${index})'>
                <li><i class="fa fa-times" aria-hidden="true"></i></li>
            </a>
            <a href="#" data-tool-tip="View shades" class="shade" onclick='viewShade(${index})'>
                <li><i class="fa fa-table" aria-hidden="true"></i></li>
            </a>
            <a href="#" data-tool-tip="Save color to favorites">
                <li><i class="fa fa-star-o" aria-hidden="true"></i></li>
            </a>
            <a href="#" data-tool-tip="Drag" class="drag" draggable="true" ondragstart='dragStart(${index})' ondragend='dragEnd(${index})'>
                <li><i class="fa fa-arrows-h" aria-hidden="true"></i></li>
            </a>
            <a href="#" data-tool-tip="Copy HEX" onclick='copy(${index})'>
                <li><i class="fa fa-clone" aria-hidden="true"></i></li>
            </a>
            <a href="#" data-tool-tip="Toggle lock" onclick="toggleLockKey(this, ${index})">
                <li><i class="fa fa-unlock" aria-hidden="true"></i></li>
            </a>
        </ul>
    </div>
    <div class="secondList">
        <ul class="hiddenList">
            <a href="#" data-tool-tip="Drag">
                <li><i class="fa fa-arrows-h" aria-hidden="true"></i></li>
            </a>
            <a href="#" data-tool-tip="Copy HEX">
                <li><i class="fa fa-clone" aria-hidden="true"></i></li>
            </a>
            <a href="#" data-tool-tip="Toggle lock">
                <li><i class="fa fa-unlock-alt" aria-hidden="true"></i></li>
            </a>
        </ul>
    </div>
    </div>
        <div class="text">${item}</div>`)
  })
  populate;
}