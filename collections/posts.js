// synchronizes real time data to between PUBLICATIONS and FIXTURES
// no 'var' is needed for posts in order to exapnd scope to entire project
Posts = new Meteor.Collection('posts');
//allows for client side inserts after setting insecure to zero
Posts.allow({
	insert: function(userId, doc){
		//only allow posting if you are logged in
		return !! userId;
	}
});