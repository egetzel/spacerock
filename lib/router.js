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

//specifies the route paths
// if {path:''} not specified, default url would be postsList
Router.map(function(){
	this.route('postsList', {path:'/'
	});
	this.route('postPage', {
		path: '/posts/:_id',
		waitOn: function() {
			return Meteor.subscribe('comments', this.params._id);
		},
		//findOne returns a single post that matches a query
		data: function() {return Posts.findOne(this.params._id)}
	});
	this.route('postEdit',{
		path: '/posts/:_id/edit',
		data: function(){return Posts.findOne(this.params._id);}
	});

	this.route('postSubmit', {
		path: '/submit'
	});
	this.route('postLimit', {
		path: '/:postsLimit?',
		waitOn: function () {
			var postsLimit = parseInt(this.params.postsLimit) || 5;
			return Meteor.subscribe('posts', {sort: {submitted: -1}, limit:postsLimit});
		}
	});
});

var requireLogin = function(pause) {
	if (! Meteor.user()) {
		if (Meteor.loggingIn())
			this.render('loading');
		else
			this.render('accessDenied');
		pause();
	}
}

Router.onBeforeAction('loading')
Router.onBeforeAction(requireLogin, {only:'postSubmit'});
Router.onBeforeAction(function() {clearErrors()});