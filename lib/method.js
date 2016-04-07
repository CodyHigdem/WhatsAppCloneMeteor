Meteor.methods({

 newMessage (message) {
  //check userid
  if (! this.userId){
    throw new Meteor.Error('not-logged-in', 
      'Must be logged in to send message');
  }
    check(message, {
      text: String,
      chatId: String,
      type: String
    });

    message.timestamp = new Date();
    message.userId = this.userId
    
    let messageId = Messages.insert(message);
    Chats.update(message.chatId, { $set: { lastMessage: message } });
 
    return messageId;
	},
  updateName (name) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in', 
        'Must be logged in to update his name.');
    }

    check(name, String);
    if(name.length === 0){
      throw Meteor.Error('name-required', 'Must provide username');
    }

    return Meteor.users.update(this.userId, {$set: {'profile.name': name}});
  },
  newChat(otherId){
    if (!this.userId){
      throw new Meteor.Error('not-logged-in', 
        'Must be logged to create a chat');
    }

    check(otherId, String);

    let otherUser = Meteor.users.findOne(otherId);
    if (! otherUser){
      throw new Meteor.Error('user-not-exists', 
        'Chat\s user not exists');
    }

    let chat = {
      userIds: [this.userId, otherId],
      createdAt: new Date()
    };

    let chatId = Chats.insert(chat);

    return chatId;
  },
  removeChat(chatId){
    if(!this.userId){
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to create a chat');
    }

    check(chatId, String);

    let chat = Chats.findOne(chatId);
    if(!chat||!_.include(chat.userIds, this.userId)){
      throw new Meteor.Error('chat-not-exists',
        'Chat not exists');
    }

    Messages.remove({ chatId: chatId });

    return Chats.remove({ _id: chatId });
  }
});