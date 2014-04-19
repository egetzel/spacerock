//return a cursor to reference all posts in DB
// flagged param excludes items that have been flagged
Meteor.publish('posts', function(sort, limit){
	return Posts.find({}, {sort: sort, limit: limit});
});

Meteor.publish('comments', function(postId){
	return Comments.find({postId: postId});
});

Meteor.publish('notifications', function(){
	return Notifications.find({userId: this.userId});
});