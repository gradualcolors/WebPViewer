// ************************ Drag and drop ***************** //
let dropArea = document.getElementById("drop-area")


// Prevent default drag behaviors
;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false)   
  document.body.addEventListener(eventName, preventDefaults, false)
})

// Highlight drop area when item is dragged over it
;['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, highlight, false)
})

;['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, unhighlight, false)
})

// Handle dropped files
dropArea.addEventListener('drop', handleDrop, false)


function preventDefaults (e) {
  e.preventDefault()
  e.stopPropagation()
}

function highlight(e) {
  dropArea.classList.add('highlight')
}

function unhighlight(e) {
  dropArea.classList.remove('active')
}

function handleDrop(e) {
  var dt = e.dataTransfer
  var files = dt.files
  handleFiles(files)
}


function handleFiles(files) {
  files = [...files]

  const element = document.getElementById('view-image');
  if(element != null)
  {
  element.remove();
  }
  files.forEach(previewFile)
}

function previewFile(file) {
  let reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onloadend = function() {
    let img = document.createElement('img')
    img.id = "view-image"
    img.src = reader.result
   document.getElementById('gallery').appendChild(img)
}
}

let colorpicker = document.getElementById('colorpicker');
let webp_box = document.getElementById('webp_box');
  setInterval(()=>{
      let color = colorpicker.value;
      webp_box.style.backgroundColor = color;
  }, 200);

  function handleBackground(files) {
    files = [...files]
    files.forEach(changeBackground)
  }

  function changeBackground(file) {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = function() {
    webp_box.style.backgroundRepeat = "no-repeat";
    webp_box.style.backgroundSize = "cover";
    webp_box.style.backgroundImage = 'url(' + reader.result + ')';
  }
  }