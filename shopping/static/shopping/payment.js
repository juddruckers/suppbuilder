

$("input:radio").change(function() {
	var default_shipping = parseFloat($("#shipping-price").text());
	var current_price = parseFloat($("#cart-total").text());
	var shipping_price = parseFloat($(this).val());
	var test_input = $(".hidden").val();
	var new_price = parseFloat((current_price - default_shipping + shipping_price)).toFixed(2);
	var test = parseFloat(new_price);


	$("#shipping-price").text(shipping_price)
	$(".hidden").val(shipping_price);
	$("#cart-total").text(new_price);


});



$("#discount").click(function(){


	var name = $("#discount-code").val();


	$.get( "/shopping/discount/", {name : name} )
		.done(function(data){
			if (data == 'Invalid discount code'){
				$("input[type=text]#discount-code").val(data);
			}
			else {
				$("input[name=discount_name]").val(name);
				$("#discount-section").html("<p>discount added!</p>");
				$("input[name=hidden_discount]").val(data);
			}
				
		});


});