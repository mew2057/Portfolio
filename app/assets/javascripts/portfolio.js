
function updatePortfolioImages(){
	$('.project_box').width($('.project_box').width()/256 * 256);
	console.log($('.project_box').width()/256);
}

$(window).resize(function() {
	updateSidebar();
	updatePortfolioImages();
});


