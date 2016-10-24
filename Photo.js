console.log(document.images.length);
 

Array.from((document.images)).forEach( 
	function buttonAppend(item, index){
var heightx = item.clientHeight;
var widthx = item.clientWidth;

console.log(" index: " + index + " item: " + item.src + " height: " + item.clientHeight +" width: " + item.clientWidth);
 
item.src = "http://i2.mirror.co.uk/incoming/article8075004.ece/ALTERNATES/s615b/Harambe.jpg"

item.width = widthx; 
item.height = heightx; 
}

);