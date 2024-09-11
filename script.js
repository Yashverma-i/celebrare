let textElements = [];

const addtext = document.getElementsByClassName('addtext')[0];
const mainarea = document.getElementsByClassName('main_area')[0];

addtext.addEventListener('click', () => {
  const newText = document.createElement('div');
  newText.className = 'text';
  newText.contentEditable = 'true';
  newText.style.width = '280px'; 
  newText.style.height = '10px'; 
  newText.style.border = '1px solid black'; 
  newText.style.padding = '10px'; 
  newText.style.fontSize = '18px'; 
  newText.style.textAlign = 'center'; 
  newText.style.cursor = 'text'; 
  newText.style.position = 'absolute'; 
  newText.style.whiteSpace = 'nowrap';

  mainarea.appendChild(newText);
  textElements.push(newText);

  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  //selecting the text
  newText.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - newText.offsetLeft;
    offsetY = e.clientY - newText.offsetTop;

      // footer buttons
    features.forEach((feature) => {
      feature.addEventListener('click', () => {
        if (selectedTextElement && !selectedTextElement.isNew) {
          document.execCommand(feature.id);
  
          switch (feature.id) {
            case 'bold':
              selectedTextElement.style.fontWeight = document.queryCommandState('bold') ? 'bold' : 'normal';
              break;
            case 'italic':
              selectedTextElement.style.fontStyle = document.queryCommandState('italic') ? 'italic' : 'normal';
              break;
              case 'justifyCenter':
              selectedTextElement.style.left = '36%';
               break;
            case 'underline':
              selectedTextElement.style.textDecoration = document.queryCommandState('underline') ? 'underline' : 'none';
                break;      
          }
        }
      });
    });
  });


  // dragging the text
  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      newText.style.border='none';
      newText.style.cursor = 'move'; 
      newText.style.left = `${e.clientX - offsetX}px`;
      newText.style.top = `${e.clientY - offsetY}px`;
  }
  });

  // leaving the text
  document.addEventListener('mouseup', () => {
    isDragging = false;

  });


  const features = document.querySelectorAll('.feature');
  const inps=document.querySelectorAll('.inp');
  const sizes=document.querySelectorAll('.size');
  const fonttyp=document.querySelectorAll('.select');


  textElements.forEach((textElement) => {
    textElement.addEventListener('click', () => {
      selectedTextElement = textElement;
    });
  });

  const fontSizeMap = {
    'h0':'48px',
    'h1': '36px',
    'h2': '24px',
    'h3': '18px',
    'h4': '14px'
  };
  const fonttype = {
    '1':'Lucida Sans',
    '2': 'Arial',
    '3': 'Cambria',
    '4': 'Cursive',
    '5': 'italic'
  };
  
    //font size
  sizes.forEach((size) => {
    size.addEventListener('change', (e) => {
      const selectedSize = e.target.value;
      selectedTextElement.style.fontSize = fontSizeMap[selectedSize];
    });
  });


  // font type
  fonttyp.forEach((select)=>{
    select.addEventListener('change',(e)=>{
      const selectedFont = e.target.value;
      selectedTextElement.style.fontFamily = fonttype[selectedFont];
    });
  });


  // input color
 inps.forEach((inp) => {
  inp.addEventListener("input", (e) => {
    const color = e.target.value;
    if (selectedTextElement) {
      selectedTextElement.style.color = color;
    }
  });


  //background color
  const back_color=document.querySelectorAll('.back');
  back_color.forEach((back) => {
    back.addEventListener("input", (e) => {
      const bgcolor = e.target.value;
        mainarea.style.backgroundColor = bgcolor;
    });
  });

  });
});



