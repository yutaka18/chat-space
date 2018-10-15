$(function() {

	var search_list = $("#user-search-result");
  var group_list = $("#chat-group-users");

  function appendGroup(userid,username) {
    var list = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${userid}'>
                  <input name='group[user_ids][]' type='hidden' value=${userid}>
                  <p class='chat-group-user__name'>${username}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    group_list.append(list);
  }

	function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`
    search_list.append(html);
  }

   function appendNoUser(user) {
    var html =  `<div class="chat-group-user clearfix">
  							<p class="chat-group-user__name">${group.users.name}</p>
							</div>`
    search_list.append(html);
  }


  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
      	users.forEach(function(user){
      	appendUser(user);
      	});
      }
      else {
        appendNoUser("一致するユーザー名はありません");
      }
    })
   	.fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });


  $('#user-search-result').on("click", ".user-search-add", function () {
    var userid = $(this).data('user-id');
    var username = $(this).data('user-name');
    var tar = $(this).parent();
    tar.hide();
    appendGroup(userid,username);

    console.log("マウスのったー！");
  });

  $(document).on("click", ".chat-group-user__btn--remove", function () {
      var target = $(this).parent();
      if(target.parent().children().length > 0){
        target.remove();
        console.log("マウスのったー！");
      }
  });
});




  //  function appendADDUser(user) {
  //   var user_list =  `<div class="chat-group-user clearfix">
  //               <p class="chat-group-user__name">${group.users.name}</p>
  //             </div>`
  //   $('#add').append(html);
  // }
    // $("#user-search-result").appendTo('#chat-group-users');