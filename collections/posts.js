// synchronizes real time data to between PUBLICATIONS and FIXTURES
// no 'var' is needed for posts in order to exapnd scope to entire project
Posts = new Meteor.Collection('posts');
//allows for client side inserts after setting insecure to zero
Posts.allow({
	update: ownsDocument, 
	remove: ownsDocument
});

Posts.deny({
	update: function(userId, post, fieldNames) {
		// user can only edit the following fields
		// uses Underscore.js for additional functionality
		return(_.without(fieldNames, 'url', 'title').length>0);
	}
})

Meteor.methods({
	post: function(postAttributes){
		var user = Meteor.user(),
		postWithSameLink = Posts.findOne({url:postAttributes.url});

		// ensures user is logged in
		if (!user)
			throw new Meteor.Error(401, 'You must be logged in to post');
		// ensures a post title
		if (!postAttributes.title)
			throw new Meteor.Error(422, "Please fill in a headline");
		//checks there are no posts with same link url
		if (postAttributes.url && postWithSameLink){
			throw new Meteor.Error(302, 
				'This url has already been posted',
				postWithSameLink._id);
		}
		var post = _.extend(_.pick(postAttributes, 'url', 'title', 'message'),{
			userId: user._id,
			author: user.username,
			submitted: new Date().getTime(),
			commentsCount: 0,
			upvoters: [],
			votes: 0
		});


		var postId = Posts.insert(post);
		return postId;
	},
	upvote: function(postId) {
		var user = Meteor.user();
		if (!user)
			throw new Meteor.Error(401, 'You need to login to upvote');
		
		Posts.update({
			_id: postId,
			upvoters: {$ne: user._id}
		}, {
			$addToSet: {upvoters: user._id},
			$inc: {votes:1}
		});
	}
});