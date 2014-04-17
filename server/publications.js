//return a cursor to reference all posts in DB
Meteor.publish('posts', function(){
	return Posts.find();
});