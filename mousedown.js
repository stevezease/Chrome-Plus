function isHTML(str) {
    var doc = new DOMParser().parseFromString(str, 'text/html');
    return Array.from(doc.body.childNodes).some(node => node.nodeType === 1);
}

//console.log('Mousedown Applied: 1.14');

// how many milliseconds is a long press?
var longpress = 2000;
var intervalId;
// holds the start time
var start;
var down = false;
var elemMouseWasOver;
var alreadyhighlighted;

(function() {
    jQuery('body').on('mousedown', function(e) {
        //console.log(down);
        down = true;
        // console.log('Mousedown: Mousedown initiated');
        var alreadyhighlighted = window.getSelection().toString();
        if (e.which === 1) {
            start = new Date().getTime();
            intervalId = setTimeout(() => {
                check_back(e);
            }, 2000);
        }
    });

    jQuery('body').on('mouseleave', function(e) {
        start = 0;
    });
    jQuery('body').on('mouseup', function(e) {
        start = 0;
        down = false;
        let currentlyHighlighted = window.getSelection().toString();
        if (currentlyHighlighted === alreadyhighlighted) {
            return;
        }
        alreadyhighlighted = currentlyHighlighted;
        if (alreadyhighlighted.length !== 0) {
            var x = e.clientX,
                y = e.clientY;
            elemMouseWasOver = document.elementFromPoint(x, y);
        }
        //console.log(down);
    });
})();

function check_back(e) {
    //console.log(down);
    if (!down) {
        return;
    }
    if (new Date().getTime() >= start + longpress) {
        var x = e.clientX,
            y = e.clientY,
            elementMouseIsOver = document.elementFromPoint(x, y);
        if (
            alreadyhighlighted.length == 0 &&
            window.getSelection().toString().length == 0
        ) {
            // console.log(
            //     'Mousedown: Nothing was previously highlighted on initial click'
            // );
            // console.log(
            //     'Mousedown: Nothing is highlighted after time duration'
            // );
            // console.log('Mousedown: Searching whole text block');
            //console.log(elementMouseIsOver);
            //console.log(elementMouseIsOver.innerHTML);
            // var elem = elementMouseIsOver.innerHTML.trim().replace(/ /g,"+").replace(/<br>/g, "");
            // console.log(
            //     'Mousedown: Whole text block unfiltered: ' +
            //         elementMouseIsOver.innerHTML
            // );
            var elem = elementMouseIsOver.innerHTML
                .trim()
                .replace(/ /g, '+')
                .replace(/<br>/g, '')
                .replace(/(\r\n|\n|\r)/gm, '');
            var url = 'https://www.google.com/#q=' + elem;
            // console.log('Mousedown: Whole text block filtered: ' + elem);
            if (
                !(url.trim() === 'https://www.google.com/#q=') &&
                !isHTML(elem) &&
                elem.replace(/\s/g, '') != ''
            ) {
                // console.log('Mousedown: URL provided does not look like HTML');
                window.open(url, '_blank');
            }
        } else {
            if (
                !$.contains(elemMouseWasOver.parentElement, elementMouseIsOver)
            ) {
                return;
            }
            var elem = alreadyhighlighted
                .trim()
                .replace(/ /g, '+')
                .replace(/<br>/g, '')
                .replace(/(\r\n|\n|\r)/gm, '');

            if (alreadyhighlighted === window.getSelection().toString()) {
                // console.log(
                //     'Mousedown: highlighted string is consistent with initial click'
                // );
                var url = 'https://www.google.com/#q=' + elem;
                // console.log('Mousedown: Whole text block filtered: ' + elem);
                if (
                    !(url.trim() === 'https://www.google.com/#q=') &&
                    !isHTML(elem) &&
                    elem.replace(/\s/g, '') != ''
                ) {
                    // console.log(
                    //     'Mousedown: URL provided does not look like HTML'
                    // );
                    window.open(url, '_blank');
                }
            }
        }
    }
}
