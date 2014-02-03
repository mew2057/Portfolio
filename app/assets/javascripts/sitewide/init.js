function updateSidebar(){
	// TODO don't hardcode border!
	var new_height = $("#mainBody").height() > $(window).height() ? $("#mainBody").height() : ($(window).height() - ($("#header").height() + 2));
	$('.sidebar').height(new_height);
	
	if($('#content_area').height() > $("#mainBody").height()){
		$('#content_area').height($("#mainBody").height());
	}
}

window.onload = function(){
	updateSidebar();
};

$(window).resize(function() {
	updateSidebar();
});
