$(document).ready(function() {


	
	function getCookie(name) {
	    var cookieValue = null;
	    if (document.cookie && document.cookie !== '') {
	        var cookies = document.cookie.split(';');
	        for (var i = 0; i < cookies.length; i++) {
	            var cookie = jQuery.trim(cookies[i]);
	            // Does this cookie string begin with the name we want?
	            if (cookie.substring(0, name.length + 1) === (name + '=')) {
	                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
	                break;
	            }
	        }
	    }
	    return cookieValue;
	}
	var csrftoken = getCookie('csrftoken');

	function csrfSafeMethod(method) {
	// these HTTP methods do not require CSRF protection
	return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
	}

	$.ajaxSetup({
	    beforeSend: function(xhr, settings) {
	        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
	            xhr.setRequestHeader("X-CSRFToken", csrftoken);
	        }
	    }
	});


});



$('#update-cart').on("click", function(){
	console.log("button connected");

	delete_item_list = []

	$(":checkbox").each(function(){
		if ($(this).is(":checked")) {
			var ingredientDelete = $(this).val();
			delete_item_list.unshift(ingredientDelete)
			console.log("looks like this box is checked");
			console.log(delete_item_list);

		};
	});

	$.ajax({
		url : '/shopping/remove/',
		type: 'POST',
		data: {'delete_item_list[]': delete_item_list},
		success: function(){
			console.log("ajax call successful")
		},
	});	
});


$("input:radio[name='address']").on("click", function(){
	selected_address= $(this).val()
	$("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
	    $("#success-alert").slideUp(500);
	});

	$.ajax({
		url : '/shopping/change',
		type: 'POST',
		data: {'selected_address': selected_address},
		success: function(){
			console.log("address id sent to view")
		},
	});	
})




