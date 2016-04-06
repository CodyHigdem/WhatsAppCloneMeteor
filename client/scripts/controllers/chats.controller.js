angular
	.module('Whatsapp')
	.controller('ChatsCtrl', ChatsCtrl);

function ChatsCtrl ($scope, $reactive, newChat){
	$reactive(this).attach($scope);
	this.remove = remove;

  this.helpers({
    data() {
      return Chats.find();
    }
  });

  ///
  	function showNewChatModal(){
  		NewChat.showModal();
  	}

	function remove(chat){
		this.data.remove(chat);
	}
}