function isHTML(str) {
    var doc = new DOMParser().parseFromString(str, 'text/html');
    return Array.from(doc.body.childNodes).some(node => node.nodeType === 1);
}

//console.log('Mousedown Applied: 1.13');

// how many milliseconds is a long press?
var longpress = 1000;
var intervalId;
// holds the start time
var start;

(function() {
    jQuery('body').on('mousedown', function(e) {
        // console.log('Mousedown: Mousedown initiated');
        var alreadyhighlighted = window.getSelection().toString();
        if (e.which === 1) {
            start = new Date().getTime();
            intervalId = setTimeout(() => {
                check_back(e, alreadyhighlighted);
            }, 1000);
        }
    });

    jQuery('body').on('mouseleave', function(e) {
        start = 0;
    });
})();

function check_back(e, alreadyhighlighted) {
    if (new Date().getTime() >= start + longpress) {
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
            var x = e.clientX,
                y = e.clientY,
                elementMouseIsOver = document.elementFromPoint(x, y);
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
            var x = e.clientX,
                y = e.clientY,
                elementMouseIsOver = document.elementFromPoint(x, y);
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
