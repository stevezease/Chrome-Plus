
function copyTextToClipboard(text) {
  var textArea = document.createElement("textarea");

  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;

  textArea.style.width = '2em';
  textArea.style.height = '2em';

  textArea.style.padding = 0;

  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';

  textArea.style.background = 'transparent';


  textArea.value = text;

  document.body.appendChild(textArea);

  textArea.select();
  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg);
  } catch (err) {
    console.log('Oops, unable to copy');
  }
  document.body.removeChild(textArea);
}


    window.addEventListener('click', function (evt) {
      if (evt.detail === 3) {
       var x = evt.clientX, y = evt.clientY,
       elementMouseIsOver = document.elementFromPoint(x, y);
       console.log(elementMouseIsOver);
       console.log(elementMouseIsOver.innerHTML);

       if(elementMouseIsOver.tagName == "IMG")
       {

        console.log(elementMouseIsOver.src);
        var src = (elementMouseIsOver.src);
        copyTextToClipboard(src);
        document.execCommand("elementMouseIsOver.src");
      }
      else {
       console.log(elementMouseIsOver.tagName);
       var text = window.getSelection().toString();
       console.log(window.getSelection().toString());
       document.execCommand('copy');
     }

   }
  });

