$(function(){
	function buildHTML(message){
		var image = message.image  ? `<img class = "lower-message__image", src="${message.image}">` : '' ;
		var html = `<div class="message">
									<div class="message__box">
										<div class="message__username">
										  ${message.name}
									  </div>
									  <div class="message__date">
									    ${message.created_at}
									  </div>
									</div>
									<div class="lower-message">
										<p class="lower-message__content">
										  ${message.body}
										</p>
										  ${image}
									</div>
								</div>`
		return html;
	}
  $('#new_message').on('submit', function(e){
		e.preventDefault();
		var formData = new FormData(this);
		var url = $(this).attr('action')
		$.ajax({
			url: url,
			type: "POST",
			data: formData,
			dataType: 'json',
			processData: false,
			contentType: false
		})
		.done(function(data){
			var html = buildHTML(data);
			$('#new_message')[0].reset();
			$('.right-content').append(html)
			$('.right-content').animate({
			scrollTop: $('.right-content')[0].scrollHeight}, 'fast');
		})
		.fail(function(){
		  alert('error');
		})
		.always(function(){
		  $('.form__submit').prop('disabled', false);
		});
  })
})