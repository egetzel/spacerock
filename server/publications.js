//return a cursor to reference all posts in DB
// flagged param excludes items that have been flagged
Meteor.publish('posts', function(){
	return Posts.find({flagged:'false'});
});