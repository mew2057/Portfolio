window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
						  window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var CurrentMoveSpeed = 0;
var MoveSpeed = 10;

var HorizontalCurrent = 0;
var HorizontalMax;
var HorizontalScroll=4;
var HorizontalScrollZone = 50;
var HorizontalScrolling = false;
var HorizontalInterrupt = false;

var DropColor = 'rgb(0,10,0)';
var BorderColor = ' #E6E1CD';
var BorderWidth = 2;

var IsPointer = false;

var ThumbMargin = 5;	

var GalleryThumbs = {width:100, height:100};
var ImageCollection = {};
var GalleryLocations = {};

var RiseHeight = 0;
var RiseLimit = 0;

var GalleryCanvas;
var GalleryContext;
var ControlsCanvas;
var ControlsContext;

var HoveredImage = -1; // Defaults to -1
var ActiveImage = 0;

function resizeGallery(){
	GalleryCanvas.height = ControlsCanvas.height = $("#gallery_div").height();
	GalleryCanvas.width = ControlsCanvas.width = $("#gallery_div").width();
	resizeIndicies(GalleryThumbs.width,GalleryThumbs.height);
	scaleAndDrawImage(ActiveImage);
}
	
function scaleAndDrawImage(iIndex){
	var height = ImageCollection[iIndex].height;
	var width = ImageCollection[iIndex].width;
	var offsetX = 0;
	var offsetY = 0;

	if(height > GalleryCanvas.height){
		width *= GalleryCanvas.height/height;
		height = GalleryCanvas.height;
	}
	
	if(width > GalleryCanvas.width){
		height *= GalleryCanvas.width/width;
		width = GalleryCanvas.width;			
	}
	
	offsetX = (GalleryCanvas.width - width)/2;
	offsetY = (GalleryCanvas.height - height)/2;

	GalleryContext.clearRect(0,0,GalleryCanvas.width,GalleryCanvas.height);
	GalleryContext.drawImage(ImageCollection[iIndex], offsetX, offsetY, width, height);

}

function populateGallery(){
	resizeGallery();
	scaleAndDrawImage(ActiveImage);
	resizeIndicies(GalleryThumbs.width,GalleryThumbs.height);	
	
	// Context Stuff
	ControlsContext.fillStyle = DropColor;
	ControlsContext.strokeStyle = BorderColor;
	ControlsContext.lineWidth  = BorderWidth;
	
	// Enables the gallery controls.
	ControlsCanvas.addEventListener("mouseover",showIndex,false);
	ControlsCanvas.addEventListener("mouseout",hideIndex,false);
	ControlsCanvas.addEventListener("mousemove",checkMouse,false);
	ControlsCanvas.addEventListener("mousedown",click, false);
	
	// Starts mouseover if the user had their mouse in the canvas before the load completed.
	if ($('#gallery_controls').is(':hover')) {
		showIndex();
	}
}

function resizeIndicies(w,h){
	var maxHeight = 0;
	var height;
	var width;
	var offsetY;		
	var xCurrent = ThumbMargin;
	
	
	for(image in ImageCollection){
		height = ImageCollection[image].height;
		width = ImageCollection[image].width;

		if(height > h){
			width *= h/height;
			height = h;
		}
		
		if(width > w){
			height *= w/width;
			width = w;
		}
		
		if(height > maxHeight)
			maxHeight = height;

		GalleryLocations [image] = {x:xCurrent,
									y:h,
									width:width, 
									height:height};
									
		xCurrent += w + ThumbMargin;			
	}
			
	for(var image in GalleryLocations){
		GalleryLocations[image].y = GalleryCanvas.height;
	}
	
	RiseLimit = maxHeight + 2 * ThumbMargin;		
	GalleryThumbs.height = maxHeight;
	
	HorizontalMax = GalleryCanvas.width > xCurrent ? 0 : GalleryCanvas.width-xCurrent;
	
	if(HorizontalCurrent < HorizontalMax){
		HorizontalCurrent = HorizontalMax;
	}
}

function checkMouse(e){
	var rect = ControlsCanvas.getBoundingClientRect();
	var x = e.clientX-rect.left;
	var y = e.clientY-rect.top;
	
	HoveredImage = -1;
	for( var bound in GalleryLocations){
		 if((x >= GalleryLocations[bound].x + HorizontalCurrent&& 
			 x <= GalleryLocations[bound].x + GalleryLocations[bound].width + HorizontalCurrent) &&
			(y >= GalleryLocations[bound].y && 
			 y <= GalleryLocations[bound].y + GalleryThumbs.height)){
			HoveredImage = bound;
		}
	}

	if(HoveredImage != -1 && !IsPointer){
		IsPointer = true;
		ControlsCanvas.style.cursor = 'pointer';
	}
	else if(HoveredImage == -1 && IsPointer){
		IsPointer = false;
		ControlsCanvas.style.cursor = 'default';
	}
	
	if(y > ControlsCanvas.height - RiseHeight){
		if(x < HorizontalScrollZone){
			updateIndexHorizontal(-1,true);
		}
		else if(x > ControlsCanvas.width - HorizontalScrollZone){
			updateIndexHorizontal(1,true);
		}
		else{
			HorizontalInterrupt = true;
		}
	}
	else{
			HorizontalInterrupt = true;
	}
}

