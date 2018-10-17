$(function(){
  function buildHTML(message){
    var image = message.image  ? `<img class = "lower-message__image", src="${message.image}">` : '' ;
    var html = `<div class="message">
                  <div class="message__box" data-message-id="${message.id}">
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

  function buildADDHTML(message){
    var image = message.image  ? `<img class = "lower-message__image", src="${message.image}">` : '' ;
    var html = `<div class="message">
                  <div class="message__box" data-message-id="${message.id}">
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
      $('.messages').append(html)
      $('#new_message')[0].reset();
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
  $(function(){
    var interval = setInterval(update, 5000)
  });
  function update() {
    var Messageid = $('.message__box').last().data('message-id');
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      $.ajax({
      url: window.location.href,
      data: {id: Messageid},
      method: "GET",
      dataType: 'json',
      })
      .done(function(json) {
        var insertHTML = "";
        json.forEach(function(message) {
          if (message.id > Messageid) {
            insertHTML += buildADDHTML(message);
            $('.messages').append(insertHTML);
            $('.right-content').animate({scrollTop: $('.right-content')[0].scrollHeight}, 'fast');
          }
        });
      })
      .fail(function(json) {
        alert('自動更新に失敗しました');
      });
    } else {
        clearInterval(interval)
      }
  }
})
