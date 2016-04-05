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
  }
});