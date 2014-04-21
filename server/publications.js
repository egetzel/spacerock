//return a cursor to reference all posts in DB
// flagged param excludes items that have been flagged
Meteor.publish('posts', function(options){
	return Posts.find({}, options);
});

Meteor.publish('comments', function(postId){
	return Comments.find({postId: postId});
});

Meteor.publish('notifications', function(){
	return Notifications.find({userId: this.userId});
});

Meteor.publish('singlePost', function(id){
	return id && Posts.find(id);
})