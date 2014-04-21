//specifies the template
Router.configure({
	layoutTemplate: 'layout',
	//template that loads while waiting for data
	loadingTemplate: 'loading',
	// waitOn ensures that Posts subscription is gathered before sending user through
	waitOn: function() {
		return [Meteor.subscribe('notifications')];
	}
});

PostsListController = RouteController.extend({
	template: 'postsList',
	increment: 5, 
	limit: function () {
		return parseInt(this.params.postsLimit) || this.increment;
	},
	findOptions: function () {
		return {sort: {submitted: -1}, limit: this.limit()};
	},
	waitOn: function() {
		return Meteor.subscribe('posts', this.findOptions());
	},
	posts: function() {
		return Posts.find({}, this.findOptions());
	},
	data: function() {
		var hasMore = this.posts().count() === this.limit();
		var nextPath = this.route.path({postsLimit: this.limit()+this.increment});
		
		return {
			posts: this.posts(),
			nextPath: hasMore ? nextPath: null
		};
	}
});

NewPostsListController = PostsListController.extend({
	sort: {submitted: -1, _id: -1},
	nextPath: function() {
		return Router.routes.newPosts.path({postsLimit: this.limit() + this.increment})
	}
});

BestPostsListController = PostsListController.extend({
	sort: {votes: -1, submitted:-1, _id: -1},
	nextPath: function() {
		return Router.routes.bestPosts.path({postsLimit: this.limit() +this.increment})
	}
});
//specifies the route paths
// if {path:''} not specified, default url would be postsList
Router.map(function(){
	this.route('home', {
		path: '/',
		controller: NewPostsListController
	});

	this.route('newPosts', {
		path:'/new/:postsLimit?',
		controller: NewPostsListController
	});

	this.route('bestPosts', {
		path: '/best/:postsLimit?',
		controller: BestPostsListController
	});
	
	this.route('postPage', {
		path: '/posts/:_id',
		waitOn: function() {
			return [
				Meteor.subscribe('singlePost', this.params._id),
				Meteor.subscribe('comments', this.params._id)
			];
		},
		//findOne returns a single post that matches a query
		data: function() {return Posts.findOne(this.params._id); }
	});

	this.route('postEdit', {
		path: '/posts/:_id/edit',
		waitOn: function() {
			return Meteor.subscribe('singlePost', this.params._id);
		},
		data: function(){return Posts.findOne(this.params._id);}
	});

	this.route('postSubmit', {
		path: '/submit',
		progress: {enabled: false}
	});
	
	this.route('postsList', {
		path: '/:postsLimit?',
		controller: PostsListController	 	
	});
});

var requireLogin = function(pause) {
	if (! Meteor.user()) {
		if (Meteor.loggingIn())
			this.render(this.loadingTemplate);
		else
			this.render('accessDenied');
		pause();
	}
}

Router.onBeforeAction('loading')
Router.onBeforeAction(requireLogin, {only:'postSubmit'});
Router.onBeforeAction(function() {clearErrors()});