function click(){
	if(HoveredImage != -1){
		ActiveImage = HoveredImage;
		scaleAndDrawImage(ActiveImage);
	}
}

function showIndex(){
	CurrentMoveSpeed = -MoveSpeed;
	animateIndexVertical(window.performance.now());
}

function hideIndex(){
	CurrentMoveSpeed = MoveSpeed;
	animateIndexVertical(window.performance.now());
}

function animateIndexVertical(time){
	var exitAnim=false;
	ControlsContext.clearRect(0,0,GalleryCanvas.width,GalleryCanvas.height);
	
	RiseHeight -= CurrentMoveSpeed;

	if(RiseHeight > RiseLimit){
		RiseHeight = RiseLimit;
	}
	else if( RiseHeight < 0){
		RiseHeight = 0;
	}
	
	ControlsContext.fillRect(0,GalleryCanvas.height, GalleryCanvas.width, -RiseHeight);
	
	for(image in ImageCollection)
	{
		ControlsContext.drawImage(ImageCollection[image], 
							GalleryLocations[image].x + HorizontalCurrent, 
							GalleryLocations[image].y,
							GalleryLocations[image].width, 
							GalleryLocations[image].height);
							
		/*
		ControlsContext.strokeRect(GalleryLocations[image].x, 
							GalleryLocations[image].y,
							GalleryLocations[image].width, 
							GalleryLocations[image].height);*/
							
		GalleryLocations[image].y += CurrentMoveSpeed;
		
		if(GalleryLocations[image].y < GalleryCanvas.height - (ThumbMargin + GalleryThumbs.height)){
			GalleryLocations[image].y = GalleryCanvas.height - (ThumbMargin + GalleryThumbs.height);
			exitAnim = true;
			RiseHeight = RiseHeight < RiseLimit ? RiseLimit : RiseHeight;
			
		}
		else if(GalleryLocations[image].y > GalleryCanvas.height){
			GalleryLocations[image].y = GalleryCanvas.height;
			exitAnim = true;
		}
	}
	
	if(exitAnim){
		CurrentMoveSpeed = 0;
	}
		
	if(CurrentMoveSpeed === 0 && !exitAnim){
		return;	
	}
	else {
		window.requestAnimationFrame(animateIndexVertical);		
	}
}

function updateIndexHorizontal(direction, entry){
	if(entry && HorizontalScrolling){
		return;
	}
	else{
		HorizontalScrolling = true;
	}

	if(direction == 1){	//scroll right	
		HorizontalCurrent = HorizontalCurrent <=  HorizontalMax ? HorizontalMax : HorizontalCurrent - HorizontalScroll;
	}
	else if (direction == -1){ // scroll left
		HorizontalCurrent = HorizontalCurrent >= 0 ? 0 : HorizontalCurrent + HorizontalScroll;
	}
	
	ControlsContext.clearRect(0,0,GalleryCanvas.width,GalleryCanvas.height);
	ControlsContext.fillRect(0,GalleryCanvas.height, GalleryCanvas.width, -RiseHeight);
	
	for(image in ImageCollection)
	{
		ControlsContext.drawImage(ImageCollection[image], 
							GalleryLocations[image].x + HorizontalCurrent, 
							GalleryLocations[image].y,
							GalleryLocations[image].width, 
							GalleryLocations[image].height);
	}
	
	if(HorizontalCurrent === 0 || HorizontalCurrent === HorizontalMax || HorizontalInterrupt){
		HorizontalScrolling = false;
		HorizontalInterrupt = false;
		return;
	}
	else{
		window.requestAnimationFrame((function(){updateIndexHorizontal(direction, false)}));
	}
}

function loadImages(source){
	GalleryCanvas = document.getElementById("image_gallery");
	ControlsCanvas = document.getElementById("gallery_controls");
	
	if(source.length ==0) {
		ControlsCanvas.height = GalleryCanvas.height = 0;
		ControlsCanvas.width = GalleryCanvas.width = 0;
		$(".gallery_spacer").height(2);
		$(".gallery_div").height(0);
		return;
	}
	
	var sources = JSON.parse(source);
	sources.sort();

	var loadedImages = 0;			
	
	GalleryCanvas.style.width ='100%';
	GalleryCanvas.style.height='100%';
	ControlsCanvas.style.width ='100%';
	ControlsCanvas.style.height='100%';
	
	GalleryContext = GalleryCanvas.getContext('2d');
	ControlsContext = ControlsCanvas.getContext('2d');
	
	for(var iIndex = 0;iIndex< sources.length; iIndex++  ){
		ImageCollection[iIndex] = new Image();
		ImageCollection[iIndex].onload = function(){
			if(++loadedImages === sources.length){
				populateGallery();
			}
		};
		ImageCollection[iIndex].src = sources[iIndex];
	}
}